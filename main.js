const animalList = [];

const animalTypeImages = ["kitten1.jpg", "kitten2.jpg", "puppy1.jpg", "duckling1.jpg"
]

const animalNameField = document.getElementById("animal-name-field");
const animalDropDown = document.getElementById("animal-type-dropdown");

const animalContainer = document.getElementById("pet-container");

const message = document.getElementById("message-display");

class Pet{
    constructor(name, animalType){
        this.id = animalList.length;
        this.name = name;
        this.animalType = animalType;
        this.tiredness = 50;
        this.hunger = 50;
        this.loniness = 50;
        this.happiness = 50;
    }

    nap(){
        this.tiredness = this.setValue(this.tiredness, -50);
        this.happiness = this.setValue(this.happiness, -20);
        this.hunger = this.setValue(this.hunger, 20);
        this.loniness = this.setValue(this.loniness, 20);
    }

    play(){
        if(this.tiredness < 70){
            this.happiness = this.setValue(this.happiness, 30);
            this.hunger = this.setValue(this.hunger, 20);
            this.tiredness = this.setValue(this.tiredness, 20);
            this.loniness = this.setValue(this.loniness, -10);
        }
    }

    eat(){
        this.hunger = this.setValue(this.hunger, -60);
        this.tiredness = this.setValue(this.tiredness, 10);
    }

    setValue(prop, value){
        return Math.min(100, Math.max(0, (prop + value)));
    }
}

document.getElementById("add-btn").addEventListener("click", (e)=>{
    e.preventDefault();

    if(animalNameField.value === ""){
        return;
    }

    const selectedType = animalDropDown.options[animalDropDown.selectedIndex].value.toLowerCase();

    const animal = new Pet(animalNameField.value, selectedType);

    animalList.push(animal);

    animalNameField.value = "";

    const id = animal.id;
    const animalTypePictures = animalTypeImages.filter(img => img.includes(selectedType));

    let animalPicture = animalTypePictures[Math.floor(Math.random() * animalTypePictures.length )];
    if(!animalPicture){
        animalPicture = "error.jpg";
    }

    const animalElement = document.createElement("div");
    animalElement.className = "pet-container";

    animalElement.innerHTML = `
        <h2 class="center-align">${animal.name}</h2>
        <img class="pet-image" src="img/${animalPicture}">
        </img>
        <ul class="progress-fields">
            <li>
                <label for="${id}-tiredness">Tiredness</label>
                <progress id="${id}-tiredness" value="${animal.tiredness}" max="100"></progress>
            </li>
            <li>
                <label for="${id}-hunger">Hunger</label>
                <progress id="${id}-hunger" value="${animal.hunger}" max="100"></progress>
            </li>
            <li>
                <label for="${id}-loniness">Loniness</label>
                <progress id="${id}-loniness" value="${animal.loniness}" max="100"></progress>
            </li>
            <li>
                <label for="${id}-happiness">Happiness</label>
                <progress id="${id}-happiness" value="${animal.happiness}" max="100"></progress>
            </li>

        </ul>
    `

    const buttonRow = document.createElement("div");
    const napButton = document.createElement("button");
    napButton.textContent = "NAP"
    const playButton = document.createElement("button");
    playButton.textContent = "PLAY"
    const eatButton = document.createElement("button");
    eatButton.textContent = "EAT";
    buttonRow.appendChild(napButton)
    buttonRow.appendChild(playButton)
    buttonRow.appendChild(eatButton)
    
    animalElement.appendChild(buttonRow);
    animalContainer.appendChild(animalElement);

    // const napButton = document.createElement("input");
    // napButton.setAttribute("value", "NAP");
    
    napButton.addEventListener("click", ()=>{
        animal.nap();
        updateProgressBars(animal);
        message.innerText = `${animal.name} is sleeping!`;
    })
    
    playButton.addEventListener("click", ()=>{
        animal.play();
        updateProgressBars(animal);
        message.innerText = `You played with ${animal.name}!`;
    })
    eatButton.addEventListener("click", ()=>{
        animal.eat();
        updateProgressBars(animal);
        message.innerText = `You fed ${animal.name}!`;
    })
})

function updateProgressBars(animal){
    document.getElementById(`${animal.id}-tiredness`).value = animal.tiredness;
    document.getElementById(`${animal.id}-hunger`).value = animal.hunger;
    document.getElementById(`${animal.id}-loniness`).value = animal.loniness;
    document.getElementById(`${animal.id}-happiness`).value = animal.happiness;

    // for(let p in animal){
    //     console.log(`${p}: ${animal[p]}`)
    // }
}