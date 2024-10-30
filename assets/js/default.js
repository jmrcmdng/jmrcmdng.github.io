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

window.downloadFromUrl = (fileName, url) => {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(error => console.error('Download failed:', error));
};