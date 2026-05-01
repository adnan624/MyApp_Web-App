import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

type PlatformKey = 'ios' | 'android';

interface Config {
  bg: string;
  border: string;
  text: string;
  label: string;
  note: string;
}

const CONFIG: Record<PlatformKey, Config> = {
  ios: {
    bg: '#e0f2fe', border: '#0284c7', text: '#0c4a6e',
    label: '🍎 iOS Native',
    note: 'JavaScriptCore + native UIKit views.',
  },
  android: {
    bg: '#dcfce7', border: '#16a34a', text: '#14532d',
    label: '🤖 Android Native',
    note: 'Hermes engine + native Android views.',
  },
};

const PlatformHeader: React.FC = () => {
  const cfg: Config = CONFIG[Platform.OS as PlatformKey] ?? CONFIG.android;
  return (
    <View style={[styles.chip, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <Text style={[styles.label, { color: cfg.text }]}>{cfg.label}</Text>
      <Text style={[styles.note,  { color: cfg.text }]}>{cfg.note}</Text>
    </View>
  );
};

export default PlatformHeader;

const styles = StyleSheet.create({
  chip: {
    marginTop: 16, borderWidth: 1.5, borderRadius: 12,
    paddingVertical: 10, paddingHorizontal: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  label: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  note:  { fontSize: 12, lineHeight: 18, opacity: 0.85 },
});
