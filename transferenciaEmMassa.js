var lista = (prompt("CONFIA!") || "").split("\r\n");

console.table(lista);

if (lista.length > 15 || lista == "") {
  alert(`Quantidade de linha ( ${lista.length} ) é maior que 15 ou seila, to puto`);
} else {
  const doc = top.document.querySelector("#iframe_item_50").contentWindow.document.querySelector("#nmsc_iframe_es_con_lot_mov_itm_2").contentWindow.document;
  for (const k in lista) {
    const item = lista[k].split("\t");
    console.log(item);

    /* codigo */
    const codigoInput = doc.querySelector(`#id_sc_field_cp_prf_cod_${Number(k)+1}`);
    codigoInput.value = item[0];
    codigoInput.dispatchEvent(new Event("change", { bubbles: true }));

    /* qtMovto */
    doc.querySelector(`#id_sc_field_lti_qtd_${Number(k)+1}`).value = item[1];
  }
}
console.log("PUTAQUEPARIU");
