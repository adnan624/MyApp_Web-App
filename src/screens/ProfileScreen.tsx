import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  useWindowDimensions, Platform,
} from 'react-native';
import type { ProfileScreenProps } from '../types/navigation';

const C = {
  bg:        '#07090f',
  surface:   '#0e1420',
  surfaceHi: '#151d2e',
  border:    '#1e2d45',
  cyan:      '#06b6d4',
  white:     '#f0f6ff',
  muted:     '#64748b',
} as const;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 640;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.card, isWide && styles.cardWide]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RN</Text>
        </View>
        <Text style={styles.name}>Demo User</Text>
        <Text style={styles.handle}>@crossplatform · {Platform.OS}</Text>
        <Text style={styles.bio}>
          Building with React Native for mobile and web. This screen is a placeholder for account details, avatars, and actions.
        </Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={[styles.stat, styles.statMid]}>
            <Text style={styles.statNum}>3</Text>
            <Text style={styles.statLabel}>Platforms</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>1</Text>
            <Text style={styles.statLabel}>Codebase</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Open Settings →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  scroll:        { flex: 1, backgroundColor: C.bg },
  scrollContent: { padding: 20, paddingBottom: 40, alignItems: 'center' },

  card: {
    width: '100%', maxWidth: 420,
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    borderRadius: 16, padding: 28, alignItems: 'center',
  },
  cardWide: { maxWidth: 520 },

  avatar: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: C.cyan + '33',
    borderWidth: 2, borderColor: C.cyan,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  avatarText: { fontSize: 22, fontWeight: '800', color: C.cyan },

  name:   { fontSize: 22, fontWeight: '800', color: C.white, marginBottom: 4 },
  handle: { fontSize: 13, color: C.muted, marginBottom: 16 },
  bio: {
    fontSize: 14, lineHeight: 22, color: C.muted,
    textAlign: 'center', marginBottom: 24,
  },

  stats: {
    flexDirection: 'row', width: '100%',
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.border,
    paddingVertical: 20, marginBottom: 24,
  },
  stat:    { flex: 1, alignItems: 'center' },
  statMid: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: C.border },
  statNum: { fontSize: 20, fontWeight: '800', color: C.cyan, marginBottom: 4 },
  statLabel: { fontSize: 11, color: C.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6 },

  primaryBtn: {
    backgroundColor: C.cyan,
    paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, width: '100%', alignItems: 'center',
  },
  primaryBtnText: { color: '#000', fontSize: 14, fontWeight: '800' },
});
