let snowHeight = 0;
let snowDrifts = new Array(20).fill(0);
let particleInterval;
let snowflakeInterval;

function createTrees() {
	const numberOfTrees = Math.ceil(window.innerWidth / 100);

	for (let i = 0; i < numberOfTrees; i++) {
		const tree = document.createElement("div");
		tree.className = "tree";

		const width = 80 + Math.random() * 80;
		const height = 120 + Math.random() * 120;
		const xPos = i * 100 + (Math.random() * 50 - 25);
		const animationDelay = Math.random() * 2;

		tree.style.width = `${width}px`;
		tree.style.height = `${height}px`;
		tree.style.left = `${xPos}px`;
		tree.style.animationDelay = `${animationDelay}s`;

		document.body.appendChild(tree);
	}
}

createTrees();

window.addEventListener("resize", () => {
	document.querySelectorAll(".tree").forEach((tree) => tree.remove());
	createTrees();
});

function createParticle() {
	const particle = document.createElement("div");
	particle.className = "particle";

	const size = Math.random() * 15 + 5;
	const startX = Math.random() * window.innerWidth;
	const duration = Math.random() * 10 + 5;
	const delay = Math.random() * 5;

	particle.style.width = `${size}px`;
	particle.style.height = `${size}px`;
	particle.style.left = `${startX}px`;
	particle.style.animationDuration = `${duration}s`;
	particle.style.animationDelay = `${delay}s`;

	document.body.appendChild(particle);

	setTimeout(() => {
		particle.remove();
		increaseSnowPile(startX);
	}, (duration + delay) * 1000);
}

function increaseSnowPile(x) {
	const snowPile = document.querySelector(".snow-pile");
	const driftIndex = Math.floor((x / window.innerWidth) * snowDrifts.length);
	snowDrifts[driftIndex] = Math.min(snowDrifts[driftIndex] + 0.5, 150);

	const maxHeight = Math.max(...snowDrifts);
	snowPile.style.height = `${maxHeight}px`;
	snowPile.style.clipPath = `polygon(${snowDrifts
		.map((height, index) => {
			const x = (index / (snowDrifts.length - 1)) * 100;
			return `${x}% ${100 - (height / maxHeight) * 100}%`;
		})
		.join(", ")}, 100% 100%, 0% 100%)`;
}

function createSnowflake() {
	const snowflake = document.createElement("div");
	snowflake.className = "snowflake";
	snowflake.innerHTML = "❄";

	const startX = Math.random() * window.innerWidth;
	const fallDuration = Math.random() * 15 + 10;
	const shakeDuration = Math.random() * 3 + 2;
	const size = Math.random() * 2 + 0.5;

	snowflake.style.left = `${startX}px`;
	snowflake.style.fontSize = `${size}em`;
	snowflake.style.animationDuration = `${fallDuration}s, ${shakeDuration}s`;
	snowflake.style.opacity = Math.random() * 0.7 + 0.3;

	document.body.appendChild(snowflake);

	setTimeout(() => {
		snowflake.remove();
		increaseSnowPile(startX);
	}, fallDuration * 1000);
}

let isPlaying = false;
const audio = document.getElementById("christmas-music");

function toggleMusic() {
	if (isPlaying) {
		audio.pause();
		isPlaying = false;
		clearInterval(particleInterval);
		clearInterval(snowflakeInterval);
	} else {
		audio.play();
		isPlaying = true;
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		}
		particleInterval = setInterval(createParticle, 150);
		snowflakeInterval = setInterval(createSnowflake, 150);
		for (let i = 0; i < 40; i++) {
			createParticle();
			createSnowflake();
		}
	}
}

audio.addEventListener("play", () => {
	const title = document.querySelector(".title");
	title.style.animation =
		"fadeIn 2s forwards, scaleUp 2s forwards, textGlow 2s forwards, christmasColors 4s infinite";
});



