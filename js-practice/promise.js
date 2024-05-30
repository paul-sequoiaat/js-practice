const axios = require('axios');

function getData(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            reject(`Error: ${error}`)
        })
    });
}

getData('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
