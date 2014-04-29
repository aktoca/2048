
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

    }



$(function(){

    $(document).on('keydown', function(event){



        console.log(event.keyCode)



    })



    square = new Square()
    squares.push(square)
    square.randLocation()
    square.render()

    square2 = new Square()
    squares.push(square2)
    square2.randLocation()
    square2.render()

})


