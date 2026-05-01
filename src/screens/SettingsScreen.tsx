import React, { useState } from 'react';
import {
  View, Text, Switch, StyleSheet, ScrollView,
  TouchableOpacity, Platform, useWindowDimensions,
} from 'react-native';
import type { SettingsScreenProps } from '../types/navigation';
import showPlatformAlert from '../components/PlatformAlert';
import { palette as C } from '../theme/colors';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ToggleItem {
  key: string;
  label: string;
  desc: string;
}

interface InfoRow {
  label: string;
  value: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const TOGGLES: ToggleItem[] = [
  { key: 'notifications', label: 'Push Notifications', desc: 'Receive alerts for important updates' },
  { key: 'darkMode',      label: 'Dark Mode',          desc: 'Currently active — matching system preference' },
  { key: 'haptics',       label: 'Haptic Feedback',    desc: 'Vibration on button presses (native only)' },
  { key: 'analytics',     label: 'Usage Analytics',    desc: 'Help improve the app with anonymous data' },
];

const APP_INFO: InfoRow[] = [
  { label: 'App Version',    value: '1.0.0' },
  { label: 'React Native',   value: '0.85.2' },
  { label: 'React',          value: '19.2.3' },
  { label: 'RN Web',         value: '0.20.0' },
  { label: 'Navigation',     value: '7.x' },
  { label: 'Platform',       value: Platform.OS },
];

// ── Component ─────────────────────────────────────────────────────────────────

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isWide: boolean = width >= 768;

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    notifications: true,
    darkMode: true,
    haptics: Platform.OS !== 'web',
    analytics: false,
  });

  const flip = (key: string): void => {
    setToggles(prev => {
      const next = { ...prev, [key]: !prev[key] };
      showPlatformAlert(
        `${key.charAt(0).toUpperCase() + key.slice(1)}`,
        `Turned ${next[key] ? 'on' : 'off'}`,
      );
      return next;
    });
  };

  const handleClearCache = (): void => {
    showPlatformAlert('Cache Cleared', 'Local cache has been reset successfully.');
  };

  const handleResetApp = (): void => {
    setToggles({
      notifications: true,
      darkMode: true,
      haptics: Platform.OS !== 'web',
      analytics: false,
    });
    showPlatformAlert('App Reset', 'All settings restored to defaults.');
  };

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <View style={[s.container, isWide && s.containerWide]}>

        {/* ── Header ──────────────────────── */}
        <View style={s.header}>
          <Text style={s.eyebrow}>Configuration</Text>
          <Text style={s.title}>Settings</Text>
          <Text style={s.subtitle}>
            Toggle switches use React Native's built-in Switch component —
            renders native UISwitch on iOS, Material switch on Android,
            and a styled checkbox on web.
          </Text>
        </View>

        {/* ── Preferences ─────────────────── */}
        <SectionLabel text="Preferences" />
        <View style={s.card}>
          {TOGGLES.map((item: ToggleItem, i: number) => (
            <View
              key={item.key}
              style={[s.row, i < TOGGLES.length - 1 && s.rowBorder]}
            >
              <View style={s.rowText}>
                <Text style={s.rowLabel}>{item.label}</Text>
                <Text style={s.rowDesc}>{item.desc}</Text>
              </View>
              <Switch
                value={toggles[item.key]}
                onValueChange={() => flip(item.key)}
                trackColor={{ false: C.border, true: C.cyan + '66' }}
                thumbColor={toggles[item.key] ? C.cyan : C.muted}
              />
            </View>
          ))}
        </View>

        {/* ── Platform Info ───────────────── */}
        <SectionLabel text="App Information" />
        <View style={s.card}>
          {APP_INFO.map((row: InfoRow, i: number) => (
            <View
              key={row.label}
              style={[s.infoRow, i < APP_INFO.length - 1 && s.rowBorder]}
            >
              <Text style={s.infoLabel}>{row.label}</Text>
              <Text style={[
                s.infoValue,
                row.label === 'Platform' && s.infoValueHighlight,
              ]}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Platform Note ───────────────── */}
        <View style={s.platformNote}>
          <View style={s.platformNoteDot} />
          <Text style={s.platformNoteText}>
            {Platform.OS === 'web'
              ? 'Switch renders as a styled <input type="checkbox"> on web.'
              : Platform.OS === 'ios'
              ? 'Switch renders as native UISwitch with system haptics.'
              : 'Switch renders as Material Design toggle.'}
          </Text>
        </View>

        {/* ── Danger Zone ─────────────────── */}
        <SectionLabel text="Danger Zone" />
        <View style={[s.card, s.dangerCard]}>
          <TouchableOpacity
            style={s.dangerRow}
            onPress={handleClearCache}
            activeOpacity={0.7}
          >
            <View style={s.rowText}>
              <Text style={s.dangerLabel}>Clear Cache</Text>
              <Text style={s.rowDesc}>Remove locally stored temporary data</Text>
            </View>
            <Text style={s.dangerArrow}>→</Text>
          </TouchableOpacity>

          <View style={s.rowBorder} />

          <TouchableOpacity
            style={s.dangerRow}
            onPress={handleResetApp}
            activeOpacity={0.7}
          >
            <View style={s.rowText}>
              <Text style={s.dangerLabel}>Reset All Settings</Text>
              <Text style={s.rowDesc}>Restore everything to factory defaults</Text>
            </View>
            <Text style={s.dangerArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* ── Back ────────────────────────── */}
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backText}>← Back to Home</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

// ── Section Label ─────────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <Text style={s.sectionLabel}>{text}</Text>
);

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  scroll:        { flex: 1, backgroundColor: C.bg },
  content:       { paddingVertical: 32, paddingHorizontal: 20, paddingBottom: 80 },
  container:     { maxWidth: 560, width: '100%', alignSelf: 'center' as const },
  containerWide: { maxWidth: 640 },

  // Header
  header:   { marginBottom: 36 },
  eyebrow: {
    fontSize: 11, color: C.cyan, fontWeight: '700' as const,
    textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 10,
  },
  title: {
    fontSize: 36, fontWeight: '900' as const, color: C.white,
    letterSpacing: -1, marginBottom: 10,
  },
  subtitle: { fontSize: 14, lineHeight: 22, color: C.muted },

  // Section label
  sectionLabel: {
    fontSize: 11, fontWeight: '700' as const, color: C.muted,
    textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 10, marginTop: 28,
  },

  // Card
  card: {
    backgroundColor: C.surface,
    borderWidth: 1, borderColor: C.border,
    borderRadius: 14, overflow: 'hidden' as const,
  },
  dangerCard: { borderColor: C.red + '33' },

  // Toggle row
  row: {
    flexDirection: 'row' as const, alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: 16, paddingHorizontal: 18,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  rowText:   { flex: 1, marginRight: 16 },
  rowLabel:  { fontSize: 15, fontWeight: '600' as const, color: C.white, marginBottom: 3 },
  rowDesc:   { fontSize: 12, color: C.muted, lineHeight: 17 },

  // Info row
  infoRow: {
    flexDirection: 'row' as const, alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: 14, paddingHorizontal: 18,
  },
  infoLabel: { fontSize: 14, color: C.muted, fontWeight: '500' as const },
  infoValue: { fontSize: 14, color: C.white, fontWeight: '700' as const },
  infoValueHighlight: {
    color: C.cyan, backgroundColor: C.cyan + '1a',
    paddingVertical: 2, paddingHorizontal: 8, borderRadius: 6,
    overflow: 'hidden' as const,
  },

  // Platform note
  platformNote: {
    flexDirection: 'row' as const, alignItems: 'center' as const,
    gap: 8, marginTop: 14,
  },
  platformNoteDot:  { width: 6, height: 6, borderRadius: 3, backgroundColor: C.cyan },
  platformNoteText: { fontSize: 12, color: C.muted, flex: 1 },

  // Danger rows
  dangerRow: {
    flexDirection: 'row' as const, alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: 16, paddingHorizontal: 18,
  },
  dangerLabel: { fontSize: 15, fontWeight: '600' as const, color: C.red, marginBottom: 3 },
  dangerArrow: { fontSize: 18, color: C.red, fontWeight: '700' as const },

  // Back
  backBtn:  { marginTop: 32, alignSelf: 'center' as const },
  backText: { fontSize: 14, color: C.cyan, fontWeight: '600' as const },
});
