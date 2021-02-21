const spinner = document.querySelector("[data-id=spinner]");
const result = document.querySelector("[data-id=result]");
const resultTitle = document.querySelector("[data-id=result-title]");
const resultText = document.querySelector("[data-id=result-text]");



const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?email="
let email = localStorage.getItem("email");

const printData = (data) => { 
    spinner.classList.add("d-none");
    spinner.classList.remove("d-flex");
    result.classList.add("d-flex");
    result.classList.remove("d-none");



    console.log(data)
}

const getData = async () => { 
    spinner.classList.add("d-flex");
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    result.classList.remove("d-flex");
    let response = await fetch(url + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    } );

    if (response.ok) { 
        printData(await response.json())
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

window.onload = () => { 
    if (email != null) { 
        getData()
    }
}
