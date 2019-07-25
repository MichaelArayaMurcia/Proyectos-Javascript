class Juego{
  constructor(){
    this.canvas = document.getElementById('tutorial');
    this.ctx = this.canvas.getContext('2d');
    this.base = new Image();
    this.base.src = 'https://i.ibb.co/mzPj67g/base.png';
    base.onload = function() {this.ctx.drawImage(this.base, 0, 0);};
  }
}

class Jugador{

}

class Bloque{

}

class Ball{

}
juego = new Juego();
