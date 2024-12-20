const questions = [
    {
        question: "Which data structure is used for implementing recursion?",
        answers: [
            { text: "Array", correct: false },
            { text: "Stack", correct: true },
            { text: "Queue", correct: false },
            { text: "List", correct: false }
        ]
    },
    {
        question: "Who invented C++?",
        answers: [
            { text: "Bjarne Stroustrup", correct: true },
            { text: "Brian Kernighan", correct: false },
            { text: "Dennis Ritchie", correct: false },
            { text: "Ken Thompson", correct: false }
        ]
    },
    {
        question: "What is the value of the postfix expression 6 3 2 4 + – *?",
        answers: [
            { text: "-18", correct: true },
            { text: "-20", correct: false },
            { text: "18", correct: false },
            { text: "20", correct: false }
        ]
    },
    {
        question: "Which of the following approach is used by C++?",
        answers: [
            { text: "Left-Right", correct: false },
            { text: "Right-left", correct: false },
            { text: "Top-down", correct: false },
            { text: "Bottom-up", correct: true }
        ]
    },
    {
        question: "What is PHP in programming?",
        answers: [
            { text: "General purpose programming language", correct: true },
            { text: "Central processing unit", correct: false },
            { text: "Process Helping Protocol", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    {
        question: "Which type of header file are belongs to getch()?",
        answers: [
            { text: "math.h", correct: false },
            { text: "stdio.h", correct: false },
            { text: "iostream.h", correct: false },
            { text: "conio.h", correct: true }
        ]
    },
    {
        question: "Unicode provides: ?",
        answers: [
            { text: "Uniform code for checking all computer programs", correct: false },
            { text: "Unique code to denote every computer company", correct: false },
            { text: "Codes for English language characters", correct: false },
            { text: "Unique code for every character of every language", correct: true }
        ]
    },
    {
        question: "What is the program that translates source code into object code called?",
        answers: [
            { text: "Executor", correct: false },
            { text: "Translator", correct: false },
            { text: "Compiler", correct: true },
            { text: "Interpreter", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    resetState();
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `YOU SCORED ${score} OUT OF ${questions.length}!`;
    nextButton.innerHTML = "WANT TO TRY AGAIN?";
    nextButton.style.display = "block";
    resetState();
    const resultAnimation = document.getElementById("result-animation");
    resultAnimation.classList.remove("hidden");
    if (score>= questions.length/2) {
        resultAnimation.innerHTML = '<img src="https://media.istockphoto.com/id/176227321/vector/excited-emoticon.jpg?s=612x612&w=0&k=20&c=Y_21QIr5mpI32OunrvWBYyYSivwgWXRja1n7EZycEsU=" alt="Smiley Face">';
    } else {
        resultAnimation.innerHTML = '<img src="https://i.pinimg.com/originals/4e/d8/ca/4ed8cabeaf48ed858742be7c61b9d343.png" alt="Sad Face">';
    }
    questionElement.innerHTML = `YOU SCORED ${score} OUT OF ${questions.length}!`;
    nextButton.innerHTML = "WANT TO TRY AGAIN?";
    nextButton.style.display = "block";

}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();





