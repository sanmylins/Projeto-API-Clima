//2a42a4beada34a433fb388b3cb4081a9
//https://api.openweathermap.org/data/2.5/weather?q=Paulista&units=metric&appid=2a42a4beada34a433fb388b3cb4081a9&lang=pt_br



// Variáveis e seleções de elementos 
const apiKey = "2a42a4beada34a433fb388b3cb4081a9";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";
const cityInput = document.querySelector("#city-input");
const searchBt = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherData = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const cityErrorElement = document.querySelector("#error-message span");

const loader = document.querySelector("#loader");


//Funções
const toggleLoader = () => {
     loader.classList.toggle("hide");
};
const getWeatherData = async (city) =>{
     toggleLoader();

     const apiWheatertherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

     const res = await fetch(apiWheatertherURL);
     const data = await res.json();

     toggleLoader();

     return data;

};

//Função que recebe a cidade input, chama a função de requisição dos dados e substutui na tela os elementos html
const showWeatherData = async(city) => {
     //Esconde as informações a cada nova pesquisa 
     hideInformation();

     const data = await getWeatherData(city);
     
     //verifica se a cidade existe e faz o tratamento do erro
     if(data.cod ==="404"){
          showErrorMessage(city);
          return
     }

     cityElement.innerText = data.name;
     tempElement.innerText = parseInt(data.main.temp);
     descElement.innerText = data.weather[0].description;
     weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
     countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
     umidityElement.innerHTML = `${data.main.humidity}%`;
     windElement.innerHTML = `${data.wind.speed} km/h`;

     //Altera a imagem de fundo
     document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

     weatherData.classList.remove("hide");
};

// Funções que escondem os container
const hideInformation = () => {
     errorMessageContainer.classList.add("hide");
     weatherData.classList.add("hide");
}

// tratamento de erro
const showErrorMessage = (city) => {
     cityErrorElement.innerText = city;
     errorMessageContainer.classList.remove("hide");
};

//Eventos
searchBt.addEventListener("click" , (e) =>{
     e.preventDefault(); //evita o envio do formulário

     const city = cityInput.value;

     showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
     if (e.code === "Enter") {

          e.preventDefault();
          const city = e.target.value;
          showWeatherData(city);
     }
})

