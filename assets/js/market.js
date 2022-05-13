var productsdiv = document.getElementById("pruducts")
var tbody = document.getElementById("tbody")
var total = 0;
window.onscroll = function () {

    if (document.documentElement.scrollTop > 100) {
        document.getElementById("nav").style.backgroundColor = "white";
        document.querySelectorAll('.navt').forEach(text => {
            text.style.color = "#131129"
        })
    } else {
        document.getElementById("nav").style.backgroundColor = "transparent";
        document.querySelectorAll('.navt').forEach(text => {
            text.style.color = "white"
        })
    }
}
class Water {
    constructor(name, price, count, imgurl) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.imgurl = imgurl;
        this.total = 0
    }

}

waters = [
    new Water('0.5L', 0.79, 0, "./assets/img/0.5l.png"),
    new Water('0.75L', 1.99, 0, "./assets/img/0.75l.png"),
    new Water('1L', 1.59, 0, "./assets/img/1l.png"),
    new Water('5L', 3.99, 0, "./assets/img/5l.jpg"),
    new Water('10L', 7.99, 0, "./assets/img/10l.jpg"),
    new Water('19L', 13.99, 0, "./assets/img/19l.jpg")
]


function add() {
    waters.forEach(element => {
        div = document.createElement('div');
        btn = document.createElement('button')

        btn.classList.add("btn", "btn-primary", "rounded")
        btn.innerText = "BUY"

        div.classList.add("justify-content-center")
        div.innerHTML += `<img class="productimg" src="${element.imgurl}" alt="">`
        div.innerHTML += `<p class="text-center">${element.name}</p>`
        div.innerHTML += `<p class="text-center">${element.price}$ </p>`
        div.appendChild(btn);
        btn.onclick = function () {
            for (let i = 0; i < tbody.childElementCount; i++) {
                if (tbody.children[i].children[1].firstChild.innerText == element.name) {
                    tbody.children[i].children[3].firstChild.innerText = ++element.count;
                    element.total = element.count * element.price
                    tbody.children[i].children[4].firstChild.innerText = element.total.toFixed(2) + "$"
                    document.getElementById("total").innerText = `Total:${total.toFixed(2)}`
                    calcltotal()
                    count.innerText = tbody.childElementCount
                    local(element)
                    return;
                }
            }
            row = tbody.insertRow();
            row.insertCell().innerHTML = `<img class="tableimg" src="${element.imgurl}" alt="">`
            row.insertCell().innerHTML = `<p class="text-center text-black-50">${element.name}</p>`
            row.insertCell().innerHTML = `<p class="text-center  text-black-50">${element.price}$</p>`
            row.insertCell().innerHTML = `<p class="text-center  text-black-50">${++element.count}</p>`
            element.total += element.price
            row.insertCell().innerHTML = `<p class="text-center text-black-50">${element.total.toFixed(2)}</p>`


            rtd = document.createElement('td')
            rtd.innerText = "REMOVE"
            rtd.addEventListener('click', function () {
                if (element.count == 1) {
                    this.parentElement.remove();
                    count.innerText = tbody.childElementCount
                    localStorage.removeItem(element.name)
                    element.count--;
                }
                else {
                    element.count--;
                }
                element.total -= element.price
                this.parentElement.children[4].innerHTML = `<p class="text-center text-black-50">${element.total.toFixed(2)}</p>`
                this.parentElement.children[3].innerHTML = `<p class="text-center text-black-50">${element.count}</p>`
                calcltotal()
                if (element.count > 0)
                    local(element)
            })
            row.appendChild(rtd)

            count.innerText = tbody.childElementCount
            calcltotal()
            local(element)
        }
        productsdiv.appendChild(div)
    });
}
add();

function calcltotal() {
    total = 0;
    for (let i = 0; i < tbody.childElementCount; i++) {
        total += parseFloat(tbody.children[i].children[4].firstChild.innerText)
    }
    document.getElementById("total").innerText = `Total:${total.toFixed(2)}$`
}


modalbtn.addEventListener('click', () => {
    modal.style.display = "flex";
})

document.getElementById("close").addEventListener('click', () => {
    modal.style.display = "none";
})

function local(element) {
    localStorage.setItem(element.name, JSON.stringify(element));
}
function loadfromlocal() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        waters.forEach(elem => {
            if (key == elem.name) {
                var obj = JSON.parse(localStorage.getItem(key));
                elem.count = obj.count
                elem.total = obj.total

                row = tbody.insertRow();
                row.insertCell().innerHTML = `<img class="tableimg px-2" src="${elem.imgurl}" alt="">`
                row.insertCell().innerHTML = `<p class="text-center px-2  text-black-50">${elem.name}</p>`
                row.insertCell().innerHTML = `<p class="text-center px-2 text-black-50">${elem.price}$</p>`
                row.insertCell().innerHTML = `<p class="text-center px-2 text-black-50">${elem.count}</p>`
                row.insertCell().innerHTML = `<p class="text-center px-2 text-black-50">${elem.total.toFixed(2)}</p>`


                rtd = document.createElement('td')
                rtd.innerText = "REMOVE"
                rtd.addEventListener('click', function () {
                    if (elem.count == 1) {
                        this.parentElement.remove();
                        count.innerText = tbody.childElementCount
                        localStorage.removeItem(elem.name)
                        elem.count--;
                    }

                    elem.count--;
                    elem.total -= elem.price
                    this.parentElement.children[4].innerHTML = `<p class="text-center text-black-50">${elem.total.toFixed(2)}</p>`
                    this.parentElement.children[3].innerHTML = `<p class="text-center text-black-50">${elem.count}</p>`
                    calcltotal()
                    if (elem.count > 0)
                        local(elem)
                })
                row.appendChild(rtd)

                count.innerText = tbody.childElementCount
                calcltotal()

                productsdiv.appendChild(div)
            }
        })
    }
}
loadfromlocal()