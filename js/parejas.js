/* Declaración de variables */
var contadorPruebas = 0;
var anterior = null;
var imagenElegida;
var contadorFallos = 0;
var contadorAciertos = 0;
var arrayImagenes = ["images/1.jpeg", "images/2.jpeg", "images/3.jpeg", "images/4.jpeg", "images/5.jpg", "images/6.jpg"];
var cantidadImagenes = arrayImagenes.length;
var arrayPosiciones = new Array(cantidadImagenes);
var lista = document.getElementsByTagName('img'); 
var final = false;

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

// Recojo el valor de la imagen en la que se hace click y la cambio para comparar las parejas
function cambiarImagenes(valor, arrayImagenes){
//    console.log("Valor " + valor);
    contadorPruebas++;
    var casillaID = document.getElementById(valor).id;
    var casillaIMG = document.getElementById(valor);

    // Si ya se ha hecho click en una imagen, compruebo la segunda
    if(contadorPruebas>1){
        imagenElegida = arrayPosiciones[casillaID];
        var anteriorIMG = document.getElementById(anterior);
        casillaIMG.setAttribute('src', arrayImagenes[imagenElegida]);
        casillaIMG.setAttribute('name', 'cambiada');
        // Si es diferente a la anterior, vuelvo a poner la imagen inicial tras 1 segundo
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
    // Si es igual, las dejo cambiadas con la nueva imagen
    }else{
        anterior = casillaID;
        imagenElegida = arrayPosiciones[casillaID];
        casillaIMG.setAttribute('src', arrayImagenes[imagenElegida]);
        casillaIMG.setAttribute('name', 'cambiada');
        //console.log('AnteriorIMG: ' + anteriorIMG);
        contadorPruebas++;
    }
    terminar();
}

// Añado los eventos onclick a todas las imagenes
function addEventos(listaId){
    for (var i = 0; i < lista.length; i++){
        lista[i].addEventListener('click', function(){cambiarImagenes(this.id, arrayImagenes)});    
    }
    var btnreiniciar = document.getElementById('reiniciar');
    btnreiniciar.addEventListener('click', function(){reiniciar()});
}

// Funcion que comprueba que se ha terminado el juego
function terminar(){
    for(var x = 0; x < lista.length; x++){
        
//        if(lista[x].name == 'cambiada' && lista[x].name != ''){
//            //final = true;
//            console.log('No fin');
//        }else{
//            //final = false; 
//           // alert('Fin');
//            console.log('fin');
//        }
        //console.log(lista[0].src);
}
}

// Funcion que reinicia el juego
function reiniciar(){
    for(var i = 0; i < lista.length; i++){
        lista[i].setAttribute('src', 'images/0.jpg');   
        contadorAciertos = 0;
        contadorFallos = 0;
    }
}
