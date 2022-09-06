//const for elements and buttons using get elelement by id
const nextButton = document.getElementById("nextbtn");
const startButton = document.getElementById("startbtn");
const questionContainerElement = document.getElementById("questionContainer");
const questionsEl = document.getElementById("question");
const answerBtnEl = document.getElementById("answer-buttons");
const title = document.getElementById("title");
const saveButton = document.getElementById("saveButton");
const nameOfUser = document.getElementById("userName");
const HighScoresTitle = document.getElementById("HighScoresTitle");
const scores = document.getElementById("score");
var userScore = document.getElementById("score");
const highScoreTable = document.getElementById("pastHighScore");
const done = document.getElementById("done");
var userScore = 0;


//local storage add event listener for save and it calls savename for high scores. eve in the highrything works now i need to get the values from local storage and display them scores page.
saveButton.addEventListener("click", saveHighScore);
done.classList.add("hide");
HighScoresTitle.classList.add("hide");
highScoreTable.classList.add("hide");
saveButton.style.display = "none";
nameOfUser.style.display = "none";

function returnHome() {
    startButton.classList.remove("hide");
  title.classList.remove("hide");
  HighScoresTitle.classList.add("hide");
  saveButton.classList.add("hide");
  nameOfUser.classList.add("hide");
  document.createElement("Homepage");
  scores.classList.add("hide");
  highScoreTable.classList.add("hide");
  saveButton.style.display = "none";
  nameOfUser.style.display = "none";
  done.classList.add("hide");

}  done.addEventListener("click", returnHome);
function saveHighScore() {
  if (localStorage.getItem("names") === null) {

    var oldName = [];
    oldName.push({
      userScore: userScore,
      name: nameOfUser.value,
    });
    localStorage.setItem("names", JSON.stringify(oldName));
  }
//   const scores = document.getElementById("score");
  var addedName = document.getElementById("userName").value;
  console.log(addedName);
  var oldName = localStorage.getItem("names") || [];
  console.log("helloworld", oldName);
  oldName = JSON.parse(oldName);

  const score = {
    userScore: userScore,
    name: nameOfUser.value,
  };
  //push before sorting, if done after it will ignore sort
  oldName.push(score);
  console.log(oldName, "somestring");
  const sorting = oldName.sort((a, b) => { return(b.userScore - a.userScore)})
  oldName = sorting
  console.log(sorting, oldName, "samsong");

  highScoreTable.innerHTML = oldName
    .map((score) => {
      return `<tr><td>${score.name}</td><td>${score.userScore}</td><tr>`;
    })
    .join("");

  localStorage.setItem("names", JSON.stringify(oldName));
  const newScore = JSON.parse(localStorage.getItem("names"));
//   console.log(oldName);
}

//var used to make timer element did not use const because time needs to change value and i think const cannot change value


var timeEl = document.querySelector(".time");
var secondsLeft = 20;

//used let shuffled and current question index to give them changing values
let shuffled, CurrentQuestionIndex;
//evenlistner click start game so when start button is clicked startGame function and next button when you click next it increments CurrentQuestionINdex by one and calls the setnextquestion function
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  CurrentQuestionIndex++;
  setNextQuestion();
});
//use hide() method to hide selected elements and the elements will no longer afect the layout of the page
//arrary used to store all questions choices and answers.
// function start games first calls the set time function to set the time. then hides the start button and title(basically the prompt i wrote) it then assignes shuffles to sort through the questions and used math.random to make the interval go up by.5 so that it will be even and odd. current question index is asssinged a value of zero. the container containing all the question related elements are unhidden and lastly runs the function set next question
function startGame() {
  secondsLeft = 20;
  userScore = 0;
  // console.log(secondsLeft)
  setTime();
  startButton.classList.add("hide");
  title.classList.add("hide");
  shuffled = questions.sort(() => Math.random() - 0.5);
  CurrentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  timeEl.style.display = "";
  score.classList.remove("hide");
  setNextQuestion();
}



// set time currently has timerinterval to equal setinterval and decrememnets seconds by 1 and to show this to the user i used timeel.textcontent  to equal a string "time left" and secondsleft (timeel and seconds left are both var timeel is used to select the class time using quaryselector). i then made an if statment to end the game still a work in progress if secondsleft reaches 0 clear interval(imterinterval) and hide question container and show start and title elements also added time el = seconds left so it doesnt interfere with the visuals
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.innerHTML = "Time Left:" + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      questionContainerElement.classList.add("hide");
      HighScoresTitle.classList.remove("hide");
      saveButton.classList.remove("hide");
      nameOfUser.classList.remove("hide");
      nextButton.classList.add("hide");
      document.createElement("Homepage");
      scores.classList.remove("hide");
      highScoreTable.classList.remove("hide");
      saveButton.style.display = "";
      nameOfUser.style.display = "";
      done.classList.remove("hide");
      timeEl.style.display = "none";
    }
  }, 1000);
}

console.log(userScore);

//set next question function basically calls reset state function and show next question function while using the variables to choose a random question

function setNextQuestion() {
  resetState();
  showQuestion(shuffled[CurrentQuestionIndex]);
}

//showquestion function shows the object q in the questions array it then says questionel.innertext = q.q so it can grab the question from the array. q.choices.for each says to create a button and inside will be the answerhcoice. using button.classlist.add to add to the btn classes. and if answer is correct and adds it with dataset. and added a eventlistner to work when clicked select choice function is run and button is appended to answerbtnel
function showQuestion(q) {
  questionsEl.innerText = q.q;
  q.choices.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectChoice);
    answerBtnEl.appendChild(button);
  });
}

//function reset state, clears document when called and it will hide next button. and while answer buttonel is the first child then remove child. because answer button is first child means its still in question mode
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}

// selection choice function with the paramenter being an element  made a const for selected button and correct setstatusclass as correct if it is correct makes an arrray and adds them to answerbtnel for each button setstatusclass makes the actual choice populate. if there is still a question left after clicking then you can click next and vice versa

const score = document.getElementById("score");
function selectChoice(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    userScore += 1;
    console.log(userScore);
    score.textContent = "Score: " + userScore;
  } else {
    userScore -= 1;
    console.log(userScore);
    score.textContent = "Score: " + userScore;
    secondsLeft -= 3;
  }
  setStatusClass(document.body, correct);
  Array.from(answerBtnEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffled.length > CurrentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    questionContainerElement.classList.add("hide");
      HighScoresTitle.classList.remove("hide");
      saveButton.classList.remove("hide");
      nameOfUser.classList.remove("hide");
      nextButton.classList.add("hide");
      document.createElement("Homepage");
      scores.classList.remove("hide");
      highScoreTable.classList.remove("hide");
      saveButton.style.display = "";
      nameOfUser.style.display = "";
      timeEl.style.display = "none";
      done.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}



//const is used to store all questions and choices and whether or not each one is correct using booleans. Used an array that holds objects and inside the object is the question and choices with an array that holds the text and correct or incorrect using true false.
const questions = [
  {
    q: "Commonly used data types DO NOT include:",
    choices: [
      { text: "Strings", correct: false },
      { text: "Booleans", correct: false },
      { text: "Alerts", correct: true },
      { text: "numbers", correct: false },
    ],
    // a: "Alerts",
  },
  {
    q: "The condition in an if/else statement is enclosed within ___",
    choices: [
      { text: "Quotes", correct: false },
      { text: "Curly brackets", correct: false },
      { text: "Parenthesis", correct: true },
      { text: "square brackets", correct: false },
    ],
    //a: "Parenthesis",
  },
  {
    q: "String values must be enclosed within___ when being assigned to variables.",
    choices: [
      { text: "Commas", correct: false },
      { text: "Curly brackets", correct: false },
      { text: "Quotes", correct: true },
      { text: "Parentheses", correct: false },
    ],
    // a: "Quotes",
  },
  {
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
      { text: "Javascript", correct: false },
      { text: "terminal/bash", correct: false },
      { text: "For loops", correct: true },
      { text: "Console.log", correct: false },
    ],
    // a: "Console.log",
  },
];

