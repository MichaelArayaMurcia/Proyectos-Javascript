class Jugador{
  constructor(){
    this.x = 170;
    this.y = 340;
    
    this.largo = 60;
    this.ancho = 10;
    
    this.velocidad = 0;
    this.puntaje = 0;
    
    this.vidas = 3;
    this.balas = [];
    
  }
  mostrar(){
    this.x += this.velocidad;
    if(this.x + this.largo > juego.largo || this.x < 0){
        this.x += -this.velocidad;
    }
    image(tabla,this.x,this.y,this.largo,this.ancho);
  }
}

class Bola{
  constructor(x,y,largo,ancho){
    this.x = 200;
    this.y = 200;
    this.largo = 10;
    this.ancho = 10; 
    
    this.dx = 1;
    this.dy = 2;
  }
  mostrar(){
    this.x += bola.dx;
    this.y += bola.dy;
    image(bolas,this.x,this.y,this.largo,this.ancho);
  }
  rebotar(){
    //------------------ Vertical -------------
    if(this.y > juego.ancho){
         this.x = 200;
         this.y = 200;
         jugador.vidas -= 1;
    }
    else if(this.y < 0){
        this.dy = -this.dy;
    }
    //------------------ Horizontal -----------
    else if(this.x + this.largo > juego.largo || this.x < 0){
        this.dx = -this.dx;
    }
    //------------------ Jugador --------------
    else if(this.x >= jugador.x && 
    this.x <= (jugador.x + jugador.largo) && this.y + this.ancho >= jugador.y &&this.y < (jugador.y + jugador.ancho)){
        this.dy = -this.dy;
    }
  }
  //------------------ Romper bloques -----------
  romper(){
    for(let i in juego.bricks){
         if (this.x < juego.bricks[i].x + juego.bricks[i].largo  && 
             this.x + this.largo  > juego.bricks[i].x && 
             this.y < juego.bricks[i].y + juego.bricks[i].ancho && 
             this.y + juego.bricks[i].ancho > juego.bricks[i].y) 
             {
		     this.dy = -this.dy;
             jugador.puntaje += 1;
            juego.bricks.splice(i,1);  
		    }
        }
    }
}

class Brick{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.largo = 35;
    this.ancho = 10;
    this.color = null;
  }
  mostrar(){
    image(this.color,this.x,this.y,this.largo,this.ancho); 
  }

}

class Juego{
    constructor(){
        this.nivel = 0;
        this.filas = 5;
        this.columnas = 10;
        this.largo = 400;
        this.ancho = 400;
        this.balas = 2;
        this.velocidad = 3;
        this.running = true;
        this.gameover = false;
        this.disparo = false;
        this.colores = [amarillo,azul,rojo,verde,cafe,gris,morado,naranja];
        this.bricks = [];
    }
    
}

class Bala{
    constructor(){
        this.x = jugador.x;
        this.y = jugador.y - 20;
        this.largo = 5;
        this.ancho = 10;
        this.hit = false;
    }
    show(){
        image(laser,this.x,this.y,this.largo,this.ancho);
    }
    update(){
        this.y -= juego.velocidad; 
    }
}

//-------------------------- 
function preload(){
  menu = loadImage('https://i.ibb.co/pw16gV3/Barra-removebg-preview-removebg-preview.png');
  //-----------------------------------------------------------------
  base = loadImage('https://i.ibb.co/mzPj67g/base.png');
  bolas = loadImage('https://i.ibb.co/qCP3MYV/58-Breakout-Tiles.png');
  tabla = loadImage('https://i.ibb.co/ThPDzPW/50-Breakout-Tiles.png');
  vida = loadImage('https://i.ibb.co/m8wVTJY/60-Breakout-Tiles.png');
  estrellas = loadImage('https://i.ibb.co/FqsYsh8/59-Breakout-Tiles.png');
  laser = loadImage("https://i.ibb.co/F0bYvdD/laser-Red03.png");
  //-------------------------- Bricks --------------------
  amarillo = loadImage('https://i.ibb.co/YNZKGND/13-Breakout-Tiles.png');
  azul = loadImage('https://i.ibb.co/K69qmf9/11-Breakout-Tiles.png');
  rojo = loadImage('https://i.ibb.co/pyGNmz9/07-Breakout-Tiles.png');
  cafe = loadImage('https://i.ibb.co/RT7MttS/19-Breakout-Tiles.png');
  //------------------------------------------------------
  gris = loadImage('https://i.ibb.co/7WWzPw3/17-Breakout-Tiles.png');
  verde = loadImage('https://i.ibb.co/JsMPxcQ/15-Breakout-Tiles.png');
  morado = loadImage('https://i.ibb.co/2ZcXwXs/05-Breakout-Tiles.png');
  naranja = loadImage('https://i.ibb.co/PcJ5fCz/09-Breakout-Tiles.png');
  //------------------------------------------------------   
}
//--------------------------
function destruir(){
    for(let j in jugador.balas){
        for(let i in juego.bricks){
            if(jugador.balas[j].x < juego.bricks[i].x + juego.bricks[i].largo  && 
             jugador.balas[j].x + jugador.balas[j].largo  > juego.bricks[i].x && 
             jugador.balas[j].y < juego.bricks[i].y + juego.bricks[i].ancho && 
             jugador.balas[j].y + juego.bricks[i].ancho > juego.bricks[i].y){
                jugador.balas[j].hit = true;
                juego.bricks.splice(i,1);
                jugador.puntaje += 1;
            }
        }
        if((jugador.balas[j].y + jugador.balas[j].largo) < 0){
            jugador.balas[j].hit = true;
        }
    }
    for(let j in jugador.balas){
        if(jugador.balas[j].hit === true){
            jugador.balas.splice(j,1);
        }
    }
}
//--------------------------
function disparar(){
    if(jugador.balas.length < juego.balas){
        bala = new Bala();
        jugador.balas.push(bala);
    }   
}
//--------------------------
function crearbloques(){
    for(let j = 0; j < juego.filas;j++){
        for(let i = 0;i < juego.columnas;i++){
            bloque = new Brick();
            bloque.x = (i * 40);
            bloque.y = (j * 12);
            bloque.color = juego.colores[Math.floor(Math.random() * juego.colores.length)];
            juego.bricks.push(bloque);
        }
    }
} 
//--------------------------
function actualizar(){
    background(0);
    image(base,0,350,width,50);
    image(estrellas,10,370,20,20);
    if(!juego.gameover){
        if(juego.running){
            for(let i = 0; i < jugador.vidas;i++){
                image(vida,280 + (i * 20),370,20,20);
            }
            for(let j in jugador.balas){
                jugador.balas[j].show();
                jugador.balas[j].update();
            }
            for(let j in juego.bricks){
                juego.bricks[j].mostrar();
            }
            if(jugador.vidas === 0){
                juego.gameover = true;
            }
            text("Puntaje: " + jugador.puntaje,10,370);
            jugador.mostrar();
            bola.mostrar();
            bola.rebotar();
            bola.romper();
            destruir();
        }
        else{
            fill(255);
            text("Pausa",juego.largo / 2,juego.ancho / 2);
        }
    }
    else{
        fill(255);
        text("Perdio",juego.largo / 2,juego.ancho / 2);   
    }
}
//--------------------------
function keyPressed(){
  switch(keyCode){
    case(RIGHT_ARROW): //Flecha derecha
        jugador.velocidad = juego.velocidad;
        break;
    case(LEFT_ARROW): //Flecha izquierda
        jugador.velocidad = -  juego.velocidad;
        break;
    case(UP_ARROW):
        disparar();
        break;
    case(32):
        juego.running = !juego.running;
        break;
  }
}
//------------------------
function touchStarted(){
    disparar();
}
//------------------------
function touchMoved(){
    jugador.x = mouseX; 
}
//-----------------------
function mouseMoved() {
    jugador.velocidad = 0;
    jugador.x = mouseX;
}
//------------------------
function setup(){
  //------------------------------------------------------
    juego = new Juego(); 
    jugador = new Jugador();
    bola = new Bola();
    crearbloques();
  //------------------------------------------------------
    createCanvas(juego.largo,juego.ancho);
  //------------------------------------------------------
}
//------------------------
function draw(){
  actualizar();
} 