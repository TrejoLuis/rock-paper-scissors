const CHOICES = ['rock', 'paper', 'scissors'];
const MAXROUNDS = 5;

// hidden button
document.querySelector('#newGameBtn').style.display = 'none';


//listeners
const selectionButtons = document.querySelectorAll('#selections button');
selectionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    evaluate(playRound(btn.id))
  });
});

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  return CHOICES[randomNumber];
}

function playRound(playerSelection) {
  computerSelection = getComputerChoice();
  console.log(`player: ${playerSelection}, computer: ${computerSelection}`);
  //0 win, 1 lose, 2 tie
  const selections = playerSelection + computerSelection;

  const possiblities = { 'rockpaper': 1, 'rockscissors': 0, 'paperrock': 0, 'paperscissors': 1, 'scissorsrock': 1, 'scissorspaper': 0 }

  document.querySelector('#player .choice').textContent = `<${playerSelection}>`;
  document.querySelector('#computer .choice').textContent = `<${computerSelection}>`;

  for (const [combination, num] of Object.entries(possiblities)) {
    if (combination === selections) {
      return num;
    }
  }
  return 2;
}

function evaluate(num) {
  const lastMatchDiv = document.querySelector('#lastMatch');
  if (num === 0) {
    console.log('player wins');
    const playerCounter = document.querySelector('#player .counter')

    let aux = Number.parseInt(playerCounter.textContent);
    aux++;
    playerCounter.textContent = aux;
    lastMatchDiv.textContent = 'Player wins!'
    if (aux === MAXROUNDS) {
      winner('Player');
    }

  } else if (num === 1) {
    console.log('computer wins');
    const computerCounter = document.querySelector('#computer .counter')
    let aux = Number.parseInt(computerCounter.textContent);
    aux++;
    computerCounter.textContent = aux;
    lastMatchDiv.textContent = 'Computer wins!'
    if (aux === MAXROUNDS) {
      winner('Computer');
    }
  } else {
    console.log('Tie')
    lastMatchDiv.textContent = 'Tie!'
  }
}

function winner(win) {
  const winnerDiv = document.querySelector('#winner');
  winnerDiv.textContent = win + ' won the match!'

  //disable choices buttons
  const selectionButtons = document.querySelectorAll('#selections button');
  selectionButtons.forEach(btn => {
    btn.disabled = true;
  });

  const newGameBtn = document.querySelector('#newGameBtn');
  newGameBtn.style.display = 'block';
  newGameBtn.addEventListener('click', restart);
}

function restart() {
  const counters = document.querySelectorAll('#results .counter');
  counters.forEach(counter => {
    counter.textContent = 0;
  });

  document.querySelector('#winner').textContent = ''
  document.querySelector('#lastMatch').textContent = ''

  document.querySelector('#player .choice').textContent = '';
  document.querySelector('#computer .choice').textContent = '';

  //hidding newGamebtn
  document.querySelector('#newGameBtn').style.display = 'none'

  const selectionButtons = document.querySelectorAll('#selections button');
  selectionButtons.forEach(btn => {
    btn.disabled = false;
  });
}
