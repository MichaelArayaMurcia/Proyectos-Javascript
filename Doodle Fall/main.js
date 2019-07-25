class Juego{
	constructor(){
		this.largo = 400;
		this.ancho = 400;
		this.plataformas = [];
		this.gravedad = 1;
	}
}

class Jugador{
	constructor(){
		this.x = 200;
		this.y = 100;
		this.largo = 30;
		this.ancho = 40;
		this.velocidad = 0;
	}
	show(){
		this.velocidad = juego.gravedad;
		this.y += this.velocidad;

		image(personaje,this.x,this.y,this.largo,this.ancho);
	}
}

class Plataforma{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.largo = 50;
		this.ancho = 20;
		this.velocidad = 0;
	}
	show(){
		image(plataforma,this.x,this.y,this.largo,this.ancho);
	}
	actualizar(){
		this.y += -juego.gravedad;
	}
}

function actualizar(){
	image(fondo,0,0,400,400);
	jugador.show();
	for(let i = 0; i < juego.plataformas.length;i++){
		juego.plataformas[i].show();
		juego.plataformas[i].actualizar();

		if(i > 0 && juego.plataformas[i].y <= 0){
			juego.plataformas[i].y = juego.plataformas[i-1].y + Math.random() * 10 + 10;
			juego.plataformas[i].x = Math.random() * 350;

		} 
		else if(i === 0 && juego.plataformas[i].y <= 0){
			juego.plataformas[i].y = Math.random() * 50 + 300;
			juego.plataformas[i].x = Math.random() * 350;

		}
		else if (jugador.x < juego.plataformas[i].x + juego.plataformas[i].largo  && 
			jugador.x + jugador.largo  > juego.plataformas[i].x &&
		jugador.y < juego.plataformas[i].y + juego.plataformas[i].ancho && jugador.y + jugador.ancho > juego.plataformas[i].y) {
    		console.log("Funciono");
    		jugador.velocidad *= -juego.gravedad; 
  		}
	}
}

function keyPressed(){
	if(keyCode === RIGHT_ARROW){
		jugador.x += 20;
	}
	if(keyCode === LEFT_ARROW){
		jugador.x -= 20;
	}
}

function preload(){
	fondo = loadImage("https://i.ibb.co/hLQWbrq/complete.png");
	plataforma = loadImage("https://i.ibb.co/K69qmf9/11-Breakout-Tiles.png");
	personaje = loadImage("https://i.ibb.co/qxf0Ny8/anim8.png");
}

function setup(){
	juego = new Juego();
	jugador = new Jugador();

	for(let i = 0; i < 10;i++){
		juego.plataformas[i] = new Plataforma(Math.random() * 350,Math.random() * 50 + 300);
	}

	createCanvas(juego.largo,juego.ancho);
}

function draw(){
	actualizar();
}