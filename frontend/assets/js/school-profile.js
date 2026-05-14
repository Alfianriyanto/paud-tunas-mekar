const token = localStorage.getItem('token');

const form = document.getElementById(
  'schoolProfileForm'
);

const quill = new Quill('#editor', {
  theme: 'snow',
});

async function fetchSchoolProfile() {

  try {

    const response = await fetch(
      `${BASE_URL}/school-profile`
    );

    const result = await response.json();

    if (result.data) {

      const data = result.data;

      document.getElementById(
        'school_name'
      ).value =
        data.school_name || '';

      document.getElementById(
        'principal_name'
      ).value =
        data.principal_name || '';

      document.getElementById(
        'address'
      ).value =
        data.address || '';

      document.getElementById(
        'operational_hours'
      ).value =
        data.operational_hours || '';

      document.getElementById(
        'whatsapp'
      ).value =
        data.whatsapp || '';

      document.getElementById(
        'instagram'
      ).value =
        data.instagram || '';

      quill.root.innerHTML =
        data.welcome_message || '';

      if (data.photo_principal_url) {

        const preview =
          document.getElementById(
            'previewImage'
          );

        preview.src =
          data.photo_principal_url;

        preview.style.display =
          'block';
      }
    }

  } catch (error) {

    console.log(error);
  }
}

form.addEventListener(
  'submit',
  async function (e) {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
      'school_name',
      document.getElementById(
        'school_name'
      ).value
    );

    formData.append(
      'principal_name',
      document.getElementById(
        'principal_name'
      ).value
    );

    formData.append(
      'welcome_message',
      quill.root.innerHTML
    );

    formData.append(
      'address',
      document.getElementById(
        'address'
      ).value
    );

    formData.append(
      'operational_hours',
      document.getElementById(
        'operational_hours'
      ).value
    );

    formData.append(
      'whatsapp',
      document.getElementById(
        'whatsapp'
      ).value
    );

    formData.append(
      'instagram',
      document.getElementById(
        'instagram'
      ).value
    );

    const image =
      document.getElementById('image')
        .files[0];

    if (image) {

      formData.append('image', image);
    }

    try {

      const response = await fetch(
        `${BASE_URL}/school-profile`,
        {
          method: 'POST',

          headers: {
            Authorization:
              `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const result = await response.json();

      alert(result.message);

      fetchSchoolProfile();

    } catch (error) {

      console.log(error);
    }
  }
);

fetchSchoolProfile();