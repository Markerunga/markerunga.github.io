// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
let direction = 'right';
let score = 0;
let speed = 5; // The snake's speed will always be 5
let noclipEnabled = false;
let rgbModeEnabled = false;
let trackerEnabled = false;
let trackerColor = 'red';
let trackerWidth = 2;
let paused = false;

// Tracker variables
let trackerThoughts = '';

// Cheat buttons
const noclipButton = document.getElementById('noclipButton');
const rgbModeButton = document.getElementById('rgbModeButton');
const trackerButton = document.getElementById('trackerButton');
const trackerThoughtsDisplay = document.getElementById('trackerThoughts');

noclipButton.addEventListener('click', () => {
  noclipEnabled = !noclipEnabled;
});

rgbModeButton.addEventListener('click', () => {
  rgbModeEnabled = !rgbModeEnabled;
});

trackerButton.addEventListener('click', () => {
  trackerEnabled = !trackerEnabled;
  if (trackerEnabled) {
    gameLoop(); // Restart the game loop when enabling the tracker
  }
});

// Game loop
function gameLoop() {
  if (!paused) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the snake
    moveSnake();

    // Draw the snake
    drawSnake();

    // Draw the food
    drawFood();

    // Draw the score
    drawScore();

    // Update tracker thoughts display
    trackerThoughtsDisplay.innerText = trackerThoughts;

    // Check for collisions
    if (checkCollision() && !noclipEnabled) {
      alert(`Vége a játéknak! ${score} pontot szereztél!`);
      resetGame();
    } else {
      // Request the next frame
      requestAnimationFrame(gameLoop);
    }
  } else {
    // Game is paused
    requestAnimationFrame(gameLoop); // Check every frame if the game is unpaused
  }
}

// Move the snake
function moveSnake() {
  // Create a new head
  let newHead = { x: snake[0].x, y: snake[0].y };

  // Update the head position based on the direction
  switch (direction) {
    case 'up':
      newHead.y -= 10;
      break;
    case 'down':
      newHead.y += 10;
      break;
    case 'left':
      newHead.x -= 10;
      break;
    case 'right':
      newHead.x += 10;
      break;
  }

  // Add the new head to the beginning of the snake
  snake.unshift(newHead);

  // Check if the snake has eaten the food
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    speed = 5; // The speed always remains 5
    generateFood();
  } else {
    // Remove the last segment of the snake
    snake.pop();
  }

  // Tracker functionality
  if (trackerEnabled) {
    moveTracker();
  }
}

// Draw the snake
function drawSnake() {
  if (rgbModeEnabled) {
    snake.forEach((segment, index) => {
      ctx.fillStyle = `hsl(${(score * 5 + index) % 360}, 100%, 50%)`;
      ctx.fillRect(segment.x, segment.y, 10, 10);
    });
  } else {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, 10, 10);
    });
  }
}

// Draw the food
function drawFood() {
  if (rgbModeEnabled) {
    ctx.fillStyle = `hsl(${(score * 10) % 360}, 100%, 50%)`;
  } else {
    ctx.fillStyle = 'red';
  }
  ctx.fillRect(food.x, food.y, 10, 10);

  // Draw tracker line
  if (trackerEnabled) {
    ctx.strokeStyle = trackerColor;
    ctx.lineWidth = trackerWidth;
    ctx.beginPath();
    ctx.moveTo(snake[0].x + 5, snake[0].y + 5);
    ctx.lineTo(food.x + 5, food.y + 5);
    ctx.stroke();

    // Draw a circle around the food
    ctx.beginPath();
    ctx.arc(food.x + 5, food.y + 5, 15, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// Draw the score
function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.fillText(`Pontok: ${score}`, 10, 20);
}

// Check for collisions
function checkCollision() {
  // Check if the snake has hit the wall
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height
  ) {
    return true;
  }

  // Check if the snake has hit itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Generate a new food position
function generateFood() {
  food.x = Math.floor(Math.random() * 40) * 10;
  food.y = Math.floor(Math.random() * 40) * 10;
}

// Reset the game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
  direction = 'right';
  score = 0;
  speed = 5;
  gameLoop();
}

// Move the tracker towards the food
function moveTracker() {
  // Tracker logic to follow the apple
  if (food.x > snake[0].x) {
    trackerThoughts = 'Az AI jobbra fordul!';
    direction = 'right';
  } else if (food.x < snake[0].x) {
    trackerThoughts = 'Az AI balra fordul!';
    direction = 'left';
  } else if (food.y > snake[0].y) {
    trackerThoughts = 'Az AI előre megy!';
    direction = 'down';
  } else if (food.y < snake[0].y) {
    trackerThoughts = 'Az AI hátra megy!';
    direction = 'up';
  }
}

// Handle keyboard input
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (event.key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  } else if (event.key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (event.key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }
});

// Start the game
gameLoop();