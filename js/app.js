// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += 150 * dt;

  if (this.x > 505) {
    this.x = -100;
  }
  //collision check and player sprite position reset
  if (this.x === player.x && this.y === player.y) {
    player.x = 202;
    player.y = 400;
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
    if (moveX != undefined) {
      this.x = moveX;
    }
    if (moveY != undefined) {
      this.y = moveY;
    }
  }

  handleInput(val) {
    switch (val) {
      case 'left':
        this.x > 0 ? (moveX = this.x - 101) : (moveX = this.x);
        break;
      case 'up':
        this.y > 0 ? (moveY = this.y - 83) : (moveY = this.y);
        break;
      case 'right':
        this.x < 404 ? (moveX = this.x + 101) : (moveX = this.x);
        break;
      case 'down':
        this.y < 400 ? (moveY = this.y + 83) : (moveY = this.y);
        break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player(202, 400);
const enemy1 = new Enemy(0, 60);
const enemy2 = new Enemy(101, 145);
const enemy3 = new Enemy(202, 234);
const enemy4 = new Enemy();
const enemy5 = new Enemy();
const enemy6 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

let moveX;
let moveY;

// allEnemies.forEach(function(enemy, i) {
//   console.log('Enemy: ' + enemy + ' x: ' + enemy.x + ' y: ' + enemy.y);
//   if (
//     this.y < enemy.y + 50 &&
//     this.y + 50 > enemy.y &&
//     this.x < enemy.x + 50 &&
//     this.x + 50 > enemy.x
//   ) {
//     player.y = 400;
//   }
// });

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
