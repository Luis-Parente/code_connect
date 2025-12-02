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

const inputTags = document.getElementById("categoria");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueDeveSerRemovida = evento.target.parentElement;
        listaTags.removeChild(tagQueDeveSerRemovida);
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificarTags(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificarTags(tagTexto);
                if (tagExiste) {
                    const novaTag = document.createElement("li");
                    novaTag.innerHTML = `<p>${tagTexto}</p> <img src="img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(novaTag);
                    inputTags.value = "";
                } else {
                    alert("Tag inválida");
                }
            } catch (erro) {
                console.error("Erro ao inserir tag");
                alert("Erro ao inserir tag");
            }
        }
    }
})

function limparFormulario() {
    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "img/imagem1.png";
    nomeDaImagem.textContent = "imagem_projeto.png";

    listaTags.innerHTML = "";
}

const descartarBtn = document.querySelector(".botao-descartar");

descartarBtn.addEventListener("click", async (evento) => {
    evento.preventDefault();
    limparFormulario();
})

const publicarBtn = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const funcinou = Math.random() > 0.5;

            if (funcinou) {
                resolve("Projeto publicado com sucesso");
            } else {
                reject("Erro ao publicar projeto");
            }
        }, 1000)
    })
}

publicarBtn.addEventListener("click", async (evento) => {
    evento.preventDefault();
    const nomeProjeto = document.getElementById("nome").value;
    const descricaoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto);
        limparFormulario();
        console.log(resultado);
        alert(resultado);
    } catch (erro) {
        console.error(erro);
        alert(erro);
    }
})