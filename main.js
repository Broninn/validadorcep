//modo mais rigoroso do JS
'use strict' 
const preencherForm = (endereco) => {
    document.getElementById('endereço').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
};

//função de pesquisarCEP
const pesquisarCEP = async() => {
    //pega o valor no campo CEP e coloca na variavel cep
    const cep = document.getElementById('cep').value;
    //cria a variavel url completando com a variavel cep
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    //retorna uma promessa, algo que pode acontecer, retorno assincrono
    //fetch(url).then(response => response.json()).then();
    
    const dados = await fetch(url);
    const endereco= await dados.json();
    if(endereco.hasOwnProperty('erro')) {
        document.getElementById('endereço').value = 'CEP não encontrado';
        document.getElementById('bairro').value = 'CEP não encontrado';
        document.getElementById('cidade').value = 'CEP não encontrado';
        document.getElementById('estado').value = 'CEP não encontrado';
    } else {
        preencherForm(endereco);
    };
};

//Fica esperando o campo do CEP perder o foco, e assim que perder o foco, executa a função pesquisarCEP
document.getElementById('cep').addEventListener('focusout', pesquisarCEP);