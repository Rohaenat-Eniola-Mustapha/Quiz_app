const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');

let nextBtn; // Define nextBtn variable
let optionList; // Define optionList variable

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
}

let questionCount = 0;
let questionNumb = 1;
let score = 0; // Define a score variable

// Define nextBtn after continueBtn
nextBtn = document.getElementById('nextBtn');

// Define optionList before showQuestions
optionList = document.querySelector('.option-list');

nextBtn.addEventListener('click', () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);
        
        // Disable next button again
        nextBtn.classList.remove('active');
    } else {
        console.log('Question Completed');
    }
});

// getting questions and options from array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div>
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    optionList.addEventListener('click', function(event) {
        if (event.target.matches('.option')) {
            optionSelected(event.target);
        }
    });
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    const options = document.querySelectorAll('.option');

    if (userAnswer === correctAnswer) {
        console.log('Answer is correct');
        answer.classList.add('correct');
        score++; // Increment score for correct answer
    } else {
        console.log('Answer is incorrect');
        answer.classList.add('incorrect');
        options.forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add('correct');
            }
        });
    }

    // Disable all options
    options.forEach(option => {
        option.removeAttribute('onclick');
    });

    // Update header score text
    headerScore.textContent = `Score: ${score} / ${questions.length}`;

    console.log('Current score:', score); // Output current score

    // Enable next button
    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

const headerScore = document.querySelector('.header-score');