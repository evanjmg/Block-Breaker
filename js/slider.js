var Game = Game || {};

Game.slider = {
  x: 275,
  y: 400,
  width: 200,
  height: 50,
  color: '#FFEB3B',
  drawSlider: function() {
    Game.ctx.beginPath();
    Game.ctx.fillStyle = this.color;
    Game.ctx.rect(this.x, this.y, this.width, this.height);
    Game.ctx.fill();
    Game.ctx.closePath();
  }
}
Game.sliderMouseControl = function () {
  this.canvas.addEventListener('mousemove', function(e){
    if ( Game.state.GameOn === true) {
      Game.slider.x = e.clientX - Game.canvas.offsetLeft;
      Game.slider.drawSlider();
    }
  });
  this.canvas.addEventListener("mouseout",function(e){
    window.cancelAnimationFrame(Game.raf);
  });
}
Game.setupSlider = function () {
  Game.slider.drawSlider();
  // Prevent the slider from going out of the frame
  if (Game.slider.x + Game.slider.vx > Game.canvas.width || Game.slider.x + Game.slider.vx < 0) {
    Game.slider.vx = -Game.slider.vx;
  }
}