const API_KEY_MOVIES = 'fde7e29a2dfca4d22ccd670e9a69081f';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  
const movieId = params.id;

function FilmeDestacado()
{
    const sectionCartaz = document.getElementById('Filme-Em-Destaque');

    const filme = JSON.parse(this.responseText);
    const data = new Date(filme.release_date);
  
    const conteudo =  `
        <h1 class="row titulo1">${filme.title}</h1>
        <h2 class="row titulo2">${filme.original_title}</h2>

            <div class="row">
                
                <div class="col-6" id="Top">
                    <img src="${IMG_BASE_URL}${filme.backdrop_path}">
                </div>

                <!-- Bloco de Sobre -->
                <div class="col-6">
                    <p class="descricao text-justify">
                        ${filme.overview}
                    </p>
                    <div class="descricao">
                        <span>Duração: ${filme.runtime}min</span>
                    </div>
                    <div class="descricao">
                        <span>Data de estreia: ${data.toLocaleDateString()}</span>
                    </div>
                    <div class="descricao">
                        <span>Avaliação: ${filme.vote_average}/10</span>
                    </div>
                    <p class="descricao">
                        Gêneros:<br><br>
                        ${filme.genres.map(genre => `<span>${genre.name}</span>`).join(' ')}
                    </p>
                </div>
            </div>

    `;
  
    sectionCartaz.innerHTML = conteudo;
}
function BuscaInfo()
{
    const xhr = new XMLHttpRequest();
    xhr.onload = FilmeDestacado;
    xhr.open('GET', `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY_MOVIES}&language=pt-BR`)
    xhr.send();
}

BuscaInfo();