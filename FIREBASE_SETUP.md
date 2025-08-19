# Firebase Setup Guide for AI Travel Buddy

This guide will help you set up Firebase authentication for the AI Travel Buddy app.

## Prerequisites

1. A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
2. FlutterFire CLI installed globally: `dart pub global activate flutterfire_cli`

## Step 1: Configure Firebase

1. Run the FlutterFire configuration:
   ```bash
   flutterfire configure
   ```

2. Select your Firebase project from the list
3. Choose the platforms you want to support (iOS, Android, Web, etc.)
4. This will automatically:
   - Generate the `lib/firebase_options.dart` file
   - Update platform-specific configuration files
   - Add necessary dependencies

## Step 2: Enable Authentication Methods

1. Go to your Firebase Console
2. Navigate to Authentication > Sign-in method
3. Enable the following providers:
   - **Email/Password**: Enable for email/password authentication
   - **Google**: Enable for Google Sign-In

### For Google Sign-In:

1. In the Google provider settings, add your app's SHA-1 fingerprint:
   ```bash
   # For debug builds
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   
   # For release builds (if you have a release keystore)
   keytool -list -v -keystore your-release-keystore.jks -alias your-key-alias
   ```

2. Download the `google-services.json` file and place it in `android/app/`
3. For iOS, download `GoogleService-Info.plist` and add it to your iOS project

## Step 3: Update Android Configuration

1. Ensure your `android/app/build.gradle` has the Google Services plugin:
   ```gradle
   plugins {
       id "com.android.application"
       id "kotlin-android"
       id "dev.flutter.flutter-gradle-plugin"
       id "com.google.gms.google-services"  // Add this line
   }
   ```

2. In `android/build.gradle`, add the Google Services classpath:
   ```gradle
   dependencies {
       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

## Step 4: Update iOS Configuration (if applicable)

1. Add the Google Services configuration to your iOS project
2. Update your `ios/Runner/Info.plist` with URL schemes for Google Sign-In

## Step 5: Test the Setup

1. Run the app:
   ```bash
   flutter run
   ```

2. Test authentication flows:
   - Email/password sign up and sign in
   - Google Sign-In
   - Sign out functionality

## Troubleshooting

### Common Issues:

1. **"Google Sign-In failed"**: 
   - Check that SHA-1 fingerprints are correctly added to Firebase
   - Verify `google-services.json` is in the correct location

2. **"Firebase not initialized"**:
   - Ensure `flutterfire configure` was run successfully
   - Check that `firebase_options.dart` exists and has correct values

3. **"Authentication not enabled"**:
   - Verify Email/Password and Google providers are enabled in Firebase Console

### Debug Mode:

To see detailed Firebase logs, add this to your `main.dart`:
```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Enable Firebase debug mode
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  // Enable debug logging
  if (kDebugMode) {
    FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
  }
  
  runApp(const ProviderScope(child: AppBootstrap()));
}
```

## Security Rules

Don't forget to set up proper Firestore security rules for your app:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Trips can only be accessed by the owner
    match /trips/{tripId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## Next Steps

Once Firebase is configured:

1. Test all authentication flows
2. Set up Firestore database for storing user data
3. Configure Firebase Storage for file uploads
4. Set up Firebase Cloud Messaging for push notifications
5. Deploy your app with proper production configuration

## Support

If you encounter issues:
1. Check the [Firebase Flutter documentation](https://firebase.flutter.dev/)
2. Review the [Firebase Console](https://console.firebase.google.com/) for configuration
3. Check Flutter and Firebase package versions for compatibility 