// Grab documents elements
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

let clicksCounter = 0;

// Link text
playerLivesCount.textContent = playerLives;

// Generate the data
const getData = () => {
  return [
    { imgSrc: "./images/beatles.jpeg", id: 1, name: "beatles" },
    { imgSrc: "./images/books.jpeg", id: 2, name: "books" },
    { imgSrc: "./images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", id: 4, name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", id: 5, name: "joy division" },
    { imgSrc: "./images/map.jpeg", id: 6, name: "map" },
    { imgSrc: "./images/pirateMap.jpeg", id: 7, name: "pirate map" },
    { imgSrc: "./images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
    { imgSrc: "./images/beatles.jpeg", id: 9, name: "beatles" },
    { imgSrc: "./images/books.jpeg", id: 10, name: "books" },
    { imgSrc: "./images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", id: 12, name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", id: 13, name: "joy division" },
    { imgSrc: "./images/map.jpeg", id: 14, name: "map" },
    { imgSrc: "./images/pirateMap.jpeg", id: 15, name: "pirate map" },
    { imgSrc: "./images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
  ];
};

const randomize = () => {
  const cardData = getData();
  //cardData.sort(() => Math.random() - 0.5)

  for (let i = cardData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cardData[i];
    cardData[i] = cardData[j];
    cardData[j] = temp;
  }
  return cardData;
};

const cardGenerator = () => {
  const cardData = randomize();

  // Genetate the HTML
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("img");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    //Attach the info to the card
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    //Attach the cards to section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (event) => {
      card.classList.toggle("toggleCard");
      checkCards(event);
    });
  });
};

//check cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard != null ? clicksCounter++ : (clicksCounter = 0);
  clickedCard.classList.add("flipped");

  if (clicksCounter > 0) {
    clickedCard.style.pointerEvents = "none";
  }

  const flippedCards = document.querySelectorAll(".flipped");

  if (flippedCards.length === 2) {
    const cardsNotFlipped = document.querySelectorAll(".card:not(.flipped)");
    cardsNotFlipped.forEach((card) => (card.style.pointerEvents = "none"));

    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("math");
      enablePointerEvents(cardsNotFlipped, 800);
      removeClass(flippedCards, "flipped");
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.style.pointerEvents = "auto";
        card.classList.remove("flipped");
        enablePointerEvents(cardsNotFlipped, 800);
        setTimeout(() => {
          card.classList.remove("toggleCard");
        }, 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        setTimeout(()=> {restart("try again!")}, 1000);
      }
    }
    clicksCounter = 0;
  }
  const toggledCards = document.querySelectorAll(".toggleCard");
  if(toggledCards.length === 16) {
    setTimeout(() => {restart("You've won!")})
  }
};

const enablePointerEvents = (data, timeout) => {
  setTimeout(() => {
    data.forEach((item) => (item.style.pointerEvents = "auto"));
  }, timeout);
};

const removeClass = (data, name) => {
  data.forEach((item) => item.classList.remove(name));
};

const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => (card.style.pointerEvents = "none"));
  enablePointerEvents(cards, 1000);

  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    // Randomize new setup of cards
    setTimeout(() => {
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
    }, 500);
  });

  playerLives = 6;
  setTimeout(() => {
    playerLivesCount.textContent = playerLives;
  }, 500);

  setTimeout( () => {
    window.alert(text)
  }, 100);
};

cardGenerator();
