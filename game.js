var squares = [];

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

      if (keyPressed == 37) {                 // left

        this.y = Math.max( this.y - 3, 1);

        console.log(this.x+"|"+this.y+"|"+keyPressed)

      }
      else if (keyPressed == 38) {            // up

        this.x = Math.max( this.x - 3, 1);
        console.log(this.x+"|"+this.y+"|"+keyPressed)

      }
      else if (keyPressed == 39) {            // right

        this.y = Math.min( this.y + 3, 4);

        console.log(this.x+"|"+this.y+"|"+keyPressed)
      }
      else if (keyPressed == 40) {            // down
        //start by checking the very bottom to see if it's empty - line 4

        this.x = Math.min( this.x + 3, 4);
        console.log(this.x+"|"+this.y+"|"+keyPressed)

      }

    this.moveRender(current_x,current_y)

  }

  this.moveUpDown = function(move) {
    console.log("here")
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
      } else {                //moving up
        nextMove = move +1;
      }
     this.moveUpDown(nextMove);
    }

  }
}
  function massMove(event) {

    if (event.keyCode == 37 && event.keyCode == 39){} else{
//find all taken cells by row
  var one = $.grep(squares, function(e){ return e.x == 1; });
   var two = $.grep(squares, function(e){ return e.x == 2; });
 var three = $.grep(squares, function(e){ return e.x == 3; });
 var four= $.grep(squares, function(e){ return e.x == 4; });
  //  var one =  $("[id^=1]").has("div");
  //    var two =  $("[id^=2]").has("div");
  //    var three =  $("[id^=3]").has("div");
  //    var four = $("[id^=4]").has("div");

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


