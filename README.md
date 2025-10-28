# Proxima - Business Networking & Professional Matching App - Passive Detection for matching

This is a [**React Native**](https://reactnative.dev) business networking application that revolutionizes professional networking through **passive Bluetooth detection** and **swipe-based matching**.

**Passive Detection**: Your phone automatically broadcasts and discovers nearby professionals using Bluetooth Low Energy (BLE), enabling seamless connections at conferences, coworking spaces, and networking events—without any manual searching.

**Swipe to Match**: Browse detected professionals with a Tinder-style swipe interface. Swipe right on profiles that match your networking goals (mentorship, collaboration, hiring, partnerships) and instantly connect when there's mutual interest. See real-time proximity information and match with people just meters away.

Built with a beautiful modern UI using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Features

- 🤝 **Professional Matching** - Find the right business connections based on detailed criteria
- 📡 **Bluetooth Passive Matching** - Uses Bluetooth broadcast system to share user IDs for automatic proximity-based matching
- 📝 **Matching Profile Form** - Comprehensive form to specify who you're looking for
- 🎨 **Pink Theme Design System** - Beautiful pink color palette with consistent styling
- 📱 **Responsive UI** - Adapts to different screen sizes and orientations
- ♿ **Accessibility Support** - Full accessibility features for screen readers
- 🎯 **Form Validation** - Real-time validation with error messages
- 🎭 **Modern UI Components** - Custom Button, TextInput, and Picker components
- 📱 **Cross-Platform** - Works on both iOS and Android

## App Structure

### Screens

1. **Home Screen** - Landing page showcasing the value proposition
   - Hero section with CTAs
   - How it works (4-step process)
   - Use cases (Job Seekers, Entrepreneurs, Mentors, Collaborators)
2. **Profile Matching Form** - Define your ideal match
   - Professional criteria (Industry, Role, Experience Level)
   - Purpose selection (Networking, Mentorship, Hiring, etc.)
   - Skills and location preferences
   - Form validation and submission

### Components

The app includes a comprehensive component library:

- **Button Component** - Multiple variants (primary, secondary, outline, ghost) with loading states
- **TextInput Component** - Custom input fields with validation, error states, and accessibility
- **Picker Component** - Custom dropdown with modal selection UI
- **Theme System** - Comprehensive design system with colors, typography, spacing, and shadows

## Theme System

The app uses a comprehensive design system with:

- **Color Palette** - Pink theme with neutral grays and semantic colors
- **Typography** - Consistent font sizing (12px - 48px) and weights
- **Spacing** - Systematic spacing scale (4px - 96px)
- **Shadows** - 4 elevation levels for depth
- **Border Radius** - Consistent corner rounding

## Matching Criteria

The Profile Matching Form includes:

- **Purpose**: Networking, Mentorship, Collaboration, Hiring, Investment, Partnership, Learning, Career
- **Industries**: Technology, Finance, Healthcare, Education, Manufacturing, Retail, Marketing, Consulting, Real Estate, Entertainment, Non-Profit
- **Experience Levels**: Entry, Junior, Mid-Level, Senior, Lead, Executive
- **Company Sizes**: Startup, Small, Medium, Large, Enterprise
- **Skills & Location**: Free-form text for detailed requirements

## Bluetooth Passive Matching Technology

Proxima uses a Bluetooth Low Energy (BLE) broadcast system for passive, proximity-based matching:

- **Automatic Discovery**: Your device broadcasts your user ID via Bluetooth when the app is active
- **Privacy-First**: Only your anonymous user ID is broadcast, not personal information
- **Proximity-Based**: Automatically discover other Proxima users nearby at events, conferences, or coworking spaces
- **Passive Matching**: No need to manually search - connections happen automatically when you're in range
- **Cross-Platform**: Works seamlessly on both iOS and Android devices

This technology enables seamless networking by detecting when professionals with matching criteria are in the same physical space, facilitating organic connections without requiring active app engagement.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
