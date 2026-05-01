import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
  ActivityIndicator, useWindowDimensions, TextInputProps,
} from 'react-native';
import type { FormScreenProps } from '../types/navigation';
import showPlatformAlert from '../components/PlatformAlert';
import { palette as C } from '../theme/colors';

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string | null;
  email?: string | null;
  message?: string | null;
}

interface FieldProps extends TextInputProps {
  label: string;
  error?: string | null;
  isFocused: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

type PlatformKey = 'ios' | 'android' | 'web';

// ── Constants ─────────────────────────────────────────────────────────────────

const INITIAL: FormState = { name: '', email: '', message: '' };

const BULLETS: string[] = [
  'Controlled inputs with real-time validation',
  'Platform.OS conditional keyboard behaviour',
  'PlatformAlert: Alert.alert native / window.alert web',
  'KeyboardAvoidingView active on iOS',
];

const OS_EMOJI: Record<PlatformKey, string> = {
  ios: '🍎',
  android: '🤖',
  web: '🌐',
};

// ── Main Component ────────────────────────────────────────────────────────────

const FormScreen: React.FC<FormScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isWide: boolean = width >= 900;

  const [form, setForm]       = useState<FormState>(INITIAL);
  const [errors, setErrors]   = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone]       = useState<boolean>(false);
  const [focused, setFocused] = useState<string | null>(null);

  const update = useCallback((field: keyof FormState, val: string) => {
    setForm(p => ({ ...p, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: null }));
  }, [errors]);

  const validate = (): boolean => {
    const e: FormErrors = {};
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

  const submit = async (): Promise<void> => {
    if (!validate()) return;
    setLoading(true);
    await new Promise<void>(r => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
    showPlatformAlert(
      'Sent!',
      `Thanks ${form.name.trim()}, we'll reply to ${form.email.trim()}.`,
    );
  };

  const reset = (): void => {
    setForm(INITIAL);
    setErrors({});
    setDone(false);
  };

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

          {/* ── Left info panel ─────────────── */}
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
              {BULLETS.map((b: string) => (
                <View key={b} style={st.bullet}>
                  <View style={st.bulletDot} />
                  <Text style={st.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
            <View style={st.osBadge}>
              <Text style={st.osBadgeText}>
                {OS_EMOJI[Platform.OS as PlatformKey]}  {Platform.OS}
              </Text>
            </View>
          </View>

          {/* ── Form panel ──────────────────── */}
          <View style={[st.right, isWide && st.rightWide]}>
            {done ? (
              <SuccessState name={form.name} email={form.email} onReset={reset} />
            ) : (
              <>
                <Text style={st.formTitle}>Send a Message</Text>
                <Text style={st.formSub}>All fields required.</Text>

                <Field
                  label="Full Name" placeholder="Jane Appleseed"
                  value={form.name} onChangeText={v => update('name', v)}
                  error={errors.name} isFocused={focused === 'name'}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                  autoCapitalize="words"
                />
                <Field
                  label="Email Address" placeholder="jane@example.com"
                  value={form.email} onChangeText={v => update('email', v)}
                  error={errors.email} isFocused={focused === 'email'}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  keyboardType="email-address" autoCapitalize="none"
                />
                <Field
                  label="Message" placeholder="What's on your mind?"
                  value={form.message} onChangeText={v => update('message', v)}
                  error={errors.message} isFocused={focused === 'message'}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  multiline numberOfLines={5}
                />

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
                  onPress={submit}
                  disabled={loading}
                  activeOpacity={0.85}
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
};

export default FormScreen;

// ── Field Component ───────────────────────────────────────────────────────────

const Field: React.FC<FieldProps> = ({
  label, error, isFocused,
  multiline = false, numberOfLines = 1, ...rest
}) => (
  <View style={f.wrap}>
    <Text style={f.label}>{label}</Text>
    <TextInput
      style={[
        f.input,
        multiline  && f.multi,
        isFocused  && f.focused,
        !!error    && f.hasError,
      ]}
      placeholderTextColor={C.muted}
      multiline={multiline}
      numberOfLines={numberOfLines}
      {...rest}
    />
    {error
      ? <Text style={f.errorText}>⚠ {error}</Text>
      : isFocused ? <View style={f.focusLine} /> : null
    }
  </View>
);

// ── Success Component ─────────────────────────────────────────────────────────

interface SuccessProps {
  name: string;
  email: string;
  onReset: () => void;
}

const SuccessState: React.FC<SuccessProps> = ({ name, email, onReset }) => (
  <View style={ss.wrap}>
    <View style={ss.circle}>
      <Text style={ss.tick}>✓</Text>
    </View>
    <Text style={ss.title}>Message Sent!</Text>
    <Text style={ss.body}>
      Thanks <Text style={ss.em}>{name}</Text>.{'\n'}
      We'll reply to <Text style={ss.em}>{email}</Text>.
    </Text>
    <View style={ss.meta}>
      <Text style={ss.metaText}>via {Platform.OS}</Text>
    </View>
    <TouchableOpacity style={ss.btn} onPress={onReset}>
      <Text style={ss.btnText}>Send Another</Text>
    </TouchableOpacity>
  </View>
);

// ── Styles ────────────────────────────────────────────────────────────────────

const st = StyleSheet.create({
  flex:        { flex: 1, backgroundColor: C.bg },
  scroll:      { flex: 1 },
  content:     { flexGrow: 1, paddingVertical: 32, paddingHorizontal: 20 },
  contentWide: { paddingVertical: 56, paddingHorizontal: 48 },
  layout:      { maxWidth: 960, width: '100%', alignSelf: 'center' },
  layoutWide:  { flexDirection: 'row', alignItems: 'flex-start', gap: 64 },

  left:      { width: '100%', marginBottom: 32 },
  leftWide:  { width: 300, marginBottom: 0 },
  back: {
    alignSelf: 'flex-start', marginBottom: 32,
    paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 1, borderColor: C.border, borderRadius: 8,
  },
  backText: { color: C.muted, fontSize: 13, fontWeight: '600' },
  eyebrow: {
    fontSize: 11, color: C.cyan, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10,
  },
  leftTitle: {
    fontSize: 40, fontWeight: '900', color: C.white,
    letterSpacing: -1.2, lineHeight: 46, marginBottom: 16,
  },
  leftSub:   { fontSize: 13, lineHeight: 21, color: C.muted, marginBottom: 28 },
  bullets:   { gap: 10, marginBottom: 32 },
  bullet:    { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  bulletDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.cyan, marginTop: 7 },
  bulletText:{ flex: 1, fontSize: 12, color: C.muted, lineHeight: 19 },
  osBadge: {
    alignSelf: 'flex-start',
    backgroundColor: C.surfaceHi, borderWidth: 1, borderColor: C.border,
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20,
  },
  osBadgeText: { fontSize: 13, color: C.white, fontWeight: '600' },

  right:     { width: '100%', backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, borderRadius: 18, padding: 24 },
  rightWide: { flex: 1, padding: 36 },
  formTitle: { fontSize: 22, fontWeight: '800', color: C.white, letterSpacing: -0.4, marginBottom: 4 },
  formSub:   { fontSize: 13, color: C.muted, marginBottom: 28 },

  hint:     { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  hintDot:  { width: 6, height: 6, borderRadius: 3, backgroundColor: C.cyan },
  hintText: { fontSize: 12, color: C.muted },

  submitBtn:    { backgroundColor: C.cyan, paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  submitBtnOff: { opacity: 0.6 },
  submitText:   { color: '#000', fontSize: 15, fontWeight: '800' },
});

const f = StyleSheet.create({
  wrap:      { marginBottom: 20 },
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

const ss = StyleSheet.create({
  wrap:   { alignItems: 'center', paddingVertical: 20 },
  circle: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: C.green + '1a',
    borderWidth: 2, borderColor: C.green,
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  tick:     { fontSize: 28, color: C.green },
  title:    { fontSize: 28, fontWeight: '900', color: C.white, letterSpacing: -0.8, marginBottom: 10 },
  body:     { fontSize: 14, color: C.muted, textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  em:       { color: C.cyan, fontWeight: '700' },
  meta: {
    backgroundColor: C.bg, borderWidth: 1, borderColor: C.border,
    paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8, marginBottom: 24,
  },
  metaText: { fontSize: 12, color: C.muted, fontWeight: '600' },
  btn:      { borderWidth: 1.5, borderColor: C.white, paddingVertical: 11, paddingHorizontal: 26, borderRadius: 10 },
  btnText:  { fontSize: 13, fontWeight: '700', color: C.white },
});
