document.addEventListener('DOMContentLoaded', () => {
   // Select all increment and decrement buttons
   const incrementButtons = document.querySelectorAll('.increment');
   const decrementButtons = document.querySelectorAll('.decrement');

   incrementButtons.forEach(button => {
       button.addEventListener('click', () => {
           const productId = button.getAttribute('data-product-id');
           const quantityInput = document.getElementById(`quantity-${productId}`);
           let currentQuantity = parseInt(quantityInput.value);
           quantityInput.value = currentQuantity + 1;
       });
   });

   decrementButtons.forEach(button => {
       button.addEventListener('click', () => {
           const productId = button.getAttribute('data-product-id');
           const quantityInput = document.getElementById(`quantity-${productId}`);
           let currentQuantity = parseInt(quantityInput.value);
           if (currentQuantity > 1) {
               quantityInput.value = currentQuantity - 1;
           }
       });
   });

   // Select all remove product buttons after DOM content is loaded
   const removeButtons = document.querySelectorAll('.remove-product');

   // Añadir un evento a cada botón de eliminar
   removeButtons.forEach(button => {
       button.addEventListener('click', function() {
           // Eliminar el producto
           const productDiv = this.closest('.rounded-lg'); // Cambia el selector a .rounded-lg
           if (productDiv) {
               productDiv.remove();
           }
       });
   });
});
