document.getElementById('bancoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    var formData = new FormData(document.getElementById('bancoForm'));
    var nomeMoeda = formData.get('nome').toUpperCase();
    var token = 'kDnpTcmY5c3P7QfgnhCNmC'
    var url = `https://brapi.dev/api/quote/${nomeMoeda}?range=5d&interval=1d&fundamental=true&modules=summaryProfile&token=${token}`;

    try {
        var response = await fetch(url);
        var data = await response.json();

        var divMoedas = document.getElementById('fundo_moedas');
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'fundo_moedas');
        newDiv.innerHTML = `
            <div id="divmoedas">
                <div id="itemmoedas">
                    <div id="foto"><img id="foto" src="${data.results[0].logourl}"></div>
                    <div id="nome">${data.results[0].shortName}</div>
                    <div id="cod">${nomeMoeda}</div>
                    <div id="moeda">${data.results[0].currency}</div>
                    <div id="longname">${data.results[0].longName}</div>
                    <div id="priceEarnings">${data.results[0].priceEarnings}</div>
                    <div id="button">
                        <span class="tooltip-container">
                        <button id="moreInfo">
                        Ver mais <img src="/static/imagens/expand_more_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt=""
                            id="imgBtn"></button>
                            <span class="tooltip">Essa função ainda está sendo implementada</span>
                        </span>
                    </div>
                </div>
            </div>
            <br>
            <br>
        `;
        divMoedas.appendChild(newDiv);
    } catch (error) {
        alert("Erro ao buscar moeda");
    }
});
