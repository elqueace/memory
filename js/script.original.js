function playMainAudio() {
  var mainAudio = document.getElementById("mainAudio");
  mainAudio.play();
  mainAudio.volume = 0.1;
  mainAudio.loop = true;

}
function Player(){
  this.name ;
  this.points = 0;
}

function Oracle(){
  this.PV = 150;
  this.unveilCard;

}
Oracle.prototype = new Player;

function Wizard(){
  this.PV = 100;
  this.shortcut = true;
}
Wizard.prototype = new Player;

let round = 1;
let turn = false;

let joueur1 = new Oracle;
let joueur2 = new Wizard;

let matchsJoueur1 = 0;
let matchsJoueur2 = 0;



const cardsArray = [{
    'name': 'chacal',
    'img': 'img/chacal.png',
  },
  {
    'name': 'chopper',
    'img': 'img/chopper.png',
  },
  {
    'name': 'faucheur',
    'img': 'img/faucheur.png',
  },
  {
    'name': 'genji',
    'img': 'img/genji.png',
  },
  {
    'name': 'hanzo',
    'img': 'img/hanzo.png',
  },
  {
    'name': 'lucio',
    'img': 'img/lucio.png',
  },
  {
    'name': 'orisa',
    'img': 'img/orisa.png',
  },
  {
    'name': 'pharah',
    'img': 'img/pharah.png',
  },

];



//shuffle the cards in array
const gameGrid = cardsArray
  .concat(cardsArray).concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let thirdGuess = '';
let count = 0;
let previousTarget = null;
let delay = 600;
let nbMatched = 0;

//get the main game div
const game = document.getElementById('game');

//create player turn display

let playerTurn = document.createElement('div');
let whichPlayer = document.createTextNode(turn ? "Joueur 2" : "Joueur 1");
playerTurn.appendChild(whichPlayer);
playerTurn.setAttribute('id','player-title');
playerTurn.setAttribute('class','player-title');
game.appendChild(playerTurn);


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
  thirdGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

let promise = new Promise(function(resolve, reject){


    grid.addEventListener('click', function(event) {
document.getElementById("audioClick").play();
      const clicked = event.target;

      if (
        clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')
      ) {
        return;
      }

      if (count < 3) {
        count++;
        if (count === 1) {
          firstGuess = clicked.parentNode.dataset.name;
          console.log(firstGuess);
          clicked.parentNode.classList.add('selected');
        } else if (count === 2) {
          secondGuess = clicked.parentNode.dataset.name;
          console.log(secondGuess);
          clicked.parentNode.classList.add('selected');
        }else if (count === 3){
          thirdGuess = clicked.parentNode.dataset.name;
          console.log(thirdGuess);
          clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess && thirdGuess) {
          if (firstGuess == secondGuess && firstGuess  == thirdGuess) {
            switch(firstGuess)
            {
              case "chacal":
              //play orisa sound
                document.getElementById("chacal").play();
                break;
                case "chopper":
                //play orisa sound
                  document.getElementById("chopper").play();
                  break;
                  case "faucheur":
                  //play orisa sound
                    document.getElementById("faucheur").play();
                    break;
                    case "genji":
                    //play orisa sound
                      document.getElementById("genji").play();
                      break;
                      case "hanzo":
                      //play orisa sound
                        document.getElementById("hanzo").play();
                        break;
                        case "lucio":
                        //play orisa sound
                          document.getElementById("lucio").play();
                          break;
                          case "orisa":
                          //play orisa sound
                            document.getElementById("orisa").play();
                            break;
                            case "pharah":
                            //play orisa sound
                              document.getElementById("pharah").play();
                              break;
                              case "soldat76":
                              //play orisa sound
                                document.getElementById("soldat76").play();
                                break;
                                case "tracer":
                                //play orisa sound
                                  document.getElementById("tracer").play();
                                  break;
                                  case "winston":
                                  //play orisa sound
                                    //document.getElementById("winston").play();
                                    break;
                                    case "zarya":
                                    //play orisa sound
                                      document.getElementById("zarya").play();
                                      break;

                case "hanzo":
                //play orisa sound
                  document.getElementById("audioHanzo").play();
                  break;
            }
            setTimeout(match, delay);
              nbMatched++;
              //give the match to the playerTurn
              turn ? matchsJoueur2++ : matchsJoueur1++;
              console.log("mj1=" + matchsJoueur1 );
              console.log("mj2=" + matchsJoueur2 );
              console.log("nbMatched=" + nbMatched );
          }
          setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
      }
        //all card matched
        if(nbMatched == 8)
        {
           resolve('all matched');
        }

        //other player turn
        document.getElementById('player-title').innerHTML =  turn ? "Joueur 1" : "Joueur 2";
        turn = turn ? false : true;
    });
});

promise.then(function(){
    nbMatched = 0;

    var gameDiv = document.getElementById("game");
    gameDiv.innerHTML = '<div id="congrats"></div><h1 class="congrats-title">Congratulations !!!</h1>';

    let congrats;
    let container;
    let box;
    let cracker;

    congrats = document.getElementById('congrats');

    // congrats-container
    container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.setAttribute('class', 'col congrats-container p1');
    congrats.appendChild(container);
    // congrats-box
    box = document.createElement('div');
    box.setAttribute('class', 'congrats-box m2 d2');
    container.appendChild(box);
    // cracker
    cracker = document.createElement('div');
    cracker.setAttribute('class', 'cracker solid a1');
    box.appendChild(cracker);
    // cracker
    cracker = document.createElement('div');
    cracker.setAttribute('class', 'cracker dotted a2');
    box.appendChild(cracker);

    for(var i=0; i<3; i++) {
      // congrats-container 1
      container = document.createElement('div');
      container.setAttribute('class', 'congrats-container');
      congrats.appendChild(container);
      // congrats-box
      box = document.createElement('div');
      box.setAttribute('class', 'congrats-box m1');
      container.appendChild(box);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker a3');
      box.appendChild(cracker);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker dotted a3');
      box.appendChild(cracker);

      // congrats-container 2
      container = document.createElement('div');
      container.setAttribute('class', 'congrats-container');
      congrats.appendChild(container);
      // congrats-box
      box = document.createElement('div');
      box.setAttribute('class', 'congrats-box m1 d1');
      container.appendChild(box);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker a2');
      box.appendChild(cracker);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker dotted a2');
      box.appendChild(cracker);

      // congrats-container 3
      container = document.createElement('div');
      container.setAttribute('class', 'congrats-container');
      congrats.appendChild(container);
      // congrats-box
      box = document.createElement('div');
      box.setAttribute('class', 'congrats-box m3 d4');
      container.appendChild(box);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker solid a2');
      box.appendChild(cracker);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker dotted a3');
      box.appendChild(cracker);

      // congrats-container P1
      container = document.createElement('div');
      container.setAttribute('class', 'congrats-container p1');
      congrats.appendChild(container);
      // congrats-box
      box = document.createElement('div');
      box.setAttribute('class', 'congrats-box m2 d3');
      container.appendChild(box);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker solid a1');
      box.appendChild(cracker);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker dotted a2');
      box.appendChild(cracker);

      // congrats-container P2 1
      container = document.createElement('div');
      container.setAttribute('class', 'congrats-container p2');
      congrats.appendChild(container);
      // congrats-box
      box = document.createElement('div');
      box.setAttribute('class', 'congrats-box m1 d1');
      container.appendChild(box);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker a1');
      box.appendChild(cracker);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker dotted a2');
      box.appendChild(cracker);

      // congrats-container P2 2
      container = document.createElement('div');
      container.setAttribute('class', 'congrats-container p2');
      congrats.appendChild(container);
      // congrats-box
      box = document.createElement('div');
      box.setAttribute('class', 'congrats-box m3 d2');
      container.appendChild(box);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker dotted a4');
      box.appendChild(cracker);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker a2');
      box.appendChild(cracker);

      // congrats-container P3 1
      container = document.createElement('div');
      container.setAttribute('class', 'congrats-container p3');
      congrats.appendChild(container);
      // congrats-box
      box = document.createElement('div');
      box.setAttribute('class', 'congrats-box m1 d2');
      container.appendChild(box);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker a2');
      box.appendChild(cracker);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker a3');
      box.appendChild(cracker);

      // congrats-container P3 2
      container = document.createElement('div');
      container.setAttribute('class', 'congrats-container p3');
      congrats.appendChild(container);
      // congrats-box 1
      box = document.createElement('div');
      box.setAttribute('class', 'congrats-box m2 d4');
      container.appendChild(box);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker solid a2');
      box.appendChild(cracker);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker a1');
      box.appendChild(cracker);
      // congrats-box 2
      box = document.createElement('div');
      box.setAttribute('class', 'congrats-box m1 d3');
      container.appendChild(box);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker dotted a3');
      box.appendChild(cracker);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker dotted a1');
      box.appendChild(cracker);
      // congrats-box 3
      box = document.createElement('div');
      box.setAttribute('class', 'congrats-box m2 d2');
      container.appendChild(box);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker solid a1');
      box.appendChild(cracker);
      // cracker
      cracker = document.createElement('div');
      cracker.setAttribute('class', 'cracker dotted a2');
      box.appendChild(cracker);
    }

});
