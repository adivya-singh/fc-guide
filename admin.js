const API_URL = "http://localhost:3000/api/players";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token) {
  window.location.href = "login.html";
}

if (!user || !user.isAdmin) {
  document.body.innerHTML = `
    <h1 style="text-align:center;margin-top:100px;">
      Access Denied
    </h1>
  `;

  throw new Error("Not Admin");
}
const playersList = document.querySelector("#players-list");
const playerForm = document.querySelector("#player-form");
const submitBtn = document.querySelector("#submit-btn");
const cancelBtn = document.querySelector("#cancel-btn");
let editingPlayerId = null;
submitBtn.textContent = "Add Player";

async function loadPlayers() {
  try {
    const response = await fetch(API_URL);

    const players = await response.json();

    playersList.innerHTML = players
      .map(
        (player) => `
     <div class="player-item">

    <div class="player-info">
        <h3>${player.name}</h3>
        <p>${player.position} • ${player.rating}</p>
    </div>

    <div class="player-actions">
        <button data-id="${player.id}" class="edit-btn">
            Edit
        </button>

        <button data-id="${player.id}" class="delete-btn">
            Delete
        </button>
    </div>

</div>
    `,
      )
      .join("");
  } catch (error) {
    console.error(error);
  }
}

loadPlayers();
playersList.addEventListener("click", async function (e) {
  const playerId = e.target.dataset.id;

  if (e.target.classList.contains("delete-btn")) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this player?",
    );

    if (!confirmDelete) return;

    const response = await fetch(`${API_URL}/${playerId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      editingPlayerId = null;

      playerForm.reset();

      submitBtn.textContent = "Add Player";

      loadPlayers();
    }
  }
  if (e.target.classList.contains("edit-btn")) {
    const response = await fetch(`${API_URL}/${playerId}`);

    const player = await response.json();

    editingPlayerId = player.id;
    submitBtn.textContent = "Save Changes";

    document.querySelector("#name").value = player.name;
    document.querySelector("#nickname").value = player.nickname;
    document.querySelector("#position").value = player.position;
    document.querySelector("#roles").value = player.roles;
    document.querySelector("#nation").value = player.nation;
    document.querySelector("#rating").value = player.rating;
    document.querySelector("#card").value = player.card;
    document.querySelector("#image").value = player.image;
  }
});

playerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const player = {
    id: document
      .querySelector("#name")
      .value.toLowerCase()
      .replace(/\s+/g, "-"),

    name: document.querySelector("#name").value,

    nickname: document.querySelector("#nickname").value,

    position: document.querySelector("#position").value,

    roles: document.querySelector("#roles").value,

    nation: document.querySelector("#nation").value,

    rating: Number(document.querySelector("#rating").value),

    card: document.querySelector("#card").value,

    image: document.querySelector("#image").value,
  };
  let response;

  if (editingPlayerId) {
    response = await fetch(`${API_URL}/${editingPlayerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(player),
    });
  } else {
    response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(player),
    });
  }

  const newPlayer = await response.json();

  console.log(newPlayer);
  editingPlayerId = null;
  submitBtn.textContent = "Add Player";
  playerForm.reset();

  loadPlayers();
});
cancelBtn.addEventListener("click", function () {
  editingPlayerId = null;

  playerForm.reset();

  submitBtn.textContent = "Add Player";
});
