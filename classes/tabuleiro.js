/* https://dzone.com/refcardz/object-oriented-javascript */

function Tabuleiro(humano) {

    /* PRIVATE */
	var comeu = false;
    var that = this;
    var ArrayCasas = new Array();
    var ElementoHtmlTabela = document.createElement("table");
    var ArrElementoHtmlTR = new Array();
    var CasaSelecionada = null;
	var IA = new InteligenciaArtificial();
	var CasaAoRedorComAdversarios = [];
    
    this.usuHumano = humano;
    this.usuMakina = null;

    /* função para teste unitários */
    this.RetornaArrayCasas = function () {
        return ArrayCasas;
    }
    
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
		
		//Comendo 3 seguidos obrigatoriamente
		/*
		ArrayCasas[7][5].setPeca(new Peca(that.usuHumano));
		ArrayCasas[6][4].setPeca(new Peca(that.usuMakina));
		ArrayCasas[4][4].setPeca(new Peca(that.usuMakina));
		ArrayCasas[2][4].setPeca(new Peca(that.usuMakina));
		*/
		
		//Comendo 2 seguidos obrigatoriamente
		/*
		ArrayCasas[7][5].setPeca(new Peca(that.usuHumano));
		ArrayCasas[6][4].setPeca(new Peca(that.usuMakina));
		ArrayCasas[4][4].setPeca(new Peca(that.usuMakina));
		*/
		
		//Comendo 2 seguidos obrigatoriamente
		/*
		ArrayCasas[7][5].setPeca(new Peca(that.usuHumano));
		ArrayCasas[6][4].setPeca(new Peca(that.usuMakina));
		ArrayCasas[4][2].setPeca(new Peca(that.usuMakina));
		ArrayCasas[4][4].setPeca(new Peca(that.usuMakina));
		*/
		
		
		
    } () 


    function validaCaptura(param) {
        if (CasaSelecionada.getPeca().Usuario != ArrayCasas[CasaSelecionada.getPosicao().y - 1][CasaSelecionada.getPosicao().x + param].getPeca().Usuario) {
            ArrayCasas[CasaSelecionada.getPosicao().y - 1][CasaSelecionada.getPosicao().x + param].LimpaCasa();
			comeu = true;
            if (CasaSelecionada.getPeca().getUsuario() == "jobs") {
                addPontosBranco();
            }
            else {
                addPontosPreto();
            }
		    return true;
        }
        return false;
    }
	
	function RetornaPecaParaMultiplo(casa, p1, p2){
		try {
			return ArrayCasas[casa.getPosicao().y + p1][casa.getPosicao().x + p2];
	    }catch(err) {
			console.log(err.message);
			return null;
		}
	}
	
	function RetornaCasaDestinoParaMultiplo(casa, p1, p2){
		if (casa != null){
			try {
 			   if(casa.getPeca() != null){
					if(casa.getPeca().Usuario.nome == that.usuMakina.nome){
					   var dest = ArrayCasas[casa.getPosicao().y + p1][casa.getPosicao().x + p2];
						if(dest != null) {
							if(dest.getPeca() == null){  //SE A CASA EXISTIR E TIVER VAZIA
							   return dest;
							}
						}
					}
				}
			}
			catch(err) {
				console.log(err.message);
				return null;
			}
		}
		return null;
	}
	
	
	var validaCapturaMultipla = function(casadestino){
		var destino = null;
		CasaAoRedorComAdversarios = []; //Limpando array
		var c_top_dir = RetornaPecaParaMultiplo(casadestino, -1, 1);
		var c_top_esq = RetornaPecaParaMultiplo(casadestino, -1, -1);
		var c_bot_dir = RetornaPecaParaMultiplo(casadestino, 1, 1);
		var c_bot_esq = RetornaPecaParaMultiplo(casadestino, 1, -1);
		
		destino = RetornaCasaDestinoParaMultiplo(c_top_dir, -1, 1);
		if(destino != null){ CasaAoRedorComAdversarios.push(new Array(casadestino, destino)); }
		destino = RetornaCasaDestinoParaMultiplo(c_top_esq, -1, -1);
		if(destino != null){ CasaAoRedorComAdversarios.push(new Array(casadestino, destino)); }
		destino = RetornaCasaDestinoParaMultiplo(c_bot_dir, 1, 1);
		if(destino != null){ CasaAoRedorComAdversarios.push(new Array(casadestino, destino)); }
		destino = RetornaCasaDestinoParaMultiplo(c_bot_esq, 1, -1);
		if(destino != null){ CasaAoRedorComAdversarios.push(new Array(casadestino, destino)); }
		
		
		if(CasaAoRedorComAdversarios.length == 0){
			CasaAoRedorComAdversarios = null;
		    return ; //FIM	
		}
		
		if(CasaAoRedorComAdversarios.length == 1){ //Só tem uma opção para fazer a joga multipla
  		    CasaSelecionada = CasaAoRedorComAdversarios[0][0];
			CasaSelecionada.selected();
			that.Movimenta(CasaAoRedorComAdversarios[0][1]);
		}
		
		if(CasaAoRedorComAdversarios.length > 1){
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
		
        if (c.getPosicao().x == CasaSelecionada.getPosicao().x || c.getPosicao().y == CasaSelecionada.getPosicao().y) {   

            //Verificando movimentacao lateral
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
            if ((c.getPosicao().x == CasaSelecionada.getPosicao().x + 2) && ((c.getPosicao().y == CasaSelecionada.getPosicao().y - 2))) {
                return validaCaptura(1);  //DIREITA
            }
            else {
                console.log("O player pulou uma linha. Verificar se foi o caso de comer um peca ou uma jogada irregular. 1");
                ExibeMsgValidacao("Jogada irregular!");
                return false;            
            }
        }

        if ((c.getPosicao().x <= CasaSelecionada.getPosicao().x - 2) && (!CasaSelecionada.getPeca().getDama())){
            if ((c.getPosicao().x == CasaSelecionada.getPosicao().x - 2) && (c.getPosicao().y == CasaSelecionada.getPosicao().y - 2)){
                return validaCaptura(-1); //ESQUERDA
            }
            else {
                ExibeMsgValidacao("Jogada irregular!");
                return false;
            }
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
	*/

        if (c.getPosicao().y == 0) {
            CasaSelecionada.getPeca().setDama(true);   
        }

        if ((c.getPosicao().y >= CasaSelecionada.getPosicao().y) && (!CasaSelecionada.getPeca().getDama())) {
            console.log("Tentando andar apra tras.");
            ExibeMsgValidacao("Jogada irregular!");
            return false;
        }
		

        return true;
    }



	function ValidaCapturaMultiplaMaisDeUm(casa){
		for (var i = 0; i < CasaAoRedorComAdversarios.length; i++) {
			if(CasaAoRedorComAdversarios[i][1].getPosicao().y == casa.getPosicao().y && CasaAoRedorComAdversarios[i][1].getPosicao().x == casa.getPosicao().x){
				return true;
			}
		}
		return false;
	}


    this.Movimenta = function (casa) {
		
		//Verificando se é obrigdo a comer alguma peca
		if(CasaAoRedorComAdversarios != null && CasaAoRedorComAdversarios.length > 1){
			CasaAoRedorComAdversarios[0][0].setSelected();
			if(!ValidaCapturaMultiplaMaisDeUm(casa)){
			   CasaSelecionada = CasaAoRedorComAdversarios[0][0];
			   ExibeMsgValidacao("Voce esta obrigado a comer uma peca!");
			   return;
			}
		}
		
		if (CasaSelecionada != null) {
            if (validaMovimento(casa)) {
                casa.setPeca(CasaSelecionada.getPeca());
				CasaSelecionada.selected();
				CasaSelecionada.LimpaCasa();  //Removendo da casa de origm do movimento
				if(comeu){
					ContadorJogadasSemCapturaZerar();
					validaCapturaMultipla(casa);   //Precisa ser aqui pq eu tenho que passar a casa
				}else{
					ContadorJogadasSemCaptura();
				}
	            if (!IA.movimentoAtaque(ArrayCasas, casa)) {
	                IA.retornaPecaJogavelIa(ArrayCasas, that.usuHumano.nome);
	            }
            }else{
				CasaSelecionada.selected();
			}
		
            CasaSelecionada = null;
			comeu = false;  
        } else {
            if (ValidaCasaSelecionada(casa)) {
			   CasaSelecionada = casa;
			   CasaSelecionada.selected();
        	}
        }
		VerificaVitoria();
    };
	
	function ContadorJogadasSemCapturaZerar(){
		var td = document.getElementById("jogadasSemCapturaGeral");
        td.textContent = 0;
	}
	
	function ContadorJogadasSemCaptura(){
		var td = document.getElementById("jogadasSemCapturaGeral");
		var count = Number(td.textContent) + 1;
        td.textContent = count;
		if(count == 20){
			 alert("EMPATOU");
		}
	}
	
	function VerificaVitoria(){
		var qtdHumano = 0;
		var qtdMaquina = 0;
		
		for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                 var peca = ArrayCasas[i][j].getPeca();
				 if(peca != null){
					 if(peca.Usuario.nome == that.usuMakina.nome){
						 qtdMaquina++;
					 }else{
					    qtdHumano++;
					 } 
				 }
         
            }
        }
		
		if(qtdHumano == 0){
			alert("MAQUINA GANHOU"); 
		}
		
		if(qtdMaquina == 0){
			alert("HUMANO GANHOU"); 
		}
	}
	
	

    function addPontosPreto(){
        var td = document.getElementById("placar_coffee");
        td.textContent = Number(td.textContent) + 1;
    }

    function addPontosBranco() {
        var td = document.getElementById("placar_beer");
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
