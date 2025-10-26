/**
 * Match Screen - Displays when two users match
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MatchedProfile {
  id: string;
  name: string;
  age: number;
  title: string;
  company: string;
  distance: string;
}

interface MatchScreenProps {
  matchedProfile: MatchedProfile;
  onKeepSwiping: () => void;
  onSendMessage: () => void;
}

export const MatchScreen: React.FC<MatchScreenProps> = ({
  matchedProfile,
  onKeepSwiping,
  onSendMessage,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the match screen entrance
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim, fadeAnim, glowAnim]);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* Animated Background Effect */}
      <View style={styles.backgroundOverlay} />

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* It's a Match Title */}
        <Animated.View
          style={[styles.titleContainer, { opacity: glowOpacity }]}
        >
          <Text style={styles.matchTitle}>IT'S A MATCH!</Text>
          <Text style={styles.matchEmoji}>✨💫✨</Text>
        </Animated.View>

        <Text style={styles.subtitle}>
          You and {matchedProfile.name.split(' ')[0]} matched!
        </Text>

        {/* Profile Cards Container */}
        <View style={styles.profilesContainer}>
          {/* Your Profile Placeholder */}
          <View style={styles.profileCard}>
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitials}>YOU</Text>
            </View>
            <View style={styles.heartIcon}>
              <Text style={styles.heartText}>♥</Text>
            </View>
          </View>

          {/* Matched Profile */}
          <View style={styles.profileCard}>
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitials}>
                {matchedProfile.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </Text>
            </View>
          </View>
        </View>

        {/* Matched User Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {matchedProfile.name}, {matchedProfile.age}
          </Text>
          <Text style={styles.title}>{matchedProfile.title}</Text>
          <Text style={styles.company}>@ {matchedProfile.company}</Text>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>
              📍 {matchedProfile.distance}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.sendMessageButton}
            onPress={onSendMessage}
          >
            <Text style={styles.sendMessageText}>💬 Send Message</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.keepSwipingButton}
            onPress={onKeepSwiping}
          >
            <Text style={styles.keepSwipingText}>Keep Swiping</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  matchTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    letterSpacing: -1,
  },
  matchEmoji: {
    fontSize: 36,
    marginTop: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    fontWeight: '500',
  },
  profilesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    gap: -30,
  },
  profileCard: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  profileImagePlaceholder: {
    flex: 1,
    borderRadius: 66,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  heartIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  heartText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    backgroundColor: '#FFFFFF',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: SCREEN_WIDTH * 0.8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
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
    marginBottom: theme.spacing.md,
  },
  distanceBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  distanceText: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
  },
  actionsContainer: {
    width: '100%',
    gap: theme.spacing.md,
  },
  sendMessageButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: theme.spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  sendMessageText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  keepSwipingButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  keepSwipingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
});
