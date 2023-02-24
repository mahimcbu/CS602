function addProduct(){
    window.location.href = '/admin/add';
}

function cancelAdd(){
    window.location.href = '/admin';
}

function cancelDelete(){
  window.location.href = '/admin';
}

async function cancelCheckout() {
  window.location.href = ('/customer');
}


function addToCart(event, price, stock, productId) {
  var quantity_avail = event.target.parentNode.parentNode.querySelector("td:nth-child(4)");
  var stockEl = event.target.parentNode.parentNode.querySelector("td:nth-child(6)");

  if (parseInt(quantity_avail.innerHTML) < stock && parseInt(quantity_avail.innerHTML) >= 0) {
      quantity_avail.innerHTML = parseInt(quantity_avail.innerHTML) + 1;
      stockEl.innerHTML = stock - parseInt(quantity_avail.innerHTML);

      let totalMoney = parseFloat(document.querySelector("#totalMoney").textContent) || 0;
      document.querySelector("#totalMoney").textContent = (totalMoney + (price)).toFixed(2);
  }


}




  function removeFromCart(event, price, stock, productId) {
    var quantity = event.target.parentNode.parentNode.querySelector("td:nth-child(4)");
    var stockEl = event.target.parentNode.parentNode.querySelector("td:nth-child(6)");
  
    if (parseInt(quantity.innerHTML) > 0 ) {
        quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
        stockEl.innerHTML = parseInt(stockEl.innerHTML) + 1;
        let totalMoney = parseFloat(document.querySelector("#totalMoney").textContent) || 0;
        document.querySelector("#totalMoney").textContent = (totalMoney - (price)).toFixed(2);
    }
  }
    function checkout() {
        let total = 0;
        let products = document.querySelectorAll(".main_rows");
        let orderedProducts = [];
        products.forEach(product => {
          let name = product.querySelector("td:nth-child(1)").innerHTML;
          let productId = product.querySelector("td:nth-child(7)").innerHTML;
          let quantity = parseInt(product.querySelector("td:nth-child(4)").innerHTML);
          let price = parseFloat(product.querySelector("td:nth-child(3)").innerHTML.substring(1));
          if (quantity > 0) {
            orderedProducts.push({ name, quantity, price, productId });
            total += quantity * price;
          }
        });
        let customerId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const formData = new URLSearchParams();
        formData.append('customerId', customerId);
        formData.append('total', total);
        formData.append('orderedProducts', JSON.stringify(orderedProducts));
        return fetch('/customer/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
        })
        .then(res => res.json())
        .then(data => {
          window.location.href = "/customer/order";
        })
        .catch(err => {
          console.log(err)
        });
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
