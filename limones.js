let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=30;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ALTO_LIMON=20
const ANCHO_LIMON=20;

let personajeX=canvas.width/2;
let limonY=0;
let limonX=canvas.width/2;
let personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);
let puntaje=0;
let vidas=3;
let velocidadCaida=100;

function iniciar(){
     setInterval(bajarLimon,velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}

function dibujarSuelo(){
    ctx.fillStyle="violet";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);

}

function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
}


function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="lime";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON);
}

function bajarLimon(){
    limonY = limonY + 10;
    dibujarLimon();
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX+ANCHO_LIMON>personajeX && limonX <personajeX+ALTURA_PERSONAJE &&
        limonY+ALTO_LIMON>personajeY && limonY<personajeY+ALTURA_PERSONAJE
     ){
        //alert("Atrapado!!");
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarEnSpan("txtPuntaje",puntaje);

    }
}

function detectarPiso(){
    if(limonY + ALTO_LIMON==canvas.height-ALTURA_SUELO ){
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpan("txtVidas",vidas);

        if(vidas==0){
            alert("Game Over");

        }
    }
}

function generarAleatorio(min,max){
    let random=Math.random(); //0-1
    let numero=random*(max-min); //0-max
    let numeroEntero = parseInt(numero);
    numeroEntero = numeroEntero+min; // <-- Quitar el "let" aquí
    return numeroEntero;
}


function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}