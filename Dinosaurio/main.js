class Juego{
    constructor(){
        this.largo = 400;
        this.ancho = 300;
        this.running = true;
        this.empezar = false;
        this.musica = false;
        this.gameover = false;
        this.enemigos = [];
    }
}

class Base{
    constructor(x){
        this.x = x;
        this.y = juego.ancho - 30;
        this.largo = juego.largo;
        this.ancho = 60;
        this.dx = 2;
    }
    update(){
        this.x -= this.dx;
        if(this.x + this.largo < 0){
            this.x = juego.largo - 5;
        }
    }
}

class Jugador{
    constructor(){
        this.x = 20;
        this.ancho = 40;
        this.y = base1.y - this.ancho;
        this.largo = 25;
        this.gravedad = 0.6;
        this.fuerza = -12;
        this.dy = 0;
        this.vidas = 3;
        this.puntuacion = 0;
        this.record = 0;
        this.imagen = player;
        this.saltando = false;
        
    }
    mostrar(){
        this.imagen.size(this.largo,this.ancho);
        this.imagen.position(this.x + 5,this.y + this.ancho + 5);

    }
    saltar(){
        if(!this.saltando){
            this.dy += this.fuerza;
        }
    }
    update(){
        this.dy += this.gravedad;
        this.y += this.dy;
        
        if(this.y + this.ancho < base1.y){
            this.saltando = true;
        } else {
            this.saltando = false;
        }
        
        if(this.y + this.ancho > base1.y){
            this.y = base1.y - this.ancho;
            this.dy = 0;
        }
        if(this.y < 0){
            this.y = base1.y - this.ancho;
            this.dy = 0;
        }
    }
    
}

class Obstaculo{
    constructor(){
        this.x = juego.largo;
        this.ancho = 40;
        this.y = base1.y - this.ancho;
        this.largo = 25;
        this.dx = 4;
        this.imagen = null;
    }
    mostrar(){
        if(this.imagen === spike){
            image(this.imagen,this.x,this.y,this.largo,this.ancho);
        }
        else if(this.imagen === fly){
            this.imagen.position(this.x,this.y + this.ancho);
        }
    }
    chocar(){
    if(this.x < jugador.x + jugador.largo  && this.x + this.largo  > jugador.x &&
     this.y < jugador.y + jugador.ancho && this.y + this.ancho > jugador.y){
        return true;
        }    
    }
    update(){
        this.x -= this.dx;
    }
}

function touchStarted(){
    if(juego.empezar){
        jugador.saltar();
    }
}

function empezar_juego(){
//     let btn_play = document.getElementById("empezar");
//     let div_menu = document.getElementById("menu");
//     let btn_reiniciar = document.getElementById("reiniciar");
//     let div_botones = document.getElementById("botones");
//     let btn_pausa = document.getElementById("pausa");
//     let btn_sonido = document.getElementById("musica");
//     let btn_salir = document.getElementById("terminar");
    
    juego.empezar = true;
    juego.running = true;
    juego.gameover = false;
    
    let div_menu = document.getElementById("menu");
    let div_botones = document.getElementById("botones");
    let div_canvas = document.getElementById("contenedor");
    let div_config = document.getElementById("configuraciones");
    
    div_menu.style.display = "none";
    div_canvas.style.display = "inline-block";
    div_botones.style.display = "inline-block";
    div_config.style.display = "none";
    
    jugador = new Jugador();
    player.show();
    if(juego.enemigos.length < 1){
        crear_enemigos();
    }
}

function configurar_juego(){
    let div_menu = document.getElementById("menu");
    let div_botones = document.getElementById("botones");
    let div_canvas = document.getElementById("contenedor");
    let div_config = document.getElementById("configuraciones");
    
    div_menu.style.display = "none";
    div_canvas.style.display = "none";
    div_botones.style.display = "none";
    div_config.style.display = "inline-block";
}

function terminar_juego(){
    let div_menu = document.getElementById("menu");
    let div_canvas = document.getElementById("contenedor");
    let div_botones = document.getElementById("botones");
    let div_config = document.getElementById("configuraciones");
    
    div_menu.style.display = "inline-block";
    div_canvas.style.display = "none";
    div_botones.style.display = "none";
    div_config.style.display = "none";
    
    player.hide();
    fly.hide();
    
    juego.empezar = false;
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

function activar_sonido(){
    let boton = document.getElementById("musica");
    
    juego.musica = !juego.musica;
    
    if(juego.musica){
        boton.style.backgroundImage = "url('https://i.ibb.co/B6HJ7dr/Vector-Soun-On.png')";
    } else {
        boton.style.backgroundImage = "url('https://i.ibb.co/wYTqYbL/Vector-Sound-Muted.png')";
    }
}

function crear_enemigos(){
    obstaculo = new Obstaculo(); 
    let choice = Math.floor(random(0,2));
    if(choice === 0){
        obstaculo.imagen = spike;
    } 
    else if (choice === 1) {
        obstaculo.y = jugador.y - obstaculo.ancho;
        obstaculo.dx = 6;
        obstaculo.imagen = fly;
    } else {
        obstaculo.y = jugador.y - obstaculo.ancho;
        obstaculo.largo = 40;
        obstaculo.dx = 6;
        obstaculo.imagen = wings;    
    }
    juego.enemigos.push(obstaculo);
}

function manejo_jugador(){
    jugador.mostrar();
    jugador.update();    
}

function manejo_enemigos(){
    for (let i in juego.enemigos) {
        enemigo = juego.enemigos[i];
        if(enemigo.imagen !== fly){
            fly.hide();
        } else {
            fly.show();
        }
        enemigo.mostrar();
        enemigo.update();
    }
    for (let i in juego.enemigos) {
        if(enemigo.chocar()){
            jugador.vidas -= 1;
            enemigo.x = -20;
            if(jugador.puntuacion > jugador.record){
                jugador.record = jugador.puntuacion;
            }
            jugador.puntuacion = 0;
        }
        else if(enemigo.x < 0 - enemigo.largo){
                if(enemigo.imagen === fly){
                    enemigo.imagen.hide();
                }
            jugador.puntuacion += 1;
            juego.enemigos.splice(i,1);
        }
    }
    if(juego.enemigos.length < 1){
        crear_enemigos();
    }
}

function perder_partida(){
    if(jugador.vidas === 0){
        juego.gameover = true;
        fly.hide();
    }
}

function actualizar(){
    image(fondo,0,0,juego.largo,juego.ancho);
    image(bases,base1.x,base1.y,base1.largo,base1.ancho);
    image(bases,base2.x,base2.y,base2.largo,base2.ancho);
    textFont("ArcadeClassicRegular");
    textSize(16);
    textAlign(LEFT);
    text("Puntuacion: " + jugador.puntuacion,10,20);
    text("Record: " + jugador.record,200,20);
    for(let i = 0; i < jugador.vidas; i++){
        let x = 300;
        image(corazones,x + i * 20,280,20,20);
    }
    if(!juego.gameover){
        if(juego.running){
            manejo_jugador();
            manejo_enemigos();
            base1.update();
            base2.update();
            perder_partida();
        } else {
            textAlign(CENTER);
            text("Pausa",juego.largo / 2, juego.ancho / 2);
        }
    }
    else{
        textAlign(CENTER);
        text("Perdio",juego.largo / 2,juego.ancho / 2);
    }
}

function keyPressed(){
    if(keyCode == UP_ARROW){
        jugador.saltar();
    }
    else if(keyCode == 32){
        pantalla_pausa();
    }
}

function preload(){
    bases = loadImage("https://i.ibb.co/mzPj67g/base.png");
    fondo = loadImage("https://i.ibb.co/Y8ytqJB/Nuvens.png");
    fondo2 = loadImage("https://i.ibb.co/MgNWtn8/Backgroud1.png");
    spike = loadImage("https://i.ibb.co/TH388MZ/cactus.png");
    fly = createImg("https://i.ibb.co/LNNKQWH/pajaro2.gif");
    wings = loadImage("https://i.ibb.co/nDjLsBt/pajaro2.png");
    player = createImg("https://i.ibb.co/9vddbGP/dinosaurio.gif");
    corazones = loadImage("https://i.ibb.co/m8wVTJY/60-Breakout-Tiles.png");
}

function setup(){
    frameRate(30);
    juego = new Juego();
    base1 = new Base(0);
    base2 = new Base(juego.largo);
    fly.hide();
    player.hide();
    let canvas = createCanvas(juego.largo,juego.ancho);
    canvas.parent("contenedor");
}

function draw(){
    if(juego.empezar){
        actualizar();
    }
}