const main = document.getElementById("mainContain");

const mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";

const colors = ["red", "blue", "green", "yellow"];

const sounds = {
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};

colors.forEach((color) => {
    const button = document.createElement("button");
    button.id = color;
    button.className = "colorButton";
    mainDiv.appendChild(button);
});

const startButton = document.createElement("button");
startButton.id = "startButton";
startButton.textContent = "Start Game";

main.appendChild(mainDiv);
main.appendChild(startButton);

let sequence = [];
let playerSequence = [];
let level = 0;
let levelCount = 0;

const score = document.createElement("p");

main.appendChild(score);

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    nextLevel();
}

// Generate the next sequence
function nextLevel() {
    level++;
    levelCount++;
    // level1.innerHTML = level;
    playerSequence = [];
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    shuffleColors(sequence);
    playSequence();
    console.log("Level Count: " + levelCount);
    console.log(`sequence: ${sequence}`);
    score.innerText = `Your level ${levelCount}`;
}

function shuffleColors(colors) {
    console.log("Before shuffle:", colors);
    for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    console.log("After shuffle:", colors);
}

function playSound(color) {
    if (sounds[color]) {
        sounds[color].currentTime = 0; // Reset playback for consecutive presses
        sounds[color].play();
    }
}

// Play the current sequence
function playSequence() {
    sequence.forEach((color, index) => {
        setTimeout(() => {
            flashColor(color);
        }, (index + 1) * 1000);
    });
}

// Flash the color on the screen
function flashColor(color) {
    const button = document.getElementById(color);
    playSound(color);
    button.style.animation = `ajillah${colors.indexOf(color) + 1} 0.5s linear`;
    setTimeout(() => {
        button.style.animation = "none";
    }, 500);
}

// Handle player input
function handlePlayerInput(color) {
    playerSequence.push(color);
    flashColor(color);
    checkPlayerInput();

    console.log("this is player sequence", playerSequence);
    console.log("this is sequence", sequence);
}

// Check if the player's input is correct
function checkPlayerInput() {
    const currentIndex = playerSequence.length - 1;

    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        alert("gave over");
        startGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        setTimeout(nextLevel, 500);
    }
}

// function
document.querySelectorAll(".colorButton").forEach((button) => {
    button.addEventListener("click", () => {
        handlePlayerInput(button.id);
    });
});

startButton.addEventListener("click", startGame);
