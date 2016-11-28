function Usuario() {

    this.msgErroValidacao = new Array();
    this.msgErroValidacao[0] = "ERRO VALIDACAO 0";
    this.msgErroValidacao[1] = "ERRO VALIDACAO 1";
    this.msgErroValidacao[2] = "ERRO VALIDACAO 2"

    this.msgErroPecaVazia = new Array();
    this.msgErroPecaVazia[0] = "ERRO PECA VAZIA 0";

    this.msgErroPecaErrada = new Array();
    this.msgErroPecaErrada[0] = "ERRO PECA ERRADA 0";

}

Usuario.prototype.ImagemPeca = function () {
    var img = document.createElement("img");
    img.setAttribute("src", this.imgPeca);
    img.setAttribute("width", "65");
    img.setAttribute("height", "65");
    img.setAttribute("onclick", "colorirPecaSelecionada();");
    return img;
};


Usuario.prototype.ImagemPecaDama = function() {
  var img = document.createElement("img");
    img.setAttribute("src", this.imgPecaDama);
    img.setAttribute("width", "65");
    img.setAttribute("height", "65");
    img.setAttribute("onclick", "colorirPecaSelecionada();");
    return img;  
}

Usuario.prototype.ImagemFace = function () {
    var img = document.createElement("img");
    img.setAttribute("src", this.imgFace);
    img.setAttribute("class", this.class);
    img.setAttribute("style", "height: 200px;");
    return img;
};

Usuario.prototype.ImagemFaceAnima = function () {
    var img = document.createElement("img");
    img.setAttribute("src", this.imgFaceAnima);
    img.setAttribute("class", this.class);
    return img;
};

Usuario.prototype.MsgErroValidacao = function () {
    return this.msgErroValidacao[Math.floor((Math.random() * 3) + 0)];
};

Usuario.prototype.MsgErroPecaVazia = function () {
    return this.msgErroPecaVazia[0];
};

Usuario.prototype.MsgErroPecaErrada = function () {
    return this.msgErroPecaErrada[0];
};


function Jobs() {
    this.nome           = "jobs";
    this.imgPeca        = "img/branca.png";
    this.imgPecaDama    = "img/brancaDama.png";
    this.imgFaceAnima   = "img/Barney.jpg";
    this.imgFace        = "img/branca.png";
}

function Bill() {
    this.nome           = "bill";
    this.imgPeca        = "img/preta.png";
    this.imgPecaDama    = "img/pretaDama.png";
    this.imgFaceAnima   = "img/joey.jpg";
    this.imgFace        = "img/preta.png";
}


Jobs.prototype = new Usuario();
Bill.prototype = new Usuario();



