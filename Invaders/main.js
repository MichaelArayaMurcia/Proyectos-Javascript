class Juego{
    constructor(){
        this.largo = 400;
        this.ancho = 350;
        this.velocidad = 3;
        this.columna_enemigos = 5;
        this.fila_enemigos = 3;
        this.balas = 2;
        this.puntuacion = 0;
        this.running = true;
        this.gameover = false;
        this.disparo = false;
        this.empezar = false;
        this.musica = false;
        this.enemigos = [];
        this.nave_img = red_ship;
        this.nave_laser = red_laser;
        this.fondo = fondo_purpura;
        this.modo = "classic";
        this.idioma = "es";
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
        this.dir === "arriba" ? this.y -= juego.velocidad : this.y += juego.velocidad;
        this.y < 0 || this.y > juego.ancho ? this.out = true : this.out = false;
    }
}

class Nave{
    constructor(){
        this.x = juego.largo / 2;
        this.y = juego.ancho - 30;
        this.dx = 0;
        this.largo = 30;
        this.ancho = 30;
        this.balas = [];
        this.imagen = juego.nave_img;
        this.laser = juego.nave_laser;
    }
    show(){
        this.x += this.dx;
        if(this.x + this.largo > juego.largo || this.x < 0){
            this.x += -this.dx;
        }
        image(this.imagen,this.x,this.y,this.largo,this.ancho);
    }
    disparar(){
        if(this.balas.length < juego.balas){
            let posX = this.x + this.largo / 2;
            let posY = this.y - this.ancho;
            this.balas.push(new Bala(posX,posY,"arriba",this.laser));
        }   
    }
}

class Enemigo{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.largo = 30;
        this.ancho = 30;
        this.puntaje = 1;
        this.balas = [];
        this.imagen = green_enemy;
        this.laser = green_laser;
        this.direccion = "derecha";
    }
    show(){
        image(this.imagen,this.x,this.y,this.largo,this.ancho);
    }
    update(){
        if (this.direccion === "derecha"){
            this.x += juego.velocidad;
        }
        else{
            this.x -= juego.velocidad;
        }
    }
    disparar(){
        if(this.balas.length < juego.balas){
            let posX = this.x + this.largo / 2;
            let posY = this.y + this.ancho;
            this.balas.push(new Bala(posX,posY,"abajo",this.laser));
        }   
    }
    caer(){
        this.y += 10;
    }
    cambiar_direccion(){
        if(this.direccion === "derecha"){
            this.direccion = "izquierda";
        }
        else if(this.direccion === "izquierda"){
            this.direccion = "derecha";
        }
    }
}

class Enemigo_no_comodin extends Enemigo {
    constructor(x,y){
        super(x,y);
        this.laser = green_laser;
        this.comodin = false;
        this.puntaje = 1;
    }
}

class Enemigo_comodin extends Enemigo {
    constructor(x,y){
        super(x,y);
        this.laser = blue_laser;
        this.comodin = true;
        this.puntaje = 10;
    }
}

class Fondo {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.largo = juego.largo;
        this.ancho = juego.ancho;
        this.dx = 0;
        this.dy = 0;
    }
    show(){
        image(juego.fondo,this.x,this.y,juego.largo,juego.ancho);    
        image(juego.fondo,this.x,this.y - juego.ancho,juego.largo,juego.ancho);
    }
    update(){
        this.x += this.dx;
        this.y += this.dy;
        if(this.y > juego.ancho){
            this.y = 0;
        }
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
    
    if(juego.modo === "classic"){
        if(primero.x < 0 || ultimo.x + ultimo.largo > juego.largo){
            for(let i in juego.enemigos){
                let enemigo = juego.enemigos[i];
                enemigo.cambiar_direccion();
                enemigo.caer();
            }
        }
    }
    else if(juego.modo === "scroller"){
        for(let i in juego.enemigos){
            let enemigo = juego.enemigos[i];
            if(enemigo.x < 0 || enemigo.x + enemigo.largo > juego.largo){
                enemigo.cambiar_direccion();
                enemigo.caer();
            }
        }
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
    for(let j = 0; j < juego.fila_enemigos;j++){
        for(let i = 0; i < juego.columna_enemigos;i++){
            let x = i * 40;
            let y = j * 34;
            comodin = Math.floor(random(0,2));
            if(comodin === 0){
                enemigo = new Enemigo_no_comodin(x,y); 
                enemigo.imagen = green_enemy;
            } else {
                enemigo = new Enemigo_comodin(x,y);
                enemigo.imagen = blue_enemy;
            }
            
            juego.enemigos.push(enemigo);
        }
    }
}

function destruir_enemigo(i,j){
    let bala = nave.balas[j];
    let enemy = juego.enemigos[i];
    let enemy_largo = enemy.x + enemy.largo;
    let enemy_ancho = enemy.y + enemy.ancho;
    
    if(bala.x > enemy.x && bala.x < enemy_largo && bala.y > enemy.y && bala.y < enemy_ancho){
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
    if(juego.enemigos.length > 0){
        rebotar_enemigos();
        disparo_enemigos();
    }

    else {
        nave.balas = [];
    }

    if(juego.enemigos.length === 0 && juego.modo === "classic"){
        crear_nivel()
    }
    
    for(let i in juego.enemigos){
        let enemigo = juego.enemigos[i];
        
        enemigo.show();
        enemigo.update();
        
        if(choque_jugador(i)){
            juego.gameover = true;
        }
        
        for(let k in enemigo.balas){
            enemigo.balas[k].show();
            enemigo.balas[k].update();
            if(destruir_jugador(k,i)){
                juego.gameover = true;
            }
        }
        
    }
    
    if(juego.modo === "scroller"){
        if(frameCount % 30 === 0){
            let posX = Math.floor(random(10,juego.largo - 30)); 
            let posY = 0; 
    
            enemigo = new Enemigo(posX,posY);
            juego.enemigos.push(enemigo);
        }
    }
}

function manejar_fondo(){
    fondo.show();    
    fondo.update();
}
//-------------------------------------------------------------------
function empezar_juego(){
    const div_menu = document.getElementById("menu");
    const div_canvas = document.getElementById("contenedor");
    const div_botones = document.getElementById("botones");
    const div_config = document.getElementById("configuraciones");
    const juego_modo = document.querySelector(".modo_juego:checked").value;
    
    juego.empezar = true;
    juego.gameover = false;
    juego.modo = juego_modo;
    
    div_menu.style.display = "none";
    div_botones.style.display = "inline-block";
    div_config.style.display = "none";
    div_canvas.style.display = "inline-block";
    
    nave = new Nave();
    
    juego.puntuacion = 0;
    juego.enemigos.length = 0;
    
    if(juego.modo === "scroller"){
        fondo.dy = 3;
    } else {
        crear_enemigos();
        fondo.dx = 0; 
    }
    
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
    let nave_largo = nave.x + nave.largo;
    let nave_ancho = nave.y + nave.ancho;
    
    if(bala.x > nave.x && bala.x < nave_largo && bala.y > nave.y && bala.y < nave_ancho){
        return true;  
    }
}

function crear_nivel(){
    crear_enemigos();
}

function actualizar(){
    let posX = juego.largo / 2;
    let posY = juego.ancho / 2;
    
    manejar_fondo();
    textFont("ArcadeClassicRegular");
    if(!juego.gameover){
        if(juego.running){
            manejar_jugador();
            manejar_enemigos();    
            textAlign(LEFT);
            text("Puntuacion: " + juego.puntuacion,10,300);
        }
        else{
            textAlign(CENTER);
            text("En pausa",posX,posY);
        }
    }
    else{
        textAlign(CENTER);
        text("Perdio ",posX,posY);
        text("Puntuacion " + juego.puntuacion,posX,posY + 20);
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
    red_ship = loadImage("https://i.ibb.co/qWjf46n/player-Ship1-red.png");
    blue_ship = loadImage("https://i.ibb.co/bbZ81dY/player-Ship1-blue.png");
    green_ship = loadImage("https://i.ibb.co/GJghyz2/player-Ship1-green.png");
    orange_ship = loadImage("https://i.ibb.co/GWXtQCf/player-Ship1-orange.png");
    //--------------------------------------------------------------------- 
    green_enemy = loadImage("https://i.ibb.co/9psQc0r/enemy-Green5.png");
    blue_enemy = loadImage("https://i.ibb.co/VCWpR8s/enemy-Blue5.png");
    //---------------------------------------------------------------------- 
    red_laser = loadImage("https://i.ibb.co/F0bYvdD/laser-Red03.png");
    green_laser = loadImage("https://i.ibb.co/ynnzchP/laser-Green05.png");
    blue_laser = loadImage("https://i.ibb.co/g3MK6Wb/laser-Blue02.png");
    //---------------------------- Fondos --------------------------------
    fondo_purpura = loadImage("https://i.ibb.co/k9QBgj7/purple.png");
    fondo_azul = loadImage("https://i.ibb.co/Bf9xbCQ/blue.png");
    fondo_negro = loadImage("https://i.ibb.co/qxPqrNN/black.png");
    fondo_oscuro = loadImage("https://i.ibb.co/m9NLVsr/dark-Purple.png");
    //---------------------------- Banderas --------------------
    bandera_spain = loadImage("https://i.ibb.co/KrrPTrb/bandera-spain.png");
    bandera_usa = loadImage("https://i.ibb.co/3Rgmh5C/bandera-usa.png");
    bandera_brazil = loadImage("https://i.ibb.co/W3xq8nn/bandera-brazil.png");
    bandera_italy = loadImage("https://i.ibb.co/8s0hnrM/bandera-italy.png");
}

function setup(){
    frameRate(30);
    juego = new Juego();
    fondo = new Fondo();
    let canvas = createCanvas(juego.largo,juego.ancho);
    canvas.parent("contenedor");
    
    const messages = {
        en: {
            message: {
                fondo: "background",
                nave: "ship",
                lenguaje: "language",
                modo: "mode"
            }
        },
        es: {
            message: {
                fondo: "fondo",
                nave: "nave",
                lenguaje: "lenguaje",
                modo: "modo"
            }
        },
        pr: {
            message: {
                fondo: "plano de fundo",
                nave: "navio",
                lenguaje: "idioma",
                modo: "modo"
            }
        },
        it: {
            message: {
                fondo: "sfondo",
                nave: "nave",
                lenguaje: "linguaggio",
                modo: "modo"
            }    
        }
    }

    // Create VueI18n instance with options
    const i18n = new VueI18n({
        locale: 'es', // set locale
        messages, // set locale messages
    })
    
        // Create a Vue instance with `i18n` option
    let titulo_fondo = new Vue({ i18n }).$mount('#titulo_fondo');
    let titulo_nave = new Vue({ i18n }).$mount('#titulo_nave');
    let titulo_lenguaje = new Vue({ i18n }).$mount('#titulo_lenguaje');
    let titulo_modo = new Vue({ i18n }).$mount('#titulo_modo');

    let fondo_juego = new Vue({
        el: "#fondo_juego",
        data: {
            fondos : [
                {tipo: fondo_purpura,url: "https://i.ibb.co/k9QBgj7/purple.png", selected: true},
                {tipo: fondo_negro,url: "https://i.ibb.co/qxPqrNN/black.png",selected: false},
                {tipo: fondo_oscuro,url: "https://i.ibb.co/m9NLVsr/dark-Purple.png", selected: false},
                {tipo: fondo_azul,url: "https://i.ibb.co/Bf9xbCQ/blue.png", selected: false}
            ]
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

    let imagen_nave = new Vue({
        el: "#nave_imagen",
        data: {
            naves : [
    {tipo: red_ship, url: "https://i.ibb.co/qWjf46n/player-Ship1-red.png", laser : red_laser,selected: true},
    {tipo: blue_ship, url: "https://i.ibb.co/bbZ81dY/player-Ship1-blue.png",laser : blue_laser,selected: false},
    {tipo: green_ship, url: "https://i.ibb.co/GJghyz2/player-Ship1-green.png", laser : green_laser,selected: false},
    {tipo: orange_ship, url: "https://i.ibb.co/GWXtQCf/player-Ship1-orange.png", laser : red_laser,selected: false}
            ],
        },
        methods: {
            elegir : function(boton,imagen,laser){
                let index = this.naves.indexOf(boton);
                for(let i = 0; i < this.naves.length; i++){
                    if(i === index){
                        this.naves[index].selected = true;
                    }
                    else {
                        this.naves[i].selected = false;
                    }
                }
                juego.nave_img = imagen;   
                juego.nave_laser = laser;
            }    
        }
    })
    
    let lenguaje_juego = new Vue({
        el: "#lenguajes_juego",
        data: {
            idiomas : [
                {url: "https://i.ibb.co/KrrPTrb/bandera-spain.png", selected: true, valor: "es"},
                {url: "https://i.ibb.co/3Rgmh5C/bandera-usa.png", selected: false, valor: "en"},
                {url: "https://i.ibb.co/W3xq8nn/bandera-brazil.png", selected: false, valor: "pr"},
                {url: "https://i.ibb.co/8s0hnrM/bandera-italy.png", selected: false, valor: "it"}
            ],
        },
        methods: {
            elegir : function(boton,idioma){
                let index = this.idiomas.indexOf(boton);
                for(let i = 0; i < this.idiomas.length; i++){
                    if(i === index){
                        this.idiomas[index].selected = true;
                    }
                    else {
                        this.idiomas[i].selected = false;
                    }
                }
                i18n.locale = idioma;
            }  
        },
    })
}

function draw(){
    if(juego.empezar){
        actualizar();
    }
}

//------------------------------- Fin -------------------