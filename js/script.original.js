function Player(){
  this.name ;
  this.points = 0;
}

let turn = false;

let joueur1 = new Player;
let joueur2 = new Player;



const cardsArray = [{
    'name': 'shell',
    'img': 'img/blueshell.png',
  },
  {
    'name': 'star',
    'img': 'img/star.png',
  },
  {
    'name': 'bobomb',
    'img': 'img/bobomb.png',
  },
  {
    'name': 'mario',
    'img': 'img/mario.png',
  },
  {
    'name': 'luigi',
    'img': 'img/luigi.png',
  },
  {
    'name': 'peach',
    'img': 'img/peach.png',
  },
  {
    'name': '1up',
    'img': 'img/1up.png',
  },
  {
    'name': 'mushroom',
    'img': 'img/mushroom.png',
  },
  {
    'name': 'thwomp',
    'img': 'img/thwomp.png',
  },
  {
    'name': 'bulletbill',
    'img': 'img/bulletbill.png',
  },
  {
    'name': 'coin',
    'img': 'img/coin.png',
  },
  {
    'name': 'goomba',
    'img': 'img/goomba.png',
  },
];

//shuffle the cards in array
const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 600;
let nbMatched = 0;

//get the main game div
const game = document.getElementById('game');

//create player turn display

let playeTurn = document.createElement('div');
let whichPlayer = document.createTextNode(turn ? "Joueur 2" : "Joueur 1");
playeTurn.appendChild(whichPlayer);
playeTurn.setAttribute('id','player-title');
playeTurn.setAttribute('class','player-title');
game.appendChild(playeTurn);


//create the grid, style it and insert in DOM
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

//create a card for each array item
gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});


//add class match for all selected cards
const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(div => {
    div.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

let promise = new Promise(function(resolve, reject){

    grid.addEventListener('click', function(event) {

      const clicked = event.target;

      if (
        clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')
      ) {
        return;
      }

      if (count < 2) {
        count++;
        if (count === 1) {
          firstGuess = clicked.parentNode.dataset.name;
          console.log(firstGuess);
          clicked.parentNode.classList.add('selected');
        } else {
          secondGuess = clicked.parentNode.dataset.name;
          console.log(secondGuess);
          clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
          if (firstGuess === secondGuess) {
            setTimeout(match, delay);
              nbMatched++;
                  console.log("nbMatched=" + nbMatched );
          }
          setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
      }
        //all card matched
        if(nbMatched == 1)
        {
           resolve('all matched');
        }

        //other player turn
        document.getElementById('player-title').innerHTML =  turn ? "Joueur 2" : "Joureur 1";
        turn = turn ? false : true;
    });
});

promise.then(function(){

    nbMatched = 0;

    console.log("nbMatchedReset=" + nbMatched );

    var gameDiv = document.getElementById("game");

    gameDiv.innerHTML = '<div id="congrats"> <div class="congrats-container"> <div class="congrats-box m1"> <div class="cracker a3"></div> <div class="cracker dotted a3"> </div> </div> </div> <div class="congrats-container"> <div class="congrats-box m1 d1"> <div class="cracker a2"></div> <div class="cracker dotted a2"></div> </div> </div> <div class="congrats-container"> <div class="congrats-box m3 d4"> <div class="cracker solid a2"></div> <div class="cracker dotted a3"></div> </div> </div> <div class="congrats-container p1"> <div class="congrats-box m2 d3"> <div class="cracker solid a1"></div> <div class="cracker dotted a2"></div> </div> </div> <div class="congrats-container p2"> <div class="congrats-box m1 d1"> <div class="cracker a1"></div> <div class="cracker dotted a2"> </div> </div> </div> <div class="congrats-container p2"> <div class="congrats-box m3 d2"> <div class="cracker dotted a4"></div> <div class="cracker a2"></div> </div> </div> <div class="congrats-container p3"> <div class="congrats-box m1 d2"> <div class="cracker a2"></div> <div class="cracker a3"></div> </div> </div> <div class="congrats-container p3"> <div class="congrats-box m2 d4"> <div class="cracker solid a2"></div> <div class="cracker a1"></div> </div> <div class="congrats-box m1 d3"> <div class="cracker dotted a3"></div> <div class="cracker dotted a1 container p1"></div> </div> <div class="congrats-box m2 d2"> <div class="cracker solid a1"> </div> <div class="cracker dotted a2"> </div> </div> </div> <div class="congrats-container"> <div class="congrats-box m1"> <div class="cracker a3"></div> <div class="cracker dotted a3"> </div> </div> </div> <div class="congrats-container"> <div class="congrats-box m1 d1"> <div class="cracker a2"></div> <div class="cracker dotted a2"></div> </div> </div> <div class="congrats-container"> <div class="congrats-box m3 d4"> <div class="cracker solid a2"></div> <div class="cracker dotted a3"></div> </div> </div> <div class="congrats-container p1"> <div class="congrats-box m2 d3"> <div class="cracker solid a1"></div> <div class="cracker dotted a2"></div> </div> </div> <div class="congrats-container p2"> <div class="congrats-box m1 d1"> <div class="cracker a1"></div> <div class="cracker dotted a2"> </div> </div> </div> <div class="congrats-container p2"> <div class="congrats-box m3 d2"> <div class="cracker dotted a4"></div> <div class="cracker a2"></div> </div> </div> <div class="congrats-container p3"> <div class="congrats-box m1 d2"> <div class="cracker a2"></div> <div class="cracker a3"></div> </div> </div> <div class="congrats-container p3"> <div class="congrats-box m2 d4"> <div class="cracker solid a2"></div> <div class="cracker a1"></div> </div> <div class="congrats-box m1 d3"> <div class="cracker dotted a3"></div> <div class="cracker dotted a1"> </div> <div class="container p1"></div> </div> <div class="congrats-box m2 d2"> <div class="cracker solid a1"> </div> <div class="cracker dotted a2"> </div> </div> </div> <div class="congrats-container"> <div class="congrats-box m1"> <div class="cracker a3"></div> <div class="cracker dotted a3"> </div> </div> </div> <div class="congrats-container"> <div class="congrats-box m1 d1"> <div class="cracker a2"></div> <div class="cracker dotted a2"></div> </div> </div> <div class="congrats-container"> <div class="congrats-box m3 d4"> <div class="cracker solid a2"></div> <div class="cracker dotted a3"></div> </div> </div> <div class="congrats-container p1"> <div class="congrats-box m2 d3"> <div class="cracker solid a1"></div> <div class="cracker dotted a2"></div> </div> </div> <div class="congrats-container p2"> <div class="congrats-box m1 d1"> <div class="cracker a1"></div> <div class="cracker dotted a2"> </div> </div> </div> <div class="congrats-container p2"> <div class="congrats-box m3 d2"> <div class="cracker dotted a4"></div> <div class="cracker a2"></div> </div> </div> <div class="congrats-container p3"> <div class="congrats-box m1 d2"> <div class="cracker a2"></div> <div class="cracker a3"></div> </div> </div> <div class="congrats-container p3"> <div class="congrats-box m2 d4"> <div class="cracker solid a2"></div> <div class="cracker a1"></div> </div> <div class="congrats-box m1 d3"> <div class="cracker dotted a3"></div> <div class="cracker dotted a1"></div> </div> </div> </div> <h1 class="congrats-title">Congratulations !!!</h1> ';

    let congrats = document.getElementById('congrats');

    let container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.setAttribute('class', 'col congrats-container p1');
    congrats.appendChild(container);

    let congratsBox = document.createElement('div');
    congratsBox.setAttribute('class', 'congrats-box m2 d2');
    let cracker1 = document.createElement('div');
    cracker1.setAttribute('class', 'cracker solid a1');
    congratsBox.appendChild(cracker1);
    let cracker2 = document.createElement('div');
    cracker2.setAttribute('class', 'cracker dotted a2');
    congratsBox.appendChild(cracker2);
    congrats.appendChild(congratsBox);
});
