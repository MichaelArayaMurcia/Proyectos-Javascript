//La idea del insertion sort es comparar cada uno de los elementos para
//ordenarlos


let arreglos = [1,123,32,12];


function ordenar(arreglo){
    for (let i = 1; i < arreglo.length;i++) {
    	j = i-1;
    	while (j >= 0 && arreglo[i] < arreglo[j]){
    		arreglo[j+1] = arreglo[j];
    		j -= 1;
    	}
    	arreglo[j + 1] = arreglo[i];
    }
    return arreglo
}

arreglo_ordenado = ordenar(arreglos);

console.log(arreglo_ordenado);