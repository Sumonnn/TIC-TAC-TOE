function scroll() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".page1",
            // scroller:"body",
            // markers: true,
            start: "50% 50%",
            end: "80% 50%",
            pin: true,
            scrub: 2,
        }
    })
    tl
        .to(".page1-top", {
            top: "-50%",

        }, 'a')

        .to(".page1-bottom", {
            bottom: "-50%",

        }, 'a')
        .to(".center", {
            top: "0",
        }, 'a')
        .to(".page1-top-h", {
            bottom: "-70%",
        }, 'a')
        .to(".page1-bottom-h", {
            top: "-70%",
        }, 'a')


}
scroll();

let gamecell = document.querySelectorAll(".cell");
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let restartbtn = document.querySelector("button");
let alertBox = document.querySelector(".alertBox");

//Making Variables

let currentPlayer = 'X';
let nextPlayer = 'O';
let PlayerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;

//Function to Start Your Game
const startGame = () => {
    gamecell.forEach((cell) => {
        cell.addEventListener("click", handleClick);
    });
}


//Function to handle Click
const handleClick = (e) => {
    if (e.target.textContent === "") {
        e.target.textContent = PlayerTurn;
        if (checkWin()) {
            // console.log(`${PlayerTurn} is a winner!`);
            showalert(`${PlayerTurn} is a winner!`);
            disableCells();
        }
        else if (checkTie()) {
            // console.log("It's a Tie");
            showalert("It's a Tie");
            disableCells();
        }
        else {
            ChangePlayerTurn();
            showalert(`Turn for player: ${PlayerTurn}`)
        }
    }
}

// Function to change player's turn
const ChangePlayerTurn = () => {
    if (PlayerTurn === currentPlayer) {
        PlayerTurn = nextPlayer;
    }
    else {
        PlayerTurn = currentPlayer;
    }
}


//Function to check Win
const checkWin = () => {
    const winningConditions =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];

        if (gamecell[pos1].textContent !== "" &&
            gamecell[pos1].textContent === gamecell[pos2].textContent &&
            gamecell[pos2].textContent === gamecell[pos3].textContent) {

            return true;
        }
    }
    return false;
}

// Function to check for a Tie

const checkTie = () => {
    let emptyCellCount = 0;
    gamecell.forEach((cell) => {
        if (cell.textContent === '') {
            emptyCellCount++;
        }
    });

    return emptyCellCount === 0 && !checkWin();
}

//Function to disable game-board cells after a win a tie
const disableCells = () => {
    gamecell.forEach((cell) => {
        cell.removeEventListener("click", handleClick)
        cell.classList.add('disabled');
    });
}

//Function to restart game
const restartGame = () => {
    gamecell.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
}

//Function to show alert 
const showalert = (msg) => {
    alertBox.style.display = 'block';
    alertBox.textContent = msg;
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000)
}


//Restart game
restartbtn.addEventListener("click", restartGame);

//call to start game
startGame();