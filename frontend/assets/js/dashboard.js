checkAuth();

const token = localStorage.getItem(
  'token'
);

async function fetchDashboard() {

  try {

    const response = await fetch(
      `${BASE_URL}/dashboard`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (!result.success) {

      alert(result.message);

      return;
    }

    document.getElementById(
      'totalNews'
    ).innerText =
      result.data.total_news;

    document.getElementById(
      'totalTeachers'
    ).innerText =
      result.data.total_teachers;

    document.getElementById(
      'totalRegistrations'
    ).innerText =
      result.data.total_registrations;

    document.getElementById(
      'totalTestimonials'
    ).innerText =
      result.data.total_testimonials;

  } catch (error) {

    console.log(error);
  }
}

fetchDashboard();