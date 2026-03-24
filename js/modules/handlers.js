// ========================================
// HANDLERS.JS - Versão Otimizada
// ========================================

function initCartHandlers() {
    const cartBtn = document.querySelector("[data-cart-btn]");
    const drawer = document.getElementById("cartDrawer");
    const closeBtn = document.querySelector(".cart-drawer__close");
    const overlay = document.querySelector(".cart-drawer__overlay");

    // 1. Abrir Carrinho manualmente pelo ícone do Header
    if (cartBtn && drawer) {
        cartBtn.addEventListener("click", (e) => {
            e.preventDefault();
            drawer.classList.add("active");
        });
    }

    // 2. Fechar Carrinho
    const closeCart = () => drawer && drawer.classList.remove("active");
    if (closeBtn) closeBtn.onclick = closeCart;
    if (overlay) overlay.onclick = closeCart;

    // 3. Lógica de Adicionar ao Carrinho
  // No seu handlers.js, procure a parte do "click" e deixe assim:
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".product-card__btn");

    if (btn) {
        // NÃO use e.preventDefault() aqui para não travar o onclick do HTML
        
        // 1. Efeito visual no botão
        btn.disabled = true;
        const originalText = btn.innerHTML;
        btn.innerHTML = "✓ Adicionado!";

        // 2. Mostrar o modal de sucesso (opcional)
        if (window.modalSystem) {
            const productName = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || "Produto";
            window.modalSystem.success({
                title: "Adicionado!",
                content: `<strong>${productName}</strong> foi para o carrinho.`,
                actions: [{ label: "Continuar", variant: "primary", onClick: () => {} }]
            });
        }

        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }, 1500);
    }
});
}

// ... manter as outras funções (initLoginHandler, renderFeaturedProducts) iguais ...

document.addEventListener("DOMContentLoaded", () => {
    initCartHandlers();
    initLoginHandler();
    renderFeaturedProducts();
});