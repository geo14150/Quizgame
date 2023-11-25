const username = document.getElementById("username");
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
//Αυτή η γραμμή ανακτά την τιμή που σχετίζεται με το κλειδί "mostRecentScore" από το localStorage
//και την εκχωρεί στη μεταβλητή mostRecentScore.
//localStorage.setItem('highScores',[]);
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//JSON.parse για να το μετατρέψει ξανά σε αντικείμενο JavaScript. 
//Για να ανακτήσετε το highScore από localStorage και να το αναλύσετε ξανά σε ένα αντικείμενο
//Εάν δεν υπάρχει τιμή κάτω localStorage από το κλειδί "highscores",αρχικοποιείται highScores ως κενός πίνακας []. 
//Αυτός ο πίνακας αναμένεται να αποθηκεύσει μια λίστα με υψηλές βαθμολογίες.
const MAX_HIGH_SCORES= 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", ()=> {
    saveScoreBtn.disabled = !username.value;// ελέγχει εάν η usernameτιμή του πεδίου εισαγωγής είναι κενή. 
    //Εάν είναι κενό, η παράσταση υπολογίζεται σε true, υποδεικνύοντας ότι το usernameπεδίο εισαγωγής δεν έχει τιμή.
});

saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

// αποτρέπει την προεπιλεγμένη ενέργεια αυτού του συμβάντος από την εμφάνιση. 
//Σε αυτήν την περίπτωση, εμποδίζει την υποβολή μιας φόρμας.
//κωδικός διασφαλίζει ότι το κουμπί "Αποθήκευση βαθμολογίας" παραμένει απενεργοποιημένο έως ότου ο χρήστης εισαγάγει μια τιμή στο usernameπεδίο εισαγωγής. 
//Παρέχει μια βασική μορφή επικύρωσης εισόδου εμποδίζοντας τον χρήστη να υποβάλει βαθμολογία χωρίς να καθορίσει όνομα χρήστη.
    const score = {
        score: Math.floor(Math.random() * 100),// τυχαία βαθμολογία απο 0-99 
        name: username.value
    };
    highScores.push(score); //Προσθέτει το νέο σκορ
    //Αυτός είναι ο τρόπος με τον οποίο μια νέα καταχώριση υψηλής βαθμολογίας προσαρτάται στην υπάρχουσα λίστα υψηλών βαθμολογιών.
   

    highScores.sort((a,b) => b.score - a.score);
    //συνάρτηση σύγκρισης.Εάν b.score - a.scoreείναι θετικός αριθμός, σημαίνει ότι bέχει υψηλότερη βαθμολογία από a, και θα τοποθετηθεί πριν aστον ταξινομημένο πίνακα.
    //Αν b.score - a.scoreείναι μηδέν, η σειρά των aκαι bπαραμένει αμετάβλητη.
    //Εάν b.score - a.scoreείναι αρνητικός αριθμός, σημαίνει ότι aέχει υψηλότερη βαθμολογία από b, και aθα τοποθετηθεί πριν bστον ταξινομημένο πίνακα. 
    //ο highScoresπίνακας θα ταξινομηθεί με φθίνουσα σειρά, με τις υψηλότερες βαθμολογίες να εμφανίζονται στην αρχή του πίνακα
    highScores.splice(5);
    //χρησιμοποιείται για την αφαίρεση στοιχείων από τον highScoresπίνακα, ξεκινώντας από το 6ο στοιχείο και μετά. Μετά την εκτέλεση αυτού του κώδικα,
    // ο highScoresπίνακας θα διατηρήσει μόνο τα πρώτα 5 στοιχεία και τυχόν στοιχεία πέρα ​​από το 5ο ευρετήριο θα αφαιρεθούν. Αυτός είναι ένας τρόπος για να διατηρήσετε τον πίνακα περιορισμένο στις 5 κορυφαίες υψηλές βαθμολογίες ή να αφαιρέσετε παλαιότερες καταχωρίσεις ή καταχωρίσεις με χαμηλότερη βαθμολογία.
    localStorage.setItem("highScores",JSON.stringify(highScores));
    //Αυτός ο κώδικας μετατρέπει το highscore αντικείμενο σε συμβολοσειρά JSON και στη συνέχεια το αποθηκεύει κάτω από το κλειδί "highScore" στο localStorage.
    window.location.assign("app.html");
   
   // window.location.assign("highscores.html");
    //console.log(highScores);
}; 