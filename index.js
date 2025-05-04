import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>Price: $${game.price}</p>
            <p>Backers: ${game.backers}</p>
        `;
        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

const descriptionContainer = document.getElementById("description-container");
const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const totalGames = GAMES_JSON.length;
const descriptionParagraph = document.createElement("p");
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} ${
    totalGames === 1 ? "game" : "games"
}, and ${numUnfunded} ${numUnfunded === 1 ? "game remains" : "games remain"} unfunded. We need your help to fund these amazing projects!`;
descriptionParagraph.textContent = displayStr;
descriptionContainer.appendChild(descriptionParagraph);

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);
const [firstGame, secondGame, ...rest] = sortedGames;

const topGameElement = document.createElement("h4");
topGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(topGameElement);

const secondGameElement = document.createElement("h4");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
