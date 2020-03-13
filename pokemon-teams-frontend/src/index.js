const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')

  getPokemon(main)
})

let getPokemon = (list) => {
  fetch(TRAINERS_URL)
  .then(r => r.json())
  .then(trainers => trainers.map(trainer => showTrainer(trainer, list)))
}

let showTrainer = (trainer, list) => {
  const div = document.createElement('div')
  div.className = "card"
  div.dataset.trainerId = trainer.id
  div.innerText = trainer.name
  const br = document.createElement('br')

  const addBtn = document.createElement('button')
  addBtn.dataset.id = trainer.id
  addBtn.innerText = "Add Pokemon"
  // div.insertBefore(br, addBtn)
  
  const ul = document.createElement('ul')

  trainer.pokemons.forEach(pokemon => {
    showPokemon(pokemon)
  })

  function showPokemon(pokemon){
    const li = document.createElement('li')
      li.innerText = `${pokemon.nickname} (${pokemon.species}) `
      const rlsBtn = document.createElement('button')
      rlsBtn.innerText = "Release"
      rlsBtn.className = "release"
      rlsBtn.dataset.pokemonId = pokemon.id
      li.append(rlsBtn)
      ul.append(li)
  
      rlsBtn.addEventListener("click", ()=>{
        fetch(`${POKEMONS_URL}/${pokemon.id}`, {
          method: "DELETE",
        })
        .then(resp => resp.json())
        .then(data => li.remove())
      })
  }

  addBtn.addEventListener("click", ()=> {
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trainer_id: trainer.id
      })
    })
    .then(resp => resp.json())
    .then(pokemon => {
      if (pokemon.error) {
        alert(pokemon.error)
      } else {
        showPokemon(pokemon)
      }
    })
    .catch(whatever => alert('UH OH.'))
  })

  div.append(br, addBtn, ul)
  list.append(div)
}

