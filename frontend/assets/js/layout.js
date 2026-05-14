async function loadComponent(elementId, filePath) {

  const response = await fetch(filePath);

  const html = await response.text();

  document.getElementById(elementId).innerHTML = html;
}

async function initLayout(pageTitle = 'Dashboard') {

  await loadComponent(
    'sidebar-container',
    '../components/sidebar.html'
  );

  await loadComponent(
    'topbar-container',
    '../components/topbar.html'
  );

  document.getElementById('pageTitle').innerText = pageTitle;

  const token = localStorage.getItem('token');

  if (!token) return;

  try {

    const response = await fetch(
      `${BASE_URL}/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (result.success) {

      document.getElementById(
        'adminName'
      ).innerText = result.admin.email;
    }

  } catch (error) {

    console.log(error);
  }

  setActiveMenu();
}

function setActiveMenu() {

  const currentPage = window.location.pathname
    .split('/')
    .pop();

  const menuLinks = document.querySelectorAll(
    '.sidebar a'
  );

  menuLinks.forEach((link) => {

    const href = link.getAttribute('href');

    if (href === currentPage) {

      link.classList.add('active');
    }
  });
}