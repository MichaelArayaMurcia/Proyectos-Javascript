class Juego {
    constructor(){
        this.largo = 400; //windowWidth - 30; 
        this.ancho = 300; //windowWidth - 170; 
        this.velocidad = 3;
        this.running = true;
        this.empezar = false;
        this.musica = false;
        this.fondo = fondo_clasico;
        this.imagen_derecha = color_rojo;
        this.imagen_izquierda = color_azul;
        this.imagen_bola = bola_img;
        this.modo = "";
        }
}

class Pong {
    constructor(){
        this.x = 0;
        this.y = juego.largo / 2;
        this.largo = 10;
        this.ancho = 60;
        this.dy = 0;
        this.puntaje = 0;
        this.imagen = color_azul;
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
        this.dx = 1.8;
        this.dy = 2;
        this.imagen = juego.imagen_bola;
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
        //Anotar puntos en el pong_derecho
        else if(this.x + this.largo < 0){
            this.x = 200;
            this.dx = -this.dx;
            pong_derecho.puntaje += 1;
            return "scored";
        }
        //Anotar puntos en el pong_izquierdo
        else if(this.x > juego.largo){
            this.x = 200;
            this.dx = -this.dx;
            pong_izquierdo.puntaje += 1;
            return "scored";    
        }
    }
}

function preload(){
    bola_img = loadImage("https://i.ibb.co/qCP3MYV/58-Breakout-Tiles.png");
    masterball = loadImage("https://i.ibb.co/fqhwsM8/ultra-ball.png");
    football = loadImage("https://i.ibb.co/v3qt9sc/football.png");
    beachball = loadImage("https://i.ibb.co/nfVGtbW/beach-ball.png");
    baseball = loadImage("https://i.ibb.co/xYVSxm4/baseball.png");
    basketball = loadImage("https://i.ibb.co/pxJZbx6/basketball-ball.png");
    //----------------------------------------------------------------------
    color_azul = loadImage("https://i.ibb.co/Ch4V99D/27-Breakout-Tiles.png");
    color_rojo = loadImage("https://i.ibb.co/YhrHWY8/24-Breakout-Tiles.png");
    color_amarillo = loadImage("https://i.ibb.co/vZByHrh/26-Breakout-Tiles.png");
    color_verde = loadImage("https://i.ibb.co/jRLDZqs/28-Breakout-Tiles.png");
    //---------------------------------------------------
    fondo_clasico = loadImage("https://i.ibb.co/4fN1xSc/pong-fondo.png");
    fondo_espacio = loadImage("https://i.ibb.co/fdHfKS5/parallax-space-backgound.png");
    fondo_montana = loadImage("https://i.ibb.co/2Z4wTJM/parallax-mountain-bg.png");
}

function manejar_pongs(){
    if(juego.modo === "PC"){
        let mitad = (pong_izquierdo.y + pong_izquierdo.ancho / 2);
        let speed = 3;
        if(bola.y < mitad && bola.x < juego.largo / 2){
            pong_izquierdo.dy = -speed;
        }
        else if(bola.y > mitad && bola.x < juego.largo / 2){
            pong_izquierdo.dy = speed;
        }
    }
    pong_izquierdo.show();
    pong_izquierdo.update();
    pong_derecho.show();
    pong_derecho.update();   
    
    fill(255);
    textFont("ArcadeClassicRegular");
    textSize(32);
    textAlign(LEFT);
    text("Score: " + pong_izquierdo.puntaje,pong_izquierdo.x + pong_izquierdo.largo,30);
    // text("Jugado: " + jugado,0,100);
    // text("speed: " + speed,0,120);
    textAlign(RIGHT);
    text("Score: " + pong_derecho.puntaje,pong_derecho.x,30);
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

function empezar_juego(){
    const div_menu = document.getElementById("menu");
    const div_canvas = document.getElementById("contenedor");
    const div_botones = document.getElementById("botones");
    const div_config = document.getElementById("configuraciones");
    const modo_juego = document.querySelector(".modo_juego:checked").value;
    
    juego.empezar = true;
    juego.modo = modo_juego;
    
    div_menu.style.display = "none";
    div_botones.style.display = "inline-block";
    div_config.style.display = "none";
    div_canvas.style.display = "inline-block";
    
    pong_izquierdo = new Pong();
    pong_derecho = new Pong();
    bola = new Bola();
    pong_derecho.x = juego.largo - pong_derecho.largo;
    pong_derecho.imagen = juego.imagen_derecha; 
    pong_izquierdo.imagen = juego.imagen_izquierda;
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
    let div_menu = document.getElementById("menu");
    let div_canvas = document.getElementById("contenedor");
    let div_botones = document.getElementById("botones");
    let div_config = document.getElementById("configuraciones");
    
    div_menu.style.display = "inline-block";
    div_canvas.style.display = "none";
    div_botones.style.display = "none";
    div_config.style.display = "none";
    
    juego.empezar = false;
    juego.running = true;
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

function actualizar_pantalla(){
    image(juego.fondo,-1,0,juego.largo+10,juego.ancho+10);
    if(juego.running){
        manejar_pongs();
        manejar_bola();
        manejo_sonido();
    } else {
        fill(255);
        textFont("ArcadeClassicRegular");
        textSize(32);
        textAlign(CENTER);
        text("Pausa",juego.largo / 2,juego.ancho / 2);
    }
}

function touchMoved(){
    if(juego.empezar){
        if(mouseX > juego.largo / 2){
            pong_derecho.y = mouseY;
        }
        else if(juego.modo === "P2" && mouseX < juego.largo / 2){
            pong_izquierdo.y = mouseY;
        }
    }
}

function keyPressed(){
    if(juego.empezar){
        if(keyCode === UP_ARROW){
            pong_derecho.dy -= juego.velocidad;
        }
        else if(keyCode === DOWN_ARROW){
            pong_derecho.dy += juego.velocidad;
        }
        else if(keyCode === 32){ // Barra espaciadora
            pantalla_pausa();
        }
        else if(juego.modo === "P2" && keyCode === 87){ //W
            pong_izquierdo.dy = -juego.velocidad;
        }
        else if(juego.modo === "P2" && keyCode === 83){ //S
            pong_izquierdo.dy = juego.velocidad;
        }
    }
}

function keyReleased(){
    if(juego.empezar){
        if (key != " ") {
            pong_derecho.dy = 0;
            pong_izquierdo.dy = 0;
        }
    }
}

function setup(){
    frameRate(30);
    juego = new Juego();
    let canvas = createCanvas(juego.largo,juego.ancho);
    canvas.parent("contenedor");
//------------------------------------------
let pong_derecho = new Vue({
        el: "#colores_pongderecho",
        data: {
            colores: [
            {tipo: color_rojo,      valor: "https://i.ibb.co/YhrHWY8/24-Breakout-Tiles.png", selected: true},
            {tipo: color_azul,      valor: "https://i.ibb.co/Ch4V99D/27-Breakout-Tiles.png", selected: false},
            {tipo: color_amarillo,  valor: "https://i.ibb.co/vZByHrh/26-Breakout-Tiles.png", selected: false},
            {tipo: color_verde,     valor: "https://i.ibb.co/jRLDZqs/28-Breakout-Tiles.png", selected: false}
            ],
        },
        methods: {
            elegir : function(boton,imagen){
                let index = this.colores.indexOf(boton);
                for(let i = 0; i < this.colores.length; i++){
                    if(i === index){
                        this.colores[index].selected = true;
                    }
                    else {
                        this.colores[i].selected = false;
                    }
                }
                
                juego.imagen_derecha = imagen;
            }
        }
    })
let pong_izquierdo = new Vue({
        el: "#colores_pongizquierdo",
        data: {
            colores: [
            {tipo: color_rojo,      valor: "https://i.ibb.co/YhrHWY8/24-Breakout-Tiles.png", selected: false},
            {tipo: color_azul,      valor: "https://i.ibb.co/Ch4V99D/27-Breakout-Tiles.png", selected: true},
            {tipo: color_amarillo,  valor: "https://i.ibb.co/vZByHrh/26-Breakout-Tiles.png", selected: false},
            {tipo: color_verde,     valor: "https://i.ibb.co/jRLDZqs/28-Breakout-Tiles.png", selected: false}
            ],
        },
        methods: {
            elegir : function(boton,imagen){
                let index = this.colores.indexOf(boton);
                for(let i = 0; i < this.colores.length; i++){
                    if(i === index){
                        this.colores[index].selected = true;
                    }
                    else {
                        this.colores[i].selected = false;
                    }
                }
                juego.imagen_izquierda = imagen;    
            }
        }
    })
let colores_bola = new Vue({
        el: "#colores_bola",
        data: {
            colores: [
            {tipo: color_rojo,      valor: "https://i.ibb.co/YhrHWY8/24-Breakout-Tiles.png", selected: false},
            {tipo: color_azul,      valor: "https://i.ibb.co/Ch4V99D/27-Breakout-Tiles.png", selected: false},
            {tipo: color_amarillo,  valor: "https://i.ibb.co/vZByHrh/26-Breakout-Tiles.png", selected: false},
            {tipo: color_verde,     valor: "https://i.ibb.co/jRLDZqs/28-Breakout-Tiles.png", selected: false},
            {tipo: bola_img,        valor: "https://i.ibb.co/qCP3MYV/58-Breakout-Tiles.png", selected: true},
            {tipo: masterball,      valor: "https://i.ibb.co/fqhwsM8/ultra-ball.png",        selected: false},
            {tipo: football,        valor: "https://i.ibb.co/v3qt9sc/football.png",          selected: false},
            {tipo: beachball,       valor: "https://i.ibb.co/nfVGtbW/beach-ball.png",        selected: false},
            {tipo: baseball,        valor: "https://i.ibb.co/xYVSxm4/baseball.png",          selected: false},
            {tipo: basketball,      valor: "https://i.ibb.co/pxJZbx6/basketball-ball.png",   selected: false}
            ],
        },
        methods: {
            elegir : function(boton,imagen){
                let index = this.colores.indexOf(boton);
                for(let i = 0; i < this.colores.length; i++){
                    if(i === index){
                        this.colores[index].selected = true;
                    }
                    else {
                        this.colores[i].selected = false;
                    }
                }
                juego.imagen_bola = imagen;
            }
        }
    })
let fondo_juego = new Vue({
    el: "#fondo_juego",
    data: {
        fondos : [
        {tipo: fondo_clasico, valor: "https://i.ibb.co/4fN1xSc/pong-fondo.png", selected: true},
        {tipo: fondo_espacio, valor: "https://i.ibb.co/fdHfKS5/parallax-space-backgound.png", selected: false},
        {tipo: fondo_montana, valor: "https://i.ibb.co/2Z4wTJM/parallax-mountain-bg.png", selected: false}
        ],
    },
    methods: {
        elegir : function(boton,imagen){
            let index = this.fondos.indexOf(boton);
                for(let i = 0; i < this.fondos.length; i++){
                    if(i === index){
                        this.fondos[index].selected = true;
                    }
                    else {
                        this.fondos[i].selected = false;
                    }
                }
            juego.fondo = imagen;    
        }    
    }
})
//------------------------------------------
}

function draw(){
    if(juego.empezar){
        actualizar_pantalla();
    }
}