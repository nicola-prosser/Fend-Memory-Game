/*
 CREDIT: a lot of credit and appreciation goes to the Study Jam on the 19/4/18, especially Yahya Elharony because while I understood the steps I didnt't quite have my head around how to put them all together. The Study Jam was a huge help and removed a huge amount of stress. Thank you.
*/

//----------------------------Code Begins Below | Global variable Declarations ---------------------------------//

//All card icons
const cardIcons = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor", "fa fa-bolt", "fa fa-cube","fa fa-leaf","fa fa-bicycle", "fa fa-bomb","fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor", "fa fa-bolt", "fa fa-cube","fa fa-leaf","fa fa-bicycle", "fa fa-bomb"];

//declare variables for the code

const deckOfCards = document.querySelector(".deck");
let openCards = [];
let matched = [];

// timer variables
let timer;
let seconds = 0;
let minutes = 0;
const timerContainer = document.querySelector(".timer");
let isFirstClick = true;

//modal box variables
let playerMoves = 0;
let currentTime;
let playerStars = 3;
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const modalRating = document.querySelector('.modalStars');
const winnerText = document.querySelector('.winnerText');
const modalButton = document.querySelector('.modal-restart')

//----------------------------Game play code---------------------------------//

// GAME SET UP: This code builds the li elements for the cards, applys classes and adds the click event listeners

function startGame() {
  shuffle(cardIcons);
  for(let i = 0; i < cardIcons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${cardIcons[i]}"></i>`;
    deckOfCards.appendChild(card);
    click(card);
    }
  }

//call to shuffle on page load.
startGame();

//----------------------------Count Moves ---------------------------------//

  const counter = document.querySelector(".moves");
  counter.innerHTML = playerMoves + " Moves";

  function countMoves(){
    playerMoves++;
    if(playerMoves === 1){
      counter.innerHTML = playerMoves + " Move";
    } else {
      counter.innerHTML = playerMoves + " Moves";
    }
    ratePlayer();
  }


//the click function adds classes to open cards and if needed, starts timer.
function click(card) {
     //click a card
     card.addEventListener("click", function() {
       //run the timer and set the isFirstClick to false to not refer to this statement again
         if (isFirstClick) {
           beginTime();
           isFirstClick = false;
       }
       //add cards to an open card array to prepare to compare them
       if(openCards.length === 1){
         //if one card has aready been clicked then ->
         const firstCard = openCards[0];
         const secondCard = this;
         //open the card up, show the icon and disable is being clicked again using the freeze class
         card.classList.add("open", "show", "freeze");
         openCards.push(this);
         compareCards(firstCard, secondCard);

       } else if (openCards.length >= 2){
         //Do Nothing
       } else {
         //if this is the first card to be clicked then ->
         card.classList.add("open", "show", "freeze");
         openCards.push(this);
       }
     });
  }

//The Win function determins if all cards have been matched, if so the game ends and the modal is toggled. Close button and the window are used to escape modal. Toggle Modal will also have to be added to the "Play again" Button in the modal.

  function toggleModal() {
        modal.classList.toggle("show-modal");
    }

  function windowOnClick(event) {
           if (event.target === modal) {
               toggleModal();
           }
       }

  function modalRestartBtn (){
    toggleModal();
    restartGame();
  }

  closeButton.addEventListener("click", toggleModal);
  window.addEventListener("click", windowOnClick)
  modalButton.addEventListener("click", modalRestartBtn);

  function win() {
     if(matched.length === 16){
       clearInterval(timer);
       winnerText.innerHTML = `You completed the game in ${playerMoves} moves and a time of ${currentTime}.`
         for(let i=1; i <= playerStars; i++) {
           modalRating.innerHTML += `<li><i class="fa fa-star"></i></li>`;
         }
       toggleModal();
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

    } else {
      //delay the card then return to closed
      setTimeout(function() {
        openCards = [];
        firstCard.classList.remove("open", "show", "freeze");
        secondCard.classList.remove("open", "show", "freeze");

      }, 500);
  }
  countMoves();
  win()
}

//----------------------------Restart button---------------------------------//
const restart = document.querySelector(".restart");
function restartGame () {
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
      clearInterval(timer);
      timerContainer.innerHTML = `00:00`;
      isFirstClick = true;
      modalRating.innerHTML = ``;
      playerStars = 3;
    }


restart.addEventListener("click", restartGame);

//----------------------------Timer---------------------------------//

function beginTime(){
  let startTime = new Date().getTime();

  // Update the timer every second
  timer = setInterval(function() {
    var now = new Date().getTime();

    // Find the time elapsed between now and start
    var elapsed = now - startTime;

    // Calculate minutes and seconds
    let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    // Add starting 0 if seconds < 10
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes< 10) {
      minutes = "0" + minutes;
    }

    currentTime = minutes + ":" + seconds;

    // Update clock on game screen and modal
    timerContainer.innerHTML = currentTime;
  }, 750);
}


//----------------------------Rating System---------------------------------//
  const starRating = document.querySelector(".stars");

  function ratePlayer() {

    switch (playerMoves) {
      //from 3 stars to 2 stars
      case 12:
          playerStars = 2;
          starRating.innerHTML = `
          <li><i class="fa fa-star"></i></li>
          <li><i class="fa fa-star"></i></li>`;
        break;
      //from 2 stars to 1 star
      case 20:
          playerStars = 1;
          starRating.innerHTML = `
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

  //try freeze class idea if (classlist ===" match" do nothing or keep freeze)
