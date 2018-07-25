// Enemies our player must avoid
var Enemy = function(x, y, toleft, speed = 1) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.toleft = toleft; //argument that points that enemy will move in an opposite direction
  this.speed = speed; //ratio to multiply the movement per frame
  this.x = x; //canvas x coordinate
  this.y = y; //canvas y coordinate
  //ensure to load flipped image for this case
  this.toleft
    ? (this.sprite = 'images/enemy-bug-flipped.png')
    : (this.sprite = 'images/enemy-bug.png');
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  //build the appropriate animation direction
  !this.toleft
    ? (this.x += 150 * dt * this.speed)
    : (this.x -= 150 * dt * this.speed);

  //ensure that enemy sprite constantly crosses the canvas
  if (!this.toleft) {
    if (this.x > 505) {
      this.x = -100;
    }
  } else {
    if (this.x < -70) {
      this.x = 605;
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  update() {
    //player's first move handling and reaching the water
    if (movex != undefined) {
      this.x = movex;
    }
    if (movey != undefined) {
      this.y = movey;
    }
    if (this.y < 68) {
      levelUp();
    }
  }
  //return player position to a start
  reset() {
    movex = 202;
    movey = 400;
  }
  //input handling and ensure player won't cross the game boundaries
  handleInput(val) {
    switch (val) {
      case 'left':
        this.x > 0 ? (movex = this.x - 101) : (movex = this.x);
        break;
      case 'up':
        this.y > 0 ? (movey = this.y - 83) : (movey = this.y);
        break;
      case 'right':
        this.x < 404 ? (movex = this.x + 101) : (movex = this.x);
        break;
      case 'down':
        this.y < 400 ? (movey = this.y + 83) : (movey = this.y);
        break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player(202, 400); //our new player object
//enemies objects in random positions on x and movement direction
const enemy1 = new Enemy(getRandomArbitrary(-101, 606), 60, rand());
const enemy2 = new Enemy(getRandomArbitrary(-101, 606), 145, rand());
const enemy3 = new Enemy(getRandomArbitrary(-101, 606), 234, rand());
const allEnemies = [enemy1, enemy2, enemy3]; //array for all enemies
const ypos = [60, 145, 234]; //array for reposition enemies after each round
const points = document.querySelector('.points');
const hearts = document.querySelector('.hearts');
let lives = 3; //amount of lives at new game or after reset()
let movex; //variable to handle player moves on x
let movey; //variable to handle player moves on y

//function expression to add lives to DOM
let livesAmount = () => {
  for (let l = 1; l < lives + 1; l++) {
    let life = document.createElement('LI');
    hearts.appendChild(life);
    life.innerHTML = '<img width="20" height="30" src="images/Heart.png">';
  }
};

//this func calls when player reaches water
function levelUp() {
  player.reset(); //reset the player position
  points.innerHTML = Number(points.innerHTML) + 100; //add score points
  //shuffle and allocate all enemies in random positions and directions + increase speed rate
  shuffleArray(ypos);
  let i = allEnemies.length - 1;
  allEnemies.forEach(function(enemy) {
    enemy.x = getRandomArbitrary(-101, 606);
    enemy.y = ypos[i--];
    enemy.toleft = rand();
    enemy.speed *= 1.1;
    if (enemy.toleft) {
      enemy.sprite = 'images/enemy-bug-flipped.png';
    } else {
      enemy.sprite = 'images/enemy-bug.png';
    }
  });
}

//handle lives output to DOM
function lostLife(lives) {
  for (let i = lives; i < 3; i++) {
    hearts.removeChild(hearts.lastChild);
  }
  for (let j = lives; j < 3; j++) {
    let life = document.createElement('LI');
    hearts.appendChild(life);
    life.innerHTML =
      '<img width="20" height="30" src="images/Heart-blank.png">';
  }
}
//collisions check, and if it appears returns 'true'
function isCollision() {
  for (let enemy of allEnemies) {
    if (
      player.y < enemy.y + 50 &&
      player.y + 50 > enemy.y &&
      player.x < enemy.x + 50 &&
      player.x + 50 > enemy.x
    ) {
      return true;
    }
  }
}
// return random number between min and max
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
// return random true or false
function rand() {
  return Math.random() >= 0.5;
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
