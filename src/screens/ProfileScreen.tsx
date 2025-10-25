import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { theme } from '../theme';
import { Button } from '../components/Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Profile = {
  images: string[];
  education: string;
  gender: string;
  profileCompletion: number;
  isVerified: boolean;
  jobTitle: string;
  bio: string;
  lookingFor: string;
  distanceKm: number;
  userId: string;
  lastActiveAt: number;
  name: string;
  location: { country: string; city: string };
  relationshipGoal: string;
  interests: string[];
  age: number;
};

function timeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (day > 0) return `${day}d ago`;
  if (hr > 0) return `${hr}h ago`;
  if (min > 0) return `${min}m ago`;
  return 'just now';
}

interface ProfileMatchingFormProps {
  onNavigateToHome?: () => void;
}

const ProfileScreen: React.FC<ProfileMatchingFormProps> = ({
  onNavigateToHome,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const [profileData, setProfileData] = useState<Profile>({} as Profile);

  const onMomentumScrollEnd = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / SCREEN_WIDTH);
    setActiveIndex(idx);
  };

  const API_URL =
    'https://vxju2hufc3wanrtbs7eikcoc340nmkyb.lambda-url.us-east-2.on.aws/';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Profile API Error:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData.images) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 80 }}>
          Loading profile...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            onMomentumScrollEnd={onMomentumScrollEnd}
          >
            {profileData.images.map((uri, i) => (
              <Image
                key={uri + i}
                source={{ uri }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={styles.dots}>
            {profileData.images.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex ? styles.dotActive : undefined,
                ]}
              />
            ))}
          </View>
          <View style={styles.completionBadge}>
            <Text style={styles.completionText}>
              {profileData.profileCompletion}%
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.name}>
                {profileData.name}, {profileData.age}
              </Text>
              <Text style={styles.job}>{profileData.jobTitle}</Text>
              <Text style={styles.location}>
                {profileData.location.city}, {profileData.location.country} •{' '}
                {profileData.distanceKm} km
              </Text>
            </View>

            {profileData.isVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Education:</Text>
            <Text style={styles.metaValue}>{profileData.education}</Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Relationship:</Text>
            <Text style={styles.metaValue}>{profileData.relationshipGoal}</Text>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bio}>{profileData.bio}</Text>
          </View>

          <View style={styles.interestsContainer}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.chipsRow}>
              {profileData.interests.map(it => (
                <View key={it} style={styles.chip}>
                  <Text style={styles.chipText}>{it}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.footerInfo}>
            <Text style={styles.lastActive}>
              Last active: {timeAgo(profileData.lastActiveAt)}
            </Text>
            <Text style={styles.userId}>ID: {profileData.userId}</Text>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.buttonPrimary}>
              <Text style={styles.buttonPrimaryText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.buttonOutlineText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  carouselContainer: { height: SCREEN_WIDTH * 1.1, backgroundColor: '#000' },
  image: { width: SCREEN_WIDTH, height: SCREEN_WIDTH * 1.1 },
  dots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  dotActive: { backgroundColor: '#fff' },
  completionBadge: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 48 : 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completionText: { color: '#fff', fontWeight: '600' },
  infoContainer: { padding: 16, backgroundColor: '#fff' },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 28, fontWeight: '700', color: '#111' },
  job: { fontSize: 16, color: '#444', marginTop: 4 },
  location: { fontSize: 13, color: '#666', marginTop: 4 },
  verifiedBadge: {
    backgroundColor: '#e6f7ff',
    borderColor: '#00a3ff',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  verifiedText: { color: '#007aff', fontWeight: '600' },
  metaRow: { flexDirection: 'row', marginTop: 12 },
  metaLabel: { fontWeight: '600', width: 110, color: '#333' },
  metaValue: { color: '#555', flex: 1, flexWrap: 'wrap' },
  bioContainer: { marginTop: 16 },
  sectionTitle: { fontWeight: '700', fontSize: 16, marginBottom: 8 },
  bio: { color: '#333', lineHeight: 20 },
  interestsContainer: { marginTop: 16 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    backgroundColor: '#f2f4f7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { color: '#333' },
  footerInfo: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastActive: { color: '#777' },
  userId: { color: '#ccc' },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 40,
    justifyContent: 'space-between',
  },
  buttonPrimary: {
    backgroundColor: '#ff416c',
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonPrimaryText: { color: '#fff', fontWeight: '700' },
  buttonOutline: {
    borderColor: '#ff416c',
    borderWidth: 1,
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutlineText: { color: '#ff416c', fontWeight: '700' },
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

export default ProfileScreen;
