import ancientsData from "../../data/ancients.js";
import difficulties from "../../data/difficulties.js";
import { brownCards, blueCards, greenCards } from "../../data/mythicCards/index.js";

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

let cards = [...brownCards, ...blueCards, ...greenCards];

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

ancientField.addEventListener("click", function (event) {
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

levelList.addEventListener("click", function (event) {
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



const button = document.querySelector(".button");

button.addEventListener("click", function () {
	if (!activeAncientTag || !activeLevel) { return; }

	const activeAncient = ancientsData[activeAncientTag.dataset.id];

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
		console.log(outputCardList);
	}

});

// npx webpack --config webpack.config.js