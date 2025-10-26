/**
 * App Navigator - Main navigation component
 */

import React, { useState } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileMatchingForm } from '../screens/ProfileMatchingForm';
import { NearbyPeersScreen } from '../screens/NearbyPeersScreen';
import { SwipeScreen } from '../screens/SwipeScreen';
import ProfileScreen from '../screens/ProfileScreen';

type Screen = 'home' | 'form' | 'peers' | 'profile' | 'swipe';

export const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const navigateToForm = () => setCurrentScreen('form');
  const navigateToPeers = () => setCurrentScreen('peers');
  const navigateToHome = () => setCurrentScreen('home');
  const navigateToProfile = () => setCurrentScreen('profile');
  const navigateToSwipe = () => setCurrentScreen('swipe');

  // Simple navigation without external library
  // In the future, you can add react-navigation here
  if (currentScreen === 'form') {
    return <ProfileMatchingForm onNavigateToHome={navigateToHome} />;
  }

  if (currentScreen === 'peers') {
    return <NearbyPeersScreen onNavigateBack={navigateToHome} />;
  }

  if (currentScreen === 'profile') {
    return <ProfileScreen onNavigateToHome={navigateToHome} />;
  }

  if (currentScreen === 'swipe') {
    return <SwipeScreen onNavigateToHome={navigateToHome} />;
  }

  return (
    <HomeScreen
      onNavigateToForm={navigateToForm}
      onNavigateToPeers={navigateToPeers}
      navigateToProfile={navigateToProfile}
      onNavigateToSwipe={navigateToSwipe}
    />
  );
};
