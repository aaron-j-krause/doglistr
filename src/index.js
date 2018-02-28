import './style.css';
import HttpClient from './lib/http-client';
import { DogCollection, UserCollection } from './lib/collection';

// deregister service workers
navigator.serviceWorker
  .getRegistrations()
  .then(regs => regs.forEach(r => r.unregister()));

var BASE_URL = 'https://dog.ceo/api';
var client = new HttpClient(BASE_URL);
var userDogs = new UserCollection('your-dogs-list');

client.fetch('/breeds/list/all', function(err, response) {
  if (err) return console.log('Error Fetching Breeds', err);

  DogCollection.populateBreeds(response.breeds);
  populateSelector(DogCollection.breedList);
})

function populateSelector(breeds) {
  var selector = document.getElementById('breed-selector');
  var option;

  breeds.forEach(function(breed) {
    option = document.createElement('option');
    option.textContent = breed;
    option.value = breed;
    selector.appendChild(option);
  });

  selector.addEventListener('change', handleSelect);
}

function handleSelect(e) {
  var val = e.target.value;
  var dc;
  if (!val) return;

  var parsedBreed = DogCollection.parseBreed(val);

  var url = '/breed/' + parsedBreed.breedName;

  if (parsedBreed.subBreedName) url += '/' + parsedBreed.subBreedName;

  url += '/images';

  client.fetch(url, function(err, data) {
    dc = new DogCollection('all-dogs-list', data.dogUrls);
    dc.renderCollection(handleDogClick);
  });
}

function handleDogClick(e) {
  var dog = e.target.src;

  userDogs.addDog(dog);
  userDogs.renderCollection();
}
