class Juego{
    constructor(){
        this.largo = 400;
        this.ancho = 500;
        this.columnas = 10;
        this.filas = 20;
        this.unidad = 20;
    }
}

const piezaZ = [
            [1,1,0],
            [0,1,1],
            [0,0,0],

            [0,0,1],
            [0,1,1],
            [0,1,0],

            [0,0,0],
            [1,1,0],
            [0,1,1],

            [0,1,0],
            [1,1,0],
            [1,0,0]
                    ];

function actualizar(){
    //Crear tablero
    for(let i = 0; i < juego.columnas; i++){
        for(let j = 0; j < juego.filas; j++ ){
            fill(255,255,255);
            rect(i * 20,j * 20,juego.unidad,juego.unidad);
        }
    }
}

function mostrar(){
        //Mostrar piezas
        for(let j = 0; j < 2;j++){
            if(piezaZ[0][j] == 1){
                //console.log("Funciona" + piezaZ[i][j]);
                fill(0,255,255);
                rect(j * juego.unidad,j * juego.unidad,juego.unidad,juego.unidad);
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
    mostrar();
}
