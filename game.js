
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

            if (keyPressed == 37) {                 // left

                var parentsToLeft = $('.square_container').filter(function(){return $(this).attr('id')[0] == current_x && $(this).attr('id')[1] < current_y && $(this).children().length > 0})

                var parentsYCoordinates = [0];

                parentsToLeft.each(function(){

                    parentsYCoordinates.push($(this).attr('id')[1])

                })

                this.y = Math.max.apply(Math,parentsYCoordinates) + 1

            
            }
            else if (keyPressed == 38) {            // up
                
                this.x = Math.max( this.x - 3, 1);

            }
            else if (keyPressed == 39) {            // right

                var parentsToRight = $('.square_container').filter(function(){return $(this).attr('id')[0] == current_x && $(this).attr('id')[1] > current_y && $(this).children().length > 0})

                var parentsYCoordinates = [5];


                parentsToRight.each(function(){

                    parentsYCoordinates.push($(this).attr('id')[1])

                })

                this.y = Math.min.apply(Math,parentsYCoordinates) - 1

            }
            else if (keyPressed == 40) {            // down

                this.x = Math.min( this.x + 3, 4);

            }

            this.moveRender(current_x,current_y)

        }

    }


function massMove(event) {

    if (event.keyCode >= 37 && event.keyCode <= 40){
            
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


