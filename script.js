const players = [
  {
    id: "ronaldo-nazario",
    name: "Ronaldo Nazario",
    nickname: "O Fenômeno",
    position: "Striker",
    roles: "ST",
    nation: "Brazil",
    rating: 109,
    card: "Icon Striker",
    image: "r9.jpg",
  },
  {
    id: "johan-cruyff",
    name: "Johan Cruyff",
    nickname: "The Total Footballer",
    position: "Striker",
    roles: "ST / CF",
    nation: "Netherlands",
    rating: 111,
    card: "Icon Striker",
    image: "JOHAN CRUYFF.jpg",
  },
  {
    id: "david-ginola",
    name: "David Ginola",
    nickname: "The Magician",
    position: "Striker",
    roles: "LW / ST",
    nation: "France",
    rating: 111,
    card: "Heroes Striker",
    image: "david ginola.jpg",
  },
  {
    id: "lionel-messi",
    name: "Lionel Messi",
    nickname: "La Pulga",
    position: "Winger",
    roles: "RW / CAM",
    nation: "Argentina",
    rating: 111,
    card: "Inter Miami",
    image: "messi3.jpg",
  },
  {
    id: "gareth-bale",
    name: "Gareth Bale",
    nickname: "The Welsh Wizard",
    position: "Winger",
    roles: "RW / ST",
    nation: "Wales",
    rating: 111,
    card: "Icon Striker",
    image: "bale.jpg",
  },
  {
    id: "cristiano-ronaldo",
    name: "Cristiano Ronaldo",
    nickname: "El Bicho",
    position: "Winger",
    roles: "ST / LW",
    nation: "Portugal",
    rating: 111,
    card: "Al Nassr",
    image: "cr7.jpg",
  },
  {
    id: "zinedine-zidane",
    name: "Zinedine Zidane",
    nickname: "Zizou",
    position: "Midfielder",
    roles: "CAM / CM",
    nation: "France",
    rating: 111,
    card: "Icon Midfielder",
    image: "ZIDANE.jpg",
  },
  {
    id: "ruud-gullit",
    name: "Ruud Gullit",
    nickname: "Captain Dreadlocks",
    position: "Midfielder",
    roles: "CM / CAM / ST",
    nation: "Netherlands",
    rating: 109,
    card: "Icon Midfielder",
    image: "gullit.jpg",
  },
  {
    id: "kevin-de-bruyne",
    name: "Kevin De Bruyne",
    nickname: "King Kev",
    position: "Midfielder",
    roles: "CM / CAM",
    nation: "Belgium",
    rating: 109,
    card: "Napoli",
    image: "de bryuyne.jpg",
  },
  {
    id: "paolo-maldini",
    name: "Paolo Maldini",
    nickname: "Il Capitano",
    position: "Centreback",
    roles: "CB / LB",
    nation: "Italy",
    rating: 111,
    card: "Icon Defender",
    image: "MALDINI.jpeg",
  },
  {
    id: "virgil-van-dijk",
    name: "Virgil van Dijk",
    nickname: "VVD",
    position: "Centreback",
    roles: "CB",
    nation: "Netherlands",
    rating: 111,
    card: "Icon Defender",
    image: "vvd.jpeg",
  },
  {
    id: "laurent-blanc",
    name: "Laurent Blanc",
    nickname: "Le Président",
    position: "Centreback",
    roles: "CB",
    nation: "France",
    rating: 111,
    card: "Icon Defender",
    image: "blanc 2.jpg",
  },
  {
    id: "roberto-carlos",
    name: "Roberto Carlos",
    nickname: "The Bullet Man",
    position: "Fullback",
    roles: "LB",
    nation: "Brazil",
    rating: 111,
    card: "Icon Defender",
    image: "rcarlos.jpg",
  },
  {
    id: "marcelo",
    name: "Marcelo",
    nickname: "The Samba Left-Back",
    position: "Fullback",
    roles: "LB",
    nation: "Brazil",
    rating: 111,
    card: "Icon Defender",
    image: "marcelo.jpg",
  },
  {
    id: "carlos-alberto",
    name: "Carlos Alberto",
    nickname: "O Capitão",
    position: "Fullback",
    roles: "RB",
    nation: "Brazil",
    rating: 111,
    card: "Icon Defender",
    image: "calberto.jpg",
  },
];

const testimonials = [
  {
    image: "testimonial img.jpg",
    alt: "FC Mobile player Selena",
    text: "R9 changed my entire Ultimate Team experience. Defenders do not stand a chance, and building around him makes the game much more fun.",
    author: "Selena",
    job: "FC Mobile player",
  },
  {
    image: "customers.jpg",
    alt: "FC Mobile player Jorge",
    text: "This guide saved my squad. After changing formation and following the player picks, I climbed several divisions in one week.",
    author: "Jorge",
    job: "Division Rivals player",
  },
  {
    image: "testimonial img.jpg",
    alt: "FC Mobile player Amara",
    text: "The player comparisons make upgrades much easier. I can see the trade-offs before spending coins on an overhyped card.",
    author: "Amara",
    job: "Ultimate Team builder",
  },
  {
    image: "customers.jpg",
    alt: "FC Mobile player Diego",
    text: "I finally have one place to shortlist favourites, compare cards and plan my next starting eleven.",
    author: "Diego",
    job: "FC Mobile player",
  },
];

const elements = {
  grid: document.querySelector("#player-grid"),
  search: document.querySelector("#search"),
  position: document.querySelector("#position-filter"),
  sort: document.querySelector("#sort"),
  filters: document.querySelector("#filters"),
  results: document.querySelector("#results-count"),
  empty: document.querySelector("#empty-state"),
  compare: document.querySelector("#compare-content"),
  squadList: document.querySelector("#squad-list"),
  squadCount: document.querySelector("#squad-count"),
  squadProgress: document.querySelector("#squad-progress"),
  toast: document.querySelector("#toast"),
};

function readStoredIds(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value)
      ? value.filter((id) => players.some((player) => player.id === id))
      : [];
  } catch {
    return [];
  }
}

const state = {
  favourites: new Set(readStoredIds("fc-guide-favourites")),
  compare: [],
  squad: readStoredIds("fc-guide-squad").slice(0, 11),
};

function playerById(id) {
  return players.find((player) => player.id === id);
}

function saveState() {
  try {
    localStorage.setItem(
      "fc-guide-favourites",
      JSON.stringify([...state.favourites]),
    );
    localStorage.setItem("fc-guide-squad", JSON.stringify(state.squad));
  } catch {
    showToast("Your browser blocked local saving");
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(
    () => elements.toast.classList.remove("is-visible"),
    2300,
  );
}

function cardTemplate(player) {
  const isFavourite = state.favourites.has(player.id);
  const isCompared = state.compare.includes(player.id);
  const isInSquad = state.squad.includes(player.id);

  return `
    <article class="player-card">
      <div class="player-image-wrap">
        <img src="${player.image}" alt="${player.name} FC Mobile card artwork" loading="lazy">
        <span class="rating-badge" aria-label="Rating ${player.rating}">${player.rating}</span>
        <button
          class="favourite-button"
          type="button"
          data-action="favourite"
          data-id="${player.id}"
          aria-label="${isFavourite ? "Remove" : "Add"} ${player.name} ${isFavourite ? "from" : "to"} favourites"
          aria-pressed="${isFavourite}"
        >${isFavourite ? "♥" : "♡"}</button>
      </div>
      <div class="player-card-body">
        <div class="player-labels">
          <span>${player.position}</span>
          <span class="player-nation">${player.nation}</span>
        </div>
        <h3>${player.name}</h3>
        <p class="nickname">${player.nickname}</p>
        <div class="player-meta">
          <span>${player.roles}</span>
          <span>${player.card}</span>
        </div>
        <div class="player-actions">
          <button
            class="action-button"
            type="button"
            data-action="compare"
            data-id="${player.id}"
            aria-pressed="${isCompared}"
          >${isCompared ? "Selected" : "Compare"}</button>
          <button
            class="action-button"
            type="button"
            data-action="squad"
            data-id="${player.id}"
            aria-pressed="${isInSquad}"
          >${isInSquad ? "In squad" : "Add to squad"}</button>
          <a class="button button-primary wide" href="players/${player.id}.html">
            View full profile
          </a>
        </div>
      </div>
    </article>
  `;
}

function getVisiblePlayers() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  const selectedPosition = elements.position.value;
  const visible = players.filter((player) => {
    const searchable = [
      player.name,
      player.nickname,
      player.nation,
      player.roles,
    ]
      .join(" ")
      .toLocaleLowerCase();
    const matchesQuery = searchable.includes(query);
    const matchesPosition =
      selectedPosition === "all" || player.position === selectedPosition;
    return matchesQuery && matchesPosition;
  });

  return visible.sort((a, b) => {
    if (elements.sort.value === "name") return a.name.localeCompare(b.name);
    if (elements.sort.value === "rating-asc") {
      return a.rating - b.rating || a.name.localeCompare(b.name);
    }
    return b.rating - a.rating || a.name.localeCompare(b.name);
  });
}

function renderPlayers() {
  const visiblePlayers = getVisiblePlayers();
  elements.grid.innerHTML = visiblePlayers.map(cardTemplate).join("");
  elements.results.textContent = `${visiblePlayers.length} of ${players.length} players`;
  elements.empty.hidden = visiblePlayers.length !== 0;
  elements.grid.hidden = visiblePlayers.length === 0;
}

function renderCompare() {
  const selected = state.compare.map(playerById).filter(Boolean);

  if (selected.length < 2) {
    const selectionText =
      selected.length === 1
        ? `${selected[0].name} selected. Choose one more player.`
        : "Choose Compare on any two player cards to see them side by side.";
    elements.compare.innerHTML = `
      <div class="placeholder"><p>${selectionText}</p></div>
    `;
    return;
  }

  const [first, second] = selected;
  const stats = [
    ["Rating", first.rating, second.rating],
    ["Position", first.roles, second.roles],
    ["Nation", first.nation, second.nation],
    ["Card", first.card, second.card],
  ];

  elements.compare.innerHTML = `
    <div class="compare-grid">
      <div class="compare-player">
        <img src="${first.image}" alt="${first.name}">
        <div><strong>${first.name}</strong><span>${first.position}</span></div>
      </div>
      <span class="versus">VS</span>
      <div class="compare-player">
        <img src="${second.image}" alt="${second.name}">
        <div><strong>${second.name}</strong><span>${second.position}</span></div>
      </div>
    </div>
    <div class="compare-stats">
      ${stats
        .map(
          ([label, firstValue, secondValue]) => `
            <div class="compare-stat">
              <strong>${firstValue}</strong>
              <span>${label}</span>
              <strong>${secondValue}</strong>
            </div>`,
        )
        .join("")}
    </div>
  `;
}

function renderSquad() {
  const selected = state.squad.map(playerById).filter(Boolean);
  elements.squadCount.textContent = `${selected.length} / 11`;
  elements.squadProgress.style.width = `${(selected.length / 11) * 100}%`;

  if (selected.length === 0) {
    elements.squadList.innerHTML = `
      <div class="placeholder">
        <p>Your squad is empty. Add up to eleven players from the catalogue.</p>
      </div>
    `;
    return;
  }

  elements.squadList.innerHTML = selected
    .map(
      (player) => `
        <div class="squad-player">
          <img src="${player.image}" alt="" loading="lazy">
          <div>
            <strong>${player.name}</strong>
            <span>${player.roles} · ${player.rating}</span>
          </div>
          <button type="button" data-remove-squad="${player.id}" aria-label="Remove ${player.name} from squad">×</button>
        </div>
      `,
    )
    .join("");
}

function toggleFavourite(id) {
  const player = playerById(id);
  if (!player) return;
  if (state.favourites.has(id)) {
    state.favourites.delete(id);
    showToast(`${player.name} removed from favourites`);
  } else {
    state.favourites.add(id);
    showToast(`${player.name} saved to favourites`);
  }
  saveState();
  renderPlayers();
}

function toggleCompare(id) {
  const player = playerById(id);
  if (!player) return;

  if (state.compare.includes(id)) {
    state.compare = state.compare.filter((playerId) => playerId !== id);
  } else if (state.compare.length === 2) {
    showToast("Remove a selected player before adding another");
    return;
  } else {
    state.compare.push(id);
    showToast(
      state.compare.length === 2
        ? "Comparison ready below"
        : `${player.name} selected for comparison`,
    );
  }
  renderCompare();
  renderPlayers();
}

function toggleSquad(id) {
  const player = playerById(id);
  if (!player) return;

  if (state.squad.includes(id)) {
    state.squad = state.squad.filter((playerId) => playerId !== id);
    showToast(`${player.name} removed from your squad`);
  } else if (state.squad.length >= 11) {
    showToast("Your squad already has eleven players");
    return;
  } else {
    state.squad.push(id);
    showToast(`${player.name} added to your squad`);
  }
  saveState();
  renderSquad();
  renderPlayers();
}

elements.grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "favourite") toggleFavourite(id);
  if (action === "compare") toggleCompare(id);
  if (action === "squad") toggleSquad(id);
});

elements.squadList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-squad]");
  if (button) toggleSquad(button.dataset.removeSquad);
});

elements.filters.addEventListener("input", renderPlayers);
elements.filters.addEventListener("change", renderPlayers);
elements.filters.addEventListener("reset", () => {
  window.setTimeout(renderPlayers);
});

document.querySelector("#clear-compare").addEventListener("click", () => {
  state.compare = [];
  renderCompare();
  renderPlayers();
});

document.querySelector("#clear-squad").addEventListener("click", () => {
  state.squad = [];
  saveState();
  renderSquad();
  renderPlayers();
  showToast("Squad cleared");
});

let testimonialIndex = 0;
let carouselTimer;
const carouselElements = {
  section: document.querySelector(".testimonial-section"),
  image: document.querySelector("#carousel-img"),
  text: document.querySelector("#carousel-text"),
  author: document.querySelector("#carousel-author"),
  job: document.querySelector("#carousel-job"),
  dots: document.querySelector("#carousel-dots"),
};

function renderTestimonial() {
  const testimonial = testimonials[testimonialIndex];
  carouselElements.image.src = testimonial.image;
  carouselElements.image.alt = testimonial.alt;
  carouselElements.text.textContent = `“${testimonial.text}”`;
  carouselElements.author.textContent = testimonial.author;
  carouselElements.job.textContent = testimonial.job;
  carouselElements.dots.innerHTML = testimonials
    .map(
      (_, index) => `
        <button
          class="dot ${index === testimonialIndex ? "is-active" : ""}"
          type="button"
          data-slide="${index}"
          aria-label="Show testimonial ${index + 1}"
          aria-current="${index === testimonialIndex ? "true" : "false"}"
        ></button>
      `,
    )
    .join("");
}

function goToTestimonial(index) {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  renderTestimonial();
}

function startCarousel() {
  window.clearInterval(carouselTimer);
  carouselTimer = window.setInterval(
    () => goToTestimonial(testimonialIndex + 1),
    6500,
  );
}

document
  .querySelector("#carousel-prev")
  .addEventListener("click", () => goToTestimonial(testimonialIndex - 1));
document
  .querySelector("#carousel-next")
  .addEventListener("click", () => goToTestimonial(testimonialIndex + 1));
carouselElements.dots.addEventListener("click", (event) => {
  const dot = event.target.closest("[data-slide]");
  if (dot) goToTestimonial(Number(dot.dataset.slide));
});
carouselElements.section.addEventListener("mouseenter", () =>
  window.clearInterval(carouselTimer),
);
carouselElements.section.addEventListener("mouseleave", startCarousel);

document.querySelector("#player-count").textContent = players.length;
document.querySelector("#year").textContent = new Date().getFullYear();

renderPlayers();
renderCompare();
renderSquad();
renderTestimonial();
startCarousel();
