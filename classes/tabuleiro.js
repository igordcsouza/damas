/* https://dzone.com/refcardz/object-oriented-javascript */

function Tabuleiro(humano) {


    var IApossoJogar = false;
    /* PRIVATE */
    var that = this;
    var ArrayCasas = new Array();
    var ElementoHtmlTabela = document.createElement("table");
    var ArrElementoHtmlTR = new Array();
    var CasaSelecionada = null;

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
        var c = setInterval(function () {
            count++;

            if (IApossoJogar) {
                console.log("IA JOGANDO");
            } else {
                if (count == 12) {
                    // Removendo a animação - Anima();
                    // Anima(that.usuMakina, "Bora, bora, bora!");
                    count = 0;
                }
            }
        }, 500);
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


    var movimentoIrregular = function(){
        alert("O movimento que voce esta tentando fazer é considerado irregular.");
    }


    /* implementar a regra de movimento*/
    var validaMovimento = function (c) {

        if (c.getPeca() != null) {   //Verificando se a casa de destino está sem peça
            movimentoIrregular();
            return false;
        }

        if (c.getPosicao().x == CasaSelecionada.getPosicao().x || c.getPosicao().y == CasaSelecionada.getPosicao().y) {   //Verificando movimentacao lateral
            movimentoIrregular();
            return false;
        }

        if (c.getPosicao().x >= CasaSelecionada.getPosicao().x + 2){
            console.log("O player pulou uma linha. Verificar se foi o caso de comer um peca ou uma jogada irregular.");
            movimentoIrregular();
            return false;
        }

        if ((c.getPosicao().y >= CasaSelecionada.getPosicao().y +2) || (c.getPosicao().y <= CasaSelecionada.getPosicao().y -2)){
            console.log("O player pulou uma coluna. Verificar se foi caso de comer uma peca ou uma jogada irregular.");
            movimentoIrregular();
            return false;
        }

        return true;
    }


    this.Movimenta = function (casa) {
        if (CasaSelecionada != null) {
            if (validaMovimento(casa)) {
                console.log("De:(" + CasaSelecionada.getPosicao().y + "-" + CasaSelecionada.getPosicao().x + ") Para:(" + casa.getPosicao().y + "-" + casa.getPosicao().x + ")");
                casa.setPeca(CasaSelecionada.getPeca());
                CasaSelecionada.LimpaCasa();
            } else {
                //Anima(CasaSelecionada.getPeca().Usuario, "Como você é burro!! aprende a jogar damas!"); 
                Anima(that.usuMakina, that.usuMakina.MsgErroValidacao());  // A maquina na vai cometer erros de validacao, logo podemos marretar o usuario aqui
            }
            CasaSelecionada = null;
        } else {

            if (casa.getPeca() == null) {
                Anima(that.usuMakina, that.usuMakina.MsgErroPecaVazia());  // A maquina na vai cometer erros de validacao, logo podemos marretar o usuario aqui
                return;
            }

            if (casa.getPeca().Usuario.tdFala != that.usuHumano.tdFala) {
                Anima(that.usuMakina, that.usuMakina.MsgErroPecaErrada());  // A maquina na vai cometer erros de validacao, logo podemos marretar o usuario aqui
                return;
            }

            CasaSelecionada = casa;
        }
    }



    // var Anima = function (usu, texto) {
    //
    //     var td = document.getElementById(usu.tdAnimacao);
    //     td.innerHTML = "";                          //Removendo a Imagem Anterior
    //     td.appendChild(usu.ImagemFaceAnima());
    //
    //
    //     document.getElementById(usu.tdFala).value = "";
    //     document.getElementById(usu.tdFala).value = texto
    //
    //     setTimeout(function myFunction() {
    //         td.innerHTML = "";
    //         td.appendChild(usu.ImagemFace());
    //         document.getElementById(usu.tdFala).value = "";
    //     }, 3000);
    // }

}



