import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import type { ExploreScreenProps } from '../types/navigation';
import showPlatformAlert from '../components/PlatformAlert';
import { APP_LINK_SCHEME, WEB_BASE_URL } from '../config/linking';

interface ExploreItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

const C = {
  bg:        '#07090f',
  surface:   '#0e1420',
  surfaceHi: '#151d2e',
  border:    '#1e2d45',
  cyan:      '#06b6d4',
  white:     '#f0f6ff',
  muted:     '#64748b',
} as const;

const ITEMS: ExploreItem[] = [
  {
    id: '1',
    icon: '🧭',
    title: 'Deep linking',
    subtitle: `Try ${APP_LINK_SCHEME}://explore or ${WEB_BASE_URL}/explore when configured.`,
  },
  { id: '2', icon: '📦', title: 'Single bundle', subtitle: 'Same JS runs on iOS, Android, and web.' },
  { id: '3', icon: '🎨', title: 'StyleSheet', subtitle: 'Layouts use flex and tokens — no extra UI kit.' },
  { id: '4', icon: '⚡', title: 'Hermes', subtitle: 'Fast startup and smaller bytecode on native.' },
  { id: '5', icon: '🔗', title: 'React Navigation', subtitle: 'Stack + URL prefixes for web and native.' },
];

const ExploreScreen: React.FC<ExploreScreenProps> = () => {
  const { width } = useWindowDimensions();
  const isWide = width >= 640;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.header, isWide && styles.headerWide]}>
        <Text style={styles.eyebrow}>Discover</Text>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.sub}>
          Demo list screen — tap a row for a quick platform alert. Use this pattern for feeds, settings groups, or feature hubs.
        </Text>
      </View>

      <View style={[styles.list, isWide && styles.listWide]}>
        {ITEMS.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.row, index < ITEMS.length - 1 && styles.rowBorder]}
            onPress={() => showPlatformAlert(item.title, item.subtitle)}
            activeOpacity={0.75}
          >
            <View style={styles.rowIcon}>
              <Text style={styles.rowIconText}>{item.icon}</Text>
            </View>
            <View style={styles.rowBody}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  scroll:        { flex: 1, backgroundColor: C.bg },
  scrollContent: { paddingBottom: 40, paddingHorizontal: 20, paddingTop: 8 },

  header:     { marginBottom: 24, maxWidth: 640 },
  headerWide: { alignSelf: 'center', width: '100%' },
  eyebrow: {
    fontSize: 11, color: C.cyan, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 8,
  },
  title: {
    fontSize: 28, fontWeight: '800', color: C.white,
    letterSpacing: -0.5, marginBottom: 10,
  },
  sub: { fontSize: 14, lineHeight: 22, color: C.muted },

  list: {
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    borderRadius: 14, overflow: 'hidden',
  },
  listWide: { maxWidth: 720, alignSelf: 'center', width: '100%' },

  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16, paddingHorizontal: 14, gap: 12,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  rowIcon: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: C.surfaceHi, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: C.border,
  },
  rowIconText: { fontSize: 20 },
  rowBody: { flex: 1, minWidth: 0 },
  rowTitle:   { fontSize: 15, fontWeight: '700', color: C.white, marginBottom: 4 },
  rowSubtitle:{ fontSize: 12, lineHeight: 17, color: C.muted },
  chevron:    { fontSize: 22, color: C.muted, fontWeight: '300', paddingLeft: 4 },
});
