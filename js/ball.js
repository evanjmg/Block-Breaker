var Game = Game || {};

Game.ball = {
  x: 375,
  y: 375,
  vx: -5,
  vy: -5,
  radius: 25,
  color: '#FFEB3B',
  drawBall: function() {
    Game.ctx.beginPath();
    Game.ctx.fillStyle = this.color;
    Game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    Game.ctx.fill();
    Game.ctx.fillStyle = "";
    Game.ctx.closePath();
  }
}

Game.setupBall = function() {
  Game.ball.drawBall();
  Game.ball.x += Game.ball.vx;
  Game.ball.y += Game.ball.vy;
  // Boundary to hit top
  if (Game.ball.y + Game.ball.vy < 0) {
    Game.ball.vy = -Game.ball.vy;
  }
  // Go through bottom boundary and lose life
  if (Game.ball.y + Game.ball.vy > Game.canvas.height) {
    Game.lives.loselife();
    Game.ball.vy = -Game.ball.vy;
  }
  // Boundary to hit the sides
  if (Game.ball.x + Game.ball.vx > Game.canvas.width || Game.ball.x + Game.ball.vx < 0) {
    Game.ball.vx = -Game.ball.vx;
  }
  // Bounce off the slider
  if (Game.ball.y + Game.ball.vy > Game.slider.y
   && Game.ball.y + Game.ball.vy < Game.slider.y + 100
   && Game.ball.x + Game.ball.vx <  Game.slider.x + 200
   && Game.ball.x + Game.ball.vx > Game.slider.x ) {
    Game.ball.vy = -Game.ball.vy;
    bounceSound = new Audio('./sounds/beep-ping-sound.wav')
    bounceSound.play();
  }
}