const form = document.querySelector("#register-form");
const message = document.querySelector("#message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const response = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    // Save the login token
    localStorage.setItem("token", data.token);

    // Save the logged-in user
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect straight to the homepage
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
