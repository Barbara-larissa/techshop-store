// ========================================
// HANDLERS.JS - Versão Robusta
// ========================================

function initCartHandlers() {
    const drawer = document.getElementById("cartDrawer");
    const closeBtn = document.querySelector(".cart-drawer__close");
    const overlay = document.querySelector(".cart-drawer__overlay");
    const cartBtn = document.querySelector("[data-cart-btn]");

    // Abrir manualmente pelo ícone do topo
    if (cartBtn && drawer) {
      cartBtn.onclick = (e) => {
    e.preventDefault();

    // 🔥 ATUALIZA O CARRINHO ANTES DE ABRIR
    if (typeof updateCartUI === "function") {
        updateCartUI();
    }

    drawer.classList.add("active");
    document.body.classList.add("modal-open");
};
    }

    // Fechar carrinho
    const closeCart = () => {
        if (drawer) {
            drawer.classList.remove("active");
            document.body.classList.remove("modal-open");
        }
    };

    if (closeBtn) closeBtn.onclick = closeCart;
    if (overlay) overlay.onclick = closeCart;

    // Lógica do botão de adicionar (Delegação de Evento)
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".product-card__btn");
        
        if (btn) {
            // 1. CAPTURAR OS DADOS DO BOTÃO (Data Attributes)
            const name = btn.dataset.name;
            const price = btn.dataset.price;
            const image = btn.dataset.image;

            console.log("Tentando adicionar:", name); // Para debug no F12

            // 2. CHAMAR A FUNÇÃO DE ADICIONAR (Tentando os dois nomes possíveis)
            if (typeof window.handleAddToCart === "function") {
                window.handleAddToCart(name, price, image);
            } else if (typeof window.addToCart === "function") {
                window.addToCart(name, price, image);
            } else {
                console.error("ERRO: Nenhuma função de adicionar encontrada no app.js!");
            }

            // 3. EFEITO VISUAL NO BOTÃO
            const originalText = btn.innerHTML;
            btn.innerHTML = "✓ Adicionado!";
            btn.style.backgroundColor = "#28a745";
            btn.style.color = "#fff";

            // 4. ABRIR A GAVETA
            if (drawer) {
                setTimeout(() => {
                    drawer.classList.add("active");
                    document.body.classList.add("modal-open");
                }, 200);
            }

            // Resetar o botão após 1.5s
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = "";
                btn.style.color = "";
            }, 1500);
        }
    });
}

// Inicialização única e segura
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCartHandlers);
} else {
    initCartHandlers();
}