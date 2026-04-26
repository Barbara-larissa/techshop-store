// ========================================
// 1. SISTEMA BASE DE MODAIS
// ========================================
class ModalSystem {
    constructor() {
        this.modals = new Map();
        this.init();
    }

    init() {
        document.addEventListener("click", (e) => {
            const target = e.target;

            // Fechar modal dinâmico
            if (target.closest(".modal__close") && target.closest(".modal-backdrop")) {
                const backdrop = target.closest(".modal-backdrop");
                if (backdrop) this.close(backdrop.dataset.modalId);
                return;
            }

            if (target.classList.contains("modal-backdrop")) {
                this.close(target.dataset.modalId);
                return;
            }

            // Fechar modal login
            if (target.closest('.modal__close') || target.classList.contains('modal__overlay')) {
                const auth = document.getElementById("authModal");
                if (auth?.classList.contains('active')) {
                    LoginModal.close();
                }
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeAll();
                LoginModal.close();
            }
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
                    <button class="modal__close">&times;</button>
                </div>
                <div class="modal__body">${options.content || ''}</div>
            </div>
        `;

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

            const authActive = document.getElementById("authModal")?.classList.contains('active');

            if (this.modals.size === 0 && !authActive) {
                document.body.classList.remove("modal-open");
            }
        }, 300);
    }

    closeAll() {
        this.modals.forEach((_, id) => this.close(id));
    }
}

const modalSystem = new ModalSystem();


// ========================================
// 2. CONTROLE DO MODAL LOGIN
// ========================================
const LoginModal = {
    open: () => {
        const auth = document.getElementById("authModal");
        if (auth) {
            auth.classList.add("active");
            document.body.classList.add("modal-open");
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
// 3. EVENTOS PRINCIPAIS (TUDO CENTRALIZADO)
// ========================================
document.addEventListener("click", (e) => {
    const target = e.target;

    // 🔓 ABRIR LOGIN
    if (target.closest('[data-login-btn]') || target.id === 'loginBtn' || target.closest('.user-icon')) {
        e.preventDefault();
        LoginModal.open();
        return;
    }

    // 🔁 TROCAR PARA CADASTRO
    if (target.id === 'goToRegister') {
        e.preventDefault();

        document.querySelector('.auth-slider')?.classList.add("show-register");

        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');

        return;
    }

    // 🔁 VOLTAR PARA LOGIN
    if (target.id === 'goToLogin' || target.id === 'tabLogin') {
        e.preventDefault();

        document.querySelector('.auth-slider')?.classList.remove("show-register");

        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');

        return;
    }

    // 👁️ MOSTRAR/OCULTAR SENHA (FORMA PROFISSIONAL)
    const eye = target.closest(".toggle-password");
    if (eye) {
        const inputId = eye.getAttribute("data-target");
        const input = document.getElementById(inputId);

        if (!input) return;

        if (input.type === "password") {
            input.type = "text";
            eye.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            input.type = "password";
            eye.classList.replace("fa-eye-slash", "fa-eye");
        }

        return;
    }
});