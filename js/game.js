// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
// https://html.spec.whatwg.org/multipage/scripting.html#attr-canvas-width

var Game = Game || {},
UI = UI || {},
canvas = document.getElementById("canvas"),
ctx = canvas.getContext('2d'),
raf,
running = false;
window.onload = function () {
  Game.init();
}

Game.state = {
  over: function () { 
    vx: 0;
    vy: 0;
    $('#game-message').show();
    $('#game-message').html = "Game Over";
    
  },
  start: function () {
    Game.score.count = 0;
    Game.blocks.blocks = [];


  },
  difficulty: function () {
    if ($difficulty.val() === "Easy") {
      Game.ball.vx = 3;
      Game.ball.vy = 3;
    } else if ($difficulty.val() === "Medium") {
      Game.ball.vx = 5;
      Game.ball.vy = 5;
    }
    else if ($difficulty.val() === "Hard") {
      Game.ball.vx = 10;
      Game.ball.vy = 10;
    }
  }
}

Game.init = function () {
  window.requestAnimationFrame(function () {
    Game.width  = canvas.width;
    Game.height = canvas.height;
    Game.loop();
  });
}


Game.loop = function () {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  Game.bindEvents();
  Game.setupSlider();
  Game.blocks.drawBlocks();
  Game.setupBall();
  Game.sliderMouseControl();
  window.requestAnimationFrame(function () {
    Game.loop();
  });
}

Game.bindEvents = function () {
  $start = $('#start').on('click', Game.state.start);
  $difficulty = $('#difficulty');
  $difficulty.on("change", Game.state.difficulty );
  $score = $('#score');
  $search = $('#search');
}

Game.ball = {
  x: 350,
  y: 400,
  vx: -5,
  vy: -5,
  radius: 25,
  color: '#FFEB3B',
  drawBall: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.fillStyle = "";
    ctx.closePath();
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
  // 
  if (Game.ball.y + Game.ball.vy > canvas.height) {
    Game.lives.loselife();
    Game.ball.vy = -Game.ball.vy;
  }
  // Boundary to hit the sides
  if (Game.ball.x + Game.ball.vx > canvas.width || Game.ball.x + Game.ball.vx < 0) {
    Game.ball.vx = -Game.ball.vx;
  }
  // Bounce off the slider
  if (Game.ball.y + Game.ball.vy > Game.slider.y
   && Game.ball.y + Game.ball.vy < Game.slider.y + 100
   && Game.ball.x + Game.ball.vx <  Game.slider.x + 200
   && Game.ball.x + Game.ball.vx > Game.slider.x ) {
    Game.ball.vy = -Game.ball.vy;
  }
}

Game.lives = {
  count: 3,
  displayLives: $('#lives'),
  loselife: function () {
    this.count--
    if (this.count == 2) {
      this.displayLives.html('&bullet; &bullet;');
    } else if (this.count == 1) {
      this.displayLives.html('&bullet;');
    } else {
      this.displayLives.html('');
      Game.state.over()
    }
  }
}

Game.slider = {
  x: 350,
  y: 400,
  width: 200,
  height: 50,
  color: '#FFEB3B',
  drawSlider: function() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = Game.slider.color;
    ctx.fill();
    ctx.fillStyle = "";
    ctx.closePath();
  }
}

Game.sliderMouseControl = function () {
  canvas.addEventListener('mousemove', function(e){
    if (!running) {
      Game.slider.x = e.clientX - canvas.offsetLeft;
      Game.slider.drawSlider();
    }
  });
  canvas.addEventListener("click",function(e){
    if (!running) {
      raf = window.requestAnimationFrame(function () {
        Game.loop });
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
  // Prevent the slider from going out of the frame
  if (Game.slider.x + Game.slider.vx > canvas.width || Game.slider.x + Game.slider.vx < 0) {
    Game.slider.vx = -Game.slider.vx;
  }
}

function Block(x,y) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
  this.spacing = 50;
  this.active = this.active || true;
  this.color = '#FF4081';
  this.drawBlock = function(){
    var x = this.x,
    y = this.y,
    width = this.width,
    height = this.height;
    ctx.beginPath();
    ctx.fillRect(x,y,width,height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.fillStyle = "";
    ctx.closePath();
  };
}

Game.blocks = {
  blockOn: true,
  blocks: [],
  columnHeight: 300,
  drawBlocks: function() {
    var x,
    y = 50;
    var i = 0;
    // jump to next row
    while(y < this.columnHeight) {
      x = 50;
      // setup blocks horizontally
      while (x < canvas.width) {
        // store  a block at i or create a new block
        var block = this.blocks[i] || new Block(x, y);
        if (!this.blocks[i]) {
          this.blocks.push(block) }
        //  setup x-axis position of single block
        x += block.width + block.spacing;
        // if block is active, draw it and set collisions
        block.drawBlock();
        i++;
        if (block.active == false) {
          ctx.clearRect(block.x, block.y, block.width,block.height);
        }
        if (block.active == true) {
          if (Game.ball.y + Game.ball.vy > block.y 
            && Game.ball.y + Game.ball.vy < block.y + block.width
            && Game.ball.x + Game.ball.vx < block.x + block.width
            && Game.ball.x + Game.ball.vx > block.x ) 
          {
            Game.ball.vy = -Game.ball.vy;
            ctx.clearRect(block.x, block.y, block.width,block.height);
            Game.score.count++;
            $score = $('#score').val(Game.score.count);
            block.active = false;
            break;
          }

        }
      }
      y += block.height + block.spacing;

    }
  }
}


// Move this into an initialize function

canvas.addEventListener("mouseout",function(e){
  window.cancelAnimationFrame(raf);
});

Game.score = {
  count: 0
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