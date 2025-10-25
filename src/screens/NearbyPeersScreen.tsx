/**
 * Nearby Peers Screen - Real-time peer-to-peer discovery using Multipeer Connectivity
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  initSession,
  type RNPeer,
  type MPCSession,
} from 'react-native-multipeer-connectivity';
import { theme } from '../theme';
import { Button } from '../components/Button';

// Type definitions for peer data
interface PeerInfo {
  userId: string;
  name: string;
}

interface ExtendedPeer extends RNPeer {
  info?: PeerInfo;
}

interface NearbyPeersScreenProps {
  onNavigateBack?: () => void;
}

const SERVICE_TYPE = 'proxima-net'; // Must match Info.plist service type (max 15 chars, lowercase)

export const NearbyPeersScreen: React.FC<NearbyPeersScreenProps> = ({
  onNavigateBack,
}) => {
  const [peers, setPeers] = useState<ExtendedPeer[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const sessionRef = useRef<MPCSession | null>(null);
  const [myUserInfo] = useState<PeerInfo>({
    userId: `user_${Math.random().toString(36).substring(2, 9)}`,
    name: 'Anonymous User',
  });

  useEffect(() => {
    initializeMultipeer();

    return () => {
      // Cleanup on unmount
      if (sessionRef.current) {
        sessionRef.current.stopBrowsing().catch(console.error);
        sessionRef.current.stopAdvertizing().catch(console.error);
        sessionRef.current.disconnect().catch(console.error);
      }
    };
  }, []);

  const initializeMultipeer = useCallback(async () => {
    try {
      if (Platform.OS !== 'ios') {
        Alert.alert(
          'Platform Not Supported',
          'Multipeer Connectivity is currently only available on iOS devices.',
        );
        return;
      }

      // Initialize session with user info in discoveryInfo
      const session = initSession({
        displayName: myUserInfo.name,
        serviceType: SERVICE_TYPE,
        discoveryInfo: {
          userId: myUserInfo.userId,
          name: myUserInfo.name,
        },
      });

      sessionRef.current = session;

      // Set up event listeners
      session.onFoundPeer(({ peer, discoveryInfo }) => {
        console.log('Peer found:', peer, discoveryInfo);
        setPeers(prevPeers => {
          // Avoid duplicates
          if (prevPeers.find(p => p.id === peer.id)) {
            return prevPeers;
          }
          const extendedPeer: ExtendedPeer = {
            ...peer,
            info: discoveryInfo
              ? {
                  userId: discoveryInfo.userId || peer.id,
                  name: discoveryInfo.name || peer.displayName,
                }
              : undefined,
          };
          return [...prevPeers, extendedPeer];
        });
      });

      session.onLostPeer(({ peer }) => {
        console.log('Peer lost:', peer);
        setPeers(prevPeers => prevPeers.filter(p => p.id !== peer.id));
      });

      session.onReceivedText(({ peer, text }) => {
        console.log('Received text from peer:', peer.id, text);
        try {
          const parsedData = JSON.parse(text);

          // Update peer info if we received user data
          if (parsedData.userId || parsedData.name) {
            setPeers(prevPeers =>
              prevPeers.map(p =>
                p.id === peer.id
                  ? {
                      ...p,
                      info: {
                        userId: parsedData.userId,
                        name: parsedData.name,
                      },
                    }
                  : p,
              ),
            );
          }
        } catch (error) {
          console.error('Error parsing received text:', error);
        }
      });

      session.onStartBrowsingError(({ text }) => {
        console.error('Browsing error:', text);
        Alert.alert('Browsing Error', text);
      });

      session.onStartAdvertisingError(({ text }) => {
        console.error('Advertising error:', text);
        Alert.alert('Advertising Error', text);
      });

      // Start browsing and advertising
      await session.browse();
      await session.advertize();

      setIsInitialized(true);
      console.log('Multipeer initialized successfully');
    } catch (error) {
      console.error('Error initializing Multipeer:', error);
      Alert.alert(
        'Initialization Error',
        `Failed to initialize peer discovery: ${error}`,
      );
    }
  }, [myUserInfo]);

  const handleSendToAll = useCallback(async () => {
    try {
      if (peers.length === 0) {
        Alert.alert('No Peers', 'No nearby peers found to send data to.');
        return;
      }

      if (!sessionRef.current) {
        Alert.alert('Error', 'Session not initialized.');
        return;
      }

      const dataToSend = JSON.stringify({
        userId: myUserInfo.userId,
        name: myUserInfo.name,
        timestamp: new Date().toISOString(),
      });

      // Send to all peers
      for (const peer of peers) {
        await sessionRef.current.sendText(peer.id, dataToSend);
      }

      Alert.alert('Success', 'Sent your information to all nearby peers!');
    } catch (error) {
      console.error('Error sending data:', error);
      Alert.alert('Error', `Failed to send data to peers: ${error}`);
    }
  }, [peers, myUserInfo]);

  const handleRefresh = useCallback(async () => {
    try {
      if (sessionRef.current) {
        await sessionRef.current.stopBrowsing();
        await sessionRef.current.stopAdvertizing();
        await sessionRef.current.disconnect();
      }
      setPeers([]);
      setIsInitialized(false);
      await initializeMultipeer();
    } catch (error) {
      console.error('Error refreshing:', error);
      Alert.alert('Error', 'Failed to refresh discovery.');
    }
  }, [initializeMultipeer]);

  const renderPeerItem = ({ item }: { item: ExtendedPeer }) => (
    <View style={styles.peerCard}>
      <View style={styles.peerIconContainer}>
        <Text style={styles.peerIcon}>👤</Text>
      </View>
      <View style={styles.peerInfo}>
        <Text style={styles.peerName}>{item.info?.name || 'Unknown User'}</Text>
        <Text style={styles.peerUserId}>
          ID: {item.info?.userId || item.id}
        </Text>
      </View>
      <View style={styles.peerStatusIndicator} />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateIcon}>🔍</Text>
      <Text style={styles.emptyStateTitle}>
        {isInitialized ? 'Searching for nearby peers...' : 'Initializing...'}
      </Text>
      <Text style={styles.emptyStateDescription}>
        {isInitialized
          ? 'Make sure both devices have the app open and are on the same local network.'
          : 'Setting up peer discovery...'}
      </Text>
      {!isInitialized && (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary.main}
          style={styles.loader}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.neutral.white}
      />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Nearby Professionals</Text>
          <Text style={styles.headerSubtitle}>
            {peers.length} {peers.length === 1 ? 'peer' : 'peers'} found
          </Text>
        </View>
        {onNavigateBack && (
          <Button
            title="Back"
            onPress={onNavigateBack}
            variant="outline"
            size="sm"
          />
        )}
      </View>

      {/* User Info Card */}
      <View style={styles.userInfoCard}>
        <Text style={styles.userInfoLabel}>Your Information</Text>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoIcon}>📱</Text>
          <View>
            <Text style={styles.userName}>{myUserInfo.name}</Text>
            <Text style={styles.userIdText}>ID: {myUserInfo.userId}</Text>
          </View>
        </View>
      </View>

      {/* Peers List */}
      <View style={styles.listContainer}>
        <FlatList
          data={peers}
          keyExtractor={item => item.id}
          renderItem={renderPeerItem}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={
            peers.length === 0 ? styles.emptyListContent : styles.listContent
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <Button
          title="Refresh Discovery"
          onPress={handleRefresh}
          variant="outline"
          fullWidth
          style={styles.actionButton}
        />
        <Button
          title={`Send My Info to All (${peers.length})`}
          onPress={handleSendToAll}
          variant="primary"
          fullWidth
          disabled={peers.length === 0}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    ...theme.shadows.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  userInfoCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary.lightest,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary.light,
  },
  userInfoLabel: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.primary.dark,
    marginBottom: theme.spacing.sm,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoIcon: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  userName: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
  },
  userIdText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  listContent: {
    paddingVertical: theme.spacing.md,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  peerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  peerIconContainer: {
    marginRight: theme.spacing.md,
  },
  peerIcon: {
    fontSize: 40,
  },
  peerInfo: {
    flex: 1,
  },
  peerName: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  peerUserId: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  peerStatusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.success.main,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing['2xl'],
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.lg,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
    lineHeight:
      theme.typography.fontSizes.base * theme.typography.lineHeights.relaxed,
  },
  loader: {
    marginTop: theme.spacing.xl,
  },
  actionContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
    ...theme.shadows.lg,
  },
  actionButton: {
    marginBottom: theme.spacing.md,
  },
});
