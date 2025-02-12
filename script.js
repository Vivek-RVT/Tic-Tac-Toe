const res = document.querySelector(".results");
const boxs = document.querySelectorAll('.b');
let turn = "circle";
let board = [[null, null, null], [null, null, null], [null, null, null]];

// Click event for dynamically created "Play Again" button
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
        console.log("Play Again Clicked");

        res.style.display = "none"; // Hide results box
        let boardContainer = document.querySelector('.tb-cont');
        boardContainer.classList.remove("disabled");
        // Reset board state
        board = [[null, null, null], [null, null, null], [null, null, null]];
        turn = "circle"; // Reset turn
        let cont_border = document.querySelector('.circle-score-cont');
        cont_border.style.border ="3px solid rgb(255, 255, 255)";
        // Clear the board UI
        boxs.forEach(box => {
            box.innerHTML = "";
            box.classList.remove("done", "circle", "cross"); // Remove previous game classes
        });
    }
});

function click_box() {
    boxs.forEach((e, index) => {
        e.textContent = '';

        e.addEventListener("click", () => {
            let row = Math.floor(index / 3);
            let coloums = index % 3;

            if (turn == "circle" && !e.classList.contains("done")) {
                let cont_border = document.querySelector('.circle-score-cont');
                let cros_border = document.querySelector('.cross_cont');
                cros_border.style.border ="1px solid rgb(255, 255, 255)";
                cont_border.style.border ="3px solid rgb(255, 255, 255)";
                let img = document.createElement('img');
                img.src = 'cicle.svg';
                e.classList.add("done", "circle");
                board[row][coloums] = 'circle';
                e.style.userSelect = "none";
                turn = "cross";
                img.classList.add("img_cross", "img1");
                e.prepend(img);
            }
            else if (turn == "cross" && !e.classList.contains("done")) {
                let cros_border = document.querySelector('.cross_cont');
                let cont_border = document.querySelector('.circle-score-cont');
                cont_border.style.border ="1px solid rgb(255, 255, 255)";

                cros_border.style.border ="3px solid rgb(255, 255, 255)";
                
                let img1 = document.createElement('img');
                board[row][coloums] = 'cross';
                e.classList.add("done", "cross");
                img1.src = 'cross.svg';
                e.style.userSelect = "none";
                turn = "circle";
                img1.classList.add("img_circle", "img1");
                e.prepend(img1);
            }

            let winner = checkWinner(board);
            if (winner) {
                showResult(`${winner} wins!`);
            }
            else if (board.flat().every(cell => cell !== null)) {
                showResult("Draw");
            }

        });
    });
}

let cir = 0;
let cro = 0;
let rou = 1;  // Start at 1 because it's Round 1

function showResult(message) {
    let boardContainer = document.querySelector('.tb-cont'); 
    // Select elements INSIDE the function to ensure they're always updated
    let cir_score = document.querySelector('.score-c');
    let cro_score = document.querySelector('.score-cross');
    let round = document.querySelector('.round');
// let res_cont = document.querySelector('.');
boardContainer.classList.add("disabled");
    res.innerHTML = ` 
        <p class="re">${message}</p>
        <button class="btn">Play Again</button>`;
    res.style.display = "flex"; 

    if (message === "circle wins!") {
        cir++;  // Increment first
        cir_score.textContent = cir;
    }
    else if (message === "cross wins!") {
        cro++;
        cro_score.textContent = cro;
    }

    if (message !== "Draw wins!") {
        rou++;
        round.textContent = `Round ${rou}`;
    }
}

// Check winner function
function checkWinner(board) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }
    for (let j = 0; j < 3; j++) {
        if (board[0][j] && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return board[0][j];
        }
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }
    return null;
}

click_box();
