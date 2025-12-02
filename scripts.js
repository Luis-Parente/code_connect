const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve({url: reader.result, nome: arquivo.name});
        }
        reader.onerror = (e) => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        }

        reader.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoArquivo = await lerConteudoArquivo(arquivo);
            imagemPrincipal.src = conteudoArquivo.url;
            nomeDaImagem.textContent = conteudoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo");
        }
    }
})