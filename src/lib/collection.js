// Model for collection of dogs
export class DogCollection {
  constructor(listId, dogs = []) {
    this.dogs = dogs;
    this.listId = listId;
  }

  breedList = []

  static parseBreed(breed) {
    if (!breed.includes('-')) return { breedName: breed };
    const [subBreedName, breedName] = breed.split('-');

    return { subBreedName, breedName };
  }

  static populateBreeds(breeds) {
    DogCollection.breedList = Object.keys(breeds)
     .reduce((breedList, breedName) => {
       const subBreeds = breeds[breedName]
         .map(subBreedName => `${subBreedName}-${breedName}`);
       return subBreeds.length ? [...breedList, ...subBreeds] : [...breedList, breedName];
     }, []);
  }

  frameImage(img) {
    const frame = document.createElement('div');

    frame.classList.add('dog-frame');
    frame.appendChild(img);

    return frame;
  }

  renderCollection(clickHandler) {
    const dogList = document.getElementById(this.listId);
    dogList.textContent = null;

    this.dogs.forEach(dog => {
      const dogImg = document.createElement('img');
      const framed = this.frameImage(dogImg);
      if (clickHandler) framed.addEventListener('click', clickHandler);

      dogImg.src = dog;
      dogImg.classList.add('dog-picture');
      dogList.appendChild(framed);
    });
  }
}

export class UserCollection extends DogCollection {
  constructor(dogs, listId) {
    super(dogs, listId);

    this.uniqueDogs = this.dogs.reduce((dog, uniqueDogs) => {
      uniqueDogs[dog] = true;
      return uniqueDogs;
    }, {});
  }

  addDog(dog) {
    if (!dog || this.uniqueDogs[dog]) return;
    this.uniqueDogs[dog] = true;
    this.dogs.push(dog);
  }
}

