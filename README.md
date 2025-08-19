# 🚀 OrbitPath – AI Travel Buddy

> **AI-powered travel planning app with realtime updates, built in Flutter & deployed on Firebase.**

[![Flutter](https://img.shields.io/badge/Flutter-3.24.0-blue.svg)](https://flutter.dev/)
[![Dart](https://img.shields.io/badge/Dart-3.0+-blue.svg)](https://dart.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 Live Demo

**🌐 [View Live App](https://ai-travel-buddy-app.web.app)**

---

## ✨ Features

### 🧭 **AI Itinerary Planner**
- **Smart Travel Planning**: Enter trip details, get personalized travel plans
- **Interest-Based Recommendations**: Tailored suggestions based on preferences
- **Real-time Updates**: Dynamic itinerary adjustments

### 💸 **Expense Tracking**
- **Budget Management**: Monitor travel expenses easily
- **Analytics Dashboard**: Visual charts and spending insights
- **Category Organization**: Track expenses by type (food, transport, etc.)

### 🗺️ **Maps Integration**
- **Google Maps**: Explore places and get directions
- **Location Services**: Find nearby attractions and restaurants
- **Interactive Navigation**: Seamless map integration

### 🔐 **Authentication & Security**
- **Firebase Auth**: Secure Google Sign-in & Email/Password
- **User Profiles**: Personalized settings and preferences
- **Data Protection**: Secure cloud storage with Firestore

### ⚡ **One-Command Deployment**
- **Instant Deployment**: Run `./deploy.sh` for Firebase Hosting
- **Automated Setup**: Firebase project creation and configuration
- **Live Updates**: Real-time deployment to production

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Flutter 3.24.0, Dart 3.0+ |
| **Backend** | Firebase (Auth, Firestore, Functions, Hosting) |
| **AI/ML** | OpenAI API (travel recommendations) |
| **Maps** | Google Maps Flutter |
| **State Management** | Riverpod |
| **Navigation** | Go Router |
| **Charts** | FL Chart for analytics |

---

## 🚀 Quick Start

### Prerequisites
- [Flutter SDK](https://flutter.dev/docs/get-started/install) (3.24.0+)
- [Firebase CLI](https://firebase.google.com/docs/cli) (latest)
- [Node.js](https://nodejs.org/) (18+ for Cloud Functions)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/orbitpath.git
cd orbitpath

# 2. Install dependencies
flutter pub get

# 3. Run locally
flutter run -d chrome
```

### Deployment

```bash
# One-command deployment to Firebase
./deploy.sh
```

**Your app will be live at**: `https://ai-travel-buddy-app.web.app`

---

## 📱 Platform Support

| Platform | Status | Description |
|----------|--------|-------------|
| 🌐 **Web** | ✅ Live | Deployed on Firebase Hosting |
| 📱 **Mobile** | ✅ Ready | Flutter framework for iOS/Android |
| 🖥️ **Desktop** | ✅ Ready | macOS, Windows, Linux support |
| 🔄 **Offline** | ✅ Capable | Works without internet connection |

---

## 🏗️ Project Structure

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

### Firebase Setup
The app uses a dedicated Firebase project:
- **Project ID**: `ai-travel-buddy-app`
- **Display Name**: AI Travel Buddy
- **Services**: Authentication, Firestore, Functions, Hosting

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

## 🧪 Development

### Local Development
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

### Desktop Development
```bash
# Enable macOS support
flutter config --enable-macos-desktop

# Build macOS app
flutter build macos

# Run on macOS
flutter run -d macos
```

---

## 🚀 Deployment Options

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

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow Flutter best practices
- Write clean, documented code
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Flutter Team** for the amazing framework
- **Firebase** for the robust backend services
- **OpenAI** for AI capabilities
- **Google Maps** for location services

---

## 📞 Support & Links

- **🌐 Live Demo**: [https://ai-travel-buddy-app.web.app](https://ai-travel-buddy-app.web.app)
- **📚 Documentation**: [Firebase Setup Guide](FIREBASE_SETUP.md)
- **🐛 Issues**: [GitHub Issues](https://github.com/yourusername/orbitpath/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/yourusername/orbitpath/discussions)

---

## 🎓 Student & Recruiter Friendly

This project demonstrates:
- **Modern Web Development** with Flutter
- **Cloud Integration** with Firebase
- **AI/ML Implementation** with OpenAI
- **Professional Deployment** practices
- **Clean Architecture** and code organization
- **Cross-platform** development skills

**Perfect for portfolios and technical interviews!** 🚀

---

**Made with ❤️ by [Your Name]**

*Built for travelers, by developers* 