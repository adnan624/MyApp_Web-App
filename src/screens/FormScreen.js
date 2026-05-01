import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
  ActivityIndicator, useWindowDimensions,
} from 'react-native';
import showPlatformAlert from '../components/PlatformAlert';

const C = {
  bg:         '#07090f',
  surface:    '#0e1420',
  surfaceHi:  '#151d2e',
  border:     '#1e2d45',
  cyan:       '#06b6d4',
  white:      '#f0f6ff',
  muted:      '#64748b',
  error:      '#f87171',
  errorBg:    '#1c0a0a',
  green:      '#34d399',
};

const INITIAL = { name: '', email: '', message: '' };

export default function FormScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const [form, setForm]       = useState(INITIAL);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [focused, setFocused] = useState(null);

  const update = useCallback((field, val) => {
    setForm(p => ({ ...p, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: null }));
  }, [errors]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name = 'Name is required';
    if (!form.email.trim())   e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10)
                              e.message = 'Minimum 10 characters';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
    showPlatformAlert('Sent!', `Thanks ${form.name.trim()}, we'll reply to ${form.email.trim()}.`);
  };

  const reset = () => { setForm(INITIAL); setErrors({}); setDone(false); };

  return (
    <KeyboardAvoidingView
      style={st.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={st.scroll}
        contentContainerStyle={[st.content, isWide && st.contentWide]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[st.layout, isWide && st.layoutWide]}>

          {/* ── Left panel ─────────────────────── */}
          <View style={[st.left, isWide && st.leftWide]}>
            <TouchableOpacity style={st.back} onPress={() => navigation.goBack()}>
              <Text style={st.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={st.eyebrow}>Form Demo</Text>
            <Text style={st.leftTitle}>{'Get in\nTouch'}</Text>
            <Text style={st.leftSub}>
              React Native's TextInput renders as a native input on iOS/Android
              and as a DOM input on web — identical API everywhere.
            </Text>
            <View style={st.bullets}>
              {BULLETS.map(b => (
                <View key={b} style={st.bullet}>
                  <View style={st.bulletDot} />
                  <Text style={st.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
            <View style={st.osBadge}>
              <Text style={st.osBadgeText}>
                {OS_EMOJI[Platform.OS]}  {Platform.OS}
              </Text>
            </View>
          </View>

          {/* ── Form panel ─────────────────────── */}
          <View style={[st.right, isWide && st.rightWide]}>
            {done ? (
              <View style={st.success}>
                <View style={st.successCircle}>
                  <Text style={st.successTick}>✓</Text>
                </View>
                <Text style={st.successTitle}>Message Sent!</Text>
                <Text style={st.successBody}>
                  Thanks <Text style={st.successEm}>{form.name}</Text>.{'\n'}
                  We'll reply to <Text style={st.successEm}>{form.email}</Text>.
                </Text>
                <View style={st.successMeta}>
                  <Text style={st.successMetaText}>via {Platform.OS}</Text>
                </View>
                <TouchableOpacity style={st.resetBtn} onPress={reset}>
                  <Text style={st.resetText}>Send Another</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={st.formTitle}>Send a Message</Text>
                <Text style={st.formSub}>All fields required.</Text>

                <Field label="Full Name"       placeholder="Jane Appleseed"
                  value={form.name}    onChangeText={v => update('name', v)}
                  error={errors.name}  isFocused={focused === 'name'}
                  onFocus={() => setFocused('name')}   onBlur={() => setFocused(null)}
                  autoCapitalize="words" />

                <Field label="Email Address"   placeholder="jane@example.com"
                  value={form.email}   onChangeText={v => update('email', v)}
                  error={errors.email} isFocused={focused === 'email'}
                  onFocus={() => setFocused('email')}  onBlur={() => setFocused(null)}
                  keyboardType="email-address" autoCapitalize="none" />

                <Field label="Message"         placeholder="What's on your mind?"
                  value={form.message}    onChangeText={v => update('message', v)}
                  error={errors.message}  isFocused={focused === 'message'}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  multiline numberOfLines={5} />

                <View style={st.hint}>
                  <View style={st.hintDot} />
                  <Text style={st.hintText}>
                    {Platform.OS === 'web'
                      ? 'Tab between fields · browser autofill active'
                      : Platform.OS === 'ios'
                      ? 'QuickType and autocorrect active'
                      : 'IME and autofill active'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[st.submitBtn, loading && st.submitBtnOff]}
                  onPress={submit} disabled={loading} activeOpacity={0.85}
                >
                  {loading
                    ? <ActivityIndicator color="#000" size="small" />
                    : <Text style={st.submitText}>Send Message →</Text>
                  }
                </TouchableOpacity>
              </>
            )}
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, error, isFocused, multiline = false, numberOfLines = 1, ...rest }) {
  return (
    <View style={f.wrap}>
      <Text style={f.label}>{label}</Text>
      <TextInput
        style={[f.input, multiline && f.multi, isFocused && f.focused, error && f.hasError]}
        placeholderTextColor={C.muted}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...rest}
      />
      {error
        ? <Text style={f.errorText}>⚠ {error}</Text>
        : isFocused ? <View style={f.focusLine} /> : null}
    </View>
  );
}

const BULLETS = [
  'Controlled inputs with real-time validation',
  'Platform.OS conditional keyboard behaviour',
  'PlatformAlert: Alert.alert native / window.alert web',
  'KeyboardAvoidingView active on iOS',
];
const OS_EMOJI = { ios: '🍎', android: '🤖', web: '🌐' };

const st = StyleSheet.create({
  flex:   { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
  content:     { flexGrow: 1, paddingVertical: 32, paddingHorizontal: 20 },
  contentWide: { paddingVertical: 56, paddingHorizontal: 48 },

  layout:     { maxWidth: 960, width: '100%', alignSelf: 'center' },
  layoutWide: { flexDirection: 'row', alignItems: 'flex-start', gap: 64 },

  // Left
  left:     { width: '100%', marginBottom: 32 },
  leftWide: { width: 300, marginBottom: 0 },
  back: {
    alignSelf: 'flex-start', marginBottom: 32,
    paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 1, borderColor: C.border, borderRadius: 8,
  },
  backText:  { color: C.muted, fontSize: 13, fontWeight: '600' },
  eyebrow: {
    fontSize: 11, color: C.cyan, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10,
  },
  leftTitle: {
    fontSize: 40, fontWeight: '900', color: C.white,
    letterSpacing: -1.2, lineHeight: 46, marginBottom: 16,
  },
  leftSub: { fontSize: 13, lineHeight: 21, color: C.muted, marginBottom: 28 },
  bullets: { gap: 10, marginBottom: 32 },
  bullet:  { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  bulletDot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: C.cyan, marginTop: 7,
  },
  bulletText: { flex: 1, fontSize: 12, color: C.muted, lineHeight: 19 },
  osBadge: {
    alignSelf: 'flex-start',
    backgroundColor: C.surfaceHi, borderWidth: 1, borderColor: C.border,
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20,
  },
  osBadgeText: { fontSize: 13, color: C.white, fontWeight: '600' },

  // Right
  right:     { width: '100%', backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, borderRadius: 18, padding: 24 },
  rightWide: { flex: 1, padding: 36 },
  formTitle: { fontSize: 22, fontWeight: '800', color: C.white, letterSpacing: -0.4, marginBottom: 4 },
  formSub:   { fontSize: 13, color: C.muted, marginBottom: 28 },

  hint:    { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  hintDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.cyan },
  hintText:{ fontSize: 12, color: C.muted },

  submitBtn:    { backgroundColor: C.cyan, paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  submitBtnOff: { opacity: 0.6 },
  submitText:   { color: '#000', fontSize: 15, fontWeight: '800' },

  // Success
  success:       { alignItems: 'center', paddingVertical: 20 },
  successCircle: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: C.green + '1a',
    borderWidth: 2, borderColor: C.green,
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  successTick:  { fontSize: 28, color: C.green },
  successTitle: { fontSize: 28, fontWeight: '900', color: C.white, letterSpacing: -0.8, marginBottom: 10 },
  successBody:  { fontSize: 14, color: C.muted, textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  successEm:    { color: C.cyan, fontWeight: '700' },
  successMeta:  {
    backgroundColor: C.bg, borderWidth: 1, borderColor: C.border,
    paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8, marginBottom: 24,
  },
  successMetaText: { fontSize: 12, color: C.muted, fontWeight: '600' },
  resetBtn:  { borderWidth: 1.5, borderColor: C.white, paddingVertical: 11, paddingHorizontal: 26, borderRadius: 10 },
  resetText: { fontSize: 13, fontWeight: '700', color: C.white },
});

const f = StyleSheet.create({
  wrap:  { marginBottom: 20 },
  label: {
    fontSize: 11, fontWeight: '700', color: C.muted,
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8,
  },
  input: {
    backgroundColor: C.bg, borderWidth: 1.5, borderColor: C.border,
    borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14,
    fontSize: 14, color: C.white,
  },
  multi:     { minHeight: 110, textAlignVertical: 'top' },
  focused:   { borderColor: C.cyan },
  hasError:  { borderColor: C.error, backgroundColor: C.errorBg },
  focusLine: { height: 2, backgroundColor: C.cyan, borderRadius: 1, marginTop: 4 },
  errorText: { fontSize: 12, color: C.error, marginTop: 5, fontWeight: '500' },
});
