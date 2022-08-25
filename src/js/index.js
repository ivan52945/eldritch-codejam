import ancientsData from "../../data/ancients.js";
import difficulties from "../../data/difficulties.js";
import { brownCards, blueCards, greenCards } from "../../data/mythicCards/index.js";

var _ = require('lodash');

const cardList = {
	green: {
		easy: [],
		normal: [],
		hard: [],
	},
	brown: {
		easy: [],
		normal: [],
		hard: [],
	},
	blue: {
		easy: [],
		normal: [],
		hard: [],
	},
};

const cardNumberOutputDiv = document.querySelectorAll('.mysthic-card-field__card-counter ');
const cardNumberOutput = {};
cardNumberOutputDiv.forEach(function (cardCount) { 
	cardNumberOutput[`${cardCount.dataset.id} ${cardCount.dataset.color}`] = cardCount;
	cardCount.textContent = 0;
})

let cards = _.cloneDeep([...brownCards, ...blueCards, ...greenCards]);

cards.forEach(function (card) {
	cardList[card.color][card.difficulty].push(card);
});

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
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

const button = document.querySelector(".button");

let outputCardStageList = [];
let stage = 0;
let cardIndex = 0;

const cardClosed = document.querySelector(".card-closed");
const cardOpened = document.querySelector(".card-opened");

button.addEventListener("click", function () {
	if (!activeAncientTag || !activeLevel) { return; }

	const activeAncient = _.cloneDeep(ancientsData[activeAncientTag.dataset.id]);

	activeAncient.stages.forEach(function (stage, index) { 
		for (let color in stage) { 
			cardNumberOutput[`${index} ${color}`].textContent = stage[color];
		}
	});

	const nedeedCard = {};

	for (let key in cardList) {
		nedeedCard[key] = activeAncient.stages.reduce((acc, numCards) => { return acc += numCards[key] }, 0);
	}

	const outputCardList = {};

	if (activeLevel.dataset.id == "very easy") {
		for (let key in cardList) {
			outputCardList[key] = [...cardList[key].easy];
			while (outputCardList[key].length > nedeedCard[key]) {
				outputCardList[key].splice(randomInteger(0, outputCardList[key].length - 1), 1);
			}

			if (outputCardList[key].length < nedeedCard[key]) {
				const addCard = [...cardList[key].normal];
				while (addCard.length > (nedeedCard[key] - outputCardList[key].length)) {
					addCard.splice(randomInteger(0, addCard.length - 1), 1);
				}
				outputCardList[key] = [...outputCardList[key], ...addCard];
			}
		}

	}

	const outputCardStageListIn = []

	activeAncient.stages.forEach(function (colorList, stage) { 
		outputCardStageListIn[stage] = [];
		for (let color in colorList) { 
			for (let i = 0; i < colorList[color]; i++) {
				outputCardStageListIn[stage].push(outputCardList[color].splice(randomInteger(0, outputCardList[color].length - 1), 1)[0]);
			}
			shuffle(outputCardStageListIn[stage]);
		}

	});

	outputCardStageList = outputCardStageListIn;
	stage = 0;
	cardIndex = 0;
	cardOpened.hidden = true;
	cardClosed.hidden = false;
	console.log(outputCardStageList);
});



cardClosed.addEventListener("click", function () { 
	console.log(stage,cardIndex);

	cardOpened.src = outputCardStageList[stage][cardIndex].cardFace;
	cardNumberOutput[`${stage} ${outputCardStageList[stage][cardIndex].color}`].textContent = +cardNumberOutput[`${stage} ${outputCardStageList[stage][cardIndex].color}`].textContent - 1;
	cardOpened.hidden = false;
	cardIndex++;

	if (cardIndex >= outputCardStageList[stage].length) { stage++; cardIndex = 0; }
	if (stage >= outputCardStageList.length) { cardClosed.hidden = true; }
});


// npx webpack --config webpack.config.js