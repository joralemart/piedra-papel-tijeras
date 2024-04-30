//SINGLEPLAYER---------------------------------------------------------------
const player1StorageScore =
  localStorage.getItem("player1Score") != null ? Number(localStorage.getItem("player1Score")) : 0;
const computerStorageScore =
  localStorage.getItem("computerScore") != null ? Number(localStorage.getItem("computerScore")) : 0;
export const appStateSP = {
  data: {
    eventsAdded: false,
    isSinglePlayer: null,
    screenMessage: "",
    players: { player1Name: "Jugador", player2Name: "Computer" },
    userTurn: false,
    scores: {
      player1Score: player1StorageScore,
      player2Score: computerStorageScore,
    },
    moves: {
      player1Move: "",
      player2Move: "",
    },

    checkScore(moves: { player1Move: string; player2Move: string }) {
      //WIN COMPUTER
      if (moves.player1Move == "piedra" && moves.player2Move == "papel") {
        this.scores.player2Score! += 1;
        this.screenMessage = "Computadora gana";
      } else if (moves.player1Move == "papel" && moves.player2Move == "tijeras") {
        this.scores.player2Score! += 1;
        this.screenMessage = "Computadora gana";
      } else if (moves.player1Move == "tijeras" && moves.player2Move == "piedra") {
        this.scores.player2Score! += 1;
        this.screenMessage = "Computadora gana";
      }
      //WIN USER
      else if (moves.player1Move == "papel" && moves.player2Move == "piedra") {
        this.scores.player1Score! += 1;
        this.screenMessage = "¡GANASTE!";
      } else if (moves.player1Move == "tijeras" && moves.player2Move == "papel") {
        this.scores.player1Score! += 1;
        this.screenMessage = "¡GANASTE!";
      } else if (moves.player1Move == "piedra" && moves.player2Move == "tijeras") {
        this.scores.player1Score! += 1;
        this.screenMessage = "¡GANASTE!";
      }
      //TIE
      else if (moves.player1Move == "papel" && moves.player2Move == "papel") {
        this.screenMessage = "Empate";
      } else if (moves.player1Move == "tijeras" && moves.player2Move == "tijeras") {
        this.screenMessage = "Empate";
      } else if (moves.player1Move == "piedra" && moves.player2Move == "piedra") {
        this.screenMessage = "Empate";
      }

      //HANDLE ERROR
      else {
        console.log("COULD NOT HANDLE TURN RESULT");
      }
    },

    checkWinner() {
      //PLAYER 1 WON
      let winningPlayer = "";
      if (this.scores.player1Score == 3) {
        this.screenMessage = `${"¡Ganó " + this.players.player1Name} + "!"`;
        winningPlayer = this.players.player1Name;
      }
      //PLAYER 2 WON
      else if (this.scores.player2Score == 3) {
        this.screenMessage = `${"¡Ganó " + this.players.player2Name} + "!"`;
        winningPlayer = this.players.player2Name;
      }
      //NONE
      else {
        winningPlayer = "";
      }

      return winningPlayer;
    },
  },

  get getWinner() {
    return this.data.checkWinner;
  },

  makeMove(move: string, player: string) {
    if (player == "computer") {
      this.data.moves.player2Move = move;
    }
    if (player == "player1") {
      this.data.moves.player1Move = move;
    }
  },
};

//MULTIPLAYER---------------------------------------------------------------
export const appStateMP = {
  data: {
    gameHasStarted: false,
    isSinglePlayer: null,
    screenMessage: "",
    players: { player1Name: "", player2Name: "" },
    scores: {
      player1Score: 0,
      player2Score: 0,
    },
    moves: {
      player1Move: "",
      player2Move: "",
    },
    checkScore(moves: { player1Move: string; player2Move: string }) {
      //WIN P1
      if (moves.player1Move == "piedra" && moves.player2Move == "papel") {
        this.scores.player2Score++;
      } else if (moves.player1Move == "papel" && moves.player2Move == "tijeras") {
        this.scores.player2Score++;
      } else if (moves.player1Move == "tijeras" && moves.player2Move == "piedra") {
        this.scores.player2Score++;
      }
      //WIN P2
      else if (moves.player1Move == "papel" && moves.player2Move == "piedra") {
        this.scores.player1Score++;
      } else if (moves.player1Move == "tijeras" && moves.player2Move == "papel") {
        this.scores.player1Score++;
      } else if (moves.player1Move == "piedra" && moves.player2Move == "tijeras") {
        this.scores.player1Score++;
      }
      //TIE
      else if (moves.player1Move == "papel" && moves.player2Move == "papel") {
        this.screenMessage = "Empate";
      } else if (moves.player1Move == "tijeras" && moves.player2Move == "tijeras") {
        this.screenMessage = "Empate";
      } else if (moves.player1Move == "piedra" && moves.player2Move == "piedra") {
        this.screenMessage = "Empate";
      }

      //HANDLE ERROR
      else {
        console.log("COULD NOT HANDLE TURN RESULT");
      }
    },

    checkWinner() {
      //PLAYER 1 WON
      let winningPlayer = "";
      if (this.scores.player1Score == 3) {
        this.screenMessage = `${"¡Ganó " + this.players.player1Name} + "!"`;
        winningPlayer = this.players.player1Name;
      }
      //PLAYER 2 WON
      else if (this.scores.player2Score == 3) {
        this.screenMessage = `${"¡Ganó " + this.players.player2Name} + "!"`;
        winningPlayer = this.players.player2Name;
      }

      return winningPlayer;
    },
  },

  get getWinner() {
    return this.data.checkWinner;
  },

  set setMove(move: string) {
    if (move == "piedra") {
    }
  },
};
