const params = new URLSearchParams(window.location.search);

const playerId = params.get("id");

async function loadPlayer() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/players/${playerId}`,
    );

    const player = await response.json();
    document.title = `${player.name} | THE FC GUIDE`;

    console.log(player);

    document.querySelector("#player-name").textContent = player.name;
    document.querySelector("#player-nickname").textContent = player.nickname;
    document.querySelector("#player-position").textContent = player.position;
    document.querySelector("#player-rating").textContent = player.rating;
    document.querySelector("#player-roles").textContent = player.roles;
    document.querySelector("#player-nation").textContent = player.nation;
    document.querySelector("#player-card").textContent = player.card;
    const image = document.querySelector("#player-image");

    image.src = player.image;
    image.alt = player.name;
    document.querySelector("#player-review").textContent = player.review;

    const prosList = document.querySelector("#player-pros");
    prosList.innerHTML = "";

    player.pros.forEach((pro) => {
      prosList.innerHTML += `<li>${pro}</li>`;
    });

    document.querySelector("#player-cons").textContent = player.cons.join(", ");
  } catch (error) {
    console.error(error);
  }
}

loadPlayer();
