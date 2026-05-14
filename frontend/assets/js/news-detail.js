const BASE_URL =
  'https://paud-tunas-mekar-production.up.railway.app/api';

const params =
  new URLSearchParams(
    window.location.search
  );

const slug =
  params.get('slug');

async function fetchNewsDetail() {

  try {

    const response = await fetch(
      `${BASE_URL}/news`
    );

    const result =
      await response.json();

    const article =
      result.data.find(
        (item) =>
          item.slug === slug
      );

    const container =
      document.getElementById(
        'newsDetail'
      );

    if (!article) {

      container.innerHTML = `
      
        <h2>
          Artikel tidak ditemukan
        </h2>
      `;

      return;
    }

    document.title =
      article.title;

    container.innerHTML = `

      <img
        src="${article.thumbnail}"
        class="news-detail-image"
      >

      <div class="news-detail-content">

        <div class="news-date">
          ${formatDate(
            article.created_at
          )}
        </div>

        <h1>
          ${article.title}
        </h1>

        <div>
          ${article.content}
        </div>

      </div>
    `;

  } catch (error) {

    console.log(error);
  }
}

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

fetchNewsDetail();