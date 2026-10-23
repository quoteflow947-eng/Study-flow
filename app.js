// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Registration Failed:', err));
    });
}

// UI Navigation Logic
const btnNotes = document.getElementById('btn-notes');
const btnQuiz = document.getElementById('btn-quiz');
const notesSection = document.getElementById('notes-section');
const quizSection = document.getElementById('quiz-section');

btnNotes.addEventListener('click', () => {
    btnNotes.classList.add('active');
    btnQuiz.classList.remove('active');
    notesSection.classList.remove('hidden');
    quizSection.classList.add('hidden');
});

btnQuiz.addEventListener('click', () => {
    btnQuiz.classList.add('active');
    btnNotes.classList.remove('active');
    quizSection.classList.remove('hidden');
    notesSection.classList.add('hidden');
});

// Quiz Logic and Data
const quizData = [
    {
        question: "What is the formula for the break-even quantity?",
        options: ["Total Income - Total Expenses", "Fixed costs / (Sales Price - Variable Cost)", "Fixed Costs + Variable Costs", "Total Sales / Market Share"],
        answer: 1
    },
    {
        question: "According to South African law, at what age can a child generally NOT be prosecuted for shoplifting?",
        options: ["Under 12", "Under 14", "Under 16", "Under 18"],
        answer: 0
    },
    {
        question: "Which of the following is NOT one of the 4 types of market segmentation?",
        options: ["Demographic", "Psychographic", "Technological", "Behavioral"],
        answer: 2
    },
    {
        question: "Which leadership style involves making decisions without employee consultation?",
        options: ["Participative", "Free-rein", "Situational", "Autocratic"],
        answer: 3
    },
    {
        question: "In Herzberg's Two-Factor Theory, which of the following is considered a 'hygiene factor'?",
        options: ["Sense of achievement", "Recognition", "Pay", "Responsibility"],
        answer: 2
    },
    {
        question: "What is 'Shrinkage' in a retail environment?",
        options: ["Lowering product prices", "Reduction of inventory value due to theft or errors", "Decreasing the physical size of the store", "Reducing staff numbers"],
        answer: 1
    },
    {
        question: "Under the OHS Act, how many Health and Safety Representatives (HSRs) are required for a shop?",
        options: ["1 per 20 employees", "1 per 50 employees", "1 per 100 employees", "2 per 50 employees"],
        answer: 2
    },
    {
        question: "According to Alderfer's ERG Theory, needs are grouped into:",
        options: ["Existence, Relatedness, Growth", "Esteem, Respect, Goals", "Energy, Retention, Growth", "Empathy, Reality, Goals"],
        answer: 0
    },
    {
        question: "Which level of management control focuses on real-time transformation processes?",
        options: ["Pre-control", "Concurrent control", "Post-control", "Organizational control"],
        answer: 1
    },
    {
        question: "Adams' Equity Theory suggests that employees are demotivated if:",
        options: ["They don't receive a bonus", "Their hygiene factors are absent", "They perceive unfairness compared to coworkers' input-outcome ratio", "They are not given complete task autonomy"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Quiz DOM Elements
const startBtn = document.getElementById('start-quiz-btn');
const quizSetup = document.getElementById('quiz-setup');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const quizResults = document.getElementById('quiz-results');
const scoreDisplay = document.getElementById('score-display');
const restartBtn = document.getElementById('restart-btn');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', loadNextQuestion);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizSetup.classList.add('hidden');
    quizResults.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadNextQuestion();
}

function loadNextQuestion() {
    resetState();
    
    if (currentQuestionIndex < quizData.length) {
        updateProgress();
        const currentQuizData = quizData[currentQuestionIndex];
        questionText.innerText = currentQuizData.question;
        
        currentQuizData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.classList.add('option-btn');
            button.dataset.index = index;
            button.addEventListener('click', selectAnswer);
            optionsContainer.appendChild(button);
        });
    } else {
        showResults();
    }
}

function resetState() {
    nextBtn.classList.add('hidden');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const selectedIndex = parseInt(selectedBtn.dataset.index);
    const correctIndex = quizData[currentQuestionIndex].answer;
    
    // Check answer
    if (selectedIndex === correctIndex) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        // highlight correct answer
        optionsContainer.children[correctIndex].classList.add('correct');
    }
    
    // Disable all buttons
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
    });
    
    nextBtn.classList.remove('hidden');
    currentQuestionIndex++;
}

function updateProgress() {
    const progress = (currentQuestionIndex / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function showResults() {
    quizContainer.classList.add('hidden');
    quizResults.classList.remove('hidden');
    scoreDisplay.innerText = `${score} out of ${quizData.length}`;
}
