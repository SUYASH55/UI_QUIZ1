const highscoreslist = document.getElementById("highscoreslist");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
highscoreslist.innerHTML = highscores.map( score =>{
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join();
/*highscores.map( score =>{
    console.log(`<li class="high-score">${score.name}-${score.score}</li>`);
});*/