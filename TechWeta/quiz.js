const questionSets = [
    [
        {
            question: "What does HTML stand for?",
            answers: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
            correctAnswer: 0
        },
        {
            question: "Which HTML tag is used to define an unordered list?",
            answers: ["<ol>", "<li>", "<ul>", "<list>"],
            correctAnswer: 2
        },
        {
            question: "What is the correct HTML element for inserting a line break?",
            answers: ["<br>", "<lb>", "<break>", "<newline>"],
            correctAnswer: 0
        },
        {
            question: "Which CSS property is used to change the text color of an element?",
            answers: ["font-color", "text-color", "color", "text-style"],
            correctAnswer: 2
        },
        {
            question: "What is the correct CSS syntax for making all the <p> elements bold?",
            answers: ["p {text-size: bold;}", "p {font-weight: bold;}", "<p style='font-size: bold;'>", "p {text-style: bold;}"],
            correctAnswer: 1
        }
    ],
    [
        {
            question: "Which HTML attribute is used to define inline styles?",
            answers: ["styles", "style", "class", "font"],
            correctAnswer: 1
        },
        {
            question: "What is the correct HTML for creating a hyperlink?",
            answers: ["<a url='http://www.example.com'>Example</a>", "<a href='http://www.example.com'>Example</a>", "<a>http://www.example.com</a>", "<hyperlink>http://www.example.com</hyperlink>"],
            correctAnswer: 1
        },
        {
            question: "Which property is used to change the font of an element?",
            answers: ["font-style", "text-style", "font-family", "text-font"],
            correctAnswer: 2
        },
        {
            question: "How do you make a list that lists its items with squares?",
            answers: ["list-style-type: square;", "list: square;", "list-type: square;", "list-style: square;"],
            correctAnswer: 0
        },
        {
            question: "How do you select an element with id 'demo'?",
            answers: [".demo", "demo", "#demo", "*demo"],
            correctAnswer: 2
        }
    ],
    [
        {
            question: "What is the correct HTML for making a checkbox?",
            answers: ["<check>", "<checkbox>", "<input type='check'>", "<input type='checkbox'>"],
            correctAnswer: 3
        },
        {
            question: "Which HTML tag is used to define an internal style sheet?",
            answers: ["<css>", "<script>", "<style>", "<stylesheet>"],
            correctAnswer: 2
        },
        {
            question: "How do you make each word in a text start with a capital letter?",
            answers: ["text-transform: capitalize;", "text-style: capitalize;", "transform: capitalize;", "text-case: capitalize;"],
            correctAnswer: 0
        },
        {
            question: "Which CSS property controls the text size?",
            answers: ["text-size", "font-style", "text-style", "font-size"],
            correctAnswer: 3
        },
        {
            question: "What is the correct HTML for making a drop-down list?",
            answers: ["<input type='dropdown'>", "<select>", "<input type='list'>", "<list>"],
            correctAnswer: 1
        }
    ]
];

let currentSet = 0;
let currentQuestion = 0;
let score = 0;

function shuffleQuestions(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const progressFill = document.getElementById('progressFill');

    const question = questionSets[currentSet][currentQuestion];
    questionElement.textContent = question.question;
    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer');
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });

    nextButton.style.display = 'none';
    prevButton.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
    updateProgressBar();
}

function selectAnswer(index) {
    const answersContainer = document.getElementById('answers');
    const nextButton = document.getElementById('nextButton');

    const buttons = answersContainer.getElementsByTagName('button');
    for (let button of buttons) {
        button.classList.remove('selected');
        button.disabled = true;
    }
    buttons[index].classList.add('selected');

    if (index === questionSets[currentSet][currentQuestion].correctAnswer) {
        score++;
    }

    nextButton.style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questionSets[currentSet].length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progress = ((currentQuestion + 1) / questionSets[currentSet].length) * 100;
    progressFill.style.width = `${progress}%`;
}

function finishQuiz() {
    localStorage.setItem('quizScore', score);
    localStorage.setItem('totalQuestions', questionSets[currentSet].length);
    window.location.href = 'results.html';
}

function initQuiz() {
    currentSet = Math.floor(Math.random() * questionSets.length);
    questionSets[currentSet] = shuffleQuestions(questionSets[currentSet]);
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    document.getElementById('nextButton').addEventListener('click', nextQuestion);
    document.getElementById('prevButton').addEventListener('click', prevQuestion);
}

document.addEventListener('DOMContentLoaded', initQuiz);
