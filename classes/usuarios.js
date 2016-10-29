function Usuario() {

    this.msgErroValidacao = new Array();
    this.msgErroValidacao[0] = "ERRO VALIDACAO 0";
    this.msgErroValidacao[1] = "ERRO VALIDACAO 1";
    this.msgErroValidacao[2] = "ERRO VALIDACAO 2"
    // this.msgErroValidacao[0] = "Como voc� � burro!! aprende a jogar damas!";
    // this.msgErroValidacao[1] = "Ai que burro, d� zero pra ele!";
    // this.msgErroValidacao[2] = "N�oooo! se � burro cara! que loucura! que coisa absurda!"

    this.msgErroPecaVazia = new Array();
    this.msgErroPecaVazia[0] = "ERRO PECA VAZIA 0";
    // this.msgErroPecaVazia[0] = "Animal!! primeiro escolhe sua pe�a!";

    this.msgErroPecaErrada = new Array();
    this.msgErroPecaErrada[0] = "ERRO PECA ERRADA 0";

}

Usuario.prototype.ImagemPeca = function () {
    var img = document.createElement("img");
    img.setAttribute("src", this.imgPeca);
    img.setAttribute("width", "65");
    img.setAttribute("height", "65");
    return img;
};

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
    this.nome = "branca";
    this.imgPeca = "img/branca.png";
    this.imgFaceAnima = "img/jobsAnima.gif";
    this.imgFace = "img/branca.png";
}

function Bill() {
    this.nome = "preta";
    this.imgPeca = "img/preta.png";
    this.imgFaceAnima = "img/billAnima.gif";
    this.imgFace = "img/preta.png";
}


Jobs.prototype = new Usuario();
Bill.prototype = new Usuario();



