// Variables
const listaTweets = document.getElementById('lista-tweets')


// Event Listeners

eventListeners()
function eventListeners() {
  // Cuando se envie el formulario
  document.querySelector('#formulario').addEventListener('submit', agregarTweet)

  // Borrar Tweets
  listaTweets.addEventListener('click', borrarTweet)

  // Contenido Cargado
  document.addEventListener('DOMContentLoaded', localStorageListo)
}


// Funciones

// Añadir tweet del formulario
function agregarTweet(e) {
  e.preventDefault()
  // leer el valor del textarea
  const tweet = document.getElementById('tweet').value
  // Crear boton de eliminar
  const botonBorrar = document.createElement('a')
  botonBorrar.classList = 'borrar-tweet'
  botonBorrar.innerText = 'X'

  // Crear elemento y añadirle el contendio a la li
  const li = document.createElement('li')
  li.innerText = tweet
  // añade el boton de borrar al tweet
  li.appendChild(botonBorrar)
  // añade el tweet a la lista
  listaTweets.appendChild(li)

  agregarTweetLocalStorage(tweet)

}

// Borrar Tweets
function borrarTweet(e) {
  e.preventDefault()
  if (e.target.className === 'borrar-tweet') {
    e.target.parentElement.remove()
    borrarTweetLocalStorage(e.target.parentElement.innerText)
  }
}

// Mostrar datos de Local storage en la lista
function localStorageListo() {
  let tweets

  tweets = obtenerTweetsLocalStorage()

  tweets.forEach(function (tweet) {
    // Crear boton de eliminar
    const botonBorrar = document.createElement('a')
    botonBorrar.classList = 'borrar-tweet'
    botonBorrar.innerText = 'X'

    // Crear elemento y añadirle el contendio a la li
    const li = document.createElement('li')
    li.innerText = tweet
    // añade el boton de borrar al tweet
    li.appendChild(botonBorrar)
    // añade el tweet a la lista
    listaTweets.appendChild(li)
  })
}


// Agregar tweets a local storage
function agregarTweetLocalStorage(tweet) {
  let tweets
  tweets = obtenerTweetsLocalStorage()
  // Añadir el nuevo tweet
  tweets.push(tweet)
  // Convertir de string a un array para local storage
  localStorage.setItem('tweets', JSON.stringify(tweets))

}

// Comprobar elementos en local estorage, retorna un arrays
function obtenerTweetsLocalStorage() {
  let tweets
  // Revisamos los valores de local storare
  if (localStorage.getItem('tweets') === null) {
    tweets = []
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'))
  }
  return tweets
}

// Eliminar tweet local storage
function borrarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar

  // Elimina la X del tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1)

  tweets = obtenerTweetsLocalStorage()

  tweets.forEach(function (tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1)
    }
  })

  localStorage.setItem('tweets', JSON.stringify(tweets))
}