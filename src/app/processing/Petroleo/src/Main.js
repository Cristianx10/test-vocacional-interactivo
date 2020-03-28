new p5(function(sketch){

    var logica = new Logica(sketch);

    sketch.setup = function(){
        sketch.createCanvas(1280,720);
    }

    sketch.draw = function(){
        logica.pintar();
    }

    sketch.mousePressed = function(){
        logica.mouse();
    }
    
});
