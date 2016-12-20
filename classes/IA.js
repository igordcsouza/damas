function InteligenciaArtificial() {

    this.movimentoAtaque = function (ArrayCasas, casa) {
        console.log("------");
        var casaDireita = ArrayCasas[casa.getPosicao().y - 1][casa.getPosicao().x + 1].getPeca();
        var casaEsquerda = ArrayCasas[casa.getPosicao().y - 1][casa.getPosicao().x - 1].getPeca();
        var casaDownEsquerda = ArrayCasas[casa.getPosicao().y + 1][casa.getPosicao().x - 1].getPeca();
        var casaDownDireita = ArrayCasas[casa.getPosicao().y + 1][casa.getPosicao().x + 1].getPeca();
        console.log(casa.getPeca().getUsuario());
        if (casaDireita) {
            console.log(casaDireita.getUsuario());
        }
        if ((casaDireita) && (casaDireita.getUsuario() != casa.getPeca().getUsuario())) {
            console.log("Possibilidade de ataque da direita");
            if (!casaDownEsquerda) {
                if (casa.getPeca().getUsuario() == "jobs") {
                    addPontosPreto();
                }
                else {
                    addPontosBranco();
                }
                casa.LimpaCasa();
                ArrayCasas[casa.getPosicao().y + 1][casa.getPosicao().x - 1].setPeca(casaDireita);
                ArrayCasas[casa.getPosicao().y - 1][casa.getPosicao().x + 1].LimpaCasa();
                ContadorJogadasSemCapturaZerar();
                return true;
            }
        }
        if (casaEsquerda) {
            console.log(casaEsquerda.getUsuario());
        }
        if ((casaEsquerda) && (casaEsquerda.getUsuario() != casa.getPeca().getUsuario())) {
            if (!casaDownDireita) {
                console.log("---2---");
                console.log(casa.getPeca().getUsuario());
                if (casa.getPeca().getUsuario() == "jobs") {
                    addPontosPreto();
                }
                else {
                    addPontosBranco();
                }
                console.log("---2---");
                casa.LimpaCasa();
                ArrayCasas[casa.getPosicao().y + 1][casa.getPosicao().x + 1].setPeca(casaEsquerda);
                ArrayCasas[casa.getPosicao().y - 1][casa.getPosicao().x - 1].LimpaCasa();
                ContadorJogadasSemCapturaZerar();
                return true;
            }
        }
        
    }


    function ContadorJogadasSemCapturaZerar() {
        var td = document.getElementById("jogadasSemCapturaGeral");
        td.textContent = 0;
    }

    function addPontosBranco() {
        var td = document.getElementById("placar_beer");
        td.textContent = Number(td.textContent) + 1;
    }

    function addPontosPreto(){
        var td = document.getElementById("placar_coffee");
        td.textContent = Number(td.textContent) + 1;
    }
	
	//Metodo PUBLICO
	this.retornaPecaJogavelIa = function(ArrayCasas, nome) {
        var fugasObrigatorias = [];
        var jogadasPossiveis = [];
        var ataqueNecessario = [];
        var peca;
        for (var i = ArrayCasas.length - 1; i >= 0; i--) {
            for (var j = ArrayCasas[i].length - 1; j >= 0; j--) {
                if ((ArrayCasas[i][j].getPeca() != null) && (ArrayCasas[i][j].getPeca().Usuario["nome"] != nome)) {
                    if (testaMovimentacaoIA(ArrayCasas,i,j) == 1){
                        jogadasPossiveis.push([i,j]);
                    }
                    if (testaMovimentacaoIA(ArrayCasas,i,j) == 2) {
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
        MovimentaPeca(ArrayCasas, peca[0],peca[1]);
    }
	
	function MovimentaPeca(ArrayCasas, linha,coluna){
        var direita = validaPosicaoIA(ArrayCasas, linha+1, coluna + 1);
        var esquerda = validaPosicaoIA(ArrayCasas, linha+1, coluna - 1);
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
	
	
	function testaMovimentacaoIA(ArrayCasas,linha,coluna){
        if ((validaPosicaoIA(ArrayCasas,linha+1, coluna+1)) || (validaPosicaoIA(ArrayCasas,linha+1, coluna-1))){
            return 1;
        }
        if (validaMovimentoCapturaSimples(linha,coluna)) {
            return 2;
        }
        if (validaMovimentoDefesa(linha,coluna)){
            return 3;
        }
    }

    
	function validaPosicaoIA(ArrayCasas, linha,coluna){
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
   }
	
    
}
