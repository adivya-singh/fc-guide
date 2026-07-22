const form = document.querySelector("#login-form");

const message = document.querySelector("#message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.querySelector("#email").value;

  const password = document.querySelector("#password").value;

  const response = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);

    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "index.html";
  } else {
    message.textContent = data.message;
  }
});
const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector("#toggle-password");

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    togglePassword.textContent = "👁️";
  }
});
