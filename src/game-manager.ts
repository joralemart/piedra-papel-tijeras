import { appStateSP } from "./state.ts";
import { startTimer } from "./timer-start-game.ts";

export function updateScore() {
  //CHECKSCORE
  appStateSP.data.checkScore(appStateSP.data.moves);
  //MARKER
  const marker = document.querySelector(".marker") as HTMLElement;
  if (marker) {
    //CLEAR MARKER FOR UPDATING
    marker.innerHTML = "";

    //NEW SCORE
    marker.innerHTML = `
    ${
      appStateSP.data.players.player1Name +
      " : " +
      appStateSP.data.scores.player1Score.toString() +
      "<br>" +
      appStateSP.data.players.player2Name +
      " : " +
      appStateSP.data.scores.player2Score.toString()
    }
    `;
  }

  console.log(appStateSP.data.scores.player1Score, appStateSP.data.scores.player2Score);

  //SAVE SCORE IN LOCAL STORAGE
  localStorage.setItem("player1Score", appStateSP.data.scores.player1Score.toString());
  localStorage.setItem("computerScore", appStateSP.data.scores.player2Score.toString());

  //RELOAD GAME
  setTimeout(() => {
    //RESTART GAME
    startTimer();
  }, 2000);
}

function handleComputerTurn() {
  console.log("COMPUTER TURN");

  //HANDLE COMPUTER CHOICE
  const randomNumber = Math.random() * 10;
  let choice = "";
  if (randomNumber < 3.33) {
    choice = "piedra";
  }
  if (randomNumber > 3.33 && randomNumber < 6.66) {
    choice = "papel";
  }
  if (randomNumber > 6.66) {
    choice = "tijeras";
  }

  //SET COMPUTER CARD STYLE
  const computerChoice = document.querySelector(".player-up-choice") as HTMLElement;
  if (computerChoice) {
    computerChoice.style.backgroundColor = "white";
    computerChoice.style.width = "50px";
    computerChoice.style.height = "50px";
    computerChoice.style.backgroundColor = "white";
    computerChoice.style.borderRadius = "20px";
    computerChoice.style.boxShadow = "0px 0px 20px #000";
    computerChoice.style.backgroundSize = "cover";
    computerChoice.style.backgroundImage = "url('./src/images/loading.png')";
    computerChoice.style.padding = "10px";
    computerChoice.style.visibility = "visible";

    //SHOW CHOICE
    setTimeout(() => {
      computerChoice.style.backgroundImage = `url('./src/images/${choice}.png')`;
      //SET CHOICE
      appStateSP.makeMove(`${choice}`, "computer");
      //UPDATE SCORE
      updateScore();
      //SHOW WINNER MESSAGE
      const screenMessage = document.querySelector(".screen-message-text");
      if (screenMessage) {
        screenMessage.textContent = appStateSP.data.screenMessage;
        console.log(screenMessage.textContent);
      }
    }, 2000);
  }
}

//END USER TURN
function endTurn() {
  console.log("USERS TURN FINISHED");

  //SCREEN MESSAGE ELEMENT
  const message = document.querySelector(".screen-message-text") as HTMLElement;
  const options = document.getElementById("options");
  if (options) {
    options.style.pointerEvents = "none";
    options.style.opacity = "60%";
    message.style.visibility = "visible";
    message.textContent = "Computadora jugando...";
    handleComputerTurn();
  }
}

//INSTANTIATE CARDS
export function instantiateCards() {
  console.log("INSTANTIATE CARDS");

  //ENABLE OPTIONS
  const userOptions = document.getElementById("options");
  userOptions!.style.opacity = "100%";
  if (userOptions) {
    userOptions.style.pointerEvents = "auto";
  }
  //GET OPTIONS
  const options = [
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3"),
  ];

  //START USER TURN
  appStateSP.data.userTurn = true;

  //ITERATE OPTIONS
  for (const op of options) {
    if (op) {
      //ASSIGN BACKGROUND IMAGE
      switch (op.id) {
        case "option1":
          op.style.backgroundImage = "url('./src/images/piedra.png')";
          op.style.cursor = "pointer";
          break;
        case "option2":
          op.style.backgroundImage = "url('./src/images/papel.png')";
          op.style.cursor = "pointer";
          break;
        case "option3":
          op.style.backgroundImage = "url('./src/images/tijeras.png')";
          op.style.cursor = "pointer";
      }
      //STYLE
      op.style.backgroundSize = "cover";
      op.style.width = "50px";
      op.style.height = "50px";
      op.style.backgroundColor = "white";
      op.style.margin = "20px";
      op.style.borderRadius = "20px";
      op.style.boxShadow = "0px 0px 20px #000";

      //HANDLE CHOICE
      if (!appStateSP.data.eventsAdded) {
        op.addEventListener("click", () => {
          console.log("EVENTS ADDED");
          appStateSP.data.eventsAdded = true;

          switch (op.id) {
            case "option1":
              op.style.boxShadow = "0px 0px 20px #9ff";
              appStateSP.makeMove("piedra", "player1");
              endTurn();
              break;
            case "option2":
              op.style.boxShadow = "0px 0px 20px #9ff";
              appStateSP.makeMove("papel", "player1");
              endTurn();
              break;
            case "option3":
              op.style.boxShadow = "0px 0px 20px #9ff";
              appStateSP.makeMove("tijeras", "player1");
              endTurn();
              break;
          }
        });
      }
    }
  }

  //OPTIONS CONTAINER
  const optionsContainer = document.getElementById("options");
  if (optionsContainer) {
    optionsContainer.style.display = "flex";
    optionsContainer.style.justifyContent = "space-evenly";
    optionsContainer.style.paddingTop = "32vh";
  }
}
