console.log('Client Side JS is loaded');

const weatherData = (address)=>{
    message.textContent = 'Loading...';
    errMess.textContent = '';
    locationMess.textContent = '';
    const URL = 'http://localhost:3000/weather?address='+address;
    fetch(URL).then(
    (response)=>{
        response.json().then(
            (data)=>{
                if(data.errorMess){
                    message.textContent = '';
                    locationMess.textContent = '';
                    errMess.textContent = data.errorMess;
                }
                else
                {
                    locationMess.textContent = data.location;
                    message.textContent = data.forcast;
                }
            }
        );
    }
    );
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message = document.querySelector('#message');
const locationMess = document.querySelector('#location');
const errMess = document.querySelector('#errMess');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    weatherData(location);
});