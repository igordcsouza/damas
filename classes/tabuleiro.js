/* https://dzone.com/refcardz/object-oriented-javascript */

function Tabuleiro(humano) {

    /* PRIVATE */
    var that = this;
    var ArrayCasas = new Array();
    var ElementoHtmlTabela = document.createElement("table");
    var ArrElementoHtmlTR = new Array();
    var CasaSelecionada = null;
	var IA = new InteligenciaArtificial();
    
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
		
		var centro = document.createElement("center");  // centralizando a tabuleiro
		centro.appendChild(ElementoHtmlTabela);

        document.getElementById("TDtabuleiro").appendChild(centro);
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

    
    /* CONSTRUTOR */
    var __construct = function () {
        CriaArrayCasas();
        MontaTabuleiroHtml();
        ColoreTabuleiro();
        InicializaParticipantes();
        DistribuiPecas();
		IA.retornaPecaJogavelIa(ArrayCasas, that.usuHumano.nome);
    } () 
	

	



    function validaCaptura(param) {
        if (CasaSelecionada.getPeca().Usuario != ArrayCasas[CasaSelecionada.getPosicao().y - 1][CasaSelecionada.getPosicao().x + param].getPeca().Usuario) {
            //ArrayCasas[CasaSelecionada.getPosicao().y - 1][CasaSelecionada.getPosicao().x + param].LimpaCasa();
		    addPontosPreto();
            return true;
        }
        return false;
    }
	
	function validaCapturaMultipla(c){
		
	
		
		var CasaAoRedorComAdversarios = [];
		
		var c_top_dir = ArrayCasas[c.getPosicao().y - 1][c.getPosicao().x + 1];
		var c_top_esq = ArrayCasas[c.getPosicao().y - 1][c.getPosicao().x - 1];
		var c_bot_dir = ArrayCasas[c.getPosicao().y + 1][c.getPosicao().x + 1];
		var c_bot_esq = ArrayCasas[c.getPosicao().y + 1][c.getPosicao().x - 1];
		
		// SE A CASA EXISTIR E NÂO TIVER VAZIA E FOR A MAQUINA
		if (c_top_dir != null){
			c_bot_esq.selected();
			if(c_top_dir.getPeca() != null){
				if(c_top_dir.getPeca().Usario == that.usuMakina){
				   var destino = ArrayCasas[c_top_dir.getPosicao().y - 1][c_top_dir.getPosicao().x + 1];
		 		    if(destino != null && destino.getPeca() == null){  //SE A CASA EXISTIR E TIVER VAZIA
					  CasaAoRedorComAdversarios.push(destino);
					}
				}
			}
		}
		
		if (c_top_esq != null){
			c_top_esq.selected();
			if(c_top_esq.getPeca() != null){
				if(c_top_esq.getPeca().Usario == that.usuMakina){
				   var destino = ArrayCasas[c_top_esq.getPosicao().y - 1][c_top_esq.getPosicao().x + 1];
		 		    if(destino != null && destino.getPeca() == null){  //SE A CASA EXISTIR E TIVER VAZIA
					  CasaAoRedorComAdversarios.push(destino);
					}
				}
			}
		}
		
		
		// SE A CASA EXISTIR E NÂO TIVER VAZIA E FOR A MAQUINA
		if (c_bot_dir != null){
			c_bot_dir.selected();
			if(c_bot_dir.getPeca() != null){
				if(c_bot_dir.getPeca().Usario == that.usuMakina){
				   var destino = ArrayCasas[c_bot_dir.getPosicao().y - 1][c_bot_dir.getPosicao().x + 1];
		 		    if(destino != null && destino.getPeca() == null){  //SE A CASA EXISTIR E TIVER VAZIA
					  CasaAoRedorComAdversarios.push(destino);
					}
				}
			}
		}
		
		
		// SE A CASA EXISTIR E NÂO TIVER VAZIA E FOR A MAQUINA
		if (c_bot_esq != null){
			c_bot_esq.selected();
			if(c_bot_esq.getPeca() != null){
				if(c_bot_esq.getPeca().Usario == that.usuMakina){
				   var destino = ArrayCasas[c_bot_esq.getPosicao().y - 1][c_bot_esq.getPosicao().x + 1];
		 		    if(destino != null && destino.getPeca() == null){  //SE A CASA EXISTIR E TIVER VAZIA
					  CasaAoRedorComAdversarios.push(destino);
					}
				}
			}
		}
		
		
		if(CasaAoRedorComAdversarios.length == 0){
		    return ; //FIM	
		}
		
		if(CasaAoRedorComAdversarios.length == 1){ //Só tem uma opção para fazer a joga multipla
		    alert("achou");
		    return ; //FIM	
		}
		

		
		
		
	}
	
	
	var ValidaCasaSelecionada = function(casa){
		
 		   if (casa.getPeca() == null) {
                ExibeMsgValidacao("Voce precisa clicar em uma casa que tenha uma peca!");
                return false;
            }

            if (casa.getPeca().Usuario.tdFala != that.usuHumano.tdFala) {
                ExibeMsgValidacao("Voce precisa clicar em uma casa que tenha uma peca sua!");
                return false;
            }
			
			return true;
    }

    /* implementar a regra de movimento*/
    var validaMovimento = function (c) {

        if (c.getPeca() != null) {   //Verificando se a casa de destino está sem peça
			ExibeMsgValidacao("A casa de destino precisa estar vazia!");
 			return false;
        }
		
        if (c.getPosicao().x == CasaSelecionada.getPosicao().x || c.getPosicao().y == CasaSelecionada.getPosicao().y) {   //Verificando movimentacao lateral
		    ExibeMsgValidacao("Voce so pode andar na diagonal!");
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
                ExibeMsgValidacao("Movimento da Dama irregular!");
                return false;
            }
        }

        if ((c.getPosicao().x >= CasaSelecionada.getPosicao().x + 2) && (!CasaSelecionada.getPeca().getDama())){
            if (c.getPosicao().x == CasaSelecionada.getPosicao().x + 2) {
                return validaCaptura(1);  //DIREITA
            }
            console.log("O player pulou uma linha. Verificar se foi o caso de comer um peca ou uma jogada irregular. 1");
            ExibeMsgValidacao("Jogada irregular!");
            return false;            
        }

        if ((c.getPosicao().x <= CasaSelecionada.getPosicao().x - 2) && (!CasaSelecionada.getPeca().getDama())){
            if (c.getPosicao().x == CasaSelecionada.getPosicao().x - 2) {
                return validaCaptura(-1); //ESQUERDA
            }
            ExibeMsgValidacao("Jogada irregular!");
            return false;
        }
		

        if (((c.getPosicao().y >= CasaSelecionada.getPosicao().y + 2) || (c.getPosicao().y <= CasaSelecionada.getPosicao().y - 2)) && (!CasaSelecionada.getPeca().getDama())){
            console.log("O player pulou uma coluna. Verificar se foi caso de comer uma peca ou uma jogada irregular. 2");
            ExibeMsgValidacao("Jogada irregular!");
            return false;
        }

        // Remover para a validação da dama ser realmente valida
        // Esse código coloca qualquer pedra que encoste na parede esquerda como dama. 
        // Apenas para fins de testes.
        /*
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
		*/

        
        return true;
    }




    this.Movimenta = function (casa) {
		if (CasaSelecionada != null) {
            if (validaMovimento(casa)) {
                casa.setPeca(CasaSelecionada.getPeca());
							validaCapturaMultipla(casa);
				CasaSelecionada.LimpaCasa();
                IA.retornaPecaJogavelIa(ArrayCasas, that.usuHumano.nome);
            }
			CasaSelecionada.selected();
            CasaSelecionada = null;
        } else {
            if (ValidaCasaSelecionada(casa)) {
			   CasaSelecionada = casa;
			   CasaSelecionada.selected();
        	}
        }
    }
	


    function addPontosPreto(){
        var td = document.getElementById("placar_coffee");
        td.textContent = Number(td.textContent) + 1;
    }

    var ExibeMsgValidacao = function (texto) {
    
	    document.getElementById("MsgValidacao").value = "";
        document.getElementById("MsgValidacao").value = texto
    
        setTimeout(function myFunction() {
            document.getElementById("MsgValidacao").value = "";
        }, 3000);
    }

}



