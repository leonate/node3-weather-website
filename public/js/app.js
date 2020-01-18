// import { response } from "express";

console.log('Client side js file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

function fetchWeather(location, callback){
    let url = 'http://localhost:3000/weather?address=' + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            callback(data);
        })
    });
}


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetchWeather(location, (data) => {
        if (data.error){
            messageOne.textContent = data.error;        
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })    
} )