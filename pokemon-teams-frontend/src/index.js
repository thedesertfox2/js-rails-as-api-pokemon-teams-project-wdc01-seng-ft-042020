const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers()
})

function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => {
        trainers.forEach(singleTrainer)
    })
}

function singleTrainer(trainer) {
    
    let main = document.querySelector('main')
    main.innerHTML +=`<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
                        <button data-trainer-id="data-trainer-id-${trainer.id}">Add Pokemon</button>
                        <ul>
                        </ul>
                      </div>`
    let ul = main.querySelector(`.card[data-id="${trainer.id}"]`)
    trainer.pokemon.forEach(pokemon => {
        let li = document.createElement('li')
        let button = document.createElement('button')
        button.className = 'release'
        button.setAttribute('data-pokemon-id', `data-pokemon-id-${pokemon.id}`)
        button.textContent = 'release'
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        li.append(button)
        
        ul.appendChild(li)

    })
    

   
        

}
{/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */}