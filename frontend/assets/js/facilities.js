const token = localStorage.getItem('token');

const form = document.getElementById(
  'facilityForm'
);

const table = document.getElementById(
  'facilityTable'
);

const quill = new Quill('#editor', {
  theme: 'snow',
});

async function fetchFacilities() {

  try {

    const response = await fetch(
      `${BASE_URL}/facilities`
    );

    const result = await response.json();

    table.innerHTML = '';

    result.data.forEach((item) => {

      table.innerHTML += `
        <tr>

          <td>
            ${
              item.image_url
                ? `
                <img
                  src="${item.image_url}"
                  width="100"
                >
              `
                : '-'
            }
          </td>

          <td>${item.title}</td>

          <td>
            ${item.description.substring(0, 100)}...
          </td>

          <td>

            <button
              class="btn btn-warning btn-sm"
              onclick='editFacility(${JSON.stringify(item)})'
            >
              Edit
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick='deleteFacility("${item.id}")'
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

form.addEventListener(
  'submit',
  async function (e) {

    e.preventDefault();

    const facilityId =
      document.getElementById('facilityId').value;

    const formData = new FormData();

    formData.append(
      'title',
      document.getElementById('title').value
    );

    formData.append(
      'description',
      quill.root.innerHTML
    );

    const image =
      document.getElementById('image')
        .files[0];

    if (image) {

      formData.append('image', image);
    }

    try {

      let url =
        `${BASE_URL}/facilities`;

      let method = 'POST';

      if (facilityId) {

        url =
          `${BASE_URL}/facilities/${facilityId}`;

        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      alert(result.message);

      form.reset();

      quill.root.innerHTML = '';

      document.getElementById(
        'facilityId'
      ).value = '';

      fetchFacilities();

    } catch (error) {

      console.log(error);
    }
  }
);

function editFacility(item) {

  document.getElementById(
    'facilityId'
  ).value = item.id;

  document.getElementById(
    'title'
  ).value = item.title;

  quill.root.innerHTML =
    item.description;
}

async function deleteFacility(id) {

  const confirmDelete = confirm(
    'Yakin ingin menghapus fasilitas ini?'
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `${BASE_URL}/facilities/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    alert(result.message);

    fetchFacilities();

  } catch (error) {

    console.log(error);
  }
}

fetchFacilities();