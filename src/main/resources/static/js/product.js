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
            const productPrice = this.getAttribute("data-price") || "0";

            // Crear FormData para enviar como form POST
            const formData = new FormData();
            formData.append("productId", productId);
            formData.append("quantity", 1);

            // Usar fetch con FormData para que coincida con tu CartController
            fetch("/cart/add-ajax", {
                method: "POST",
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al añadir al carrito");
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        toastr.success(`${productName} añadido al carrito 🛒`, "Éxito", {
                            closeButton: true,
                            progressBar: true,
                            positionClass: "toast-top-right",
                            timeOut: 3000
                        });

                        // Actualizar contador del carrito
                        updateCartCounter(data.cartItemCount);

                        console.log("Producto añadido exitosamente:", data);
                    } else {
                        toastr.error(data.message || "No se pudo añadir al carrito", "Error");
                    }
                })
                .catch(err => {
                    toastr.error("No se pudo añadir al carrito", "Error");
                    console.error("Error:", err);
                });
        });
    });

    // Función para actualizar contador del carrito
    function updateCartCounter(count = null) {
        if (count !== null) {
            // Si tenemos el count del response, usarlo directamente
            const cartCountElement = document.getElementById("cart-count");
            if (cartCountElement) {
                cartCountElement.textContent = count;
            }
        } else {
            // Si no, hacer una petición para obtenerlo
            fetch("/cart/count")
                .then(response => response.text())
                .then(count => {
                    const cartCountElement = document.getElementById("cart-count");
                    if (cartCountElement) {
                        cartCountElement.textContent = count;
                    }
                })
                .catch(err => console.error("Error obteniendo count del carrito:", err));
        }
    }

    // Actualizar contador al cargar la página
    updateCartCounter();
});