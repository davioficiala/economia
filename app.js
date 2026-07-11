// app.js

function moeda(valor){
    return Number(valor).toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });
}

async function salvarFinanceiro(){

    const entrada = Number(document.getElementById("entrada").value);

    if(entrada <= 0){
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

                entrada:entrada,

                emergencia:emergencia,

                investimentos:investimentos,

                gastos:gastos,

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

async function listar(){

    const lista=document.getElementById("lista");

    if(!lista) return;

    lista.innerHTML="";

    const dados=await window.getDocs(

        window.collection(window.db,"dados")

    );

    dados.forEach((doc)=>{

        const d=doc.data();

        if(d.tipo==="financeiro"){

            lista.innerHTML+=`

            <div class="item">

            <b>Entrada:</b> ${moeda(d.entrada)}<br>

            🛡️ ${moeda(d.emergencia)}<br>

            📈 ${moeda(d.investimentos)}<br>

            💳 ${moeda(d.gastos)}

            </div>

            `;

        }

    });

}

function abrirScanner(){

    alert("Scanner será conectado na próxima etapa.");

}

function comprarProduto(){

    alert("Compra de produto será adicionada na próxima etapa.");

}

listar();
