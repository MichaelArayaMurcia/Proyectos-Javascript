function Tiempo (){
	this.ss = second();
	this.ms = minute();
	this.hs = hour();

	this.end1 = map(this.ss,0,60,0,360);
	this.end2 = map(this.ms,0,60,0,360);
	this.end3 = map(this.hs,0,24,0,360);
};

function Manecilla(){
	this.x1 =  width / 2;
	this.y1 =  height / 2;
	this.x2 = (this.x1 + 20);
	this.y2 = (this.y1 + 20);
	this.angulo = 
};

function setup(){createCanvas(400,400); manecilla = new Manecilla;} 

function update(){
	angleMode(DEGREES);

	background(0);
	
	noStroke();
	fill(255,255,255);
	text(tiempo.hs + ":" + tiempo.ms + ":" + tiempo.ss,180,200);
//----------------- Arcos -----------------------
	stroke(0,0,255);
	strokeWeight(5);
	noFill();
	arc(200,200,200,200,0,tiempo.end1);

	stroke(0,255,255);
	strokeWeight(5);
	noFill();
	arc(200,200,180,180,0,tiempo.end2);

	stroke(255,0,255);
	strokeWeight(5);
	noFill();
	arc(200,200,160,160,0,tiempo.end3);
//-------------------------------------------------
	rectMode(CENTER)
	fill(255,255,255);
	rotate(45);
	line(manecilla.x1,manecilla.y1,manecilla.x2,manecilla.y2);
	
}

function draw(){
	tiempo = new Tiempo();
	update();
	//console.log(tiempo.ss);

}