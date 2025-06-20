const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const signupPage = document.getElementById("signupPage");
const loginPage = document.getElementById("loginPage");
const quizPage = document.getElementById("quizPage");
const quizContainer = document.getElementById("quizContainer");

const greeting = document.getElementById("greeting");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

const signupError = document.getElementById("signupError");
const loginError = document.getElementById("loginError");

let currentQuestionIndex = 0;
let userAnswers = [];

// Quiz Questions
const questions = [{
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Markdown Language",
            "Hyperloop Machine Language",
            "Highly Typed Modern Language"
        ],
        answer: 0
    },
    {
        question: "What is CSS used for?",
        options: [
            "To structure the webpage",
            "To add interactivity",
            "To style the webpage",
            "To store data"
        ],
        answer: 2
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Creative Style Scripts",
            "Colorful Styling Syntax",
            "Computer Style Sheet"
        ],
        answer: 0
    },
    {
        question: "Which HTML attribute is used to add a link to another page?",
        options: ["src", "href", "link", "path"],
        answer: 1
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-style", "font-weight", "text-size"],
        answer: 0
    },
    {
        question: "What is the full form of JS?",
        options: ["Java Style", "JavaScript", "Just Script", "JScript"],
        answer: 1
    },
    {
        question: "Which JavaScript function is used to display an alert box?",
        options: ["msg()", "popup()", "alert()", "show()"],
        answer: 2
    },
    {
        question: "How do you apply CSS to an HTML element directly?",
        options: [
            "By using the style attribute",
            "By using the href attribute",
            "By using the link tag",
            "By using the src attribute"
        ],
        answer: 0
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["int", "var", "dim", "declare"],
        answer: 1
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: [
            "var colors = 'red', 'green', 'blue'",
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = ['red', 'green', 'blue']",
            "var colors = 'red'; 'green'; 'blue'"
        ],
        answer: 2
    }
];

// Show Quiz
function showQuiz(username) {
    signupPage.style.display = "none";
    loginPage.style.display = "none";
    quizPage.style.display = "block";

    greeting.innerText = `Hello, ${username}! Answer the questions below:`;

    shuffleArray(questions);
    currentQuestionIndex = 0;
    userAnswers = [];
    loadQuiz();
}

// Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Load Quiz Question
function loadQuiz() {
    const q = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <p><strong>${currentQuestionIndex + 1}. ${q.question}</strong></p>
        ${q.options.map((opt, i) => `
            <label>
                <input type="radio" name="option" value="${i}" ${userAnswers[currentQuestionIndex] === i ? 'checked' : ''} />
                ${opt}
            </label><br>
        `).join('')}
    `;
    submitBtn.innerText = currentQuestionIndex === questions.length - 1 ? "Submit Quiz" : "Next";
}

// Submit / Next Button
submitBtn.addEventListener("click", function () {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an option before proceeding.");
        return;
    }

    userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);

    if (currentQuestionIndex === questions.length - 1) {
        let score = 0;
        questions.forEach((q, i) => {
            if (userAnswers[i] === q.answer) score++;
        });

        quizContainer.innerHTML = `
            <p class="result-text">You scored ${score} out of ${questions.length}</p>
        `;
        submitBtn.style.display = "none";
        greeting.innerText = "RESULTS";
    } else {
        currentQuestionIndex++;
        loadQuiz();
    }
});

// Email Validation
function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return pattern.test(email);
}

// Signup
signupForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    if (!validateEmail(email)) {
        signupError.innerText = "Please enter a valid Gmail address!";
        return;
    }

    const userData = { username, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(userData));
    signupPage.style.display = "none";
    loginPage.style.display = "block";
});

// Login
loginForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginUsername = document.getElementById("loginUsername").value.trim();
    const loginEmail = document.getElementById("loginEmail").value.trim();
    const loginPassword = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
        savedUser &&
        loginUsername === savedUser.username &&
        loginEmail === savedUser.email &&
        loginPassword === savedUser.password
    ) {
        localStorage.setItem("username", loginUsername);
        showQuiz(loginUsername);
    } else {
        loginError.innerText = "Invalid login credentials!";
    }
});

// Initial Check
const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
const storedUsername = localStorage.getItem("username");

if (storedUsername) {
    showQuiz(storedUsername);
} else if (registeredUser) {
    signupPage.style.display = "none";
    loginPage.style.display = "block";
    quizPage.style.display = "none";
} else {
    signupPage.style.display = "block";
    loginPage.style.display = "none";
    quizPage.style.display = "none";
}