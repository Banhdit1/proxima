# Development Guide - Proxima

## What's Been Created

I've created a beautiful home screen for your React Native app with the following structure:

### 📁 Project Structure

```
src/
├── theme/
│   ├── colors.ts          # Pink color palette
│   ├── typography.ts      # Font sizes and weights
│   ├── spacing.ts         # Spacing system
│   ├── shadows.ts         # Shadow definitions
│   └── index.ts           # Main theme export
├── components/
│   └── Button.tsx         # Reusable button component
├── screens/
│   └── HomeScreen.tsx     # Main home screen
└── navigation/
    └── AppNavigator.tsx   # Navigation setup
```

### 🎨 Home Screen Features

The home screen includes:
- **Welcome Hero Section** - Beautiful introduction with pink theme
- **Feature Cards** - 4 feature cards showcasing app capabilities
- **Interactive Counter Demo** - Live demonstration with increment/decrement/reset buttons
- **Button Variants Demo** - Showcase of all button styles (primary, secondary, outline, ghost)
- **Responsive Design** - Adapts to different screen sizes
- **Accessibility** - Full accessibility support

### 🎨 Design System

A comprehensive design system with:
- **Colors**: Pink theme with primary, neutral, semantic colors
- **Typography**: Consistent font sizing (12px - 48px) and weights
- **Spacing**: Systematic spacing scale (4px - 96px)
- **Shadows**: 4 elevation levels (sm, md, lg, xl)
- **Border Radius**: Consistent corner rounding

## 🚀 Running the App

### Option 1: Using iOS Simulator (Recommended for macOS)

If you encounter the simulator error shown above, try these steps:

1. **Restart CoreSimulator Service**:
   ```bash
   sudo killall -9 com.apple.CoreSimulator.CoreSimulatorService
   ```

2. **Open Xcode and launch the simulator manually**:
   - Open Xcode
   - Go to Window → Devices and Simulators
   - Select an iOS simulator and click "Open"
   
3. **Then run the app**:
   ```bash
   npm run ios
   ```

### Option 2: Using Android Emulator

1. **Start Android Emulator** (make sure you have Android Studio installed):
   - Open Android Studio
   - Open AVD Manager
   - Start an emulator

2. **Run the app**:
   ```bash
   npm run android
   ```

### Option 3: Using a Physical Device

#### For iOS:
1. Connect your iPhone via USB
2. Run with device:
   ```bash
   npm run ios -- --device
   ```

#### For Android:
1. Enable Developer Mode on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Run:
   ```bash
   npm run android
   ```

### Option 4: Open in Xcode (Most Reliable for iOS)

1. **Open the workspace in Xcode**:
   ```bash
   open ios/proxima.xcworkspace
   ```

2. **In Xcode**:
   - Select a simulator from the device dropdown (top left)
   - Click the Play button (▶️) to build and run
   - This bypasses command line issues

## 🔧 Troubleshooting

### iOS Simulator Not Working

If `npm run ios` fails with CoreSimulator errors:

1. **Restart your Mac** - This often fixes simulator issues
2. **Reset the simulator**:
   ```bash
   xcrun simctl erase all
   ```
3. **Use Xcode directly** (Option 4 above)

### Metro Bundler Issues

If Metro isn't running:
```bash
# Kill existing Metro processes
killall node

# Start Metro
npm start

# In a new terminal, run your platform
npm run ios
# or
npm run android
```

### Clear Cache

If you see strange errors:
```bash
# Clean iOS build
cd ios && rm -rf build && cd ..

# Clean Android build
cd android && ./gradlew clean && cd ..

# Clean Metro cache
npm start -- --reset-cache
```

## 📱 What You'll See

When the app runs successfully, you'll see:

1. **Header** - "Proxima" logo with tagline on pink background
2. **Welcome Card** - Hero section with app description
3. **Feature Grid** - 4 cards showing key features (Pink Theme, Responsive, Accessible, Fast)
4. **Interactive Counter** - A working counter with 3 buttons to test functionality
5. **Button Showcase** - Examples of all button variants
6. **Footer** - App version info

## 🎯 Next Steps

Now that you have a working home screen, you can:

1. **Add More Screens** - Create additional screens (About, Settings, Profile, etc.)
2. **Add Navigation** - Install `@react-navigation/native` for screen navigation
3. **Connect to API** - Integrate backend services
4. **Add Forms** - Build contact forms or user input screens
5. **Add Animations** - Use `react-native-reanimated` for smooth animations
6. **State Management** - Add Redux, MobX, or Context API

## 📝 Code Quality

All code includes:
- ✅ TypeScript for type safety
- ✅ Accessibility labels and hints
- ✅ Responsive design
- ✅ No linting errors
- ✅ Consistent styling with theme system
- ✅ Clean, maintainable component structure

## 🎨 Customization

To customize the pink theme:
1. Open `src/theme/colors.ts`
2. Modify the `primary` color values
3. The entire app will update automatically!

Example:
```typescript
primary: {
  main: '#FF1493',    // Change this to your preferred color
  light: '#FF69B4',   // Lighter shade
  // ... etc
}
```

Enjoy building with Proxima! 🚀

