// ========================================
// 1. SISTEMA BASE DE MODAIS (Mensagens)
// ========================================
class ModalSystem {
    constructor() {
        this.modals = new Map();
        this.init();
    }

    init() {
        document.addEventListener("click", (e) => {
            // Fecha se clicar no X ou fora da modal (backdrop)
            if (e.target.closest(".modal__close") || e.target.classList.contains("modal-backdrop")) {
                const backdrop = e.target.closest(".modal-backdrop");
                if (backdrop) this.close(backdrop.dataset.modalId);
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.closeAll();
        });
    }

    create(options = {}) {
        const id = `modal-${Date.now()}`;
        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop";
        backdrop.dataset.modalId = id;

        backdrop.innerHTML = `
            <div class="modal modal--${options.size || 'md'}">
                <div class="modal__header">
                    <h3 class="modal__title">${options.title || ''}</h3>
                    <button class="modal__close" aria-label="Fechar">&times;</button>
                </div>
                <div class="modal__body">${options.content || ''}</div>
            </div>`;

        document.body.appendChild(backdrop);
        this.modals.set(id, { element: backdrop });

        setTimeout(() => {
            backdrop.classList.add("active");
            document.body.classList.add("modal-open");
        }, 10);

        return id;
    }

    close(id) {
        const modal = this.modals.get(id);
        if (!modal) return;
        modal.element.classList.remove("active");
        setTimeout(() => {
            modal.element.remove();
            this.modals.delete(id);
            if (this.modals.size === 0) document.body.classList.remove("modal-open");
        }, 300);
    }

    closeAll() {
        this.modals.forEach((_, id) => this.close(id));
    }
}

// Inicializa o sistema global
const modalSystem = new ModalSystem();

// ========================================
// 2. CONTROLE DO MODAL DE LOGIN (Slider)
// ========================================
const LoginModal = {
    open: () => {
        const auth = document.getElementById("authModal");
        if (auth) {
            auth.classList.add("active");
            document.body.classList.add("modal-open");
            // Garante que o slider comece no Login
            document.querySelector('.auth-slider')?.classList.remove("show-register");
        } else {
            console.error("ERRO: ID #authModal não encontrado no HTML!");
        }
    },
    close: () => {
        const auth = document.getElementById("authModal");
        if (auth) {
            auth.classList.remove("active");
            document.body.classList.remove("modal-open");
        }
    }
};

// ========================================
// 3. ESCUTADOR DE EVENTOS GLOBAL
// ========================================
document.addEventListener("click", (e) => {
    // Abrir Login (Verifica o atributo data-login-btn ou ID)
    if (e.target.closest('[data-login-btn]') || e.target.id === 'loginBtn') {
        e.preventDefault();
        LoginModal.open();
    }

    // Fechar Login (Clique no X interno ou no overlay cinza)
    if (e.target.closest('.modal__close') || e.target.classList.contains('modal__overlay')) {
        LoginModal.close();
    }

    // Trocar para Cadastro
    if (e.target.id === 'goToRegister') {
        e.preventDefault();
        document.querySelector('.auth-slider')?.classList.add("show-register");
    }

    // Voltar para Login
    if (e.target.id === 'goToLogin') {
        e.preventDefault();
        document.querySelector('.auth-slider')?.classList.remove("show-register");
    }
});