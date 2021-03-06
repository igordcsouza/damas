function Casa() {

    var instance = this;
    var tabuleiro = null;
    var posicao = null;
    var cor;
    var peca = null;
    var TD = null;
    var TR = null;
    var DAMA = false;

    this.setTabuleiro = function (value) {
        tabuleiro = value;
    };

    this.getTabuleiro = function () {
        return tabuleiro;
    };
    

    this.setPosicao = function (value) {
        posicao = value;
    };

    this.getPosicao = function () {
        return posicao;
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
        if(peca.getDama()){
            //console.log(posicao.x);
            //console.log(posicao.y);
            var item = $(peca.get()).hide().fadeIn();
            $(TD).append(item);
        }
        else{
            TD.appendChild(peca.get());
        }
    };


    this.getPeca = function () {
        return peca;
    };
    
    this.setTR = function (value) {
        TR = value;
    };

    this.selected = function () {
        if (this.getCor() == "cor") {
            // console.log(this.getCor() == "cor");
            this.setCor("selected");
        }
        else if (this.getCor() == "selected") {
            console.log("2");
            this.setCor("cor");
        }
    }

    this.getTR = function () {
        return TR;
    };

    this.setTD = function (value) {
        TD = value;
        TD.onclick = function () {            
            instance.selected();
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


function colorirPecaSelecionada(event){
    
}