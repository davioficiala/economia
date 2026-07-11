// scanner.js

function abrirScanner() {

    const scanner = document.getElementById("scanner");

    scanner.innerHTML = "";

    Quagga.init({

        inputStream: {
            type: "LiveStream",
            target: scanner,
            constraints: {
                facingMode: "environment"
            }
        },

        decoder: {
            readers: [
                "ean_reader",
                "ean_8_reader",
                "code_128_reader"
            ]
        }

    }, function(err) {

        if (err) {
            console.log(err);
            alert("Erro ao abrir câmera.");
            return;
        }

        Quagga.start();

    });

    Quagga.onDetected(async function(result) {

        const codigo = result.codeResult.code;

        document.getElementById("codigoLido").innerHTML =
        "Código: " + codigo;

        Quagga.stop();

        buscarProduto(codigo);

    });

}

async function buscarProduto(codigo){

    const consulta = await window.getDocs(
        window.collection(window.db,"dados")
    );

    consulta.forEach((doc)=>{

        const d = doc.data();

        if(d.tipo==="produto" && d.codigo===codigo){

            document.getElementById("produtoNome").innerHTML =
            d.nome;

            document.getElementById("produtoValor").innerHTML =
            "R$ " + Number(d.valor).toFixed(2);

        }

    });

}

function comprarProduto(){

    alert("Produto registrado.");

}
