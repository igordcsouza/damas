function Peca(usu) {
    this.Usuario = usu;
    var Dama = false;
    this.getDama = function () { return Dama; };
    this.setDama = function (valor) { Dama = valor; };
    this.get = function () {
    	if (this.getDama()){
    		return this.Usuario.ImagemPecaDama();	
    	}
    	else {
    		return this.Usuario.ImagemPeca();
    	}
        
    }
}