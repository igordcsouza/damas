/* https://dzone.com/refcardz/object-oriented-javascript */

function Tabuleiro(humano) {


    var IApossoJogar = false;
    /* PRIVATE */
    var that = this;
    var ArrayCasas = new Array();
    var ElementoHtmlTabela = document.createElement("table");
    var ArrElementoHtmlTR = new Array();
    var CasaSelecionada = null;
    var hud = new HUD();

    this.usuHumano = humano;
    this.usuMakina = null;


    
    /* PRIVATE - Criando o Array de Casas */
    var CriaArrayCasas = function () {
        for (var i = 0; i < 8; i++) {
            ArrayCasas[i] = new Array();
            for (var j = 0; j < 8; j++) {
                ArrayCasas[i][j] = new Casa();
                ArrayCasas[i][j].setPosicao(new Posicao(i, j));
                ArrayCasas[i][j].setTabuleiro(that);
            }
        }
    };
    
    /* PRIVATE - Montando a Tabela em HTML */
    var MontaTabuleiroHtml = function () {

        ElementoHtmlTabela.setAttribute("class", "tabuleiro");

        for (var i = 0; i < 8; i++) {
            ArrElementoHtmlTR[i] = document.createElement("tr");
            for (var j = 0; j < 8; j++) {
                ArrayCasas[i][j].setTD(document.createElement("td"));
                ArrayCasas[i][j].setTR(ArrElementoHtmlTR[i]);
                ArrayCasas[i][j].getTR().appendChild(ArrayCasas[i][j].getTD());
            }
            ElementoHtmlTabela.appendChild(ArrElementoHtmlTR[i]);
        }

        document.getElementById("TDtabuleiro").appendChild(ElementoHtmlTabela);
    };
    
    /* PRIVATE - Adiciando as Classe as TD para colorir */
    var ColoreTabuleiro = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if ((i % 2) == 0) {
                    if ((j % 2) == 0) {
                        ArrayCasas[i][j].setCor("cor");

                    }
                }else {
                    if (!(j % 2) == 0) {
                        ArrayCasas[i][j].setCor("cor");
                    }
                }
            }
        }
    }

    /*  PRIVATE - Distribuindo as pecas */
    var DistribuiPecas = function () {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 8; j++) {
                if (((i % 2) == 0) && ((j % 2) == 1)) {
                    ArrayCasas[i][j - 1].setPeca(new Peca(that.usuMakina));
                    ArrayCasas[i + 5][j].setPeca(new Peca(that.usuHumano));
                }
                if (((i % 2) == 1) && ((j % 2) == 0)) {
                    ArrayCasas[i][j + 1].setPeca(new Peca(that.usuMakina));
                    ArrayCasas[i + 5][j].setPeca(new Peca(that.usuHumano));
                }
            }
        }
    }


    /*  PRIVATE - Distribuindo as pecas */
    var InicializaParticipantes = function () {

        if (that.usuHumano.nome == "bill") {
           that.usuMakina = new Jobs();
        } else {
           that.usuMakina = new Bill();
        }
        
        /* inserindo as variaveis e valores */
        that.usuHumano.class = "imgHumano";
        that.usuMakina.class = "imgMakina";
        that.usuHumano.tdAnimacao = "animacaoHumano";
        that.usuMakina.tdAnimacao = "animacaoMakina";
        that.usuHumano.tdFala = "humanoFalando";
        that.usuMakina.tdFala = "makinaFalando";

        document.getElementById(that.usuHumano.tdAnimacao).appendChild(that.usuHumano.ImagemFace());
        document.getElementById(that.usuMakina.tdAnimacao).appendChild(that.usuMakina.ImagemFace());

    }


    var IniciaMakina = function () {
        var count = 1;
        console.log(that.usuHumano.nome);
        retornaPecaJogavelIa();
        console.log("IA JOGANDO");
    }


    function retornaPecaJogavelIa() {
        var fugasObrigatorias = [];
        var jogadasPossiveis = [];
        var ataqueNecessario = [];
        var peca;
        for (var i = ArrayCasas.length - 1; i >= 0; i--) {
            for (var j = ArrayCasas[i].length - 1; j >= 0; j--) {
                if ((ArrayCasas[i][j].getPeca() != null) && (ArrayCasas[i][j].getPeca().Usuario["nome"] != that.usuHumano.nome)) {
                    if (testaMovimentacaoIA(i,j) == 1){
                        jogadasPossiveis.push([i,j]);
                    }
                    if (testaMovimentacaoIA(i,j) == 2) {
                        ataqueNecessario.push([i,j]);
                    }
                }
            }
        }
        if (fugasObrigatorias.length > 0) {
            peca = fugasObrigatorias[Math.floor(Math.random() * fugasObrigatorias.length)];
        }
        else if (ataqueNecessario.length > 0){
            peca = ataqueNecessario[Math.floor(Math.random() * ataqueNecessario.length)];
        }
        else if (jogadasPossiveis.length > 0){
            peca = jogadasPossiveis[Math.floor(Math.random() * jogadasPossiveis.length)];
        }
        MovimentaPeca(peca[0],peca[1]);
    }

    function testaMovimentacaoIA(linha,coluna){
        if ((validaPosicaoIA(linha+1, coluna+1)) || (validaPosicaoIA(linha+1, coluna-1))){
            return 1;
        }
        if (validaMovimentoCapturaSimples(linha,coluna)) {
            return 2;
        }
        if (validaMovimentoDefesa(linha,coluna)){
            return 3;
        }
    }

    function validaPosicaoIA(linha,coluna){
        if ((ArrayCasas[linha][coluna]) && (ArrayCasas[linha][coluna].getPeca() == null)){
            return true;
        }
        else {
            return false;
        }
    }

    function validaMovimentoDefesa(linha,coluna){
        return false;
    }
    function validaMovimentoCapturaSimples(linha,coluna){
        return false;   
    //     console.log(ArrayCasas[linha+2][coluna+2] == null);
    //     if (ArrayCasas[linha+2][coluna+2] == null){
    //         if (ArrayCasas[linha+1][coluna+1] != null) {
    //             console.log("movimentoCaptura");
    //             console.log(linha + " " + coluna + " --- ");
    //             console.log(ArrayCasas[linha+1][coluna+1].getPeca().Usuario);
    //             console.log(that.usuHumano);
    //             console.log("fimMovimentoCaptura");
    //         }
    //     }
    }


    function MovimentaPeca(linha,coluna){
        var direita = validaPosicaoIA(linha+1, coluna + 1);
        var esquerda = validaPosicaoIA(linha+1, coluna - 1);
        var casa = ArrayCasas[linha][coluna];

        if ((direita == true) && (esquerda == true)){
            if (Math.random() >= 0.5) {
                ArrayCasas[linha+1][coluna+1].setPeca(casa.getPeca());
            }
            else {
                ArrayCasas[linha+1][coluna-1].setPeca(casa.getPeca());
            }
        }
        else if (direita == true) {
            ArrayCasas[linha+1][coluna+1].setPeca(casa.getPeca());
        }
        else {
            ArrayCasas[linha+1][coluna-1].setPeca(casa.getPeca());
        }
        casa.LimpaCasa();
        return true;
    }


    
    /* CONSTRUTOR */
    var __construct = function () {


        CriaArrayCasas();
        MontaTabuleiroHtml();
        ColoreTabuleiro();
        InicializaParticipantes();
        DistribuiPecas();

        IniciaMakina();



    } ()    

    var movimentoIrregular = function(c){
        alert("O movimento que voce esta tentando fazer é considerado irregular.");
        c.selected();
        CasaSelecionada.selected();
    }


    function validaCapturaEsquerda(c) {
        var coluna = CasaSelecionada.getPosicao().x - 1; 
        var linha = CasaSelecionada.getPosicao().y - 1;
        var c_aux = ArrayCasas[linha][coluna];

        console.log(linha);
        console.log(coluna);
        console.log(c_aux.getPeca().Usuario);
        console.log(CasaSelecionada.getPeca().Usuario);
        if (CasaSelecionada.getPeca().Usuario != c_aux.getPeca().Usuario) {
            // ArrayCasas[linha][coluna].LimpaCasa();
            c_aux.LimpaCasa();
            console.log("deveria limpar");
            c.selected();
            CasaSelecionada.selected();
            addPontosPreto();
            return true;
        }
        c_aux = null;
        linha = null;
        coluna = null;
        return false;
    }

    function validaCapturaDireita(c){
        var coluna = CasaSelecionada.getPosicao().x + 1; 
        var linha = CasaSelecionada.getPosicao().y - 1;
        var c_aux = ArrayCasas[linha][coluna];

        console.log(linha);
        console.log(coluna);
        console.log(c_aux.getPeca().Usuario);
        console.log(CasaSelecionada.getPeca().Usuario);
        if (CasaSelecionada.getPeca().Usuario != c_aux.getPeca().Usuario) {
            // ArrayCasas[linha][coluna].LimpaCasa();
            c_aux.LimpaCasa();
            console.log("deveria limpar");
            c.selected();
            CasaSelecionada.selected();
            addPontosPreto();
            return true;
        }
        c_aux = null;
        linha = null;
        coluna = null;
        return false;
    }

    /* implementar a regra de movimento*/
    var validaMovimento = function (c) {
        if (c.getPeca() != null) {   //Verificando se a casa de destino está sem peça
            movimentoIrregular(c);
            return false;
        }
        if (c.getPosicao().x == CasaSelecionada.getPosicao().x || c.getPosicao().y == CasaSelecionada.getPosicao().y) {   //Verificando movimentacao lateral
            movimentoIrregular(c);
            return false;
        }
        if (CasaSelecionada.getPeca().getDama()) {
            var z = c.getPosicao().x - CasaSelecionada.getPosicao().x;
            var cx = c.getPosicao().x;
            var sx = CasaSelecionada.getPosicao().x;
            var cy = c.getPosicao().y;
            var sy = CasaSelecionada.getPosicao().y;
            if ((cx == sx+z) && (cy == sy-z)) {
                console.log("Movimento Valido");
            }
            else if ((cx == sx+z) && (cy == sy+z)) {
                console.log("Movimento Valido");
            }
            else {
                movimentoIrregular(c);
                return false;
            }

        }

        if ((c.getPosicao().x >= CasaSelecionada.getPosicao().x + 2) && (!CasaSelecionada.getPeca().getDama())){
            if (c.getPosicao().x == CasaSelecionada.getPosicao().x + 2) {
                return validaCapturaDireita(c);
            }
            console.log("O player pulou uma linha. Verificar se foi o caso de comer um peca ou uma jogada irregular. 1");
            movimentoIrregular(c);
            return false;            
        }

        if ((c.getPosicao().x <= CasaSelecionada.getPosicao().x - 2) && (!CasaSelecionada.getPeca().getDama())){
            if (c.getPosicao().x == CasaSelecionada.getPosicao().x - 2) {
                return validaCapturaEsquerda(c);
            }
            movimentoIrregular(c);
            return false;
        }

        if (((c.getPosicao().y >= CasaSelecionada.getPosicao().y +2) || (c.getPosicao().y <= CasaSelecionada.getPosicao().y -2)) && (!CasaSelecionada.getPeca().getDama())){
            console.log("O player pulou uma coluna. Verificar se foi caso de comer uma peca ou uma jogada irregular. 2");
            movimentoIrregular(c);
            return false;
        }

        // Remover para a validação da dama ser realmente valida
        // Esse código coloca qualquer pedra que encoste na parede esquerda como dama. 
        // Apenas para fins de testes.
        if (c.getPosicao().x == 0) {
            CasaSelecionada.getPeca().setDama(true);
        }

        if (c.getPosicao().y == 0) {
            CasaSelecionada.getPeca().setDama(true);   
        }

        if ((c.getPosicao().y >= CasaSelecionada.getPosicao().y) && (!CasaSelecionada.getPeca().getDama())) {
            console.log("Tentando andar apra tras.");
            movimentoIrregular(c);
            return false;
        }

        CasaSelecionada.selected()
        c.selected();
        return true;
    }


    var movimentoAtaque = function (casa) {
        console.log("------");
        var casaDireita = ArrayCasas[casa.getPosicao().y -1][casa.getPosicao().x + 1].getPeca();
        var casaEsquerda = ArrayCasas[casa.getPosicao().y -1][casa.getPosicao().x - 1].getPeca();
        var casaDownEsquerda = ArrayCasas[casa.getPosicao().y +1][casa.getPosicao().x - 1].getPeca();
        var casaDownDireita = ArrayCasas[casa.getPosicao().y +1][casa.getPosicao().x + 1].getPeca();
        console.log(casa.getPeca().getUsuario());
        if (casaDireita){
            console.log(casaDireita.getUsuario());
        }
        if ((casaDireita) && (casaDireita.getUsuario() != casa.getPeca().getUsuario())){
            console.log("Possibilidade de ataque da direita");
            if (!casaDownEsquerda) {
                console.log("Come da direita para esquerda");
                casa.LimpaCasa();
                ArrayCasas[casa.getPosicao().y +1][casa.getPosicao().x - 1].setPeca(casaDireita);
                ArrayCasas[casa.getPosicao().y -1][casa.getPosicao().x + 1].LimpaCasa();
                addPontosBranco();
                return true;
            }
        }
        if (casaEsquerda) {
            console.log(casaEsquerda.getUsuario());
        }
        if ((casaEsquerda) && (casaEsquerda.getUsuario() != casa.getPeca().getUsuario())){
            if (!casaDownDireita){
                casa.LimpaCasa();
                ArrayCasas[casa.getPosicao().y +1][casa.getPosicao().x + 1].setPeca(casaEsquerda);
                ArrayCasas[casa.getPosicao().y -1][casa.getPosicao().x - 1].LimpaCasa();
                addPontosBranco();
                return true;
            }
        }
        console.log("------");
    }

    this.Movimenta = function (casa) {
        if (CasaSelecionada != null) {
            if (validaMovimento(casa)) {
                // console.log("De:(" + CasaSelecionada.getPosicao().y + "-" + CasaSelecionada.getPosicao().x + ") Para:(" + casa.getPosicao().y + "-" + casa.getPosicao().x + ")");
                casa.setPeca(CasaSelecionada.getPeca());
                CasaSelecionada.LimpaCasa();
                if (!movimentoAtaque(casa)) {
                        IniciaMakina();
                }
            } else {
                //Anima(CasaSelecionada.getPeca().Usuario, "Como você é burro!! aprende a jogar damas!"); 
                Anima(that.usuMakina, that.usuMakina.MsgErroValidacao());  // A maquina na vai cometer erros de validacao, logo podemos marretar o usuario aqui
            }
            CasaSelecionada = null;
        } else {

            if (casa.getPeca() == null) {
                casa.selected();
                Anima(that.usuHumano, that.usuHumano.MsgErroPecaVazia());  // A maquina na vai cometer erros de validacao, logo podemos marretar o usuario aqui
                return;
            }

            if (casa.getPeca().Usuario.tdFala != that.usuHumano.tdFala) {
                Anima(that.usuMakina, that.usuMakina.MsgErroPecaErrada());  // A maquina na vai cometer erros de validacao, logo podemos marretar o usuario aqui
                return;
            }
            CasaSelecionada = casa;
            console.log(CasaSelecionada.getPeca().getDama());
        }
    }


    function addPontosPreto(){
        var td = document.getElementById("placar_coffee");
        td.textContent = Number(td.textContent) + 1;
    }

    function addPontosBranco(){
        var td = document.getElementById("placar_beer");
        td.textContent = Number(td.textContent) + 1;
    }

    var Anima = function (usu, texto) {
    
        var td = document.getElementById(usu.tdAnimacao);
        td.innerHTML = "";                          //Removendo a Imagem Anterior
        td.appendChild(usu.ImagemFaceAnima());
    
    
        document.getElementById(usu.tdFala).value = "";
        document.getElementById(usu.tdFala).value = texto
    
        setTimeout(function myFunction() {
            td.innerHTML = "";
            td.appendChild(usu.ImagemFace());
            document.getElementById(usu.tdFala).value = "";
        }, 3000);
    }

}



