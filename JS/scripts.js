// -------------------------------------------------------- Create the product card
// receives data from fetchAPI () and returns 
// a loop the information for each product.
function createCard(data) {
  var html = data
    .map(
      (item) => `
    <div class="card">
      <div class="image">
        <img src="${item.image}" alt="product"/>
      </div>
      <div class="info">
        <span>${item.name}</span>
        <p>${item.description}</p>
        <p>De: R$${item.oldPrice},00</p>
        <p>Por: R$${item.price},00</p>
        <p>ou ${item.installments.count}x de R$${item.installments.value}</p>
      <input class="btn" type="button" value="Comprar"/>
      </div>
    </div>
  `
    )
    .join("");
  document.querySelector("#cards").innerHTML += html;
}

// -------------------------------------------------------- Product requisition
// fetches product data from an external database,
// using the fetch method and returning in json.
const getAPI = async (url) => {
  const response = await fetch(url);
  return response.json();
};

let url = "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1"

// Stores the Array in the variable and updates the url with the next page,
// doing every click you search for new products.
// and use the createCard () function to render the divs for more products
const main = async () => {
   let data = await getAPI(url);
    url = `//${data.nextPage}`;
    createCard(data.products);
};

main();

