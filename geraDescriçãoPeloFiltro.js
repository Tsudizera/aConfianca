/* GERA DESCRIÇÃO PELO FILTRO */
console.clear(); /* get */
document.querySelector("#productTabNavigation").querySelectorAll("a")[1].click();
var filtro = {};
document.querySelectorAll("#tabSpecifications>table>tbody>tr:not(.titSecao)").forEach(campo => {
  /* key sem ":" */
  const key = campo.querySelector("th").innerText.split(":")[0]; /* value */
  switch (true) {
    case campo.querySelectorAll("input[type='checkbox']").length > 0:
      /* checkbox */
      const boxs = []; campo.querySelectorAll("input[type='checkbox']:checked+label").forEach(label => { boxs.push(label.innerText) });
      filtro[key] = boxs.join(", ");
      break;
    case campo.querySelectorAll("input[type='radio']").length > 0:
      /* radio */
      filtro[key] = campo.querySelector("input[type='radio']:checked+label")?.innerText;
      break;
    case campo.querySelectorAll("input[type='text']").length > 0:
      /* text */
      filtro[key] = campo.querySelector("input[type='text']").value;
      break;
    case campo.querySelectorAll("textarea").length > 0:
      /* textarea */
      filtro[key] = campo.querySelector("textarea").value;
      break;
    case campo.querySelectorAll("select").length > 0:
      /* select */
      const selectElement = campo.querySelector("select");
      filtro[key] = selectElement.options[selectElement.selectedIndex].text;
      break;
    default:
      console.log("Não tava preparado para isso");
  }
});
console.table(filtro); /* set individualidade de acordo com o tipo */
var camposObrigatorios, gerarDescricao;
tipo = document.querySelector("#ctl00_Conteudo_tbxIdCategoria_TxtNome").value.toUpperCase();
switch (true) {
  case tipo.includes("BRINCO"):
    console.log("Identificado como brinco");
    camposObrigatorios = ["Tamanho", "Tipo", "Metal", "Acabamento", "Gema", "Quantidade de Gemas", "Tipo de Fecho", "Altura (mm)", "Espessura (mm)", "Peso Médio do Par (g)", "Modelo"];
    gerarDescricao = function() {
      return `Tamanho: ${filtro["Tamanho"]}\nTipo: ${filtro["Tipo"]}\nMetal: ${filtro["Metal"]}\nAcabamento: ${filtro["Acabamento"]}\nGema: ${filtro["Gema"]}\nQuantidade de Gemas: ${filtro["Quantidade de Gemas"]}\nTipo de Fecho: ${filtro["Tipo de Fecho"]}\nAltura: ${filtro["Altura (mm)"]}mm\nEspessura: ${filtro["Espessura (mm)"]}mm\nPeso Médio: ${filtro["Peso Médio do Par (g)"]}g (par)\nModelo: ${filtro["Modelo"]}\nFabricante: ISHII JEWELRY\n\nAs imagens das Joias são ampliadas para melhor visualização, não correspondendo ao tamanho original.\n\nProduto de qualidade certificada pela AConfiança.\nGarantimos a procedência e autenticidade, bem como proteção contra defeito de fabricação por 3 meses. Não são cobertos os danos por quebras, perda de pedras, amassados, arranhões, desgastes, gravados e manchas por produtos químicos.\n\nRecomendações:\nEvite contato com produtos químicos: perfume, creme, pomada, cloro, mercúrio, detergente, etc.\nNão utilizar em tarefas manuais pesadas.\nAs Joias são artigos de valor. Conservadas de maneira apropriada, serão eternas.`;
    };
    break;
  case tipo.includes("PULSEIRA"):{
    console.log("Identificado como pulseira");
    camposObrigatorios = ["Tamanho", "Tipo de Elos", "Metal", "Acabamento", "Gema", "Quantidade de Gemas", "Tipo de Fecho", "Comprimento (mm)", "Espessura (mm)", "Peso Médio (g)", "Modelo"];
    gerarDescricao = function() {
      return `Tamanho: ${filtro["Tamanho"]}\nTipo de Elos: ${filtro["Tipo de Elos"]}\nMetal: ${filtro["Metal"]}\nAcabamento: ${filtro["Acabamento"]}\nGema: ${filtro["Gema"]}\nQuantidade de Gemas: ${filtro["Quantidade de Gemas"]}\nTipo de Fecho: ${filtro["Tipo de Fecho"]}\nComprimento: ${filtro["Comprimento (mm)"]}mm\nEspessura: ${filtro["Espessura (mm)"]}mm\nPeso Médio: ${filtro["Peso Médio (g)"]}g\nModelo: ${filtro["Modelo"]}\nFabricante: ISHII JEWELRY\n\nAs imagens das Joias são ampliadas para melhor visualização, não correspondendo ao tamanho original.\n\nProduto de qualidade certificada pela AConfiança.\nGarantimos a procedência e autenticidade, bem como proteção contra defeito de fabricação por 3 meses. Não são cobertos os danos por quebras, perda de pedras, amassados, arranhões, desgastes, gravados e manchas por produtos químicos.\n\nRecomendações:\nEvite contato com produtos químicos: perfume, creme, pomada, cloro, mercúrio, detergente, etc.\nNão utilizar em tarefas manuais pesadas.\nAs Joias são artigos de valor. Conservadas de maneira apropriada, serão eternas.`;
    };
  } break;
  case tipo.includes("PINGENTE"):{
    console.log("Identificado como pingente");
    camposObrigatorios = ["Metal novo","Acabamento","Gema","Quantidade de Gemas","Altura (mm)","Largura (mm)","Espessura (mm)","Peso Médio (g)"];
    gerarDescricao = function() {
      return `*Pingente não acompanha corrente\n\nMetal: ${filtro["Metal novo"]}\nAcabamento: ${filtro["Acabamento"]}\nGema: ${filtro["Gema"]}\nQuantidade de Gemas: ${filtro["Quantidade de Gemas"]}\nAltura: ${filtro["Altura (mm)"]} mm\nLargura: ${filtro["Largura (mm)"]} mm\nEspessura: ${filtro["Espessura (mm)"]} mm\nPeso Médio: ${filtro["Peso Médio (g)"]} g\nFabricante: ISHII JEWELRY\n\nAs imagens das Joias são ampliadas para melhor visualização, não correspondendo ao tamanho original.\n\nProduto de qualidade certificada pela AConfiança.\nGarantimos a procedência e autenticidade, bem como proteção contra defeito de fabricação por 3 meses. Não são cobertos os danos por quebras, perda de pedras, amassados, arranhões, desgastes, gravados e manchas por produtos químicos.\n\nRecomendações:\nEvite contato com produtos químicos: perfume, creme, pomada, cloro, mercúrio, detergente, etc.\nNão utilizar em tarefas manuais pesadas.\nAs Joias são artigos de valor. Conservadas de maneira apropriada, serão eternas.`;
    };
  } break;
  default:
    console.log("Não identificado! Assumindo que seja relógio de pulso");
    camposObrigatorios = ["Modelo", "Gênero", "Formato do Relógio", "Composição do Vidro", "Material da Caixa", "Cor da Caixa", "Cor do Mostrador", "Material da Pulseira", "Cor da Pulseira", "Mecanismo", "Largura da Caixa (mm)", "Espessura da Caixa (mm)", "Pressão debaixo dágua"];
    gerarDescricao = function() {
      const pressao = filtro["Pressão debaixo dágua"].slice(0, -4);
      const adicional = filtro["Funções do Relógio"].length;
      return `Relógio ${tipo} ${filtro["Modelo"]} novo e original.\nAcompanha embalagem oficial, certificado de garantia de 1 ano pelo fabricante, manual e nota fiscal.\n\nModelo: ${filtro["Modelo"]}\nGênero: ${filtro["Gênero"]}\nGarantia: 12 meses\n\nCaracterísticas\nFormato do Relógio: ${filtro["Formato do Relógio"]}\nComposição do Vidro: ${filtro["Composição do Vidro"]}\nMaterial da Caixa: ${filtro["Material da Caixa"]}\nCor da Caixa: ${filtro["Cor da Caixa"]}\nCor do mostrador: ${filtro["Cor do Mostrador"]}\nMaterial da Pulseira: ${filtro["Material da Pulseira"]}\nCor da Pulseira: ${filtro["Cor da Pulseira"]}\nMecanismo: ${filtro["Mecanismo"]}\n\nMedidas\nLargura da Caixa: ${filtro["Largura da Caixa (mm)"]} mm\nEspessura da Caixa: ${filtro["Espessura da Caixa (mm)"]} mm\n\nResistência à Água\nPressão: ${filtro["Pressão debaixo dágua"]}\nResistência a respingos: Sim\nPrática de natação: ${pressao>=5?"Sim":"Não recomendado"}\nPrática de mergulho: ${pressao>=10?"Sim":"Não recomendado"}\nNão recomendado utilizar em água salgada ou durante o banho quente\n(exceto relógios apropriados para mergulho profissional)${adicional?`\n\nFunções do Relógio\n${filtro["Funções do Relógio"]}`:""}`;
    };
}
/* verifica se tem todos os campos */
if (camposObrigatorios.every(key => { if (filtro[key] == null || !filtro[key].length) { alert(`Campo "${key}" não identificado!`); return false; } return true; })){
  document.querySelector("#productTabNavigation").querySelectorAll("a")[0].click();
  const textAreaElement = document.querySelector("#ctl00_Conteudo_tbxTexto_txtId");
  textAreaElement.value = gerarDescricao();
  textAreaElement.style.width = "600px", textAreaElement.style.height = "0px", textAreaElement.style.height = textAreaElement.scrollHeight + 5 + "px";
  console.log('%cXUXU BELEZA!', 'font-size: 50px; color: lime');
}
