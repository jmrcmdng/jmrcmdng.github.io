window.setThemePreference = (theme) => {
    localStorage.setItem('theme', theme);
};

window.getThemePreference = () => {
    return localStorage.getItem('theme');
};

window.getPreferredColorScheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

window.openInNewTab = (url) => {
    window.open(url, '_blank');
}