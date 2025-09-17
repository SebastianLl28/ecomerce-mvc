document.addEventListener("DOMContentLoaded", function () {
  console.log("Product.js cargado");

  if (typeof toastr === "undefined") {
    console.error("toastr no está cargado; revisa el orden de los <script>.");
    return;
  }

  const buttons = document.querySelectorAll(".btn-add-cart");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      console.log("Botón de añadir al carrito clickeado");
      const productId = this.getAttribute("data-id");
      const productName = this.getAttribute("data-name") || "Producto";

      fetch(`/cart/add/${productId}`, { method: "POST" })
      .then(response => {
        if (!response.ok) throw new Error("Error al añadir al carrito");
        return response.text();
      })
      .then(message => {
        toastr.success(`${productName} añadido al carrito 🛒`, "Éxito", {
          closeButton: true,
          progressBar: true,
          positionClass: "toast-top-right",
          timeOut: 3000
        });
        console.log("Respuesta del servidor:", message);
      })
      .catch(err => {
        toastr.error("No se pudo añadir al carrito", "Error");
        console.error(err);
      });
    });
  });
});
