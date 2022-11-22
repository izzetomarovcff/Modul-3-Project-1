const colr2 = document.querySelector(".two .curitem:nth-child(2)")
const colr1 = document.querySelector(".one .curitem:first-child")
colr1.style.backgroundColor = "#833AE0";
colr2.style.backgroundColor = "#833AE0";
const url = `https://api.exchangerate.host/latest`
const costone = document.querySelector(".itemone .cost")
const costtwo = document.querySelector(".itemtwo .cost")
const valElments1 = document.querySelectorAll(".itemone .curitem")
const valElments2 = document.querySelectorAll(".itemtwo .curitem")
const inputOne = document.querySelector(".itemone .value")
const inputTwo = document.querySelector(".itemtwo .value")
const selecet = (val) => {
    val.forEach((item) => {
        item.addEventListener("click", (e) => {
            val.forEach((item) => {
                item.style.background = "white"
                item.style.color = "#C6C6C6"
            })
            item.style.background = "#833AE0"
            item.style.color = "white"
        })
    })
}
selecet(valElments1)
selecet(valElments2)
const run = async (from, to, side) => {
    if (side === "base") {
        fetch(`${url}?base=${from}&symbols=${to}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                inputTwo.value = inputOne.value * Object.values(data.rates)[0]
            })
    } else {
        fetch(`${url}?base=${to}&symbols=${from}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                inputOne.value = inputTwo.value * Object.values(data.rates)[0]
            })
    }

    fetch(`${url}?base=${from}&symbols=${to}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        costone.innerText = `1 ${from} = ${Object.values(data.rates)[0]} ${to}`
        inputOne.addEventListener("input", () => {
            inputTwo.value = inputOne.value * Object.values(data.rates)[0]
        })
    })

    fetch(`${url}?base=${to}&symbols=${from}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        costtwo.innerText = `1 ${to} = ${Object.values(data.rates)[0]} ${from}`
        inputTwo.addEventListener("input", () => {
            inputOne.value = inputTwo.value * Object.values(data.rates)[0]
        })
    })

    

}
run("RUB", "USD", "base")
run("RUB", "USD", "")
valElments1.forEach((item) => {
    item.addEventListener("click", () => {
        valElments2.forEach((element) => {
            if (element.style.backgroundColor == "rgb(131, 58, 224)") {
                intext1 = element.innerText
            }
        })
        run(item.innerText, intext1, '')
    })
})
valElments2.forEach((item) => {
    item.addEventListener("click", () => {
        valElments1.forEach((element) => {
            if (element.style.backgroundColor == "rgb(131, 58, 224)") {
                intext2 = element.innerText
            }
        })
        run(intext2, item.innerText, "base")
    })
})