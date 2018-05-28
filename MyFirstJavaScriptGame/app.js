/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Declaration of the variables required
var scores, activePlayer, roundScore;

//Initialization of the variable declared above
scores = [0, 0];
activePlayer = 0;
roundScore = 0;

//Initially hide the dice.(Re-usable component)
hideTheDice();

//Reset all the values to zero initially
document.getElementById('score-0').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-1').textContent = '0';


//Add an event-listener to the ROLL DICE button
document.querySelector('.btn-roll').addEventListener('click', function () {
    //Generate a random number and add the random number to the dice
    var dice = Math.floor(Math.random() * 6) + 1;

    //Show the dice and the round score to the UI
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //Implementation of the game rule
    if (dice !== 1) {
        //get the round score and show it to the UI
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        //Reset the roundScore and change the activePlayer
        getTheNextActivePlayer();
    }
});

//Add an event listener to the HOLD button
document.querySelector('.btn-hold').addEventListener('click', function () {

    //Add round score to the global score
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //Determine the winner
    if (scores[activePlayer] >= 100) {
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.getElementById('name-' + activePlayer).innerHTML = '<strong>' + 'Winner' + '</strong>';
        //hide the dice
        hideTheDice();
        //Disable the ROLL DICE button and the HOLD button
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
    }
    else {
        //hide the dice
        hideTheDice();
        //get the next Active Player
        getTheNextActivePlayer();


    }
});

//Add an event listener to the NEW GAME button
document.querySelector('.btn-new').addEventListener('click', function () {
    location.reload();
});

///////////////////////////////REUSABLE COMPONENTS ARE DEFINED HERE//////////////////////////////////////

//Reusable component for getting the activePlayer
function getTheNextActivePlayer() {

    //reset the roundScore value
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    //toggle Active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //Hide the dice for the toggled player
    hideTheDice();

    //toggle the active class of both the players
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
//Reusable component for hiding the dice
function hideTheDice() {
    document.querySelector('.dice').style.display = 'none';
}