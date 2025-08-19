#!/bin/bash

# AI Travel Buddy Deployment Script
# This script builds and deploys the Flutter web app to Firebase Hosting
# Dedicated Firebase Project: ai-travel-buddy

set -e  # Exit on any error

echo "🚀 Starting AI Travel Buddy deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${CYAN}[STEP]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if we're in the right directory
if [ ! -f "ai_travel_buddy/pubspec.yaml" ]; then
    print_error "Please run this script from the project root directory"
    print_info "Expected: ai_travel_buddy/pubspec.yaml"
    print_info "Current directory: $(pwd)"
    exit 1
fi

# Check if Flutter is installed
if ! command_exists flutter; then
    print_error "Flutter is not installed. Please install it first."
    print_info "Visit: https://flutter.dev/docs/get-started/install"
    exit 1
fi

# Check if Firebase CLI is installed
if ! command_exists firebase; then
    print_error "Firebase CLI is not installed. Please install it first:"
    print_info "npm install -g firebase-tools"
    exit 1
fi

print_step "Step 1: Setting up Firebase for AI Travel Buddy..."

# Check Firebase login
print_info "Checking Firebase login status..."
if ! firebase projects:list >/dev/null 2>&1; then
    print_warning "Not logged into Firebase. Please log in..."
    firebase login
fi

# Check if ai-travel-buddy project exists
PROJECT_ID="ai-travel-buddy-app"
print_info "Checking if Firebase project '$PROJECT_ID' exists..."

# Try to use the project first (this will fail if it doesn't exist)
if firebase use "$PROJECT_ID" 2>/dev/null; then
    print_success "Firebase project '$PROJECT_ID' found and is now active!"
else
    print_warning "Firebase project '$PROJECT_ID' not found. Creating new project..."
    print_info "Project ID: $PROJECT_ID"
    print_info "Display Name: AI Travel Buddy"
    
    # Create the project
    firebase projects:create "$PROJECT_ID" --display-name "AI Travel Buddy"
    
    if [ $? -eq 0 ]; then
        print_success "Firebase project created successfully!"
        # Set the newly created project as active
        firebase use "$PROJECT_ID"
    else
        print_error "Failed to create Firebase project automatically."
        print_info "Please create the project manually:"
        print_info "1. Go to https://console.firebase.google.com"
        print_info "2. Click 'Create a project'"
        print_info "3. Enter Project ID: $PROJECT_ID"
        print_info "4. Enter Display Name: AI Travel Buddy"
        print_info "5. Follow the setup wizard"
        print_info "6. Then run this script again"
        exit 1
    fi
fi

# Initialize Firebase hosting if not already initialized
if [ ! -f ".firebaserc" ] || [ ! -f "firebase.json" ]; then
    print_info "Initializing Firebase hosting configuration..."
    
    # Create .firebaserc file
    cat > .firebaserc << EOF
{
  "projects": {
    "default": "$PROJECT_ID"
  }
}
EOF
    
    # Create firebase.json file
    cat > firebase.json << EOF
{
  "hosting": {
    "public": "ai_travel_buddy/build/web",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
EOF
    
    print_success "Firebase configuration files created!"
fi

print_step "Step 2: Building Flutter web app..."
cd ai_travel_buddy

# Clean and get dependencies
print_info "Cleaning and getting dependencies..."
flutter clean
flutter pub get

# Build web app
print_info "Building web app in release mode..."
flutter build web --release

if [ $? -eq 0 ]; then
    print_success "Web build completed successfully!"
else
    print_error "Web build failed!"
    exit 1
fi

cd ..

print_step "Step 3: Deploying to Firebase Hosting..."

# Deploy to Firebase
print_info "Deploying AI Travel Buddy to Firebase Hosting..."
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    print_success "Deployment completed successfully! 🎉"
    
    # Get the hosting URL
    hosting_url="https://$PROJECT_ID.web.app"
    print_success "Your AI Travel Buddy app is live at: $hosting_url"
    
    # Ask if user wants to open the site
    echo ""
    print_info "Would you like to open the deployed site in your browser? (y/n)"
    read -p "Open browser? (y/n): " open_browser
    
    if [[ "$open_browser" =~ ^[Yy]$ ]]; then
        print_info "Opening $hosting_url in your browser..."
        open "$hosting_url"
    fi
    
else
    print_error "Deployment failed!"
    exit 1
fi

print_success "AI Travel Buddy deployment completed! ✨"
print_info "Your app is now live at: https://$PROJECT_ID.web.app"
print_info "This deployment is completely separate from your portfolio projects." 