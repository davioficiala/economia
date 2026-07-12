
// app.js

function moeda(valor){
    return Number(valor).toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });
}

// =======================
// Salvar Financeiro
// =======================

async function salvarFinanceiro(){

    const entrada = Number(document.getElementById("entrada").value);

    if(entrada<=0){
        alert("Digite uma entrada.");
        return;
    }

    const emergencia = entrada * 0.20;
    const investimentos = entrada * 0.30;
    const gastos = entrada * 0.50;

    document.getElementById("emergencia").innerHTML = moeda(emergencia);
    document.getElementById("investimentos").innerHTML = moeda(investimentos);
    document.getElementById("gastos").innerHTML = moeda(gastos);

    try{

        await window.addDoc(
            window.collection(window.db,"dados"),
            {
                tipo:"financeiro",
                entrada,
                emergencia,
                investimentos,
                gastos,
                data:new Date()
            }
        );

        alert("✅ Salvo com sucesso!");

        listar();

    }catch(e){

        console.log(e);
        alert("Erro ao salvar.");

    }

}

// =======================
// Histórico
// =======================

async function listar(){

    const lista = document.getElementById("lista");

    if(!lista) return;

    lista.innerHTML = "";

    const dados = await window.getDocs(
        window.collection(window.db,"dados")
    );

    dados.forEach((doc)=>{

        const d = doc.data();

        if(d.tipo==="financeiro"){

            lista.innerHTML += `

            <div class="item">

            <b>Entrada:</b> ${moeda(d.entrada)}<br>

            🛡️ Emergência: ${moeda(d.emergencia)}<br>

            📈 Investimentos: ${moeda(d.investimentos)}<br>

            💳 Gastos: ${moeda(d.gastos)}

            </div>

            `;

        }

    });

}

// =======================
// Scanner
// =======================

function abrirScanner(){

    alert("Scanner conectado na próxima etapa.");

}

// =======================
// Comprar Produto
// =======================

async function comprarProduto(){

    const nome = document.getElementById("produtoNome").innerText;

    const valorTexto = document.getElementById("produtoValor").innerText
    .replace("R$","")
    .replace(",",".")
    .trim();

    const valor = Number(valorTexto);

    if(!nome || valor<=0){

        alert("Nenhum produto selecionado.");

        return;

    }

    try{

        await window.addDoc(

            window.collection(window.db,"dados"),

            {

                tipo:"compra",

                produto:nome,

                valor:valor,

                data:new Date()

            }

        );

        alert("Compra registrada!");

        listarCompras();

    }catch(e){

        console.log(e);

    }

}

// =======================
// Lista Compras
// =======================

async function listarCompras(){

    const lista = document.getElementById("listaCompras");

    if(!lista) return;

    let total = 0;

    lista.innerHTML = "";

    const consulta = await window.getDocs(
        window.collection(window.db,"dados")
    );

    consulta.forEach((doc)=>{

        const d = doc.data();

        if(d.tipo==="compra"){

            total += Number(d.valor);

            lista.innerHTML += `

            <div class="item">

            🛒 ${d.produto}<br>

            ${moeda(d.valor)}

            </div>

            `;

        }

    });

    document.getElementById("totalCompras").innerHTML =
    moeda(total);

}

// =======================
// Inicialização
// =======================

listar();

listarCompras();
