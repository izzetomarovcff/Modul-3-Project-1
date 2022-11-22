const inputOne = document.querySelector(".itemone .value")
const inputTwo = document.querySelector(".itemtwo .value")
const valElments1 = document.querySelectorAll(".itemone .curitem")
const valElments2 = document.querySelectorAll(".itemtwo .curitem")
let intext1,intext2;
const colr2 = document.querySelector(".two .curitem:nth-child(2)")
const colr1 = document.querySelector(".one .curitem:first-child")
colr1.style.backgroundColor = "#833AE0";
colr2.style.backgroundColor = "#833AE0";
const text = (from,to) =>{
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
    .then(response=>{
        return response.json()
    })
    .then(data=>{
        const costone = document.querySelector(".itemone .cost")
        costone.innerText = `1 ${from} = ${Object.values(data.rates)[0]} ${to}`
        valElments1.forEach((item)=>{
            item.addEventListener("click",(e)=>{
                valElments1.forEach((item)=>{
                    item.style.background = "white"
                    item.style.color = "#C6C6C6"
                })
                item.style.background = "#833AE0"
                item.style.color = "white"
                valElments2.forEach((element)=>{
                    if(element.style.backgroundColor == "rgb(131, 58, 224)"){
                        intext1 =  element.innerText
                    }
                })
                
                text(item.innerText,intext1)
                
            })
        })
        
        inputOne.addEventListener("input",()=>{
            inputTwo.value = inputOne.value * Object.values(data.rates)[0]
        })
        
        valElments2.forEach((item)=>{
            item.addEventListener("click",()=>{
                inputOne.value = inputTwo.value / Object.values(data.rates)[0]
            })
        })
         
    })

    fetch(`https://api.exchangerate.host/latest?base=${to}&symbols=${from}`)
    .then(response=>{
        return response.json()
    })
    .then(data=>{
        
        //data2 = Object.values(data.rates)[0]
        const costtwo = document.querySelector(".itemtwo .cost")
        costtwo.innerText = `1 ${to} = ${Object.values(data.rates)[0]}  ${from}`
        valElments2.forEach((item)=>{
            item.addEventListener("click",(e)=>{
                valElments2.forEach((item)=>{
                    item.style.background = "white"
                    item.style.color = "#C6C6C6"
                })
                item.style.background = "#833AE0"
                item.style.color = "white"
                valElments1.forEach((element)=>{
                    if(element.style.backgroundColor == "rgb(131, 58, 224)"){
                        intext2 =  element.innerText
                    }
                })
                text(intext2,item.innerText)
                
            })
        })
        
        inputTwo.addEventListener("input",()=>{

            inputOne.value = inputTwo.value * Object.values(data.rates)[0]
        })
        valElments1.forEach((item)=>{
            item.addEventListener("click",()=>{
                inputTwo.value = inputOne.value / Object.values(data.rates)[0]
            })
        })
        
    })
}
text("RUB","USD")
Intl.NumberFormat('tr-TR', {
    notation: 'compact',
    maximumFractionDigits: 2
}).format(inputOne.value)