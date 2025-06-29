const questions = [
    {
        question: "What causes most earthquakes?",
        answers: [
            { text: "Volcanic eruptions", correct: false},
            { text: "Collapsing buildings", correct: false},
            { text: "Movement of tectonic plates", correct: true},
            { text: "Strong winds", correct: false},
        ]
    },

    {
        question: "What is the point on the Earth's surface directly above the earthquake origin called?",
        answers: [
            { text: "Seismic zone", correct: false},
            { text: "Hypocenter", correct: false},
            { text: "Fault line", correct: false},
            { text: "Epicenter", correct: true},
        ]
    },

    {
        question: "Which scale is commonly used to measure earthquake magnitude?",
        answers: [
            { text: " Celsius scale", correct: false},
            { text: "Beaufort scale", correct: false},
            { text: "Richter scale ", correct: true},
            { text: "Fujita scale", correct: false},
        ]
    },
    {

        question: "What instrument is used to detect and record earthquakes?",
        answers: [
            { text: "Thermometer", correct: false},
            { text: "Seismograph", correct: true},
            { text: "Barometer", correct: false},
            { text: "Hydrometer", correct: false},
        ]
    },
    {
         question: "Where do most earthquakes occur?",
        answers: [
            { text: "Middle of continents", correct: false},
            { text: "Along plate boundaries", correct: true},
            { text: "In deserts", correct: false},
            { text: "At the equator", correct: false},
        ]
    },

    {
        question: "What is a tsunami most commonly caused by?",
        answers: [
            { text: "Hurricanes", correct: false},
            { text: "Underwater earthquakes", correct: true},
            { text: "Tidal waves", correct: false},
            { text: "Icebergs melting", correct: false},
        ]
    },

    {
        question: " Which layer of the Earth do earthquakes typically originate in?",
        answers: [
            { text: "Inner core", correct: false},
            { text: "Outer core", correct: false},
            { text: " Crust ", correct: true},
            { text: "Atmosphere", correct: false},
        ]
    },

    {

        question: "What does the Richter scale measure?",
        answers: [
            { text: "Depth of the earthquake", correct: false},
            { text: "Speed of the wave", correct: false},
            { text: " Damage caused", correct: false},
            { text: "Energy released (magnitude)", correct: true},
        ]
    },

    {

        question: "What is the term for smaller quakes that follow a major earthquake?",
        answers: [
            { text: " Pre-shocks", correct: false},
            { text: "Miniquakes", correct: false},
            { text: "Aftershocks", correct: true},
            { text: "Foreshocks", correct: false},
        ]
    },

    {

        question: "Which country experiences the most earthquakes annually?",
        answers: [
            { text: "Brazil", correct: false},
            { text: " Canada", correct: false},
            { text: "Japan ", correct: true},
            { text: "South Africa", correct: false},
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("bag");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("app");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
} 

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedApp = e.target;
    const isCorrect = selectedApp.dataset.correct === "true";
    if(isCorrect){
        selectedApp.classList.add("correct");
        score++;
    }else{
        selectedApp.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score } out of ${questions.length}!`;
    nextButton.innerHtml = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();