const username = document.getElementById("username");
const savescorebutton = document.getElementById("savescore");
const final_score = document.getElementById("finalscore");
const most_recent_score = localStorage.getItem("most_recent_score");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
const MAX_HIGH_SCORES=10;
//localStorage.setItem("highscores",JSON.stringify([]));
//console.log(highscores);
//console.log(JSON.parse(localStorage.getItem("highscores")));
final_score.innerText = most_recent_score;
username.addEventListener('keyup',()=>{
    savescorebutton.disabled = !username.value;
})
savehighscore = () =>{
    const score  = {
        score: most_recent_score,
        name: username.value,
    };
    highscores.push(score);
    highscores.sort((a,b) =>b.score-a.score)
    highscores.splice(10);
    localStorage.setItem("highscores",JSON.stringify(highscores ));
    window.location.assign("/highscores.html");
    //console.log(highscores);
};