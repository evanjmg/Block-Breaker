$('#start').click(animateBox);
 
$('#reset').click(function() {
    $('div').queue('fx', []);
});
 
$('#add').click(function() {
    $('div').queue( function(){
        $(this).animate({ height : '-=25'}, 2000);
        $(this).dequeue();
    });
});
 
function animateBox() {
  $('div').slideUp(2000)
           .slideDown(2000)
           .hide(2000)
           .show(2000, animateBox);
}