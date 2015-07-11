function init () {
	window.requestAnimationFrame(draw);
}


function draw () {
	var ctx = document.getElementById('canvas').getContext('2d');
	ctx.globalCompositeOperation = 'destination-over';
// setTimeout();
ctx.beginPath();
ctx.arc(100,75,50,0,2*Math.PI);
ctx.stroke();
ctx.fillStyle = 'rgba(0,0,0,0.4)';
ctx.strokeStyle = 'rgba(0,153,255,0.4)';
ctx.save();
ctx.translate(150,150);
var time = new Date();
ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
ctx.translate(200,0);
   ctx.fillRect(0,-12,50,24); // Shadow
   // ctx.drawImage(earth,-12,-12);

   ctx.restore();

   ctx.beginPath();
    ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
    ctx.stroke();


    window.requestAnimationFrame(draw);
// ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
//  ctx.translate(105,0)
} 

init();