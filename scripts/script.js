const root = document.documentElement;
const theme = localStorage.getItem('mode')
root.className = theme
function setTheme() {
    const newTheme = root.className === 'dark' ? 'light' : 'dark';
    root.className = newTheme;
    localStorage.setItem('mode', newTheme)
}
document.querySelector('.mode').addEventListener('click', setTheme)
