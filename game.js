let score = 0;
let timeLeft = 10;
let timer;
let currentProblem = { answer: 0 };

// DOM Elements
const problemElement = document.getElementById('problem');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const timerElement = document.getElementById('time-left');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');

// Functions to generate random math problems
const generateProblem = () => {
  const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10

  const problemType = Math.floor(Math.random() * 3); // Randomly pick problem type: 0=add, 1=subtract, 2=multiply
  let operator = '+';
  let answer = num1 + num2;

  if (problemType === 1) {
    operator = '-';
    answer = num1 - num2;
  } else if (problemType === 2) {
    operator = '*';
    answer = num1 * num2;
  }

  currentProblem = { num1, num2, operator, answer };

  problemElement.textContent = `Solve: ${num1} ${operator} ${num2}`;
};

// Start the timer
const startTimer = () => {
  timeLeft = 10;
  timerElement.textContent = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame('Time\'s up! You lost!');
    }
  }, 1000);
};

// Check answer when the user clicks Submit
submitButton.addEventListener('click', () => {
  const userAnswer = parseInt(answerInput.value);

  if (userAnswer === currentProblem.answer) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    messageElement.textContent = 'Correct! Well done!';
    answerInput.value = ''; // Reset the input field
    generateProblem(); // Generate a new problem
    startTimer(); // Restart the timer
  } else {
    messageElement.textContent = 'Oops! Wrong answer. Try again!';
  }
});

// End the game and display a message
const endGame = (message) => {
  clearInterval(timer);
  messageElement.textContent = message;
  submitButton.disabled = true;
};

// Initialize the game
const startGame = () => {
  score = 0;
  scoreElement.textContent = `Score: ${score}`;
  messageElement.textContent = '';
  generateProblem();
  startTimer();
};

startGame();
