/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=f50b92f68a3ef12227183f971c30810b';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', handleClick);

function handleClick(e) {
    getUserData().then(function(data) {
        return postData('/post', data);
    }).then(function(data) {
        updateUi(data);
    });
}

async function getUserData () {
    let zip = document.getElementById('zip').value;
    let userResponse = document.getElementById('feelings').value;
    let data = getWeatherData(baseUrl, apiKey, zip, userResponse);
    return data;
}

async function getWeatherData(baseUrl, apiKey, zip, userResponse) {
    let res = await fetch(baseUrl + zip + apiKey);

    try {
        let data = await res.json();
        data = parseData(data, userResponse)
        return data;
    } catch (error) {
        console.log(error);
    }
}

function parseData(data, userResponse) {
    newData = {};
    var d = new Date();
    newData['temperature'] = data['main']['temp'];
    newData['date'] = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
    newData['userResponse'] = userResponse;
    return newData;
}

async function postData(path, data) {
    let res = await fetch(path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function updateUi(data) {
    document.getElementById('date').innerHTML = data['date'];
    document.getElementById('temp').innerHTML = data['temperature'];
    document.getElementById('content').innerHTML = data['userResponse'];
}
