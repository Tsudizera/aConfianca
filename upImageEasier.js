javascript: /* facilita upload de imagem na vtex */
myWindow = window.open("", "", `top=100,left=100,,width=${screen.width/2-100},height=${screen.height-300}`);

myWindow.document.write(`

<title>Multiple file upload</title>

<style>
  body {
    background-color: lightgray;
    display: grid;
    align-content: start;
    gap: 16px;
  }

  button {
    font-size: 1.5rem;
    width: 100%;
    padding: 1em;
    background: #4c4;
    color: white;
    border: none;
    display: block;
    border-radius: 8px;
  }

  #dropFileArea {
    font-size: 2rem;
    width: 100%;
    height: 256px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    color: snow;
    font-family: monospace;
  }

  #dropFileArea [type='file'] {
    position: absolute;
    inset: 0;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }

  #dropFileArea:after,
  #dropFileArea:before {
    display: grid;
    place-items: center;
    position: absolute;
    inset: 0;
    transition: inset .25s;
  }

  #dropFileArea:after {
    content: "⇪";
    font-size: 4em;
    background-color: RoyalBlue;
  }

  /* cool transition */
  #dropFileArea:before {
    content: "UPLOAD LOCAL FILE";
    background-color: CornflowerBlue;
  }

  #dropFileArea:hover:after {
    top: -100%;
    bottom: 100%;
  }

  #dropFileArea:not(:hover):before {
    top: 100%;
    bottom: -100%;
  }

  figure {
    font-size: 1.5rem;
    margin: 0;
    display: grid;
    grid-template-columns: auto 1fr;
    box-shadow: 0 3px 8px #0003;
    border-radius: 4px;
    place-items: center;
    padding: 8px;
    gap: 16px;
    background: whitesmoke;

  }

  img {
    display: block;
    width: 80px;
    height: 80px;
    object-fit: scale-down;
    background-color: black;
  }

  .container {
    display: grid;
    gap: 8px;
  }

</style>

<body>
  <div id='dropFileArea'>
    <input type='file' multiple>
  </div>
  <div class='container'></div>
  <button>Enviar</button>
  <ul>
    <li>clique e arraste para reordenar</li>
    <li>clique com o botão direito do mouse para remover</li>
  </ul>
</body>

<template>
  <figure draggable="true">
    <img class="conteudo">
    <figcaption></figcaption>
  </figure>
</template>

`);

botao = myWindow.document.querySelector('button');
i = myWindow.document.querySelector('input');
container = myWindow.document.querySelector(".container");


i.onchange = function(e) {
  let arquivos = this.files;
  for (let arq of arquivos) {
    let leitor = new FileReader();
    leitor.onload = function() {
      const bloco = myWindow.document.importNode(myWindow.document.querySelector("template").content.querySelector("figure"), true);
      bloco.querySelector("img").src = leitor.result;
      bloco.querySelector("figcaption").innerHTML = arq.name;
      
      bloco.ondrag = function(e) {
        let deQuemTenhoQueBotarAntes = myWindow.document.elementFromPoint(event.clientX, event.clientY);
        if (this.parentNode === deQuemTenhoQueBotarAntes.parentNode) {
          if (deQuemTenhoQueBotarAntes === this.nextSibling) {
            deQuemTenhoQueBotarAntes = deQuemTenhoQueBotarAntes.nextElementSibling;
          }
          this.parentNode.insertBefore(this, deQuemTenhoQueBotarAntes);
        }
        this.style.visibility = "hidden";
      };
      bloco.ondragend = function(e) {
        this.style.visibility = "inherit"
      };
      bloco.oncontextmenu = function(e) {
        e.preventDefault();
        this.remove();
      };
      container.appendChild(bloco);
    };
    leitor.readAsDataURL(arq);
  }
  this.value = null;
};

botao.onclick = function() {
  botao.style.display = "none";
  i.style.display = "none";
  janelinha = document.createElement("iframe");
  document.body.appendChild(janelinha);
  janelinha.width = "100%";
  janelinha.height = "100%";
  janelinha.onload = function() {
    if (container.children.length) {
      let dataurl = container.children[0].querySelector("img").src;
      let filename = container.children[0].querySelector("figcaption").innerHTML;
      container.children[0].remove();
      let arr = dataurl.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) { u8arr[n] = bstr.charCodeAt(n); };
      let novoFILE = new File([u8arr], filename, { type: mime });
      let dataTransfer = new DataTransfer();
      dataTransfer.items.add(novoFILE);
      /* equivalente a upar e enviar */
      janelinha.contentWindow.document.querySelector("input[type=file]").files = dataTransfer.files;
      janelinha.contentWindow.document.querySelector("#ctl00_Conteudo_tbxIdArquivoControle_btnEnviar").click();
    } else {
      myWindow.close();
      window.location.reload();
    }
  };
  janelinha.src = window.location.href;
};
