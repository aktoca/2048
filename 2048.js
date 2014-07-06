var squares = [];

function Square() {
  this.value = 2;
  this.id;

  this.randLocation = function() {
    x = Math.ceil(Math.random()*4);
    y = Math.ceil(Math.random()*4);
    this.id = (x * 10 ) + y; 
    //check to make sure not already taken
  }

  this.render = function(){
    id = this.id.toString();
    this.$me = $('<div class= "cell_content _'+this.value+'">'+this.value+'</div>');
    $('.square_container').filter(function(){return $(this).attr('id') == id}).append(this.$me);

  }
  console.log("Square");

  this.moveRender = function(currentSqrId){
    var moveToId = "#"+this.id;
    var moveFromId = "#"+currentSqrId;

    var _this =  $(moveFromId).children();
    var anotherParent = $('.game_board').find(moveToId);
    _this.appendTo(anotherParent);
    return;
  }

  this.move = function(){
    var old_id = this.id;

    // to move left -10
    while ( old_id >= 20  ){
      var nextLine =  $.grep(squares, function(e){ return e.id == old_id -10; });
      var next = nextLine[0];
      if (next){
        console.log('check value and if eql move& kill');
      } else {
        console.log(this.id);
        if (this.id != 10){
          this.id = old_id - 10;
          console.log(this);
          this.moveRender(old_id);
        }
      }
      old_id = old_id - 10;
    }



  }

}

function massMove(event){
  console.log("Move");
  if (event.keyCode == 37){
    for (var i=2;i <=4; i++){
      line = $.grep(squares, function(e){ return Math.floor(e.id / 10) == i; });
      $(line).each(function(w, square_container){ 
        this.move();
      });
      console.log('next col');
    }
    console.log("left");
  } else if (event.keyCode == 38){
    console.log("up");
  } else if (event.keyCode == 39){
    console.log("right");
  } else if (event.keyCode == 40){
    console.log("down");
  }

}

function nextEmpty(direction){

}

function createSquare(num) {
  for(var i = 1; i <= num; i++) {
    square = new Square();
    squares.push(square);
    square.randLocation();
    square.render();
  }
}



$(function(){
  $(document).on('keydown', massMove);
  //start the game with two squares
  createSquare(2);
});
