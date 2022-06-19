const API_KEY_NEWS = 'dcbd8317129649e292643a1a63c349f4';
const API_KEY_MOVIES = 'fde7e29a2dfca4d22ccd670e9a69081f';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
let CURRENT_URL = window.location.href;

if (CURRENT_URL.includes('index')){
    CURRENT_URL = CURRENT_URL.replace('/index.html', '');
}
  
if (CURRENT_URL[CURRENT_URL.length - 1] === '/') {
    CURRENT_URL = CURRENT_URL.slice(0, -1);
}

function noticia()
{
    let divNoticia = document.getElementById('novidades')
    let texto = '';

    let dados = JSON.parse(this.responseText);
    for(i = 0; i < 3; i++){
        let noticia = dados.articles[i];
        let data = new Date (noticia.publishedAt);

        switch(i){
            case 0:
                texto = texto + `
                    <div class="container">
                        <div class="row" >
                            <div class="col-xs-12 col-11 col-md-4">
                                <img height="100%" width="100%" src=${noticia.urlToImage} alt="imagem1">
                            </div>
                            <div class="col-xs-12 col-12 col-md-6">
                                <h5 id="Text_Noticia">${noticia.title}</h5>
                                <p>${noticia.content} <a href="${noticia.url}">Leia mais ...</a>
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 1:
                texto = texto + `
                    <div class="container" style="margin-top: 10px;">
                    <hr>
                        <div class="row">
                            <div class="ol-xs-12 col-11 col-md-4">
                                <img height="100%" width="100%" src=${noticia.urlToImage} alt="imagem1">
                            </div>
                            <div class="col-xs-12 col-12 col-md-6">
                                <h5 id="Text_Noticia">${noticia.title}
                                </h5>
                                <p>${noticia.content} <a href="${noticia.url}">Leia mais ...</a>
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 2:
                texto = texto + `
                    <div class="container" style="margin-top: 10px; margin-bottom: 15px;">
                        <div class="row">
                            <hr>
                            <div class="ol-xs-12 col-11 col-md-4">
                                <img height="100%" width="100%" src=${noticia.urlToImage} alt="imagem1">
                            </div>
                            <div class="col-xs-12 col-12 col-md-6">
                                <h5 id="Text_Noticia">${noticia.title}
                                </h5>
                                <p> ${noticia.content} <a href="${noticia.url}">Leia mais ...</a>
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
    };

    divNoticia.innerHTML = texto;
}
function executaPesquisa()
{

    let xhr = new XMLHttpRequest ();
    xhr.onload = noticia;
    xhr.open ('GET', `https://newsapi.org/v2/everything?q=Filmes&apiKey=${API_KEY_NEWS}&language=pt`);
    xhr.send ();
}
function emDestaque()
{
    let divEmDestaque1 = document.getElementById('EmDestaque1');
    let divEmDestaque2 = document.getElementById('EmDestaque2');
    let divEmDestaque3 = document.getElementById('EmDestaque3');
    let divEmDestaque4 = document.getElementById('EmDestaque4');
    // Montar texto HTML das noticias
    const dados = JSON.parse (this.responseText);
    
    let Movie = dados.results[0];
    divEmDestaque1.innerHTML =`
        <div class="card" widht="100%">
            <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}">
                <img src="${IMG_BASE_URL + Movie.poster_path}" class="card-img-top" alt="filme1">
            <\a>
        </div>
    `;

    Movie = dados.results[1];
    divEmDestaque2.innerHTML =`
        <div class="card" widht="100%">
            <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}">
                <img src="${IMG_BASE_URL + Movie.poster_path}" class="card-img-top" alt="filme1">
            <\a>
        </div>
    `;

    Movie = dados.results[2];
    divEmDestaque3.innerHTML = `
        <div class="card" widht="100%">
            <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}">
                <img src="${IMG_BASE_URL + Movie.poster_path}" class="card-img-top" alt="filme1">
            <\a>
        </div>
    `;

    Movie = dados.results[3];
    divEmDestaque4.innerHTML = `
        <div class="card" widht="100%">
            <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}">
            <img src="${IMG_BASE_URL + Movie.poster_path}" class="card-img-top" alt="filme1">
            <\a>
        </div>
    `; 
}
function PesquisaEmDestaque()
{
    const xhr = new XMLHttpRequest();
    xhr.onload = emDestaque;
    xhr.open ('GET',`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_MOVIES}`);
    xhr.send ();
}
function Lancamento()
{
    let divLancamento1 = document.getElementById('Lancamento1');
    let divLancamento2 = document.getElementById('Lancamento2');
    let divLancamento3 = document.getElementById('Lancamento3');
    let divLancamento4 = document.getElementById('Lancamento4');
    // Montar texto HTML das noticias
    let dados = JSON.parse (this.responseText);
    
    
    let Movie = dados.results[0];
    let data = new Date (Movie.release_date);
    divLancamento1.innerHTML = `
            <div class="row" style="margin-bottom: 35px;">
                <div class="Banner-video col-xs-12 col-12 col-md-6" style="min-height: 294px;">
                    <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}">
                        <img src="${IMG_BASE_URL + Movie.backdrop_path}" class="rounded mx-auto d-block" alt="Responsive image"> 
                    </a>
                </div>
                <div class="Banner-Texto col-xs-12 col-12 col-md-6">
                    <h4>${Movie.title}</h4>
                    <p1 class="text-justify" height="100% ">
                    ${Movie.overview} <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}"> Ver mais...</a>
                    </p1>
                    <p></p>
                    <div class="col-12">
                        Estreia:  ${data.toLocaleDateString ()}
                    </div>
                    <div class="row ">
                        <div class="col-3">
                            ${Movie.vote_average} / 10 
                        </div>

                        <div id="Avalicao" class="col-9">
                            
                            <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
                            <div class="estrelas">
                            <input type="radio" id="cm_star-empty" name="fb" value="" checked/>
                            <label for="cm_star-1"><i class="fa"></i></label>
                            <input type="radio" id="cm_star-1" name="fb" value="1"/>
                            <label for="cm_star-2"><i class="fa"></i></label>
                            <input type="radio" id="cm_star-2" name="fb" value="2"/>
                            <label for="cm_star-3"><i class="fa"></i></label>
                            <input type="radio" id="cm_star-3" name="fb" value="3"/>
                            <label for="cm_star-4"><i class="fa"></i></label>
                            <input type="radio" id="cm_star-4" name="fb" value="4"/>
                            <label for="cm_star-5"><i class="fa"></i></label>
                            <input type="radio" id="cm_star-5" name="fb" value="5"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    `;

    Movie = dados.results[1];
    data = new Date (Movie.release_date);
    divLancamento2.innerHTML = `
        <div class="row" style="margin-bottom: 35px;">
            <div class="Banner-video col-xs-12 col-12 col-md-6" style="min-height: 294px;">
                <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}">
                    <img src="${IMG_BASE_URL + Movie.backdrop_path}" class="rounded mx-auto d-block" alt="Responsive image"> 
                </a>
            </div>
            <div class="Banner-Texto col-xs-12 col-12 col-md-6">
                <h4>${Movie.title}</h4>
                <p1 class="text-justify" height="100% ">
                    ${Movie.overview} <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}"> Ver mais...</a>
                </p1>
                <p></p>
                <div class="col-12">
                    Estreia:  ${data.toLocaleDateString ()}
                </div>

                <div class="row ">
                    <div class="col-3">
                        ${Movie.vote_average} / 10 
                    </div>

                    <div id="Avalicao" class="col-9">
                        
                        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
                        <div class="estrelas">
                        <input type="radio" id="cm_star-empty" name="fb" value="" checked/>
                        <label for="cm_star-1"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-1" name="fb" value="1"/>
                        <label for="cm_star-2"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-2" name="fb" value="2"/>
                        <label for="cm_star-3"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-3" name="fb" value="3"/>
                        <label for="cm_star-4"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-4" name="fb" value="4"/>
                        <label for="cm_star-5"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-5" name="fb" value="5"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;

    Movie = dados.results[2];
    data = new Date (Movie.release_date);
    divLancamento3.innerHTML = `
        <div class="row" style="margin-bottom: 35px;">
            <div class="Banner-video col-xs-12 col-12 col-md-6" style="min-height: 294px;">
                <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}">
                    <img src="${IMG_BASE_URL + Movie.backdrop_path}" class="rounded mx-auto d-block" alt="Responsive image">
                </a> 
            </div>
            <div class="Banner-Texto col-xs-12 col-12 col-md-6">
                <h4>${Movie.title}</h4>
                <p1 height="100% ">
                    ${Movie.overview} <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}"> Ver mais...</a>
                </p1>
                <p></p>
                <div class="col-12">
                    Estreia:  ${data.toLocaleDateString ()}
                </div>

                <div class="row ">
                    <div class="col-3">
                        ${Movie.vote_average} / 10 
                    </div>

                    <div id="Avalicao" class="col-9">
                        
                        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
                        <div class="estrelas">
                        <input type="radio" id="cm_star-empty" name="fb" value="" checked/>
                        <label for="cm_star-1"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-1" name="fb" value="1"/>
                        <label for="cm_star-2"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-2" name="fb" value="2"/>
                        <label for="cm_star-3"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-3" name="fb" value="3"/>
                        <label for="cm_star-4"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-4" name="fb" value="4"/>
                        <label for="cm_star-5"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-5" name="fb" value="5"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;

    Movie = dados.results[3];
    data = new Date (Movie.release_date);
    divLancamento4.innerHTML = `
        <div class="row" style="margin-bottom: 35px;">
            <div class="Banner-video col-xs-12 col-12 col-md-6" style="min-height: 294px;">
                <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}">
                    <img src="${IMG_BASE_URL + Movie.backdrop_path}" class="rounded mx-auto d-block" alt="Responsive image"> 
                </a>
            </div>
            <div class="Banner-Texto col-xs-12 col-12 col-md-6">
                <h4>${Movie.title}</h4>
                <p1 height="100% ">
                    ${Movie.overview} <a href="${CURRENT_URL}/detalhes.html?id=${Movie.id}"> Ver mais...</a>
                </p1>
                <p></p>
                <div class="col-12">
                    Estreia:  ${data.toLocaleDateString ()}
                </div>

                <div class="row ">
                    <div class="col-3">
                        ${Movie.vote_average} / 10 
                    </div>

                    <div id="Avalicao" class="col-9">
                        
                        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
                        <div class="estrelas">
                        <input type="radio" id="cm_star-empty" name="fb" value="" checked/>
                        <label for="cm_star-1"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-1" name="fb" value="1"/>
                        <label for="cm_star-2"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-2" name="fb" value="2"/>
                        <label for="cm_star-3"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-3" name="fb" value="3"/>
                        <label for="cm_star-4"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-4" name="fb" value="4"/>
                        <label for="cm_star-5"><i class="fa"></i></label>
                        <input type="radio" id="cm_star-5" name="fb" value="5"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `; 
}
function PesquisaLancamento()
{
    const xhr = new XMLHttpRequest();
    xhr.onload = Lancamento;
    xhr.open ('GET',`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY_MOVIES}&language=pt-BR`);
    xhr.send ();
}

PesquisaLancamento();
PesquisaEmDestaque();
executaPesquisa();