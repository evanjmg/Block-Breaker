
var Game = Game || {},
canvas = document.getElementById("canvas")
ctx = canvas.getContext('2d');
var raf;
var running = false;
// window.requestAnimationFrame(Game.setup);


Game.setup = function () {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  Game.setupBall();
  Game.setupSlider();
  if (Game.blocks.blockOn == true) { Game.setupBlocks(); }
  Game.sliderMouseControl();
  window.requestAnimationFrame(function () {
    Game.setup() })
}
Game.

Game.ball = {
  x: 100,
  y: 50,
  vx: 2,
  vy: 2,
  radius: 25,
  color: '#FFEB3B',
  drawBall: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

Game.setupBall = function() {
  Game.ball.drawBall();
  Game.ball.x += Game.ball.vx;
  Game.ball.y += Game.ball.vy;
  if (Game.ball.y + Game.ball.vy > canvas.height || Game.ball.y + Game.ball.vy < 0) {
    Game.ball.vy = -Game.ball.vy;
  }
  if (Game.ball.x + Game.ball.vx > canvas.width || Game.ball.x + Game.ball.vx < 0) {
    Game.ball.vx = -Game.ball.vx;
  }
  if ((Game.ball.y + Game.ball.vy > Game.slider.y) && (Game.ball.y + Game.ball.vy < Game.slider.y + 100)
    && (Game.ball.x + Game.ball.vx <  Game.slider.x + 200))  {
    if (Game.ball.x + Game.ball.vx > Game.slider.x ) {
      Game.ball.vy = -Game.ball.vy;
    }
  }

  if ( Game.blocks.blockOn == true && Game.ball.y + Game.ball.vy === Game.blocks.y && (Game.ball.x + Game.ball.vx <  Game.blocks.x + 100))  {
    if (Game.ball.x + Game.ball.vx > Game.blocks.x ) {
      Game.ball.vy = -Game.ball.vy;
      ctx.clearRect(50,50,75,75);
      Game.blocks.blockOn = false
      Game.score.count++;
      console.log('works')
    }
  }
}
Game.slider = {
  x: 350,
  y: 300,
  width: 200,
  height: 50,
  color: 'white',
  drawSlider: function() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    ctx.fillStyle = Game.slider.color;
    ctx.fill();
  }
}
Game.sliderMouseControl = function () {
 canvas.addEventListener('mousemove', function(e){
   if (!running) {
    Game.slider.x = e.clientX;
    Game.slider.drawSlider();
  }
});
 canvas.addEventListener("click",function(e){
   if (!running) {
     raf = window.requestAnimationFrame(function () {
      Game.setup() });
     running = true;
   }
 });

 canvas.addEventListener("mouseout",function(e){
   window.cancelAnimationFrame(raf);
   running = false;
 });
}

Game.setupSlider = function () {
  Game.slider.drawSlider();
  if (Game.slider.x + Game.slider.vx > canvas.width || Game.slider.x + Game.slider.vx < 0) {
    Game.slider.vx = -Game.slider.vx;
  }

  // raf = window.requestAnimationFrame(function () {
  //   Game.drawSlider() });
}

Game.blocks = {
  blockOn: true,
  x: 50,
  y: 50,
  width: 75,
  height: 75,
  color: '#FF4081',
  blocks: [],
  drawBlocks: function() {
    var i = 1, j = 1;
    for(i;i < 3;i++ ) {
      ctx.beginPath();
      Game.blocks.blocks[i] = ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}

Game.setupBlocks = function () {
  Game.blocks.drawBlocks();
}
window.requestAnimationFrame(function () {
  Game.setup();
});
canvas.addEventListener("mouseout",function(e){
  window.cancelAnimationFrame(raf);
});

Game.score = {
  count: 0,
  displayscore: $('') 
}
Game.restart = function () {
Game.score.count = 0;
Game.blocks.blockOn == true;

}
// interval and frames per second 
// setInterval(function() {
//   //update();
//   draw();
// // }, 1000/FPS);

// acceleration ball.vy *= .99;
// ball.vy += .25;
// cool trailing effect 
// ctx.fillStyle = 'rgba(255,255,255,0.3)';
// ctx.fillRect(0,0,canvas.width,canvas.height);