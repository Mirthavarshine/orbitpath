# 🚀 OrbitPath – AI Travel Buddy

> **AI-powered travel planning app with realtime updates, built in Flutter & deployed on Firebase.**

[![Flutter](https://img.shields.io/badge/Flutter-3.24.0-blue.svg)](https://flutter.dev/)
[![Dart](https://img.shields.io/badge/Dart-3.0+-blue.svg)](https://dart.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

### 🧠 **AI-Powered Planning**
- **Smart Itinerary Generation**: AI creates personalized travel plans
- **Interest-Based Recommendations**: Tailored suggestions based on preferences
- **Real-time Updates**: Dynamic itinerary adjustments

### 🗺️ **Travel Management**
- **Trip Organization**: Create and manage multiple trips
- **Expense Tracking**: Monitor budgets with detailed analytics
- **Interactive Maps**: Google Maps integration for locations
- **Weather Alerts**: Real-time weather updates for destinations

### 📱 **Cross-Platform**
- **Web App**: Deployed on Firebase Hosting
- **Mobile Ready**: Flutter framework for iOS/Android
- **Desktop Support**: macOS app with native integration
- **Offline Capable**: Works without internet connection

### 🔥 **Firebase Backend**
- **Authentication**: Google Sign-in & Email/Password
- **Real-time Database**: Firestore for live data sync
- **Cloud Functions**: AI processing and notifications
- **Push Notifications**: Trip updates and alerts

---

## 🛠️ Tech Stack

- **Frontend**: Flutter 3.24.0, Dart 3.0+
- **State Management**: Riverpod
- **Navigation**: Go Router
- **Backend**: Firebase (Auth, Firestore, Functions, Hosting)
- **AI Integration**: OpenAI/Gemini via Cloud Functions
- **Maps**: Google Maps Flutter
- **Charts**: FL Chart for analytics
- **Deployment**: Firebase Hosting

---

## 🚀 Quick Start

### Prerequisites
- [Flutter SDK](https://flutter.dev/docs/get-started/install) (3.24.0+)
- [Firebase CLI](https://firebase.google.com/docs/cli) (latest)
- [Node.js](https://nodejs.org/) (18+ for Cloud Functions)

### 1. Clone & Setup
```bash
git clone <your-repo-url>
cd orbitpath
flutter pub get
```

### 2. Firebase Setup
```bash
# Login to Firebase
firebase login

# The deploy script will automatically:
# - Create Firebase project: ai-travel-buddy-app
# - Configure hosting
# - Set up authentication
```

### 3. Deploy to Web
```bash
# One-command deployment
./deploy.sh
```

**Your app will be live at**: `https://ai-travel-buddy-app.web.app`

---

## 🖥️ Desktop Development

### Build macOS App
```bash
# Enable macOS support
flutter config --enable-macos-desktop

# Build macOS app
flutter build macos

# Run on macOS
flutter run -d macos
```

### Desktop Launcher (Optional)
```bash
# Build desktop launcher for deployment
npm run build:mac-launcher

# Open the launcher
open "dist/AI Travel Buddy Deploy.app"
```

---

## 📁 Project Structure

```
orbitpath/
├── ai_travel_buddy/          # Flutter app
│   ├── lib/
│   │   ├── core/             # App bootstrap, providers
│   │   ├── features/         # Feature modules
│   │   │   ├── auth/         # Authentication
│   │   │   ├── explore/      # Destination exploration
│   │   │   ├── trips/        # Trip management
│   │   │   ├── expenses/     # Expense tracking
│   │   │   ├── profile/      # User profile
│   │   │   └── planner/      # AI itinerary planning
│   │   ├── models/           # Data models
│   │   ├── services/         # Firebase services
│   │   ├── theme/            # App theming
│   │   └── utils/            # Utilities
│   └── pubspec.yaml
├── functions/                # Firebase Cloud Functions
├── deploy.sh                 # Deployment script
├── firebase.json            # Firebase configuration
└── README.md
```

---

## 🔧 Configuration

### Environment Variables
Create `.env` file for API keys:
```env
OPENAI_API_KEY=your_openai_key
GOOGLE_MAPS_API_KEY=your_maps_key
OPENWEATHER_API_KEY=your_weather_key
```

### Firebase Project
The app uses a dedicated Firebase project:
- **Project ID**: `ai-travel-buddy-app`
- **Display Name**: AI Travel Buddy
- **Services**: Authentication, Firestore, Functions, Hosting

---

## 🚀 Deployment

### Automated Deployment
```bash
./deploy.sh
```

This script will:
1. ✅ Check Firebase login
2. ✅ Create/use dedicated Firebase project
3. ✅ Build Flutter web app
4. ✅ Deploy to Firebase Hosting
5. ✅ Show live URL

### Manual Deployment
```bash
# Build Flutter web
cd ai_travel_buddy
flutter build web --release

# Deploy to Firebase
firebase deploy --only hosting
```

---

## 🧪 Development

### Run Locally
```bash
# Start Flutter app
cd ai_travel_buddy
flutter run -d chrome

# Start Firebase emulators
firebase emulators:start
```

### Testing
```bash
# Run tests
flutter test

# Analyze code
flutter analyze
```

---

## 📊 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| 🧠 AI Planning | ✅ | Smart itinerary generation |
| 🗺️ Trip Management | ✅ | Create, edit, delete trips |
| 💰 Expense Tracking | ✅ | Budget monitoring & analytics |
| 🔐 Authentication | ✅ | Google & Email sign-in |
| 📱 Cross-Platform | ✅ | Web, Mobile, Desktop |
| 🌐 Offline Support | ✅ | Works without internet |
| 🔔 Push Notifications | ✅ | Real-time updates |
| 📊 Analytics | ✅ | Charts & insights |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Flutter Team** for the amazing framework
- **Firebase** for the robust backend services
- **OpenAI/Gemini** for AI capabilities
- **Google Maps** for location services

---

## 📞 Support

- **Live Demo**: [https://ai-travel-buddy-app.web.app](https://ai-travel-buddy-app.web.app)
- **Issues**: [GitHub Issues](https://github.com/yourusername/orbitpath/issues)
- **Documentation**: [Firebase Setup Guide](FIREBASE_SETUP.md)

---

**Made with ❤️ by [Your Name]** 