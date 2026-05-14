const token = localStorage.getItem('token');

const form = document.getElementById(
  'teacherForm'
);

const table = document.getElementById(
  'teacherTable'
);

async function fetchTeachers() {

  try {

    const response = await fetch(
      `${BASE_URL}/teachers`
    );

    const result = await response.json();

    table.innerHTML = '';

    result.data.forEach((item) => {

      table.innerHTML += `
        <tr>

          <td>
            ${
              item.photo_url
                ? `
                <img
                  src="${item.photo_url}"
                  width="100"
                >
              `
                : '-'
            }
          </td>

          <td>${item.name}</td>

          <td>${item.title}</td>

          <td>

            <button
              class="btn btn-warning btn-sm"
              onclick='editTeacher(${JSON.stringify(item)})'
            >
              Edit
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick='deleteTeacher("${item.id}")'
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

    const teacherId =
      document.getElementById('teacherId').value;

    const formData = new FormData();

    formData.append(
      'name',
      document.getElementById('name').value
    );

    formData.append(
      'title',
      document.getElementById('title').value
    );

    const photo =
      document.getElementById('photo')
        .files[0];

    if (photo) {

      formData.append('photo', photo);
    }

    try {

      let url =
        `${BASE_URL}/teachers`;

      let method = 'POST';

      if (teacherId) {

        url =
          `${BASE_URL}/teachers/${teacherId}`;

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

      document.getElementById(
        'teacherId'
      ).value = '';

      fetchTeachers();

    } catch (error) {

      console.log(error);
    }
  }
);

function editTeacher(item) {

  document.getElementById(
    'teacherId'
  ).value = item.id;

  document.getElementById(
    'name'
  ).value = item.name;

  document.getElementById(
    'title'
  ).value = item.title;
}

async function deleteTeacher(id) {

  const confirmDelete = confirm(
    'Yakin ingin menghapus staff ini?'
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `${BASE_URL}/teachers/${id}`,
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

    fetchTeachers();

  } catch (error) {

    console.log(error);
  }
}

fetchTeachers();