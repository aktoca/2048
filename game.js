

function Square() {

        this.value = 2
        this.x = "1"
        this.y = "1"

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
    
    square = new Square()
    square.randLocation()
    square.render()

    square2 = new Square()
    square2.randLocation()
    square2.render()

    })


