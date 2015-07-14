// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
// https://html.spec.whatwg.org/multipage/scripting.html#attr-canvas-width

var Game = Game || {};

Game.init = function () {
  Game.canvas = document.getElementById("canvas"),
  Game.ctx = canvas.getContext('2d'),
  Game.running = false;
  Game.bindEvents();
  $('canvas').hide();
  $('#top-menu').hide();
  Game.prompt();
}

Game.showCanvas = function () {
  $('canvas').fadeIn()
  $('#top-menu').fadeIn()
}

Game.prompt = function () {
  $('#prompt').show()
}
Game.loop = function () {
  Game.ctx.clearRect(0,0, Game.canvas.width, Game.canvas.height);
  Game.setupSlider();
  Game.blocks.drawBlocks();
  Game.setupBall();
  Game.sliderMouseControl();
  if (Game.score.count >= Game.blocks.blocks.length) {
    Game.state.win();
  }
  if (Game.state.GameOn) {
    window.requestAnimationFrame(function () {
      Game.loop();
    });
  }
}

Game.bindEvents = function () {
  $start = $('#start').on('click', function() {
    if (Game.state.GameReset == false) {
      Game.state.start(); 
    }
    else if (Game.state.GameReset == true) {
      Game.state.reset();
    } 
  });
  $('#random').on("click", Game.submitGiphyQuery)
  $('#submit').on("click", Game.submitGiphyQuery)
  $difficulty = $('#difficulty');
  $difficulty.on("change", Game.state.difficulty );
  $score = $('#score');
  this.canvas.addEventListener("mouseout",function(e){
    window.cancelAnimationFrame(Game.raf);
  });
}

Game.lives = {
  count: 3,
  loselife: function () {
    this.count--;
    var loselifeSound = new Audio('./sounds/lostlife.wav');
    loselifeSound.play();
    if (this.count == 2) {
      $('#lives').html('&bullet; &bullet;');
    } else if (this.count == 1) {
      $('#lives').html('&bullet;');
    } else {
      $('#lives').html('Game Over');
      Game.state.over();
    }
  }
}

Game.score = {
  count: 0
}



window.onload = Game.init;
