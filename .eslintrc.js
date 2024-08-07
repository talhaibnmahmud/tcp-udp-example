module.exports = {
	env: {
		node: true,
		browser: true,
		es2021: true,
	},
	extends: ["standard-with-typescript", "plugin:prettier/recommended"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"@typescript-eslint/explicit-function-return-type": "off",
	},
};
