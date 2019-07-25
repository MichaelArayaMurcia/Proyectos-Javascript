class Juego{
    constructor(){
        this.largo = 400;
        this.ancho = 500;
        this.columnas = 10;
        this.filas = 20;
    }
}

const Z = [[[1,1,0],
            [0,1,1],
            [0,0,0]],

           [[0,0,1],
            [0,1,1],
            [0,1,0]],

           [[0,0,0],
            [1,1,0],
            [0,1,1]],

           [[0,1,0],
            [1,1,0],
            [1,0,0]]];

function actualizar(){
    for(let i = 0; i < juego.columnas; i++){
        for(let j = 0; j < juego.filas; j++ ){
            fill(255,255,255);
            rect(i * 20,j * 20,20,20);
        }
    }
}

function setup(){
    juego = new Juego();
    createCanvas(juego.largo,juego.ancho);
}

function draw(){
    background(0);
    actualizar();
}
