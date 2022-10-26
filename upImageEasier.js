javascript: /* facilita upload de imagem na vtex */
myWindow = window//.open("", "", `top=100,left=100,,width=${screen.width/2-100},height=${screen.height-300}`);

myWindow.document.write(`

<title>Multiple file upload</title>

<style>
  body {
    background-color: lightgray;
  }
  button {
    font-size: 32px;
    width: 100%;
    padding: 1em;
    background: #4c4;
    color: white;
    border: none;
    display: block;
  }
  [type='file'] {
    background: #47f;
    width: 100%;
    height: 256px;
    color: white;
  }
  img {
    display: block;
    width: 128px;
    height: 128px;
    object-fit: scale-down;
    outline: solid 2px;
    background-color: crimson;
    border-radius: 4px;
  }
  div {
    display: grid;
    gap: 8px;
    padding-block: 8px;
  }
</style>

<button>Enviar</button>
<input type='file' multiple>
<div></div>
<ul>
  <li>clique e arraste para reordenar</li>
  <li>clique com o botão direito do mouse para remover</li>
</ul>

`);

botao = myWindow.document.querySelector('button');
i = myWindow.document.querySelector('input');
container = myWindow.document.querySelector("div");


i.onchange = function(e) {
  let arquivos = this.files;
  for (let arq of arquivos) {
    let leitor = new FileReader();
    leitor.onload = function() {
      let bloco = document.createElement("img");
      bloco.title = bloco.alt = arq.name;
      bloco.src = leitor.result;
      bloco.draggable = true;
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
      let dataurl = container.children[0].src;
      let filename = container.children[0].alt;
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
