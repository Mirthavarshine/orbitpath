## AI Travel Buddy

Your intelligent, cross-platform travel planner with AI-generated itineraries, real-time expenses, events, maps, offline caching, and push notifications.

### Screenshots (placeholders)
- Home / Explore: `docs/screenshots/explore.png`
- Planner: `docs/screenshots/planner.png`
- Trips: `docs/screenshots/trips.png`
- Trip Details: `docs/screenshots/trip_details.png`
- Expenses: `docs/screenshots/expenses.png`
- Profile: `docs/screenshots/profile.png`

Create the images under `docs/screenshots/` or replace with your own.

---

### Tech Stack
- Flutter 3.x (Dart 3, null-safety)
- State management: Riverpod
- Navigation: go_router
- Firebase: Auth, Firestore, Storage, Messaging (FCM)
- Cloud Functions (Node.js 18, TypeScript) for AI integration
- Google Maps (google_maps_flutter)
- Geolocation (geolocator)
- Charts (fl_chart)
- Local storage (shared_preferences)
- Theming: Material 3, Poppins via Google Fonts

---

### Project Structure (high-level)
- `lib/core/` app bootstrap and providers
- `lib/router/` `GoRouter` configuration
- `lib/theme/` Material 3 light/dark themes
- `lib/models/` data models (Trip, DayPlan, Expense, Event, etc.)
- `lib/services/` Firebase, AI, Weather, Maps, Notifications, Offline
- `lib/features/` domain features (auth, explore, planner, trips, expenses, profile, offline)
- `functions/` Firebase Cloud Functions (TypeScript)

---

### Prerequisites
- Flutter SDK 3.x installed
- Firebase project created
- FlutterFire CLI installed
- Node.js 18+ for Cloud Functions

---

### Local Setup
1) Clone and install deps
```bash
# From repo root
cd ai_travel_buddy
flutter pub get
```

2) Configure Firebase
```bash
flutterfire configure
# This generates lib/firebase_options.dart
```

3) Platform setup
- iOS: open `ios/Runner.xcworkspace` in Xcode, set Bundle ID, sign
- Android: set `applicationId` in `android/app/build.gradle`

4) Run the app
```bash
flutter run -d <device-id>
```

---

### API Keys & Environment Configuration

#### Google Maps
Set your API keys per platform (see inline comments):
- Android: `android/app/src/main/AndroidManifest.xml`
- iOS: `ios/Runner/AppDelegate.swift` (GMSServices.provideAPIKey)
- Web: `web/index.html` script tag
Reference: `lib/core/config/maps_config.dart`

#### OpenWeather
- Get API key at `https://openweathermap.org/api`
- Update placeholder in `lib/services/weather_service.dart` (`_apiKey`)
- Consider secure storage or env injection for production

#### AI Provider (OpenAI / Gemini) for Cloud Functions
- Set environment config for functions:
```bash
cd functions
npm install
# Choose your provider and set the key (examples)
firebase functions:config:set ai.provider="openai"
firebase functions:config:set ai.key="YOUR_OPENAI_OR_GEMINI_KEY"
```
- Deploy functions (see Deploy section)
- The HTTPS function endpoint: `/ai/generateItinerary`

#### Firebase Messaging (FCM)
- iOS: request permissions and enable push notifications
- Android: ensure proper services/metadata in Manifest
- Web: add Firebase SDK if using web messaging
Reference: `lib/services/notification_service.dart` (comments include platform steps)

---

### Build & Run
```bash
# Analyze
flutter analyze

# Run on a device
flutter run -d <device>

# Build APK / AppBundle
flutter build apk --release
flutter build appbundle --release

# Build iOS (requires Xcode)
flutter build ios --release
```

---

### Firebase Deploy (Hosting + Functions + Rules)

1) Login and init if needed
```bash
firebase login
firebase use <your-project-id>
```

2) Deploy Firestore rules
```bash
# From repo root or rules location
firebase deploy --only firestore:rules
```

3) Deploy Cloud Functions
```bash
cd functions
npm run build
firebase deploy --only functions
```

4) (Optional) Hosting (if you have a web build setup)
```bash
# Build web
cd ../ai_travel_buddy
flutter build web --release
# Deploy hosting (ensure firebase.json targets hosting to the web build directory)
firebase deploy --only hosting
```

---

### Offline Support
- Firestore offline persistence enabled
- Local cache for trips, expenses, and itineraries via `shared_preferences`
- Offline banner and Offline management screen (`/offline`)
Reference: `lib/services/offline_service.dart`

---

### Firestore Security Rules
- Users: read/write their own `users/{userId}`
- Trips: owner read/write (ownerId immutable)
- Expenses: owner of the linked trip read/write
- Events: public read, writes restricted to admin custom claim
File: `firestore.rules`

TODO: Add admin claim via Firebase Admin SDK:
```js
// Node.js Admin SDK example
admin.auth().setCustomUserClaims('<UID>', { admin: true })
```

---

### Roadmap
- Add collaborative trips (invite participants, roles)
- Integrate real-time location sharing & map layers
- Enhance AI prompts (replanning, constraints, preferences memory)
- Multi-currency and export (PDF/ICS)
- Offline first for all features with robust sync/merge
- E2E tests (golden, integration) and performance profiling

---

### Contribution Guide
- Fork the repo and create a feature branch
- Follow existing code style (Riverpod, go_router, Material 3)
- Write clear, high-verbosity code and small focused edits
- Run checks before pushing:
```bash
flutter analyze
flutter test
```
- Open a PR with a concise description, screenshots (if UI), and testing notes

---

### Troubleshooting
- If Firebase options missing, re-run `flutterfire configure`
- Maps not loading: verify platform-specific API keys are set
- Notifications not showing: check App permissions and FCM setup
- 401 from AI function: verify `functions:config` AI key/provider
- Network issues: app falls back to cached data; see Offline screen
