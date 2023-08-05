document.addEventListener("turbolinks:load", function() {
    planSelectionForm.init($("form#new_account"));
  });



function atualizar(data)
{
    $("#chat").text("");

   data.forEach(line => {
    const a = line['hora'] + " " + line['texto']
    const novoParagrafo = $(`<p>${a}</p>`);
    $("#chat").append(novoParagrafo);
   });
    
}

function fazerRequisicao() {
    console.log("2")
    const url = 'http://localhost:3000/getchat';

    // Fazendo a solicitação usando a função fetch()
    fetch(url)
    .then(response => response.json()) // Transforma a resposta em JSON
    .then(data => {
        atualizar(data)
      
    })
    .catch(error => {
        // Trata erros, caso ocorram
        console.error('Erro ao fazer a requisição:', error);
    });
}
let intervalId
// Função para realizar a requisição a cada 5 segundos
function fazerRequisicaoPeriodicamente() {

    console.log("1")

    fazerRequisicao(); 

    intervalId = setInterval(fazerRequisicao, 5000);
}

fazerRequisicaoPeriodicamente() 

$('#but').on('click', () => {
    fazerRequisicao()
    console.log("as")
});


