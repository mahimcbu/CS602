function addProduct(){
    window.location.href = '/admin/add';
}

function cancelAdd(){
    window.location.href = '/admin';
}

function cancelCheckout(){
    window.location.href = '/customer';
}

function cancelDelete(){
    window.location.href = '/admin';
}

function addToCart(event,price, stock) {
    var quantity = event.target.parentNode.parentNode.querySelector("td:nth-child(4)");
    var stockEl = event.target.parentNode.parentNode.querySelector("td:nth-child(6)");

    if (parseInt(quantity.innerHTML) < stock && parseInt(quantity.innerHTML) >= 0) {
        quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
        stockEl.innerHTML = stock - parseInt(quantity.innerHTML);

        let totalMoney = parseFloat(document.querySelector("#totalMoney").textContent) || 0;
        document.querySelector("#totalMoney").textContent = (totalMoney + (price)).toFixed(2);
      }
  }



  function removeFromCart(event, price, stock) {
    var quantity = event.target.parentNode.parentNode.querySelector("td:nth-child(4)");
    var stockEl = event.target.parentNode.parentNode.querySelector("td:nth-child(6)");
  
    if (parseInt(quantity.innerHTML) > 0) {
        quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
        stockEl.innerHTML = parseInt(stockEl.innerHTML) + 1;
  
        let totalMoney = parseFloat(document.querySelector("#totalMoney").textContent) || 0;
        document.querySelector("#totalMoney").textContent = (totalMoney - (price)).toFixed(2);
    }
  }


  //Checkout order..................................

  function checkout() {
    // Calculate the total amount of the cart
    let total = 0;
    let products = document.querySelectorAll(".main_rows");
    let orderedProducts = [];
    products.forEach(product => {
      let name = product.querySelector("td:nth-child(1)").innerHTML;
      let productID = document.getElementById("productID").innerHTML;
      let quantity = parseInt(product.querySelector("td:nth-child(4)").innerHTML);
      let price = parseFloat(product.querySelector("td:nth-child(3)").innerHTML.substring(1));
      if (quantity > 0) {
        orderedProducts.push({ name, quantity, price, productID });
        total += quantity * price;
      }
    });
    
    // Get a unique customer ID
    let customerId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
//      // send the order data to the server
//     let response = fetch('/api/order', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       customerId,
//       orderedProducts,
//       total
//     })
//   });

//   let result = response.json();
//   console.log(result);
//   console.log("result");




    //Show the order result
    let orderResult = document.createElement("div");
    let productsList = orderedProducts.map(p => `<li>${p.name} - Quantity: ${p.quantity} - Price (per lb): $${p.price.toFixed(2)}</li>`).join("");
    orderResult.innerHTML = `
      <h2>Order Result</h2>
      <p>Customer ID: ${customerId}</p>
      <ul>
        ${productsList}
      </ul>
      <p>Total Amount: $${total.toFixed(2)}</p>
    `;
    document.body.appendChild(orderResult);



  }
  

  function searchFunction(){
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("productTable");
    tr = table.getElementsByTagName("tr");

    if (filter === "") {
      for (i = 0; i < tr.length; i++) {
        tr[i].style.backgroundColor = "";
      }
    } else {
      for (i = 0; i < tr.length; i++) {
        td1 = tr[i].getElementsByTagName("td")[0];
        td2 =tr[i].getElementsByTagName("td")[1];
        if (td1 && td2) {
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            if (new RegExp("^" + filter + "$").test(txtValue1.toUpperCase()) || 
                new RegExp("^" + filter + "$").test(txtValue2.toUpperCase())) {
              tr[i].style.backgroundColor = "yellow";
            } else {
              tr[i].style.backgroundColor = "";
            }
        }  
      }
    }

  }