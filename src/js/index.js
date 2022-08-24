import ancientsData from "../../data/ancients.js";
import difficulties from "../../data/difficulties.js";
import { brownCards, blueCards, greenCards } from "../../data/mythicCards/index.js";

const ancientField = document.querySelector('.ancient-field');

ancientsData.forEach((element, id) => { 
	const card = new Image();
	card.src = element.cardFace;
	card.dataset.id = id;
	card.classList.add("ancient-field__ancient-card");
	card.onload = function () { ancientField.innerHTML += card.outerHTML};
});

let activeAncient = null;

ancientField.addEventListener("click", function (event) {
	if (event.target.tagName == "IMG") { 
		activeAncient?.classList.remove("active");
		activeAncient = event.target;
		activeAncient.classList.add("active");
	}
});





const levelList = document.querySelector('.level');

difficulties.forEach((element, id) => { 
	const levelTitle = document.createElement("li");
	levelTitle.textContent = element.name;
	levelTitle.classList.add("level__name");
	levelTitle.dataset.id = id;
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
