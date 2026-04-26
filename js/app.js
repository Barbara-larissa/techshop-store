﻿// ========================================
// APP.JS - TechShop (Versão Final Consolidada)
// ========================================

// 1. CHAVE ÚNICA - Use exatamente esta em todos os arquivos do projeto
const CART_STORAGE_KEY = 'techShopCart';

// 2. ESTADO GLOBAL - Inicializa lendo do LocalStorage
window.cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
function isLogged() {
    return localStorage.getItem("logged") === "true";
}
/**
 * INICIALIZAÇÃO
 */
function init() {
    console.log("🚀 TechShop: Sistemas iniciados");

    initNavigation();
    initTestimonials();

    // Atualiza o visual em qualquer página que o script estiver rodando
    atualizarContadorVisual();

    // Tenta renderizar a lista de produtos (se estiver na cart.html)
    updateCartUI();
    new TechShopCheckout();
        controlarPerfilHeader(); 
    // Expõe para o HTML
    window.changeImage = changeImage;
    window.setColor = setColor;
    window.addToCart = handleAddToCart;
    window.removeFromCart = removeFromCart;

    window.alterarQuantidade = alterarQuantidade;


    const btnClear = document.getElementById("clearCart");

    if (btnClear) {
        btnClear.addEventListener("click", () => {
            window.cart = [];
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(window.cart));
            atualizarContadorVisual();
            updateCartUI();
        });
    }

    const btnCheckout = document.getElementById("btnCheckout");

    if (btnCheckout) {
        btnCheckout.addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
    }


}

function controlarPerfilHeader() {
    const profileItem = document.getElementById("profileMenuItem");

    if (!profileItem) return;

    profileItem.style.display = isLogged() ? "block" : "none";
}


document.addEventListener('DOMContentLoaded', init);

// ==========================
// LÓGICA DO CARRINHO
// ==========================

function handleAddToCart(name, price, image) {
    // 1. Garante que temos os dados mais recentes do disco antes de alterar
    window.cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

    const cleanPrice = typeof price === 'string'
        ? parseFloat(price.replace(',', '.'))
        : parseFloat(price);

    const existingItem = window.cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        window.cart.push({
            name: name,
            price: cleanPrice,
            image: image,
            quantity: 1
        });
    }

    // 2. SALVA NO DISCO (Crucial para a cart.html enxergar)
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(window.cart));

    // 3. ATUALIZA A INTERFACE
    atualizarContadorVisual();

    // Se a pessoa estiver na página de carrinho e clicar em algo, atualiza a lista
    updateCartUI();

    console.log("Item salvo no LocalStorage com a chave:", CART_STORAGE_KEY);
}



function atualizarContadorVisual() {
    // Procura o elemento 198 da sua imagem
    const badge = document.querySelector('.header__cart-badge') || document.querySelector('.cart-count');

    if (badge) {
        const totalItems = window.cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
    }
}




function updateCartUI() {
    const container = document.getElementById("cartItems");
    if (!container) return;

    // Atualiza carrinho
    window.cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

    // Carrinho vazio
    if (window.cart.length === 0) {
        container.innerHTML = '<p class="cart-empty-message">O seu carrinho está vazio.</p>';
        updateValues(0);
        return;
    }

    // Renderiza itens
    container.innerHTML = window.cart.map((item, index) => `
        <div class="cart-item">
            <img 
                src="${item.image || '../img/placeholder.png'}" 
                alt="${item.name}" 
                class="cart-item__img"
            >

            <div class="cart-item__info">
                <h4>${item.name}</h4>
             <div style="margin:5px 0;">
                <small style="color: #666;">Unitário: R$ ${Number(item.price).toFixed(2).replace('.', ',')}</small><br>
              <strong style="color: #333;">Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</strong>
            </div>

                <!-- 🔥 QUANTIDADE -->
                <div class="cart-qtd-wrapper">
                    <span class="cart-qtd-label">Quantidade</span>

                    <div class="cart-qtd-box">
                        <button onclick="alterarQuantidade(${index}, -1)">-</button>
                        
                        <input type="text" value="${item.quantity}" readonly>
                        
                        <button onclick="alterarQuantidade(${index}, 1)">+</button>
                    </div>
                </div>
            </div>

            <!-- REMOVER -->
            <button onclick="removeFromCart(${index})" class="cart-item__remove">
                &times;
            </button>
        </div>
    `).join('');

    // Atualiza total
    // Atualiza total com garantia de tipo numérico
    const total = window.cart.reduce((sum, item) => {
        const preco = Number(item.price) || 0;
        const qtd = Number(item.quantity) || 0;
        return sum + (preco * qtd);
    }, 0);

    updateValues(total);
}

function updateValues(total) {
    const totalDisplay = document.getElementById("totalValue");
    const subtotalDisplay = document.getElementById("subtotal");
    const itemsCount = document.getElementById("itemsCount");

    // Formata o número para R$ 0.000,00 automaticamente
    const formatado = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    if (totalDisplay) totalDisplay.innerText = formatado;
    if (subtotalDisplay) subtotalDisplay.innerText = formatado;

    if (itemsCount) {
        const totalItems = window.cart.reduce((sum, item) => sum + item.quantity, 0);
        itemsCount.innerText = `${totalItems} itens`;
    }
}

function removeFromCart(index) {
    window.cart.splice(index, 1);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(window.cart));
    atualizarContadorVisual();
    updateCartUI();
}

function alterarQuantidade(index, valor) {
    window.cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

    if (!window.cart[index]) return;

    window.cart[index].quantity += valor;

    if (window.cart[index].quantity <= 0) {
        window.cart.splice(index, 1);
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(window.cart));

    atualizarContadorVisual();
    updateCartUI();
}

// ==========================
// RESTANTE DAS FUNÇÕES (UI)
// ==========================

function initNavigation() {
    const menuBtn = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');
    if (menuBtn && nav) {
        menuBtn.onclick = () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        };
    }
}

function changeImage(productId, direction) {
    const images = Array.from(document.querySelectorAll(`[id^="${productId}-img-"]`));
    if (!images.length) return;
    let currentIndex = images.findIndex(img => !img.classList.contains('hidden'));
    const nextIndex = (currentIndex + direction + images.length) % images.length;
    setColor(productId, nextIndex);
}

function setColor(productId, index) {
    const images = Array.from(document.querySelectorAll(`[id^="${productId}-img-"]`));
    if (!images.length) return;
    images.forEach((img, i) => img.classList.toggle('hidden', i !== index));
}


function initTestimonials() {
    // Sua lógica de depoimentos aqui...
}

class TechShopCheckout {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

        if (document.getElementById('cep')) {
            this.init();
        }
    }

    init() {
        this.renderItems();
        this.setupCepLookup();
        this.setupEventListeners();
        this.validate();
    }

    setupCepLookup() {
        const cepInput = document.getElementById('cep');
        if (!cepInput) return;

        cepInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/^(\d{5})(\d)/, "$1-$2");
            e.target.value = value;

            if (/^\d{5}-\d{3}$/.test(value)) {
                this.fetchAddress(value);
            }

            this.validate();
        });
    }

    async fetchAddress(cep) {
        const cleanCep = cep.replace(/\D/g, "");
        if (cleanCep.length !== 8) return;

        const ruaInput = document.getElementById('rua');
        if (ruaInput) ruaInput.value = "Buscando...";

        try {
            const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const data = await res.json();

            if (!data.erro) {
                ruaInput.value = data.logradouro || "";
                ruaInput.readOnly = true;
                document.getElementById('numero')?.focus();
            } else {
                this.enableManualAddress();
            }
        } catch (e) {
            this.enableManualAddress();
        } finally {
            this.validate();
        }
    }

    enableManualAddress() {
        const ruaInput = document.getElementById('rua');
        if (!ruaInput) return;

        ruaInput.value = "";
        ruaInput.readOnly = false;
        ruaInput.focus();
    }

    renderItems() {
        // 1. FORÇA A ATUALIZAÇÃO: Busca o que está no "disco" (LocalStorage) agora mesmo
        this.cart = JSON.parse(localStorage.getItem('techShopCart')) || [];

        const container = document.getElementById('checkout-list');
        const totalFinal = document.getElementById('total-final');

        if (!container) return;

        // 2. VERIFICAÇÃO: Se após ler o LocalStorage continuar vazio
        if (!this.cart.length) {
            container.innerHTML = "<p style='color: #666; padding: 20px;'>Seu carrinho está vazio.</p>";
            if (totalFinal) totalFinal.innerText = "R$ 0,00";
            return;
        }

        // 3. RENDERIZAÇÃO: Desenha os itens na tela
        container.innerHTML = this.cart.map(item => {
            const price = Number(item.price) || 0;
            const qty = Number(item.quantity) || 0;

            return `
            <div class="summary-item" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>${qty}x ${item.name}</span>
                <span>${(price * qty).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</span>
            </div>
        `;
        }).join('');

        // 4. TOTALIZADOR: Calcula o valor final com os dados novos
        const total = this.cart.reduce((acc, item) => {
            return acc + (Number(item.price) * Number(item.quantity));
        }, 0);

        if (totalFinal) {
            totalFinal.innerText = total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        }
    }

    validate() {
        const btn = document.getElementById('btn-finalizar');
        const cep = document.getElementById('cep');
        const num = document.getElementById('numero');

        if (!btn) return;

        // Verifica se os campos existem e se têm conteúdo
        const cepOk = cep && cep.value.replace(/\D/g, "").length === 8;
        const numOk = num && num.value.trim() !== "";

        if (cepOk && numOk) {
            btn.disabled = false;
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
            console.log("✅ Checkout: Campos validados, botão liberado!");
        } else {
            btn.disabled = true;
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
        }
    }

    setupEventListeners() {
        const btn = document.getElementById('btn-finalizar');
        const form = document.querySelector('.checkout-steps'); // Ou o ID do seu formulário

        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.cart = JSON.parse(localStorage.getItem('techShopCart')) || [];
                finalizarPagamentoMercadoPago(this.cart);
            });
        }

        // Escuta a digitação em qualquer lugar do checkout para validar na hora
        document.addEventListener('input', (e) => {
            if (e.target.id === 'cep' || e.target.id === 'numero') {
                this.validate();
            }
        });
    }
}


// ==========================================
// CHECKOUT & MERCADO PAGO (VERSÃO INTEGRADA)
// ==========================================

async function finalizarPagamentoMercadoPago(cart) {
    try {
        if (!cart || cart.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        // Prepara os itens exatamente como o PHP espera
        const dadosParaEnvio = {
            items: cart.map(item => ({
                title: item.name,
                quantity: parseInt(item.quantity),
                unit_price: parseFloat(item.price)
            }))
        };

        const response = await fetch('/incubadora/php/criar_preferencia.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParaEnvio)
        });

        const data = await response.json();

        if (data.init_point) {
            window.location.href = data.init_point; // Abre o Mercado Pago
        } else {
            console.error("Erro da API:", data);
            alert("Erro ao gerar link: " + (data.error || "Verifique o console"));
        }
    } catch (error) {
        console.error("Erro na comunicação:", error);
        alert("Erro de comunicação com o servidor. Verifique o XAMPP.");
    }
}