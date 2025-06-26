const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let deck = [];
let playerCards = [];
let dealerCards = [];
let gameOver = false;
let chips = 500;

const playerContainer = document.getElementById('player-cards');
const dealerContainer = document.getElementById('dealer-cards');
const playerScore = document.getElementById('player-score');
const dealerScore = document.getElementById('dealer-score');
const result = document.getElementById('result');
const betInput = document.getElementById('bet');
const chipsDisplay = document.getElementById('chips');

document.getElementById('hit').addEventListener('click', playerHit);
document.getElementById('stand').addEventListener('click', dealerTurn);
document.getElementById('restart').addEventListener('click', startGame);

function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  deck = deck.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
  if (['J', 'Q', 'K'].includes(card.value)) return 10;
  if (card.value === 'A') return 11;
  return parseInt(card.value);
}

function calculateScore(cards) {
  let score = 0;
  let aces = 0;
  for (let card of cards) {
    score += getCardValue(card);
    if (card.value === 'A') aces++;
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
}

function renderCards() {
  playerContainer.innerHTML = '';
  dealerContainer.innerHTML = '';

  playerCards.forEach(card => playerContainer.appendChild(createCardElement(card)));
  dealerCards.forEach((card, i) => {
    if (i === 0 && !gameOver) {
      dealerContainer.appendChild(createCardBack());
    } else {
      dealerContainer.appendChild(createCardElement(card));
    }
  });

  playerScore.textContent = `Score : ${calculateScore(playerCards)}`;
  dealerScore.textContent = gameOver ? `Score : ${calculateScore(dealerCards)}` : 'Score : ?';
}

function createCardElement(card) {
  const div = document.createElement('div');
  div.className = 'card';
  div.textContent = `${card.value}${card.suit}`;
  return div;
}

function createCardBack() {
  const div = document.createElement('div');
  div.className = 'card back';
  return div;
}

function playerHit() {
  if (gameOver) return;
  playerCards.push(deck.pop());
  renderCards();
  if (calculateScore(playerCards) > 21) {
    result.textContent = 'Vous avez perdu ! 😵';
    loseBet();
    gameOver = true;
    renderCards();
  }
}

function dealerTurn() {
  if (gameOver) return;
  gameOver = true;

  while (calculateScore(dealerCards) < 17) {
    dealerCards.push(deck.pop());
  }

  const player = calculateScore(playerCards);
  const dealer = calculateScore(dealerCards);

  if (dealer > 21 || player > dealer) {
    result.textContent = 'Vous avez gagné ! 🎉';
    winBet();
  } else if (player < dealer) {
    result.textContent = 'Le croupier gagne. 😔';
    loseBet();
  } else {
    result.textContent = 'Égalité.';
    refundBet();
  }

  renderCards();
}

function updateChips() {
  chipsDisplay.textContent = chips;
}

function winBet() {
  let bet = getValidBet();
  chips += bet;
  updateChips();
}

function loseBet() {
  let bet = getValidBet();
  chips -= bet;
  updateChips();
}

function refundBet() {
  // rien à faire, car déjà déduit
}

function getValidBet() {
  let bet = parseInt(betInput.value);
  if (isNaN(bet) || bet < 1 || bet > chips) {
    alert("Mise invalide. Elle est remise à 10.");
    betInput.value = 10;
    bet = 10;
  }
  return bet;
}

function startGame() {
  let bet = getValidBet();
  if (bet > chips) {
    alert("Pas assez de jetons !");
    return;
  }

  createDeck();
  playerCards = [deck.pop(), deck.pop()];
  dealerCards = [deck.pop(), deck.pop()];
  gameOver = false;
  result.textContent = '';
  renderCards();
}

updateChips();

    function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
  }