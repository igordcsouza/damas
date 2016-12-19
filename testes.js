
/* https://api.qunitjs.com/category/assert/ */

QUnit.test("testando CriaArrayCasas", function (assert) {
    //assert.ok(1 == "1", "Passed!");
    var usu = new Bill();
    var tab = new Tabuleiro(usu);
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


  
