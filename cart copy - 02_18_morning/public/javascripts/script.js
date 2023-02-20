function addProduct(){
    window.location.href = '/admin/add';
}

function cancelAdd(){
    window.location.href = '/admin';
}

function cancelDelete(){
  window.location.href = '/admin';
}

let originalStocks = {};
let originalTotalMoney = 0;  // Add a variable to store the original total money


  window.onload = function() {
    if (window.location.href.includes('/customer')) {
    const rows = document.querySelectorAll('.main_rows');
    for (let i = 0; i < rows.length; i++) {
      const productId = rows[i].querySelector("td:last-child").innerHTML;
      const stockEl = rows[i].querySelector("td:nth-child(6)");
      const quantityEl = rows[i].querySelector("td:nth-child(4)");
      originalStocks[productId] = { stock: stockEl.innerHTML, quantity: quantityEl.innerHTML };
    }
    if (document.querySelector('.total_money')) {
      originalTotalMoney = parseFloat(document.querySelector('.total_money').innerHTML);
    }
  }
};

async function cancelCheckout() {
  const rows = document.querySelectorAll('.main_rows');
  if (originalStocks && Object.keys(originalStocks).length) {
    const promises = Object.keys(originalStocks).map(productId => {
      const originalStock = originalStocks[productId].stock;
      const originalQuantity = originalStocks[productId].quantity;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].querySelector("td:last-child").innerHTML === productId) {
          const stockEl = rows[i].querySelector("td:nth-child(6)");
          const quantity_in_cart = rows[i].querySelector("td:nth-child(4)");
          quantity_in_cart.innerHTML = originalQuantity;
          stockEl.innerHTML = originalStock;
        }
      }
      // Update the product quantity in the product database with the original stock value
      const adminFormData = new URLSearchParams();
      adminFormData.append('id', productId);
      adminFormData.append('quantity', originalStock);
      return fetch('/customer/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: adminFormData.toString()
      })
      .then(res => res.json())
      .then(data => {
        console.log("Quantity updated in admin panel");
      })
      .catch(err => {
        console.log(err);
      });
    });

    document.querySelector('.total_money').innerHTML = originalTotalMoney; // set the total money back to original value
    await Promise.all(promises); // wait for all updates to finish
    // document.querySelector('.total_money').innerHTML = originalTotalMoney; // set the total money back to the original value
    document.location.reload(); // reload the page to show the updated stock and total money
  } else {
    document.location.reload(); // reload the page to show the updated stock and total money
  }
}



// let hasCheckedOut = false;
// let originalQuantity;
// let originalStock;



// async function addToCart(event, price, stock, productId) {
//   var quantity_avail = event.target.parentNode.parentNode.querySelector("td:nth-child(4)");
//   var stockEl = event.target.parentNode.parentNode.querySelector("td:nth-child(6)");

//   if (parseInt(quantity_avail.innerHTML) < stock && parseInt(quantity_avail.innerHTML) >= 0) {
//     quantity_avail.innerHTML = parseInt(quantity_avail.innerHTML) + 1;
//     stockEl.innerHTML = stock - parseInt(quantity_avail.innerHTML);

//     originalQuantity = quantity_avail.innerHTML;
//     originalStock = stockEl.innerHTML;

//     let totalMoney = parseFloat(document.querySelector("#totalMoney").textContent) || 0;
//     document.querySelector("#totalMoney").textContent = (totalMoney + (price)).toFixed(2);

//     const adminFormData = new URLSearchParams();
//     adminFormData.append('id', productId);
//     adminFormData.append('quantity', stockEl.innerHTML);

//     // return a promise that resolves when the quantity is updated in the database
//     return fetch('/customer/edit', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: adminFormData.toString()
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log("Quantity updated in admin panel");
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }
// }


// async function removeFromCart(event, price, stock, productId) {
//   var quantity = event.target.parentNode.parentNode.querySelector("td:nth-child(4)");
//   var stockEl = event.target.parentNode.parentNode.querySelector("td:nth-child(6)");

//   if (parseInt(quantity.innerHTML) > 0 ) {
//     quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
//     stockEl.innerHTML = parseInt(stockEl.innerHTML) + 1;
//     originalQuantity = quantity.innerHTML;
//     originalStock = stockEl.innerHTML;

//     let totalMoney = parseFloat(document.querySelector("#totalMoney").textContent) || 0;
//     document.querySelector("#totalMoney").textContent = (totalMoney - (price)).toFixed(2);

//       const formData = new URLSearchParams();
//       formData.append('id', productId);
//       formData.append('quantity', stockEl.innerHTML);
//      await fetch('/customer/edit', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//           },
//           body: formData.toString()
//       })
//       .then(res => res.json())
//       .then(data => {
//           console.log("Quantity updated in product database");
//       })
//       .catch(err => {
//           console.log(err);
//       });
//       // await Promise.all(promises); // wait for all updates to finish

//   }
// }

// async function checkout() {
//   let promises = [];
//   let total = 0;
//   let products = document.querySelectorAll(".main_rows");
//   let orderedProducts = [];
//   products.forEach(product => {
//     let name = product.querySelector("td:nth-child(1)").innerHTML;
//     let productId = product.querySelector("td:nth-child(7)").innerHTML;
//     let quantity = parseInt(product.querySelector("td:nth-child(4)").innerHTML);
//     let price = parseFloat(product.querySelector("td:nth-child(3)").innerHTML.substring(1));
//     if (quantity > 0) {
//       orderedProducts.push({ name, quantity, price, productId });
//       total += quantity * price;

//       // add the promise returned by addToCart to the promises array
//       promises.push(addToCart(event, price, stock, productId));
//     }
//   });

//   // wait for all promises to resolve before executing checkout process
//   await Promise.all(promises);

//   let customerId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//   const formData = new URLSearchParams();
//   formData.append('customerId', customerId);
//   formData.append('total', total);
//   formData.append('orderedProducts', JSON.stringify(orderedProducts));
//   return await fetch('/customer/order', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: formData.toString()
//   })
//   .then(res => res.json())
//   .then(data => {
//     window.location.href = "/customer/order";
//     hasCheckedOut = true;
//   })
//   .catch(err => {
//     console.log(err)
//   });
// }







function addToCart(event, price, stock, productId) {
  var quantity_avail = event.target.parentNode.parentNode.querySelector("td:nth-child(4)");
  var stockEl = event.target.parentNode.parentNode.querySelector("td:nth-child(6)");

  if (parseInt(quantity_avail.innerHTML) < stock && parseInt(quantity_avail.innerHTML) >= 0) {
      quantity_avail.innerHTML = parseInt(quantity_avail.innerHTML) + 1;
      stockEl.innerHTML = stock - parseInt(quantity_avail.innerHTML);

      const adminFormData = new URLSearchParams();
      adminFormData.append('id', productId);
      adminFormData.append('quantity', stockEl.innerHTML);
      fetch('/customer/edit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: adminFormData.toString()
      })
      .then(res => res.json())
      .then(data => {
          console.log("Quantity updated in admin panel");
      })
      .catch(err => {
          console.log(err);
      });
  }

  let totalMoney = parseFloat(document.querySelector("#totalMoney").textContent) || 0;
  document.querySelector("#totalMoney").textContent = (totalMoney + (price)).toFixed(2);
}




  function removeFromCart(event, price, stock, productId) {
    var quantity = event.target.parentNode.parentNode.querySelector("td:nth-child(4)");
    var stockEl = event.target.parentNode.parentNode.querySelector("td:nth-child(6)");
  
    if (parseInt(quantity.innerHTML) > 0 ) {
        quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
        stockEl.innerHTML = parseInt(stockEl.innerHTML) + 1;
        
        const adminFormData = new URLSearchParams();
      adminFormData.append('id', productId);
      adminFormData.append('quantity', stockEl.innerHTML);
      fetch('/customer/edit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: adminFormData.toString()
      })
      .then(res => res.json())
      .then(data => {
          console.log("Quantity updated in admin panel");
      })
      .catch(err => {
          console.log(err);
      });

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
          // handle success

          window.location.href = "/customer/order";
        })
        .catch(err => {
          console.log(err)
          // handle error
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
