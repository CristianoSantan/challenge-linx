// -------------------------------------------------------- Create the product card
// receives data from fetchAPI () and returns 
// a loop the information for each product.
function createCard(data) {
  var html = data.map(item => `
      <div class="card">
        <div class="image">
          <img src="${item.image}" alt="product"/>
        </div>
        <div class="info">
          <span>${item.name}</span>
          <p>${item.description}</p>
          <p>De: R$${item.oldPrice},00</p>
          <p>Por: R$${item.price},00</p>
          <p>ou ${item.installments.count}x de 
          R$${item.installments.value.toFixed(2).replace(".", ",")}</p>
        <input class="btn" type="button" value="Comprar"/>
        </div>
      </div>`
  ).join("");
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

// -------------------------------------------------------- Validation of the sharing form

const fields = document.querySelectorAll("[required]")

function validateField(field) {
  // logica para verificar se existem erros
  function verifyErrors() {
    let foundError = false;

    for(let error in field.validity) {
      // se não for customError
      // então verifica se tem erro
      if (field.validity[error] && !field.validity.valid) {
        foundError = error
      }
    }
    return foundError;
  }
  // Lógica para customizar a mensagem
  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "* Por favor, preencha este campo"
      },
      email: {
        valueMissing: "* Email é obrigatório",
        typeMismatch: "* Por favor, preencha um email válido"
      },
      radio: {
        valueMissing: "* Selecione uma das opções"
      }
    }
    return messages[field.type][typeError]
  }
  // Lógica para atualizar a mensagem
  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error")
    if (message) {
      spanError.classList.add("active")
      spanError.innerHTML = message
    } else {
      spanError.classList.remove("active")
      spanError.innerHTML = ""
    }
  }
  // Retorna uma função com uma lógica de condição
  return function () {
    const error = verifyErrors()
    if (error) {
      const message = customMessage(error)
      field.style.backgroundColor = "#ff000005"
      field.style.borderColor = "#ff000080"
      setCustomMessage(message)
    } else {
      field.style.backgroundColor = "#00ff0002"
      field.style.borderColor = "#00ff0090"
      setCustomMessage()
    }
  }
}
// recebe o evento de cada campo e retorna a mensagem
function customValidation(event) {
  const field = event.target
  const validation = validateField(field)
  validation()
}
// qual campo disparou o evento
for ( field of fields ) {
  field.addEventListener("invalid", event => {
    // eliminar o bubble do navegador
    event.preventDefault()
    customValidation(event)
  })
  field.addEventListener("blur", customValidation)
}

// Não enviar o formulario ao submeter 
document.querySelector("#form-share")
.addEventListener("submit", event => {
  console.log("formulário share enviado")
  // não envia o formuário
  event.preventDefault()
})
// Não enviar o formulario ao submeter 
document.querySelector("#form-help")
.addEventListener("submit", event => {
  console.log("formulário help enviado")
  // não envia o formuário
  event.preventDefault()
})