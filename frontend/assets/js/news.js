const token = localStorage.getItem('token');

const form = document.getElementById('newsForm');

const table = document.getElementById('newsTable');

const quill = new Quill('#editor', {
  theme: 'snow',
});

async function fetchNews() {

  try {

    const response = await fetch(
      `${BASE_URL}/news`
    );

    const result = await response.json();

    table.innerHTML = '';

    result.data.forEach((item) => {

      table.innerHTML += `
        <tr>

          <td>
            ${
              item.thumbnail
                ? `
                <img
                  src="${item.thumbnail}"
                  width="100"
                >
              `
                : '-'
            }
          </td>

          <td>${item.title}</td>

          <td>${item.slug}</td>

          <td>

            <button
              class="btn btn-warning btn-sm"
              onclick='editNews(${JSON.stringify(item)})'
            >
              Edit
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick='deleteNews("${item.id}")'
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

    const newsId =
      document.getElementById('newsId').value;

    const formData = new FormData();

    formData.append(
      'title',
      document.getElementById('title').value
    );

    formData.append(
      'content',
      quill.root.innerHTML
    );

    const thumbnail =
      document.getElementById('thumbnail')
        .files[0];

    if (thumbnail) {

      formData.append(
        'thumbnail',
        thumbnail
      );
    }

    try {

      let url = `${BASE_URL}/news`;

      let method = 'POST';

      if (newsId) {

        url = `${BASE_URL}/news/${newsId}`;

        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      alert(result.message);

      form.reset();

      quill.root.innerHTML = '';

      document.getElementById(
        'newsId'
      ).value = '';

      fetchNews();

    } catch (error) {

      console.log(error);
    }
  }
);

function editNews(item) {

  document.getElementById('newsId').value =
    item.id;

  document.getElementById('title').value =
    item.title;

  quill.root.innerHTML = item.content;
}

async function deleteNews(id) {

  const confirmDelete = confirm(
    'Yakin ingin menghapus berita ini?'
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `${BASE_URL}/news/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    alert(result.message);

    fetchNews();

  } catch (error) {

    console.log(error);
  }
}

fetchNews();