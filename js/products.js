// ========================================
// PRODUTOS - Dados e funções auxiliares
// ========================================

const products = [
    {
        id: 1,
        name: "Notebook gamer",
        slug: "notebook-gamer",
        price: 299.90,
        originalPrice: 499.9,
        discount: 40,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
        category: "Eletrônicos",
        rating: 4.5,
        reviews: 128,
        inStock: true,
        featured: true,
        description: "Notebook gamer com processador i7, GPU dedicada e memória RAM suficiente para rodar os jogos mais exigentes.", // <-- Faltava a vírgula aqui
        specifications: {
            brand: "AudioTech",
            model: "AT-2000",
            color: "Preto",
            connectivity: "Bluetooth 5.0",
            battery: "30 horas",
        },
    },
    {
        id: 2,
        name: "Smart Watch Fitness Tracker",
        slug: "smartwatch-fitness",
        price: 599.90,
        originalPrice: 899.90,
        discount: 33,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        category: "Wearables",
        rating: 4.8,
        reviews: 256,
        inStock: true,
        featured: true,
        description: "Smartwatch com monitoramento de saúde 24/7, GPS integrado e resistente à água.",
        specifications: {
            brand: "FitPlus",
            model: "FP-500",
            color: "Preto/Prata",
            display: 'AMOLED 1.4"',
            battery: "7 dias",
        },
    },
    {
        id: 3,
        name: "Câmera DSLR Profissional",
        slug: "camera-dslr-pro",
        price: 3499.90,
        originalPrice: 4999.90,
        discount: 30,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80",
        category: "Fotografia",
        rating: 4.9,
        reviews: 89,
        inStock: true,
        featured: false,
        description: "Câmera DSLR com sensor full-frame, 45MP, gravação 4K e sistema dual pixel.",
        specifications: {
            brand: "PhotoPro",
            model: "PP-X100",
            sensor: "Full Frame 45MP",
            video: "4K 60fps",
            iso: "100-51200",
        },
    },
    {
        id: 4,
        name: "Notebook Gamer Ultra",
        slug: "notebook-gamer-ultra",
        price: 7999.9,
        originalPrice: 9999.9,
        discount: 20,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
        category: "Computadores",
        rating: 4.7,
        reviews: 142,
        inStock: true,
        featured: true,
        description: "Notebook gamer com RTX 4060, Intel i7 13ª geração, 16GB RAM e SSD 512GB.",
        specifications: {
            brand: "GameMax",
            processor: "Intel i7-13700H",
            gpu: "RTX 4060 8GB",
            ram: "16GB DDR5",
            storage: "512GB SSD NVMe",
        },
    },
    {
        id: 5,
        name: "Teclado Mecânico RGB",
        slug: "teclado-mecanico-rgb",
        price: 449.9,
        originalPrice: 699.9,
        discount: 36,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
        category: "Periféricos",
        rating: 4.6,
        reviews: 203,
        inStock: true,
        featured: false,
        description: "Teclado mecânico com switches customizáveis, iluminação RGB e estrutura em alumínio.",
        specifications: {
            brand: "KeyPro",
            switches: "Cherry MX Red",
            layout: "ABNT2",
            connection: "USB-C + Bluetooth",
            lighting: "RGB por tecla",
        },
    },
    {
        id: 6,
        name: "Mouse Gamer Sem Fio",
        slug: "mouse-gamer-wireless",
        price: 299.9,
        originalPrice: 449.9,
        discount: 33,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
        category: "Periféricos",
        rating: 4.4,
        reviews: 167,
        inStock: true,
        featured: false,
        description: "Mouse gamer sem fio com sensor óptico de alta precisão, 6 botões programáveis.",
        specifications: {
            brand: "ProGame",
            dpi: "25600 DPI",
            buttons: "6 programáveis",
            battery: "70 horas",
            weight: "85g",
        },
    },
    {
        id: 7,
        name: 'Monitor 4K Ultra HD 27"',
        slug: "monitor-4k-27",
        price: 1899.9,
        originalPrice: 2799.9,
        discount: 32,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
        category: "Monitores",
        rating: 4.8,
        reviews: 95,
        inStock: true,
        featured: true,
        description: "Monitor 4K IPS com 99% sRGB, HDR400 e taxa de atualização de 144Hz.",
        specifications: {
            brand: "ViewMax",
            size: "27 polegadas",
            resolution: "3840x2160 4K",
            refreshRate: "144Hz",
            panel: "IPS",
        },
    },
    {
        id: 8,
        name: "Cadeira Gamer Ergonômica",
        slug: "cadeira-gamer-ergonomica",
        price: 1299.9,
        originalPrice: 1899.9,
        discount: 32,
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80",
        category: "Móveis",
        rating: 4.5,
        reviews: 178,
        inStock: true,
        featured: false,
        description: "Cadeira gamer com apoio lombar ajustável, reclinável até 180° e base em aço.",
        specifications: {
            brand: "ComfortPro",
            material: "Couro sintético",
            weightCapacity: "150kg",
            adjustments: "4D",
            recline: "90°-180°",
        },
    },
    {
        id: 9,
        name: "SSD NVMe 1TB",
        slug: "ssd-nvme-1tb",
        price: 449.9,
        originalPrice: 699.9,
        discount: 36,
        image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&q=80",
        category: "Armazenamento",
        rating: 4.9,
        reviews: 312,
        inStock: true,
        featured: false,
        description: "SSD NVMe PCIe 4.0 com velocidades de leitura de até 7000MB/s.",
        specifications: {
            brand: "SpeedDrive",
            capacity: "1TB",
            interface: "PCIe 4.0 NVMe",
            readSpeed: "7000 MB/s",
            writeSpeed: "5000 MB/s",
        },
    },
    {
        id: 10,
        name: "Caixa de Som Bluetooth Portátil",
        slug: "caixa-som-bluetooth",
        price: 349.9,
        originalPrice: 549.9,
        discount: 36,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
        category: "Áudio",
        rating: 4.6,
        reviews: 224,
        inStock: true,
        featured: false,
        description: "Caixa de som Bluetooth resistente à água, 360° de áudio e 24h de bateria.",
        specifications: {
            brand: "SoundWave",
            power: "40W",
            battery: "24 horas",
            waterproof: "IPX7",
            connectivity: "Bluetooth 5.2",
        },
    },
    {
        id: 11,
        name: "Webcam Full HD 1080p",
        slug: "webcam-fullhd-1080p",
        price: 299.9,
        originalPrice: 449.9,
        discount: 33,
        image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&q=80",
        category: "Periféricos",
        rating: 4.3,
        reviews: 156,
        inStock: true,
        featured: false,
        description: "Webcam Full HD com foco automático, microfone duplo e correção de luz.",
        specifications: {
            brand: "ViewCam",
            resolution: "1920x1080",
            fps: "60fps",
            microphone: "Dual estéreo",
            connection: "USB-C",
        },
    },
    {
        id: 12,
        name: 'Tablet Android 10" Premium',
        slug: "tablet-android-10",
        price: 1499.9,
        originalPrice: 2199.9,
        discount: 32,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
        category: "Tablets",
        rating: 4.7,
        reviews: 189,
        inStock: true,
        featured: true,
        description: 'Tablet com tela AMOLED 10", processador octa-core, 128GB e caneta stylus.',
        specifications: {
            brand: "TabletMax",
            screen: '10.1" AMOLED',
            processor: "Snapdragon 870",
            storage: "128GB",
            battery: "8000mAh",
        },
    },
];

// ========================================
// FUNÇÕES AUXILIARES E RENDERIZAÇÃO
// ========================================

function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

function getCategories() {
    return [...new Set(products.map((p) => p.category))];
}


function renderizarGrid(lista) {
    const grid = document.getElementById('productsGrid');
    const contador = document.getElementById('productsCount');
    const noResults = document.getElementById('noResults');

    if (!grid) return;

    grid.innerHTML = "";

    const wishlist = JSON.parse(localStorage.getItem('techshop_wishlist')) || [];

    if (contador) {
        contador.innerText = `${lista.length} produtos encontrados`;
    }

    if (lista.length === 0) {
        if (noResults) noResults.classList.remove('hidden');
        return;
    }

    if (noResults) noResults.classList.add('hidden');

    lista.forEach(produto => {
        const isFavorito = wishlist.some(item => item.id == produto.id);
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
         <div class="product-card__image-container">

    <a href="product-detail.html?id=${produto.id}">
        <img 
            src="${produto.image}" 
            alt="${produto.name}" 
            class="product-card__image"
        >
    </a>

    <div class="product-card__quick-view">
        <button 
            class="btn btn-white open-product-modal"
            data-id="${produto.id}">
            Ver Detalhes
        </button>
    </div>

    ${produto.discount
        ? `<span class="product-card__badge">-${produto.discount}%</span>`
        : ''
    }

</div>

        <div class="product-card__content">
            <span class="product-card__category">
                ${produto.category}
            </span>

            <h3 class="product-card__name"> ${produto.name}
            </h3>

            <div class="product-card__rating">
                <span>⭐ ${produto.rating}</span>
                <span class="product-card__reviews">
                    (${produto.reviews})
                </span>
            </div>

            <div class="product-card__price-wrapper"> <span class="product-card__price">
                    ${formatCurrency(produto.price)}
                </span>

                ${produto.originalPrice
                ? `
                    <span class="product-card__original-price"> ${formatCurrency(produto.originalPrice)}
                    </span>
                    `
                : ''
            }
            </div>
        </div>

        <div class="product-card__footer">
          <button
         class="product-card__btn btn btn-primary"
         data-name="${produto.name}"
         data-price="${produto.price}"
           data-image="${produto.image}"
        >
         <i class="fa-solid fa-cart-shopping btn-icon"></i>
        <span class="btn-text">Adicionar ao Carrinho</span>
          </button>
          
            <button 
                class="product-card__favorite ${isFavorito ? 'active' : ''}" 
                data-id="${produto.id}" 
                aria-label="Favoritar"
            >
                <i class="${isFavorito ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
        </div>
    `;

        grid.appendChild(card);
    });
}




// Aguarda o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('productsGrid');

    if (grid) {
        grid.addEventListener('click', (e) => {
            // Verifica se clicou no botão de favorito ou no ícone dentro dele
            const favBtn = e.target.closest('.product-card__favorite');

            if (favBtn) {
                e.preventDefault();
                const id = favBtn.dataset.id;
                toggleWishlist(id, favBtn);
            }
        });
    }
});


document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.product-card__wishlist-btn');

    if (favBtn) {
        const productId = favBtn.dataset.id;
        const card = favBtn.closest('.product-card');

        const produto = {
            id: productId,
            name: card.querySelector('.product-card__title').innerText,
            price: card.querySelector('.product-card__price').innerText,
            image: card.querySelector('.product-card__image').src,
            category: card.querySelector('.product-card__category').innerText
        };

        toggleWishlist(produto, favBtn);
    }
});


function toggleWishlist(id, btn) {
    let wishlist = JSON.parse(localStorage.getItem('techshop_wishlist')) || [];

    const index = wishlist.findIndex(item => item.id == id);

    const icon = btn.querySelector('i');

    if (index === -1) {

        const produto = products.find(p => p.id == id);

        if (produto) {
            wishlist.push(produto);
            btn.classList.add('active');

            if (icon) {
                icon.className = 'fa-solid fa-heart';
            }
        }

    } else {

        wishlist.splice(index, 1);
        btn.classList.remove('active');

        if (icon) {
            icon.className = 'fa-regular fa-heart';
        }
    }

    localStorage.setItem('techshop_wishlist', JSON.stringify(wishlist));

    if (typeof updateWishlistBadge === 'function') {
        updateWishlistBadge();
    }
}


function handleAddToCartWithFeedback(button, name, price, image) {
    addToCart(name, price, image);

    const isMobile = window.innerWidth <= 1024;

    button.classList.remove("btn-primary");
    button.classList.add("btn-success");
    button.disabled = true;

    if (isMobile) {
        button.innerHTML = `<i class="fa-solid fa-check"></i>`;
    } else {
        button.innerHTML = `<i class="fa-solid fa-check"></i> Adicionado`;
    }

    setTimeout(() => {
        button.classList.remove("btn-success");
        button.classList.add("btn-primary");
        button.disabled = false;

        button.innerHTML = `
            <i class="fa-solid fa-cart-shopping btn-icon"></i>
            <span class="btn-text">Adicionar ao Carrinho</span>
        `;
    }, 2000);
}


// ========================================
// LÓGICA DE FILTROS E BUSCA
// ========================================

function carregarCategorias() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;

    const categoriasBase = getCategories();
    const categorias = ["Todos", ...categoriasBase];

    container.innerHTML = categorias.map(cat => {
        // Esta linha faz a mágica: ela filtra o array 'products' 
        // e conta quantos itens existem para cada categoria
        const contagem = cat === "Todos"
            ? products.length
            : products.filter(p => p.category === cat).length;

        return `
            <label class="filter-option">
                <div class="filter-option__wrapper">
                    <input type="radio" name="category" value="${cat}" ${cat === "Todos" ? "checked" : ""}>
                    <span class="filter-option__text">${cat}</span>
                </div>
                <span class="filter-option__count">(${contagem})</span>
            </label>
        `;
    }).join('');

    container.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', aplicarTodosOsFiltros);
    });
}

function aplicarTodosOsFiltros() {
    const termoBusca = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const categoriaSelecionada = document.querySelector('input[name="category"]:checked')?.value || "Todos";
    const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;

    const produtosFiltrados = products.filter(produto => {
        const matchesBusca = produto.name.toLowerCase().includes(termoBusca);
        const matchesCategoria = categoriaSelecionada === "Todos" || produto.category === categoriaSelecionada;
        const matchesPreco = produto.price >= minPrice && produto.price <= maxPrice;

        return matchesBusca && matchesCategoria && matchesPreco;
    });

    renderizarGrid(produtosFiltrados);
}

// ========================================
// INICIALIZAÇÃO SEGURA (CORRIGIDA)
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.getElementById('productsGrid');

    // 🔒 Se não for página de produtos, NÃO executa nada
    if (!grid) return;

    carregarCategorias();
    renderizarGrid(products);

    const inputBusca = document.getElementById('searchInput');

    if (inputBusca) {
        inputBusca.addEventListener('input', aplicarTodosOsFiltros);
    }

    document.getElementById('applyPriceFilter')?.addEventListener('click', aplicarTodosOsFiltros);

    document.getElementById('clearFilters')?.addEventListener('click', () => {
        if (inputBusca) inputBusca.value = "";

        const min = document.getElementById('minPrice');
        const max = document.getElementById('maxPrice');

        if (min) min.value = "";
        if (max) max.value = "";

        const radio = document.querySelector('input[name="category"][value="Todos"]');
        if (radio) radio.checked = true;

        renderizarGrid(products);
    });




    const gridContainer = document.getElementById('productsGrid');
    if (gridContainer) {
        gridContainer.addEventListener('click', (e) => {
            // Verifica se clicou no botão ou no ícone dentro dele
            const btn = e.target.closest('.product-card__btn');

            if (btn) {
                const name = btn.getAttribute('data-name');
                const price = parseFloat(btn.getAttribute('data-price'));
                const image = btn.getAttribute('data-image');

                // Chama a função de feedback que você já tem no arquivo
                handleAddToCartWithFeedback(btn, name, price, image);
            }
        });
    }



    // ========================================
    // LOGICA DA SIDEBAR MOBILE (ABRIR/FECHAR)
    // ========================================
    const btnFilter = document.getElementById("toggleFilters");
    const btnClose = document.getElementById("closeFilters");
    const sidebar = document.querySelector(".products-sidebar");

    // Função fechar
    const fecharSidebar = () => {
        sidebar.classList.remove("active");
        document.body.style.overflow = "";
    };

    // abrir
    if (btnFilter && sidebar) {
        btnFilter.addEventListener("click", () => {
            sidebar.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }

    // fechar no X
    if (btnClose) {
        btnClose.addEventListener("click", (e) => {
            e.preventDefault();
            fecharSidebar();
        });
    }

});





let currentScroll = 0;

// ========================================
// 🔥 CARROSSEL INDEX (CORRIGIDO)
// ========================================

let carouselIndex = 0;

function moveCarousel(direction) {
    const grid = document.getElementById('featuredProducts');
    if (!grid) return;

    const cards = grid.querySelectorAll('.product-card');
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth + 20;

    let visibleCards = 1;
    if (window.innerWidth >= 1024) visibleCards = 3;
    else if (window.innerWidth >= 768) visibleCards = 2;

    const maxIndex = Math.max(0, cards.length - visibleCards);

    carouselIndex += direction;

    if (carouselIndex < 0) carouselIndex = 0;
    if (carouselIndex > maxIndex) carouselIndex = maxIndex;

    grid.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
}
// ========================================
// BOTÃO FLUTUANTE - VER DETALHES
// ========================================

document.addEventListener("click", function (e) {

    const btn = e.target.closest(".open-product-modal");

    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const id = btn.dataset.id;

    window.location.href = `product-detail.html?id=${id}`;

});