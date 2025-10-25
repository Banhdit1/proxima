/**
 * Home Screen - Main landing page of Proxima Business Matching App
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Button } from '../components/Button';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  onNavigateToForm: () => void;
  navigateToProfile: () => void;
  onNavigateToSwipe: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToForm,
  navigateToProfile,
  onNavigateToSwipe,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.neutral.white}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.logo}>Proxima</Text>
          <Text style={styles.tagline}>
            Business Networking & Professional Matching
          </Text>
        </View>

        {/* Nearby Matches Banner */}
        <View style={styles.notificationBanner}>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationIcon}>🔥</Text>
            <View style={styles.notificationText}>
              <Text style={styles.notificationTitle}>
                5 New Matches Nearby!
              </Text>
              <Text style={styles.notificationSubtitle}>
                Professionals around you match your criteria
              </Text>
            </View>
          </View>
          <Button
            title="View Matches"
            onPress={onNavigateToSwipe}
            variant="primary"
            fullWidth
            style={styles.notificationButton}
          />
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>
              Connect with the Right People 🤝
            </Text>
            <Text style={styles.heroDescription}>
              Find your perfect business match. Whether you're looking for
              mentorship, collaboration, hiring, or partnerships, Proxima
              connects you with professionals who align with your goals.
            </Text>
            <Button
              title="Start Matching Now"
              onPress={onNavigateToForm}
              variant="primary"
              fullWidth
              style={styles.ctaButton}
            />
          </View>
        </View>

        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>Go to Profile Screen</Text>
            <Text style={styles.heroDescription}>
              View the my profile screen.
            </Text>
            <Button
              title="Go to Profile"
              onPress={navigateToProfile}
              variant="primary"
              fullWidth
              style={styles.ctaButton}
            />
          </View>
        </View>

        {/* Feature Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>

          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📝</Text>
              <Text style={styles.featureTitle}>Create Profile</Text>
              <Text style={styles.featureDescription}>
                Tell us who you're looking for and your goals
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🔍</Text>
              <Text style={styles.featureTitle}>Smart Match</Text>
              <Text style={styles.featureDescription}>
                Our AI finds the perfect professional matches
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>💬</Text>
              <Text style={styles.featureTitle}>Connect</Text>
              <Text style={styles.featureDescription}>
                Start conversations and build relationships
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🚀</Text>
              <Text style={styles.featureTitle}>Grow</Text>
              <Text style={styles.featureDescription}>
                Achieve your business and career goals
              </Text>
            </View>
          </View>
        </View>

        {/* Use Cases Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfect For</Text>

          <View style={styles.useCaseContainer}>
            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>👔</Text>
              <View style={styles.useCaseTextContainer}>
                <Text style={styles.useCaseTitle}>Job Seekers</Text>
                <Text style={styles.useCaseDescription}>
                  Find recruiters, hiring managers, and companies looking for
                  talent
                </Text>
              </View>
            </View>

            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>🎯</Text>
              <View style={styles.useCaseTextContainer}>
                <Text style={styles.useCaseTitle}>Entrepreneurs</Text>
                <Text style={styles.useCaseDescription}>
                  Connect with investors, co-founders, and business partners
                </Text>
              </View>
            </View>

            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>📚</Text>
              <View style={styles.useCaseTextContainer}>
                <Text style={styles.useCaseTitle}>Mentors & Mentees</Text>
                <Text style={styles.useCaseDescription}>
                  Share knowledge and grow together through mentorship
                </Text>
              </View>
            </View>

            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>🤝</Text>
              <View style={styles.useCaseTextContainer}>
                <Text style={styles.useCaseTitle}>Collaborators</Text>
                <Text style={styles.useCaseDescription}>
                  Find team members for projects and business ventures
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.section}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to Find Your Match?</Text>
            <Text style={styles.ctaDescription}>
              Join thousands of professionals already making meaningful
              connections
            </Text>
            <Button
              title="Create Your Match Profile"
              onPress={onNavigateToForm}
              variant="primary"
              fullWidth
              size="lg"
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Proxima - Business Networking Made Simple
          </Text>
          <Text style={styles.footerSubtext}>
            Built with React Native {'\u2665'} | Version 0.0.1
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.neutral.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing['2xl'],
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.background.tertiary,
    alignItems: 'center',
  },
  logo: {
    fontSize: theme.typography.fontSizes['4xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.primary.main,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  notificationBanner: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.primary.lightest,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
    ...theme.shadows.lg,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  notificationIcon: {
    fontSize: 40,
    marginRight: theme.spacing.md,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.primary.dark,
    marginBottom: theme.spacing.xs,
  },
  notificationSubtitle: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  notificationButton: {
    marginTop: theme.spacing.sm,
  },
  heroSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  heroCard: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  heroTitle: {
    fontSize: theme.typography.fontSizes['3xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  heroDescription: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    lineHeight:
      theme.typography.fontSizes.base * theme.typography.lineHeights.relaxed,
    marginBottom: theme.spacing.md,
  },
  ctaButton: {
    marginTop: theme.spacing.md,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
  },
  featureCard: {
    width: (width - theme.spacing.lg * 2 - theme.spacing.xs * 2) / 2,
    margin: theme.spacing.xs,
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: theme.spacing.sm,
  },
  featureTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight:
      theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
  },
  useCaseContainer: {
    gap: theme.spacing.md,
  },
  useCaseCard: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  useCaseIcon: {
    fontSize: 40,
    marginRight: theme.spacing.md,
  },
  useCaseTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  useCaseTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  useCaseDescription: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.secondary,
    lineHeight:
      theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
  },
  ctaCard: {
    backgroundColor: theme.colors.primary.lightest,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary.light,
  },
  ctaTitle: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.primary.dark,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight:
      theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  footerSubtext: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.tertiary,
  },
});
