const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const submitButton = document.getElementById('submit-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const introContainerElement = document.getElementById('intro-container')
const introElement = document.getElementById('intro')
const endQuizContainerElement = document.getElementById('endQuiz-container')
const endQuizElement = document.getElementById('endQuiz')
const yourScoreElement = document.getElementById('yourScore')
const viewHighScoresContainerElement = document.getElementById('viewHighScores-container')
const timerElement = document.getElementById('timer')


/*
First step: User clicks start button to start game

Step 2: the intial screen is replaced by the first question
    There are 4 answers to choose from
    If the user selects the right answer tthey are given a notice they are corrrect
        socre goes up by 1
    If the user selects the worng answer they are given a notice they are wrong
        Timer is reduced ny 10 secs
    show the next question

Repeat step 2 till there are no more questions

Step 3: Show user thier score and give option to write initials

Step 4: add initials and score to Highscores page

Step 5: let the user play again if they want to.

*/

let shuffledQuestions, currentQuestionIndex
let score = 0
let secondsLeft = 300

startButton.addEventListener('click', startGame)
submitButton.addEventListener('click', highScores)

//Start the game
function startGame() {
    introContainerElement.classList.add('hide')
    startButton.classList.add('hide')
    endQuizContainerElement.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    startTimer()
}

//Timer
function startTimer() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timerElement.textContent = secondsLeft
    }, 1000);
}

    

//Set next question
function setNextQuestion() {
    resetState()
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);

    } if (currentQuestionIndex === questions.length) {
        endQuizContainerElement.classList.remove('hide');
        questionElement.classList.add('hide');
        showScore()
    }
}

function showScore() {
    var tag = document.createElement("P");
    var text = document.createTextNode("You scored " + score + " points!");
    tag.appendChild(text);
    var element = document.getElementById("endQuiz-container");
    element.appendChild(tag);

    var tag = document.createElement("P");
    var text = document.createTextNode("Enter your Initial's Below:");
    tag.appendChild(text);
    var element = document.getElementById("endQuiz-container");
    element.appendChild(tag);

    var formElement = document.createElement('form');
    formElement.setAttribute('method', 'post')
    var initialsField = document.createElement('input')
    initialsField.setAttribute('type', 'text')
    var element = document.getElementById("endQuiz-container");
    element.appendChild(initialsField);

    submitButton.classList.remove('hide');
}

function highScores() {
    submitButton.classList.add('hide');
    endQuizContainerElement.classList.add('hide');
    viewHighScoresContainerElement.classList.remove('hide');
};


function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
    }

}

//Show next question
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

//Selecting answer
function selectAnswer(e) {
    const selectedButton = e.target;
    console.log(e.target.dataset.correct)
    if (e.target.dataset.correct === "true") {
        score = score + 10;

    } else {
        secondsLeft = secondsLeft - 20;
    }
    console.log("score is " + score)
    // show next Question
    currentQuestionIndex = currentQuestionIndex + 1
    setNextQuestion()
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
]


// function selectAnswer(e) {
    //     const selectButton = e.target
    //     console.log(selectButton);
    //     const correct = selectButton.dataset.correct
    //     setStatusClass(document.body, correct)
    //     Array.from(answerButtonsElement.children).forEach(button => {
        //         setStatusClass(button, button.dataset.correct)
        //     })


        // }

        // function setStatusClass(element, correct) {
            //     clearStatusClass(element)
            //     if (correct) {
                //         correctContainerElement.classList.remove('hide')
                //     } else {
                    //         element.classList.add('wrong')
                    //     }
                    // }

/*function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}*/