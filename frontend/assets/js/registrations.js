const token = localStorage.getItem(
  'token'
);

const table = document.getElementById(
  'registrationTable'
);

async function fetchRegistrations() {

  try {

    const response = await fetch(
      `${BASE_URL}/registrations`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    table.innerHTML = '';

    result.data.forEach((item) => {

      table.innerHTML += `
        <tr>

          <td>${item.child_name}</td>

          <td>
            ${item.child_birth_date}
          </td>

          <td>
            ${item.father_name}
          </td>

          <td>
            ${item.mother_name}
          </td>

          <td>

            <span class="badge bg-primary">
              ${item.status}
            </span>

          </td>

          <td>

            <select
              class="form-select"
              onchange="updateStatus(
                '${item.id}',
                this.value
              )"
            >

              <option
                ${
                  item.status ===
                  'Belum Dihubungi'
                    ? 'selected'
                    : ''
                }
              >
                Belum Dihubungi
              </option>

              <option
                ${
                  item.status ===
                  'Sudah Dihubungi'
                    ? 'selected'
                    : ''
                }
              >
                Sudah Dihubungi
              </option>

              <option
                ${
                  item.status ===
                  'Diproses'
                    ? 'selected'
                    : ''
                }
              >
                Diproses
              </option>

              <option
                ${
                  item.status ===
                  'Diterima'
                    ? 'selected'
                    : ''
                }
              >
                Diterima
              </option>

              <option
                ${
                  item.status ===
                  'Ditolak'
                    ? 'selected'
                    : ''
                }
              >
                Ditolak
              </option>

            </select>

          </td>

        </tr>
      `;
    });

  } catch (error) {

    console.log(error);
  }
}

async function updateStatus(
  id,
  status
) {

  try {

    const response = await fetch(
      `${BASE_URL}/registrations/${id}/status`,
      {
        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          status,
        }),
      }
    );

    const result = await response.json();

    alert(result.message);

    fetchRegistrations();

  } catch (error) {

    console.log(error);
  }
}

fetchRegistrations();