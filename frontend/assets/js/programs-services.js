const token = localStorage.getItem('token');

const form = document.getElementById(
  'programForm'
);

const table = document.getElementById(
  'programTable'
);

const quill = new Quill('#editor', {
  theme: 'snow',
});

async function fetchPrograms() {

  try {

    const response = await fetch(
      `${BASE_URL}/programs-services`
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
              onclick='editProgram(${JSON.stringify(item)})'
            >
              Edit
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick='deleteProgram("${item.id}")'
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

    const programId =
      document.getElementById('programId').value;

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
        `${BASE_URL}/programs-services`;

      let method = 'POST';

      if (programId) {

        url =
          `${BASE_URL}/programs-services/${programId}`;

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
        'programId'
      ).value = '';

      fetchPrograms();

    } catch (error) {

      console.log(error);
    }
  }
);

function editProgram(item) {

  document.getElementById(
    'programId'
  ).value = item.id;

  document.getElementById(
    'title'
  ).value = item.title;

  quill.root.innerHTML =
    item.description;
}

async function deleteProgram(id) {

  const confirmDelete = confirm(
    'Yakin ingin menghapus program ini?'
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `${BASE_URL}/programs-services/${id}`,
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

    fetchPrograms();

  } catch (error) {

    console.log(error);
  }
}

fetchPrograms();