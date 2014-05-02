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

  this.render = function() {

    id = this.x+""+this.y

      this.$me = $('<div class= "cell_content"></div>')

      $('.square_container').filter(function(){return $(this).attr('id') == id}).append(this.$me)

  }

  this.moveRender = function(current_x,current_y) {

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

        this.y = Math.max.apply(Math,parentsYCoordinates) + 1

      }


      else if (keyPressed == 39) { // right

        var parentsToRight = $('.square_container').filter(function(){return $(this).attr('id')[0] == current_x && $(this).attr('id')[1] > current_y && $(this).children().length > 0})

          var parentsYCoordinates = [5];


        parentsToRight.each(function(){

          parentsYCoordinates.push($(this).attr('id')[1])

        })

        this.y = Math.min.apply(Math,parentsYCoordinates) - 1


      }

    this.moveRender(current_x,current_y)

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
  var one = $.grep(squares, function(e){ return e.x == 1; });
  var two = $.grep(squares, function(e){ return e.x == 2; });
  var three = $.grep(squares, function(e){ return e.x == 3; });
  var four= $.grep(squares, function(e){ return e.x == 4; });

  if (event.keyCode == 38){
    moveRow(two, -1);
    moveRow(three, -2);
    moveRow(four, -3);
  }
  if (event.keyCode == 40){
    moveRow(three,1);
    moveRow(two,2);
    moveRow(one,3);
  }

  //takes each cell_container in a row and moves it to the next empty space up/down
  function moveRow (row, moves){
    $(row).each(function(i, square_container){ 
      sq = this
      sq.moveUpDown(moves)
    });
  }

}






$(function(){

  $(document).on('keydown', massMove)

  square = new Square()
  squares.push(square)
  square.randLocation()
  square.render()

  square2 = new Square()
  squares.push(square2)
  square2.randLocation()
  square2.render()

})


