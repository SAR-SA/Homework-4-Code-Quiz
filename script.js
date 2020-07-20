const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const goBackButton = document.getElementById('goBack-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const introContainerElement = document.getElementById('intro-container');
const introElement = document.getElementById('intro');
const endQuizContainerElement = document.getElementById('endQuiz-container');
const endQuizElement = document.getElementById('endQuiz');
const yourScoreElement = document.getElementById('yourScore');
const viewHighScoresContainerElement = document.getElementById('viewHighScores-container');
const timerElement = document.getElementById('timer');
const topHighScoreButton = document.getElementById('topHighScore-btn');


let shuffledQuestions, currentQuestionIndex;
let score = 0;
let secondsLeft = 300;

startButton.addEventListener('click', startGame);
submitButton.addEventListener('click', highScores);
topHighScoreButton.addEventListener('click', highScores);
goBackButton.addEventListener('click', homePage);
restartButton.addEventListener('click', homePage);

//Go back to home page
function homePage() {
    submitButton.classList.add('hide');
    endQuizContainerElement.classList.add('hide');
    viewHighScoresContainerElement.classList.add('hide');
    introContainerElement.classList.remove('hide');
    startButton.classList.remove('hide');
    goBackButton.classList.add('hide');
    restartButton.classList.add('hide');
}

//Start the game
function startGame() {
    introContainerElement.classList.add('hide');
    startButton.classList.add('hide');
    endQuizContainerElement.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    startTimer();
}

//Timer
function startTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = secondsLeft;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    secondsLeft = 300;
}

function noTime() {
    if (secondsLeft = 0) {
        showScore ();
    }
}



//Set next question
function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);

    } if (currentQuestionIndex === questions.length) {
        endQuizContainerElement.classList.remove('hide');
        questionElement.classList.add('hide');
        showScore();
    }
}

function showScore() {
    var tag = document.createElement("P");
    var text = document.createTextNode("You scored " + score + " points!");
    tag.appendChild(text);
    var element = document.getElementById("endQuiz-container");
    element.appendChild(tag);
    stopTimer();

    submitButton.classList.remove('hide');
    restartButton.classList.remove('hide');
}

function highScores() {
    submitButton.classList.add('hide');
    endQuizContainerElement.classList.add('hide');
    viewHighScoresContainerElement.classList.remove('hide');
    introContainerElement.classList.add('hide');
    startButton.classList.add('hide');
    goBackButton.classList.remove('hide');
}


function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
            (answerButtonsElement.firstChild);
    }

}

//Show next question
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

//Selecting answer
function selectAnswer(e) {
    const selectedButton = e.target;
    console.log(e.target.dataset.correct);
    if (e.target.dataset.correct === "true") {
        score = score + 10;

    } else {
        secondsLeft = secondsLeft - 20;
    }
    console.log("score is " + score);
    // show next Question
    currentQuestionIndex = currentQuestionIndex + 1;
    setNextQuestion();
}



const questions = [
    {
        question: 'Why do JavaScript and Java have similar name?',
        answers: [
            { text: 'JavaScript is a stripped-down version of Java', correct: false },
            { text: 'JavaScript\'s syntax is loosely based on Java\'s', correct: true },
            { text: 'They both originated on the island of Java', correct: false },
            { text: 'None of the above', correct: false }
        ]
    },

    {
        question: 'What are variables used for in JavaScript Programs?',
        answers: [
            { text: 'Storing numbers, dates, or other values', correct: true },
            { text: 'Varying randomly', correct: false },
            { text: 'Causing high-school algebra flashbacks', correct: false },
            { text: 'None of the above', correct: false }
        ]
    },

    {
        question: '_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.',
        answers: [
            { text: 'Client-side', correct: true },
            { text: 'Server-side', correct: false },
            { text: 'Local', correct: false },
            { text: 'Native', correct: false }
        ]
    },

    {
        question: 'What should appear at the very end of your JavaScript?',
        answers: [
            { text: 'The </script>', correct: true },
            { text: 'The <script>', correct: false },
            { text: 'The END statement', correct: false },
            { text: 'None of the above', correct: false }
        ]
    },

    {
        question: 'Which of the following can\'t be done with client-side JavaScript?',
        answers: [
            { text: 'Validating a form', correct: false },
            { text: 'Sending a form\'s contents by email', correct: false },
            { text: 'Storing the form\'s contents to a database file on the server', correct: true },
            { text: 'None of the above', correct: false }
        ]
    },

    {
        question: 'Which of the following are capabilities of functions in JavaScript?',
        answers: [
            { text: 'Return a value', correct: true },
            { text: 'Accept parameters and Return a value', correct: false },
            { text: 'Accept parameters', correct: true },
            { text: 'None of the above', correct: false }
        ]
    },

    {
        question: 'Which of the following is not a valid JavaScript variable name?',
        answers: [
            { text: '2names', correct: true },
            { text: '_first_and_last_names', correct: false },
            { text: 'FirstAndLast', correct: false },
            { text: 'None of the above', correct: false }
        ]
    },

    {
        question: ' ______ tag is an extension to HTML that can enclose any number of JavaScript',
        answers: [
            { text: '<SCRIPT>', correct: true },
            { text: '<BODY>', correct: false },
            { text: '<HEAD>', correct: false },
            { text: '<TITLE>', correct: false }
        ]
    },

    {
        question: 'How does JavaScript store dates in a date object?',
        answers: [
            { text: 'The number of days since January 1st, 1900', correct: false },
            { text: 'The number of seconds since Netscape\'s public stock offering.', correct: false },
            { text: 'The number of milliseconds since January 1st, 1970', correct: true },
            { text: 'None of the above', correct: false }
        ]
    },

    {
        question: 'What is the correct JavaScript syntax to write "Hello World"?',
        answers: [
            { text: 'System.out.println("Hello World")', correct: false },
            { text: 'println ("Hello World")', correct: false },
            { text: 'document.write("Hello World")', correct: true },
            { text: 'response.write("Hello World")', correct: false }
        ]
    },
];


var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

init();

function renderTodos() {
    // Clear HighScore element and update HighScoreCountSpan
    todoList.innerHTML = "";
    todoCountSpan.textContent = todos.length;

    // Render a new li for each HighScore
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];

        var li = document.createElement("li");
        li.textContent = todo;
        li.setAttribute("data-index", i);

        /*var button = document.createElement("button");
        button.textContent = "Clear Score";
    
        li.appendChild(button);*/
        todoList.appendChild(li);
    }
}

function init() {
    // Get stored HighScore from localStorage
    // Parsing the JSON string to an object
    var storedTodos = JSON.parse(localStorage.getItem("todos"));

    // If HighScore were retrieved from localStorage, update the HighScore array to it
    if (storedTodos !== null) {
        todos = storedTodos;
    }

    // Render HighScore to the DOM
    renderTodos();
}

function storeTodos() {
    // Stringify and set "HighScore" key in localStorage to todos array
    localStorage.setItem("todos", JSON.stringify(todos));
}

// When form is submitted...
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var todoText = todoInput.value.trim() + score;

    // Return from function early if submitted HighScoreText is blank
    if (todoText === "") {
        return;
    }

    // Add new HighScoreText to todos array, clear the input
    todos.push(todoText);
    todoInput.value = "";

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
});

// When a element inside of the HighscoreList is clicked...
todoList.addEventListener("click", function (event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {
        // Get its data-index value and remove the Highscore element from the list
        var index = element.parentElement.getAttribute("data-index");
        todos.splice(index, 1);

        // Store updated todos in localStorage, re-render the list
        storeTodos();
        renderTodos();
    }
});
