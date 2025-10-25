/**
 * Swipe Screen - Dating app style swipe interface for matching nearby professionals
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { MatchScreen } from './MatchScreen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface Profile {
  id: string;
  name: string;
  age: number;
  title: string;
  company: string;
  industry: string;
  distance: string;
  bio: string;
  interests: string[];
  imageUrl?: string;
}

interface SwipeScreenProps {
  onNavigateToHome: () => void;
}

// Mock data - nearby professionals who match your criteria
const MOCK_PROFILES: Profile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 28,
    title: 'Senior Product Designer',
    company: 'Tech Innovations Inc.',
    industry: 'Technology',
    distance: '50m away',
    bio: 'Passionate about creating user-centered experiences. Looking for collaboration on startup projects.',
    interests: ['Design Thinking', 'UX Research', 'Startups'],
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    age: 35,
    title: 'Marketing Director',
    company: 'Growth Labs',
    industry: 'Marketing',
    distance: '120m away',
    bio: 'Growth hacker with 10+ years experience. Open to mentorship and consulting opportunities.',
    interests: ['Growth Marketing', 'Analytics', 'Content Strategy'],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    age: 31,
    title: 'Full Stack Developer',
    company: 'Cloud Systems',
    industry: 'Software',
    distance: '200m away',
    bio: 'Building scalable web applications. Looking for co-founders and tech collaborators.',
    interests: ['React', 'Node.js', 'Cloud Architecture'],
  },
  {
    id: '4',
    name: 'David Kim',
    age: 42,
    title: 'Venture Capitalist',
    company: 'Innovation Capital',
    industry: 'Finance',
    distance: '350m away',
    bio: 'Investing in early-stage startups. Happy to provide guidance to entrepreneurs.',
    interests: ['Startups', 'Tech Investments', 'Mentorship'],
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    age: 29,
    title: 'Content Creator',
    company: 'Media House',
    industry: 'Media',
    distance: '180m away',
    bio: 'Creating engaging content for brands. Looking for creative partnerships.',
    interests: ['Video Production', 'Social Media', 'Branding'],
  },
];

// Profiles that will match when swiped right (based on ID)
const MATCHING_PROFILE_IDS = ['1', '3']; // Sarah Chen and Emily Rodriguez will match

export const SwipeScreen: React.FC<SwipeScreenProps> = ({
  onNavigateToHome,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles] = useState(MOCK_PROFILES);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const position = useRef(new Animated.ValueXY()).current;
  const swipeDirection = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        swipeDirection.setValue(gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          // Swipe right - LIKE
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          // Swipe left - PASS
          swipeLeft();
        } else {
          // Reset position
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const swipeRight = () => {
    const currentProfile = profiles[currentIndex];
    const isMatch = MATCHING_PROFILE_IDS.includes(currentProfile.id);

    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      if (isMatch) {
        // Show match screen
        setMatchedProfile(currentProfile);
      } else {
        // Just move to next profile
        setCurrentIndex(currentIndex + 1);
      }
      position.setValue({ x: 0, y: 0 });
    });
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const handleLike = () => {
    swipeRight();
  };

  const handlePass = () => {
    swipeLeft();
  };

  const renderCard = (profile: Profile, index: number) => {
    if (index < currentIndex) {
      return null;
    }

    if (index === currentIndex) {
      const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
      });

      const likeOpacity = position.x.interpolate({
        inputRange: [0, SWIPE_THRESHOLD],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });

      const nopeOpacity = position.x.interpolate({
        inputRange: [-SWIPE_THRESHOLD, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={profile.id}
          style={[
            styles.card,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {/* LIKE stamp */}
          <Animated.View
            style={[styles.stamp, styles.likeStamp, { opacity: likeOpacity }]}
          >
            <Text style={styles.stampText}>MATCH</Text>
          </Animated.View>

          {/* NOPE stamp */}
          <Animated.View
            style={[styles.stamp, styles.nopeStamp, { opacity: nopeOpacity }]}
          >
            <Text style={styles.stampText}>PASS</Text>
          </Animated.View>

          {/* Profile Image Placeholder */}
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>
                {profile.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </Text>
            </View>
          </View>

          {/* Distance Badge */}
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>📍 {profile.distance}</Text>
          </View>

          {/* Profile Info */}
          <View style={styles.cardContent}>
            <Text style={styles.name}>
              {profile.name}, {profile.age}
            </Text>
            <Text style={styles.title}>{profile.title}</Text>
            <Text style={styles.company}>@ {profile.company}</Text>
            <Text style={styles.industry}>{profile.industry}</Text>

            <Text style={styles.bio}>{profile.bio}</Text>

            <View style={styles.interestsContainer}>
              {profile.interests.map((interest, idx) => (
                <View key={idx} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      );
    }

    // Next card in stack (slightly visible behind)
    const scale = index === currentIndex + 1 ? 0.95 : 0.9;
    const translateY = (index - currentIndex) * 10;

    return (
      <Animated.View
        key={profile.id}
        style={[
          styles.card,
          {
            transform: [{ scale }, { translateY }],
            zIndex: -index,
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              {profile.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.name}>
            {profile.name}, {profile.age}
          </Text>
          <Text style={styles.title}>{profile.title}</Text>
        </View>
      </Animated.View>
    );
  };

  const handleKeepSwiping = () => {
    setMatchedProfile(null);
    setCurrentIndex(currentIndex + 1);
  };

  const handleSendMessage = () => {
    // TODO: Implement messaging functionality
    // For now, just continue swiping
    setMatchedProfile(null);
    setCurrentIndex(currentIndex + 1);
  };

  // Show match screen if there's a match
  if (matchedProfile) {
    return (
      <MatchScreen
        matchedProfile={{
          id: matchedProfile.id,
          name: matchedProfile.name,
          age: matchedProfile.age,
          title: matchedProfile.title,
          company: matchedProfile.company,
          distance: matchedProfile.distance,
        }}
        onKeepSwiping={handleKeepSwiping}
        onSendMessage={handleSendMessage}
      />
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No More Matches</Text>
          <Text style={styles.emptyText}>
            Check back later for more professionals nearby!
          </Text>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={onNavigateToHome}
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateToHome} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Nearby Matches</Text>
          <Text style={styles.headerSubtitle}>People around you</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Cards Stack */}
      <View style={styles.cardContainer}>
        {profiles.map((profile, index) => renderCard(profile, index)).reverse()}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={handlePass}
        >
          <Text style={styles.passIcon}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={handleLike}
        >
          <Text style={styles.actionIcon}>♥</Text>
        </TouchableOpacity>
      </View>

      {/* Counter */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {currentIndex + 1} / {profiles.length}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    ...theme.shadows.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  backButtonText: {
    fontSize: 24,
    color: '#374151',
    fontWeight: 'bold',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
  },
  headerRight: {
    width: 40,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  card: {
    width: SCREEN_WIDTH * 0.92,
    height: SCREEN_HEIGHT * 0.68,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageContainer: {
    width: '100%',
    height: '45%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 72,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  distanceBadge: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  distanceText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
  cardContent: {
    padding: theme.spacing.xl,
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: theme.spacing.xs,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 4,
  },
  company: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 4,
  },
  industry: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: theme.spacing.md,
    fontWeight: '500',
  },
  bio: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  interestTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  interestText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
  },
  stamp: {
    position: 'absolute',
    top: 100,
    zIndex: 1000,
    borderWidth: 4,
    borderRadius: 12,
    padding: theme.spacing.lg,
    transform: [{ rotate: '-20deg' }],
  },
  likeStamp: {
    right: 40,
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  nopeStamp: {
    left: 40,
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  stampText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing.xl,
    gap: 32,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  passButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EF4444',
    shadowColor: '#000000',
  },
  likeButton: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
    shadowColor: '#4F46E5',
  },
  actionIcon: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  passIcon: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  counterContainer: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 16,
  },
  counterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  homeButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
