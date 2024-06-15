let keySequence = '';

document.addEventListener('keydown', function(event) {
    keySequence += event.key.toLowerCase();

    if (keySequence.toLowerCase() === 'snake') {
        openSnakeGamePopup();
        keySequence = ''; // Reset the key sequence after opening the game
    } else if (keySequence.length > 5) {
        keySequence = ''; // Reset the key sequence if it exceeds the length of 'snake'
    }
});

function openSnakeGamePopup() {
    // Define the URL of the Snake game HTML file
    const snakeGameURL = 'SecretSnakeEasterEgg.html';

    // Open the Snake game in a popup window with specific dimensions
    window.open(snakeGameURL, 'SnakeGamePopup', 'width=750,height=900');
}
