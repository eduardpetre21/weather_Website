var inputLocation = document.querySelector('form')
var searchLocation = document.querySelector('input')
var messageOne = document.querySelector("#message-1")
var messageTwo = document.querySelector("#message-2")

inputLocation.addEventListener('submit', (e) => {
  e.preventDefault()

messageOne.textContent = 'Loading...'
messageTwo.textContent = ''

  fetch('http://localhost:3000/weather?address=' + searchLocation.value).then(
    response => {
      response.json().then((data) => {
        searchLocation.value.textContent = ''
        if (data.err) {
          messageOne.textContent = data.err
        } else {
          messageOne.textContent = 'Location: ' + data.location
          messageTwo.textContent = 'Forecast: ' + data.forecast
        }
      })
    }
  )
})
