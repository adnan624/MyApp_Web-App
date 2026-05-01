import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Linking } from 'react-native';
import type { AboutScreenProps } from '../types/navigation';

const C = {
  bg:        '#07090f',
  surface:   '#0e1420',
  surfaceHi: '#151d2e',
  border:    '#1e2d45',
  cyan:      '#06b6d4',
  white:     '#f0f6ff',
  muted:     '#64748b',
} as const;

const AboutScreen: React.FC<AboutScreenProps> = () => {
  const { width } = useWindowDimensions();
  const isWide = width >= 640;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.block, isWide && styles.blockWide]}>
        <Text style={styles.eyebrow}>MyApp</Text>
        <Text style={styles.title}>About</Text>
        <Text style={styles.p}>
          This project demonstrates React Native with react-native-web, shared navigation, and platform-specific behaviour from one repository.
        </Text>
        <Text style={styles.p}>
          Version 1.0.0 — for learning and demos. Replace this copy with your product story, support links, and legal notices.
        </Text>
      </View>

      <View style={[styles.links, isWide && styles.linksWide]}>
        <Text style={styles.linksTitle}>Resources</Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://reactnative.dev')}
        >
          React Native docs →
        </Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://necolas.github.io/react-native-web/')}
        >
          react-native-web →
        </Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://reactnavigation.org')}
        >
          React Navigation →
        </Text>
      </View>

      <View style={[styles.footer, isWide && styles.footerWide]}>
        <Text style={styles.footerText}>Made for cross-platform demos · {new Date().getFullYear()}</Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  scroll:        { flex: 1, backgroundColor: C.bg },
  scrollContent: { padding: 20, paddingBottom: 40 },

  block:     { marginBottom: 28, maxWidth: 640 },
  blockWide: { alignSelf: 'center', width: '100%' },
  eyebrow: {
    fontSize: 11, color: C.cyan, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 8,
  },
  title: {
    fontSize: 28, fontWeight: '800', color: C.white,
    letterSpacing: -0.5, marginBottom: 16,
  },
  p: { fontSize: 14, lineHeight: 22, color: C.muted, marginBottom: 14 },

  links: {
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    borderRadius: 14, padding: 20, marginBottom: 24,
  },
  linksWide: { maxWidth: 640, alignSelf: 'center', width: '100%' },
  linksTitle: { fontSize: 13, fontWeight: '700', color: C.white, marginBottom: 14 },
  link: {
    fontSize: 14, color: C.cyan, fontWeight: '600',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.border,
  },

  footer:     { alignItems: 'center' },
  footerWide: { maxWidth: 640, alignSelf: 'center', width: '100%' },
  footerText: { fontSize: 12, color: C.muted },
});
