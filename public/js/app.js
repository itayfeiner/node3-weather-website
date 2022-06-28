//const fetch = require('node-fetch');


console.log('Script filessss')
console.log('Script filessss')



const weatherForm = document.querySelector('form') //grabbing the object
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherImage = document.getElementById("weather")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((respone) => {
    respone.json().then((data) => {
        if(data.error){
            return messageOne.textContent = data.error
        }
        messageOne.textContent = data.region + ', ' + data.country
        messageTwo.textContent = 'It is currently ' + data.forecast + ' with temperture of ' + data.temperture + ' degrees.'
        
    })
})
    
})