class Juego{
    constructor(){
        this.largo = 400;
        this.ancho = 350;
        this.unidad = 30;
        this.velocidad = 3;
        this.columnaenemigos = 5;
        this.filadeenemigos = 3;
        this.balas = 2;
        this.puntuacion = 0;
        this.running = true;
        this.gameover = false;
        this.direccion = false;
        this.disparo = false;
        this.empezar = false;
        this.musica = false;
        this.enemigos = [];
        this.fondo = fondo_clasico;
        this.sonido = new Audio("http://k007.kiwi6.com/hotlink/7di9miccg9/sfx_laser1.ogg");
    }
}

class Bala{
    constructor(x,y,dir,imagen){
        this.x = x;
        this.y = y;
        this.largo = 5;
        this.ancho = 10;
        this.dir = dir;
        this.hit = false;
        this.out = false;
        this.imagen = imagen;
    }
    show(){
        image(this.imagen,this.x,this.y,this.largo,this.ancho);
    }
    update(){
        this.dir ? this.y -= juego.velocidad : this.y += juego.velocidad;
        this.y < 0 || this.y > juego.ancho ? this.out = true : this.out = false;
    }
}

class Nave{
    constructor(){
        this.x = juego.largo / 2;
        this.y = juego.ancho - juego.unidad;
        this.dx = 0;
        this.largo = juego.unidad;
        this.ancho = juego.unidad;
        this.balas = [];
        this.laser = playerlaser;
    }
    show(){
        this.x += this.dx;
        if(this.x + this.largo > juego.largo || this.x < 0){
            this.x += -this.dx;
        }
        image(ship,this.x,this.y,this.largo,this.ancho);
    }
    disparar(){
        if(this.balas.length < juego.balas){
            this.balas.push(new Bala((this.x + this.largo / 2),this.y - this.ancho,true,this.laser));
            if(juego.musica){
                juego.sonido.play();
            }
        }   
    }
}

class Enemigo{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.largo = juego.unidad;
        this.ancho = juego.unidad;
        this.caer = 10;
        this.puntaje = 0;
        this.balas = [];
        this.imagen = null;
        this.laser = enemylaser;
    }
    show(){
        image(this.imagen,this.x,this.y,this.largo,this.ancho);
    }
    update(){
        if (juego.direccion === true){
            this.x += juego.velocidad;
        }
        else{
            this.x -= juego.velocidad;
        }
    }
    disparar(){
        if(this.balas.length < juego.balas){
            this.balas.push(new Bala((this.x + this.largo / 2),this.y + this.ancho,false,this.laser));
            if(juego.musica){
                juego.sonido.play();
            }
        }   
    }
}

class Enemigo_no_comodin extends Enemigo {
    constructor(x,y){
        super(x,y);
        this.comodin = false;
        this.puntaje = 1;
    }
}

class Enemigo_comodin extends Enemigo {
    constructor(x,y){
        super(x,y);
        this.comodin = true;
        this.puntaje = 10;
    }
}
//-----------------------------------------------------------------
function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

function ordenar(array) {
  for(let i = 0; i < array.length; i++) {
    for(let j = 1; j < array.length; j++) {
      if(array[j - 1].x > array[j].x && array[j - 1].y < array[j].y) {
        swap(array, j - 1, j);
      }
    }
  }
  return array;
}
//-----------------------------------------------------------------  
function rebotar_enemigos(){
    let primero = juego.enemigos[0];
    let ultimo = juego.enemigos[juego.enemigos.length - 1];
    
    if(primero.x < 0 || ultimo.x + ultimo.largo > juego.largo){
        juego.direccion = !juego.direccion;
        descender_enemigos();
    }
}

function descender_enemigos(){
    for (let i in juego.enemigos){
        juego.enemigos[i].y += juego.enemigos[i].caer;
    }
}

function disparo_enemigos(){
    if(frameCount % 40 === 0){
        let i = Math.floor(random(0,juego.enemigos.length - 1));
        let enemigo = juego.enemigos[i];
        enemigo.disparar();
    }
}

function crear_enemigos(){
    for(let j = 0; j < juego.filadeenemigos;j++){
        for(let i = 0; i < juego.columnaenemigos;i++){
            
            let x = i * 40;
            let y = j * 34;
            comodin = Math.floor(random(0,2));
            if(comodin === 0){
                enemigo = new Enemigo_no_comodin(x,y); 
                enemigo.imagen = enemy1;
            } else {
                enemigo = new Enemigo_comodin(x,y);
                enemigo.imagen = enemy2;
            }
            
            juego.enemigos.push(enemigo);
        }
    }
}

function destruir_enemigo(i,j){
    let bala = nave.balas[j];
    let enemy = juego.enemigos[i];
    
    if(bala.x > enemy.x && bala.x < enemy.x + enemy.largo && bala.y > enemy.y && bala.y < enemy.y + enemy.ancho){
        juego.puntuacion += enemy.puntaje;
        return true;  
    }
}
//------------------------------------------------------------------
function manejar_jugador(){
    nave.show();
    for(let j in nave.balas){
        nave.balas[j].show();
        nave.balas[j].update();
        for(let i in juego.enemigos){
            if(destruir_enemigo(i,j)){
                nave.balas[j].hit = true;
                juego.enemigos.splice(i,1);
                ordenar(juego.enemigos);
            }
        }
        if(nave.balas[j].hit === true || nave.balas[j].out === true){
            nave.balas.splice(j,1);
        }
        else if((nave.balas[j].y + nave.balas[j].largo) < 0){
            nave.balas[j].out = true;
        }
    }
}

function manejar_enemigos(){
    for(let i in juego.enemigos){
        juego.enemigos[i].show();
        juego.enemigos[i].update();
        if(choque_jugador(i)){
            juego.gameover = true;
        }
        for(let k in juego.enemigos[i].balas){
            juego.enemigos[i].balas[k].show();
            juego.enemigos[i].balas[k].update();
            if(destruir_jugador(k,i)){
                juego.gameover = true;
            }
        }
    }

    if(juego.enemigos.length > 0){
        rebotar_enemigos();
        disparo_enemigos();
    }
    else{
        crear_nivel()
    }
}
//-------------------------------------------------------------------
function empezar_juego(){
    const div_menu = document.getElementById("menu");
    const div_canvas = document.getElementById("contenedor");
    const div_botones = document.getElementById("botones");
    const div_config = document.getElementById("configuraciones");
    
    juego.empezar = true;
    juego.gameover = false;
    
    
    div_menu.style.display = "none";
    div_botones.style.display = "inline-block";
    div_config.style.display = "none";
    div_canvas.style.display = "inline-block";
    
    nave = new Nave();
    
    juego.enemigos.length = 0;
    
    crear_enemigos();
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
//---------------------------------------------------------------------
function choque_jugador(i){
    let enemigo = juego.enemigos[i];
    if(enemigo.x > nave.x && enemigo.x < nave.x + nave.largo && enemigo.y + enemigo.ancho > nave.y){
        return true;
    }
}

function destruir_jugador(i,k){
    let bala = juego.enemigos[k].balas[i];
    
    if(bala.x > nave.x && bala.x < nave.x + nave.largo && bala.y > nave.y && bala.y < nave.y + nave.ancho){
        return true;  
    }
}

function crear_nivel(){
    crear_enemigos();
}

function actualizar(){
    image(juego.fondo,0,0,juego.largo,juego.ancho);
    if(!juego.gameover){
        if(juego.running){
            manejar_jugador();
            manejar_enemigos();    
            textAlign(LEFT);
            text("Puntuacion: " + juego.puntuacion,10,300);
        }
        else{
            textAlign(CENTER);
            text("En pausa",juego.largo / 2,juego.ancho / 2);
        }
    }
    else{
        textAlign(CENTER);
        text("Perdio ",juego.largo / 2,juego.ancho / 2);
        text("Puntuacion " + juego.puntuacion,juego.largo / 2,juego.ancho / 2 + 20);
    }
}
//--------------------------------------------------------------------
function touchStarted(){
    if(juego.empezar){
        nave.disparar();
    }
}

function touchMoved(){
    if(juego.empezar){
        nave.x = mouseX;
    }
}

function mouseMoved(){
    if(juego.empezar){
        nave.x = mouseX;
    }
}

function keyPressed(){
    switch(keyCode){
        case(RIGHT_ARROW):
            nave.dx += juego.velocidad;
            break;
        case(LEFT_ARROW):
            nave.dx -= juego.velocidad;
            break;
        case(UP_ARROW):
            nave.disparar();
            break;
        case(32): // Barra espaciadora
            pantalla_pausa();
            break;
    }
}

function keyReleased(){
    if (key != " ") {
        nave.dx = 0;
    }
}

function preload(){
    ship = loadImage("https://i.ibb.co/qWjf46n/player-Ship1-red.png");
    enemy1 = loadImage("https://i.ibb.co/9psQc0r/enemy-Green5.png");
    enemy2 = loadImage("https://i.ibb.co/VCWpR8s/enemy-Blue5.png");
    playerlaser = loadImage("https://i.ibb.co/F0bYvdD/laser-Red03.png");
    enemylaser = loadImage("https://i.ibb.co/ynnzchP/laser-Green05.png");
    //---------------------------- Fondos --------------------------------
    fondo_clasico = loadImage("https://i.ibb.co/k9QBgj7/purple.png");
    fondo_espacio = loadImage("https://i.ibb.co/fdHfKS5/parallax-space-backgound.png");
    fondo_montana = loadImage("https://i.ibb.co/2Z4wTJM/parallax-mountain-bg.png");
}

function setup(){
    juego = new Juego();
    let canvas = createCanvas(juego.largo,juego.ancho);
    canvas.parent("contenedor");
    let fondo_juego = new Vue({
    el: "#fondo_juego",
    data: {
        fondos : [
        {tipo: fondo_clasico, valor: "https://i.ibb.co/k9QBgj7/purple.png", selected: true},
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
}

function draw(){
    if(juego.empezar){
        actualizar();
    }
}

//------------------------------- Fin -------------------