let docTitle = document.title;

window.addEventListener("blur", () => {
    document.title = "Hova mentél?";
});

window.addEventListener("focus", () => {
    document.title = docTitle;
});

// script.js
const loadingScreen = document.getElementById('loading-screen');

setTimeout(() => {
  loadingScreen.classList.add('fade-out');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 500);
}, 2500);