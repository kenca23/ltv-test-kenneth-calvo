const spinner = document.querySelector("[data-id=spinner]");
const result = document.querySelector("[data-id=result]");
const resultTitle = document.querySelector("[data-id=result-title]");
const resultText = document.querySelector("[data-id=result-text]");
const searchComponent = document.querySelector("[data-id=search-component]");

const dataName = document.querySelector("[data-id=data-name]");
const dataDescription = document.querySelector("[data-id=data-description]");
const dataAddress = document.querySelector("[data-id=data-address]");
const dataEmail = document.querySelector("[data-id=data-email]");
const dataPhones = document.querySelector("[data-id=data-phones]");
const dataRelatives = document.querySelector("[data-id=data-relatives]");


const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?email="
let email = localStorage.getItem("email");

const cleanData = () => { 
    resultTitle.innerHTML = ""
    resultText.innerHTML = ""
    dataName.innerHTML = ""
    dataDescription.innerHTML = ""
    dataAddress.innerHTML = ""
    dataEmail.innerHTML = ""
    dataPhones.innerHTML = ""
    dataRelatives.innerHTML = ""
}

const printData = (data) => { 
    spinner.classList.add("d-none");
    spinner.classList.remove("d-flex");
    cleanData()
    result.classList.add("d-flex");
    result.classList.remove("d-none");
    if (data && Object.keys(data).length > 0) {
        result.classList.add("result-data")
        searchComponent.classList.add("result-data")
        resultTitle.innerText = "1 Result"
        resultText.innerText = "Look at the result below to see the details of the person you’re searched for."

        dataName.innerHTML = data.first_name + " " + data.last_name; // We don't have age in the data, So I don't include the ,AGE like in asset.
        dataDescription.innerHTML = data.description;
        dataAddress.innerHTML = data.address;
        dataEmail.innerHTML = data.email;
        data.phone_numbers.forEach(number => {
            let telArea = number.substr(0, 3);
            let telPart1 = number.substr(3, 3);
            let telPart2 = number.substr(6)
            const li = document.createElement("li")
            li.innerHTML = "(" + telArea + ") " + telPart1 + "-" +telPart2
            dataPhones.appendChild(li)
        });
        data.relatives.forEach(relative => {
            const li = document.createElement("li")
            li.innerHTML = relative
            dataRelatives.appendChild(li)
        });

    } else {
        result.classList.remove("result-data")
        searchComponent.classList.remove("result-data")
        resultTitle.innerText = "0 Results"
        resultText.innerText = "Try starting a new search below"
    }


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

( () => {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else { 
                    event.preventDefault();
                    event.stopPropagation();
                    email = document.querySelector("[data-id=email]").value;
                    localStorage.setItem("email", email);
                    getData()
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
