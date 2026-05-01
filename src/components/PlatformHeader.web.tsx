import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const PlatformHeader: React.FC = () => (
  <View style={styles.bar}>
    <View style={styles.pill}>
      <View style={styles.dot} />
      <Text style={styles.text}>react-native-web</Text>
    </View>
    <Text style={styles.divider}>·</Text>
    <Text style={styles.meta}>Platform.OS = &quot;{Platform.OS}&quot;</Text>
  </View>
);

export default PlatformHeader;

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 32,
  },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#06b6d422',
    borderWidth: 1, borderColor: '#06b6d444',
    paddingVertical: 5, paddingHorizontal: 12, borderRadius: 20,
  },
  dot:     { width: 7, height: 7, borderRadius: 4, backgroundColor: '#06b6d4' },
  text:    { fontSize: 12, color: '#06b6d4', fontWeight: '700', letterSpacing: 0.3 },
  divider: { color: '#334155', fontSize: 14 },
  meta:    { fontSize: 12, color: '#64748b', fontWeight: '500' },
});
