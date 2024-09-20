## Project Overview

This is a mobile application built with React Native and Expo. It includes features such as user authentication, shipment tracking, and profile management.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npx expo start --dev-client
   ```

## Building the App

To build and run the app on iOS or Android simulators:

1. Install EAS CLI:
   ```
   npm install -g eas-cli
   ```
2. Build and run for iOS:
   ```
   eas build:run -p ios
   ```
3. Build and run for Android:
   ```
   eas build:run -p android
   ```

## Authentication

Use the following credentials to log in:

- Username: test@brandimic.com
- Password: testy123@

## Features

- User authentication (sign-in)
- Shipment tracking
- Profile management
- Wallet functionality
- QR code scanning

## Project Structure

- `app/(auth)/sign-in.tsx`: Handles user authentication
- `app/(tabs)/_layout.jsx`: Defines the tab navigation structure
- `app/(tabs)/home.jsx`: Main shipment tracking screen
- `context/GlobalProvider.js`: Manages global state and user session

## Development

This project uses Expo for easier development and deployment. Make sure to check the `eas.json` file for build configurations.
