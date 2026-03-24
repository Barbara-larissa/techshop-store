// ========================================
// APP.JS - TechShop (Versão Final Integrada)
// ========================================

function init() {
    console.log("🚀 TechShop: Sistemas iniciados");

    // 1. Inicializa Navegação e Carrinho
    initNavigation();
    initCartDrawer(); // Nova função para o seu HTML específico

    // 2. Inicializa o sistema de lógica do carrinho (se houver)
    if (typeof initCartHandlers === 'function') {
        initCartHandlers();
    }

    // 3. Expõe as funções para o HTML
    window.changeImage = changeImage;
    window.setColor = setColor;
    window.addToCart = handleAddToCart;
    // Expõe a abertura para o ícone do topo
    window.openCart = () => {
        const drawer = document.getElementById('cartDrawer');
        if (drawer) drawer.classList.add('active');
    };

    console.log("Sistemas Prontos! ✅");
}

// Adicione esta nova função logo abaixo da initNavigation()
function initCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const closeBtn = document.querySelector('.cart-drawer__close');
    const overlay = document.querySelector('.cart-drawer__overlay');
    const openBtn = document.querySelector('.header__cart-btn'); // Verifique se esta é a classe do seu ícone de carrinho

    if (drawer) {
        // Função para fechar
        const closeCart = () => {
            drawer.classList.remove('active');
        };

        // Função para abrir
        const openCart = () => {
            drawer.classList.add('active');
        };

        if (closeBtn) closeBtn.onclick = closeCart;
        if (overlay) overlay.onclick = closeCart;
        if (openBtn) openBtn.onclick = openCart;
    }
}








// ==========================================
// SISTEMA DE NAVEGAÇÃO (MENU HAMBÚRGUER)
// ==========================================

function initNavigation() {
    const menuBtn = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');
    const overlay = document.querySelector('.header__overlay');
    const menuLinks = document.querySelectorAll('.header__menu-link');

    if (menuBtn && nav) {
        // Função para abrir/fechar
        const toggleMenu = () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
            
            // Bloqueia o scroll do corpo quando o menu está aberto
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        };

        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        // Fecha ao clicar no overlay
        if (overlay) {
            overlay.addEventListener('click', toggleMenu);
        }

        // Fecha ao clicar em qualquer link (importante para SPAs ou âncoras)
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// ==========================================
// SISTEMA DE FOTOS (SETAS E CORES)
// ==========================================

// Função das setas (‹ e ›)
function changeImage(productId, direction) {
    // Busca todas as imagens do produto específico
    const images = Array.from(document.querySelectorAll(`[id^="${productId}-img-"]`));
    
    if (images.length === 0) {
        console.error("Nenhuma foto encontrada para:", productId);
        return;
    }

    // Acha qual foto está visível (sem a classe 'hidden')
    let currentIndex = images.findIndex(img => !img.classList.contains('hidden'));
    if (currentIndex === -1) currentIndex = 0;

    // Calcula o próximo índice (com loop infinito)
    const nextIndex = (currentIndex + direction + images.length) % images.length;

    // Usa a função setColor para aplicar a mudança
    setColor(productId, nextIndex);
}

// Função das bolinhas de cores e atualização de visibilidade
function setColor(productId, index) {
    const images = Array.from(document.querySelectorAll(`[id^="${productId}-img-"]`));
    const card = document.getElementById(`${productId}-img-0`)?.closest('.product-card');

    if (!images.length) return;

    // Esconde todas as imagens e mostra apenas a do índice selecionado
    images.forEach((img, i) => {
        if (i === index) {
            img.classList.remove('hidden');
        } else {
            img.classList.add('hidden');
        }
    });

    // Atualiza o estado visual das bolinhas de cores no card
    if (card) {
        const colorDots = card.querySelectorAll('.color');
        colorDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// ==========================================
// SISTEMA DE CARRINHO (PONTE)
// ==========================================

/**
 * Captura a imagem que está visível no momento e envia para o carrinho
 */
function handleAddToCart(name, price, defaultImg) {
    const cards = document.querySelectorAll('.product-card');
    let imageToSend = defaultImg;

    cards.forEach(card => {
        const cardName = card.querySelector('.product-card__name')?.innerText;
        if (cardName === name) {
            // Pega a imagem que NÃO está escondida no card específico
            const activeImg = card.querySelector('.product-card__image:not(.hidden)');
            if (activeImg) {
                imageToSend = activeImg.getAttribute('src');
            }
        }
    });

    // Verifica se a função do seu módulo de carrinho existe antes de chamar
    if (typeof addToCartModule === 'function') {
        addToCartModule(name, price, imageToSend);
    } else {
        console.warn("Módulo de carrinho não encontrado. Produto:", name);
    }
}

// ==========================================
// DISPARO DA INICIALIZAÇÃO
// ==========================================

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}


// 1. Onde os produtos ficarão guardados
let cart = [];

// 2. Função principal para adicionar
function addToCart(name, price, image) {
    // Verifica se o produto já está no carrinho
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Atualiza a interface e o contador
    updateCartUI();
}

// 3. Função que desenha o carrinho na tela
function updateCartUI() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotalValue = document.getElementById("cartTotalValue");
    const cartBadge = document.querySelector(".header__cart-badge");

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cart-empty-message">O carrinho está vazio</p>';
        cartTotalValue.innerText = "R$ 0,00";
        if (cartBadge) cartBadge.innerText = "0";
        return;
    }

    // Renderiza os itens
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item__img">
            <div class="cart-item__info">
                <h4 class="cart-item__name">${item.name}</h4>
                <p class="cart-item__price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="cart-item__remove">&times;</button>
        </div>
    `).join("");

    // Calcula o total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalValue.innerText = `R$ ${total.toFixed(2)}`;
    
    // Atualiza o número no ícone do header
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.innerText = totalItems;
    }
}

// 4. Função para remover itens
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}