javascript: console.clear(); /* GERA DESCRIÇÃO PELO FILTRO */

console.log("VERSÃO DE 2022 JUN 24");

buscarNoMundo = function() {
  document.querySelector("#productTabNavigation").querySelectorAll("a")[1].click();
  const filtro = {};
  document.querySelectorAll("#tabSpecifications>table>tbody>tr:not(.titSecao)").forEach(campo => {
    const key = campo.querySelector("th").innerText.split(":")[0]; /* key name ( sem ":" ) */
    switch (true) {
      case campo.querySelectorAll("input[type='checkbox']").length > 0: /* checkbox */
        const boxs = [];
        campo.querySelectorAll("input[type='checkbox']:checked+label").forEach(label => {
          boxs.push(label.innerText)
        });
        filtro[key] = boxs.join(", ");
        break;
      case campo.querySelectorAll("input[type='radio']").length > 0: /* radio */
        filtro[key] = campo.querySelector("input[type='radio']:checked+label")?.innerText;
        break;
      case campo.querySelectorAll("input[type='text']").length > 0: /* text */
        filtro[key] = campo.querySelector("input[type='text']").value;
        break;
      case campo.querySelectorAll("textarea").length > 0: /* textarea */
        filtro[key] = campo.querySelector("textarea").value;
        break;
      case campo.querySelectorAll("select").length > 0: /* select */
        const selectElement = campo.querySelector("select");
        filtro[key] = selectElement.options[selectElement.selectedIndex].text;
        break;
      default:
        alert("Estranho...\nNão era suposto que você recebece essa mensagem!\nAvisa lá o Tsudi!");
    }
  });
  filtro.categoria = document.querySelector("#ctl00_Conteudo_tbxIdCategoria_TxtNome").value.toUpperCase();
  console.table(filtro);

  return filtro;
};

gerarDescricao = function(dados) {
  let descricao;
  const deuruim = [];
  const _ = function(key) {
    if (dados[key] == null || !dados[key].length) {
      console.warn(`Campo '${key}' está como ${dados[key]}!`);
      deuruim.push(key);
    }
    return dados[key]
  };

  try {
    const finalDescJoia = `\n\nAs imagens das Joias são ampliadas para melhor visualização, não correspondendo ao tamanho original.\n\nProduto de qualidade certificada pela AConfiança.\nGarantimos a procedência e autenticidade, bem como proteção contra defeito de fabricação por 3 meses. Não são cobertos os danos por quebras, perda de pedras, amassados, arranhões, desgastes, gravados e manchas por produtos químicos.\n\nRecomendações:\nEvite contato com produtos químicos: perfume, creme, pomada, cloro, mercúrio, detergente, etc.\nNão utilizar em tarefas manuais pesadas.\nAs Joias são artigos de valor. Conservadas de maneira apropriada, serão eternas.`;
    switch (true) {
      case dados.categoria.includes("BRINCO"): {
        descricao = `Tamanho: ${_("Tamanho")}\nTipo: ${_("Tipo")}\nMetal: ${_("Metal")}\nAcabamento: ${_("Acabamento")}\nGema: ${_("Gema")}\nQuantidade de Gemas: ${_("Quantidade de Gemas")}\nTipo de Fecho: ${_("Tipo de Fecho")}\nAltura: ${_("Altura (mm)")}mm\nEspessura: ${_("Espessura (mm)")}mm\nPeso Médio: ${_("Peso Médio do Par (g)")}g (par)\nModelo: ${_("Modelo")}\nFabricante: ISHII JEWELRY` + finalDescJoia;
        break;
      }
      case dados.categoria.includes("PULSEIRA"): {
        descricao = `Tamanho: ${_("Tamanho")}\nTipo de Elos: ${_("Tipo de Elos")}\nMetal: ${_("Metal")}\nAcabamento: ${_("Acabamento")}\nGema: ${_("Gema")}\nQuantidade de Gemas: ${_("Quantidade de Gemas")}\nTipo de Fecho: ${_("Tipo de Fecho")}\nComprimento: ${_("Comprimento (mm)")}mm\nEspessura: ${_("Espessura (mm)")}mm\nPeso Médio: ${_("Peso Médio (g)")}g\nModelo: ${_("Modelo")}\nFabricante: ISHII JEWELRY` + finalDescJoia;
        break;
      }
      case dados.categoria.includes("PINGENTE"): {
        descricao = `*Pingente não acompanha corrente\n\nMetal: ${_("Metal novo")}\nAcabamento: ${_("Acabamento")}\nGema: ${_("Gema")}\nQuantidade de Gemas: ${_("Quantidade de Gemas")}\nAltura: ${_("Altura (mm)")} mm\nLargura: ${_("Largura (mm)")} mm\nEspessura: ${_("Espessura (mm)")} mm\nPeso Médio: ${_("Peso Médio (g)")} g\nFabricante: ISHII JEWELRY` + finalDescJoia;
      }
      case dados.categoria.includes("ANÉIS"): {
        descricao = `Metal: ${_("Metal")}\nAcabamento: ${_("Acabamento")}\nGema: ${_("Gema")}\nQuantidade de Gemas: ${_("Quantidade de Gemas")}\n\nTamanho: ${_("Tamanho")}\nLargura: ${_("Largura (mm)")} mm\nEspessura: ${_("Espessura (mm)")} mm\nPeso Médio: ${_("Peso médio (g)")}g\nFabricante: ISHII JEWELRY` + finalDescJoia;
        break;
      }
      default: {
        const pressao = _("Pressão debaixo dágua (ATM)");
        descricao = `Relógio ${_("categoria")} ${_("Modelo")} novo e original.\nAcompanha embalagem oficial, certificado de garantia de 1 ano pelo fabricante, manual e nota fiscal.\n\nModelo: ${_("Modelo")}\nGênero: ${_("Gênero")}\nGarantia: 12 meses\n\nCaracterísticas\nFormato do Relógio: ${_("Formato do Relógio")}\nComposição do Vidro: ${_("Composição do Vidro")}\nMaterial da Caixa: ${_("Material da Caixa")}\nCor da Caixa: ${_("Cor da Caixa")}\nCor do mostrador: ${_("Cor do Mostrador")}\nMaterial da Pulseira: ${_("Material da Pulseira")}\nCor da Pulseira: ${_("Cor da Pulseira")}\nMecanismo: ${_("Mecanismo")}\n\nMedidas\nLargura da Caixa: ${_("Largura da Caixa (mm)")} mm\nEspessura da Caixa: ${_("Espessura da Caixa (mm)")} mm\n\nResistência à Água\nPressão: ${pressao} ATMs\nResistência a respingos: Sim\nPrática de natação: ${pressao>=5?"Sim":"Não recomendado"}\nPrática de mergulho: ${pressao>=10?"Sim":"Não recomendado"}\nNão recomendado utilizar em água salgada ou durante o banho quente\n(exceto relógios apropriados para mergulho profissional)${dados["Funções do Relógio"]?.length ?`\n\nFunções do Relógio\n${dados["Funções do Relógio"]}`:""}`;
      };
    }
    if (deuruim.length) {
      alert(`${deuruim.length} CAMPO PENDENTE!\n\n${deuruim.join(", ")}`)
    } else colarNoTextBox: {
      document.querySelector("#productTabNavigation").querySelectorAll("a")[0].click();
      const textAreaElement = document.querySelector("#ctl00_Conteudo_tbxTexto_txtId");
      textAreaElement.value = descricao;
      textAreaElement.style.width = "600px",
      textAreaElement.style.height = "0px";
      textAreaElement.style.height = textAreaElement.scrollHeight + 5 + "px";
      console.log('%cXUXU BELEZA!', 'font-size: 50px; color: lime');
    }
  } catch (err) {
    alert(err)
  }
};

gerarDescricao(buscarNoMundo());
