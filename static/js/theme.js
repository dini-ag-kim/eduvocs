(function initTheme() {
	const themeAttribute = 'data-theme';
	const darkTheme = 'night';
	const lightTheme = 'fantasy';

	const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const preferredTheme = prefersDarkMode ? darkTheme : lightTheme;
	const storedTheme = localStorage.getItem(themeAttribute);
	const theme = storedTheme || preferredTheme;

	document.documentElement.setAttribute(themeAttribute, theme);
})();
