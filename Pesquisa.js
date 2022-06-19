const API_KEY_MOVIES = 'fde7e29a2dfca4d22ccd670e9a69081f';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
let CURRENT_URL = window.location.href;



if (CURRENT_URL.includes('pesquisa')) {
    CURRENT_URL = CURRENT_URL.replace('/pesquisa.html', '');
}

/*if (CURRENT_URL.includes('index')){
    CURRENT_URL = CURRENT_URL.replace('/index.html', '');
    CURRENT_URL = CURRENT_URL.replace('/pesquisa.html', '');
}
  
if (CURRENT_URL[CURRENT_URL.length - 1] === '/') {
    CURRENT_URL = CURRENT_URL.slice(0, -1);
}*/

function exibeResultado() {
    const sectionResultado = document.getElementById('Filme-Resultados');
    let conteudo = '';
  
    const dados = JSON.parse(this.responseText);
  
    for (i = 0; i < dados.results.length; i++) {
      const Movie = dados.results[i];
      const data = new Date(Movie.release_date);
  
      if (Movie.overview.length > 0 && Movie.backdrop_path) {
        conteudo = conteudo + `
        <div class="row Pesquisa_Movies">
                
            <div class="col-6" id="Top">
                <img src="${IMG_BASE_URL}${Movie.backdrop_path}">
            </div>

            <!-- Bloco de Sobre -->
            <div class="col-6">
                <h1 class="row titulo">${Movie.title}</h1>
                <p class="descricao text-justify">
                    ${Movie.overview} <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}"> Ver mais...</a>
                </p>
                <div class="descricao">
                    <span>Duração: ${Movie.runtime}min</span>
                </div>
                <div class="descricao">
                    <span>Data de estreia: ${data.toLocaleDateString()}</span>
                </div>
                <div class="descricao">
                    <span>Avaliação: ${Movie.vote_average}/10</span>
                </div>
            </div>
        </div>
        `;
      }
    }
  
    sectionResultado.innerHTML = conteudo;
  }
  
  function executaPesquisa() {
    const query = document.getElementById('txtPesquisa').value;
  
    const xhr = new XMLHttpRequest();
    xhr.onload = exibeResultado;
    xhr.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_MOVIES}&language=pt-BR&query=${query}&page=1`)
    xhr.send();
  }
  
  document.getElementById('btnPesquisa').addEventListener('click', executaPesquisa);
//document.getElementById('btnPesquisa').addEventListener('click', executaPesquisa);