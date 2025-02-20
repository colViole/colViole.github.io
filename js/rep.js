const questions = [
  {
    question: "A wizard brews 7 potions per day. How many potions does he brew in 8 days?",
    correctAnswer: 56,
    options: [56, 49, 64, 72]
  },
  {
    question: "A spellbook contains 12 pages of incantations per chapter. If there are 5 chapters, how many pages are there in total?",
    correctAnswer: 60,
    options: [60, 55, 72, 50]
  },
  {
    question: "A necromancer raises 9 skeletons per ritual. If he performs 6 rituals, how many skeletons does he summon?",
    correctAnswer: 54,
    options: [54, 45, 60, 48]
  },
  {
    question: "A witch brews 15 enchanted teas each night. How many teas does she brew in 4 nights?",
    correctAnswer: 60,
    options: [60, 55, 72, 65]
  },
  {
    question: "A sorcerer has 11 crystal orbs per shelf. If he has 7 shelves, how many orbs does he have in total?",
    correctAnswer: 77,
    options: [77, 66, 88, 99]
  },
  {
    question: "A magical forest grows 3 enchanted mushrooms per tree. If the forest has 25 trees, how many mushrooms are there?",
    correctAnswer: 75,
    options: [75, 60, 90, 100]
  },
  {
    question: "A dark mage casts 8 curses per day. How many curses does he cast in 9 days?",
    correctAnswer: 72,
    options: [72, 64, 80, 90]
  },
  {
    question: "A wizard's tower has 5 floors, and each floor contains 14 ancient scrolls. How many scrolls are in the tower?",
    correctAnswer: 70,
    options: [70, 60, 80, 75]
  },
  {
    question: "A spell requires 4 dragon scales per potion. If a wizard brews 10 potions, how many dragon scales does he use?",
    correctAnswer: 40,
    options: [40, 36, 50, 48]
  },
  {
    question: "A coven of witches has 6 cauldrons, and each cauldron can brew 18 potions. How many potions can they brew in total?",
    correctAnswer: 108,
    options: [108, 96, 120, 115]
  },
  {
    question: "A castle has 24 magical torches on each of its 5 floors. How many torches does it have in total?",
    correctAnswer: 120,
    options: [120, 100, 140, 130]
  },
  {
    question: "A wizard trains 7 apprentices per year. How many apprentices does he train in 12 years?",
    correctAnswer: 84,
    options: [84, 72, 96, 88]
  },
  {
    question: "A potion requires 9 fairy wings. If an alchemist makes 11 potions, how many wings does he use?",
    correctAnswer: 99,
    options: [99, 88, 110, 90]
  },
  {
    question: "A necromancer controls 13 ghosts per haunted house. If he owns 4 haunted houses, how many ghosts does he command?",
    correctAnswer: 52,
    options: [52, 48, 56, 60]
  },
  {
    question: "A knight's enchanted armor is reforged every 5 years. If he has had it for 35 years, how many times was it reforged?",
    correctAnswer: 7,
    options: [7, 6, 8, 9]
  },
  {
    question: "An elven enchanter weaves 6 magic runes into each robe. If she creates 20 robes, how many runes does she use?",
    correctAnswer: 120,
    options: [120, 100, 140, 110]
  },
  {
    question: "A dragon hoards 50 gold coins per cave. If it has 8 caves, how much gold does it have?",
    correctAnswer: 400,
    options: [400, 380, 420, 450]
  },
  {
    question: "A cursed mirror creates 3 reflections of every person who looks into it. If 21 people look into it, how many reflections appear?",
    correctAnswer: 63,
    options: [63, 54, 72, 66]
  },
  {
    question: "A magical tree produces 16 glowing fruits per season. How many fruits does it produce in 3 seasons?",
    correctAnswer: 48,
    options: [48, 42, 54, 50]
  },
  {
    question: "A warlock binds 14 demons in each of his spellbooks. If he owns 5 spellbooks, how many demons has he bound?",
    correctAnswer: 70,
    options: [70, 60, 80, 75]
  },
  {
    question: "A wizard's staff contains 7 embedded gemstones. If he has 9 staffs, how many gemstones are there in total?",
    correctAnswer: 63,
    options: [63, 56, 70, 72]
  },
  {
    question: "A witch's potion requires 3 drops of phoenix tears. If she makes 30 potions, how many drops does she use?",
    correctAnswer: 90,
    options: [90, 80, 100, 95]
  },
  {
    question: "A necromancer summons 19 skeletons each night. How many skeletons does he summon in 11 nights?",
    correctAnswer: 209,
    options: [209, 200, 220, 230]
  },
  {
    question: "A magician's hat produces 12 rabbits per performance. If he performs 7 times, how many rabbits does he pull out?",
    correctAnswer: 84,
    options: [84, 72, 96, 88]
  },
  {
    question: "A sorceress casts 5 spells per hour. How many spells does she cast in 15 hours?",
    correctAnswer: 75,
    options: [75, 60, 80, 90]
  },
  {
    question: "A magical well grants 8 wishes per day. How many wishes does it grant in 25 days?",
    correctAnswer: 200,
    options: [200, 180, 220, 250]
  },
  {
    question: "A coven brews 14 potions per full moon. If they have brewed for 10 full moons, how many potions have they made?",
    correctAnswer: 140,
    options: [140, 120, 160, 150]
  },
  {
    question: "A mystical library contains 6 bookshelves, and each shelf holds 45 spellbooks. How many spellbooks are there?",
    correctAnswer: 270,
    options: [270, 250, 300, 280]
  },
  {
    question: "A dragon breathes fire 9 times per battle. If it fights 12 battles, how many times has it breathed fire?",
    correctAnswer: 108,
    options: [108, 96, 120, 110]
  },
  {
    question: "A wizard brews 7 potions per day. How many potions does he brew in 8 days?",
    correctAnswer: 56,
    options: [56, 49, 64, 72]
  },
  {
    question: "A spellbook contains 12 pages of incantations per chapter. If there are 5 chapters, how many pages are there in total?",
    correctAnswer: 60,
    options: [60, 55, 72, 50]
  },
  {
    question: "A necromancer raises 9 skeletons per ritual. If he performs 6 rituals, how many skeletons does he summon?",
    correctAnswer: 54,
    options: [54, 45, 60, 48]
  },
  {
    question: "A witch brews 15 enchanted teas each night. How many teas does she brew in 4 nights?",
    correctAnswer: 60,
    options: [60, 55, 72, 65]
  },
  {
    question: "A sorcerer has 11 crystal orbs per shelf. If he has 7 shelves, how many orbs does he have in total?",
    correctAnswer: 77,
    options: [77, 66, 88, 99]
  },
  {
    question: "A magical forest grows 3 enchanted mushrooms per tree. If the forest has 25 trees, how many mushrooms are there?",
    correctAnswer: 75,
    options: [75, 60, 90, 100]
  },
  {
    question: "A dark mage casts 8 curses per day. How many curses does he cast in 9 days?",
    correctAnswer: 72,
    options: [72, 64, 80, 90]
  },
  {
    question: "A wizard's tower has 5 floors, and each floor contains 14 ancient scrolls. How many scrolls are in the tower?",
    correctAnswer: 70,
    options: [70, 60, 80, 75]
  },
  {
    question: "A spell requires 4 dragon scales per potion. If a wizard brews 10 potions, how many dragon scales does he use?",
    correctAnswer: 40,
    options: [40, 36, 50, 48]
  },
  {
    question: "A coven of witches has 6 cauldrons, and each cauldron can brew 18 potions. How many potions can they brew in total?",
    correctAnswer: 108,
    options: [108, 96, 120, 115]
  },
  {
    question: "A castle has 24 magical torches on each of its 5 floors. How many torches does it have in total?",
    correctAnswer: 120,
    options: [120, 100, 140, 130]
  },
  {
    question: "A wizard trains 7 apprentices per year. How many apprentices does he train in 12 years?",
    correctAnswer: 84,
    options: [84, 72, 96, 88]
  },
  {
    question: "A potion requires 9 fairy wings. If an alchemist makes 11 potions, how many wings does he use?",
    correctAnswer: 99,
    options: [99, 88, 110, 90]
  },
  {
    question: "A necromancer controls 13 ghosts per haunted house. If he owns 4 haunted houses, how many ghosts does he command?",
    correctAnswer: 52,
    options: [52, 48, 56, 60]
  },
  {
    question: "A knight's enchanted armor is reforged every 5 years. If he has had it for 35 years, how many times was it reforged?",
    correctAnswer: 7,
    options: [7, 6, 8, 9]
  },
  {
    question: "An elven enchanter weaves 6 magic runes into each robe. If she creates 20 robes, how many runes does she use?",
    correctAnswer: 120,
    options: [120, 100, 140, 110]
  },
  {
    question: "A dragon hoards 50 gold coins per cave. If it has 8 caves, how much gold does it have?",
    correctAnswer: 400,
    options: [400, 380, 420, 450]
  },
  {
    question: "A cursed mirror creates 3 reflections of every person who looks into it. If 21 people look into it, how many reflections appear?",
    correctAnswer: 63,
    options: [63, 54, 72, 66]
  },
  {
    question: "A magical tree produces 16 glowing fruits per season. How many fruits does it produce in 3 seasons?",
    correctAnswer: 48,
    options: [48, 42, 54, 50]
  },
  {
    question: "A warlock binds 14 demons in each of his spellbooks. If he owns 5 spellbooks, how many demons has he bound?",
    correctAnswer: 70,
    options: [70, 60, 80, 75]
  },
  {
    question: "A wizard's staff contains 7 embedded gemstones. If he has 9 staffs, how many gemstones are there in total?",
    correctAnswer: 63,
    options: [63, 56, 70, 72]
  },
  {
    question: "A witch's potion requires 3 drops of phoenix tears. If she makes 30 potions, how many drops does she use?",
    correctAnswer: 90,
    options: [90, 80, 100, 95]
  },
  {
    question: "A necromancer summons 19 skeletons each night. How many skeletons does he summon in 11 nights?",
    correctAnswer: 209,
    options: [209, 200, 220, 230]
  },
  {
    question: "A magician's hat produces 12 rabbits per performance. If he performs 7 times, how many rabbits does he pull out?",
    correctAnswer: 84,
    options: [84, 72, 96, 88]
  },
  {
    question: "A sorceress casts 5 spells per hour. How many spells does she cast in 15 hours?",
    correctAnswer: 75,
    options: [75, 60, 80, 90]
  },
  {
    question: "A magical well grants 8 wishes per day. How many wishes does it grant in 25 days?",
    correctAnswer: 200,
    options: [200, 180, 220, 250]
  },
  {
    question: "A coven brews 14 potions per full moon. If they have brewed for 10 full moons, how many potions have they made?",
    correctAnswer: 140,
    options: [140, 120, 160, 150]
  },
  {
    question: "A mystical library contains 6 bookshelves, and each shelf holds 45 spellbooks. How many spellbooks are there?",
    correctAnswer: 270,
    options: [270, 250, 300, 280]
  },
  {
    question: "A dragon breathes fire 9 times per battle. If it fights 12 battles, how many times has it breathed fire?",
    correctAnswer: 108,
    options: [108, 96, 120, 110]
  }
];

  let selectedQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  
  const questionElement = document.querySelector(".question");
  const questionContainer = document.querySelector(".questionContainer");
  const optionsElement = document.querySelector(".options");
  const timerElement = document.querySelector(".timer");
  const scoreElement = document.querySelector(".score");
  const book = document.querySelector(".book");
  const restart = document.querySelector(".resultContainer");

  function selectRandomQuestions() {
    let shuffled = [...questions].sort(() => Math.random() - 0.5);
    selectedQuestions = shuffled.slice(0, 20); 
  }

  function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
  
    // Shuffle questions and pick 20
    selectedQuestions = shuffleArray(questions).slice(0, 20);
  
    loadQuestion();
  }
  
  function loadQuestion() {
    clearTimeout(timer);
    if (currentQuestionIndex >= selectedQuestions.length) {
      return endQuiz();
    }
    
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    
    shuffleArray(currentQuestion.options).forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(option, currentQuestion.correctAnswer);
      optionsElement.appendChild(button);
    });
  
    let timeLeft = 30;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft}s`;

      if (timeLeft === 6) {
        timerElement.style.color = 'red';
      }
      
      if (timeLeft === 0) {
        clearInterval(timer);
        timerElement.style.color = 'aliceblue';
        nextQuestion();
      }
    }, 1000);
  }
  
  function checkAnswer(selected, correct) {
    clearInterval(timer);
    if (selected === correct) {
      score++;
    }
    nextQuestion();
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
  }
  
  function endQuiz() {
    let questionContainer = document.querySelector('.questionContainer');

    optionsElement.innerHTML = "";
    timerElement.textContent = "";
    questionElement.textContent = "";
  
    // Check for a perfect score
    if (score === selectedQuestions.length) {
      scoreElement.textContent = `Your Score: ${score}/${selectedQuestions.length} - You have succeeded the trial!`;
      book.style.display = 'none';
      restart.style.display = 'block';
      questionContainer.style.display = 'none';
    } else {
      scoreElement.textContent = `Your Score: ${score}/${selectedQuestions.length} - You have failed the trial.`;
      scoreElement.style.color = 'red';
      book.style.display = 'none';
      restart.style.display = 'block';
      questionContainer.style.display = 'none';
    }
  }
  
  
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  startQuiz();

document.querySelector(".restartQuiz").addEventListener("click", restartQuiz);

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.textContent = "";
    timerElement.style.color = 'aliceblue';
    restart.style.display = 'none';
    book.style.display = 'block';
    questionContainer.style.display = 'block';

    selectRandomQuestions()
    loadQuestion();
}
  
// Music

const audio = document.getElementById("bgMusic");
audio.volume = 0.05;

window.addEventListener("load", function () {
  const audio = document.getElementById("bgMusic");
});
