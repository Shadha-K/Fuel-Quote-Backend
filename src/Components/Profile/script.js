document.addEventListener('DOMContentLoaded', function() {
    const ordersTable = document.getElementById('recentOrders');
    const noOrdersMessage = document.getElementById('noOrdersMessage');
  
    // Check if the user has made any orders
    // For demo purpose, let's assume orders is an empty array
    const orders = [];
  
    if (orders.length === 0) {
      // Hide orders table and show message
      ordersTable.style.display = 'none';
      noOrdersMessage.style.display = 'block';
    } else {
      // Show orders table and hide message
      ordersTable.style.display = 'block';
      noOrdersMessage.style.display = 'none';
      // Populate orders table with data from orders array
      const orderRows = document.getElementById('orderRows');
      orders.forEach(function(order) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.gallonsRequested}</td>
          <td>${order.dateRequested}</td>
          <td>$${order.pricePerGallon.toFixed(2)}</td>
          <td>$${order.totalAmount.toFixed(2)}</td>
        `;
        orderRows.appendChild(row);
      });
    }
  });
  
  function redirectToFuelQuoteForm() {
    window.location.href = "fuel_quote_form.html";
  }
  
  function updateMyInformation() {
    // Code to redirect to the update information page goes here
    alert("Redirecting to update information page...");
  }
  