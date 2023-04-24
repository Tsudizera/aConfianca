javascript: console.clear(); /* GERA DESCRIÇÃO PELO FILTRO */

console.log("VERSAO: 2023 ABR 24");

buscarNoMundo = function() {
  document.querySelector("#productTabNavigation").querySelectorAll("a")[1].click();
  const filtro = {};
  document.querySelectorAll("#tabSpecifications>table>tbody>tr:not(.titSecao)").forEach(campo => {
    const key = campo.querySelector("th").innerText.split(":")[0]; /* key name ( sem ":" ) */
    switch (true) {
      case campo.querySelectorAll("[type='checkbox']").length > 0: /* checkbox */
        const boxs = [];
        campo.querySelectorAll("[type='checkbox']:checked+label").forEach(label => {
          boxs.push(label.innerText)
        });
        filtro[key] = boxs.join(", ");
        break;
      case campo.querySelectorAll("[type='radio']").length > 0: /* radio */
        filtro[key] = campo.querySelector("[type='radio']:checked+label")?.innerText;
        break;
      case campo.querySelectorAll("[type='text']").length > 0: /* text */
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
  filtro.marca = document.querySelector("#ctl00_Conteudo_tbxIdMarca_rptArquivos_ctl01_lblNomeDadoAssociado").innerText.toUpperCase();
  console.log(filtro);

  return filtro;
};

gerarDescricao = function(dados) {
  let descricao;
  const problemas = {};
  const _ = function(key) {
    if ( !(dados[key]?.length ) ) {
      problemas[key] = dados[key];
    }
    return dados[key]
  };

  try {
    const finalDescJoia = `\n\nAs imagens das Joias são ampliadas para melhor visualização, não correspondendo ao tamanho original.\n\nProduto de qualidade certificada pela AConfiança.\nGarantimos a procedência e autenticidade, bem como proteção contra defeito de fabricação por 3 meses. Não são cobertos os danos por quebras, perda de pedras, amassados, arranhões, desgastes, gravados e manchas por produtos químicos.\n\nRecomendações:\nEvite contato com produtos químicos: perfume, creme, pomada, cloro, mercúrio, detergente, etc.\nNão utilizar em tarefas manuais pesadas.\n\nAs Joias são artigos de valor. Conservadas de maneira apropriada, serão eternas.`;
    switch (true) {
      default: {
        const pressao = _("Pressão debaixo dágua (ATM)");
        descricao = `Relógio ${_("categoria")} ${_("Modelo")} NOVO e ORlGlNAL.\nAcompanha embalagem oficial, certificado de garantia de 1 ano pelo fabricante, manual de instruções e N0TA FlSCAL.\n\nModelo: ${_("Modelo")}\nGênero: ${_("Gênero")}\nGarantia: 12 meses\n\nCaracterísticas\nFormato do Relógio: ${_("Formato do Relógio")}\nComposição do Vidro: ${_("Composição do Vidro")}\nMaterial da Caixa: ${_("Material da Caixa")}\nCor da Caixa: ${_("Cor da Caixa")}\nCor do mostrador: ${_("Cor do Mostrador")}\nMaterial da Pulseira: ${_("Material da Pulseira")}\nCor da Pulseira: ${_("Cor da Pulseira")}\nMecanismo: ${_("Mecanismo")}\n\nMedidas\nLargura da Caixa: ${_("Largura da Caixa (mm)")} mm\nEspessura da Caixa: ${_("Espessura da Caixa (mm)")} mm\n\nResistência à Água\nPressão: ${pressao} ATMs\nResistência a respingos: Sim\nPrática de natação: ${pressao>=5?"Sim":"Não recomendado"}\nPrática de mergulho: ${pressao>=10?"Sim":"Não recomendado"}\nNão recomendado utilizar em água salgada ou durante o banho quente\n(exceto relógios apropriados para mergulho profissional)${dados["Funções do Relógio"]?.length ? `\n\nFunções do Relógio\n${dados["Funções do Relógio"]}`:""}`;
        break;
      }
      case dados.categoria.includes("RELÓGIO DE PAREDE"): {
        descricao = `Relógio de Parede ${_("marca")} NOVO e ORlGlNAL.\nAcompanha embalagem oficial, certificado de garantia de 1 ano pelo fabricante, manual de instruções e N0TA FlSCAL.\n\nDimensões\nAltura: ${_("Altura")}cm\nLargura: ${_("Largura")}cm\nEspessura: ${_("Espessura")}cm\n\nFunções do Relógio\n${_("Funções")}\n\nMaterial\nAcabamento: ${_("Acabamento")}\nVisor: ${_("Visor")}\n\nBateria: ${_("Bateria (tipo)")}`;
        break;
      }
      case dados.categoria.includes("BRINCO"): {
        descricao = `Tamanho: ${_("Tamanho")}\nTipo: ${_("Tipo")}\nMetal: ${_("Metal")}\nAcabamento: ${_("Acabamento")}\nGema: ${_("Gema")}\nTipo de Fecho: ${_("Tipo de Fecho")}\nAltura: ${_("Altura (mm)")} mm\nEspessura: ${_("Espessura (mm)")} mm\nPeso Aproximado: ${_("Peso Aproximado (g)")} g (par)\nModelo: ${_("Modelo")}\nFabricante: ISHII JEWELRY` + finalDescJoia;
        break;
      }
      case dados.categoria.includes("PULSEIRA"): {
        descricao = `Tamanho: ${_("Tamanho")}\nTipo de Elos: ${_("Tipo de Elos")}\nMetal: ${_("Metal")}\nAcabamento: ${_("Acabamento")}\nGema: ${_("Gema")}\nTipo de Fecho: ${_("Tipo de Fecho")}\nComprimento: ${_("Comprimento (mm)")} mm\nEspessura: ${_("Espessura (mm)")} mm\nPeso Aproximado: ${_("Peso Aproximado (g)")} g\nModelo: ${_("Modelo")}\nFabricante: ISHII JEWELRY` + finalDescJoia;
        break;
      }
      case dados.categoria.includes("PINGENTE"): {
        descricao = `*Pingente não acompanha corrente\n\nMetal: ${_("Metal novo")}\nAcabamento: ${_("Acabamento")}\nGema: ${_("Gema")}\nAltura: ${_("Altura (mm)")} mm\nLargura: ${_("Largura (mm)")} mm\nEspessura: ${_("Espessura (mm)")} mm\nPeso Aproximado: ${_("Peso Aproximado (g)")} g\nFabricante: ISHII JEWELRY` + finalDescJoia;
      }
      case dados.categoria.includes("ANÉIS"): {
        descricao = `Metal: ${_("Metal")}\nAcabamento: ${_("Acabamento")}\nGema: ${_("Gema")}\n\nTamanho: ${_("Tamanho")}\nAro: ${_("Aro")}\nLargura: ${_("Largura (mm)")} mm\nEspessura: ${_("Espessura (mm)")} mm\nPeso Aproximado: ${_("Peso Aproximado (g)")} g\nFabricante: ISHII JEWELRY` + finalDescJoia;
        break;
      }
      case dados.categoria.includes("CORRENTES"): {
        descricao = `Tipo de Elos: ${_("Tipo de Elos")}\nMetal: ${_("Metal")}\nTipo de Fecho: ${_("Tipo de Fecho")}\nComprimento: ${_("Comprimento")} cm\nEspessura: ${_("Espessura (mm)")} mm\nPeso Aproximado: ${_("Peso Aproximado (g)")} g\nModelo: ${_("Modelo")}\nFabricante: ISHII JEWELRY` + finalDescJoia;
        break;
      }
      case dados.categoria.includes("ÓCULOS SOLAR"): {
        descricao = `Óculos ${_("marca")} ${_("Modelo")} NOVO e ORlGlNAL.\nAcompanha embalagem oficial, certificado de garantia de 2 anos pelo fabricante e N0TA FlSCAL.\n\nArmação\nCor da armação: ${_("Cor da armação")}\nMaterial da armação: ${_("Material da armação")}\nFormato da armação: ${_("Formato da armação")}\n\nLente\nCor da lente: ${_("Cor da lente")}\nMaterial da lente: ${_("Material da lente")}\nTratamento da lente: ${_("Tratamento da lente")}\nPolarizado: ${_("Polarizado")}\n\nMedidas\nTamanho: ${_("Tamanho")}\nAltura : ${_("Altura (mm)")} mm\nDiagonal : ${_("Diâmetro Efetivo (mm)")} mm\nPonte : ${_("Ponte (mm)")} mm\nHastes : ${_("Hastes (mm)")} mm`;
        break;
      }
      case dados.categoria.includes("ALIANÇAS"): {
        descricao = `Categoria: ${_("Categoria")}\nModelo: ${_("Modelo")}\nMetal: ${_("Metal")}\nFormato interno: ${_("Formato interno")}\nFormato externo: ${_("Formato externo")}\nAcabamento: ${_("Acabamento")}\nGema: ${_("Gema")}\n\nLargura: ${_("Largura (mm)")} mm\nEspessura: ${_("Espessura (mm)")} mm\nPeso Aproximado: ${_("Peso Aproximado (g)")} g\nFabricante: ISHII JEWELRY` + finalDescJoia;
        break;
      }
    }

    let campos = Object.keys(problemas);
    if ( campos.length ) {
      alert(`${campos.length} CAMPO PENDENTE!\n\n${campos.join(",\n")}`);
      console.warn(`POBREMA`);
      console.warn(problemas);
      return;
    }
    
    colarNoTextBox: {
      document.querySelector("#productTabNavigation").querySelectorAll("a")[0].click();
      const textAreaElement = document.querySelector("#ctl00_Conteudo_tbxTexto_txtId");
      textAreaElement.value = descricao;
      textAreaElement.style.width = "600px";
      textAreaElement.style.height = "0px";
      textAreaElement.style.height = textAreaElement.scrollHeight + 5 + "px";
      document.querySelector('#ctl00_Conteudo_tbxMetaTagDescription_txtId').value = '';
      console.log('%cXUXU BELEZA!', 'font-size: 50px; color: lime');
    }
    
  } catch (err) {
    alert(err)
  }
  
};

gerarDescricao(buscarNoMundo());
