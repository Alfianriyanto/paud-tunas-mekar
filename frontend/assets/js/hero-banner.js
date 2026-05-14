checkAuth();

const token = localStorage.getItem('token');

const form = document.getElementById('heroBannerForm');

const table = document.getElementById('heroBannerTable');

async function fetchHeroBanners() {

  try {

    const response = await fetch(
      `${BASE_URL}/hero-banners`
    );

    const result = await response.json();

    table.innerHTML = '';

    result.data.forEach((item) => {

      table.innerHTML += `
        <tr>
          <td>
            <img
              src="${item.image_url}"
              width="120"
            >
          </td>

          <td>${item.title || '-'}</td>

          <td>${item.subtitle || '-'}</td>

          <td>
            <button
              class="btn btn-danger btn-sm"
              onclick="deleteBanner('${item.id}')"
            >
              Delete
            </button>
          </td>
        </tr>
      `;
    });

  } catch (error) {

    console.log(error);
  }
}

form.addEventListener('submit', async function (e) {

  e.preventDefault();

  const formData = new FormData();

  formData.append(
    'title',
    document.getElementById('title').value
  );

  formData.append(
    'subtitle',
    document.getElementById('subtitle').value
  );

  formData.append(
    'image',
    document.getElementById('image').files[0]
  );

  try {

    const response = await fetch(
      `${BASE_URL}/hero-banners`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const result = await response.json();

    alert(result.message);

    form.reset();

    fetchHeroBanners();

  } catch (error) {

    console.log(error);
  }
});

async function deleteBanner(id) {

  const confirmDelete = confirm(
    'Yakin ingin menghapus banner ini?'
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `${BASE_URL}/hero-banners/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    alert(result.message);

    fetchHeroBanners();

  } catch (error) {

    console.log(error);
  }
}

fetchHeroBanners();