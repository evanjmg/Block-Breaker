var Game = Game || {};
var Player = Player || {};

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
    Game.giphy.allGifs.push(Game.giphy.img);
    var length = Game.giphy.allGifs.length;
    $("#all-gifs-page span").html(length);
    $("#all-gifs-page").append(Game.giphy.img);
    $('#canvas-container').hide().append("<div id='win-container'><h1>Game Over</h1><span id='gif-text'>Here's your gif!</span><br/><img id='overImgUrl' src='" + Game.giphy.url + "' width='400px' height='250px'><h2><input type='button' value='Retry' id='retry' readonly><input type='button' value='View Your Gifs' id='all-gifs' readonly></h2></h2></div>").fadeIn("slow");
    $('#retry').on("click", Game.state.reset);
    $('#all-gifs').on('click', Game.state.viewGifs);
  },
  start: function () {
    Game.score.count = 0;
    Game.blocks.blocks = [];
    this.GameOn = true;
    Game.lives.count = 3;
    Game.loop();
  },
  reset: function () { 
    location.reload() 
  },
  win: function () {
    $('canvas').fadeOut().hide();
    Player.calcScore();
    Game.state.status = 'winner'
    winSound = new Audio('./sounds/wingame.mp3');
    winSound.play();
    this.GameOn = false;
    Game.ball.vx = 20;
    this.GameReset = false;
    $("#all-gifs-page").append(Game.giphy.img);
    $('#canvas-container').hide().append("<div id='win-container'><h1>You Won!</h1><span id='gif-text'>Your Total Score is " + Player.totalScore + ". Here's your gif!</span><br/><img id='overImgUrl' src='" + Game.giphy.url + "' width='400px' height='250px'><br/><input type='button' value='Play Another Round' id='continue' readonly><input type='button' value='View Completed Gifs' id='all-gifs' readonly></h2></div>").fadeIn("slow");
    $('#continue').on("click", Game.state.continue);
    $('#all-gifs').on('click', Game.state.viewGifs);
  },
  continue: function () { 
    $('#win-container').remove();
    $('#all-gifs-page').hide();
    $('#top-menu').hide();
    $('#prompt').fadeIn(); 
    Game.blocks.blocks = [];
    this.GameOn = true;
    Game.state.GameReset = false;
    Game.lives.count = 3;
    Game.ctx.clearRect(0,0, Game.canvas.width, Game.canvas.height);
    $('#reminder').fadeIn()
  },
  viewGifs: function () {
    $("#all-gifs-page").fadeIn();
    $('#continue2').on("click", function () { 
      if (Game.state.status === "winner") 
        { Game.state.continue() } else {
          Game.state.reset() }
        });
        $('#win-container').remove();
        $('#top-menu').hide();
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

