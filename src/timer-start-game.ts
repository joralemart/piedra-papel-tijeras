import * as gameManager from "./game-manager.ts";
import { appStateSP } from "./state.ts";

export function startGame() {
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

function timerTicks(n: number, timer: HTMLElement) {
  let tick = setInterval(() => {
    console.log("RUNNING TIMER");
    //CLEAR TEXT CONTENT IF TIMER IS -1
    if (timer.textContent == "1") {
      timer.style.visibility = "hidden";
      //START GAME
      startGame(); //CALL startGame()
    }
    //CHECK START TITLE AND SET VALUE TO INITIAL NUMBER
    if (timer.textContent == "¡Comienza el juego!") {
      timer.textContent = n.toString();
    }
    //DECREASE BY 1 IF NOT TITLE
    else if (timer.textContent != "¡Comienza el juego!") {
      let numberType = Number(timer.textContent);
      numberType -= 1;
      timer.textContent = numberType.toString();
    }
    //STOP TIMER
    if (timer.textContent == "0") {
      clearInterval(tick);
    }
  }, 1000);
}

export function startTimer() {
  //SCREEN MESSAGE ELEMENT
  let timer = document.querySelector(".screen-message-text") as HTMLElement;

  if (timer) {
    //SHOW TITLE FOR 1 SECOND, AND START TIMER
    setTimeout(() => {
      timerTicks(3, timer); //CALL startTimer()
    }, 500);
  }
}
