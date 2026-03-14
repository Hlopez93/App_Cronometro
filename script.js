let competidores = [];
let inicio = 0;
let intervalo = null;
let carreraActiva = false;

function agregarCompetidor(){

    let nombre = document.getElementById("nombreCompetidor").value;

    if(nombre === ""){
        alert("Ingrese un nombre");
        return;
    }

    let competidor = {
        nombre: nombre,
        tiempo: null
    };

    competidores.push(competidor);

    document.getElementById("nombreCompetidor").value = "";

    mostrarTabla();
}

function mostrarTabla(){

    let tbody = document.querySelector("#tablaResultados tbody");
    tbody.innerHTML = "";

    competidores.forEach((c, index)=>{

        let fila = tbody.insertRow();

        fila.insertCell(0).innerHTML = "-";
        fila.insertCell(1).innerHTML = c.nombre;
        fila.insertCell(2).innerHTML = c.tiempo ? c.tiempo.toFixed(2) : "-";

        let boton = document.createElement("button");
        boton.innerText = "Llegó";

        boton.onclick = function(){
            registrarTiempo(index);
        };

        let celda = fila.insertCell(3);
        celda.appendChild(boton);

    });
}

function iniciarCarrera(){

    inicio = Date.now();
    carreraActiva = true;

    intervalo = setInterval(actualizarCronometro,50);
}

function actualizarCronometro(){

    let tiempo = (Date.now() - inicio)/1000;

    document.getElementById("cronometro").innerText =
        tiempo.toFixed(2)+" s";
}

function registrarTiempo(index){

    if(!carreraActiva) return;

    if(competidores[index].tiempo !== null) return;

    let tiempo = (Date.now() - inicio)/1000;

    competidores[index].tiempo = tiempo;

    mostrarTabla();
}

function finalizarCarrera(){

    carreraActiva = false;

    clearInterval(intervalo);

    ordenarResultados();
}

function ordenarResultados(){

    competidores.sort((a,b)=>a.tiempo-b.tiempo);

    let tbody = document.querySelector("#tablaResultados tbody");
    tbody.innerHTML = "";

    competidores.forEach((c,index)=>{

        let fila = tbody.insertRow();

        let posicion = index+1;

        let etiqueta = posicion;

        if(posicion===1) etiqueta="🥇 1°";
        if(posicion===2) etiqueta="🥈 2°";
        if(posicion===3) etiqueta="🥉 3°";

        fila.insertCell(0).innerHTML = etiqueta;
        fila.insertCell(1).innerHTML = c.nombre;
        fila.insertCell(2).innerHTML = c.tiempo.toFixed(2);

        fila.insertCell(3).innerHTML = "-";

        if(posicion===1) fila.style.backgroundColor="#ffd700";
        if(posicion===2) fila.style.backgroundColor="#c0c0c0";
        if(posicion===3) fila.style.backgroundColor="#cd7f32";

    });
}

function reiniciarCarrera(){

    competidores = [];

    clearInterval(intervalo);

    document.getElementById("cronometro").innerText="0.00 s";

    mostrarTabla();
}