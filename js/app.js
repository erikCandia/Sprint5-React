//Metodo que usa promises para consumir una aPI de chistes
// function consumirAPI(){
//   //Fetch peticion GET para consumir API con Promises
//   fetch('https://www.el-tiempo.net/api/json/v2/provincias',{
//     method:'GET',
//     headers:{'Accept':'application/json'}
//   })
//   .then(response => response.json())
//   .then(respuesta => console.log(respuesta.provincias))
// }

//Para mostrar la temperatura actual, nada mas abrir el navegador
window.addEventListener("load", function(){
  let longitud, latitud;
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(posicion => {
    //console.log(posicion.coords.latitude) //devuelve la longitud de mi posicion
    //console.log(posicion.coords.longitude) //devuelve la latitud de mi posicion
    longitud = posicion.coords.longitude
    latitud = posicion.coords.latitude
    //ubicacion por longitud o latitud
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=10296b0d94cc17bbb77607cca4697bcf`;
    //ubicacion por ciudad
    const urlCiudad = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&lang=es&units=metric&appid=10296b0d94cc17bbb77607cca4697bcf`;
    //console.log(url);
    //console.log(urlCiudad);
  })
}
  consumirApiMeteorologico()
})

//API PARA LOS DATOS METEREOLOGICOS
//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
const consumirApiMeteorologico = async() => {
  try {
    const respuesta = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&lang=es&units=metric&appid=10296b0d94cc17bbb77607cca4697bcf',  //La peticion debe ser asincrona
      {headers:{'Accept':'application/json'}
    }); 
    const temperatura = await respuesta.json();
    //console.log(temperatura);
    //console.log(temperatura.main.temp);
    document.querySelector("#tiempo").innerHTML = Math.trunc(temperatura.main.temp)+"ºC"
    //console.log(temperatura.name);
    document.querySelector("#ciudad").innerHTML = temperatura.name
    console.log(temperatura.weather[0].icon) //muestra el id de como esta el dibujo del tiempo
    let imagenTemp = document.getElementById("iconoTemp");
    let iconoTemp = temperatura.weather[0].icon;
    if(iconoTemp == '03n'){
      imagenTemp.src = "../img/animated/cloudy-day-1.svg"
    }else if(iconoTemp == '04n'){
      imagenTemp.src = "/img/animated/cloudy-day-2.svg"
    }else if(iconoTemp == '01n'){
      imagenTemp.src = "/img/animated/cloudy-night-1.svg"
    }
  } catch (error) {
    
  }
}


//Metodo asincrono para consumir API de ACUDITS
let currentJoke;
const points = 0;
const consumirAPIconAwait = async() => {
  try{
    const respuesta = await fetch('https://icanhazdadjoke.com',  //La peticion debe ser asincrona
      {headers:{'Accept':'application/json'}
    }); 
    //console.log(respuesta)
    const datos = await respuesta.json(); //la respuesta lo transformamos a fomrato Json
    //console.log(datos); //console.log(datos.status)//nos imprime el tipo de respuesta http 
    if(datos.status == 200){
      //Si la respuesta http es 200, entonces imprimira el chiste 
      const acudit = document.querySelector("#chiste");
      acudit.innerHTML = datos.joke //mostramos al usuario el chiste
      //mostrara los botones de puntuacion
      document.querySelector("#puntuacion").style.display = "block";
      currentJoke = datos.joke;
      //console.log(currentJoke);

    }else{
      console.log("Hay algun error");
    }
  }catch(error){
    //console.log(error);
  }
}
function puntuarChiste(evento){
  //Añadimos los datos de la API dentro del objeto newJoke toISOString(),
  const newJoke = {date : new Date(Date.now()).toUTCString(), joke:currentJoke, points: evento.target.value}
  arrayAcudits.push(newJoke)//Añadimos el objeto newJoke al array creado
  console.log(arrayAcudits);
}
const arrayAcudits = [] //creo un array vacio
let reportJokes = [] //creo un array vacio
const botones = document.querySelectorAll(".points"); //Capturamos los btn de puntuar los acudits
botones.forEach(boton => {
  boton.addEventListener('click',puntuarChiste) //le agregamos un evento click a cada btn, llamamos a la funcion puntuarChiste
})


// const puntuarChiste = function(evento){
//   const newJoke = {date : new Date(), joke:evento.joke, points: evento.target.value}
//   arrayAcudits.push(newJoke)//objeto newJoke
//   console.log(arrayAcudits);
// }
//funcion para puntuar un chiste y añadirlo al array

// function getJoke(chiste, date){
//  /* let acudits = new Object(); //Creo el onjeto 
//   acudits.date = date;
//   acudits.joke = chiste;
//   acudits.points = 0;*/
//   //puntuacion(arrayAcudits);
//   arrayAcudits.push(acudits);
//   console.log(arrayAcudits);
// }








//JQUERY Libreria de JS igualmente para consumir APIS
// $.ajax({
//   type: 'GET',
//   url: 'https://icanhazdadjoke.com/',
//   dataType: 'json',
//   success: function(data) {
//     //console.log(data)
//   }
// });