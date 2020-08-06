module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
		react: {
			version: 'detect',
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
	},
	plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'react', 'react-hooks'],
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'airbnb',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'prettier/react',
		'prettier',
		'prettier/@typescript-eslint',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
		'import/extensions': 0,
		'linebreak-style': 0,
	},
};
