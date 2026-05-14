const token = localStorage.getItem('token');

const form = document.getElementById(
  'testimonialForm'
);

const table = document.getElementById(
  'testimonialTable'
);

const quill = new Quill('#editor', {
  theme: 'snow',
});

async function fetchTestimonials() {

  try {

    const response = await fetch(
      `${BASE_URL}/testimonials`
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

          <td>${item.parent_name}</td>

          <td>
            ${item.description.substring(0, 100)}...
          </td>

          <td>

            <button
              class="btn btn-warning btn-sm"
              onclick='editTestimonial(${JSON.stringify(item)})'
            >
              Edit
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick='deleteTestimonial("${item.id}")'
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

    const testimonialId =
      document.getElementById(
        'testimonialId'
      ).value;

    const formData = new FormData();

    formData.append(
      'parent_name',
      document.getElementById(
        'parent_name'
      ).value
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
        `${BASE_URL}/testimonials`;

      let method = 'POST';

      if (testimonialId) {

        url =
          `${BASE_URL}/testimonials/${testimonialId}`;

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
        'testimonialId'
      ).value = '';

      fetchTestimonials();

    } catch (error) {

      console.log(error);
    }
  }
);

function editTestimonial(item) {

  document.getElementById(
    'testimonialId'
  ).value = item.id;

  document.getElementById(
    'parent_name'
  ).value = item.parent_name;

  quill.root.innerHTML =
    item.description;
}

async function deleteTestimonial(id) {

  const confirmDelete = confirm(
    'Yakin ingin menghapus testimoni ini?'
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `${BASE_URL}/testimonials/${id}`,
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

    fetchTestimonials();

  } catch (error) {

    console.log(error);
  }
}

fetchTestimonials();