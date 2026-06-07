// ============================================================
// 1. SISTEMA DO PLAYER DE MÚSICA FLUTUANTE
// ============================================================

// Playlist de músicas (com o caminho correto da sua pasta)
const playlist = [
    { nome: "To Sem Creatividade", file: "fotosevideos/to_sem_creatividade.mp3" }
    // Se quiser colocar mais músicas no futuro, é só adicionar aqui:
    // { nome: "Nome da Música 2", file: "fotosevideos/musica2.mp3" }
];

let indiceMusica = 0;
const meuAudio = document.getElementById("meuAudio");
const btnPlay = document.getElementById("btn-play");
const nomeMusicaMarquee = document.getElementById("nome-musica");

// Função para dar Play ou Pause
function playPause() {
    if (meuAudio.paused) {
        meuAudio.play();
        btnPlay.innerText = "⏸"; // Muda o ícone para Pause
        nomeMusicaMarquee.innerText = playlist[indiceMusica].nome; // Mostra o nome rodando
    } else {
        meuAudio.pause();
        btnPlay.innerText = "▶"; // Volta para o ícone de Play
    }
}

// Função para avançar a música (caso coloque mais na lista)
function proximaMusica() {
    indiceMusica++;
    if (indiceMusica >= playlist.length) {
        indiceMusica = 0; // Volta para a primeira se acabar
    }
    carregarETocar();
}

// Função para voltar a música
function tocarAnterior() {
    indiceMusica--;
    if (indiceMusica < 0) {
        indiceMusica = playlist.length - 1; // Vai para a última se voltar da primeira
    }
    carregarETocar();
}

// Auxiliar para carregar o arquivo novo e dar play direto
function carregarETocar() {
    meuAudio.src = playlist[indiceMusica].file;
    meuAudio.play();
    btnPlay.innerText = "⏸";
    nomeMusicaMarquee.innerText = playlist[indiceMusica].nome;
}

// Evento automático: quando a música acabar, pula para a próxima sozinha
meuAudio.addEventListener("ended", proximaMusica);


// ============================================================
// 2. SISTEMA DE LIGHTBOX (ZOOM DAS FOTOS)
// ============================================================

// Executa os cliques assim que a página carregar na tela
window.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById('lightbox');
    const imgAmpliada = document.getElementById('img-ampliada');
    const legenda = document.getElementById('legenda-lightbox');
    const botaoFechar = document.querySelector('.fechar-lightbox');

    // Seleciona as fotos de destaque da Home e as fotos da galeria (se você usar as mesmas classes)
    const fotosParaAmpliar = document.querySelectorAll('.foto-grupo, .foto-galeria');

    fotosParaAmpliar.forEach(foto => {
        // Deixa o cursor com a lupinha de zoom ao passar o mouse
        foto.style.cursor = "zoom-in";

        foto.addEventListener('click', function(e) {
            lightbox.style.display = "block"; // Mostra a tela preta
            imgAmpliada.src = this.src;       // Copia a imagem para o centro
            legenda.innerHTML = this.alt;     // Usa o texto "alt" como legenda
        });
    });

    // Função para fechar o zoom
    function fecharLightbox() {
        lightbox.style.display = "none";
    }

    // Fecha se clicar no botão (X)
    if (botaoFechar) {
        botaoFechar.addEventListener('click', fecharLightbox);
    }

    // Fecha se clicar no fundo preto (fora da foto)
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            fecharLightbox();
        }
    });

    // Fecha se apertar a tecla ESC do teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            fecharLightbox();
        }
    });
});