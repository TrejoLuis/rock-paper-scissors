const CHOICES = ['rock', 'paper', 'scissors'];

let playerSelection = '';
let computerSelection = '';


game();

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  return CHOICES[randomNumber];
}

function calculate() {
  //validate
  playerSelection = prompt('Player selection:\nrock - paper - scissors').toLocaleLowerCase();

  computerSelection = getComputerChoice().toLowerCase();
  //0 win, 1 lose, 2 tie
  const selections = playerSelection + computerSelection;

  const possiblities = { 'rockpaper': 1, 'rockscissors': 0, 'paperrock': 1, 'paperscissors': 0, 'scissorsrock': 1, 'scissorspaper': 0 }

  for (const [combination, num] of Object.entries(possiblities)) {
    if (combination === selections) {
      return num;
    }
  }
  return 2;
}

function message(number) {
  if (number === 0) {
    return `You win ${playerSelection} beats ${computerSelection}`
  }
  else if (number === 1) {
    return `You lose ${computerSelection} beats ${playerSelection}`
  }
  else {
    return `Tie`
  }
}


function game() {
  for (let i = 0; i < 5; i++) {
    let result = calculate();
    console.log(message(result));
  }

}