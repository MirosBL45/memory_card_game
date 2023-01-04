//declare all cards
const cards = document.querySelectorAll('.memory_card');

let hasFlippedCard = false;
let lockBoard = false;
let counter = 0;
let firstCard, secondCard;



//click for cards
cards.forEach(card => {
    card.addEventListener('click', flipCard)
});



function flipCard() {
    //lock board if 2 cards are flipped
    if (lockBoard) return;

    //avoid 2 clicks on the same card
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    //second click
    secondCard = this;

    //count number of clicking
    counter++;
    document.querySelector('#numOfAtt').innerText = counter;

    checkForMatch();
}



function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}



function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.addEventListener('click', () => {
        alert('Choose another card, this one is already turned over')
    });
    secondCard.addEventListener('click', () => {
        alert('Choose another card, this one is already turned over')
    });

    resetBoard();
}



function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}



function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}



/** 
IIFE --> Immediatly Invoked Function Expression

function that runs as soon as it is defined

(function name(params) {
    statements
})()
*/

(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();


const rulesEl = document.querySelector('.rules_modal');
const closeEl = document.querySelector('#closeModal');
const showEl = document.querySelector('#rules');

closeEl.addEventListener('click', () => {
    rulesEl.style.display = 'none'
})


showEl.addEventListener('click', () => {
    rulesEl.style.display = 'block'
})