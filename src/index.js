import './style.css';
import HttpClient from './lib/http-client';
import { DogCollection, UserCollection } from './lib/collection';

const BASE_URL = 'https://dog.ceo/api';
const client = new HttpClient(BASE_URL);
const userDogs = new UserCollection('your-dogs-list');

client.fetch('/breeds/list/all')
  .then(({ breeds }) => {
    DogCollection.populateBreeds(breeds);
    populateSelector(DogCollection.breedList);
  })
  .catch(err => console.log('There was an error fetching breeds', err));

function populateSelector(breeds) {
  const selector = document.getElementById('breed-selector');
  let option;

  breeds.forEach(breed => {
    option = document.createElement('option');
    option.textContent = breed;
    option.value = breed;
    selector.appendChild(option);
  });

  selector.addEventListener('change', handleSelect);
}

async function handleSelect({ target: { value }}) {
  if (!value) return;

  const { breedName, subBreedName } = DogCollection.parseBreed(value);
  const url = `/breed/${breedName}/${ subBreedName ? `${subBreedName}/` : '' }images`;
  const { dogUrls } = await client.fetch(url);

  const dc = new DogCollection('all-dogs-list', dogUrls);
  dc.renderCollection(handleDogClick);
}

function handleDogClick({ target: { src }}) {
  userDogs.addDog(src);
  userDogs.renderCollection();
}
