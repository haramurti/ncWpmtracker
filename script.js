let randomText = [];
const arrayOfWord = [
  "sapu",
  "meja",
  "kursi",
  "pintu",
  "jendela",
  "buku",
  "pena",
  "kertas",
  "sepatu",
  "tas",
  "gelas",
  "piring",
  "sendok",
  "garpu",
  "lampu",
  "bantal",
  "kasur",
  "lemari",
  "televisi",
  "kulkas",
];

const text = document.querySelector(".text");
const inputField = document.getElementById("user-input");
const calculateButton = document.getElementById("calculate");
const resultField = document.querySelector(".result");

let startTime;
let hasStartedTyping = false;

for (let i = 0; i < 8; i++) {
  let index = Math.floor(Math.random() * 20);
  randomText.push(arrayOfWord[index]);
  arrayOfWord.splice(index, 1);
}

text.textContent += randomText.join(" ");

inputField.addEventListener("input", () => {
  if (!hasStartedTyping) {
    startTime = new Date().getTime();
    hasStartedTyping = true;
  }
});

function calculate() {
  const endTime = new Date().getTime();
  const userInput = inputField.value;

  const timeSpentInMinutes = (endTime - startTime) / 60000;
  const wpm = userInput.length / 5 / timeSpentInMinutes;

  checkError(userInput, wpm);
}

calculateButton.addEventListener("click", calculate);
inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") calculate();
});

function checkError(userInput, wpm) {
  const arrayOfUserInput = userInput.split(" ");

  let correct = [];
  let wrong = [];

  for (let i = 0; i < arrayOfUserInput.length; i++) {
    if (arrayOfUserInput[i] === randomText[i]) {
      correct.push(arrayOfUserInput[i]);
    } else {
      wrong.push(arrayOfUserInput[i]);
      arrayOfUserInput[i];
    }
  }

  const errorRate = wrong.length / 5;
  const trueWpm = wpm - errorRate;

  resultField.textContent = `Your speed is ${trueWpm.toFixed(2)} WPM`;
  console.log(`${(correct.length / wrong.length) * 100}%`);
}
