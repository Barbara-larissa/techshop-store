document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("productDetail");
    const related = document.getElementById("relatedProducts");

    if (!container) return;

    // ========================================
    // PEGA ID DA URL
    // ========================================

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    // ========================================
    // PROCURA PRODUTO
    // ========================================

    const produto = products.find(p => p.id == id);

    if (!produto) {
        container.innerHTML = `
            <div class="loading-state">
                <h2>Produto não encontrado</h2>
            </div>
        `;
        return;
    }

    // ========================================
    // RENDER PRODUTO PRINCIPAL
    // ========================================

    container.innerHTML = `
        <div class="product-view">

            <div class="product-view__image">
                <img src="${produto.image}" alt="${produto.name}">
            </div>

            <div class="product-view__info">

                <span class="category">${produto.category}</span>

                <h1>${produto.name}</h1>

                <div class="rating">
                    ⭐ ${produto.rating} (${produto.reviews} avaliações)
                </div>

                <div class="price-area">
                    <span class="price">
                        ${formatCurrency(produto.price)}
                    </span>

                    ${
                        produto.originalPrice
                        ? `<span class="old-price">
                            ${formatCurrency(produto.originalPrice)}
                           </span>`
                        : ""
                    }
                </div>

                <p class="description">
                    ${produto.description}
                </p>

                <button
                    class="btn btn-primary add-cart"
                    data-name="${produto.name}"
                    data-price="${produto.price}"
                    data-image="${produto.image}"
                >
                    Adicionar ao Carrinho
                </button>

            </div>

        </div>
    `;

    // ========================================
    // PRODUTOS RELACIONADOS
    // ========================================

    let relacionados = products.filter(p =>
        p.id !== produto.id &&
        p.category === produto.category
    );

    if (relacionados.length === 0) {
        relacionados = products.filter(p => p.id !== produto.id);
    }

    relacionados = relacionados.slice(0, 4);

    related.innerHTML = relacionados.map(item => `
        <a href="product-detail.html?id=${item.id}" class="related-card">
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <span>${formatCurrency(item.price)}</span>
        </a>
    `).join("");

    // ========================================
    // BOTÃO CARRINHO COM FEEDBACK VISUAL
    // ========================================

    container.addEventListener("click", e => {

        const btn = e.target.closest(".add-cart");

        if (!btn) return;

        handleAddToCartWithFeedback(
            btn,
            btn.dataset.name,
            Number(btn.dataset.price),
            btn.dataset.image
        );

    });

});