// Central design tokens for Starajin
// These tokens provide a single source of truth for styling outside Tailwind utility usage.
// If you adjust Tailwind brand colors, sync the values here.

export const colors = {
	primary: '#22428a',
	primaryForeground: '#ffffff',
	primaryDark: '#012e9f',
	primaryLight: '#4d78ff',
	secondary: '#ffc700',
	secondaryForeground: '#132340',
	neutral900: '#0f172a',
	neutral800: '#1e293b',
	neutral700: '#334155',
	neutral600: '#475569',
	neutral500: '#64748b',
	neutral300: '#cbd5e1',
	neutral200: '#e2e8f0',
	neutral100: '#f1f5f9',
	neutral50: '#f8fafc',
	success: '#059669',
	warning: '#f59e0b',
	danger: '#dc2626',
	info: '#0ea5e9'
} as const;

export type ColorToken = keyof typeof colors;

export const spacing = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 24,
	'2xl': 32,
	'3xl': 48,
	'4xl': 64
} as const;
export type SpacingToken = keyof typeof spacing;

export const radii = {
	none: 0,
	sm: 2,
	md: 6,
	lg: 10,
	xl: 16,
	pill: 9999,
	full: 99999
} as const;
export type RadiusToken = keyof typeof radii;

export const zIndices = {
	base: 0,
	dropdown: 1000,
	sticky: 1020,
	overlay: 1030,
	modal: 1040,
	popover: 1050,
	toast: 1060
} as const;
export type ZIndexToken = keyof typeof zIndices;

export const shadows = {
	xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
	sm: '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
	md: '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)',
	lg: '0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.05)',
	xl: '0 20px 25px -5px rgba(0,0,0,0.10), 0 10px 10px -5px rgba(0,0,0,0.04)'
} as const;
export type ShadowToken = keyof typeof shadows;

export const durations = {
	instant: 75,
	fast: 150,
	base: 250,
	slow: 400,
	slower: 600
} as const;
export type DurationToken = keyof typeof durations;

export const easing = {
	in: 'cubic-bezier(0.4, 0, 1, 1)',
	out: 'cubic-bezier(0, 0, 0.2, 1)',
	inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
	soft: 'cubic-bezier(.22,.68,.37,1.02)'
} as const;
export type EasingToken = keyof typeof easing;

export const typography = {
	fontFamily: {
		sans: 'Inter, Noto Sans KR, sans-serif',
		korean: 'Noto Sans KR, sans-serif'
	},
	fontSize: {
		xs: '0.75rem',
		sm: '0.875rem',
		base: '1rem',
		md: '1.0625rem',
		lg: '1.125rem',
		xl: '1.25rem',
		'2xl': '1.5rem',
		'3xl': '1.875rem',
		'4xl': '2.25rem',
		'5xl': '3rem'
	},
	lineHeight: {
		tight: 1.15,
		snug: 1.25,
		normal: 1.5,
		relaxed: 1.625
	}
} as const;

// Utility helper examples
export const token = {
	color: (name: ColorToken) => colors[name],
	space: (name: SpacingToken) => `${spacing[name]}px`,
	radius: (name: RadiusToken) => `${radii[name]}px`,
	shadow: (name: ShadowToken) => shadows[name],
	z: (name: ZIndexToken) => zIndices[name],
	duration: (name: DurationToken) => `${durations[name]}ms`
};

export type DesignTokens = {
	colors: typeof colors;
	spacing: typeof spacing;
	radii: typeof radii;
	zIndices: typeof zIndices;
	shadows: typeof shadows;
	durations: typeof durations;
	easing: typeof easing;
	typography: typeof typography;
};

export const designTokens: DesignTokens = {
	colors,
	spacing,
	radii,
	zIndices,
	shadows,
	durations,
	easing,
	typography
};

export default designTokens;
