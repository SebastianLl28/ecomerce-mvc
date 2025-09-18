// Users Management JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Elementos del DOM
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const deleteModal = document.getElementById('deleteModal');
    const deleteForm = document.getElementById('deleteForm');
    const userToDeleteSpan = document.getElementById('userToDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    const closeModal = document.querySelector('.close');
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');

    // Auto-ocultar alertas después de 5 segundos
    if (successAlert) {
        setTimeout(() => hideAlert(successAlert), 5000);
    }

    if (errorAlert) {
        setTimeout(() => hideAlert(errorAlert), 5000);
    }

    // Manejar clicks en botones de eliminar
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            const userName = this.getAttribute('data-user-name');

            // Configurar modal
            userToDeleteSpan.textContent = userName;
            deleteForm.action = `/users/${userId}/delete`;

            // Mostrar modal
            showModal();
        });
    });

    // Cerrar modal
    function closeDeleteModal() {
        hideModal();
    }

    // Event listeners para cerrar modal
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeDeleteModal);
    }

    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(event) {
        if (event.target === deleteModal) {
            closeDeleteModal();
        }
    });

    // Cerrar modal con ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && deleteModal.style.display === 'block') {
            closeDeleteModal();
        }
    });

    // Funciones auxiliares
    function showModal() {
        deleteModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        deleteModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function hideAlert(alertElement) {
        alertElement.style.animation = 'slideUp 0.3s ease-out reverse';
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.remove();
            }
        }, 300);
    }

    // Confirmar navegación si hay cambios no guardados
    let hasUnsavedChanges = false;

    // Detectar cambios en formularios (si los hay)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                hasUnsavedChanges = true;
            });
        });

        form.addEventListener('submit', () => {
            hasUnsavedChanges = false;
        });
    });

    // Confirmar antes de salir si hay cambios
    window.addEventListener('beforeunload', function(event) {
        if (hasUnsavedChanges) {
            event.preventDefault();
            event.returnValue = '';
        }
    });

    // Filtrado de tabla (funcionalidad básica)
    function addTableFilter() {
        const filterContainer = document.querySelector('.header');
        const filterInput = document.createElement('input');
        filterInput.type = 'text';
        filterInput.placeholder = '🔍 Buscar usuarios...';
        filterInput.style.cssText = `
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-left: 20px;
        `;

        filterContainer.appendChild(filterInput);

        filterInput.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll('#usersTable tbody tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(filter)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Agregar filtro de búsqueda
    addTableFilter();

    // Tooltips simples
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.position = 'relative';
        });
    });

    console.log('Users management script loaded successfully');
});