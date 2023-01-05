const game = {
  xTurn: true,
  xState: [],
  oState: [],
  scoreX: 0,
  scoreO: 0,

  winningState: [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};
const scoreWin = (winner) => {
  const scoreX = document.querySelector(".scoreX");
  const scoreO = document.querySelector(".scoreO");
  if (winner) {
    game.scoreX++;
    scoreX.textContent = `X:${game.scoreX}`;
  } else {
    game.scoreO++;
    scoreO.textContent = `O:${game.scoreO}`;
  }
};
document.addEventListener("click", (event) => {
  const target = event.target;
  console.log(target);

  if (
    target.classList.contains("grid-cell") &&
    !target.classList.contains("disabled")
  ) {
    const cellValue = target.dataset.value;
    game.xTurn === true
      ? game.xState.push(cellValue)
      : game.oState.push(cellValue);
    console.log(game.xState);
    console.log(game.oState);

    target.classList.add("disabled");
    target.classList.add(game.xTurn ? "x" : "o");
    game.xTurn = !game.xTurn;

    //Draw
    if (!document.querySelectorAll(".grid-cell:not(.disabled)").length) {
      document.querySelector(".game-over").classList.add("visible");
      document.querySelector(".game-over-text").textContent = "Draw";
    }
    //Winn
    game.winningState.forEach((winningState) => {
      const xWins = winningState.every((state) => game.xState.includes(state));
      const oWins = winningState.every((state) => game.oState.includes(state));

      if (xWins || oWins) {
        scoreWin(xWins);
        document
          .querySelectorAll(".grid-cell")
          .forEach((cell) => cell.classList.add("disabled"));
        document.querySelector(".game-over").classList.add("visible");
        document.querySelector(".game-over-text").textContent = xWins
          ? "X wins!"
          : "O wins!";
      }
    });
  }
});
document.querySelector(".restart").addEventListener("click", () => {
  document.querySelector(".game-over").classList.remove("visible");
  document
    .querySelectorAll(".grid-cell")
    .forEach((cell) => cell.classList.remove("disabled", "x", "o"));
  game.xTurn = true;
  game.xState = [];
  game.oState = [];
});
