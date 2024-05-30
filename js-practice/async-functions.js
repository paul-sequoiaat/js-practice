const axios = require('axios');

const getData = async() => {
     //await keyword waits for the response of the API call
    axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(`ERROR ${error}`);
    })
}

getData();
/*Since this console.log statement is outside the async function,
it executes first without waiting for the getData method execution*/
console.log('this executes first');