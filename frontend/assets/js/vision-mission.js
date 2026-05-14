const token = localStorage.getItem('token');

const form = document.getElementById(
  'visionMissionForm'
);

const visionQuill = new Quill(
  '#visionEditor',
  {
    theme: 'snow',
  }
);

const missionQuill = new Quill(
  '#missionEditor',
  {
    theme: 'snow',
  }
);

async function fetchVisionMission() {

  try {

    const response = await fetch(
      `${BASE_URL}/vision-mission`
    );

    const result = await response.json();

    if (result.data) {

      visionQuill.root.innerHTML =
        result.data.vision || '';

      missionQuill.root.innerHTML =
        result.data.mission || '';
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
        `${BASE_URL}/vision-mission`,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            vision:
              visionQuill.root.innerHTML,

            mission:
              missionQuill.root.innerHTML,
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

fetchVisionMission();