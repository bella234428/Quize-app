const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("bag");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];


async function fetchQuestions() {
    const apiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&limit=10";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const quakes = data.features;

        
        questions = quakes.map((quake, index) => {
            const correctPlace = quake.properties.place;
            const magnitude = quake.properties.mag?.toFixed(1) ?? "unknown";

            
            const otherPlaces = quakes
                .filter(q => q.properties.place !== correctPlace)
                .map(q => q.properties.place);

            const shuffledChoices = shuffle([
                correctPlace,
                ...shuffle(otherPlaces).slice(0, 3)
            ]);

            return {
                question: `Where did the earthquake of magnitude ${magnitude} occur?`,
                answers: shuffledChoices.map(place => ({
                    text: place,
                    correct: place === correctPlace
                }))
            };
        });

        startQuiz();

    } catch (error) {
        questionElement.innerText = "Failed to load quiz questions.";
        console.error("API Error:", error);
    }
}

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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
    nextButton.innerHTML = "Play Again";
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
});


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


fetchQuestions();