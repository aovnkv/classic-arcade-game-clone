// Enemies our player must avoid
var Enemy = function(x, y, toleft) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.toleft = toleft; //argument that points that enemy will move in an opposite direction
  //ensure to load flipped image for this case
  if (toleft) {
    this.sprite = 'images/enemy-bug-flipped.png';
  }
  this.x = x;
  this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  //build the appropriate animation direction
  !this.toleft ? (this.x += 150 * dt) : (this.x -= 150 * dt);

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
    //player's first move handling
    if (movex != undefined) {
      this.x = movex;
    }
    if (movey != undefined) {
      this.y = movey;
    }
    //collision check and player sprite position reset
    for (let enemy of allEnemies) {
      if (
        this.y < enemy.y + 50 &&
        this.y + 50 > enemy.y &&
        this.x < enemy.x + 50 &&
        this.x + 50 > enemy.x
      ) {
        movex = 202;
        movey = 400;
      }
    }
  }

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

const player = new Player(202, 400);
const enemy1 = new Enemy(0, 60, true);
const enemy2 = new Enemy(101, 145);
const enemy3 = new Enemy(202, 234);
const enemy4 = new Enemy();
const enemy5 = new Enemy();
const enemy6 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

let movex;
let movey;

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
