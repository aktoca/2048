var squares = [];

function Square() {
  this.value = 2;
  this.x;
  this.y;
  var id;

  this.randLocation = function() {
    while(true) {
      this.x = Math.ceil(Math.random()*4);
      this.y = Math.ceil(Math.random()*4);
      id = this.x+""+this.y;
      if($('.square_container').filter(function(){return $(this).attr('id') == id}).children().length == 0) {break}
    }
  }

  this.render = function() {
    id = this.x+""+this.y;
    this.$me = $('<div class= "cell_content _'+this.value+'">'+this.value+'</div>');
    $('.square_container').filter(function(){return $(this).attr('id') == id}).append(this.$me);

  }

  this.moveRender = function(current_x,current_y) {
    var current_parent_id = current_x+""+current_y;
    id = this.x+""+this.y;
    var _this = $('.square_container').filter(function(){return $(this).attr('id') == current_parent_id}).children();
    var anotherParent = $('.square_container').filter(function(){return $(this).attr('id') == id});
    _this.appendTo(anotherParent);
    return
  }



  this.moveLeftRight = function(move) { 
    var old_x = this.x;
    var old_y = this.y;
    var newY = (old_y + move);

    // find the cell in the way of a move 
    var nextBlock =  $.grep(squares, function(e){ return e.Y == newY && e.x == old_x; });
    if (nextBlock) {var block  =  nextBlock[0]; } 

    // if the nth most cell is empty or has the same value as 'this' ->  move there 
    if ($('#'+old_x+""+newY).is(':empty') || (this.checkValue(block) == true) )  {
      this.y = newY; 
      this.moveRender(old_x,old_y);
      if (block != this){this.kill(block);} // kill only when the block above is not self but has the same value
      return;
    } else if (move == 0){   //if row doesn't need to move -get out! 
      return;
    } else {
      // move down by subtracking  
      if (move > 0 ){ 
        nextMove = move -1; 
        //move up by adding
      } else {               
        nextMove = move +1;
      }
      this.moveLeftRight(nextMove);
    }
  }



  this.moveUpDown = function(move) { 
    var old_x = this.x;
    var old_y = this.y;
    var newX = (old_x + move);

    // find the cell in the way of a move 
    var nextBlock =  $.grep(squares, function(e){ return e.y == old_y && e.x == newX; });
    if (nextBlock) {var block  =  nextBlock[0]; } 

    // if the nth most cell is empty or has the same value as 'this' ->  move there 
    if ($('#'+newX+""+old_y).is(':empty') || (this.checkValue(block) == true) )  {
      this.x = newX; 
      this.moveRender(old_x,old_y);
      if (block != this){this.kill(block);} // kill only when the block above is not self but has the same value
      return;
    } else if (move == 0){   //if row doesn't need to move -get out! 
      return;
    } else {
      // move down by subtracking  
      if (move > 0 ){ 
        nextMove = move -1; 
        //move up by adding
      } else {               
        nextMove = move +1;
      }
      this.moveUpDown(nextMove);
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

  this.kill = function(squareToKill) {
    if (squareToKill && this.checkValue(squareToKill)) {
      var id = squareToKill.x+""+squareToKill.y
        // Kill the square DOM on the game board
        $('.square_container').filter(function(){return $(this).attr('id') == id}).children().eq(0).remove()   
        squares.splice($.inArray(squareToKill,squares),1)
        this.value *= 2
        // change the class of this square to the current value
        $('.square_container').filter(function(){return $(this).attr('id') == id}).children().removeClass("_"+(this.value/2).toString()).addClass("_"+(this.value).toString())  
        // change the display value to the current value
        $('.square_container').filter(function(){return $(this).attr('id') == id}).children().text(this.value) 
    }
  } 
}





function massMove(event) {


  if (event.keyCode == 37) {
    moveColumn(2, -1); // move column2 left  only once
    moveColumn(3, -2); // move column3 left 2 rows max
    moveColumn(4, -3); // move column4 left 3rows max
  }
  else if (event.keyCode == 39) {
    moveColumn(3, 1); // move column3 right only one row 
    moveColumn(2, 2); // move column2 right to 2 times
    moveColumn(1, 3); // move column1 right to 3 rows
  }

  //find all cells  taken by objects per row
  if (event.keyCode == 38){ // arrow up
    moveRow(2, -1); // move row2 up only once
    moveRow(3, -2); // move row3 up 2 rows max
    moveRow(4, -3); // move row4 up 3rows max
  }
  if (event.keyCode == 40){ // arrow down 
    moveRow(3, 1); // move down only one row 
    moveRow(2, 2); // move down upto 2 times
    moveRow(1, 3); // move dowe upto 3 rows
  }


  function moveColumn (columns, moves){
    column = $.grep(squares, function(e){ return e.y == columns; });
    $(column).each(function(i, square_container){ 
      sq = this
      sq.moveLeftRight(moves)
    });
  }

  //takes each cell_container in a row and moves it to the next empty space up/down
  function moveRow (rows, moves){
    row = $.grep(squares, function(e){ return e.x == rows; });
    $(row).each(function(i, square_container){ 
      sq = this
      sq.moveUpDown(moves)
    });
  }

  if (event.keyCode >= 37 && event.keyCode <= 40){ 
    createSquare(1);
  }
}



function createSquare(num) {
  for(var i = 1; i <= num; i++) {
    square = new Square()
      squares.push(square)
      square.randLocation()
      square.render()
  }
}



$(function(){
  $(document).on('keydown', massMove);
  //start the game with two squares
  createSquare(2);
});
