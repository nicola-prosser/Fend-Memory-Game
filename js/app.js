/*
 * Create a list that holds all of your cards
 */
const cardIcons = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor", "fa fa-bolt", "fa fa-cube","fa fa-leaf","fa fa-bicycle", "fa fa-bomb","fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor", "fa fa-bolt", "fa fa-cube","fa fa-leaf","fa fa-bicycle", "fa fa-bomb"];

const deckOfCards = document.querySelector(".deck");
let openCards = [];
let matched = [];

// Display the cards on the page - loop through create HTML add to the page

 for(let i = 0; i < cardIcons.length; i++) {
   const card = document.createElement("li");
   card.classList.add("card");
   card.innerHTML = `<i class="${cardIcons[i]}"></i>`;
   deckOfCards.appendChild(card);

   //click a card
   card.addEventListener("click", function() {



     if(openCards.length === 1){
       const firstCard = openCards[0];
       const secondCard = this;
       card.classList.add("open", "show");
       openCards.push(this);

       //compare cards
       if(secondCard.innerHTML === firstCard.innerHTML){

         firstCard.classList.add("match");
         secondCard.classList.add("match");
         openCards = [];
         matched.push(firstCard, secondCard);

         win()

       } else {
         firstCard.classList.remove("open", "show");
         secondCard.classList.remove("open", "show");
         openCards = [];
         console.log("no Match");
       }

     } else {
       card.classList.add("open", "show");
       openCards.push(this);
     }

   });
 }

 function win() {
   if(matched.length === 16){
     alert("You Win!");
   }
 }


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
