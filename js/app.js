/*
 * Create a list that holds all of your cards
 */
const cardIcons = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor", "fa fa-bolt", "fa fa-cube","fa fa-leaf","fa fa-bicycle", "fa fa-bomb","fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor", "fa fa-bolt", "fa fa-cube","fa fa-leaf","fa fa-bicycle", "fa fa-bomb"];

const deckOfCards = document.querySelector(".deck");
let openCards = [];
let matched = [];

// This code builds the li elements for the cards, applys classes and adds the click event listeners

function startGame() {
  for(let i = 0; i < cardIcons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${cardIcons[i]}"></i>`;
    deckOfCards.appendChild(card);
    click(card);
    //shuffle(cardIcons);

}
}

//---------start game---------\\
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

//The Win function determins if all cards have been matched, if so the game ends.
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

//restart
const restart = document.getElementById("restart");
restart.addEventListener("click", function(){
    //remove deck of cards
      for(let i=0; i < cardIcons.length; i++) {
        deckOfCards.innerHTML = "";
      }
      //clear arrays
      matched = [];
      openCards = [];
      //restart the game
      startGame();
  });

  //Count moves
  const counter = document.querySelector(".moves");
  let playerMoves = 0;
  counter.innerHTML = playerMoves + " Moves"
  function countMoves(){
    playerMoves++;
    if(playerMoves === 1){
      counter.innerHTML = playerMoves + " Move";
    }else {
      counter.innerHTML = playerMoves + " Moves";
    }
  }

  //Rating system



  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      console.log("anything");

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
