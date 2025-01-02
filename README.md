# Sea World Dolphin Scanner App

A mobile application built with NativeScript-Vue that allows Sea World visitors to identify dolphins using their phone's camera and machine learning.

## 🐬 Project Overview

This application provides a user-friendly interface for scanning and identifying dolphins at Sea World. It's designed to enhance visitor experience by providing real-time dolphin identification using a YOLOv7 machine learning model or other machine vision model (to be integrated / tested / compared).

### Key Features
- Camera integration for dolphin scanning
- Real-time image processing
- Dolphin identification display with confidence scores
- User-friendly interface with clear instructions
- Responsive design for various screen sizes

## 🛠️ Technical Stack

- **Framework**: NativeScript-Vue
- **Language**: TypeScript
- **UI Components**: Custom components with native styling
- **Camera**: @nativescript/camera
- **Machine Learning**: YOLOv7 (integration point)

## 📁 Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── Home.vue            # Main application component
│   │   └── ui/
│   │       └── card/          # Reusable card components
│   │           ├── Card.vue
│   │           ├── CardHeader.vue
│   │           ├── CardTitle.vue
│   │           ├── CardDescription.vue
│   │           └── index.ts
│   ├── app.css                # Global styles
│   └── app.ts                 # Application entry point
├── App_Resources/            # Native platform configurations
└── package.json             # Project dependencies
```

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Preview App on your phone:
   - For Android: Download "NativeScript Preview" from [Google Play Store](https://play.google.com/store/apps/details?id=org.nativescript.preview)
   - For iOS: Download "NativeScript Preview" from [Apple App Store](https://apps.apple.com/us/app/nativescript-preview/id1264484702)

3. Run the development preview:
   ```bash
   ns preview
   ```
   This will:
   - Start the development server
   - Display a QR code in your terminal
   - Watch for changes in your code

4. Connect your device:
   - Open the NativeScript Preview app on your phone
   - Tap the "Scan QR Code" button
   - Scan the QR code shown in your terminal
   - The app will load and automatically refresh when you make code changes
   - Make sure your phone and computer are on the same network

   Note: If the QR code doesn't scan:
   - Ensure your phone and computer are on the same WiFi network
   - Try moving closer to the QR code
   - Adjust your phone's screen brightness
   - Make sure there's no glare on your screen

5. For building the production application:
   ```bash
   ns build android  # For Android
   ns build ios      # For iOS
   ```

## 🔌 Integration Points

### Machine Learning Integration
The application is prepared for YOLOv7 integration in `Home.vue`. I have created a section where I assume the ML model could be integrated.Look for the following section:

```typescript
// ML Integration Point
// Replace this mock response with actual ML model integration
await new Promise(resolve => setTimeout(resolve, 1000));
identificationResult.value = {
  name: "Test Dolphin",
  confidence: 0.95,
  info: {
    age: 5,
    gender: "Female",
    description: "Known for playful behavior"
  }
};
```

### Camera Integration
Camera functionality is implemented using @nativescript/camera. The main scanning logic is in the `scanDolphin` method in `Home.vue`.

## 📱 User Interface

The app consists of two main screens:

1. **Welcome Screen**

2. **Scanning Screen**
   - Camera integration
   - Real-time feedback
   - Results display
   - Navigation controls

## 🔒 Permissions

The app requires the following permissions:
- Camera access for dolphin scanning
- (Add any additional permissions needed for ML model)

## 🎨 Styling

Styles are maintained in `app.css` using native CSS properties. The app uses a consistent color scheme:
- Primary: #3b82f6 (Blue)
- Background: #f3f4f6 (Light Gray)
- Text: #1f2937 (Dark Gray)

## 🔄 State Management

The application uses Vue's reactive system with the following key states:
- `capturedImage`: Stores the current captured image
- `isProcessing`: Loading state indicator
- `identificationResult`: Stores dolphin identification data
- `errorMessage`: Handles error states
- `showWelcome`: Controls screen navigation

## 📝 Future Enhancements

This is just a basic app. Once the ML integration is complete, I will improve the UI and add more features. 
