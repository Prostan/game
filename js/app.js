//Constants
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;
var ENEMY_ROWS = [0, 63, 146, 229];
var START_Y = 396;

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Enemy Constructor
var Enemy = function () {
  this.x = -100;
  this.y = this.randomRow();
  this.speed = this.randomSpeed();
  this.sprite = 'images/enemy-bug.png';
};


// Return random row for enemy respawn
Enemy.prototype.randomRow = function () {
  return ENEMY_ROWS[Math.ceil(Math.random() * 3)];
};

// Enemy random speed
Enemy.prototype.randomSpeed = function () {
  return Math.floor(Math.random() * (300 - 100) + 100);
};

// Respawn enemy
Enemy.prototype.respawn = function () {
  this.x = -100;
  this.y = this.randomRow();
  this.speed = this.randomSpeed();
};

// Move enemy with different speed
Enemy.prototype.update = function (dt) {
  this.x += (this.speed * dt);
  //Enemy has reached the end of the row and should respown
  if (this.x > CANVAS_WIDTH) {
    this.respawn();
  }
  // Check if ememy is colliding with player
  this.collidingWithPlayer();
};

Enemy.prototype.collidingWithPlayer = function () {
  if (player.x <= this.x + 75 &&
    this.x <= player.x + 75 &&
    player.y <= this.y + 50 &&
    this.y <= player.y + 50) {
    // When colliding with player, respawn player
    player.respawn();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Constructor
var Player = function () {
  this.respawn();
  this.sprite = 'images/char-boy.png';
};

// Respawn player
Player.prototype.respawn = function () {
  this.x = 202;
  this.y = START_Y;
};


// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function () {
  // Player has reached top of canvas and has won
  if (this.y <= 0) {
    this.respawn();
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//While handleInput we make sure player is not moving out of canvas
Player.prototype.handleInput = function (keyCode) {
  if (keyCode === 'up') { this.y -= 83; }
  if (keyCode === 'down' && this.y < 350) { this.y += 83; }
  if (keyCode === 'left' && this.x > 50) { this.x -= 101; }
  if (keyCode === 'right' && this.x < 350) { this.x += 101; }
};

// Create enemy objects
for (i = 0; i < 4; i++) {
  allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

  player.handleInput(allowedKeys[e.keyCode]);
});
