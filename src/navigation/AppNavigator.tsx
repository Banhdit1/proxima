/**
 * App Navigator - Main navigation component
 */

import React, { useState } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileMatchingForm } from '../screens/ProfileMatchingForm';
import { NearbyPeersScreen } from '../screens/NearbyPeersScreen';

type Screen = 'home' | 'form' | 'peers';

export const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const navigateToForm = () => setCurrentScreen('form');
  const navigateToPeers = () => setCurrentScreen('peers');
  const navigateToHome = () => setCurrentScreen('home');

  // Simple navigation without external library
  // In the future, you can add react-navigation here
  if (currentScreen === 'form') {
    return <ProfileMatchingForm onNavigateToHome={navigateToHome} />;
  }

  if (currentScreen === 'peers') {
    return <NearbyPeersScreen onNavigateBack={navigateToHome} />;
  }

  return (
    <HomeScreen
      onNavigateToForm={navigateToForm}
      onNavigateToPeers={navigateToPeers}
    />
  );
};
