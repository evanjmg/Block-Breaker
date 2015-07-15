var Game = Game || {},
Player = Player || {};
Game.giphy = {
  img: '',
  url: '',
  height: '',
  width: '',
  allGifs: []
}
Game.submitGiphyQuery = function () {
  query = $('#search').val();
  if (query == undefined) {
    query = "random";
  }
  giphyApi(query);
}
function giphyApi (query) {
 request = new XMLHttpRequest;
 request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+ query, true);
 request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      
      data = JSON.parse(request.responseText).data;
      var tempImage = new Image();
      tempImage.src = data.image_url;
      Game.giphy.img = tempImage;
      Game.giphy.url = data.image_url;
      Game.giphy.width = data.image_width;
      Game.giphy.height = data.image_height;

    } else {
      console.log('reached giphy, but API returned an error');
    }
    
    Game.showCanvas();
    $('#prompt').hide();
  };
  request.onerror = function() {
    console.log('connection error');
  };
  request.send();
};
