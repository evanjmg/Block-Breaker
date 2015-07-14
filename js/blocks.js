var Game = Game || {};
var Player = Player || {};

function Block(x,y) {
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;
	this.spacing = 50;
	this.active = this.active || true;
	this.color = '#FF4081';
	this.drawBlock = function() {
		var x = this.x,
		y = this.y,
		width = this.width,
		height = this.height;
		Game.ctx.beginPath();
        
        var pat= Game.ctx.createPattern(Game.giphy.img,"no-repeat");
		Game.ctx.fill();
        Game.ctx.fillStyle=pat
		Game.ctx.fillRect(x,y,width,height);
		Game.ctx.closePath();
	};
}

Game.blocks = {
	blocks: [],
   
	columnHeight: 300,
	drawBlocks: function() {
		var x,
		y = 50;
		var i = 0;
    
    if (Game.giphy.img.height > 400) {
        Game.giphy.img.height = 400;
    }
    if (Game.giphy.img.width > 700) {
        Game.giphy.img.width = 700;
    }
    // jump to next row
    while(y < Game.giphy.img.height) {
    	x = 50;
      // setup blocks horizontally
      while (x < Game.giphy.img.width) {
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
        	Game.ctx.clearRect(block.x, block.y, block.width,block.height);
        }
        if (block.active == true) {
        	if (Game.ball.y + Game.ball.vy > block.y 
        		&& Game.ball.y + Game.ball.vy < block.y + block.width
        		&& Game.ball.x + Game.ball.vx < block.x + block.width
        		&& Game.ball.x + Game.ball.vx > block.x ) 
        	{
        		var breakSound = new Audio('./sounds/brakeblock.wav');
        		breakSound.play();
        		Game.ball.vy = -Game.ball.vy;
        		Game.ctx.clearRect(block.x, block.y, block.width,block.height);
        		Game.score.count++;
        		$score = $('#score').val(Player.totalScore + Game.score.count);
        		block.active = false;
        		break;
        	}

        }
      }
      y += block.height + block.spacing;

    }
  }
}

