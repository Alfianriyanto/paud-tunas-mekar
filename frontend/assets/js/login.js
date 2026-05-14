const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const errorMessage = document.getElementById("errorMessage");

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      errorMessage.classList.remove("d-none");
      errorMessage.innerText = result.message;
      return;
    }

    saveToken(result.token);

    window.location.href = "dashboard.html";

  } catch (error) {
    errorMessage.classList.remove("d-none");
    errorMessage.innerText = "Server error";
  }
});