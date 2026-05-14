/* =========================
   IMAGE HELPER
========================= */

function getImageUrl(path) {

  if (!path) {

    return 'https://via.placeholder.com/500x500?text=No+Image';
  }

  if (path.startsWith('http')) {

    return path;
  }

  return `
    ${SUPABASE_URL}
    /storage/v1/object/public/
    ${path}
  `.replace(/\s/g, '');
}

/* =========================
   LOAD COMPONENT
========================= */

async function loadComponent(
  id,
  file
) {

  try {

    const response = await fetch(file);

    const html =
      await response.text();

    const element =
      document.getElementById(id);

    if (element) {

      element.innerHTML = html;
    }

  } catch (error) {

    console.log(
      'Load Component Error:',
      error
    );
  }
}

/* =========================
   SCHOOL PROFILE
========================= */

async function fetchSchoolProfile() {

  try {

    const response = await fetch(
      `${BASE_URL}/school-profile`
    );

    const result =
      await response.json();

    if (!result.data) return;

    const data = result.data;

    const schoolName =
      document.getElementById(
        'schoolName'
      );

    const principalName =
      document.getElementById(
        'principalName'
      );

    const welcomeMessage =
      document.getElementById(
        'welcomeMessage'
      );

    const principalImage =
      document.getElementById(
        'principalImage'
      );

    const footerAddress =
      document.getElementById(
        'footerAddress'
      );

    const footerWhatsapp =
      document.getElementById(
        'footerWhatsapp'
      );

    const footerInstagram =
      document.getElementById(
        'footerInstagram'
      );

    const footerOperationalHours =
      document.getElementById(
        'footerOperationalHours'
      );

    if (schoolName) {

      schoolName.innerText =
        data.school_name || '';
    }

    if (principalName) {

      principalName.innerText =
        data.principal_name || '';
    }

    if (welcomeMessage) {

      welcomeMessage.innerHTML =
        data.welcome_message || '';
    }

    if (principalImage) {

      principalImage.src =
        getImageUrl(
          data.photo_principal_url
        );
    }

    if (footerAddress) {

      footerAddress.innerText =
        data.address || '';
    }

    if (footerWhatsapp) {

      footerWhatsapp.innerText =
        `Whatsapp: ${data.whatsapp}`;
    }

    if (footerInstagram) {

      footerInstagram.innerText =
        `Instagram: ${data.instagram}`;
    }

    if (footerOperationalHours) {

      footerOperationalHours.innerText =
        data.operational_hours || '';
    }

  } catch (error) {

    console.log(error);
  }
}

/* =========================
   VISIONS MISSIONS
========================= */

async function fetchVisionMission() {

  try {

    const response = await fetch(
      `${BASE_URL}/vision-mission`
    );

    const result =
      await response.json();

    console.log(
      'VISION MISSION:',
      result
    );

    if (result.data) {

      const data =
        result.data;

      const visionContent =
        document.getElementById(
          'visionContent'
        );

      const missionContent =
        document.getElementById(
          'missionContent'
        );

      if (visionContent) {

        visionContent.innerHTML =
          data.vision || '';
      }

      if (missionContent) {

        missionContent.innerHTML =
          data.mission || '';
      }
    }

  } catch (error) {

    console.log(error);
  }
}

/* =========================
   PROGRAMS
========================= */

async function fetchPrograms() {

  try {

    const response = await fetch(
      `${BASE_URL}/programs-services`
    );

    const result =
      await response.json();

    const container =
      document.getElementById(
        'programContainer'
      );

    if (!container) return;

    container.innerHTML = '';

    if (
      result.data &&
      result.data.length > 0
    ) {

      result.data.forEach(
        (item, index) => {

          container.innerHTML += `
            <div
              class="col-lg-4 col-md-6"
              data-aos="zoom-in"
              data-aos-delay="${index * 100}"
            >

              <div class="program-card">

                <img
                  src="${getImageUrl(item.image_url)}"
                  class="program-image"
                >

                <div class="program-content">

                  <h3>
                    ${item.title}
                  </h3>

                  <p>
                    ${
                      item.description
                        ?.replace(/<[^>]+>/g, '')
                        ?.substring(0, 120)
                    }...
                  </p>

                </div>

              </div>

            </div>
          `;
        }
      );
    }

  } catch (error) {

    console.log(error);
  }
}

/* =========================
   FACILITIES
========================= */

async function fetchFacilities() {

  try {

    const response = await fetch(
      `${BASE_URL}/facilities`
    );

    const result =
      await response.json();

    const container =
      document.getElementById(
        'facilitiesContainer'
      );

    if (!container) return;

    container.innerHTML = '';

    result.data.forEach((item) => {

      container.innerHTML += `
      
        <div 
          class="facility-card"
          data-aos="zoom-in"
        >

          <img
            src="${item.image_url}"
            alt="${item.title}"
          >

          <div class="facility-overlay">

            <div class="facility-content">

              <h3>
                ${item.title}
              </h3>

              <p>
                ${item.description || ''}
              </p>

            </div>

          </div>

        </div>
      `;
    });

  } catch (error) {

    console.log(error);
  }
}

/* =========================
   TEACHERS
========================= */

async function fetchTeachers() {

  try {

    const response = await fetch(
      `${BASE_URL}/teachers`
    );

    const result =
      await response.json();

    const container =
      document.getElementById(
        'teacherContainer'
      );

    if (!container) return;

    container.innerHTML = '';

    if (
      result.data &&
      result.data.length > 0
    ) {

      result.data.forEach(
        (item) => {

          container.innerHTML += `
            <div class="swiper-slide">

              <div class="teacher-card">

                <div class="teacher-image-wrapper">

                  <div class="teacher-shape"></div>

                  <img
                    src="${getImageUrl(item.photo_url)}"
                    class="teacher-image"
                  >

                </div>

                <div class="teacher-content">

                  <h3>
                    ${item.name}
                  </h3>

                  <p>
                    ${item.title}
                  </p>

                </div>

              </div>

            </div>
          `;
        }
      );

      new Swiper(
        '.teacherSwiper',
        {
          slidesPerView: 1,
          spaceBetween: 25,
          loop: true,

          autoplay: {
            delay: 3000,
          },

          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },

          breakpoints: {

            768: {
              slidesPerView: 2,
            },

            1200: {
              slidesPerView: 3,
            },
          },
        }
      );
    }

  } catch (error) {

    console.log(error);
  }
}

/* =========================
   TESTIMONIALS
========================= */

async function fetchTestimonials() {

  try {

    const response = await fetch(
      `${BASE_URL}/testimonials`
    );

    const result =
      await response.json();

    const container =
      document.getElementById(
        'testimonialContainer'
      );

    if (!container) return;

    container.innerHTML = '';

    if (
      result.data &&
      result.data.length > 0
    ) {

      result.data.forEach(
        (item) => {

          container.innerHTML += `
            <div class="swiper-slide">

              <div class="testimonial-card">

                <div class="testimonial-quote">
                  "
                </div>

                <div class="testimonial-text">

                  ${
                    item.description
                      ?.replace(/<[^>]+>/g, '')
                  }

                </div>

                <div class="testimonial-user">

                  <img
                    src="${getImageUrl(item.image_url)}"
                  >

                  <div>

                    <h4>
                      ${item.parent_name}
                    </h4>

                    <p>
                      Orang Tua Murid
                    </p>

                  </div>

                </div>

              </div>

            </div>
          `;
        }
      );

      new Swiper(
        '.testimonialSwiper',
        {
          slidesPerView: 1,
          spaceBetween: 25,
          loop: true,

          autoplay: {
            delay: 3500,
          },

          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },

          breakpoints: {

            992: {
              slidesPerView: 2,
            },
          },
        }
      );
    }

  } catch (error) {

    console.log(error);
  }
}

/* =========================
   NEWS
========================= */

async function fetchNews() {

  try {

    const response = await fetch(
      `${BASE_URL}/news`
    );

    const result =
      await response.json();

    const container =
      document.getElementById(
        'newsContainer'
      );

    if (!container) return;

    container.innerHTML = '';

    result.data.forEach((item) => {

      const plainText =
        item.content
          ?.replace(/<[^>]+>/g, '')
          ?.substring(0, 120);

      container.innerHTML += `

        <div
          class="col-lg-6"
          data-aos="fade-up"
        >

          <a
            href="news-detail.html?slug=${item.slug}"
            class="news-link"
          >

            <div class="news-card">

              <div class="news-image">

                <img
                  src="${item.thumbnail}"
                  alt="${item.title}"
                >

              </div>

              <div class="news-content">

                <div class="news-date">

                  ${formatDate(
                    item.created_at
                  )}

                </div>

                <h3>
                  ${item.title}
                </h3>

                <p>
                  ${plainText}...
                </p>

                <div class="news-read-more">

                  Baca Selengkapnya →
                </div>

              </div>

            </div>

          </a>

        </div>
      `;
    });

  } catch (error) {

    console.log(error);
  }
}

/* FORMAT DATE */

function formatDate(dateString) {

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Date(
    dateString
  ).toLocaleDateString(
    'id-ID',
    options
  );
}



/* =========================
   CALENDARS
========================= */

async function fetchCalendars() {

  try {

    const response = await fetch(
      `${BASE_URL}/school-calendars`
    );

    const result =
      await response.json();

    const container =
      document.getElementById(
        'calendarContainer'
      );

    if (!container) return;

    container.innerHTML = '';

    if (
      result.data &&
      result.data.length > 0
    ) {

      result.data.forEach(
        (item, index) => {

          const startDate =
            new Date(
              item.start_date
            ).toLocaleDateString(
              'id-ID',
              {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }
            );

          const endDate =
            new Date(
              item.end_date
            ).toLocaleDateString(
              'id-ID',
              {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }
            );

          const dateText =
            item.start_date ===
            item.end_date
              ? startDate
              : `${startDate} - ${endDate}`;

          container.innerHTML += `
            <div
              class="calendar-item"
              data-aos="fade-up"
              data-aos-delay="${index * 100}"
            >

              <div class="calendar-dot"></div>

              <div class="calendar-card">

                <div class="calendar-date">
                  ${dateText}
                </div>

                <h3>
                  ${item.title}
                </h3>

                <p>
                  ${item.description}
                </p>

              </div>

            </div>
          `;
        }
      );
    }

  } catch (error) {

    console.log(error);
  }
}

/* =========================
   REGISTRATION FORM
========================= */

function initRegistrationForm() {

  const form =
    document.getElementById(
      'registrationForm'
    );

  if (!form) return;

  form.addEventListener(
    'submit',
    async function (e) {

      e.preventDefault();

      try {

        const response = await fetch(
          `${BASE_URL}/registrations`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({

              child_name:
                document.getElementById(
                  'child_name'
                ).value,

              child_birth_date:
                document.getElementById(
                  'child_birth_date'
                ).value,

              address:
                document.getElementById(
                  'address'
                ).value,

              father_name:
                document.getElementById(
                  'father_name'
                ).value,

              father_job:
                document.getElementById(
                  'father_job'
                ).value,

              mother_name:
                document.getElementById(
                  'mother_name'
                ).value,

              mother_job:
                document.getElementById(
                  'mother_job'
                ).value,

              parent_income:
                document.getElementById(
                  'parent_income'
                ).value,
            }),
          }
        );

        const result =
          await response.json();

        if (!result.success) {

          alert(result.message);

          return;
        }

        alert(
          'Pendaftaran berhasil dikirim!'
        );

        form.reset();

      } catch (error) {

        console.log(error);

        alert(
          'Terjadi kesalahan'
        );
      }
    }
  );
}

/* =========================
   UI INTERACTIONS
========================= */

function initUIInteractions() {

  /* SMOOTH SCROLL */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

      anchor.addEventListener(
        'click',
        function (e) {

          e.preventDefault();

          const target =
            document.querySelector(
              this.getAttribute('href')
            );

          if (target) {

            target.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }
      );
    });

  /* STICKY NAVBAR */

  window.addEventListener(
    'scroll',
    function () {

      const navbar =
        document.querySelector(
          '.custom-navbar'
        );

      if (navbar) {

        if (window.scrollY > 50) {

          navbar.classList.add(
            'scrolled'
          );

        } else {

          navbar.classList.remove(
            'scrolled'
          );
        }
      }

      const scrollTopBtn =
        document.getElementById(
          'scrollTopBtn'
        );

      if (scrollTopBtn) {

        if (window.scrollY > 400) {

          scrollTopBtn.style.display =
            'flex';

        } else {

          scrollTopBtn.style.display =
            'none';
        }
      }
    }
  );

  /* SCROLL TOP */

  const scrollTopBtn =
    document.getElementById(
      'scrollTopBtn'
    );

  if (scrollTopBtn) {

    scrollTopBtn.addEventListener(
      'click',
      function () {

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    );
  }
}

/* =========================
   INIT WEBSITE
========================= */

async function initWebsite() {

  await loadComponent(
    'navbar-container',
    './components/navbar.html'
  );

  await loadComponent(
    'footer-container',
    './components/footer.html'
  );

  await fetchSchoolProfile();
  await fetchVisionMission();
  await fetchPrograms();
  await fetchFacilities();
  await fetchTeachers();
  await fetchTestimonials();
  await fetchNews();
  await fetchCalendars();

  initRegistrationForm();

  AOS.init({
    duration: 1000,
    once: true,
  });

  initUIInteractions();

  const loading =
    document.getElementById(
      'loadingScreen'
    );

  if (loading) {

    setTimeout(() => {

      loading.style.opacity = '0';

      loading.style.visibility =
        'hidden';

    }, 700);
  }
}

/* =========================
   START WEBSITE
========================= */

initWebsite();