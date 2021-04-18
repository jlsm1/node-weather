console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-p1')
const messageTwo = document.querySelector('#message-p2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  //avoid browser refresh

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageOne.textContent = ''

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'ERROR'
                messageTwo.textContent = data.error
                return console.log('ERROR: ', data.error)
            }
            messageOne.textContent = 'Location: ' + data.location
            messageTwo.textContent= 'Forecast: ' + data.forecast.description
        })
    })
})