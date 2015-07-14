var Game = Game || {};

Game.state = {
  status: 'ready',
  GameOn: false,
  GameReset: false,
  over: function () { 
    this.status = 'over';
    $start.val('Reset Game');
    this.GameOn = false;
    $('canvas').fadeOut();
    this.GameReset = true;
    $('#canvas-container').hide().append("<h1>Game Over</h1><span id='gif-text'>Here's your gif!</span><br/><img id='overImgUrl' src='" + Game.giphy.url + "' width='400px' height='250px'><h2><input type='button' value='Retry' id='retry' readonly></h2>").fadeIn("slow");
    $('#retry').on("click", Game.state.reset);
  },
  start: function () {
    Game.score.count = 0;
    Game.blocks.blocks = [];
    this.GameOn = true;
    Game.lives.count = 3;
    Game.score.count = 0;
    Game.loop();
  },
  reset: function () { 
    location.reload() 
  },
  win: function () {
    $('canvas').fadeOut();
    Game.state.status = 'winner'
    giphyApi();
    winSound = new Audio('./sounds/wingame.mp3');
    winSound.play();
    this.GameOn = false;
    Game.ball.vx = 20;
    this.GameReset = true;
    $start.val('Reset Game');
    this.GameReset = true;
    $('#canvas-container').hide().append("<h1>You Won!</h1><br/><span id='gif-text'>Here's your gif!</span><img id='overImgUrl' src='" + Game.giphy.url + "' width='400px' height='250px'><br/><input type='button' value='Play Again?' id='play-again' readonly></h2>").fadeIn("slow");
    $('#play-again').on("click", Game.state.reset);
    
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

