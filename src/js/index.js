import { max } from "lodash";
import ancientsData from "../../data/ancients.js";
import difficulties from "../../data/difficulties.js";
import { brownCards, blueCards, greenCards } from "../../data/mythicCards/index.js";

var _ = require('lodash');

const cardNumberOutputDiv = document.querySelectorAll('.mysthic-card-field__card-counter ');
const cardNumberOutput = {};
cardNumberOutputDiv.forEach(function (cardCount) {
	cardNumberOutput[`${cardCount.dataset.id} ${cardCount.dataset.color}`] = cardCount;
	cardCount.textContent = 0;
})

const ancientField = document.querySelector('.ancient-field');

ancientsData.forEach((element, id) => {
	const card = new Image();
	card.src = element.cardFace;
	card.dataset.id = id;
	card.classList.add("ancient-field__ancient-card");
	card.onload = function () { ancientField.innerHTML += card.outerHTML };
});

let activeAncientTag = null;
ancientField.addEventListener("click", function selectAncient(event) {
	if (event.target.tagName == "IMG") {
		activeAncientTag?.classList.remove("active");
		activeAncientTag = event.target;
		activeAncientTag.classList.add("active");
	}
});

const levelList = document.querySelector('.level');
difficulties.forEach((element) => {
	const levelTitle = document.createElement("li");
	levelTitle.textContent = element.name;
	levelTitle.classList.add("level__name");
	levelTitle.dataset.id = element.id;
	levelList.innerHTML += levelTitle.outerHTML;
});

const cardList = _.cloneDeep({ green: greenCards, brown: brownCards, blue: blueCards });

let activeLevel = null;
levelList.addEventListener("click", function selectLevel(event) {
	if (event.target.tagName == "LI") {
		activeLevel?.classList.remove("active");
		activeLevel = event.target;
		activeLevel.classList.add("active");
	}
});



function randomInteger(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));//randomInteger(0, i);
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}




const button = document.querySelector(".button");

let stageColodaOut = null;
let stage = 0;
let cardIndex = 0;

const cardClosed = document.querySelector(".card-closed");
const cardOpened = document.querySelector(".card-opened");

button.addEventListener("click", function createColoda() {
	if (!activeAncientTag || !activeLevel) { return; }

	const activeAncient = _.cloneDeep(ancientsData[activeAncientTag.dataset.id]);

	const cardListClone = _.cloneDeep(cardList);

	for (let color in cardListClone) {
		for (let dificulty in cardListClone[color]) {
			shuffle(cardListClone[color][dificulty]);
			shuffle(cardListClone[color][dificulty]); // на всякий случай
		}
	}

	const neededCard = {};
	for (let color in cardListClone) {
		neededCard[color] = { cardNumber: 0, cardList: [] };
		neededCard[color].cardNumber = activeAncient.stages.reduce(function (acc, stage, stageIndex) {

			cardNumberOutput[`${stageIndex} ${color}`].textContent = stage[color];

			return acc += stage[color];
		}, 0);
	}

	if (activeLevel.dataset.id == "very easy") { 
		for (let color in neededCard) { 
			let currentCardList = neededCard[color];
			currentCardList.cardList = shuffle(cardListClone[color].easy).splice(0, currentCardList.cardNumber);
			if (currentCardList.cardList.length < currentCardList.cardNumber) { 
				currentCardList.cardList.splice(-1, 0, ...shuffle(cardListClone[color].normal).splice(0, currentCardList.cardNumber - currentCardList.cardList.length));
			}
			shuffle(currentCardList.cardList);
			shuffle(currentCardList.cardList); // на всякий случай
		}
	} else if (activeLevel.dataset.id == "easy") {
		for (let color in neededCard) {
			let currentCardList = neededCard[color];
			//const set = [...cardListClone[color].easy, ...cardListClone[color].normal];
			currentCardList.cardList = shuffle([...cardListClone[color].easy, ...cardListClone[color].normal]).splice(0, currentCardList.cardNumber);
			shuffle(currentCardList.cardList);
			shuffle(currentCardList.cardList); // на всякий случай
		}
	}	else if (activeLevel.dataset.id == "normal") {
		for (let color in neededCard) {
			let currentCardList = neededCard[color];
			//const set = [...cardListClone[color].easy, ...cardListClone[color].normal, ...cardListClone[color].hard];
			currentCardList.cardList = shuffle([...cardListClone[color].easy, ...cardListClone[color].normal, ...cardListClone[color].hard]).splice(0, currentCardList.cardNumber);
			shuffle(currentCardList.cardList);
			shuffle(currentCardList.cardList); // на всякий случай
		}
	}	else if (activeLevel.dataset.id == "hard") {
		for (let color in neededCard) {
			let currentCardList = neededCard[color];
			//const set = [...cardListClone[color].normal, ...cardListClone[color].hard];
			currentCardList.cardList = shuffle([...cardListClone[color].normal, ...cardListClone[color].hard]).splice(0, currentCardList.cardNumber);
			shuffle(currentCardList.cardList);
			shuffle(currentCardList.cardList); // на всякий случай
		}
	} else if (activeLevel.dataset.id == "very hard") {
		for (let color in neededCard) {
			let currentCardList = neededCard[color];
			currentCardList.cardList = shuffle(cardListClone[color].hard).splice(0, currentCardList.cardNumber);
			if (currentCardList.cardList.length < currentCardList.cardNumber) {
				currentCardList.cardList.splice(-1, 0, ...shuffle(cardListClone[color].normal).splice(0, currentCardList.cardNumber - currentCardList.cardList.length));
			}
			shuffle(currentCardList.cardList);
			shuffle(currentCardList.cardList); // на всякий случай
		}
	}

	//console.log(_.cloneDeep(neededCard));

	stageColodaOut = [];
	activeAncient.stages.forEach(function (stage, index) { 
		stageColodaOut[index] = [];
		for (let color in stage) {
			stageColodaOut[index].splice(0, 0, ...neededCard[color].cardList.splice(0, stage[color]));
		}
		shuffle(stageColodaOut[index]);
		shuffle(stageColodaOut[index]); // на всякий случай
	});

	console.log(_.cloneDeep(stageColodaOut));

	cardOpened.hidden = true;
	cardClosed.hidden = false;
	stage = 0;
	cardIndex = 0;
});



cardClosed.addEventListener("click", function () {
	cardOpened.hidden = false;

	cardOpened.src = stageColodaOut[stage][cardIndex].cardFace;
	cardNumberOutput[`${stage} ${stageColodaOut[stage][cardIndex].color}`].textContent = +cardNumberOutput[`${stage} ${stageColodaOut[stage][cardIndex].color}`].textContent - 1;

	cardIndex++;

	if (cardIndex >= stageColodaOut[stage].length) { stage++; cardIndex = 0; }
	if (stage >= stageColodaOut.length) { cardClosed.hidden = true; }
});
