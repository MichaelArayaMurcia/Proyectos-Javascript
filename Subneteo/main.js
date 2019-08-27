function convertir(){
    res = [];
    numero = document.getElementById("numero").value;
    texto = "";
    resultado = document.getElementById("resultado");
    convertido = 0;
    while (numero >= 1){
        res.push(Math.trunc(numero % 2));
        numero /= 2;
        Math.round(numero);
    }
    for (let i = 0;i < res.length;i++){
        if (res[i] === 1){
            convertido += Math.pow(2,i);
        }
        else{
            convertido += 0;
        }
    }
    resultado.innerHTML += "\nEn binario es: " + res.reverse();
    resultado.innerHTML += "\nEn base 10 es: " + convertido;
    console.log(res);
}
