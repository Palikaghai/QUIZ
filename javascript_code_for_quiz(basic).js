
            cpp: [
                { question: "Who invented C++?", answers: [
                    { text: "Bjarne Stroustrup", correct: true },
                    { text: "Dennis Ritchie", correct: false },
                    { text: "Ken Thompson", correct: false },
                    { text: "Brian Kernighan", correct: false } ]},
                { question: "Which approach is used by C++?", answers: [
                    { text: "Top-down", correct: false },
                    { text: "Bottom-up", correct: true },
                    { text: "Left-Right", correct: false },
                    { text: "Right-left", correct: false } ]},
                { question: "Which of the following extension is used for user-defined header file in c++?", answers: [
                    { text: "h", correct: true },
                    { text: "hg", correct: true },
                    { text: "cpp", correct: false },
                    { text: "<stdio>", correct: false } ]

                }
            ],
            ds: [
                { question: "Which data structure is used for recursion?", answers: [
                    { text: "Array", correct: false },
                    { text: "Stack", correct: true },
                    { text: "Queue", correct: false },
                    { text: "List", correct: false } ]},
                { question: "Value of 6 3 2 4 + - *?", answers: [
                    { text: "-18", correct: true },
                    { text: "-20", correct: false },
                    { text: "18", correct: false },
                    { text: "20", correct: false } ]}
            ],
            web: [
                { question: "What is PHP?", answers: [
                    { text: "Programming language", correct: true },
                    { text: "Central processor", correct: false },
                    { text: "Helping protocol", correct: false },
                    { text: "None", correct: false } ]},
                { question: "Header for getch()?", answers: [
                    { text: "math.h", correct: false },
                    { text: "stdio.h", correct: false },
                    { text: "iostream.h", correct: false },
                    { text: "conio.h", correct: true } ]}
            ]
        };

        const subjectSelect = document.getElementById("subject");
        const questionElement = document.getElementById("question");
        const answerButtons = document.getElementById("answer-buttons");
        const nextButton = document.getElementById("next-btn");
        const resultAnimation = document.getElementById("result-animation");

        let currentQuestionIndex = 0;
        let score = 0;
        let selectedQuestions = [];

        function startQuiz() {
            const selectedSubject = subjectSelect.value;
            selectedQuestions = questionBanks[selectedSubject];
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            resultAnimation.classList.add("hidden");
            resetState();
            showQuestion();
        }

        function showQuestion() {
            resetState();
            const currentQuestion = selectedQuestions[currentQuestionIndex];
            questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerText = answer.text;
                button.classList.add("btn");
                if (answer.correct) button.dataset.correct = answer.correct;
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
            questionElement.innerHTML = `YOU SCORED ${score} OUT OF ${selectedQuestions.length}!`;
            nextButton.innerHTML = "WANT TO TRY AGAIN?";
            nextButton.style.display = "block";
            resultAnimation.classList.remove("hidden");
            resultAnimation.innerHTML = score >= selectedQuestions.length / 2
                ? '<img src="https://media.istockphoto.com/id/176227321/vector/excited-emoticon.jpg" alt="Smiley Face">'
                : '<img src="https://i.pinimg.com/originals/4e/d8/ca/4ed8cabeaf48ed858742be7c61b9d343.png" alt="Sad Face">';
        }

        function handleNextButton() {
            currentQuestionIndex++;
            if (currentQuestionIndex < selectedQuestions.length) {
                showQuestion();
            } else {
                showScore();
            }
        }

        nextButton.addEventListener("click", () => {
            if (currentQuestionIndex < selectedQuestions.length) {
                handleNextButton();
            } else {
                startQuiz();
            }
        });

        subjectSelect.addEventListener("change", startQuiz);

        startQuiz();

