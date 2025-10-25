/**
 * Profile Matching Form - Define who you're looking for
 * Business networking matching screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { Picker, PickerOption } from '../components/Picker';

interface FormData {
  lookingFor: string;
  industry: string;
  jobTitle: string;
  skills: string;
  purpose: string;
  location: string;
  experienceLevel: string;
  companySize: string;
}

interface FormErrors {
  [key: string]: string;
}

const purposeOptions: PickerOption[] = [
  { label: 'Networking', value: 'networking' },
  { label: 'Mentorship', value: 'mentorship' },
  { label: 'Collaboration', value: 'collaboration' },
  { label: 'Hiring / Recruiting', value: 'hiring' },
  { label: 'Investment / Funding', value: 'investment' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Learning / Knowledge Sharing', value: 'learning' },
  { label: 'Career Opportunities', value: 'career' },
];

const experienceLevelOptions: PickerOption[] = [
  { label: 'Intern / Entry Level', value: 'entry' },
  { label: 'Junior (1-3 years)', value: 'junior' },
  { label: 'Mid-Level (3-5 years)', value: 'mid' },
  { label: 'Senior (5-10 years)', value: 'senior' },
  { label: 'Lead / Principal (10+ years)', value: 'lead' },
  { label: 'Executive / C-Level', value: 'executive' },
];

const companySizeOptions: PickerOption[] = [
  { label: 'Startup (1-10 employees)', value: 'startup' },
  { label: 'Small (11-50 employees)', value: 'small' },
  { label: 'Medium (51-200 employees)', value: 'medium' },
  { label: 'Large (201-1000 employees)', value: 'large' },
  { label: 'Enterprise (1000+ employees)', value: 'enterprise' },
  { label: 'Any Size', value: 'any' },
];

const industryOptions: PickerOption[] = [
  { label: 'Technology / Software', value: 'technology' },
  { label: 'Finance / Banking', value: 'finance' },
  { label: 'Healthcare / Medical', value: 'healthcare' },
  { label: 'Education', value: 'education' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Retail / E-commerce', value: 'retail' },
  { label: 'Marketing / Advertising', value: 'marketing' },
  { label: 'Consulting', value: 'consulting' },
  { label: 'Real Estate', value: 'realestate' },
  { label: 'Entertainment / Media', value: 'entertainment' },
  { label: 'Non-Profit / NGO', value: 'nonprofit' },
  { label: 'Other', value: 'other' },
];

interface ProfileMatchingFormProps {
  onNavigateToHome?: () => void;
}

export const ProfileMatchingForm: React.FC<ProfileMatchingFormProps> = ({
  onNavigateToHome,
}) => {
  const [formData, setFormData] = useState<FormData>({
    lookingFor: '',
    industry: '',
    jobTitle: '',
    skills: '',
    purpose: '',
    location: '',
    experienceLevel: '',
    companySize: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.lookingFor.trim()) {
      newErrors.lookingFor = "Please describe who you're looking for";
    }

    if (!formData.purpose) {
      newErrors.purpose = 'Please select your purpose';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Please select an experience level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Profile Saved! 🎉',
        "Your matching preferences have been saved. We'll start finding the perfect matches for you!",
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setFormData({
                lookingFor: '',
                industry: '',
                jobTitle: '',
                skills: '',
                purpose: '',
                location: '',
                experienceLevel: '',
                companySize: '',
              });
            },
          },
        ],
      );
    }, 1500);
  };

  const handleReset = () => {
    Alert.alert('Reset Form', 'Are you sure you want to clear all fields?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => {
          setFormData({
            lookingFor: '',
            industry: '',
            jobTitle: '',
            skills: '',
            purpose: '',
            location: '',
            experienceLevel: '',
            companySize: '',
          });
          setErrors({});
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.neutral.white}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Find Your Match 💼</Text>
            <Text style={styles.headerSubtitle}>
              Tell us who you're looking for and we'll help you connect
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                👤 Who Are You Looking For?
              </Text>

              <TextInput
                label="Looking For"
                placeholder="e.g., Senior Product Manager, Startup Founder, etc."
                value={formData.lookingFor}
                onChangeText={value => updateField('lookingFor', value)}
                error={errors.lookingFor}
                required
                multiline
                numberOfLines={3}
                style={styles.multilineInput}
              />

              <Picker
                label="Purpose"
                value={formData.purpose}
                options={purposeOptions}
                onValueChange={value => updateField('purpose', value)}
                placeholder="What's your goal?"
                error={errors.purpose}
                required
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                🏢 Professional Background
              </Text>

              <Picker
                label="Industry"
                value={formData.industry}
                options={industryOptions}
                onValueChange={value => updateField('industry', value)}
                placeholder="Select industry"
                error={errors.industry}
                required
              />

              <TextInput
                label="Job Title / Role"
                placeholder="e.g., Product Manager, CEO, Designer"
                value={formData.jobTitle}
                onChangeText={value => updateField('jobTitle', value)}
                error={errors.jobTitle}
              />

              <Picker
                label="Experience Level"
                value={formData.experienceLevel}
                options={experienceLevelOptions}
                onValueChange={value => updateField('experienceLevel', value)}
                placeholder="Select experience level"
                error={errors.experienceLevel}
                required
              />

              <Picker
                label="Company Size"
                value={formData.companySize}
                options={companySizeOptions}
                onValueChange={value => updateField('companySize', value)}
                placeholder="Preferred company size"
                error={errors.companySize}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎯 Skills & Location</Text>

              <TextInput
                label="Skills / Expertise"
                placeholder="e.g., React, Product Strategy, UX Design"
                value={formData.skills}
                onChangeText={value => updateField('skills', value)}
                error={errors.skills}
                multiline
                numberOfLines={3}
                style={styles.multilineInput}
                helperText="Separate skills with commas"
              />

              <TextInput
                label="Location"
                placeholder="e.g., Tokyo, Remote, San Francisco"
                value={formData.location}
                onChangeText={value => updateField('location', value)}
                error={errors.location}
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                title="Find Matches"
                onPress={handleSubmit}
                variant="primary"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
                style={styles.submitButton}
              />

              <Button
                title="Reset Form"
                onPress={handleReset}
                variant="ghost"
                fullWidth
                disabled={isSubmitting}
              />
            </View>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>💡 Tips for Better Matches</Text>
            <Text style={styles.infoText}>
              • Be specific about the role and skills you're looking for{'\n'}•
              Select the purpose that best matches your goal{'\n'}• Include
              location preferences if important{'\n'}• The more details you
              provide, the better we can match you
            </Text>
          </View>

          {/* Footer with Back to Home */}
          {onNavigateToHome && (
            <View style={styles.footer}>
              <Button
                title="← Back to Home"
                onPress={onNavigateToHome}
                variant="ghost"
                fullWidth
              />
              <Text style={styles.footerText}>
                Proxima - Business Networking Made Simple
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing['2xl'],
  },
  header: {
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.fontSizes['3xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.primary.main,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight:
      theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
  },
  formCard: {
    backgroundColor: theme.colors.neutral.white,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    ...theme.shadows.md,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing.lg,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: theme.spacing.sm,
  },
  buttonContainer: {
    marginTop: theme.spacing.xl,
  },
  submitButton: {
    marginBottom: theme.spacing.md,
  },
  infoCard: {
    backgroundColor: theme.colors.primary.lightest,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary.main,
  },
  infoTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.primary.dark,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    lineHeight:
      theme.typography.fontSizes.base * theme.typography.lineHeights.relaxed,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    marginTop: theme.spacing.lg,
  },
  footerText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});
