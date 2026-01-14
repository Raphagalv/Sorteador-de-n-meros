// selecionando elementos

const formSorteio = document.getElementById('form-sorteio')
const qtdInput = document.getElementById('qtd')
const minInput = document.getElementById('min')
const maxInput = document.getElementById('max')
const noRepeatInput = document.getElementById('no-repeat')

const resultadoSection = document.getElementById('resultado')
const numerosResult = document.getElementById('numeros')
const btnSortearNovamente = document.getElementById('sortear-novamente')

//

formSorteio.addEventListener('submit', event => {
    event.preventDefault()

    const qtd = Number(qtdInput.value)
    const min = Number(minInput.value)
    const max = Number(maxInput.value)
    const naoRepetir = noRepeatInput.checked


    if (min >= max) {
        alert('O valor mínimo deve ser menor que o máximo.')
        return
    }

    if (naoRepetir && qtd > (max - min + 1)) {
        alert('Quantidade maior que o intervalo disponível.')
        return
    }

    const numerosSorteados = sortearNumeros(qtd, min, max, naoRepetir)
    mostrarResultado(numerosSorteados)
})

btnSortearNovamente.addEventListener('click', resetarSorteio)

function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function sortearNumeros(qtd, min, max, naoRepetir) {
    const numeros = []

    while (numeros.length < qtd) {
        const numero = gerarNumeroAleatorio(min, max)

        if (naoRepetir) {
            if (!numeros.includes(numero)) {
                numeros.push(numero)
            }
        } else {
            numeros.push(numero)
        }
    }

    return numeros
}

function mostrarResultado(numeros) {
    // limpa resultados anteriores
    numerosResult.innerHTML = ''

    numeros.forEach((numero) => {
        const item = document.createElement('div')
        item.classList.add('numero-sorteado')
        item.textContent = numero

        numerosResult.appendChild(item)
    })

    // alterna visibilidade
    formSorteio.classList.add('hidden')
    resultadoSection.classList.remove('hidden')
}

function resetarSorteio() {
    numerosResult.innerHTML = ''
    resultadoSection.classList.add('hidden')
    formSorteio.classList.remove('hidden')
}