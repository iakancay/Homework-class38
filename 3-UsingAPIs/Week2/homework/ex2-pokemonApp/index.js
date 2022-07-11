'use strict';

//const { indexOf } = require('lodash');

/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.
  
  //https://pokeapi.co/api/v2/pokemon
Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
const container = document.querySelector('.container');
const button = document.createElement('button');
button.type = 'button';
button.textContent = 'Get Pokemon!';
container.appendChild(button);
const selectElement = document.createElement('select');
container.appendChild(selectElement);
const imgElement = document.createElement('div');
container.appendChild(imgElement);
const api = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const imgApi = `https://pokeapi.co/api/v2/pokemon/`;

async function fetchData(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Request failed!');
}

async function fetchAndPopulatePokemons(url) {
  try {
    const data = await fetchData(url);
    selectElement.textContent = '';
    data.results.forEach((pokemon) => {
      const option = document.createElement('option');
      option.value = data.results.indexOf(pokemon) + 1;
      option.textContent = pokemon.name;
      selectElement.appendChild(option);
    });
  } catch (err) {
    console.log(err);
  }
}

async function fetchImage(url) {
  try {
    const select = document.querySelector('select');
    const pokemonIndex = select.options[select.selectedIndex].value;
    const data = await fetchData(`${url}${pokemonIndex}/`);
    const imgUrl = data.sprites.other['official-artwork'].front_default;
    const img = document.createElement('img');
    img.src = imgUrl;
    imgElement.textContent = ' ';
    imgElement.appendChild(img);
  } catch (err) {
    console.log(err);
  }
}

function main() {
  button.addEventListener('click', () => fetchAndPopulatePokemons(api));
  selectElement.addEventListener('change', () => fetchImage(imgApi));
}
window.addEventListener('load', main);
