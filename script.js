// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// const quizQuestions = [
//   {
//     question: "What is the capital of France?",
//     answers: [
//       { text: "London", correct: false },
//       { text: "Berlin", correct: false },
//       { text: "Paris", correct: true },
//       { text: "Madrid", correct: false },
//     ],
//   },
//   {
//     question: "Which planet is known as the Red Planet?",
//     answers: [
//       { text: "Venus", correct: false },
//       { text: "Mars", correct: true },
//       { text: "Jupiter", correct: false },
//       { text: "Saturn", correct: false },
//     ],
//   },
//   {
//     question: "What is the largest ocean on Earth?",
//     answers: [
//       { text: "Atlantic Ocean", correct: false },
//       { text: "Indian Ocean", correct: false },
//       { text: "Arctic Ocean", correct: false },
//       { text: "Pacific Ocean", correct: true },
//     ],
//   },
//   {
//     question: "Which of these is NOT a programming language?",
//     answers: [
//       { text: "Java", correct: false },
//       { text: "Python", correct: false },
//       { text: "Banana", correct: true },
//       { text: "JavaScript", correct: false },
//     ],
//   },
//   {
//     question: "What is the chemical symbol for gold?",
//     answers: [
//       { text: "Go", correct: false },
//       { text: "Gd", correct: false },
//       { text: "Au", correct: true },
//       { text: "Ag", correct: false },
//     ],
//   },
// ];

const quizQuestions = [
  {
    question: "What is the capital city of Somalia?",
    answers: [
      { text: "Hargeisa", correct: false },
      { text: "Mogadishu", correct: true },
      { text: "Kismayo", correct: false },
      { text: "Garowe", correct: false },
    ],
  },
  {
    question: "What is the official language of Somalia?",
    answers: [
      { text: "Arabic", correct: false },
      { text: "English", correct: false },
      { text: "Somali", correct: true },
      { text: "French", correct: false },
    ],
  },
  {
    question: "Which ocean borders the coast of Somalia?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: true },
      { text: "Pacific Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
    ],
  },
  {
    question: "What is the currency of Somalia?",
    answers: [
      { text: "Somali Shilling", correct: true },
      { text: "Ethiopian Birr", correct: false },
      { text: "Kenyan Shilling", correct: false },
      { text: "Sudanese Pound", correct: false },
    ],
  },
  {
    question: "What are the colors of the Somali national flag?",
    answers: [
      { text: "Red and White", correct: false },
      { text: "Blue and White", correct: true },
      { text: "Green and Yellow", correct: false },
      { text: "Black and Red", correct: false },
    ],
  },
  {
    question: "What symbol is found in the center of the Somali flag?",
    answers: [
      { text: "A Crescent Moon", correct: false },
      { text: "A Golden Eagle", correct: false },
      { text: "A White Five-Pointed Star", correct: true },
      { text: "A Palm Tree", correct: false },
    ],
  },
  {
    question: "Which city is one of Somalia's major port cities?",
    answers: [
      { text: "Kismayo", correct: true },
      { text: "Baidoa", correct: false },
      { text: "Beledweyne", correct: false },
      { text: "Galkayo", correct: false },
    ],
  },
  {
    question: "Somalia is located in which part of Africa?",
    answers: [
      { text: "West Africa", correct: false },
      { text: "North Africa", correct: false },
      { text: "East Africa", correct: true },
      { text: "Central Africa", correct: false },
    ],
  },
  {
    question: "Which country shares a border with Somalia?",
    answers: [
      { text: "Nigeria", correct: false },
      { text: "Ethiopia", correct: true },
      { text: "Ghana", correct: false },
      { text: "Morocco", correct: false },
    ],
  },
  {
    question: "What is Somalia's longest river?",
    answers: [
      { text: "Juba River", correct: false },
      { text: "Shabelle River", correct: true },
      { text: "Nile River", correct: false },
      { text: "Blue Nile", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
