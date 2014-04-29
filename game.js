
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

        this.move = function(keyPressed) {

            if (keyPressed == 37) {

                this.y = Math.max( this.y - 3, 1);

                console.log(this.x+"|"+this.y+"|"+keyPressed)

            }
            else if (keyPressed == 38) {
                
                this.x = Math.max( this.x - 3, 1);
                console.log(this.x+"|"+this.y+"|"+keyPressed)

            }
            else if (keyPressed == 39) {

                this.y = Math.min( this.y + 3, 4);

                console.log(this.x+"|"+this.y+"|"+keyPressed)
            }
            else if (keyPressed == 40) {

                this.x = Math.min( this.x + 3, 4);
                console.log(this.x+"|"+this.y+"|"+keyPressed)

            }

        }

    }


function massMove(event) {

    if (event.keyCode >= 37 && event.keyCode <= 40){
            squares.forEach(function(square){square.move(event.keyCode)})
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


