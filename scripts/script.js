let docTitle = document.title;

window.addEventListener("blur", () => {
    document.title = "Hova mentél?";
});

window.addEventListener("focus", () => {
    document.title = docTitle;
});

// script.js
const loadingScreen = document.getElementById('loading-screen');
const loadingText = document.getElementById('loading-text');
const phrases = ['Loading data...', 'Processing information...', 'Please wait...', 'Almost there...'];

let currentPhraseIndex = 0;

loadingText.textContent = ''; // Initialize the text content as empty

setTimeout(() => {
  loadingText.textContent = phrases[currentPhraseIndex];
  loadingText.classList.add('fade-in');
}, 100); // Add a small delay before setting the text content and adding the fade-in class

function updateLoadingText() {
  loadingText.classList.add('fade-out');
  
  setTimeout(() => {
    loadingText.textContent = phrases[currentPhraseIndex];
    loadingText.classList.remove('fade-out');
    loadingText.classList.add('fade-in');
  }, 500);
  
  setTimeout(() => {
    loadingText.classList.remove('fade-in');
  }, 2000);
  
  currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
}

setInterval(updateLoadingText, 2500);

setTimeout(() => {
  loadingScreen.classList.add('fade-out');
  setTimeout(() => {
    loadingScreen.style.display = 'none'; // Add this line to hide the loading screen
  }, 1000); // Wait for the fade-out animation to complete
}, 5000);
