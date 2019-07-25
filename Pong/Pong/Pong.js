function setup(){
    createCanvas(300,300);
    pongi = new Pong(0,height/2);
    pongd = new Pong(290,height/2);
    ball = new Ball();
}

function draw(){
    update();     //Crear
    keyPressed(); //Moverse
    rebotar();    //Rebotar
    text(score1,120,10);
    text(score2,240,10);
}
