const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText =document.getElementById('progressText');
const scoreText=document.getElementById('score');
const progressfullbar=document.getElementById("progressfullbar");
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];
// μεθοδος fetch διεπαφής με τον χρήστη ανάκτησης πόρων
// ανάκτηση του αρχείου question.json ή του λινκ 
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res => {
        // με το then περιλαμβάνει την ανάγνωση των δεδομένων απόκρισης.

        return res.json();
   })
   .then(loadedQuestions => {
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestions => {
        // Αυτό το απόσπασμα κώδικα με το map μετατρέπει τα δεδομένα 
        // στα "αποτελέσματα" σε έναν νέο πίνακα που ονομάζεται questions
            const formattedQuestion = { 
            question: loadedQuestions.question
            // Αυτός ο κώδικας ορίζει ένα νέο αντικείμενο formattedQuestionγια κάθε ερώτηση στον πίνακα "αποτελέσματα". 
            // Παίρνει την ιδιότητα "ερώτηση" από τα αρχικά δεδομένα και την αποθηκεύει στο formattedQuestionαντικείμενο.
        };
        const answerChoices = [...loadedQuestions.incorrect_answers];// εκχωρήτε στο answerChoices η ιδιοτητα incorrect_answer 
        //του αντικειμένου loadedQuestions
        formattedQuestion.answer = Math.floor(Math.random() *3)+1;
        // η παραπανω γραμμή αλλάζει την θέση της απάντησης της ερώτησης κάθε φορά απο θέση 1 έως 3 όσες είναι και οι επιλόγες 
        // και εκχωρείτε στο formattedQuestion
        answerChoices.splice(formattedQuestion.answer -1, 0,
            loadedQuestions.correct_answer);
            // εισάγει στο answerChoices την σωστή απάντηση στη θέση (formattedQuestion.answer -1, 0) 
            // του πίνακα  loadedQuestions.correct_answer αν δηλαδη η απαντηση του χρηστη ειναι η 2 
            //και είναι σωστή κατεβάζει την θεση της σωστής απαντησης μια θέση

        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index+1)] = choice;
        })
        return formattedQuestion;
        //επανάλληψη βρόχου για κάθε απάντηση εκχωρείτε στο 
        // formattedQuestion η επιλογη1..2..3. της απάντησης και δίπλα 
        // το κείμενο της απάντησης το +1 προσθετει θεση 
    });
   
    startGame();
   
    //questions = loadedQuestions;    
    
    // το παραπάνω κομμάτι κώδικα Καταγράφει τις φορτωμένες ερωτήσεις στην κονσόλα, 
    //τις αποθηκεύει σε μια μεταβλητή με το όνομα questions, και στη συνέχεια καλεί τη startGame()συνάρτηση
  })
   .catch(err => {
     console.error(err);
   });
   //Μέσα στο .catch()μπλοκ, καταγράφει το σφάλμα στην κονσόλα χρησιμοποιώντας console.error().
   // Αυτός είναι ένας συνηθισμένος τρόπος καταγραφής σφαλμάτων


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0; //μετρητής ερωτήσεων 
    score = 0;
    availableQuesions = [...questions]; //η πρωτη μεταβλητη εισάγει τις ερωτήσεις πιο πάνω
    getNewQuestion(); 
    game.classList.remove("hidden");
    // έχει φορτωθεί το παιχνιδι και αφαιρείτε το id=hidden 
    loader.classList.add("hidden");
   // κρύβει το animation loader

};

getNewQuestion = () => {
    if (availableQuesions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page εαν ο μετρητης υπερβεί τον αριθμο ερωτήσεων ή το μήκος ερώτησεων είναι μηδεν σε πηγαινει στο end.html
        localStorage.setItem("mostRecentScore", score);//  αποθηκεύσετε ένα αντικείμενο με το όνομα scoreαπευθείας στο localStorage. 
        //Ωστόσο, localStorageμπορεί να αποθηκεύσει μόνο τιμές συμβολοσειρών, όχι αντικείμενα JavaScript.
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //το παραπάνω κομμάτι κώδικα γράφεται και έτσι: δημιουργήσει μια συμβολοσειρά όπως "Ερώτηση 1/10",
    // υποδεικνύοντας ότι είναι η πρώτη από τις 10 συνολικά ερωτήσεις.
    //progressText.innerText= "Question:" + (questionCounter + "/" + MAX_QUESTIONS);
    progressfullbar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; // στα ελληνικά τόνος πανω απο το πλήκτρο Q
    //χρησιμοποιείται για τον υπολογισμό του πλάτους ως ποσοστό
    //υτό το ποσοστό αντιπροσωπεύει πόση πρόοδο έχει σημειωθεί στο κουίζ και χρησιμοποιείται για να ορίσετε ανάλογα το πλάτος της γραμμής προόδου.
    
    const questionIndex =Math.floor(Math.random()* availableQuesions.length); // Εδώ, δημιουργείται ένα ευρετήριο τυχαίας ερώτησης χρησιμοποιώντας τη Math.random()συνάρτηση.
    //Πολλαπλασιάζει την τυχαία τιμή με το μήκος του availableQuesionsπίνακα (υποθέτοντας ότι availableQuesionsείναι ένας πίνακας ερωτήσεων) 
    //και στη συνέχεια χρησιμοποιεί Math.floor()για να στρογγυλοποιήσει προς τα κάτω στον πλησιέστερο ακέραιο αριθμό. Αυτό σας δίνει ένα τυχαίο ευρετήριο εντός του εύρους των διαθέσιμων ερωτήσεων.
    currentQuestion = availableQuesions[questionIndex]; //Αυτή η γραμμή εκχωρεί την τυχαία επιλεγμένη ερώτηση από τον availableQuesionsπίνακα στη currentQuestionμεταβλητή. 
    //Υποθέτουμε ότι κάθε ερώτηση στον πίνακα είναι ένα αντικείμενο με μια questionιδιότητα που περιέχει το κείμενο της ερώτησης.
    question.innerText = currentQuestion.question; // Τέλος, αυτή η γραμμή ενημερώνει το περιεχόμενο κειμένου ενός στοιχείου HTML με το αναγνωριστικό question(προφανώς ένα στοιχείο εμφάνισης ερώτησης) με το κείμενο της τρέχουσας ερώτησης.

    choices.forEach(choice => {
        const number = choice.dataset["number"];// dataset ιδιότητα σάς επιτρέπει να έχετε πρόσβαση σε χαρακτηριστικά δεδομένων ενός στοιχείου HTML
        choice.innerText = currentQuestion["choice" + number];// Αυτός ο κώδικας φαίνεται να επαναλαμβάνεται μέσω μιας συλλογής στοιχείων HTML με το όνομα κλάσης `choices`. 
        // Χρησιμοποιεί έναν βρόχο «forEach» για να εκτελέσει το ίδιο σύνολο λειτουργιών για κάθε στοιχείο αυτής της συλλογής.
        //η τιμή που είναι αποθηκευμένη στο data-numberχαρακτηριστικό του choiceστοιχείου, το οποίο υποτίθεται ότι αντιπροσωπεύει τον αριθμό που σχετίζεται με την επιλογή απάντησης.
    });
    availableQuesions.splice(questionIndex, 1);//Η spliceμέθοδος χρησιμοποιείται για την τροποποίηση ενός πίνακα προσθέτοντας ή αφαιρώντας στοιχεία. Σε αυτήν την περίπτωση:αφαιρεί το πρώτο στοιχείο τουπίνακα.
    // αυτό γίνεται για να μην επαναληφθεί η ερώτηση και να προχωρήσει ο χρήστης στην επόμενη.
    acceptingAnswers = true;
   
};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        console.log(e.target);
        if (!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;//Συγκρίνει την επιλεγμένη απάντηση ( selectedAnswer) με τη σωστή απάντηση της τρέχουσας ερώτησης ( currentQuestion.answer) και καταγράφει εάν η επιλεγμένη απάντηση είναι σωστή.
        const selectedAnswer = selectedChoice.dataset["number"];
        // console.log(selectedAnswer==currentQuestion.answer);εμφανίζει false ή true// η τιμή της answer είναι αποθηκευμένη στο αντικείμενο currentQuestion
        //Εξασφαλίζει ότι οι χρήστες μπορούν να επιλέξουν μόνο μία απάντηση ανά ερώτηση, ελέγχει εάν η επιλεγμένη απάντηση είναι σωστή και προχωρά στην επόμενη ερώτηση όταν χρειάζεται.
        // αν γράφαμε console.log(selectedAnswer,currentQuestion.answer); θα εκτύπωνε τον αριθμό ερώτησης με την απάντηση δίπλα

        const classToApply = 
        selectedAnswer == currentQuestion.answer? "correct": "incorrect";
        //  const classToApply = "incorect"; την παραπανω γραμμή μπορούμε να την γράψουμε και έτσι
        // if (selectedAnswer == currentQuestion.answer){
        //    classToApply = "correct";}
        //console.log(classToApply);// εμφανίζει στην κονσόλα αν είναι σωστή ή λάθος η απάντηση
        //Εάν η συνθήκη είναι αληθής (δηλαδή, η επιλεγμένη απαντηση ταιριάζει με τη σωστή απάντηση), τότε η συμβολοσειρά "correct" εκχωρείται στη classToApplyμεταβλητή 
        //και αντοιστιχα αν ειναι λάθος η απάντηση θα εισχωρήσει incorect στο classToApply 
        if (classToApply=="correct") {
            incrementScore(CORRECT_BONUS);
            //αυξάνει τη βαθμολογία του χρήστη κατά μια καθορισμένη τιμή μπόνους
        }
        
        selectedChoice.parentElement.classList.add(classToApply);
        //προσθέτει την classToApplyκλάση CSS στο γονικό στοιχείο τou selectedchoice. 
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            //αυτός ο κωδικός χρησιμοποιείται setTimeoutγια την αφαίρεση της classToApplyκλάσης από το γονικό στοιχείο της επιλεγμένης επιλογής.
            getNewQuestion(); 
        }, 1000);      
    });
});
incrementScore = num =>{
    score+=num;
    scoreText.innerText=score;
};
