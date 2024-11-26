const body = document.querySelector("body")
const sun = document.querySelector(".sun")
const dot = document.querySelector(".dot")
const cardEl = document.querySelector(".cards")
const input = document.querySelector("input")
const select_value = document.querySelector(".select_value")



var mode = "dark"

sun.addEventListener("click", () => {

    if (mode == "dark") {
        localStorage.setItem("mode", "light")
    } else {
        localStorage.setItem("mode", "dark");
    }

    changeMode()

});

const changeMode = () => {
    mode = localStorage.getItem("mode")
    if (mode == "dark") {
        body.classList.add("dark")
    } else {
        body.classList.remove("dark")
    }
}


changeMode()

const api_link = "https://restcountries.com/v3.1/all";

const getData = async (link) => {
    const req = await fetch(link);
    const data = await req.json()
    writeData(data)

}

getData(api_link)

const writeData = (cards) => {
    cards.forEach((item) => {

        cardEl.innerHTML += `
      <div class="card">
                        <img src=${item.flags.png} alt="">
                        <h1>${item.name.common}</h1>
                        <p><span>Population:</span>${item.population}</p>
                        <p class="region"><span>Region:</span>${item.region}</p>
                        <p class="text"><span>Capital:</span>${item.capital}</p>
                    </div>
    
    `
    });
}

input.addEventListener("input", () => {
    const allCountries = document.querySelectorAll(".card")

    allCountries.forEach((item) => {
        if (!item.querySelector("h1").textContent.toLocaleLowerCase().includes(input.value.toLocaleLowerCase())) {
            item.classList.add("hidden")

        } else {
            item.classList.remove("hidden")

        }

    })

})

select_value.addEventListener("change", () => {
    const allRegions = document.querySelectorAll(".card")

    allRegions.forEach((item) => {
        if (select_value.value != "All") {
            if (!item.querySelector(".region").textContent.toLocaleLowerCase().includes(select_value.value.toLocaleLowerCase())) {
                item.classList.add("hidden")

            } else {
                item.classList.remove("hidden")

            }
        } else {
            item.classList.remove("hidden")

        }
    })

})


