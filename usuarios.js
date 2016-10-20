function Usuario() {

    this.msgErroValidacao = new Array();
    this.msgErroValidacao[0] = "Como você é burro!! aprende a jogar damas!";
    this.msgErroValidacao[1] = "Ai que burro, dá zero pra ele!";
    this.msgErroValidacao[2] = "Nãoooo! se é burro cara! que loucura! que coisa absurda!"

    this.msgErroPecaVazia = new Array();
    this.msgErroPecaVazia[0] = "Animal!! primeiro escolhe sua peça!";

    this.msgErroPecaErrada = new Array();
    this.msgErroPecaErrada[0] = "Dá pra escolher a sua peça!!";

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
    this.nome = "jobs";
    this.imgPeca = "imagens/branca.png";
    this.imgFaceAnima = "imagens/jobsAnima.gif";
    this.imgFace = "imagens/jobs.jpg";
}

function Bill() {
    this.nome = "bill";
    this.imgPeca = "imagens/preta.png";
    this.imgFaceAnima = "imagens/billAnima.gif";
    this.imgFace = "imagens/bill.jpg";
}


Jobs.prototype = new Usuario();
Bill.prototype = new Usuario();



