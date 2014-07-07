var squares = [];

function Square() {
  this.value = 2;
  this.id;

  this.randLocation = function() {
    while(true){
      var x = Math.ceil(Math.random()*4);
      var y = Math.ceil(Math.random()*4);
      this.id = (x * 10 ) + y; 
      var id = "#" + this.id;
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
    _this.appendTo($('.game_board').find(moveToId));
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
        //Check value of next square and if == to this, kill
        console.log('check value and if eql move& kill');
        if (this.checkValue(next) && this.isSecond(next)){
          this.id = old_id + direction;
          this.moveRender(old_id);
          this.merge(next);
          return;
        }else{
          console.log(this.id);
          return;


          console.log('no match,dont move. try next square');
        }
      } else {
        //if next sqr is empty move there
        console.log(this.id);
        this.id = old_id + direction;
        console.log(this);
        this.moveRender(old_id);
      }
      old_id = old_id + direction;
    }
  }

  this.checkValue = function(squareToCheckAgainst) {
    if (squareToCheckAgainst){
      if (squareToCheckAgainst.value == this.value) {
        return true;
      } else {
        return false;
      }
    }
  }

  this.isSecond = function(nextSqr){
    if($("#"+nextSqr.id).children().length >= 2){
      return false;
    } else {
      return true;
    }
  }

  this.merge = function(squareToKill) {
    var id = "#"+this.id;    
    if (squareToKill && this.checkValue(squareToKill)) {

      // Remove from array squares
      squares.splice($.inArray(squareToKill,squares),1);

      this.value *= 2;

      // change the class of this square to the current value
      $(id).children().removeClass("_"+(this.value/2).toString()).addClass("_"+(this.value).toString());  
      // change the display value to the current value
      $(id).children().text(this.value);
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
      // Kill the square DOM on the game board
      killAllButOne();
        
    }
  } else if (event.keyCode == 38){
    console.log("up");
    for (var i=3; i>=1; i--){
      line = $.grep(squares, function(e){ return Math.floor(e.id % 10) == i; });
      $(line).each(function(w, square_container){ 
        this.move(1, 4-i );
      });
    }
      // Kill the square DOM
      killAllButOne();
      
    
  } else if (event.keyCode == 39){
    console.log("right");
    for (var i=3;i >=1; i--){
      line = $.grep(squares, function(e){ return Math.floor(e.id / 10) == i; });
      console.log(line);
      $(line).each(function(w, square_container){ 
        this.move(10, 4-i);
      });
    }
      // Kill the square DOM on the game board
      killAllButOne();
        
    
  } else if (event.keyCode == 40){
    console.log("down");
    for (var i=2; i<=4; i++){
      line = $.grep(squares, function(e){ return Math.floor(e.id % 10) == i; });
      $(line).each(function(w, square_container){ 
        this.move(-1, i-1 );
      });
    }
      // Kill the square DOM
      killAllButOne();
  }

  if (event.keyCode >= 37 && event.keyCode <= 40){ 
    createSquare(1);
  }
}

function killAllButOne(){
      for (x in squares){ 
        while ($("#"+squares[x].id).children().length > 1){
          $("#"+squares[x].id).children().eq(0).remove();
        }
      }
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
