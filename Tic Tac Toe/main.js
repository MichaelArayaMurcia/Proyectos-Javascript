let tablero = [];
let jugado = false;

function empezar_juego(){
    // Divs
    const div_container = document.getElementById("container");
    const div_datos = document.getElementById("datos");
    const div_tablero = document.getElementById("tablero");
    
    // Columnas y filas
    const numero_columnas = document.getElementById("numero_columnas").value;
    const numero_filas = document.getElementById("numero_filas").value;
    
    // Imagen y elecciones 
    const eleccion_jugador_valor = document.querySelector(".eleccion_jugador:checked").value;
    const imagen_jugador_src = document.querySelector("#"+eleccion_jugador_valor).src;
    const imagen = document.createElement("img");
    div_datos.appendChild(imagen);
    
    // Control de imagenes
    imagen.setAttribute("src",imagen_jugador_src);
    imagen.setAttribute("id","imagen_jugador");
    imagen.setAttribute("value",eleccion_jugador_valor);
    
    // Estilos que mostrar y que no 
    div_container.style.display = "none";
    div_datos.style.display = "inline-block";
    div_tablero.style.display = "block";
    
    for(let i = 0; i < numero_filas; i++){
        for(let j = 0; j < numero_columnas; j++){
            let boton = document.createElement("button");
            boton.setAttribute("onclick","jugar(this)");
            boton.classList.add("botones");
            div_tablero.appendChild(boton);
            tablero.push(boton);
        }
        let salto = document.createElement("br");
        div_tablero.appendChild(salto);
    }
    
}


function jugar(boton){
    const eleccion_jugador = document.getElementById("imagen_jugador");
    const eleccion_jugador_valor = eleccion_jugador.getAttribute("value");
    const imagen_jugador_src = eleccion_jugador.getAttribute("src");
    
    boton.style.backgroundImage = 'url('+imagen_jugador_src+')';
    boton.style.backgroundSize = "100%";
    boton.setAttribute("disabled",true);
    boton.setAttribute("value",eleccion_jugador);
    boton.setAttribute("value",eleccion_jugador_valor);
    boton.setAttribute("onclick",revisar(boton));
    
    if(eleccion_jugador_valor == "X"){
        eleccion_jugador.setAttribute("value","O");
        eleccion_jugador.setAttribute("src","https://i.ibb.co/j4n3VMs/o.png");
    } 
    else {
        eleccion_jugador.setAttribute("value","X");
        eleccion_jugador.setAttribute("src","https://i.ibb.co/7Xn4G0F/x.png");
    }
    
}

function revisar(boton){
    if(jugado){
        if(tablero[0].getAttribute("value") == tablero[1].getAttribute("value") && 
            tablero[1].getAttribute("value") == tablero[2].getAttribute("value"))
        {
                console.log("Gano");
        }
    }
    else {
        jugado = true;
    }
}

function crear(){
    // Columnas y filas
    let numero_columnas = document.getElementById("numero_columnas").value;
    let numero_filas = document.getElementById("numero_filas").value;
    let total = (numero_columnas * numero_filas);
    
    for(let i = 0; i < total;i++){


    }

}
