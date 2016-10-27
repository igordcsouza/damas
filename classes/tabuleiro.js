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
        for (var i = 0; i < 64; i++) {
            ArrayCasas[i] = new Casa(i);
            ArrayCasas[i].setTabuleiro(that);
        }
    };
    
    /* PRIVATE - Montando a Tabela em HTML */
    var MontaTabuleiroHtml = function () {
        var tr;
        ElementoHtmlTabela.setAttribute("class", "tabuleiro");
        for (var i = 0; i < 64; i++) {
            if (i % 8 == 0) {
                tr = i / 8;
                ArrElementoHtmlTR[tr] = document.createElement("tr");
                ElementoHtmlTabela.appendChild(ArrElementoHtmlTR[tr]);
            }
            ArrayCasas[i].setTD(document.createElement("td"));
            ArrayCasas[i].setTR(ArrElementoHtmlTR[tr]);
            ArrayCasas[i].getTR().appendChild(ArrayCasas[i].getTD());
        }
        document.getElementById("TDtabuleiro").appendChild(ElementoHtmlTabela);
    };
    
    /* PRIVATE - Adiciando as Classe as TD para colorir */
    var ColoreTabuleiro = function () {
        var x = true;
        for (var i = 0; i < 63; i = i + 8) {
            x = !x;
            for (var j = 0; j < 8; j++) {
                if (((i + j) % 2 == 0) == x) {
                    ArrayCasas[(i + j)].setCor("cor");
                }
            }
        }
    }

    /*  PRIVATE - Distribuindo as pecas */
    var DistribuiPecas = function () {
        var x = true;
        for (var i = 0; i < 24; i = i + 8) {
            x = !x;
            for (var j = 0; j < 8; j++) {
                if ((j % 2 == 0) == x) {
                    ArrayCasas[i + j].setPeca(new Peca(that.usuMakina));
                }

                if ((j % 2 == 0) == !x) {
                    ArrayCasas[i + j + 40].setPeca(new Peca(that.usuHumano));
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


    var IniciaToasty = function () {

        var casatoasty = document.createElement("div");
        casatoasty.setAttribute("id", "CasaToasty");

        var toasty = document.createElement("div");
        toasty.setAttribute("id", "Toasty");
        
        var img = document.createElement("img");
        img.setAttribute("src", "imagens/toasty-flat.png");
        img.setAttribute("width", "250px");
        img.setAttribute("height", "250px");

        toasty.appendChild(img);
        casatoasty.appendChild(toasty);
       
        document.body.appendChild(casatoasty);

    }

    var InimaToasty = function () {
        var elem = document.getElementById("Toasty");
        var pos = -250;
        var thread = setInterval(frame, 1);
        function frame() {
            if (pos > 0) {
                if (pos > 1000) { // tempo de espera na tela
                    elem.style.left = "-250px";
                    clearInterval(thread);
                }

            } else {
                elem.style.left = pos + 'px';
            }
            pos = pos + 7;
        }
    }


    var IniciaMakina = function () {
        var count = 1;
        var c = setInterval(function () {
            count++;

            if (IApossoJogar) {
                console.log("IA JOGANDO");
            } else {
                if (count == 12) {
                    Anima(that.usuMakina, "Vão bora, porra!");
                    count = 0;
                }
            }
        }, 500);
    }
    

    /* CONSTRUTOR */

   





    /* implementar a regra de movimento*/
    var validaMovimento = function (c) {

        var resul = c.Id - CasaSelecionada.Id;

        if (c.getPeca() != null) {   //Verificando se a casa de destino está sem peça
            return false;
        }
                
        if (Math.abs(resul) != 7 && Math.abs(resul) != 9 && Math.abs(resul) != 14 && Math.abs(resul) != 18) {   //Verificando movimentacao lateral
            return false;
        }
        
        if (Math.abs(resul) == 14 || Math.abs(resul) == 18) {   
            /*  VERIFICANDO SE A CASA ENTRE A CASA DE ORIGEM E A CASA DE DESTINO ESTA COM UMA PECA DO ADVERSARIO  */
            if (ArrayCasas[CasaSelecionada.Id + (resul / 2)].getPeca() == null || ArrayCasas[CasaSelecionada.Id + (resul / 2)].getPeca().Usuario.nome == that.usuHumano.nome) {
                return false;
            }
        }
        
        return true;
    }


    this.Movimenta = function (casa) {

        //InimaToasty(); // SOMENTE PARA TESTAR 

        if (CasaSelecionada != null) {
            if (validaMovimento(casa)) {
                casa.setPeca(CasaSelecionada.getPeca());
                CasaSelecionada.LimpaCasa();
                AtualizaPlacar(); 

            } else {
                Anima(that.usuMakina, that.usuMakina.MsgErroValidacao());  // A maquina na vai cometer erros de validacao, logo podemos marretar o usuario aqui
            }
            CasaSelecionada = null;
        } else {

            if (casa.getPeca() == null) {
                Anima(that.usuMakina, that.usuMakina.MsgErroPecaVazia());
                return;
            }

            if (casa.getPeca().Usuario.tdFala != that.usuHumano.tdFala) {
                Anima(that.usuMakina, that.usuMakina.MsgErroPecaErrada());
                return;
            }

            CasaSelecionada = casa;
        }
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

    var AtualizaPlacar = function () {
        var qtdpecasHumano = 0;
        var qtdpecasMakina = 0;

        for (var i = 0; i < 64; i++) {
            if (ArrayCasas[i].getPeca() != null) {
                if (ArrayCasas[i].getPeca().Usuario.nome == that.usuHumano.nome) {
                    qtdpecasHumano++;
                } else {
                    qtdpecasMakina++;
                }
            }
        }

       document.getElementById("placar").appendChild(document.createTextNode("Você " + (12 - qtdpecasMakina) + " X " + (12 - qtdpecasHumano) + " Computador"));
    }


    var __construct = function () {

        CriaArrayCasas();
        MontaTabuleiroHtml();
        ColoreTabuleiro();
        InicializaParticipantes();
        DistribuiPecas();
        IniciaToasty();
        //IniciaMakina();
        AtualizaPlacar();


    } ()



}



