const root = document.documentElement;
function setTheme() {
    console.log(root.className)
    const newTheme = root.className === 'light' ? 'dark' : 'light';
    root.className = newTheme;
    localStorage.setItem('mode', newTheme)
}
root.className = 'light'
document.querySelector('.mode').addEventListener('click', setTheme)
