import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import axios from 'axios';

// Initialize Firebase Admin
admin.initializeApp();

// CORS middleware
const corsHandler = cors({ origin: true });

// Types for the request and response
interface ItineraryRequest {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  tripId?: string;
  userId?: string;
}

interface ItineraryItem {
  time: string;
  title: string;
  details: string;
  location: string;
}

interface DayPlan {
  dayNumber: number;
  items: ItineraryItem[];
}

interface ItineraryResponse {
  days: DayPlan[];
}

interface AIResponse {
  days: DayPlan[];
}

// AI Service class for handling different AI providers
class AIService {
  private apiKey: string;
  private provider: string;

  constructor() {
    this.apiKey = functions.config().ai?.key || '';
    this.provider = functions.config().ai?.provider || 'openai';
  }

  async generateItinerary(request: ItineraryRequest): Promise<ItineraryResponse> {
    if (!this.apiKey) {
      throw new Error('AI API key not configured');
    }

    switch (this.provider.toLowerCase()) {
      case 'gemini':
        return this.generateWithGemini(request);
      case 'openai':
      default:
        return this.generateWithOpenAI(request);
    }
  }

  private async generateWithOpenAI(request: ItineraryRequest): Promise<ItineraryResponse> {
    const prompt = this.buildPrompt(request);
    
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a travel planning expert. Generate detailed daily itineraries in JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.choices[0].message.content;
      return this.parseAIResponse(content);
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate itinerary with OpenAI');
    }
  }

  private async generateWithGemini(request: ItineraryRequest): Promise<ItineraryResponse> {
    const prompt = this.buildPrompt(request);
    
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a travel planning expert. Generate detailed daily itineraries in JSON format. ${prompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.candidates[0].content.parts[0].text;
      return this.parseAIResponse(content);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate itinerary with Gemini');
    }
  }

  private buildPrompt(request: ItineraryRequest): string {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    return `
      Create a ${daysDiff}-day travel itinerary for ${request.destination} with a budget of $${request.budget}.
      
      Interests: ${request.interests.join(', ')}
      Start Date: ${request.startDate}
      End Date: ${request.endDate}
      
      Please return the response in this exact JSON format:
      {
        "days": [
          {
            "dayNumber": 1,
            "items": [
              {
                "time": "09:00",
                "title": "Activity Title",
                "details": "Detailed description of the activity",
                "location": "Specific location or address"
              }
            ]
          }
        ]
      }
      
      Include 3-5 activities per day, with realistic timing and locations. Consider the budget and interests provided.
    `;
  }

  private parseAIResponse(content: string): ItineraryResponse {
    try {
      // Extract JSON from the response (in case there's additional text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!parsed.days || !Array.isArray(parsed.days)) {
        throw new Error('Invalid response structure: missing days array');
      }

      // Normalize the response
      const normalizedDays = parsed.days.map((day: any, index: number) => ({
        dayNumber: day.dayNumber || index + 1,
        items: Array.isArray(day.items) ? day.items.map((item: any) => ({
          time: item.time || '09:00',
          title: item.title || 'Activity',
          details: item.details || 'No details provided',
          location: item.location || 'Location not specified'
        })) : []
      }));

      return { days: normalizedDays };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI response');
    }
  }
}

// Main Cloud Function
export const generateItinerary = functions.https.onRequest(async (req, res) => {
  // Handle CORS
  return corsHandler(req, res, async () => {
    try {
      // Validate request method
      if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
      }

      // Validate request body
      const request: ItineraryRequest = req.body;
      
      if (!request.destination || !request.startDate || !request.endDate) {
        res.status(400).json({
          error: 'Missing required fields: destination, startDate, endDate'
        });
        return;
      }

      // Validate dates
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        res.status(400).json({
          error: 'Invalid date format'
        });
        return;
      }

      if (startDate >= endDate) {
        res.status(400).json({
          error: 'Start date must be before end date'
        });
        return;
      }

      // Generate itinerary using AI
      const aiService = new AIService();
      const itinerary = await aiService.generateItinerary(request);

      // If tripId and userId are provided, save to Firestore
      if (request.tripId && request.userId) {
        try {
          await admin.firestore()
            .collection('trips')
            .doc(request.tripId)
            .update({
              itinerary: itinerary.days,
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
        } catch (firestoreError) {
          console.error('Error saving to Firestore:', firestoreError);
          // Don't fail the request if Firestore save fails
        }
      }

      // Return the itinerary
      res.status(200).json({
        success: true,
        itinerary: itinerary,
        message: 'Itinerary generated successfully'
      });

    } catch (error) {
      console.error('Error generating itinerary:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
}); 