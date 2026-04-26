const wishlistManager = {
    items: [],

    init() {
        this.load();
        this.render();
        this.checkExternalLink();
    },

    load() {
        this.items = JSON.parse(localStorage.getItem('techshop_wishlist')) || [];
    },

    render() {
        const grid = document.getElementById('wishlistGrid');
        const emptyState = document.getElementById('wishlistEmpty');

        this.load(); // 🔥 garante sempre atualizado

        if (!grid || !emptyState) return;

        if (this.items.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');

        grid.innerHTML = this.items.map(item => `
            <div class="product-card" id="wish-item-${item.id}">
                
                <div class="product-card__image-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="product-card__image">

                    <button class="product-card__favorite active"
                        onclick="wishlistManager.remove(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>

                <div class="product-card__content">
                    <h3 class="product-card__name">${item.name}</h3>

                    <div class="product-card__price-wrapper">
                        <span class="product-card__price">
                            R$ ${parseFloat(item.price).toFixed(2).replace('.', ',')}
                        </span>
                    </div>

                    <label style="font-size:0.8rem; display:block; margin-top:10px;">
                        <input type="checkbox"> Notificar queda de preço
                    </label>
                </div>

                <div class="product-card__footer">
                    <button class="btn btn-primary"
                        onclick="wishlistManager.addToCart(this, ${item.id})">
                        🛒 Adicionar ao Carrinho
                    </button>
                </div>

            </div>
        `).join('');

        // 🔥 atualiza badge global
        this.updateBadge();
    },

    remove(id) {
        this.load();
        this.items = this.items.filter(i => i.id != id);
        this.save();
        this.render();
    },

    addToCart(btn, id) {
        const originalText = btn.innerHTML;

        btn.innerHTML = "✅ Adicionado!";
        btn.disabled = true;

        console.log(`Produto ${id} enviado para o carrinho`);

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    },

    save() {
        localStorage.setItem('techshop_wishlist', JSON.stringify(this.items));
        this.updateBadge();
    },

    updateBadge() {
        const badge = document.getElementById('wishlistBadge');
        if (!badge) return;

        badge.innerText = this.items.length;
    },

    share(platform) {
        const ids = this.items.map(i => i.id).join(',');
        const url = `${window.location.origin}${window.location.pathname}?items=${ids}`;

        const text = "Olha meus favoritos na TechShop!";

        if (platform === 'link') {
            navigator.clipboard.writeText(url);
            alert("Link copiado!");
        }

        if (platform === 'whatsapp') {
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`);
        }
    },

    checkExternalLink() {
        const urlParams = new URLSearchParams(window.location.search);
        const sharedIds = urlParams.get('items');

        if (sharedIds) {
            console.log("Lista compartilhada:", sharedIds);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => wishlistManager.init());