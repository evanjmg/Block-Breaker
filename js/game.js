
var Game = Game || {},
canvas = $('canvas'),
ctx = canvas.getContext('2d');
var raf;
// window.requestAnimationFrame(Game.setup);


Game.setup = function () {
  Game.ball.setupBall();
}

Game.ball = {
  x: 100,
  y: 50,
  vx: 5,
  vy: 5,
  radius: 25,
  color: 'blue',
  drawBall: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

Game.ball.setupBall = function() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  Game.ball.drawBall();
  Game.ball.x += Game.ball.vx;
  Game.ball.y += Game.ball.vy;
  if (Game.ball.y + Game.ball.vy > canvas.height || Game.ball.y + Game.ball.vy < 0) {
    Game.ball.vy = -Game.ball.vy;
  }
  if (Game.ball.x + Game.ball.vx > canvas.width || Game.ball.x + Game.ball.vx < 0) {
    Game.ball.vx = -Game.ball.vx;
  }
  raf = window.requestAnimationFrame(function () {
  Game.ball.setupBall();
  Game.slider.drawSlider();}) 
};
window.requestAnimationFrame(function () {
  Game.ball.setupBall();
  Game.drawSlider();
});

Game.slider = {
  x: 350,
  y: 450,
  vx: 5,
  vy: 5,
  width: 200,
  height: 100,
  color: 'red',
  drawSlider: function() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

Game.drawSlider = function () {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  Game.slider.drawSlider();
  Game.slider.x += Game.slider.vx;
  if (Game.slider.x + Game.slider.vx > canvas.width || Game.slider.x + Game.slider.vx < 0) {
    Game.slider.vx = -Game.slider.vx;
  }
  raf = window.requestAnimationFrame(function () {
    Game.drawSlider() });
}



// canvas.addEventListener("mouseout",function(e){
//   window.cancelAnimationFrame(raf);
// });



// acceleration ball.vy *= .99;
// ball.vy += .25;
// cool trailing effect 
// ctx.fillStyle = 'rgba(255,255,255,0.3)';
// ctx.fillRect(0,0,canvas.width,canvas.height);