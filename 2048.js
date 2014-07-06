var squares = [];

function Square() {
  this.value = 2;
  this.id;

  this.randLocation = function() {
    while(true){
      var x = Math.ceil(Math.random()*4);
      var y = Math.ceil(Math.random()*4);
      this.id = (x * 10 ) + y; 
      var id = "#" + this.id
      //check to make sure not already taken
      if($(id).children().length == 0 ){
        break;
      }

    }
  }

  this.render = function(){
    id = this.id.toString();
    this.$me = $('<div class= "cell_content _'+this.value+'">'+this.value+'</div>');
    $('.square_container').filter(function(){return $(this).attr('id') == id}).append(this.$me);

  }

  this.moveRender = function(currentSqrId){
    var moveToId = "#"+this.id;
    var moveFromId = "#"+currentSqrId;

    var _this =  $(moveFromId).children();
    var anotherParent = $('.game_board').find(moveToId);
    _this.appendTo(anotherParent);
    return;
  }

  this.move = function(direction, limit){
    var old_id = this.id;
    // to move left: direction = -10
    // move up: diriction = +1
    for (i =1; i <= limit;i++ ){
      var nextLine =  $.grep(squares, function(e){ return e.id == old_id + direction; });
      var next = nextLine[0];
      console.log('next sqr: '+nextLine);
      if (next){
        console.log('check value and if eql move& kill');
      } else {
        console.log(this.id);
        this.id = old_id + direction;
        console.log(this);
        this.moveRender(old_id);
      }
      old_id = old_id + direction;
    }
  }

}

function massMove(event){
  console.log("Move");
  if (event.keyCode == 37){
    console.log("left");
    for (var i=2;i <=4; i++){
      line = $.grep(squares, function(e){ return Math.floor(e.id / 10) == i; });
      $(line).each(function(w, square_container){ 
        this.move(-10, i-1);
      });
    }
  } else if (event.keyCode == 38){
    console.log("up");
    for (var i=3; i>=1; i--){
      line = $.grep(squares, function(e){ return Math.floor(e.id % 10) == i; });
      console.log(line);
      $(line).each(function(w, square_container){ 
        this.move(1, 4-i );
      });
    }
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
  createSquare(4);
});
