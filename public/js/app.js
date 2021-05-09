console.log('Client side javascript file is loaded!')



var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var msg1 = document.querySelector('#msg-1');
var msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msg1.textContent = 'loading...';
    msg2.textContent = '';
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                msg1.textContent = '';
                msg2.textContent = data.error;
            } else {
                msg1.textContent = data.location;
                msg2.textContent = data.forcastData.weather_descriptions + '.Temerature is  ' + data.forcastData.temperature + ' and it feels like ' + data.forcastData.feelslike + '. Humidity is ' + data.forcastData.humidity + '%.';
                // console.log(data.forcastData);
                // console.log(data.location);
            }
        })
    });

})