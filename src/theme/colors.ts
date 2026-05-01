/**
 * Shared dark UI palette used across screens.
 * Extend here instead of copying hex values into new components.
 */
export const palette = {
  bg:        '#07090f',
  surface:   '#0e1420',
  surfaceHi: '#151d2e',
  border:    '#1e2d45',
  cyan:      '#06b6d4',
  white:     '#f0f6ff',
  muted:     '#64748b',
  error:     '#f87171',
  errorBg:   '#1c0a0a',
  green:     '#34d399',
  red:       '#ef4444',
  redDim:    '#1c0a0a',
} as const;

export type Palette = typeof palette;
