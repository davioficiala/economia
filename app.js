// app.js

let investimentos = 0;

function moeda(valor) {
    return "R$ " + Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calcular() {

    const entrada = Number(document.getElementById("entrada").value);

    if (entrada <= 0) {
        alert("Digite um valor válido.");
        return;
    }

    const emergencia = entrada * 0.20;
    investimentos = entrada * 0.30;
    const gastos = entrada * 0.50;

    document.getElementById("emergencia").innerHTML = moeda(emergencia);
    document.getElementById("investimentos").innerHTML = moeda(investimentos);
    document.getElementById("gastos").innerHTML = moeda(gastos);

    document.getElementById("dEntrada").innerHTML = moeda(entrada);
    document.getElementById("dEmergencia").innerHTML = moeda(emergencia);
    document.getElementById("dInvestimentos").innerHTML = moeda(investimentos);
    document.getElementById("dGastos").innerHTML = moeda(gastos);
}

async function salvarInvestimentos() {

    try {

        const dados = {

            entrada: Number(document.getElementById("entrada").value),

            emergencia: document.getElementById("emergencia").innerText,

            investimentos: document.getElementById("investimentos").innerText,

            gastos: document.getElementById("gastos").innerText,

            acoes: Number(document.getElementById("acoes").value),

            trader: Number(document.getElementById("trader").value),

            dividendos: Number(document.getElementById("dividendos").value),

            data: new Date()

        };

        await addDoc(collection(db, "financeiro"), dados);

        alert("Dados salvos com sucesso!");

        listar();

    } catch (erro) {

        console.log(erro);

        alert("Erro ao salvar.");

    }

}

async function listar() {

    const lista = document.getElementById("lista");

    if (!lista) return;

    lista.innerHTML = "";

    const query = await getDocs(collection(db, "financeiro"));

    query.forEach((doc) => {

        const d = doc.data();

        lista.innerHTML += `

        <div class="card">

        <h3>${d.data.toDate().toLocaleString()}</h3>

        Entrada: ${moeda(d.entrada)}<br>

        Emergência: ${d.emergencia}<br>

        Investimentos: ${d.investimentos}<br>

        Gastos: ${d.gastos}<br>

        Ações: ${moeda(d.acoes)}<br>

        Trader: ${moeda(d.trader)}<br>

        Dividendos: ${moeda(d.dividendos)}

        </div>

        `;

    });

}

function finalizarTrader() {

    const capital = Number(document.getElementById("capital").value);

    const resultado = Number(document.getElementById("resultado").value);

    const saldo = capital + resultado;

    investimentos = investimentos - capital + saldo;

    document.getElementById("saldoTrader").innerHTML = moeda(saldo);

    document.getElementById("investimentos").innerHTML = moeda(investimentos);

    document.getElementById("dInvestimentos").innerHTML = moeda(investimentos);

    document.getElementById("dTrader").innerHTML = moeda(saldo);

}

listar();
