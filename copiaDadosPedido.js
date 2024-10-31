/*javascript:
/* copia dados pedidos (DATA/PEDIDO/MKT/NOME/CPF[/MOD/SKU/QTD]) DA (MAGALU/B2W/ML/MLFULL/AMZ/VIA/SITE) */

console.clear();
console.log("VERSÃO: 2024-10-31");
var $ = (q, p = document) => p.querySelector(q);
var $$ = (q, p = document) => [...p.querySelectorAll(q)];
var link = window.location.href;


function ctrl_C(pedido, mkt, nome, cpf, listaItens) {
  const agora = new Date();
  const data = `${agora.getFullYear()}-${("0" + (agora.getMonth() + 1)).slice(-2)}-${("0" + agora.getDate()).slice(-2)}`;
  pedido = `=HIPERLINK("${window.location.href}";"${pedido}")`;

  const modelo = listaItens.reduce((acc, { modelo }) => [...acc, modelo], []).join("\n");
  const sku = listaItens.reduce((acc, { sku }) => [...acc, sku.replace(/\D/g, "")], []).join("\n");
  const qtd = listaItens.reduce((acc, { qtd }) => [...acc, qtd.replace(/\D/g, "")], []).join("\n");

  const $textarea = document.createElement('textarea');
  $textarea.value = `${data}\t${pedido}\t${mkt}\t${nome}\t${cpf}\t"${modelo}"\t"${sku}"\t"${qtd}"`;
  console.log($textarea.value);
  document.body.appendChild($textarea);
  $textarea.select();
  document.execCommand('copy');
  $textarea.remove();
}


try {
  switch (true) {

    case link.includes("https://seller.magalu.com/pedidos"): {
      console.log("MGL");
      const pedido = $('h1').textContent;
      const nome = $$('#order-details-client-info p')[1].textContent;
      const cpf = $$('#order-details-client-info p')[5].textContent;

      const $$produtos = $$("#order-details-pkg-items tbody tr");
      const listaItens = [];
      for (const $1produto of $$produtos) {
        const obj = {
          modelo: $('.name', $1produto).textContent,
          sku: $('.sku', $1produto).textContent,
          qtd: $('.highlightBlue', $1produto).textContent,
        };
        listaItens.push(obj);
      }

      ctrl_C(pedido, "MGL", nome, cpf, listaItens);
      break;
    }

    case link.includes("americanasmarketplace.com.br/v3/pedidos/detalhes"): {
      console.log("B2W");
      const pedido = $(".timeline-delivery .p14").innerText;
      const nome = $("span", $$('section[_ngcontent-c21] .card .col-md-12')[1]).innerText;
      const cpf = $('span', $$('section[_ngcontent-c21] .card .col-md-4')[0]).innerText;

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
      const cpf = $("div.sc-buyer__content").innerText.split(" CPF ")[1];
      const nome = $("div.sc-buyer__content b").innerText;

      const listaItens = [];

      if ($(".sc-status__title-detail-container").innerHTML.includes("<svg")) {
        console.log("ML FULL");
        console.warn('ITENS PENDENTE! Não sei como fica o html quando compra mais que 1 item diferente. Se pá é igual ao ML normal.');
      } else {
        const itens = $$(".sc-product");
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

    case link.includes("amazon.com/orders-v3/order"):
    case link.includes("amazon.com.br/orders-v3/order"): {
      console.log("AMZ");
      const pedido = $("span[data-test-id=order-id-value]").innerText;
      const nome = $$("div[data-test-id=shipping-section-buyer-address] span")[0].innerText.slice(0, -1);
      const cpf = $$(`span`, $$("div.a-box")[2])[6].innerText;
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
      const listaItens = $$('table tbody tr').map($row => ({
        modelo: $$("td", $row)[1].innerText,
        sku: $$("td", $row)[3].innerText,
        qtd: $$("td", $row)[4].innerText,
      }));
      ctrl_C(pedido, "VIA", nome, cpf, listaItens);
      break;
    }

    case link.includes("aconfianca.myvtex.com/admin/orders/"): {
      console.log("SITE");
      const doc = $("iframe", top.document).contentWindow.document;

      const pedido = $("h1", doc).innerText.split(" (")[0];
      const nome = $('[class^=vtex-profile] dd:nth-child(1)', doc).innerText;
      const cpf = $('[class^=vtex-profile] dd:nth-child(2)', doc).innerText;

      const $itensContainer = $$('[aria-label="Todos os produtos"] [role="region"] > .admin-orders-0', doc)[0];
      const $$itens = $$(':scope > .w-100.flex', $itensContainer);
      const listaItens = $$itens.map(item => ({
        modelo: $("a", item).innerText,
        sku: $("a + div > :first-child", item)?.innerText,
        qtd: $(".admin-orders-1edp9rx .admin-orders-0", item)?.innerText,
      }))

      ctrl_C(pedido, "SITE", nome, cpf, listaItens);
      break;
    }

    default: {
      alert("Página não localizada");
    }

  }

} catch (err) {
  alert(`PUTS, DEURUIM!\nAVISA LÁ O TSUDI!\n\n${err.name} : ${err.message}`);
}
