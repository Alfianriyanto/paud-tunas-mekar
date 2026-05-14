const token = localStorage.getItem('token');

const form = document.getElementById(
  'calendarForm'
);

const table = document.getElementById(
  'calendarTable'
);

function formatDateRange(start, end) {

  if (start === end) {

    return start;
  }

  return `${start} s/d ${end}`;
}

async function fetchCalendars() {

  try {

    const response = await fetch(
      `${BASE_URL}/school-calendars`
    );

    const result = await response.json();

    table.innerHTML = '';

    result.data.forEach((item) => {

      table.innerHTML += `
        <tr>

          <td>
            ${formatDateRange(
              item.start_date,
              item.end_date
            )}
          </td>

          <td>
            ${item.title}
          </td>

          <td>
            ${item.description}
          </td>

          <td>

            <button
              class="btn btn-warning btn-sm"
              onclick='editCalendar(${JSON.stringify(item)})'
            >
              Edit
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick='deleteCalendar("${item.id}")'
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

    const calendarId =
      document.getElementById(
        'calendarId'
      ).value;

    try {

      let url =
        `${BASE_URL}/school-calendars`;

      let method = 'POST';

      if (calendarId) {

        url =
          `${BASE_URL}/school-calendars/${calendarId}`;

        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          title:
            document.getElementById(
              'title'
            ).value,

          description:
            document.getElementById(
              'description'
            ).value,

          start_date:
            document.getElementById(
              'start_date'
            ).value,

          end_date:
            document.getElementById(
              'end_date'
            ).value,
        }),
      });

      const result = await response.json();

      alert(result.message);

      form.reset();

      document.getElementById(
        'calendarId'
      ).value = '';

      fetchCalendars();

    } catch (error) {

      console.log(error);
    }
  }
);

function editCalendar(item) {

  document.getElementById(
    'calendarId'
  ).value = item.id;

  document.getElementById(
    'title'
  ).value = item.title;

  document.getElementById(
    'description'
  ).value = item.description;

  document.getElementById(
    'start_date'
  ).value = item.start_date;

  document.getElementById(
    'end_date'
  ).value = item.end_date;
}

async function deleteCalendar(id) {

  const confirmDelete = confirm(
    'Yakin ingin menghapus event ini?'
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `${BASE_URL}/school-calendars/${id}`,
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

    fetchCalendars();

  } catch (error) {

    console.log(error);
  }
}

fetchCalendars();