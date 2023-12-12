const url = "https://striveschool-api.herokuapp.com/api/product";
const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MWVhNWMwNTgzNTAwMTg1MjJjYTAiLCJpYXQiOjE3MDIzNzA5ODEsImV4cCI6MTcwMzU4MDU4MX0.SB9FkLo6CTIDYcdNKVg_LaDW1LArGss6AYYf3dePpYI"
}



window.onload = function () {
    fetch(url, {headers})
    .then((response) => response.json())
    .then((data) => {
        let card = document.getElementById("card");
        card.innerHTML = "";

        data.forEach((el) => {
            card.innerHTML += `
            <div class = "col">
            <div class = "card">
            <img src="${el.imageUrl}" class="card-img-top" alt=""/>
            <div class = "card-body">
            <h5 class = "card-title">${el.name}</h5>
            <p class = "card-text">${el.description}</p>
            <a class = "btn btn-warning me-2 mb-1" href="back.html?id=${el.id}">Modifica</a>
            <a class = "btn btn-info" href="detail.html?id=${el.id}">Scopri di più</a>
            </div>
            </div>
            </div>`
        })
})
}

async function addProduct() {
    const objName = document.getElementById("productName").value;
    const objDescription = document.getElementById("productDescription").value;
    const objPrice = document.getElementById("productPrice").value;
    const objBrand = document.getElementById("productBrand").value;
    const objImg = document.getElementById("imgPro").value;

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: headers.Authorization,
            },
            body: JSON.stringify({
                "name": `${objName}`,
                "description": `${objDescription}`,
                "price": `${objPrice}`,
                "brand": `${objBrand}`,
                "imageUrl": `${objImg}`,
            }),
        });

        let data = await response.json();
        console.log(data);

        // Effettua una nuova richiesta per ottenere l'elenco aggiornato dei prodotti
        fetch(url, { headers })
            .then((response) => response.json())
            .then((data) => {
                let card = document.getElementById("card");
                card.innerHTML = "";

                data.forEach((product) => {
                card.innerHTML += `<div class= "col">
            <div class = "card">
            <img src="${product.imageUrl}" class="card-img-top" alt=""/>
            <div class = "card-body">
            <h5 class = "card-title">${product.name}</h5>
            <p class = "card-text">${product.description}</p>
            <a class="btn btn-warning me-2 mb-1" href="./modifica.html" id="${product._id}">Modifica</a>
            <a class = "btn btn-info" href="details.html? id=${product._id}">Scopri di più</a>
            </div>
            </div>
            </div>`
                });
            });

        // Reindirizza all'index.html o dove desideri
        window.location.href = "./homepage.html";
    } catch (error) {
        console.error(error);
    }
}