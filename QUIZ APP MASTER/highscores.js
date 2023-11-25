const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


//console.log(highScores);

highScoresList.innerHTML = highScores
.map(score  => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join("");
//μέθοδο για επανάληψη μέσω του highScoresπίνακα και μετατροπή κάθε στοιχείου (ένα αντικείμενο βαθμολογίας) σε μια συμβολοσειρά που περιέχει ένα <li>στοιχείο με την κλάση "high-score"
    
// καλείται να ενώσει αυτές τις συμβολοσειρές σε μια ενιαία συμβολοσειρά\
//highScores.map(score => {
    //console.log(`${score.name}-${score.score}`);

//});