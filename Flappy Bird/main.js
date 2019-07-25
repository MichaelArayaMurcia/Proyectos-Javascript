//------- Estado del juego ---------
var gravedad = 1;
var onscreen = false;
//------- Objetos ------------------
class Bird{
	constructor(x,y,r){
		this.x = x;
		this.y = y;
		this.r = r;
		this.dy = gravedad;
	}
	show(){
		this.y += this.dy;
		fill(255,255,0);
		ellipse(this.x,this.y,this.r);
	}
}
class Pipe{
	constructor(x,y,largo,ancho){
		this.x = x;
		this.y = y;
		this.largo = largo;
		this.ancho = ancho;
		this.dx = 1;
		this.gap = 100;
		this.touch = false;
	}
	show(){
		this.x -= this.dx;
	//----------- Verificar si esta en pantalla --------------------
		if(this.x + this.largo > 0){onscreen = true;}
		else{onscreen = false;}
	//----------- Verificar si lo tocó ------------------------------
		if(bird.x >= this.x && bird.y <= this.y + this.ancho){this.touch = true;}
		else if(bird.x >= this.x && bird.y >= this.y + this.gap + this.ancho){this.touch = true;}
		else{this.touch = false;}
	//----------- Cambiar acorde a lo detectado ----------------------
		if(onscreen === true && this.touch === false){
		    fill(0,255,0);
			rect(this.x,this.y,this.largo,this.ancho);
			rect(this.x,this.y + this.gap + this.ancho,this.largo,(400 - this.y + this.gap + this.ancho));
		}
		if(onscreen === true && this.touch === true){
		    fill(255,0,0);
			rect(this.x,this.y,this.largo,this.ancho);
			rect(this.x,this.y + this.gap + this.ancho,this.largo,(400 - this.y + this.gap + this.ancho));
		}
		if(onscreen === false){
			this.x = 200;
			this.ancho = random(100,201);
			fill(0,255,0);
			rect(this.x,this.y,this.largo,this.ancho);
			rect(this.x,this.y + this.gap + this.ancho,this.largo,(400 - this.y + this.gap + this.ancho));
		}
    }
}
function setup(){
    createCanvas(400,400);
    bird = new Bird(25,200,15);
    pipe1 = new Pipe(100,0,30,random(100,201));
    pipe2 = new Pipe(200,0,30,random(100,201));
}
//------- Funciones ----------------
function update(){
	background(0);
	bird.show();
	pipe1.show();
	pipe2.show();
}
//---------------------------------
function keyPressed(){
    if(keyCode == UP_ARROW){
        bird.y -= 60;
    }
}
//---------------------------------
function draw(){
    update();
}
