class Juego {
    constructor(){
        this.largo = 400;
        this.ancho = 300;
        this.velocidad = 3;
        this.running = true;
        this.empezar = false;
        this.musica = false;
    }
}

class Pong {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.largo = 10;
        this.ancho = 60;
        this.dy = 0;
        this.imagen = azul;
    }
    show(){
        image(this.imagen,this.x,this.y,this.largo,this.ancho);
    }
    update(){
        this.y += this.dy;
        if(this.y + this.ancho > juego.ancho || this.y < 0){
            this.y += -this.dy;
        }
    }
}

class Bola {
    constructor(){
        this.x = juego.largo / 2;
        this.y = juego.ancho / 2;
        this.largo = 10;
        this.ancho = 10;
        this.dx = 1;
        this.dy = 2;
        this.imagen = bola_img;
        this.hit_ball = new Audio("https://ia601407.us.archive.org/22/items/pointscored/BallHitBat.mp3");
        this.hit_wall = new Audio("https://ia801407.us.archive.org/22/items/pointscored/BallHitWall.mp3");
        this.scored = new Audio("https://ia601407.us.archive.org/22/items/pointscored/PointScored.mp3");
    }
    show(){
        image(this.imagen,this.x,this.y,this.largo,this.ancho);
    }
    update(){
        this.x += this.dx;
        this.y += this.dy;
    }
    rebotar(){
        //Rebotar en tope y en el fondo
        if(this.y < 0 || this.y + this.ancho > juego.ancho){
            this.dy = -this.dy;
            return "wall";
        }
        //Rebotar en el pong_izquierdo
        else if(this.x < pong_izquierdo.x + pong_izquierdo.largo && 
                this.y > pong_izquierdo.y && 
                this.y < pong_izquierdo.y + pong_izquierdo.ancho)
            {
                this.dx = -this.dx;  
                return "paddle";
        }
        //Rebotar en el pong_derecho
        else if(this.x + this.largo > pong_derecho.x && 
                this.y > pong_derecho.y && 
                this.y < pong_derecho.y + pong_derecho.ancho)
            {
                this.dx = -this.dx;
                return "paddle";
        }
        //Anotar puntos
        else if(this.x + this.largo < 0 || this.x > juego.largo){
            this.x = 200;
            this.dx = -this.dx;
            return "scored";
        }
    }
}

function preload(){
    bola_img = loadImage("https://i.ibb.co/qCP3MYV/58-Breakout-Tiles.png");
    azul = loadImage("https://i.ibb.co/Ch4V99D/27-Breakout-Tiles.png");
    rojo = loadImage("https://i.ibb.co/YhrHWY8/24-Breakout-Tiles.png");
}

function manejar_pongs(){
    pong_izquierdo.show();
    pong_izquierdo.y = bola.y - 30;
    pong_derecho.show();
    pong_derecho.update();    
}

function manejar_bola(){
    bola.show();
    bola.update();
}

function manejo_sonido(){
    switch(bola.rebotar()){
        case("wall"):
            if(juego.musica){
                bola.hit_wall.play();
            }
            break;
        case("paddle"):
            if(juego.musica){
                bola.hit_ball.play();
            }
            break;
        case("scored"):
            if(juego.musica){
                bola.scored.play();
            }
            break;
    }
}

function activar_sonido(){
    juego.musica = !juego.musica;
}

function empezar_juego(){
    let btn_play = document.getElementById("empezar");
    let menu = document.getElementById("menu");
    let btn_reiniciar = document.getElementById("reiniciar");
    let cnv = document.getElementById("contenedor");
    let botones = document.getElementById("botones");
    let btn_pausa = document.getElementById("pausa");
    let btn_sonido = document.getElementById("musica");
    let salir = document.getElementById("terminar");
    
    
    juego.empezar = true;
    
    btn_play.style.display = 'none';
    menu.style.display = 'none';
    btn_reiniciar.style.display = "inline-block";
    cnv.style.display = 'inline-block';
    botones.style.display = "inline-block";
    btn_pausa.style.display = "inline-block";
    btn_sonido.style.display = "inline-block";
    salir.style.display = "inline-block";
    
    pong_izquierdo = new Pong();
    pong_derecho = new Pong();
    bola = new Bola();
    pong_derecho.x = juego.largo - pong_derecho.largo;
    
}

function reiniciar_juego(){
    empezar_juego();
    juego.running = true;
}

function pantalla_pausa(){
    let boton = document.getElementById("pausa");
    
    juego.running = !juego.running;
    if(juego.running){
        boton.style.backgroundImage = "url('https://i.ibb.co/GJTLcv7/Icon-Pause2.png')"
    } else {
        boton.style.backgroundImage = "url('https://i.ibb.co/hcG43SC/Icon-Play.png')"
    }
}

function terminar_juego(){
    let empezar = document.getElementById("empezar");
    let menu = document.getElementById("menu");
    let salir = document.getElementById("terminar");
    let pausa = document.getElementById("pausa");
    let sonido = document.getElementById("musica");
    let reiniciar = document.getElementById("reiniciar");
    let canvas = document.getElementById("contenedor");
    
    menu.style.display = "inline-block"
    pausa.style.display = "none";
    sonido.style.display = "none";
    contenedor.style.display = "none";
    terminar.style.display = "none";
    reiniciar.style.display = "none";
    empezar.style.display = "inline-block";
    
    juego.empezar = false;
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

function actualizar(){
    background(0);
    if(juego.running){
        manejar_pongs();
        manejar_bola();
        manejo_sonido();
    } else {
        fill(255);
        text("Pausa",200,200);
    }
}
//------------------------------------------
function touchMoved(){
    pong_derecho.y = mouseY;
}

function keyPressed(){
    switch(keyCode){
        case(UP_ARROW):
            pong_derecho.dy -= juego.velocidad;
            break;
        case(DOWN_ARROW):
            pong_derecho.dy += juego.velocidad;
            break;
        case(32): // Barra espaciadora
            pantalla_pausa();
            break;
    }
}

function keyReleased(){
    if (key != " ") {
        pong_derecho.dy = 0;
    }
}

function setup(){
    juego = new Juego();
    let canvas = createCanvas(juego.largo,juego.ancho);
    canvas.parent("contenedor");
}

function draw(){
    if(juego.empezar){
        actualizar();
    }
}