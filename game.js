var squares = [];
var children = [];

function Square() {

  this.value = 2
  this.x
  this.y

  var id

  this.randLocation = function() {

    while(true) {
      this.x = Math.ceil(Math.random()*4)
      this.y = Math.ceil(Math.random()*4)

      id = this.x+""+this.y

      if($('.square_container').filter(function(){return $(this).attr('id') == id}).children().length == 0) {break}
    }
}

this.render = function() {      // creates the square on the board for the first time

  id = this.x+""+this.y

  this.$me = $('<div class= "cell_content _'+this.value+'">'+this.value+'</div>')

  $('.square_container').filter(function(){return $(this).attr('id') == id}).append(this.$me)

}

this.moveRender = function(current_x,current_y) {       // moves the square around after it's been created

  var current_parent_id = current_x+""+current_y

  id = this.x+""+this.y

  var _this = $('.square_container').filter(function(){return $(this).attr('id') == current_parent_id}).children()

  var anotherParent = $('.square_container').filter(function(){return $(this).attr('id') == id})

  _this.appendTo(anotherParent)   


}

this.move = function(keyPressed) {

  var current_x = this.x
  var current_y = this.y

      if (keyPressed == 37) { // left

        var parentsToLeft = $('.square_container').filter(function(){return $(this).attr('id')[0] == current_x && $(this).attr('id')[1] < current_y && $(this).children().length > 0})

        var parentsYCoordinates = [0];

        parentsToLeft.each(function(){

          parentsYCoordinates.push($(this).attr('id')[1])

        })

        var maxLeftParentY = Math.max.apply(Math,parentsYCoordinates)

        var obstacle = squares.filter(function(square){return square.x == current_x && square.y == maxLeftParentY})

        if (this.checkValue(obstacle[0])) {

          this.y = maxLeftParentY

        } else {

          this.y = maxLeftParentY + 1

        }

      }


      else if (keyPressed == 39) { // right

        var parentsToRight = $('.square_container').filter(function(){return $(this).attr('id')[0] == current_x && $(this).attr('id')[1] > current_y && $(this).children().length > 0})

        var parentsYCoordinates = [5];


        parentsToRight.each(function(){

          parentsYCoordinates.push($(this).attr('id')[1])

        })

        var maxRightParentY = Math.min.apply(Math,parentsYCoordinates)  

        var obstacle = squares.filter(function(square){return square.x == current_x && square.y == maxRightParentY})

        if (this.checkValue(obstacle[0])) {

          this.y = maxRightParentY

        } else {

          this.y = maxRightParentY - 1

        }

      }

      this.moveRender(current_x,current_y)  // move the square

      this.kill(obstacle[0])  // kill the target if overlap occurs (i.e. value is the same)

    }


    this.moveUpDown = function(move) { 
    if (move == 0){return} //if row doesn't need to move -get out! 
      var old_x = this.x
    var old_y = this.y
    var newX = (old_x + move);

    // if the nth most cell is empty move there else try the next cell until self
    if ($('#'+newX+""+old_y).is(':empty')){  
      this.x = newX 
      this.moveRender(old_x,old_y)
    } else {
      // moving down 
      if (move > 0 ){ 
        nextMove = move -1; 
      //moving up
    } else {               
      nextMove = move +1;
    }
    this.moveUpDown(nextMove);
  }
}



    this.checkValue = function(squareToCheckAgainst) {

      if (squareToCheckAgainst) {

        return squareToCheckAgainst.value == this.value

      }

    }

    this.kill = function(squareToKill) {

      if (squareToKill && this.checkValue(squareToKill)) {

        console.log(squareToKill)

      var id = squareToKill.x+""+squareToKill.y

      $('.square_container').filter(function(){return $(this).attr('id') == id}).children().eq(0).remove()   // Kill the square DOM on the game board

      squares.splice($.inArray(squareToKill,squares),1)

      children.splice($.inArray(squareToKill,Array.prototype.concat.apply([],children)),1)

      this.value *= 2

      $('.square_container').filter(function(){return $(this).attr('id') == id}).children().removeClass("_"+(this.value/2).toString()).addClass("_"+(this.value).toString())  // change the class of this square to the current value

      $('.square_container').filter(function(){return $(this).attr('id') == id}).children().text(this.value)  // change the display value to the current value

      }

    }


}





function massMove(event) {

  if (event.keyCode == 37 || event.keyCode == 39){

    if (event.keyCode == 37) {

      for(var co_x=1;co_x<=4;co_x++){

        for(var co_y=1;co_y<=4;co_y++){

          var object = squares.filter(function(square){return square.x == co_x && square.y == co_y})

          if (object != 0) {children.push(object)}

        }

    }

  }

  else if (event.keyCode == 39) {

    for(var co_x=1;co_x<=4;co_x++){

      for(var co_y=4;co_y>=1;co_y--){

        var object = squares.filter(function(square){return square.x == co_x && square.y == co_y})

        if (object != 0) {children.push(object)}

      }

  }

}



children.forEach(function(square){square[0].move(event.keyCode)})

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

  createSquare(2);

})


