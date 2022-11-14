const CHOICES = { 'rock': '🪨', 'paper': '📃', 'scissors': '✂️' }
const MAXROUNDS = 5;

const selectionButtons = document.querySelectorAll('#selections button');
selectionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    evaluate(playRound(btn.id))
  });
});

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  return Object.keys(CHOICES)[randomNumber];
}

function playRound(playerSelection) {
  computerSelection = getComputerChoice();
  console.log(`player: ${playerSelection}, computer: ${computerSelection}`);
  //0 win, 1 lose, 2 tie
  const selections = playerSelection + computerSelection;

  const possiblities = { 'rockpaper': 1, 'rockscissors': 0, 'paperrock': 0, 'paperscissors': 1, 'scissorsrock': 1, 'scissorspaper': 0 }

  document.querySelector('#player .choice').textContent = `${CHOICES[playerSelection]}`;
  document.querySelector('#computer .choice').textContent = `${CHOICES[computerSelection]}`;

  for (const [combination, num] of Object.entries(possiblities)) {
    if (combination === selections) {
      return num;
    }
  }
  return 2;
}

function evaluate(num) {
  const lastMatchDiv = document.querySelector('#lastMatch');
  roundWinner(num);
  if (num === 0) {
    console.log('player wins');
    const playerCounter = document.querySelector('#player .counter')
    const playerScore = document.querySelector('#player');

    let aux = Number.parseInt(playerCounter.textContent);
    aux++;
    playerCounter.textContent = aux;
    playerScore.style.border = 'green solid 2px'
    lastMatchDiv.textContent = 'Player wins!'
    if (aux === MAXROUNDS) {
      matchWinner('You');
    }

  } else if (num === 1) {
    console.log('computer wins');
    const computerCounter = document.querySelector('#computer .counter')
    let aux = Number.parseInt(computerCounter.textContent);
    aux++;
    computerCounter.textContent = aux;
    lastMatchDiv.textContent = 'Computer wins!'
    if (aux === MAXROUNDS) {
      matchWinner('Computer');
    }
  } else {
    console.log('Tie')
    lastMatchDiv.textContent = 'Tie!'
  }
}

function roundWinner(win) {
  const playerScore = document.querySelector('#player');
  const computerScore = document.querySelector('#computer');
  if (win === 0) {
    playerScore.style.border = 'green solid 2px';
    computerScore.style.border = 'red solid 2px';
  } else if (win === 1) {
    playerScore.style.border = 'red solid 2px';
    computerScore.style.border = 'green solid 2px';
  } else {
    playerScore.style.border = 'dodgerblue solid 2px';
    computerScore.style.border = 'dodgerblue solid 2px';
  }
}

function matchWinner(win) {
  const winnerDiv = document.querySelector('#winner');
  winnerDiv.textContent = win + ' won the match!'

  const selectionButtons = document.querySelectorAll('#selections button');
  selectionButtons.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';
  });

  const newGameBtn = document.querySelector('#newGameBtn');
  newGameBtn.style.display = 'block';
  newGameBtn.addEventListener('click', restart);
}

function restart() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    counter.textContent = 0;
  });

  const selectionButtons = document.querySelectorAll('#selections button');
  selectionButtons.forEach(btn => {
    btn.disabled = false;
    btn.style.cursor = 'pointer';
  });

  document.querySelector('#computer').style.border = "gray solid 2px";
  document.querySelector('#player').style.border = "gray solid 2px";

  document.querySelector('#winner').textContent = ''
  document.querySelector('#lastMatch').textContent = ''

  document.querySelector('#player .choice').textContent = '';
  document.querySelector('#computer .choice').textContent = '';

  document.querySelector('#newGameBtn').style.display = 'none'
}
