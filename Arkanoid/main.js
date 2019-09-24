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
        this.bolas = [];

        this.disparar = true;
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
    constructor(x,y){
        this.x = x;
        this.y = y;
        
        this.largo = 10;
        this.ancho = 10; 
        
        this.dx = 1;
        this.dy = -2;
        
        this.sonido = new Audio("https://archive.org/download/bouncemp3/Bounce_mp3.mp3");
  }
    mostrar(){
        this.x += this.dx;
        this.y += this.dy;
        image(bolas,this.x,this.y,this.largo,this.ancho);
  }
    rebotar(){
        //------------------ Vertical -------------
        if(this.y < 0){
            this.dy = -this.dy;
            return true;
        }
        //------------------ Horizontal -----------
        else if(this.x + this.largo > juego.largo || this.x < 0){
            this.dx = -this.dx;
            return true;
        }
        //------------------ Jugador --------------
        else if(this.x >= jugador.x && this.x <= (jugador.x + jugador.largo) && this.y + this.ancho >= jugador.y &&this.y < (jugador.y + jugador.ancho)){
            this.dy = -this.dy;
            return true;
        }
  }
  //---------------------------------------------
    chocar(brick){
      if(this.x < brick.x + brick.largo  && 
            this.x + this.largo  > brick.x && 
            this.y < brick.y + brick.ancho && 
            this.y + brick.ancho > brick.y)
        {
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
                return true;
            }
            else if (this.chocar(brick) && brick.comodin === true && brick.caida === false){
                this.dy = -this.dy;
                jugador.puntaje += 1;
                brick.caida = true;
                return true;
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
        
        this.crash = false;
        this.hit = false;
        
        this.imagen = null;
    }
    mostrar(){
        image(this.imagen,this.x,this.y,this.largo,this.ancho); 
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
        this.caida = false;
        
        this.tipo = Math.trunc(random(1,8));
        
        this.sonido = new Audio("https://archive.org/download/bonus_brick/bonus_brick.mp3");
        // this.sonido = document.createElement('audio');
        // this.sonido.src = "https://archive.org/download/bonus_brick/bonus_brick.mp3";
    }
    caer(){
        this.ancho = 20;
        this.y += 1;
        switch(this.tipo){
            case(1):
                this.imagen = laser_comodin;
                break;
            case(2):
                this.imagen = alargar_comodin;
                break;
            case(3):
                this.imagen = puntos_100;
                break;
            case(4):
                this.imagen = puntos_250;
                break;
            case(5):
                this.imagen = puntos_500;
                break;
            case(6):
                this.imagen = encoger_comodin;
                break;
            case(7):
                this.imagen = bolas_comodin;
                break;
        }
        if(this.y > juego.ancho){
            this.crash = true;
        }
    }
    chocar(){
        if (this.x < jugador.x + jugador.largo  && 
        this.x + this.largo  > jugador.x &&
        this.y < jugador.y + jugador.ancho && 
        this.y + this.ancho > jugador.y)
        {
           // this.sonido.play();
            return true;
        }
    }
    power_ups(){
        if(this.chocar()){
            switch(this.tipo){
                case(1):
                    jugador.disparar = true;
                    break;
                case(2):
                    if(jugador.largo === 80){
                        jugador.largo += 0;
                    }else{
                        jugador.largo += 20;
                    }
                    jugador.largo += 20;
                    break;
                case(3):
                    jugador.puntaje += 100;
                    break;
                case(4):
                    jugador.puntaje += 250;
                    break;
                case(5):
                    jugador.puntaje += 500;
                    break;
                case(6):
                    if(jugador.largo === 40){
                        jugador.largo += 0;
                    }else{
                        jugador.largo -= 20;
                    }
                    break;
                case(7):
                    let x = jugador.bolas[0].x;
                    let y = jugador.bolas[0].y;
                    if(jugador.bolas.length < 3){
                        let bola = new Bola(x,y);
                        bola.dx = -bola.dx;
                        bola.dy = -bola.dy;
                        jugador.bolas.push(bola);
                    }
                    break;
            }

            return true;
        }
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
        this.empezar = false;
        this.gameover = false;
        this.disparo = false;
        this.musica = false;
        
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
        this.sonido = new Audio("https://archive.org/download/sfx_laser/sfx_laser.mp3");
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
        laser = loadImage("https://i.ibb.co/nm1J3WW/61-Breakout-Tiles.png");
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
    //------------------------- Comodines ------------------------
        laser_comodin = loadImage("https://i.ibb.co/7gX68mF/48-Breakout-Tiles.png");
        bolas_comodin = loadImage("https://i.ibb.co/Hnd1CZ7/43-Breakout-Tiles.png");
        alargar_comodin = loadImage("https://i.ibb.co/RpBhZ27/47-Breakout-Tiles.png");
        encoger_comodin = loadImage("https://i.ibb.co/85YnLfC/46-Breakout-Tiles.png");
        relantizar_comodin = loadImage("https://i.ibb.co/YjpxK4t/41-Breakout-Tiles.png");
    //----------------------------------------------------------------
        puntos_100 = loadImage("https://i.ibb.co/tMpGsjx/38-Breakout-Tiles.png");
        puntos_250 = loadImage("https://i.ibb.co/Rbd3wHR/39-Breakout-Tiles.png");
        puntos_500 = loadImage("https://i.ibb.co/55ZK2PS/40-Breakout-Tiles.png");
}

function manejo_bolas(){
    for(let j in jugador.bolas){
        let bola = jugador.bolas[j];
        bola.mostrar();
        if(jugador.bolas.length === 1 && bola.y > juego.ancho){
            jugador.bolas[0].x = 200;
            jugador.bolas[0].y = 200;
            jugador.vidas -= 1;
        }
        else if(jugador.bolas.length > 1 && bola.y > juego.ancho){
            jugador.bolas.splice(j,1);
        }
    }    
}

function manejo_jugador(){
    jugador.mostrar();
    if(jugador.vidas === 0){
        juego.gameover = true;
    }
    for(let i = 0; i < jugador.vidas;i++){
        image(vida,280 + (i * 20),370,20,20);
    }
    for(let j in jugador.balas){
        let bala = jugador.balas[j];
        bala.show();
        bala.update();
    }
}

function manejo_bricks(){
    if(juego.bricks.length < 1){
        crear_bloques();
    }
    for(let j in juego.bricks){
        let brick = juego.bricks[j];
        brick.mostrar();
        if(brick.caida === true){
            brick.caer();
        }
    }
}

function manejo_sonido(){
    for(let i in jugador.bolas){
        let bola = jugador.bolas[i];
        if(bola.rebotar() || bola.romper()){
            if(juego.musica === true){
                bola.sonido.play(); 
            }
        }
    }
    for(let j in juego.bricks){
        let brick = juego.bricks[j];
        if(brick.comodin === true && brick.power_ups()){
            if(juego.musica === true){
                brick.sonido.play();
            }
        }
    }
}

function pausar_juego(){
    let boton = document.getElementById("pausa");
    
    juego.running = !juego.running;
    if(juego.running){
        boton.style.backgroundImage = "url('https://i.ibb.co/GJTLcv7/Icon-Pause2.png')"
    } else {
        boton.style.backgroundImage = "url('https://i.ibb.co/hcG43SC/Icon-Play.png')"
    }
}

function activar_sonido(){
    let boton = document.getElementById("musica");
    
    juego.musica = !juego.musica;
    
    if(juego.musica){
        boton.style.backgroundImage = "url('https://i.ibb.co/B6HJ7dr/Vector-Soun-On.png')";
    } else {
        boton.style.backgroundImage = "url('https://i.ibb.co/wYTqYbL/Vector-Sound-Muted.png')";
    }

}

function collision_balas(j,i){
    let bala = jugador.balas[j];
    let brick = juego.bricks[i];

    if(bala.x < brick.x + brick.largo  && bala.x + bala.largo  > brick.x &&
        bala.y < brick.y + brick.ancho && bala.y + bala.ancho > brick.y){
        return true;
    }
}

function destruir_objetos(){
    for (let j in jugador.balas){
        let bala = jugador.balas[j];
        for(let i in juego.bricks){
            let brick = juego.bricks[i];
            if(collision_balas(j,i) && brick.comodin === false){
                bala.hit = true;
                brick.hit = true;
                brick.crash = true;
            }
            else if(collision_balas(j,i) && brick.comodin === true && brick.caida === false){
                bala.hit = true;
                brick.hit = true;
                brick.caida = true;
            }
        }
    }
    for (let j in jugador.balas){
        let bala = jugador.balas[j];
        if(bala.hit === true || bala.y < 0){
            jugador.balas.splice(j,1);
        }
    }
    for (let i in juego.bricks){
        let brick = juego.bricks[i];

        if(brick.hit === true){
            jugador.puntaje += 1;
            brick.hit = false;
        }
        else if(brick.crash === true){
            juego.bricks.splice(i,1);  
        }
        else if(brick.comodin === true && brick.chocar()){
            juego.bricks.splice(i,1);
        }
    }
}

function disparar_balas(){
    if(jugador.balas.length < juego.balas && jugador.disparar === true){
        bala = new Bala();
        if(juego.musica){
            bala.sonido.play();
        }
        jugador.balas.push(bala);
        return true;
    }   
}

function crear_bloques(){
    for(let j = 0; j < juego.filas;j++){
        for(let i = 0;i < juego.columnas;i++){
            comodin = Math.floor(random(0,2));
            if(comodin === 0){
                bloque = new Brick_comodin();
                index = Math.floor(Math.random() * juego.colores.length);
                bloque.imagen = juego.colores[index]; 
            }
            else{
                bloque = new Brick_no_comodin();
                index = Math.floor(Math.random() * juego.colores.length);
                bloque.imagen = juego.colores[index]; 
            }
            bloque.x = (i * 40);
            bloque.y = (j * 12);
            juego.bricks.push(bloque);
        }
    }
    for(let j = jugador.bolas.length; j > 1; j--){
      jugador.bolas.pop();
    }
    jugador.bolas[0].x = jugador.x + jugador.largo / 2;
    jugador.bolas[0].y = jugador.y - 20;
    jugador.bolas[0].dy = -2; 
} 

function empezar_juego(){
    let btn = document.getElementById("boton");
    let cnv = document.getElementById("contenedor");
    let menu = document.getElementById("menu");
    
    juego.empezar = true;
    btn.style.display = 'none';
    cnv.style.display = 'inline-block';
    menu.style.display = 'none';
}

function actualizar(){
    let posX = juego.largo / 2;
    let posY = juego.ancho / 2;
    
    background(0);
    image(base,0,350,width,50);
    image(estrellas,10,370,20,20);
    if(!juego.gameover){
        if(juego.running){
            manejo_jugador();
            manejo_bolas();
            manejo_bricks();
            manejo_sonido();
        
            destruir_objetos();
            text("Puntaje: " + jugador.puntaje,10,370);
        }
        else{
            fill(255);
            text("Pausa",posX,posY);
        }
    }
    else{
        fill(255);
        text("Perdio",posX,posY); 
        text("Puntuacion " + jugador.puntaje,posX,posY + 10);
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
        disparar_balas();
        break;
    case(32):       //Barra de espacio
        pausar_juego();
        break;
  }
}

function touchStarted(){
    disparar_balas();
}

function touchMoved(){
    jugador.x = mouseX; 
}

function mouseMoved() {
    jugador.velocidad = 0;
    jugador.x = mouseX;
}

function setup(){
    jugador = new Jugador();
    juego = new Juego();
    let x = jugador.x + jugador.largo / 2;
    let y = jugador.y - 20;
    jugador.bolas.push(new Bola(x,y));
    crear_bloques();  
    let canvas = createCanvas(juego.largo,juego.ancho);
    canvas.parent("contenedor");
}

function draw(){
    if(juego.empezar){
        actualizar();
    }
} 