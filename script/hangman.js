window.onload = reset;

// Create an array for letters to guess from
const ALPHABET = Array.from("abcdefghijklmnopqrstuvwxyz");

// Words for guessing
const CATEGORIES = [
  { name: "Mountains", words: ["teton", "ski", "meadow", "snowmobile", "skijoring", "fishing"] },
  { name: "Airport", words: ["airplane", "fly", "terminal", "luggage"] },
  { name: "Food", words: ["waffles", "eggs", "steak", "snacks", "mangoes"] },
];

let guessedLetters = [];
let incorrectGuesses = 0;
let hint = "";
let word = "";

// Start/reset the game
function reset() {
  guessedLetters = [];
  incorrectGuesses = 0;
  const { hint: newHint, word: newWord } = getRandomWordAndCategory();
  hint = newHint;
  word = newWord;

    // Hide all images in imgDiv
    for (let i = 1; i <= 6; i++) {
      document.getElementById("img" + i).style.display = "none";
    }
    
  console.log(`Hint: ${hint}`);
  console.log(`Word: ${word}`);
  updateWordDisplay();
  updateAlphabetDisplay();
}

// Using Math.random pick a random category for the hint, and then pick a random word
function getRandomWordAndCategory() {
  const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const randomWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
  return { hint: randomCategory.name, word: randomWord };
}

//Handle Clicks
function handleLetter(letter) {
   // Check if the game has ended
   if (incorrectGuesses === 6) {
    document.getElementById("message").innerText = isWordGuessed();
    return;
  }
  guessedLetters.push(letter);
  if (!word.includes(letter)) {
    incorrectGuesses++;
    document.getElementById("img" + incorrectGuesses).style.display = "block";
  }
  updateWordDisplay();
  updateAlphabetDisplay();
  document.getElementById("message").innerText = isWordGuessed();
}

// Update alphabet to only include letters that haven't been guessed
function updateAlphabetDisplay() {
  const alphabetContainer = document.getElementById("alphabet");
  alphabetContainer.innerHTML = "";

  ALPHABET.forEach(letter => {
    const letterContainer = document.createElement("div");
    if (!guessedLetters.includes(letter)) {
      letterContainer.innerText = letter.toUpperCase();
      letterContainer.addEventListener("click", () => handleLetter(letter));
    } else {
      letterContainer.innerText = " ";
    }
    alphabetContainer.appendChild(letterContainer);
  });
}

function updateWordDisplay() {
  const wordContainer = document.getElementById("word");
  wordContainer.innerHTML = "";
  Array.from(word).forEach(letter => {
    const letterContainer = document.createElement("div");
    letterContainer.innerText = (guessedLetters.includes(letter) ? letter : "_").toUpperCase();
    letterContainer.classList.add("letter");
    wordContainer.appendChild(letterContainer);
  });
}

// Checks for win/lose
function isWordGuessed() {
  const allLettersGuessed = Array.from(word).every(letter => guessedLetters.includes(letter));
  let message = "";

  if (allLettersGuessed) {
    message = "Congratulations! You Won!";
  } else if (!allLettersGuessed && incorrectGuesses === 6) {
    message = "Sorry! You Lose";
  }

  return message;
}

// Hint Button
function giveHint() {
  const hintButton = document.getElementById("hint");
  hintButton.classList.add("used");
  hintButton.innerText = `${hint}`;
}
document.getElementById("hint").addEventListener("click", function () {
  giveHint(hint);
});

// Reset Button
document.getElementById("reset").addEventListener("click", reset);
