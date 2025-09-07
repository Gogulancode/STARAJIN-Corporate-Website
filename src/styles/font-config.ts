// Font configuration & helpers
// Centralizes typography utilities beyond Tailwind classes.

import { typography } from './design-tokens';

export const fontStacks = {
	sans: typography.fontFamily.sans,
	korean: typography.fontFamily.korean,
};

export type FontWeight = 300 | 400 | 500 | 600 | 700;

export const weights: Record<string, FontWeight> = {
	light: 300,
	regular: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
};

export const letterSpacing = {
	tight: '-0.01em',
	normal: '0',
	wide: '0.02em',
	wider: '0.04em'
};

// Utility to build an inline style object for React components
export function textStyle(options: {
	size?: keyof typeof typography.fontSize;
	weight?: keyof typeof weights;
	leading?: keyof typeof typography.lineHeight;
	tracking?: keyof typeof letterSpacing;
	stack?: keyof typeof fontStacks;
} = {}) {
	return {
		fontFamily: fontStacks[options.stack || 'sans'],
		fontSize: options.size ? typography.fontSize[options.size] : typography.fontSize.base,
		fontWeight: options.weight ? weights[options.weight] : weights.regular,
		lineHeight: options.leading ? typography.lineHeight[options.leading] : typography.lineHeight.normal,
		letterSpacing: options.tracking ? letterSpacing[options.tracking] : letterSpacing.normal,
	} as const;
}

// Example predefined text styles
export const textPresets = {
	headingLg: textStyle({ size: '4xl', weight: 'bold', leading: 'tight' }),
	headingMd: textStyle({ size: '3xl', weight: 'bold', leading: 'snug' }),
	headingSm: textStyle({ size: '2xl', weight: 'semibold', leading: 'snug' }),
	body: textStyle({ size: 'base', weight: 'regular', leading: 'normal' }),
	bodySm: textStyle({ size: 'sm', weight: 'regular', leading: 'relaxed' }),
	label: textStyle({ size: 'xs', weight: 'medium', tracking: 'wide', leading: 'snug' }),
};

export default { fontStacks, weights, letterSpacing, textStyle, textPresets };
