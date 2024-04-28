import { appStateSP } from "./state.ts";
import "./style.css";
import { startTimer } from "./timer-start-game.ts";

//HANDLE ROUTE
function handleRoute(route: string) {
  //CLEAR BODY
  document.body.innerHTML = "";

  //ACTION FOR EACH ROUTE
  if (route == "/") {
    const homePage = document.createElement("div");
    homePage.innerHTML = `
    <div id="home-page">
      <h1 class="hometitle">Piedra, papel o tijeras</h1>
      <div class="home-buttons">
        <button id="home-play-single-player-button" class="button" style="cursor:pointer;">UN JUGADOR</button>
        <button id="home-play-multi-player-button" class="button" style="cursor:pointer;">2 JUGADORES (En desarrollo)</button>
      </div>
    </div>
    `;
    document.body.append(homePage);
    homePageHandler();
  }

  //SINGLE PLAYER
  else if (route == "/single-player") {
    const singlePlayer = document.createElement("div");
    singlePlayer.className = "playmap";
    singlePlayer.innerHTML = `
    <div>
        <h1 class="marker"></h1>
      <div class="player-up">
      <div class="player-up-choice"></div>
      </div>
      <div class="screen-message">
      <h1 class="screen-message-text">¡Comienza el juego!</h1>
      </div>
      <div class="player-down">
        <div id="options">
          <div id="option1" class="option">
          </div>
          <div id="option2" class="option">
          </div>
          <div id="option3" class="option">
        </div>
      </div>
      </div>
    </div>
    `;
    document.body.append(singlePlayer);

    //SET MARKER
    const marker = document.querySelector(".marker") as HTMLElement;
    marker.style.position = "absolute";
    marker.style.paddingLeft = "20px";
    marker.style.textAlign = "start";

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

    //START GAME
    startTimer();
  }
}

//GO TO PATH AND CALL HANDLEROUTE
function goTo(path: string) {
  history.pushState({}, "", path);
  handleRoute(path);
}

//HOME PAGE BUTTONS BEHAVIOR
function homePageHandler() {
  //GET BUTTONS
  const singlePlayerButton = document.getElementById("home-play-single-player-button");
  //const multiPlayerButton = document.getElementById("home-play-multi-player-button");

  //BUTTONS EVENTS
  singlePlayerButton?.addEventListener("click", () => goTo("/single-player"));

  //MULTIPLAYER IS STILL IN DEVELOPMENT
  //multiPlayerButton?.addEventListener("click", () => goTo("/multi-player"));
}

function main() {
  //HANDLE CURRENT PATH ON PAGE LOAD
  window.addEventListener("load", () => {
    handleRoute(location.pathname);
  });

  //RELOAD PAGE WHEN BACK OR FORWARD BUTTON IS PRESSED
  window.addEventListener("popstate", () => {
    location.reload();
  });
}

main();
