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

    console.log(url);
    console.log(urlCiudad);
  })
}

  consumirApiMeteorologico()
})

//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
const consumirApiMeteorologico = async() => {
  try {
    const respuesta = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&lang=es&units=metric&appid=10296b0d94cc17bbb77607cca4697bcf',  //La peticion debe ser asincrona
      {headers:{'Accept':'application/json'}
    }); 
    const temperatura = await respuesta.json();
    console.log(temperatura);
    console.log(temperatura.main.temp);
    document.querySelector("#tiempo").innerHTML = Math.trunc(temperatura.main.temp)+" ºC"
    console.log(temperatura.name);
    document.querySelector("#ciudad").innerHTML = temperatura.name
    console.log(temperatura.weather[0].icon) //muestra el id de como esta el dibujo del tiempo
    let imagenTemp = document.querySelector("#iconoTemp");
    let iconoTemp = temperatura.weather[0].icon;
    if(iconoTemp == '03n'){
      imagenTemp.src = "../img/animated/cloudy-day-2.svg"
    }

  } catch (error) {
    
  }
}



//Metodo asincrono para consumir API de CHISTES
let currentJoke ={};
const consumirAPIconAwait = async() => {
  try{
    const respuesta = await fetch('https://icanhazdadjoke.com',  //La peticion debe ser asincrona
      {headers:{'Accept':'application/json'}
    }); 
    //console.log(respuesta)
    const datos = await respuesta.json(); //la respuesta lo transformamos a fomrato Json
    //console.log(datos); //console.log(datos.status)//nos imprime el tipo de respuesta http 
    if(datos.status == 200){
      //Si la repuesta http es 200, entonces imprimira el chiste 
      const acudit = document.querySelector("#chiste");
      acudit.innerHTML = datos.joke; //mostramos al usuario el chiste
      currentJoke.joke = datos.joke;
      console.log("->",currentJoke)
      //mostrara los botones de puntuacion
      document.querySelector("#puntuacion").style.display = "block";
      //getJoke(datos.joke, date);//llamo a la funcion de puntuar los chistes
    }else{
      console.log("Hay algun error");
    }
  }catch(error){
    //console.log(error);
  }

}
const puntuarChiste = function(evento){
  console.log(currentJoke.joke)
  const newJoke = {date : new Date(), joke:currentJoke.joke, points: evento.target.value}
  arrayAcudits.push(newJoke)//objeto joke

  console.log(arrayAcudits);
}

const arrayAcudits = [] //creo un array vacio
const botones = document.querySelectorAll(".btn");
document.querySelector('#rqr').addEventListener('click', () => consumirAPIconAwait())
botones.forEach(boton => {
  boton.addEventListener('click',puntuarChiste)
})

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