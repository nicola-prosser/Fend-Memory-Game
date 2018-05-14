/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName("card");
let allCards = [...cards];

let open = [];
let match = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

// Restart Button

function restartBtn(){
    shuffle(allCards);
    let deck = document.getElementById("deck");
    let deckSize = deck.childNodes.length;

    for(let i=0; i < deckSize; i++) {
      deck.removeChild(deck.firstChild);
    }
    for(card in allCards){
      console.log(allCards[card]);
      deck.appendChild(allCards[card]);

    }
}

// Restart Button Click event

const restart = document.getElementById("restart");
restart.addEventListener("click", restartBtn);

// Flip the cards over on click

for(card in allCards) {
  allCards[card].addEventListener("click", flip);
};

function flip(evt) {
  let card = evt.target;
  card.classList.add("show" , "open");

  if (open.length > 0) {
    if (open[0].firstElementChild.classList.value == card.firstElementChild.classList.value ) {
      card.classList.remove("open");
      open[0].classList.remove("open");
      card.classList.add("match");
      open[0].classList.add("match");
      match.push(card);
      match.push(open[0]);
      open.pop();

      console.log("something");
    } else {
      setTimeout(function() {

      card.classList.remove("show" , "open");
      open[0].classList.remove("show" , "open");
      open.pop();
    }, 1500);
    }

  } else {
    open.push(card);
  };
};


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
