var Game = Game || {};
var Player = Player || {};

Player = {
	totalScore: 0,
	calcScore: function () {
		this.totalScore += Game.score.count;
	},
	allGifs: []
}