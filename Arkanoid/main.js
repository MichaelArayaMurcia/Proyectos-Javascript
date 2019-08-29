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
    constructor(){
        this.x = 0;
        this.y = 0;
        this.largo = 10;
        this.ancho = 10; 
        
        this.dx = 1;
        this.dy = -2;
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
  //---------------------------------------------
    chocar(brick){
      if(this.x < brick.x + brick.largo  && 
            this.x + this.largo  > brick.x && 
            this.y < brick.y + brick.ancho && 
            this.y + brick.ancho > brick.y){
          return true;
      }
  }
  //------------------ Romper bloques -----------
    romper(){
        for(let i in juego.bricks){
            let brick = juego.bricks[i];
            if (this.chocar(brick) && brick.comodin === false){
                this.dy = -this.dy;
                jugador.puntaje += 1;
                juego.bricks.splice(i,1);  
            }
            else if (this.chocar(brick) && brick.comodin === true){
                brick.caida = true;
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

class Brick_no_comodin extends Brick{
    constructor(){
        super();
        this.comodin = false;
    }
}

class Brick_comodin extends Brick{
    constructor(){
        super();
        this.comodin = true;
        this.hit = false;
        this.caida = false;
    }
    caer(){
        this.y += 1;
    };
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
        this.colores_comodines = [rojo_roto,azul_roto,amarillo_roto,verde_roto];
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


function preload(){
    //-----------------------------------------------------------------
        base = loadImage("https://i.ibb.co/mzPj67g/base.png");
        bolas = loadImage("https://i.ibb.co/qCP3MYV/58-Breakout-Tiles.png");
        tabla = loadImage("https://i.ibb.co/ThPDzPW/50-Breakout-Tiles.png");
        vida = loadImage("https://i.ibb.co/m8wVTJY/60-Breakout-Tiles.png");
        estrellas = loadImage("https://i.ibb.co/FqsYsh8/59-Breakout-Tiles.png");
        laser = loadImage("https://i.ibb.co/F0bYvdD/laser-Red03.png");
    //-------------------------- Bricks --------------------
        amarillo = loadImage("https://i.ibb.co/YNZKGND/13-Breakout-Tiles.png");
        azul = loadImage("https://i.ibb.co/K69qmf9/11-Breakout-Tiles.png");
        rojo = loadImage("https://i.ibb.co/pyGNmz9/07-Breakout-Tiles.png");
        cafe = loadImage("https://i.ibb.co/RT7MttS/19-Breakout-Tiles.png");
    //------------------------------------------------------
        gris = loadImage("https://i.ibb.co/7WWzPw3/17-Breakout-Tiles.png");
        verde = loadImage("https://i.ibb.co/JsMPxcQ/15-Breakout-Tiles.png");
        morado = loadImage("https://i.ibb.co/2ZcXwXs/05-Breakout-Tiles.png");
        naranja = loadImage("https://i.ibb.co/PcJ5fCz/09-Breakout-Tiles.png");
    //------------------------------------------------------   
        cafe_roto = loadImage("https://i.ibb.co/TLbzV7m/20-Breakout-Tiles.png");
        gris_roto = loadImage("https://i.ibb.co/Q8h60WM/18-Breakout-Tiles.png");
        verde_roto = loadImage("https://i.ibb.co/177Lm7g/16-Breakout-Tiles.png");
        amarillo_roto = loadImage("https://i.ibb.co/QDQMXQs/14-Breakout-Tiles.png");
        azul_roto = loadImage("https://i.ibb.co/n3GTDN7/12-Breakout-Tiles.png");
        rojo_roto = loadImage("https://i.ibb.co/CWntqTb/08-Breakout-Tiles.png");
}

function collision_balas(j,i){
    let bala = jugador.balas[j];
    let brick = juego.bricks[i];

    if(bala.x < brick.x + brick.largo  && bala.x + brick.largo  > brick.x && 
        bala.y < brick.y + brick.ancho && bala.y + brick.ancho > brick.y){
        return true;
    }
}

function destruir(){
    for(let j in jugador.balas){
        let bala = jugador.balas[j];
        for(let i in juego.bricks){
            let brick = juego.bricks[i];
            if(collision_balas(j,i) && brick.comodin === false){
                bala.hit = true;
                juego.bricks.splice(i,1);
                jugador.puntaje += 1;
            }
            else if(collision_balas(j,i) && brick.comodin === true){
                bala.hit = true;
                jugador.puntaje += 1;
                brick.caida = true;
            }
        }
        if((bala.y + bala.largo) < 0){
            bala.hit = true;
        }
    }
    for(let j in jugador.balas){
        if(jugador.balas[j].hit === true){
            jugador.balas.splice(j,1);
        }
    }
}

function disparar(){
    if(jugador.balas.length < juego.balas){
        bala = new Bala();
        jugador.balas.push(bala);
    }   
}

function crear_bloques(){
    for(let j = 0; j < juego.filas;j++){
        for(let i = 0;i < juego.columnas;i++){
            comodin = Math.floor(random(0,2));
            if(comodin === 0){
                bloque = new Brick_comodin();
                index = Math.floor(Math.random() * juego.colores_comodines.length);
                bloque.color = juego.colores_comodines[index]; 
            }
            else{
                bloque = new Brick_no_comodin();
                index = Math.floor(Math.random() * juego.colores.length);
                bloque.color = juego.colores[index]; 
            }
            bloque.x = (i * 40);
            bloque.y = (j * 12);
            juego.bricks.push(bloque);
        }
    }
    bola.x = jugador.x + jugador.largo / 2;
    bola.y = jugador.y - bola.ancho;
    bola.dy = -2;
} 

function actualizar(){
    background(0);
    image(base,0,350,width,50);
    image(estrellas,10,370,20,20);
    if(!juego.gameover){
        if(juego.running){
            if(jugador.vidas === 0){
                juego.gameover = true;
            }
            else if(juego.bricks.length < 1){
                crear_bloques();
            }
            for(let i = 0; i < jugador.vidas;i++){
                image(vida,280 + (i * 20),370,20,20);
            }
            for(let j in jugador.balas){
                jugador.balas[j].show();
                jugador.balas[j].update();
            }
            for(let j in juego.bricks){
                juego.bricks[j].mostrar();
                if(juego.bricks[j].caida === true){
                    juego.bricks[j].caer();
                }
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
        text("Puntuacion " + jugador.puntaje,juego.largo / 2,juego.ancho / 2 + 10);
    }
}
//-------------------------------------------------------
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
    case(32):       //Barra de espacio
        juego.running = !juego.running;
        break;
  }
}

function touchStarted(){
    disparar();
}

function touchMoved(){
    jugador.x = mouseX; 
}

function mouseMoved() {
    jugador.velocidad = 0;
    jugador.x = mouseX;
}

function setup(){
    juego = new Juego(); 
    jugador = new Jugador();
    bola = new Bola();
    crear_bloques();  
    createCanvas(juego.largo,juego.ancho);
}

function draw(){
  actualizar();
} 