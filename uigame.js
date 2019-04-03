const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progresstext=document.getElementById("progress-text");
const scoretext=document.getElementById("score");
const progressbar=document.getElementById("progressbarfull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let current_question = {};
let accepting_answers=false;
let score=0;
let question_counter=0;
let available_questions = [];
let questions=[];
//FETCHING QUESTIONS
fetch("questions.json").then( res =>{
    return res.json();
}).then( loadedquestions =>{
    console.log(loadedquestions);
    questions = loadedquestions;
    
    startGame();

})
.catch( err =>{
    console.error(err);
})

//CONSTANTS
const CORRECT=10;
const INCORRECT=5;
const MAX_QUESTIONS=15;
startGame = () =>{
    question_counter=0;
    score=0;
    available_questions=[...questions];
    get_New_Question();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};
skip_to_next = () =>{
    get_New_Question();
};
get_New_Question = () =>{
    if(available_questions.length===0 || question_counter >= MAX_QUESTIONS){
        //GO TO END PAGE
        localStorage.setItem("most_recent_score",score);
        return window.location.assign("/end.html");
    }
    question_counter++;
    progresstext.innerText = `QUESTION  ${question_counter} /  ${MAX_QUESTIONS}`;
    //UPDATE PROGRESS BAR
    progressbar.style.width = `${(question_counter/MAX_QUESTIONS) * 100}%`; 
    const question_index = Math.floor(Math.random() * available_questions.length);
    current_question=available_questions[question_index];
    question.innerText=current_question.question;
    choices.forEach( choice =>{
        const number=choice.dataset["number"];
        choice.innerText=current_question["choice" + number];
    } );
    available_questions.splice(question_index,1);
    accepting_answers=true;
};
choices.forEach( choice =>{
    choice.addEventListener("click",e =>{
        if(!accepting_answers) return;
        accepting_answers = false;
        const selected_choice = e.target;
        const selected_answer = selected_choice.dataset["number"];
        const classToApply = selected_answer == current_question.answer ? "correct" : "incorrect";
        if(classToApply==="correct"){
            incrementScore(CORRECT);
        }
        if(classToApply==="incorrect"){
            decrementScore(INCORRECT);
        }
        selected_choice.parentElement.classList.add(classToApply);
        setTimeout( () =>{
            selected_choice.parentElement.classList.remove(classToApply);
            get_New_Question();
        },2000 )
         
    });
} );
incrementScore = num =>{
    score+=num;
    scoretext.innerText = score;
};
decrementScore = num =>{
    score-=num;
    scoretext.innerText = score;
};

