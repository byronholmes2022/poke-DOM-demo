const cardContainer = document.getElementById("card-container");
const popupContainer = document.querySelector(".popup");
const popupContent = document.querySelector(".popup-content");
const closePopupBtn = document.getElementById("close-popup");

// function to get Poke data

async function getPokeData() {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    const json = await res.json();
    console.log(json);
    return json.results;
  } catch (err) {
    console.log(err);
  }
}

async function getSinglePokeByName(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const json = await res.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
}
function createPokeCardFrontUI() {
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.classList.add("card-side");
  const cardFrontLogo = document.createElement("img");
  cardFrontLogo.src = "./poke-logo.png";
  cardFront.appendChild(cardFrontLogo);
  return cardFront;
}

function createPopupContentUI(pokemon) {
  const popupContentImg = document.querySelector(".content-left img");
  popupContentImg.src = pokemon.sprites.other["official-artwork"].front_default;
  const popupContentName = document.querySelector(".content-right h3");
  popupContentName.innerText = pokemon.name;
  popupContentHeight = document.getElementById("height");
  popupContentWeight = document.getElementById("weight");
  popupContentHeight.innerText = `Height: ${pokemon.height}`;
  popupContentWeight.innerText = `Weight: ${pokemon.weight}`;
  const popupContentAbilitiesContainer = document.getElementById("abilities");
  let abilitiesText = "Abilities:\n";
  pokemon.abilities.forEach(
    (abilityObj) => (abilitiesText += `${abilityObj.ability.name}\n`)
  );
  popupContentAbilitiesContainer.innerText = abilitiesText;
  popupContainer.classList.add("popup-visible");
  popupContent.classList.add("popup-content-full-size");
}

function createDetailsButtonUI(name) {
  const detailsBtn = document.createElement("button");
  detailsBtn.innerText = "See Details";
  detailsBtn.classList.add("details-btn");
  detailsBtn.addEventListener("click", async () => {
    try {
      const pokemon = await getSinglePokeByName(name);
      console.log(pokemon);
      createPopupContentUI(pokemon);
    } catch (err) {
      console.log(err);
    }
  });
  return detailsBtn;
}

function createPokeCardBackUI(name) {
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.classList.add("card-side");
  const newCardHeading = document.createElement("h3");
  newCardHeading.innerText = name;
  const detailsBtn = createDetailsButtonUI(name);
  cardBack.appendChild(newCardHeading);
  cardBack.appendChild(detailsBtn);
  return cardBack;
}

function createPokeCardUI(pokemon) {
  const newCard = document.createElement("div");

  newCard.classList.add("card");
  const cardFront = createPokeCardFrontUI();
  newCard.appendChild(cardFront);
  const cardBack = createPokeCardBackUI(pokemon.name);
  newCard.appendChild(cardBack);
  return newCard;
}

async function createCardsUI() {
  const pokeData = await getPokeData();
  pokeData.forEach((pokemon) => {
    console.log(pokemon);
    const newCard = createPokeCardUI(pokemon);
    // add the card div to the card-container
    cardContainer.appendChild(newCard);
  });
}

closePopupBtn.addEventListener("click", () => {
  popupContainer.classList.remove("popup-visible");
  popupContent.classList.remove("popup-content-full-size");
});

createCardsUI();
