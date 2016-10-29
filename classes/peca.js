function Peca(usu) {
    this.Usuario = usu;
    var Dama = false;
    this.getDama = function () { return Dama; };
    this.setDama = function (valor) { Dama = valor; };
    this.get = function () {
        return this.Usuario.ImagemPeca();
    }
}