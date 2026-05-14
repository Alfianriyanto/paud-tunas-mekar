function saveToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

function removeToken() {
  localStorage.removeItem("token");
}

function isLoggedIn() {
  return !!getToken();
}

async function checkAuth() {
  const token = getToken();

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!result.success) {
      removeToken();
      window.location.href = "login.html";
    }
  } catch (error) {
    removeToken();
    window.location.href = "login.html";
  }
}

function logout() {
  removeToken();
  window.location.href = "login.html";
}