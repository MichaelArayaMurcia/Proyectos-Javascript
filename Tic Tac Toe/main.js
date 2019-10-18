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
        let fila = [];
        tablero.push(fila);
        for(let j = 0; j < numero_columnas; j++){
            let boton = document.createElement("button");
            boton.setAttribute("onclick","jugar(this)");
            boton.classList.add("botones");
            div_tablero.appendChild(boton);
            tablero[i][j] = boton;
            // console.log("tablero["+[i]+"]"+"["+[j]+"]");
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
        // Columnas y filas
    const numero_columnas = document.getElementById("numero_columnas").value;
    const numero_filas = document.getElementById("numero_filas").value;
    
    for(let i = 0; i < numero_filas; i++){
        if(tablero[i][0].getAttribute("value") === tablero[i][1].getAttribute("value") && 
           tablero[i][1].getAttribute("value") === tablero[i][2].getAttribute("value") && 
           tablero[i][0].getAttribute("value") !== null)
        {
            let resultado = document.getElementById("resultado");
            resultado.innerHTML = "Ganó " + tablero[i][0].getAttribute("value");
        }
    }
    
    for(let j = 0; j < numero_columnas; j++){
        if(tablero[0][j].getAttribute("value") === tablero[1][j].getAttribute("value") && 
           tablero[1][j].getAttribute("value") === tablero[2][j].getAttribute("value") && 
           tablero[0][j].getAttribute("value") !== null)
        {
            let resultado = document.getElementById("resultado");
            resultado.innerHTML = "Ganó " + tablero[0][j].getAttribute("value");
        }
    }
    
    // for(let k = 0; k < numero_columnas; k++){
    //     if(tablero[0][k].getAttribute("value") === tablero[1][k+1].getAttribute("value") && 
    //       tablero[1][k+1].getAttribute("value") === tablero[2][k+2].getAttribute("value") && 
    //       tablero[0][k].getAttribute("value") !== null)
    //     {
    //         let resultado = document.getElementById("resultado");
    //         resultado.innerHTML = "Ganó " + tablero[0][k].getAttribute("value");
    //     }
    // }
    
}