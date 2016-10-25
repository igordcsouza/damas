function Casa(id) {

    this.Id = id;
    var instance = this;
    var tabuleiro = null;
    
    var cor;
    var peca = null;
    var TD = null;
    var TR = null;
    
    this.setTabuleiro = function (value) {
        tabuleiro = value;
    };

    this.getTabuleiro = function () {
        return tabuleiro;
    };
    
    this.setCor = function (value) {
        cor = value;
        TD.setAttribute("class", value);
    };

    this.getCor = function () {
        return cor;
    };

    this.setPeca = function (value) {
        peca = value;
        TD.innerHTML = ""; // removendo oq estava antes
        TD.appendChild(peca.get());
    };


    this.getPeca = function () {
        return peca;
    };
    
    this.setTR = function (value) {
        TR = value;
    };

    this.getTR = function () {
        return TR;
    };

    this.setTD = function (value) {
        TD = value;
        TD.onclick = function () {
            tabuleiro.Movimenta(instance);
        };
    };

    this.getTD = function () {
        return TD;
    };

    this.LimpaCasa = function () {
        TD.innerHTML = "";
        peca = null;
    };
}


function Peca(usu) {
    this.Usuario = usu;
    var Dama = false;
    this.getDama = function () { return Dama; };
    this.setDama = function (valor) { Dama = valor; };
    
    this.get = function () {
        return this.Usuario.ImagemPeca();
    }
}