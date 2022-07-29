/*javascript:
/* COPIA (DATA/PEDIDO/MKT/NOME/CPF[/MOD/SKU/QTD]) DA (MAGALU/B2W/ML/MLFULL(!)/AMZ/VIA(!)/SITE) */
/* substituir 'querySelector' por '$' */
/* (!) Parcial! Pendencias da VIA e MLFULL */

console.clear();
console.log("VERSÃO: 2022 JUL 16");
var $ = (q, parent = document) => parent.querySelector(q);
var $$ = (q, parent = document) => [...parent.querySelectorAll(q)];


function ctrl_C(pedido, mkt, nome, cpf, listaItens) {
  const agora = new Date();
  const dia = ("0" + agora.getDate()).slice(-2) + "/" + ("0" + (agora.getMonth() + 1)).slice(-2) + "/" + agora.getFullYear();
  pedido = `=HIPERLINK("${window.location.href}";"${pedido}")`;

  const modelo = listaItens.reduce((acc, maluco) => [...acc, maluco.modelo], []).join("\n");
  const sku = listaItens.reduce((acc, maluco) => [...acc, maluco.sku.replace(/\D/g, "")], []).join("\n");
  const qtd = listaItens.reduce((acc, maluco) => [...acc, maluco.qtd.replace(/\D/g, "")], []).join("\n");

  const el = document.createElement('textarea');
  console.log(el.value = `${dia}\t${pedido}\t${mkt}\t${nome}\t${cpf}\t"${modelo}"\t"${sku}"\t"${qtd}"`);
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  el.remove();
}


try {
  link = window.location.href;
  switch (true) {

    case link.includes("integracommerce.com.br/Order"): {
      console.log("MGL");
      const pedido = $$(".pl10 ,.valign-top")[0].innerText;
      const nome = $$(".pl10 ,.valign-top")[14].innerText;
      const cpf = $$(".pl10 ,.valign-top")[15].innerText;

      const itens = $$("div.col-sm-6", $("div.row.pr15.pl15.mt15"));
      const listaItens = [];
      for (const i of itens) {
        const umaConstanteComNomeRuim = $$("td.pl15.valign-top", i);
        const obj = {
          modelo: umaConstanteComNomeRuim[0].innerText,
          sku: umaConstanteComNomeRuim[1].innerText,
          qtd: umaConstanteComNomeRuim[3].innerText
        };
        listaItens.push(obj);
      }

      ctrl_C(pedido, "MGL", nome, cpf, listaItens);
      break;
    }

    case link.includes("americanasmarketplace.com.br/v3/pedidos/detalhes"): {
      console.log("B2W");
      const pedido = $(".timeline-delivery .p14").innerText;
      const nome = $$('section[_ngcontent-c22] .card .col-md-12')[1].querySelector("span").innerText;
      const cpf = $$('section[_ngcontent-c22] .card .col-md-4')[0].querySelector("span").innerText;

      const item = $$("div.card")[3];
      const listaModelo = $$(".p14-bold", item);
      const listaSku = $$("article .mt-10 span:not(.mr-20)", item);
      const listaQtd = $$("div.row.mt-25 div:first-child span", item);
      const listaItens = [];
      for (let k = 0; k < listaModelo.length; k++) {
        const obj = {
          modelo: listaModelo[k].innerText,
          sku: listaSku[k].innerText,
          qtd: listaQtd[k].innerText
        };
        listaItens.push(obj);
      }
      ctrl_C(pedido, "B2W", nome, cpf, listaItens);
      break;
    }

    case (link.includes("mercadolivre.com.br/vendas") && !link.includes("vendas/lista")): {
      console.log("ML");
      const pedido = $$(".sc-text")[0].innerText.match(/#\d*/g)[0].replace(/#/g, "");
      const cpf = $("div.sc-buyer__content p").innerText.split(" CPF ")[1];
      const nome = $("div.sc-buyer__content b").innerText;
      
      const listaItens = [];
      
      if ($(".sc-status__title-detail-container").innerHTML.includes("<svg")) {
        console.log("ML FULL");
        console.warn('ITENS PENDENTE! Não sei como fica o html quando compra mais que 1 item diferente. Se pá é igual ao ML normal.');
      } else {
        const itens = $$("div.sc-row-content.sc-row-content__expanded.sc-row-content__with-border>div");
        for (const i of itens) {
          const obj = {
            modelo: $("div.sc-title-subtitle-action__label", i).innerText,
            sku: $("div.sc-title-subtitle-action__sublabel", i).innerText,
            qtd: $("div.sc-quantity", i).innerText
          };
          listaItens.push(obj)
        }
      }
      ctrl_C(pedido, "ML", nome, cpf, listaItens);
      break;
    }

    case link.includes("amazon.com.br/orders-v3/order"): {
      console.log("AMZ");
      const pedido = $("span[data-test-id=order-id-value]").innerText;
      const nome = $$("div[data-test-id=shipping-section-buyer-address] span")[0].innerText.slice(0, -1);
      const cpf = $$("div.a-box")[2].querySelectorAll("span")[6].innerText;
      const itens = $$("div.a-row.a-spacing-large table.a-keyvalue>tbody>tr");

      const listaItens = [];
      for (const i of itens) {
        const obj = {
          modelo: $("a", i).innerText,
          sku: $$(".product-name-column-word-wrap-break-all", i)[1].innerText,
          qtd: $$("td", i)[4].innerText
        };
        listaItens.push(obj)
      }
      ctrl_C(pedido, "AMZ", nome, cpf, listaItens);
      break;
    }

    case link.includes("viavarejo.com.br/vendas/pedidos/detalhes"): {
      console.log("VIA");
      const pedido = $("b.text-green").innerText;
      const nome = $$("#gestao app-order-management-data-details label + span")[0].innerText;
      const cpf = $$("#gestao app-order-management-data-details label + span")[2].innerText;
      /* PENDENTE! Não sei como fica o html quando compra mais que 1 item diferente */
      const listaItens = [];
      ctrl_C(pedido, "VIA", nome, cpf, listaItens);
      break;
    }

    case link.includes("aconfianca.myvtex.com/admin/orders/"): {
      console.log("SITE");
      const doc = $("iframe", top.document).contentWindow.document;
      const pedido = $("h1", doc).innerText.split(" (")[0];
      const nome = $('[class^=vtex-profile] dd:nth-child(1)', doc).innerText;
      const cpf = $('[class^=vtex-profile] dd:nth-child(2)', doc).innerText.split("CPF ")[1];
      const itens = $$('[class=admin-orders-am8j60] [class=admin-orders-k008qs]', doc);

      const listaItens = [];
      for (const i of itens) {
        const obj = {
          modelo: $("a", i).innerText,
          sku: $(".admin-orders-1fja3tm .admin-orders-1qjm10e .admin-orders-0:first-child", i).innerText.split("(")[1],
          qtd: $(":scope > div:nth-child(3)", i).innerText
        };
        listaItens.push(obj)
      }
      ctrl_C(pedido, "SITE", nome, cpf, listaItens);
      break;
    }

    default: {
      alert("OXE, TÁ MALUCO? TEM ESSA PÁGINA NÃO!");
    }

  }

} catch (err) {
  alert(`PUTS, DEURUIM!\nAVISA LÁ O TSUDI!\n\n${err.name} : ${err.message}`);
}
