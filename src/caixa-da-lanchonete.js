class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: 'Café', valor: 3.0, itemPrincipal: null },
      chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5, itemPrincipal: 'cafe' },
      suco: { descricao: 'Suco Natural', valor: 6.2, itemPrincipal: null },
      sanduiche: { descricao: 'Sanduíche', valor: 6.5, itemPrincipal: null },
      queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0, itemPrincipal: 'sanduiche' },
      salgado: { descricao: 'Salgado', valor: 7.25, itemPrincipal: null },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5, itemPrincipal: null },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5, itemPrincipal: null }
    };
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!itens || itens.length === 0) {
      return 'Não há itens no carrinho de compra!'
    }

    const validFormasPagamento = ['debito', 'credito', 'dinheiro'];
    if (!validFormasPagamento.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const itensComprados = [];
    let valorTotal = 0;

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(',');

      if (!this.cardapio.hasOwnProperty(codigo)) {
        return "Item inválido!";
      }

      if (!quantidade || quantidade.trim() === '' || quantidade === '0' || parseInt(quantidade) <= 0) {
        return 'Quantidade Inválida!'
      }
      
      valorTotal += this.cardapio[codigo].valor * parseInt(quantidade);
      itensComprados.push(codigo);
    }

    if (!this.verificarItensComprados(itensComprados)) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (formaDePagamento === 'dinheiro') {
      valorTotal *= 0.95;
    } else if (formaDePagamento === 'credito') {
      valorTotal *= 1.03;
    }

    return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  }

  verificarItensComprados(itensComprados) {
    const itensCompradosSet = new Set(itensComprados);
    const itensExtras = new Set(['chantily', 'queijo']);

    for (const item of itensExtras) {
      if (itensCompradosSet.has(item)) {
        const itemPrincipal = this.cardapio[item].itemPrincipal;
        if (!itensCompradosSet.has(itemPrincipal)) {
          return false;
        }
      }
    }
    return true;
  }
}

export { CaixaDaLanchonete };