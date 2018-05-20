/*
 a lot of credit and appreciation goes to the Study Jam on the 19/4/18, especially Yahya Elharony because while I understood the steps I didnt't quite have my head around how to put them all together. The Study Jam was a huge help and removed a huge amount of stress. Thank you.
*/

//----------------------------Code Below ---------------------------------//

//Create a list that holds all of your cards

const cardIcons = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor", "fa fa-bolt", "fa fa-cube","fa fa-leaf","fa fa-bicycle", "fa fa-bomb","fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor", "fa fa-bolt", "fa fa-cube","fa fa-leaf","fa fa-bicycle", "fa fa-bomb"];

const deckOfCards = document.querySelector(".deck");
let openCards = [];
let matched = [];
let gameRunning = false;

// GAME SET UP: This code builds the li elements for the cards, applys classes and adds the click event listeners

function startGame() {
  for(let i = 0; i < cardIcons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${cardIcons[i]}"></i>`;
    deckOfCards.appendChild(card);
    click(card);
    shuffle(cardIcons);
    }
  }

//call start game

startGame();

//the click function adds compares the card classes to dertermin if they are matched or not.

function click(card) {
     //click a card
     card.addEventListener("click", function() {
       //add cards to an open card array to prepare to compare them
       if(openCards.length === 1){
         //if one card has aready been clicked then ->
         const firstCard = openCards[0];
         const secondCard = this;
         card.classList.add("open", "show", "freeze");
         openCards.push(this);
         compareCards(firstCard, secondCard);

       } else {
         //if this is the first card to be clicked then ->
         card.classList.add("open", "show", "freeze");
         openCards.push(this);
       }
     });
  }

//The Win function determins if all cards have been matched, if so the game ends and the modal is prompted.
   function win() {
     if(matched.length === 16){
       alert("You Win!");
     }
   }

//compare cards + add match class if the are the same
function compareCards(firstCard, secondCard){
  if(secondCard.innerHTML === firstCard.innerHTML) {
    firstCard.classList.add("match", "freeze");
    secondCard.classList.add("match", "freeze");
    matched.push(firstCard, secondCard);
    openCards = [];

    //all cards are matched.
    win()

    } else {
      //delay the card then return to closed
      setTimeout(function() {
        firstCard.classList.remove("open", "show", "freeze");
        secondCard.classList.remove("open", "show", "freeze");
        openCards = [];
      }, 500);
  }
  countMoves();
}

//restart the game
const restart = document.getElementById("restart");
restart.addEventListener("click", function(){
    //remove deck of cards
      for(let i=0; i < cardIcons.length; i++) {
        deckOfCards.innerHTML = "";
      }
      //clear arrays
      matched = [];
      openCards = [];
      playerMoves = 0;
      starRating.innerHTML = `
          <li><i class="fa fa-star"></i></li>
          <li><i class="fa fa-star"></i></li>
          <li><i class="fa fa-star"></i></li>`;
      counter.innerHTML = playerMoves + " Moves"
      //restart the game
      startGame();
  });

//----------------------------Count Moves ---------------------------------//

  const counter = document.querySelector(".moves");
  let playerMoves = 0;
  counter.innerHTML = playerMoves + " Moves"

  function countMoves(){
    playerMoves++;
    if(playerMoves === 1){
      counter.innerHTML = playerMoves + " Move";
      beginTime();
    } else {
      counter.innerHTML = playerMoves + " Moves";
    }
    ratePlayer();
  }

//----------------------------Timer---------------------------------//
let minutes = 0;
let seconds = 0;
const GameTimerContainer = document.querySelector(".time");

function beginTime(){
    gameRunning = true)
    Interval = setInterval (function () {
        seconds++;}, 1000);
    }
  GameTimerContainer.innerHTML = `${seconds}s`
}

//----------------------------Rating System---------------------------------//
  const starRating = document.querySelector(".stars");
  function ratePlayer() {

    switch (playerMoves) {
      case 20: starRating.innerHTML = `
          <li><i class="fa fa-star"></i></li>
          <li><i class="fa fa-star"></i></li>`;
        break;

      case 28: starRating.innerHTML = `
          <li><i class="fa fa-star"></i></li>`;
        break;
        }
  }

//----------------------------Provided Code Below ---------------------------------//

// Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }
