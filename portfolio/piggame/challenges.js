var scores, activePlayer, roundScore, gamePlaying, winningScore;
init ();

document.querySelector('.btn-new').addEventListener('click', init);
// Creating an event listner for New Game
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
  // 1) Generate a random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceDOM = document.querySelector(".dice");
    document.querySelector("#current-" + activePlayer).textContent = dice;

    var diceTwo = Math.floor(Math.random() * 6) + 1;
    var diceDOMTwo = document.querySelector(".diceTwo");
    document.querySelector("#current-" + activePlayer).textContent = diceTwo;
  // 2) Change the Image of the dice
    diceDOM.style.display = "block";
    diceDOM.src = 'dice-' + dice +'.png';
    diceDOMTwo.style.display = "block";
    diceDOMTwo.src = 'dice-' + diceTwo +'.png';

  // 3) Update the round score if dice is not 1
  if (dice === 6 && diceTwo === 6) {

    scores[activePlayer] = 0;
    document.querySelector('#score-'+activePlayer).textContent = "0";
    nextPlayer();

  } else if (dice != 1 && diceTwo != 1) {

    roundScore += dice + diceTwo;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;

  } else {

    roundScore = 0
    nextPlayer();
  }


}
} );
// Creating an event listner for HOLD BUTTON
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".diceTwo").style.display = "none";
    scores[activePlayer] += roundScore;
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= winningScore) {
        gamePlaying = false;
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".diceTwo").style.display = "none";
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.getElementById('current-1').textContent = 0;
        document.getElementById('current-0').textContent = 0;

    } else {
        roundScore = 0;
        nextPlayer();
    }
  }
});

// functions for DRY Principle
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    //document.querySelector(".dice").style.display = "none";
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};

function init() {
  gamePlaying = true;
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  winningScore = prompt("Enter A Winning Score!");
  document.getElementById('score-0').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".diceTwo").style.display = "none";
  document.querySelector('#name-0').textContent = 'player 1';
  document.querySelector('#name-1').textContent = 'player 2';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
}
