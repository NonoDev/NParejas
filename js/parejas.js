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
    crearRepetidos();
    //console.log(contadorPosiciones);
    //console.log(arrayPosiciones);
    console.log("Generados los repetidos");
    addEventos(arrayPosiciones);
}

function crearRepetidos(){
    var contadorPosiciones = 0;
    // Creo las posiciones del array
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
    var imagen0 = "";
    var comprobar = 0;
    var alerta = document.getElementById('alerta');
    for(var j = 0; j < lista.length; j++){
        imagen0 = lista[j].src.substring(80);
        console.log(imagen0);
        if(imagen0!=='images/0.jpg'){
            comprobar++;
            if(comprobar == lista.length){
                alerta.innerHTML = "<div data-alert class='alert-box success radius'>Has ganado el juego con "+contadorFallos+" fallos<a href='#' class='close'>&times;</a></div>";
                comprobar = 0;
            }
        }

}
    console.log(contadorFallos);
    console.log(contadorAciertos);
}

// Funcion que reinicia el juego
function reiniciar(){
    for(var i = 0; i < lista.length; i++){
        lista[i].setAttribute('src', 'images/0.jpg');   
    }
    contadorAciertos = 0;
    contadorFallos = 0;
    crearRepetidos();
}
