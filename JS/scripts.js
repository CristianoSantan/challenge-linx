// ----------------------------------------------- Function to create the product card

// recebe dados da fetchAPI() e retorna um loop das informações de cada produto.
function createCard(data) {
  var product = data.products;
  var html = "";

  for (var i = 0; i < product.length; i++) {
    html += `<div class="card">`;
    html += `<div class="image"><img src="${product[i].image}" alt="product"/></div>`;
    html += `<div class="info">`;
    html += `<span>${product[i].name}</span><p>${product[i].description}</p> `;
    html += `<p>De: R$${product[i].oldPrice},00</p>`;
    html += `<p>Por: R$${product[i].price},00</p>`;
    html += `<p>ou ${product[i].installments.count}x de R$${product[i].installments.value}</p>`;
    html += `<input class="btn" type="button" value="Comprar" /></div></div>`;
  }

  document.querySelector("#cards").innerHTML = html;
}

// ----------------------------------------------- product requisition

// busca dados dos produtos em um BD externo, usando a função fetch e retornando em json.
function fetchAPI() {
  fetch(
    "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      createCard(data);
    });
}

fetchAPI();