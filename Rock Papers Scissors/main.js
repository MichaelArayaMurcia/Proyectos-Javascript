function escoger(eleccion,fondo){
	switch(eleccion){
		case("rock"):
			fondo.style.backgroundImage = "url('https://i.ibb.co/NK9sjCg/game-rock.png')";
			fondo.style.backgroundSize  = "100%";
			break;
		case("paper"):
			fondo.style.backgroundImage = "url('https://i.ibb.co/ynmKJRB/game-paper.png')";
			fondo.style.backgroundSize = "100%";
			break;
		case("scissor"):
			fondo.style.backgroundImage = "url('https://i.ibb.co/hKNG9KQ/game-scissors.png')"
			fondo.style.backgroundSize = "100%";
			break;
	}
}

function escoger_jugador(eleccion){
	let fondo = document.getElementById("eleccion_jugador");
	escoger(eleccion,fondo);
}

function escoger_computador(){
	let fondo = document.getElementById("eleccion_computador");
	let opciones = ["rock","paper","scissor"];
	let eleccion = opciones[Math.floor(Math.random() * 3)];
	escoger(eleccion,fondo);

	return eleccion;
}

function verificar(eleccion_jugador,computadora){
	let estado = document.getElementById("estado");
	let jugador = eleccion_jugador;
	let estados = "";

	if(jugador === computadora){
		estados = "Empate";
	}
	else if(jugador === "rock" && computadora === "paper" ||
			jugador === "paper" && computadora === "scissor" ||
			jugador === "scissor" && computadora === "rock")
		{
			estados = "Perdiste"
		}
	else {
		estados = "Ganaste";
	}

	estado.innerHTML = estados;

	return estados;
}

function puntuacion(eleccion_jugador,eleccion_computadora){
	let jugador = document.getElementById("puntaje_jugador");
	let computadora = document.getElementById("puntaje_computadora");

	let puntaje_jugador = parseInt(jugador.getAttribute("value"));
	let puntaje_computadora = parseInt(computadora.getAttribute("value"));

	switch(verificar(eleccion_jugador,eleccion_computadora)){
		case("Ganaste"):
			puntaje_jugador += 1;
			break;
		case("Perdiste"):
			puntaje_computadora += 1;
			break;
		case("Empate"):
			break;
	}

	jugador.innerHTML = "Jugador: " + puntaje_jugador;
	computadora.innerHTML = "PC: " + puntaje_computadora;
	jugador.setAttribute("value",puntaje_jugador);
	computadora.setAttribute("value",puntaje_computadora);

}

function jugar(eleccion_jugador){
	let computadora = escoger_computador();

	escoger_jugador(eleccion_jugador);
	puntuacion(eleccion_jugador,computadora);
}