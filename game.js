
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

}


function massMove(event) {
  if (event.keyCode >= 37 && event.keyCode <= 40){

    var one =  $("[id^=1]").has("div");

    var two =  $("[id^=2]").has("div");
    var three =  $("[id^=3]").has("div");
    var four = $("[id^=4]").has("div");


    moveRow(three,10);
    moveRow(two,20);
    moveRow(one,30);

    function moveRow (Row, moves){
      Row.each(function(i,v){ 
        var oldID = (parseInt(Row[i].id));
        var newID = (oldID + moves);
        if ($('#'+newID).is(':empty')){  
          Row.each(function(){console.log($(this).attr('id'))});

          var _this = $('.square_container').filter(function(){return $(this).attr('id') == oldID}).children();

          var anotherParent = $('.square_container').filter(function(){return $(this).attr('id') == newID});

          _this.appendTo(anotherParent);   

        } else {
         var newID = (oldID + moves - 10); 
        if ($('#'+newID).is(':empty')){  
          Row.each(function(){console.log($(this).attr('id'))});

          var _this = $('.square_container').filter(function(){return $(this).attr('id') == oldID}).children();

          var anotherParent = $('.square_container').filter(function(){return $(this).attr('id') == newID});

          _this.appendTo(anotherParent);   

        }} 
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


