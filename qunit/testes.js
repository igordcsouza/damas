
/* https://api.qunitjs.com/category/assert/ */

QUnit.test("testando CriaArrayCasas", function (assert) {

    var usu = new Bill();
    var tab = new Tabuleiro(usu);
    tab.CriaArrayCasas();
    var arr = tab.RetornaArrayCasas();

    assert.equal(arr.length, 8, "O array tem o tamanho de 8");
    assert.equal(arr[0].length, 8, "A linha 0 tem o tamanho de 8");
    assert.equal(arr[1].length, 8, "A linha 1 tem o tamanho de 8");
    assert.equal(arr[2].length, 8, "A linha 2 tem o tamanho de 8");
    assert.equal(arr[3].length, 8, "A linha 3 tem o tamanho de 8");
    assert.equal(arr[4].length, 8, "A linha 4 tem o tamanho de 8");
    assert.equal(arr[5].length, 8, "A linha 5 tem o tamanho de 8");
    assert.equal(arr[6].length, 8, "A linha 6 tem o tamanho de 8");
    assert.equal(arr[7].length, 8, "A linha 7 tem o tamanho de 8");

});


QUnit.test("testando ValidaCasaSelecionada", function (assert) {

    var usu1 = new Bill();
	usu1.tdFala = "bill";
	
	var usu2 = new Jobs();
	usu2.tdFala = "jobs";
	
    var tab = new Tabuleiro(usu1);
	var casa = new Casa();
	
    assert.equal(tab.ValidaCasaSelecionada(casa), false, "Click na casa vazia");
	
	casa.setPeca(new Peca(usu2));
	assert.equal(tab.ValidaCasaSelecionada(casa), false, "Click na casa usuario incorreto");
	
	casa.setPeca(new Peca(usu1));
	assert.equal(tab.ValidaCasaSelecionada(casa), true, "Click na casa usuario correto");

});


QUnit.test("testando InicializaParticipantes", function (assert) {

   var usu1 = new Bill();
   var tab = new Tabuleiro(usu1);
   tab.InicializaParticipantes();

   var usu1 = tab.RetornaUsuarioHumano();
   var usu2 = tab.RetornaUsuarioMaquina();

   assert.notEqual(usu1.nome, usu2.nome, "Os usuarios sao diferentes");
   assert.equal(usu1.nome, "bill", "O usuario Humano (cafe)");
   assert.equal(usu2.nome, "jobs", "O usuario Maquina (cerveja)");

});


QUnit.test("testando VerificaVitoria", function (assert) {

    var usu1 = new Bill();
    var tab = new Tabuleiro(usu1);
    tab.CriaArrayCasas();
    tab.InicializaParticipantes();
    tab.DistribuiPecas();

    assert.equal(tab.VerificaVitoria(), 0, "Nao houve ganhadores ainda");

    tab.RemovendoUsuarios("bill");
    assert.equal(tab.VerificaVitoria(), 1, "Maquina Ganhou");

    tab.RemovendoUsuarios("jobs"); //Limpando o array
    tab.DistribuiPecas();  // colocando o bill e o jobs
    tab.RemovendoUsuarios("jobs");  // removendo o jobs
    assert.equal(tab.VerificaVitoria(), 2, "Humano Ganhou");

});



QUnit.test("testando RetornaCasaDestinoParaMultiplo", function (assert) {

    var usu1 = new Bill();
    var tab = new Tabuleiro(usu1);
    tab.CriaArrayCasas();
    tab.InicializaParticipantes();
    var casa = new Casa();
        

    assert.equal(tab.RetornaCasaDestinoParaMultiplo(null, null, null), null, "Casa nula");
    assert.equal(tab.RetornaCasaDestinoParaMultiplo(casa, null, null), null, "Peca nula");

    casa.setPeca(new Peca(tab.RetornaUsuarioHumano()));
    assert.equal(tab.RetornaCasaDestinoParaMultiplo(casa, null, null), null, "Peca com usuario humano");

    casa.setPeca(new Peca(tab.RetornaUsuarioMaquina()));
    assert.equal(tab.RetornaCasaDestinoParaMultiplo(casa, 0, 0), null, "Peca com usuario humano");
    
    casa.setPosicao(new Posicao(3, 3));
    assert.notEqual(tab.RetornaCasaDestinoParaMultiplo(casa, -1, 1), null, "Retornou a casa");

});


  
