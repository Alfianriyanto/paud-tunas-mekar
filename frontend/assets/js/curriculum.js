const token = localStorage.getItem('token');

const form = document.getElementById(
  'curriculumForm'
);

const quill = new Quill('#editor', {
  theme: 'snow',
});

async function fetchCurriculum() {

  try {

    const response = await fetch(
      `${BASE_URL}/curriculum`
    );

    const result = await response.json();

    if (result.data) {

      quill.root.innerHTML =
        result.data.description || '';
    }

  } catch (error) {

    console.log(error);
  }
}

form.addEventListener(
  'submit',
  async function (e) {

    e.preventDefault();

    try {

      const response = await fetch(
        `${BASE_URL}/curriculum`,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            description:
              quill.root.innerHTML,
          }),
        }
      );

      const result = await response.json();

      alert(result.message);

    } catch (error) {

      console.log(error);
    }
  }
);

fetchCurriculum();