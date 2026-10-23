// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Registration Failed:', err));
    });
}

// Navigation Logic
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

// Comprehensive Quiz Data (Over 25 Questions mapping strictly to the notes)
const quizData = [
    // Chapter 6
    {
        question: "Which of the following is considered a challenge in SA Entrepreneurship?",
        options: ["Low unemployment rates", "Excessive access to funding", "Bureaucracy and red tape", "Overabundance of mentorship"],
        answer: 2
    },
    {
        question: "Feasibility asks...",
        options: ["If a project is sustainable long-term", "If a project can be done with available resources", "What the market share is", "What the break-even point is"],
        answer: 1
    },
    {
        question: "What is the formula for Break-even quantity?",
        options: ["Variable costs / Fixed costs", "Total costs - Fixed costs", "Fixed costs / Contribution margin", "Total Sales / Variable costs"],
        answer: 2
    },
    {
        question: "Which segmentation divides markets by age, gender, or income?",
        options: ["Psychographic", "Behavioral", "Geographic", "Demographic"],
        answer: 3
    },
    {
        question: "Which research technique is best for capturing direct, conversational feedback?",
        options: ["Interviews", "Social media polls", "Observing competition", "Surveys"],
        answer: 0
    },
    // Chapter 7
    {
        question: "What is the primary function of Management Control?",
        options: ["To hire new staff", "To identify operational errors and implement corrective actions", "To segment the market", "To calculate net profit"],
        answer: 1
    },
    {
        question: "Which level of control evaluates team performance?",
        options: ["Organizational level", "Individual level", "Group level", "Pre-control level"],
        answer: 2
    },
    {
        question: "What does 'Concurrent control' monitor?",
        options: ["Input resources before work begins", "Final output goods and services", "Real-time transformation processes", "Financial budgets"],
        answer: 2
    },
    {
        question: "Which of the following is a type of Performance Standard?",
        options: ["Time standards enforcing deadlines", "Psychographic standards", "Feasibility standards", "Participative standards"],
        answer: 0
    },
    {
        question: "What is the purpose of a Balanced Scorecard?",
        options: ["To track inventory shrinkage", "To convert strategy into measurable goals", "To calculate fixed costs", "To segment demographics"],
        answer: 1
    },
    // Chapter 8
    {
        question: "While leadership focuses on vision and change, management focuses on:",
        options: ["Innovation and inspiration", "Execution, structure, and processes", "Charisma and respect", "Personal traits"],
        answer: 1
    },
    {
        question: "Which leadership style involves making decisions without employee consultation?",
        options: ["Free-rein", "Participative", "Situational", "Autocratic"],
        answer: 3
    },
    {
        question: "Referent power stems from:",
        options: ["Organizational titles", "Fear and punishment", "Personal charisma and respect", "Specialized skills and knowledge"],
        answer: 2
    },
    {
        question: "What type of power controls valuable perks or pay?",
        options: ["Reward power", "Expert power", "Coercive power", "Legitimate power"],
        answer: 0
    },
    // Chapter 9
    {
        question: "Trait Theory assumes that:",
        options: ["Good leaders are made through training", "Good leaders are born with innate personal traits", "Leadership depends on the situation", "Leadership is an exchange of rewards"],
        answer: 1
    },
    {
        question: "Which newer leadership approach involves leading by example through shared work?",
        options: ["Transactional leadership", "Transformational leadership", "Servant-leadership", "Ethical-leadership"],
        answer: 2
    },
    {
        question: "Leader-Member-Exchange (LMX) focuses heavily on:",
        options: ["In-group and out-group dynamics", "Exchanging rewards for performance", "Core leadership beliefs", "Skill volume to effectiveness"],
        answer: 0
    },
    // Chapter 10
    {
        question: "In Maslow's Hierarchy of Needs, which category includes the need for job stability?",
        options: ["Physiological", "Safety", "Esteem", "Self-actualization"],
        answer: 1
    },
    {
        question: "According to Herzberg's Two-Factor Theory, which of the following is a 'Hygiene Factor'?",
        options: ["Achievement", "Recognition", "Pay", "Creativity"],
        answer: 2
    },
    {
        question: "Adams' Equity Theory states that employees are demotivated if they:",
        options: ["Don't receive bonuses", "Perceive unfairness in their input-outcome ratio compared to coworkers", "Are threatened with punishment", "Cannot reach self-actualization"],
        answer: 1
    },
    {
        question: "Unlike Maslow's model, Alderfer's ERG Theory suggests that:",
        options: ["Needs must be satisfied one at a time", "Hygiene factors prevent dissatisfaction", "Multiple levels of needs can be satisfied simultaneously", "Motivation is strictly based on power"],
        answer: 2
    },
    {
        question: "McClelland's Human Motivation Theory is driven by which three primary needs?",
        options: ["Achievement, Affiliation, Power", "Existence, Relatedness, Growth", "Physiological, Safety, Esteem", "Money, Status, Responsibility"],
        answer: 0
    },
    // Chapter 11
    {
        question: "According to the Stakeholders chapter, what is a primary expectation of Suppliers?",
        options: ["Job security", "Timely payments and fair negotiation", "Funding and venues", "Taxes and ethical behavior"],
        answer: 1
    },
    {
        question: "How can the 'Community' stakeholder negatively influence a business?",
        options: ["By canceling operating licenses", "By spreading positive word of mouth", "By boycotts, protests, or looting", "By changing credit arrangements"],
        answer: 2
    },
    // Chapter 12
    {
        question: "What defines 'Shrinkage' in Retail Risk Management?",
        options: ["The physical shrinking of store size", "Reduction of inventory value due to theft, mistakes, or errors", "Lowering product prices to match competitors", "Reducing the number of employees"],
        answer: 1
    },
    {
        question: "According to South African law, at what age can a child absolutely NOT be prosecuted for shoplifting?",
        options: ["Under 12", "Under 14", "Under 16", "Under 18"],
        answer: 0
    },
    // Chapter 13
    {
        question: "Under the OHS Act, how many Health and Safety Representatives (HSRs) are required for a shop?",
        options: ["1 per 20 employees", "1 per 50 employees", "1 per 100 employees", "2 per 50 employees"],
        answer: 2
    },
    {
        question: "In Health and Safety, how is 'Risk' defined?",
        options: ["Anything with the potential to cause harm", "Measures implemented to decrease likelihood of an event", "The likelihood and severity of harm caused by a hazard", "A protective method established by the employer"],
        answer: 2
    },
    {
        question: "Which of the following is a duty of the Employee under the OHS Act?",
        options: ["Appoint health and safety reps", "Establish protective methods", "Avoid 'playing' at work and obey safety rules", "Ensure compliance from management"],
        answer: 2
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;

// Quiz DOM Elements
const startBtn = document.getElementById('start-quiz-btn');
const quizSetup = document.getElementById('quiz-setup');
const quizContainer = document.getElementById('quiz-container');
const questionCounter = document.getElementById('question-counter');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const quizResults = document.getElementById('quiz-results');
const scoreDisplay = document.getElementById('score-display');
const scoreMessage = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-btn');

// Event Listeners
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
        questionCounter.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
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
    
    if (selectedIndex === correctIndex) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        optionsContainer.children[correctIndex].classList.add('correct');
    }
    
    // Disable buttons after selection
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
    });
    
    nextBtn.classList.remove('hidden');
    
    // Change button text on the last question
    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.innerText = "See Results";
    } else {
        nextBtn.innerText = "Next Question";
    }
    
    currentQuestionIndex++;
}

function updateProgress() {
    const progress = (currentQuestionIndex / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function showResults() {
    quizContainer.classList.add('hidden');
    quizResults.classList.remove('hidden');
    scoreDisplay.innerText = `${score}/${quizData.length}`;
    
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) {
        scoreMessage.innerText = "Outstanding! You have mastered the material.";
    } else if (percentage >= 50) {
        scoreMessage.innerText = "Good job! A little more review and you'll be perfect.";
    } else {
        scoreMessage.innerText = "Keep studying! Review the notes and try again.";
    }
}
