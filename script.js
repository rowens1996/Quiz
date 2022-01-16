
//loads quiz and starts timer on start button
function unhide() {
  startTimer()
  document.getElementById("duringQuiz").style.display = "block";
  document.getElementById("beforeQuiz").style.display = "none";
  
}

//ES6 Classes
//tracking score and question number
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }

  guess(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }

  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}
//is the chosen choice correct?
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

//displaying question, choices, and final Score

function unhideQuestion() {
  if (quiz.isEnded()) {
    displayScore();
  } else {
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionIndex().text;

    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let choiceElement = document.getElementById("choice" + i);
      choiceElement.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
}

//checks if guess is right and displays next question
function guess(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    unhideQuestion();
  };
}

//quiz progress x of y
function showProgress() {
  let currentQustionNum = quiz.questionIndex + 1;
  let ProgressElement = document.getElementById("progress");
  ProgressElement.innerHTML = `Question ${currentQustionNum} of ${quiz.questions.length}`;
}

//shows score at end by overwriting the quiz html
function displayScore() {
  let quizEndHTML = ` 
    <section class="content-wrap flex" id="afterQuiz">
        <h1 class="content-header" id="quizComplete">Congratulations you completed the Quiz!</h1>
        <h2 class="grid" id="score"> You Scored ${quiz.score} of ${quiz.questions.length}</h2>
    </section>
    <section class="flex-row" id="section-a">
        <button class="endBtn" id="retry" onclick="window.location.href='index.html'">Try Again</button>
      </section>
    `;
  let quizElement = document.getElementById("duringQuiz");
  quizElement.innerHTML = quizEndHTML;
}

//questions
let questions = [
  new Question(
    "Which phrase is NOT a part of the Jedi Code?",
    ["There is no emotion, there is peace", "There is no pasion, there is serenity", "There is no chaos, there is harmony", "The Force shall free me"],
    "The Force shall free me"
  ),
  new Question(
    "How many forms of lightsaber combat are there?",
    ["4", "5", "6", "7"],
    "7"
  ),
  new Question(
    "Sabacc is similar to which real world game?",
    ["Backgammon", "Poker", "Blackjack", "Chess"],
    "Blackjack"
  ),
  new Question(
    "Wookies have an age old rivalry and hatred of which StarWars species?",
    ["Trandoshans", "Toydarians", "Jawas", "Rodians"],
    "Trandoshans"
  ),
  new Question(
    "In the original trilogy Who kissed Princess Leia first?",
    ["Chewbacca", "Han Solo", "Luke Skywalker", "Lando Calrissian"],
    "Han Solo"
  ),
  new Question(
    "Which Sith Lord started the 'Rule of Two'?",
    ["Marko Ragnos", "Darth Tyranus", "Darth Bane", "Naga Sadow"],
    "Darth Bane"
  ),
  new Question(
    "What is the name of the old Sith homeworld?",
    ["Korriban", "Rakata Prime", "Dathomir", "Malachor V"],
    "Korriban"
  ),
  new Question(
    "The Mandalorian homeworld is th only place to get rare resorce?",
    ["Bacta", "Spice", "Beskar", "Coaxium"],
    "Beskar"
  ),
  new Question(
    "What class hyperdrive does the Millenium Falcon have?",
    ["Class 0.25", "Class 1", "Class 2", "Class 2.5"],
    "Class 0.25"
  ),
  new Question(
    "Max Rebo is famous for being what?",
    ["A Bounty Hunter", "A Fighter Pilot", "A Jizz Musician", "A Grand Moff of the Empire"],
    "A Jizz Musician"
  ),
  new Question(
    "At the battle of Endor what race was Lando's co-pilot when they destroyed the Death Star?",
    ["Sullustan", "Mon Calamari", "Human", "Wookie"],
    "Sullustan"
  ),
  new Question(
    "Cloud City is the capital of what planet?",
    ["Dantooine", "Ord Mantell", "Utahpau", "Bespin"],
    "Bespin"
  ),
  new Question(
    "Who killed Darth Maul?",
    ["Anakin Skywalker", "Obi-Wan Kenobi", "Qui-Gon Jinn", "Darth Sidious"],
    "Obi-Wan Kenobi"
  ),
  new Question(
    "Who was the Sith Lord to angry to die?",
    ["Dath Nihilus", "Naga Sadow", "Darth Sion", "Dath Revan"],
    "Darth Sion"
  ),
  new Question(
    "In the Sith Code the path to breaking chains is...",
    ["Passion - Strength - Power - Victory", "Strength - Passion - Victory - Power", "Victory - Power - Strength - Passion", "Power - Victory - Passion - Strength"],
    "Passion - Strength - Power - Victory"
  ),
];

let quiz = new Quiz(questions);
//display questions
unhideQuestion();

// 5 minute timer
let time = 5;
let quizTimerMins = time * 60 * 60;
quizTime = quizTimerMins / 60;

let counting = document.getElementById("timer");

function startTimer() {
  let quizTimer = setInterval(function () {
    if (quizTime <= 0) {
      clearInterval(quizTimer);
      displayScore();
    } else {
      quizTime--;
      let seconds = Math.floor(quizTime % 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      let minutes = Math.floor(quizTime / 60) % 60;
      counting.innerHTML = `${minutes} : ${seconds}`;
    }
  }, 1000);
}
