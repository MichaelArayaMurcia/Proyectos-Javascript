function insertar(valor){
    var operacion = document.getElementById("operacion");
    operacion.value += valor;
}


function calcular(){
    var operacion = document.getElementById("operacion");
    operacion.value = eval(operacion.value);
   
}


function limpiar(simbolo){
    var operacion = document.getElementById("operacion");
    if (simbolo == "C") {
       operacion.value = ""; 
    } else {
        var largo = parseInt(operacion.value.length);
        operacion.value = operacion.value.slice(0,(largo - 1));
        
    }
    
}