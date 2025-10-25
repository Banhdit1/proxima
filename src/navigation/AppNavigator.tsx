/**
 * App Navigator - Main navigation component
 */

import React, { useState } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileMatchingForm } from '../screens/ProfileMatchingForm';
import ProfileScreen from '../screens/ProfileScreen';

type Screen = 'home' | 'form' | 'profile';

export const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const navigateToForm = () => setCurrentScreen('form');
  const navigateToHome = () => setCurrentScreen('home');
  const navigateToProfile = () => setCurrentScreen('profile');

  // Simple navigation without external library
  // In the future, you can add react-navigation here
  if (currentScreen === 'form') {
    return <ProfileMatchingForm onNavigateToHome={navigateToHome} />;
  }

  if (currentScreen === 'profile') {
    return <ProfileScreen onNavigateToHome={navigateToHome} />;
  }

  return (
    <HomeScreen
      onNavigateToForm={navigateToForm}
      navigateToProfile={navigateToProfile}
    />
  );
};
