# AI Travel Buddy - Firebase Cloud Functions

This directory contains Firebase Cloud Functions for the AI Travel Buddy app, specifically for AI-powered itinerary generation.

## 🚀 Setup Instructions

### Prerequisites

1. **Firebase CLI**: Install Firebase CLI globally
   ```bash
   npm install -g firebase-tools
   ```

2. **Node.js 18**: Ensure you have Node.js 18 installed
   ```bash
   node --version
   # Should show v18.x.x
   ```

3. **Firebase Project**: Make sure you have a Firebase project set up and initialized

### Installation

1. **Install Dependencies**
   ```bash
   cd functions
   npm install
   ```

2. **Build the Functions**
   ```bash
   npm run build
   ```

### Environment Configuration

#### 1. Set AI API Key

Configure your AI provider API key using Firebase Functions config:

**For OpenAI:**
```bash
firebase functions:config:set ai.key="your-openai-api-key-here"
firebase functions:config:set ai.provider="openai"
```

**For Google Gemini:**
```bash
firebase functions:config:set ai.key="your-gemini-api-key-here"
firebase functions:config:set ai.provider="gemini"
```

#### 2. Verify Configuration

Check your current configuration:
```bash
firebase functions:config:get
```

You should see something like:
```json
{
  "ai": {
    "key": "your-api-key-here",
    "provider": "openai"
  }
}
```

### Deployment

#### Deploy All Functions
```bash
firebase deploy --only functions
```

#### Deploy Specific Function
```bash
firebase deploy --only functions:generateItinerary
```

#### Deploy with Environment Variables
```bash
firebase deploy --only functions --force
```

### Local Development

#### 1. Start Firebase Emulators
```bash
firebase emulators:start --only functions
```

#### 2. Test Locally
The function will be available at:
```
http://localhost:5001/your-project-id/us-central1/generateItinerary
```

#### 3. Test with cURL
```bash
curl -X POST http://localhost:5001/your-project-id/us-central1/generateItinerary \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Paris, France",
    "startDate": "2024-06-01",
    "endDate": "2024-06-05",
    "budget": 2500,
    "interests": ["Culture", "Food", "Art"],
    "tripId": "test-trip-id",
    "userId": "test-user-id"
  }'
```

## 📋 API Reference

### Generate Itinerary Endpoint

**URL**: `https://us-central1-your-project-id.cloudfunctions.net/generateItinerary`

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "destination": "Paris, France",
  "startDate": "2024-06-01",
  "endDate": "2024-06-05",
  "budget": 2500,
  "interests": ["Culture", "Food", "Art"],
  "tripId": "optional-trip-id",
  "userId": "optional-user-id"
}
```

**Response**:
```json
{
  "success": true,
  "itinerary": {
    "days": [
      {
        "dayNumber": 1,
        "items": [
          {
            "time": "09:00",
            "title": "Eiffel Tower Visit",
            "details": "Start your day with a visit to the iconic Eiffel Tower",
            "location": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris"
          }
        ]
      }
    ]
  },
  "message": "Itinerary generated successfully"
}
```

## 🔧 Configuration Options

### AI Providers

The function supports multiple AI providers:

1. **OpenAI GPT-4** (Default)
   - Provider: `openai`
   - Model: `gpt-4`
   - Max tokens: 2000

2. **Google Gemini Pro**
   - Provider: `gemini`
   - Model: `gemini-pro`
   - Max output tokens: 2000

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `ai.key` | API key for the AI provider | `sk-...` (OpenAI) or `AIza...` (Gemini) |
| `ai.provider` | AI provider to use | `openai` or `gemini` |

## 🛠️ Troubleshooting

### Common Issues

1. **"AI API key not configured"**
   - Solution: Set the API key using `firebase functions:config:set ai.key="your-key"`

2. **"Method Not Allowed"**
   - Solution: Ensure you're using POST method

3. **"Missing required fields"**
   - Solution: Check that all required fields are provided in the request

4. **"Invalid date format"**
   - Solution: Use ISO date format (YYYY-MM-DD)

### Logs

View function logs:
```bash
firebase functions:log
```

View logs for specific function:
```bash
firebase functions:log --only generateItinerary
```

### Testing

#### Test with Postman

1. Set URL to your function endpoint
2. Set method to POST
3. Set Content-Type header to application/json
4. Add request body with required fields
5. Send request

#### Test with Flutter

Use the provided `AIService` class in your Flutter app to call the function.

## 🔒 Security

- API keys are stored securely in Firebase Functions config
- CORS is enabled for web clients
- Input validation is performed on all requests
- Error messages don't expose sensitive information

## 📝 Notes

- The function automatically saves the generated itinerary to Firestore if `tripId` and `userId` are provided
- The function normalizes the AI response to ensure consistent data structure
- Error handling includes fallbacks for malformed AI responses
- The function supports both OpenAI and Gemini APIs with the same interface 