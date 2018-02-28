// Model for collection of dogs
export function DogCollection(listId, dogs) {
  dogs = dogs || [];
  this.dogs = dogs;
  this.listId = listId;
};

DogCollection.breedList = [];

DogCollection.parseBreed = function(breed) {
  if (breed.indexOf('-') === -1) return { breedName: breed };

  var breedArray = breed.split('-');
  var breedName = breedArray[1];
  var subBreedName = breedArray[0];
  var parsed = {
    breedName: breedName,
    subBreedName: subBreedName
  };

  return parsed;
};

DogCollection.populateBreeds = function(breeds) {
 var breedList = [];

 Object.keys(breeds).forEach(function(breedName) {
   if (breeds[breedName]) {
     breeds[breedName].forEach(function(subBreed) {
       breedList.push(subBreed + '-' + breedName);
     });
   } else {
      breedList.push(breedName);
   }
 });

 DogCollection.breedList = breedList;
};

DogCollection.prototype.frameImage = function(img) {
  var frame = document.createElement('div');

  frame.classList.add('dog-frame');
  frame.appendChild(img);

  return frame;
};

DogCollection.prototype.renderCollection = function(clickHandler) {
  var self = this;
  var dogList = document.getElementById(this.listId);
  var dogImg;
  var framed;

  dogList.textContent = null;

  this.dogs.forEach(function(dog) {
    dogImg = document.createElement('img');
    framed = self.frameImage(dogImg);
    if (clickHandler) framed.addEventListener('click', clickHandler);

    dogImg.src = dog;
    dogImg.classList.add('dog-picture');
    dogList.appendChild(framed);
  });
};

export function UserCollection(dogs, listId, clickHandler) {
  DogCollection.call(this, dogs, listId, clickHandler);

  this.uniqueDogs = {};
  this.dogs.forEach(function(dog) {
    this.uniqueDogs[dog] = true;
  });
};

UserCollection.prototype = Object.create(DogCollection.prototype);

UserCollection.prototype.addDog = function(dog) {
  if (!dog || this.uniqueDogs[dog]) return;
  this.uniqueDogs[dog] = true;
  this.dogs.push(dog);
};
