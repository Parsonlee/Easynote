import { rgba, lighten, darken } from 'polished';

export const palette = {
	primary: '#2DCA70',
	danger: '#EB5757',
	black: {
		4: rgba('#1A252B', 0.04),
		8: rgba('#1A252B', 0.08),
		10: rgba('#1A252B', 0.1),
		20: rgba('#1A252B', 0.2),
		40: rgba('#1A252B', 0.4),
		60: rgba('#1A252B', 0.6),
		80: rgba('#1A252B', 0.8),
		85: rgba('#1A252B', 0.85),
		100: rgba('#1A252B', 1)
	},
	white: {
		4: rgba('#FFFFFF', 0.04),
		8: rgba('#FFFFFF', 0.08),
		10: rgba('#FFFFFF', 0.1),
		20: rgba('#FFFFFF', 0.2),
		40: rgba('#FFFFFF', 0.4),
		60: rgba('#FFFFFF', 0.6),
		80: rgba('#FFFFFF', 0.8),
		85: rgba('#FFFFFF', 0.85),
		100: rgba('#FFFFFF', 1)
	},
	lighten: {
		4: lighten(0.04, '#1A252B'),
		8: lighten(0.08, '#1A252B'),
		10: lighten(0.1, '#1A252B'),
		20: lighten(0.2, '#1A252B'),
		40: lighten(0.4, '#1A252B'),
		60: lighten(0.6, '#1A252B'),
		80: lighten(0.8, '#1A252B'),
		85: lighten(0.85, '#1A252B'),
		100: lighten(1, '#1A252B')
	},
	darken: {
		4: darken(0.04, '#FFFFFF'),
		8: darken(0.08, '#FFFFFF'),
		10: darken(0.1, '#FFFFFF'),
		20: darken(0.2, '#FFFFFF'),
		40: darken(0.4, '#FFFFFF'),
		60: darken(0.6, '#FFFFFF'),
		80: darken(0.8, '#FFFFFF'),
		85: darken(0.85, '#FFFFFF'),
		100: darken(1, '#FFFFFF')
	}
};

export const themeConfig = {
	default: {
		mode: 'light',
		primary: {
			base: palette.primary,
			lighten: lighten(0.2, palette.primary),
			darken: darken(0.2, palette.primary)
		},
		color: {
			base: palette.black[85],
			body: palette.black[80],
			caption: palette.black[60],
			hint: palette.black[40],
			disabled: palette.black[20],
			divider: palette.black[8],
			shadow: palette.black[10]
		},
		background: {
			base: '#FFFFFF',
			backdrop: '#FBFBFB',
			backface: palette.darken[8]
		},
		button: {
			background: palette.primary,
			color: palette.white[85]
		}
	},
	dark: {
		mode: 'dark',
		primary: {
			base: palette.primary,
			lighten: lighten(0.2, palette.primary),
			darken: darken(0.2, palette.primary)
		},
		color: {
			base: palette.white[85],
			body: palette.white[80],
			caption: palette.white[60],
			hint: palette.white[40],
			disabled: palette.white[20],
			divider: palette.white[8],
			shadow: palette.black[10]
		},
		background: {
			base: palette.black[100],
			backdrop: palette.lighten[4],
			backface: palette.lighten[8]
		},
		button: {
			background: palette.primary,
			color: palette.black[85]
		}
	}
};
