function InteligenciaArtificial() {
	
	this.teste = function(){
	   alert("ss");	
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
