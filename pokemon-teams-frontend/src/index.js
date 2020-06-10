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

    let div =  document.createElement('div')
    div.className = 'card'
    div.setAttribute('data-id', `${trainer.id}`)
    div.addEventListener('click', handleClick)

    

    let p = document.createElement('p')
    p.innerText = trainer.name
    let btn = document.createElement('button')
    btn.textContent = 'Add Pokemon'
    btn.setAttribute('data-trainer-id', `${trainer.id}`)

    let ul = document.createElement('ul')

    div.append(p, btn, ul)
    main.append(div)

    trainer.pokemon.forEach(pokemon => {
        let li = document.createElement('li')
        let button = document.createElement('button')
        button.className = 'release'
        button.setAttribute('data-pokemon-id', `${pokemon.id}`)
        button.textContent = 'release'
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        li.append(button)
        ul.appendChild(li)
    })

}

function handleClick(e) {
    if (e.target.innerText === 'Add Pokemon') {
        if (e.target.nextElementSibling.childElementCount < 6){
            addPokemon(e.target.getAttribute('data-trainer-id'), e.target.nextElementSibling)
        }
    } else if (e.target.innerText === 'release') {
        deletePokemon(e.target.getAttribute('data-pokemon-id'), e)
    }
}

function deletePokemon(id, e) {
    fetch(`${POKEMONS_URL}/${id}`,{
        method: 'DELETE'
    }).then(() => e.target.parentElement.remove())
    
}

function addPokemon(id, ul) {
    fetch(`${POKEMONS_URL}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
            id: id
        })
    }).then(res => res.json())
    .then(pokemon => ul.append(createPokemon(pokemon)))
}

function createPokemon(pokemon) {
    let li = document.createElement('li')
    let button = document.createElement('button')
    button.className = 'release'
    button.setAttribute('data-pokemon-id', `${pokemon.id}`)
    button.textContent = 'release'
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    li.appendChild(button)
    return li
}