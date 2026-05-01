import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  Platform, ScrollView, useWindowDimensions,
} from 'react-native';
import type { HomeScreenProps, RootStackParamList } from '../types/navigation';
import { palette as C } from '../theme/colors';
import { LAYOUT_DESKTOP, LAYOUT_TABLET } from '../theme/breakpoints';

// ── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
  num: string;
  label: string;
}

interface FeatureItem {
  icon: string;
  color: string;
  title: string;
  desc: string;
}

interface TechItem {
  icon: string;
  name: string;
  ver: string;
}

// ── Component ────────────────────────────────────────────────────────────────

const HERO_QUICK_LINKS: { screen: keyof RootStackParamList; label: string }[] = [
  { screen: 'Explore', label: 'Explore' },
  { screen: 'Profile', label: 'Profile' },
  { screen: 'About', label: 'About' },
];

function getPlatformEmoji(): string {
  switch (Platform.OS) {
    case 'ios': return '🍎';
    case 'android': return '🤖';
    case 'web': return '🌐';
    default: return '📱';
  }
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isWide = width >= LAYOUT_TABLET;
  const isDesktop = width >= LAYOUT_DESKTOP;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

      {/* ── HERO ─────────────────────────────── */}
      <View style={styles.hero}>
        <View style={[styles.heroInner, isWide && styles.heroInnerWide]}>

          <View style={[styles.heroLeft, isWide && styles.heroLeftWide]}>
            <View style={styles.heroBadge}>
              <View style={styles.heroBadgeDot} />
              <Text style={styles.heroBadgeText}>React Native · Web · iOS · Android</Text>
            </View>
            <Text style={styles.heroTitle}>{'Build Once,\nShip Everywhere.'}</Text>
            <Text style={styles.heroSub}>
              A cross-platform POC using React Native CLI + react-native-web.
              Same codebase. Three platforms. Zero compromises.
            </Text>
            <View style={styles.heroActions}>
              <TouchableOpacity
                style={styles.heroCTA}
                onPress={() => navigation.navigate('Form')}
                activeOpacity={0.85}
              >
                <Text style={styles.heroCTAText}>Open Form Demo →</Text>
              </TouchableOpacity>
              <View style={styles.platformPill}>
                <Text style={styles.platformPillText}>
                  {getPlatformEmoji()}  {Platform.OS}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.settingsBtn}
                onPress={() => navigation.navigate('Settings')}
                activeOpacity={0.85}
              >
                <Text style={styles.settingsBtnText}>⚙ Settings</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.secondaryActions}>
              {HERO_QUICK_LINKS.map(({ screen, label }) => (
                <TouchableOpacity
                  key={screen}
                  style={styles.secondaryBtn}
                  onPress={() => navigation.navigate(screen)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.secondaryBtnText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {isWide && (
            <View style={styles.heroImageWrap}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80' }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.heroImageTint} />
              <View style={styles.heroImageBadge}>
                <Text style={styles.heroImageBadgeText}>react-native-web v0.20</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* ── STATS ────────────────────────────── */}
      <View style={styles.statsRow}>
        {STATS.map((s: StatItem, i: number) => (
          <View
            key={s.label}
            style={[styles.statItem, i < STATS.length - 1 && styles.statItemBorder]}
          >
            <Text style={styles.statNum}>{s.num}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* ── FEATURES ─────────────────────────── */}
      <View style={[styles.section, isWide && styles.sectionWide]}>
        <Text style={styles.eyebrow}>What's included</Text>
        <Text style={styles.sectionTitle}>Everything in one repo</Text>
        <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
          {FEATURES.map((f: FeatureItem) => (
            <View key={f.title} style={[styles.card, isWide && styles.cardWide]}>
              <View style={[styles.cardIcon, { backgroundColor: f.color + '22' }]}>
                <Text style={styles.cardIconText}>{f.icon}</Text>
              </View>
              <Text style={styles.cardTitle}>{f.title}</Text>
              <Text style={styles.cardDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── PLATFORM BANNER ──────────────────── */}
      <View style={[styles.section, isWide && styles.sectionWide]}>
        <View style={styles.platformBanner}>
          <View style={styles.platformBannerLeft}>
            <Text style={styles.platformBannerLabel}>You are on</Text>
            <Text style={styles.platformBannerOS}>{Platform.OS.toUpperCase()}</Text>
            <Text style={styles.platformBannerNote}>
              {Platform.OS === 'web'
                ? 'URL routing active — type /form in the address bar.'
                : 'Native gestures and hardware APIs are available.'}
            </Text>
          </View>
          <Text style={styles.platformBigEmoji}>
            {getPlatformEmoji()}
          </Text>
        </View>
      </View>

      {/* ── TECH STACK ───────────────────────── */}
      <View style={[styles.section, isWide && styles.sectionWide]}>
        <Text style={styles.eyebrow}>Tech Stack</Text>
        <Text style={styles.sectionTitle}>Built with the best tools</Text>
        <View style={styles.techRow}>
          {TECH.map((t: TechItem) => (
            <View key={t.name} style={styles.techChip}>
              <Text style={styles.techChipIcon}>{t.icon}</Text>
              <Text style={styles.techChipName}>{t.name}</Text>
              <Text style={styles.techChipVer}>{t.ver}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── FOOTER CTA ───────────────────────── */}
      <View style={[styles.section, isWide && styles.sectionWide, styles.sectionLast]}>
        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Ready to test the form?</Text>
          <Text style={styles.footerSub}>
            Controlled inputs, live validation, and platform-specific alerts.
          </Text>
          <TouchableOpacity
            style={styles.footerBtn}
            onPress={() => navigation.navigate('Form')}
            activeOpacity={0.85}
          >
            <Text style={styles.footerBtnText}>Go to Form Screen →</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

export default HomeScreen;

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  { num: '3',    label: 'Platforms'  },
  { num: '1',    label: 'Codebase'   },
  { num: '0',    label: 'UI Libs'    },
  { num: '100%', label: 'StyleSheet' },
];

const FEATURES: FeatureItem[] = [
  { icon: '📱', color: '#06b6d4', title: 'iOS Native',       desc: 'Full UIKit rendering via JavaScriptCore. Native animations, gestures and deep links.' },
  { icon: '🤖', color: '#10b981', title: 'Android Native',   desc: 'Hermes engine with native Android views. Full access to the Android API surface.' },
  { icon: '🌐', color: '#f59e0b', title: 'Web Browser',      desc: 'react-native-web maps every RN primitive to a DOM equivalent bundled by webpack.' },
  { icon: '🗺️', color: '#8b5cf6', title: 'URL Routing',     desc: 'react-navigation linking drives browser URL updates on web and deep links on native.' },
  { icon: '✂️', color: '#ef4444', title: 'Platform Files',  desc: '.web.js and .native.js swap entire components per platform with zero if-statements.' },
  { icon: '🎨', color: '#ec4899', title: 'StyleSheet Only', desc: 'Every layout uses StyleSheet.create — flex, shadows, responsive — no Tailwind needed.' },
];

const TECH: TechItem[] = [
  { icon: '⚛️', name: 'React',        ver: '19'   },
  { icon: '📱', name: 'React Native', ver: '0.85' },
  { icon: '🌐', name: 'RN Web',       ver: '0.20' },
  { icon: '📦', name: 'Webpack',      ver: '5'    },
  { icon: '🗺️', name: 'Navigation',  ver: '7'    },
  { icon: '🔧', name: 'Babel',        ver: '7'    },
];

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll:        { flex: 1, backgroundColor: C.bg },
  scrollContent: { paddingBottom: 80 },

  hero: {
    backgroundColor: C.bg,
    paddingTop: 48, paddingBottom: 56, paddingHorizontal: 24,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  heroInner:     { maxWidth: 520, width: '100%', alignSelf: 'center' as const },
  heroInnerWide: { maxWidth: 1100, flexDirection: 'row' as const, alignItems: 'center' as const, gap: 60 },
  heroLeft:      { flex: 1 },
  heroLeftWide:  { flex: 1 },

  heroBadge: {
    flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8,
    alignSelf: 'flex-start' as const,
    backgroundColor: C.surfaceHi,
    borderWidth: 1, borderColor: C.border,
    paddingVertical: 5, paddingHorizontal: 12, borderRadius: 20, marginBottom: 24,
  },
  heroBadgeDot:  { width: 7, height: 7, borderRadius: 4, backgroundColor: C.cyan },
  heroBadgeText: { fontSize: 12, color: C.cyan, fontWeight: '600' as const, letterSpacing: 0.5 },

  heroTitle: {
    fontSize: 44, fontWeight: '800' as const, color: C.white,
    lineHeight: 52, letterSpacing: -1, marginBottom: 18,
  },
  heroSub: {
    fontSize: 15, lineHeight: 25, color: C.muted, marginBottom: 32, maxWidth: 460,
  },
  heroActions:   { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 12, flexWrap: 'wrap' as const },
  heroCTA: {
    backgroundColor: C.cyan, paddingVertical: 14,
    paddingHorizontal: 26, borderRadius: 10,
  },
  heroCTAText:   { color: '#000', fontSize: 14, fontWeight: '800' as const },
  platformPill: {
    backgroundColor: C.surfaceHi, borderWidth: 1, borderColor: C.border,
    paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10,
  },
  platformPillText: { color: C.white, fontSize: 13, fontWeight: '600' as const },

  settingsBtn: {
    backgroundColor: C.surfaceHi, borderWidth: 1, borderColor: C.border,
    paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10,
  },
  settingsBtnText: { color: C.muted, fontSize: 13, fontWeight: '600' as const },

  secondaryActions: {
    flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 10, marginTop: 16,
    width: '100%' as const,
  },
  secondaryBtn: {
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10,
  },
  secondaryBtnText: { color: C.cyan, fontSize: 13, fontWeight: '700' as const },

  heroImageWrap: {
    flex: 1, maxWidth: 460, borderRadius: 16,
    overflow: 'hidden' as const, borderWidth: 1, borderColor: C.border,
  },
  heroImage: { width: '100%', height: 320 },
  heroImageTint: {
    position: 'absolute' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(6,182,212,0.07)',
  },
  heroImageBadge: {
    position: 'absolute' as const, bottom: 12, left: 12,
    backgroundColor: 'rgba(7,9,15,0.88)',
    borderWidth: 1, borderColor: C.border,
    paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8,
  },
  heroImageBadgeText: { color: C.cyan, fontSize: 11, fontWeight: '700' as const },

  statsRow: {
    flexDirection: 'row' as const,
    borderBottomWidth: 1, borderBottomColor: C.border,
    paddingVertical: 24, paddingHorizontal: 24,
    maxWidth: 1100, width: '100%', alignSelf: 'center' as const,
  },
  statItem:       { flex: 1, alignItems: 'center' as const },
  statItemBorder: { borderRightWidth: 1, borderRightColor: C.border },
  statNum:        { fontSize: 30, fontWeight: '900' as const, color: C.cyan, letterSpacing: -1 },
  statLabel: {
    fontSize: 11, color: C.muted, marginTop: 3,
    fontWeight: '500' as const, textTransform: 'uppercase' as const, letterSpacing: 0.8,
  },

  section:     { paddingHorizontal: 24, paddingTop: 56, maxWidth: 1100, width: '100%', alignSelf: 'center' as const },
  sectionWide: { paddingHorizontal: 48 },
  sectionLast: { paddingBottom: 0 },
  eyebrow: {
    fontSize: 11, color: C.cyan, fontWeight: '700' as const,
    textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 28, fontWeight: '800' as const, color: C.white,
    letterSpacing: -0.5, marginBottom: 32,
  },

  grid:        { flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 14 },
  gridDesktop: { gap: 18 },
  card: {
    flex: 1, minWidth: 240,
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    borderRadius: 14, padding: 20,
  },
  cardWide:     { minWidth: 260 },
  cardIcon: {
    width: 44, height: 44, borderRadius: 10,
    alignItems: 'center' as const, justifyContent: 'center' as const, marginBottom: 14,
  },
  cardIconText: { fontSize: 20 },
  cardTitle:    { fontSize: 15, fontWeight: '700' as const, color: C.white, marginBottom: 6 },
  cardDesc:     { fontSize: 13, lineHeight: 19, color: C.muted },

  platformBanner: {
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.cyan + '44',
    borderRadius: 16, padding: 28,
    flexDirection: 'row' as const, alignItems: 'center' as const, justifyContent: 'space-between' as const,
  },
  platformBannerLeft:  { flex: 1 },
  platformBannerLabel: {
    fontSize: 11, color: C.muted, fontWeight: '600' as const,
    textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 4,
  },
  platformBannerOS: {
    fontSize: 44, fontWeight: '900' as const, color: C.cyan,
    letterSpacing: -2, marginBottom: 10,
  },
  platformBannerNote: { fontSize: 13, color: C.muted, lineHeight: 20, maxWidth: 360 },
  platformBigEmoji:   { fontSize: 56, paddingLeft: 16 },

  techRow:      { flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 10 },
  techChip: {
    flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8,
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    paddingVertical: 9, paddingHorizontal: 14, borderRadius: 10,
  },
  techChipIcon: { fontSize: 15 },
  techChipName: { fontSize: 13, fontWeight: '700' as const, color: C.white },
  techChipVer:  { fontSize: 11, color: C.muted },

  footerCard: {
    backgroundColor: C.surfaceHi,
    borderWidth: 1, borderColor: C.border,
    borderRadius: 20, padding: 40, alignItems: 'center' as const,
  },
  footerTitle: {
    fontSize: 28, fontWeight: '800' as const, color: C.white,
    letterSpacing: -0.5, textAlign: 'center' as const, marginBottom: 10,
  },
  footerSub: {
    fontSize: 14, color: C.muted, lineHeight: 22,
    textAlign: 'center' as const, maxWidth: 420, marginBottom: 28,
  },
  footerBtn: {
    backgroundColor: C.cyan,
    paddingVertical: 14, paddingHorizontal: 32, borderRadius: 10,
  },
  footerBtnText: { color: '#000', fontSize: 14, fontWeight: '800' as const },
});
