document.addEventListener('DOMContentLoaded', function() {
    const gallonsInput = document.getElementById('gallonsRequested');
    const dateInput = document.getElementById('dateRequested');
    const totalPriceInput = document.getElementById('totalPrice');
  
    // Update total price when gallons requested input changes
    gallonsInput.addEventListener('input', function() {
      updateTotalPrice();
    });
  
    // Update total price when date requested input changes
    dateInput.addEventListener('input', function() {
      updateTotalPrice();
    });
  
    // Function to update total price
    function updateTotalPrice() {
      const gallonsRequested = parseFloat(gallonsInput.value);
      const totalPrice = gallonsRequested * 0.50;
      totalPriceInput.value = '$' + totalPrice.toFixed(2);
    }
  
    // Initialize total price on page load
    updateTotalPrice();
  });
  
