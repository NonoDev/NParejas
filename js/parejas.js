/* Declaración de variables */
var contadorPruebas = 0;
var anterior = null;
var imagenElegida;
var contadorFallos = 0;
var contadorAciertos = 0;
var arrayImagenes = ["images/1.jpeg", "images/2.jpeg", "images/3.jpeg", "images/4.jpeg", "images/5.jpg", "images/6.jpg"];
var cantidadImagenes = arrayImagenes.length;
var arrayPosiciones = new Array(cantidadImagenes);

console.log("Variables inicializadas");
//console.log(cantidadImagenes);

window.onload = function(){
    // Creo las posiciones del array
    var contadorPosiciones = 0;
    while(contadorPosiciones < cantidadImagenes*2){
        var ponerImagen = Math.floor((Math.random() * cantidadImagenes)); // variable para poner las posiciones de las imágenes aleatorias
        var contadorRepetidas = 0; // variable que cuenta los repetidos en el array
        for (var x = 0; x < contadorPosiciones; x++){
            if(arrayPosiciones[x] === ponerImagen) contadorRepetidas++;   
        }
        if(contadorRepetidas < 2){ // compruebo que los numeros se repitan como maximo dos veces
            arrayPosiciones[contadorPosiciones] = ponerImagen;
            contadorPosiciones++;
        }
    }
    //console.log(contadorPosiciones);
    //console.log(arrayPosiciones);
    console.log("Generados los repetidos");
    addEventos(arrayPosiciones);
}

function recogerValor(valor, arrayImagenes){
    console.log("Valor " + valor);
    contadorPruebas++;
    var casillaID = document.getElementById(valor).id;
    var casillaIMG = document.getElementById(valor);
//    console.log(casillaID, casillaIMG);
//    console.log('Anterior: ' + anterior);
//    console.log('CasillaID: ' + casillaID);
    
            
    if(contadorPruebas>1){
        imagenElegida = arrayPosiciones[casillaID];
        var anteriorIMG = document.getElementById(anterior);
        casillaIMG.setAttribute('src', arrayImagenes[imagenElegida]);
        if(arrayPosiciones[casillaID]!=arrayPosiciones[anterior]){
            contadorFallos++;   
            window.setTimeout(function(){
                casillaIMG.setAttribute('src', 'images/0.jpg');
                anteriorIMG.setAttribute('src', 'images/0.jpg');
            },1000);
        }else{
            contadorAciertos++;   
        }
        contadorPruebas = 0;
    }else{
        anterior = casillaID;
        imagenElegida = arrayPosiciones[casillaID];
        casillaIMG.setAttribute('src', arrayImagenes[imagenElegida]);
        //console.log('AnteriorIMG: ' + anteriorIMG);
        contadorPruebas++;
    }
}

function addEventos(listaId){
    var lista = document.getElementsByTagName('img');
    for (i = 0; i < lista.length; i++){
        lista[i].addEventListener('click', function(){recogerValor(this.id, arrayImagenes)});    
    }
    
    //console.log(lista);
    //console.log(listaId);
}

