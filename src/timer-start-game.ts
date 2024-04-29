import * as gameManager from "./game-manager.ts";
import { appStateSP } from "./state.ts";

export function startGame() {
  //SCREEN MESSAGE ELEMENT
  let screenMessage = document.querySelector(".screen-message-text") as HTMLElement;
  screenMessage.textContent = "";
  //MARKER
  const marker = document.querySelector(".marker") as HTMLElement;
  //CLEAR MARKER FOR UPDATING
  marker.innerHTML = "";
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
  //START GAME MANAGER
  gameManager.instantiateCards();
  //gameManager.updateScore();
}

export function startTimer() {
  //SCREEN MESSAGE ELEMENT
  let screenMessage = document.querySelector(".screen-message-text") as HTMLElement;
  screenMessage.textContent = "¡Comienza la partida!";

  if (screenMessage) {
    //HIDE CARDS FOR A BRIEF TIME
    const computerChoice = document.querySelector(".player-up-choice") as HTMLElement;
    computerChoice.style.visibility = "hidden";
    //SHOW TITLE FOR 1 SECOND, AND START TIMER
    setTimeout(() => {
      startGame(); //CALL STARTGAME
    }, 2000);
  }
}
