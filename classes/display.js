function Display() {

    var selecionado = null;
    var bill = new Bill();
    var jobs = new Jobs();

    this.getUsuarioSelecionado = function () {
        return selecionado;
    }


    this.IniciaDisplayTabuleiro = function () {

        var centro = document.createElement("center");
        var tabela = document.createElement("table");
        var linhaTabuleiro = document.createElement("tr");
        var linhaFala = document.createElement("tr");

        var colAnimacaoHumano = document.createElement("td");
        var colTabuleiro = document.createElement("td");
        var colanimacaoMakina = document.createElement("td");

        var colhumanoFalando = document.createElement("td");
        var colNula = document.createElement("td");
        var colamakinaFalando = document.createElement("td");
        var AreaHumanoFalando = document.createElement("textarea");
        var AreaMakinaFalando = document.createElement("textarea");

        colAnimacaoHumano.setAttribute("id", "animacaoHumano");
        colAnimacaoHumano.setAttribute("class", "tdAnimacao");
        colTabuleiro.setAttribute("id", "TDtabuleiro");
        colanimacaoMakina.setAttribute("id", "animacaoMakina");
        colanimacaoMakina.setAttribute("class", "tdAnimacao");

        AreaHumanoFalando.setAttribute("id", "humanoFalando");
        AreaMakinaFalando.setAttribute("id", "makinaFalando");
        tabela.setAttribute("id", "tabelaDisplay");
        tabela.setAttribute("class", "table-responsive");



        colhumanoFalando.appendChild(AreaHumanoFalando);
        colamakinaFalando.appendChild(AreaMakinaFalando);

        linhaTabuleiro.appendChild(colAnimacaoHumano);
        linhaTabuleiro.appendChild(colTabuleiro);
        linhaTabuleiro.appendChild(colanimacaoMakina);
        linhaFala.appendChild(colhumanoFalando);
        linhaFala.appendChild(colNula);
        linhaFala.appendChild(colamakinaFalando);

        tabela.appendChild(linhaTabuleiro);
        tabela.appendChild(linhaFala);

        return tabela;

    }

    this.IniciaHUD = function() {

        var linhaHUD = document.createElement("header");

        var colPlacar = document.createElement("div");
        var colContadorJogadas = document.createElement("div");
        var colIndicadorTurno = document.createElement("div");


        colPlacar.setAttribute("id", "placar");
        colContadorJogadas.setAttribute("id", "contadorJogadas");
        colIndicadorTurno.setAttribute("id", "indicadorTurno");
        
        var img_coffee = document.createElement("img");
        img_coffee.setAttribute("class", "coffee");
        img_coffee.src = 'img/preta.png';

        var img_beer = document.createElement("img");
        img_beer.setAttribute("class", "beer");
        img_beer.src = 'img/branca.png';

        colPlacar.appendChild(img_coffee);
        colPlacar.appendChild(img_beer);

        var img_contador = document.createElement("img");
        img_contador.setAttribute("class", "coffeeBeer");
        img_contador.src = 'img/img_contador.png';

        colContadorJogadas.innerHTML = "texto_contador";
        colContadorJogadas.appendChild(img_contador);

        linhaHUD.appendChild(colPlacar);
        linhaHUD.appendChild(colContadorJogadas);

        return linhaHUD
    }



    this.IniciaDisplayStart = function () {

        var texto = "Click para selecionar seu jogador!";


        var display = this.IniciaDisplayTabuleiro();
        var tds = display.getElementsByTagName("td");

        var td1;
        var td2;
        var td3;

        for (var i = 0; i < tds.length; i++) {
            if (tds[i].id == "animacaoHumano") {
                td1 = i;
            }

            if (tds[i].id == "TDtabuleiro") {
                td3 = i;
            }

            if (tds[i].id == "animacaoMakina") {
                td2 = i;
            }
        }
        
        var h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode(texto));

        display.getElementsByTagName("td")[td1].appendChild(bill.ImagemFace());
        display.getElementsByTagName("td")[td2].appendChild(jobs.ImagemFace());
        display.getElementsByTagName("td")[td3].appendChild(h2);

        display.getElementsByTagName("td")[td1].onclick = function () {
            selecionado = bill;
        };

        display.getElementsByTagName("td")[td2].onclick = function () {
            selecionado = jobs;
        };

        return display;

    }
};

