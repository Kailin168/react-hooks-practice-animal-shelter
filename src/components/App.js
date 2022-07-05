import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(() => {
    // fetch('http://localhost:3001/pets')
    //   .then(res => res.json())
    //   .then(setPets)
    onFindPetsClick()
    // can use to replace the whole fetch request since the function will do a fetch anyway.
  }, [])

  function onFindPetsClick(event) {
    // if (filters.type === "all") {
    //   fetch('http://localhost:3001/pets')
    //     .then(res => res.json())
    //     .then(setPets)
    //   // .then(wholearray => setPets(wholearray))
    // }
    // else if (filters.type === "cat") {
    //   fetch('http://localhost:3001/pets?type=cat')
    //     .then(res => res.json())
    //     .then(setPets)
    // }
    // else if (filters.type === "dog") {
    //   fetch('http://localhost:3001/pets?type=dog')
    //     .then(res => res.json())
    //     .then(setPets)
    // }
    // else if (filters.type === "micropig") {
    //   fetch('http://localhost:3001/pets?type=micropig')
    //     .then(res => res.json())
    //     .then(setPets)
    // }

    // alternative
    // let url = '';
    // if (filters.type === "all") {
    //   url = 'http://localhost:3001/pets';
    // }
    //  else if (filters.type === "cat") {
    //   url = 'http://localhost:3001/pets?type=cat';
    //  }
    //  else if (filters.type === "dog") {
    //   url = 'http://localhost:3001/pets?type=dog';
    //  }
    //  else if (filters.type === "micropig") {
    //   url = 'http://localhost:3001/pets?type=micropig';
    //  }
    //  fetch(url)
    //  .then(res=>res.json())
    //  .then(setPets)
    //  // .then(wholearray => setPets(wholearray))


    let url = '';
    switch (filters.type) {
      case 'all':
        url = 'http://localhost:3001/pets';
        break;
      case 'cat':
        url = 'http://localhost:3001/pets?type=cat';
        break;
      case 'dog':
        url = 'http://localhost:3001/pets?type=dog';
        break;
      case 'micropig':
        url = 'http://localhost:3001/pets?type=micropig';
        break;
      default:
        break;
    }
    fetch(url)
      .then(res => res.json())
      .then(setPets)
    // .then(wholearray => setPets(wholearray))
  }

  function onChangeType(event) {
    setFilters({ type: event.target.value })
  }

  function onAdoptPet(petId) {
    // pet.id is passed from Pet.js and renamed as petId because you can not have a operator in the parameter (operator is . )
    pets.forEach((pet) => {
      if (pet.id === petId && pet.isAdopted) {
        return true
      } else if (pet.id === petId) {
        pet.isAdopted = true
      }
    })
    setPets([...pets])
    fetch(`http://localhost:3001/pets/${petId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isAdopted: true,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
