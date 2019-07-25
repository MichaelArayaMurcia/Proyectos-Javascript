function keyPressed(){
    switch(keyCode){
        case(UP_ARROW):
            pongd.y -= speed;
            if(pongd.y == -5){pongd.y += speed;}
            break;
        case(DOWN_ARROW):
            pongd.y += speed;
            if(pongd.y == 255){pongd.y -= speed;}
             break;
        case(87):// W
            pongi.y -= speed;
            if(pongi.y == -5){pongi.y += speed;}
            break;
        case(83):// S
            pongi.y += speed;
            if(pongi.y == 255){pongi.y -= speed;}
            break;
    }
}

function update(){
    background(0);
    noStroke();
//-------------------- Pongs --------------------
    fill(255,255,255);
    rect(0,pongi.y,pongi.ancho,pongi.largo);
    fill(255,255,255);
    rect(290,pongd.y,pongd.ancho,pongd.largo);
//-------------------- Ball ----------------------
    ellipse(ball.x, ball.y, ball.r*2, ball.r*2);
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;
//------------------------------------------------
    if(ball.x > width){
        score1 += 1;
        ball.x = 150;
        ball.y = 150;
        rebotar();
    }
    if(ball.x < 0){
        score2 += 1;
        ball.x = 150;
        ball.y = 150;
        rebotar();
    }
    if(score1 == 5 || score2 == 5){
        ball.x = 0;
        ball.y = 0;
        ball.dx = 0;
        ball.dy = 0;
        text("Juego terminado",150,150);
    }
}
function rebotar(){
    //--------------------- Pong derecho -------------------
    if(ball.x > pongd.x && ball.y > pongd.y && ball.y < (pongd.y + pongd.largo)){
        ball.xspeed = -ball.xspeed;
    }
    //--------------------- Pong izquierdo -------------------
    if(ball.x < pongi.ancho && ball.y > pongi.y && ball.y < (pongi.y + pongi.largo)){
        ball.xspeed = -ball.xspeed;
    }
    //-------------------- Vertical -----------------------------------------
    if (ball.y > height - ball.r || ball.y < ball.r) {
        ball.yspeed = -ball.yspeed;
    }
}
