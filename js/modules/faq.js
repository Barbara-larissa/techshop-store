// ===============================
// 📚 FAQ
// ===============================
function initFaq() {
    const accordionHeaders = document.querySelectorAll('.accordion__header');
    const searchInput = document.getElementById('faqSearch');
    const faqItems = document.querySelectorAll('.accordion__item');
    const faqSections = document.querySelectorAll('.faq__section');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {

        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const contentId = header.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        const icon = header.querySelector('.accordion__icon');

        // 🔒 Fecha os outros
        accordionHeaders.forEach(otherHeader => {
            if (otherHeader !== header) {
                otherHeader.setAttribute('aria-expanded', 'false');

                const otherContent = document.getElementById(
                    otherHeader.getAttribute('aria-controls')
                );

                if (otherContent) otherContent.hidden = true;

                const otherIcon = otherHeader.querySelector('.accordion__icon');
                if (otherIcon) otherIcon.textContent = '+';
            }
        });

        // 🔁 Alterna atual
        const newStatus = !isExpanded;
        header.setAttribute('aria-expanded', String(newStatus));

        if (content) content.hidden = !newStatus;
        if (icon) icon.textContent = newStatus ? '-' : '+';

        // 💥 (opcional) brilho do header - pode remover se quiser
        header.classList.remove('accordion__header--glow');
        void header.offsetWidth;
        header.classList.add('accordion__header--glow');

        // 💥 PISCAR NO TÍTULO (CORRETO)
        const section = header.closest('.faq__section');
        const sectionTitle = section ? section.querySelector('.faq__section-title') : null;

        if (sectionTitle) {
            sectionTitle.classList.remove('flash');
            void sectionTitle.offsetWidth;
            sectionTitle.classList.add('flash');
        }
    });
});
    // --- BUSCA ---
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();

            faqItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(term) ? 'block' : 'none';
            });

            faqSections.forEach(section => {
                const hasVisible = [...section.querySelectorAll('.accordion__item')]
                    .some(item => item.style.display !== 'none');

                section.style.display = hasVisible ? 'block' : 'none';
            });
        });
    }
}

// ===============================
// 🤖 ROBÔ IA (SEU ORIGINAL)
// ===============================
function initAI() {
    const aiAssistant = document.getElementById('aiAssistant');
    const aiBtn = document.getElementById('aiAssistantTrigger');
    const aiWindow = document.getElementById('aiAssistantWindow');
    const aiClose = document.getElementById('closeAssistant');
    const aiBubble = document.getElementById('aiBubble');

    const form = aiAssistant.querySelector('.ai-assistant__input-group');
    const input = form ? form.querySelector('input') : null;
    const sendBtn = form ? form.querySelector('button') : null;
    const chatBody = document.querySelector('.ai-assistant__messages');

    if (!aiAssistant) return;

    // impede reload
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = input.value.trim();
            if (message !== '') {
                sendMessage(message);
                input.value = '';
            }
        });
    }

    // animação inicial
    aiAssistant.classList.add('ai-assistant--hidden');
    setTimeout(() => {
        aiAssistant.classList.add('show');
        aiAssistant.classList.remove('ai-assistant--hidden');
    }, 1200);

    setTimeout(() => {
        aiAssistant.classList.add('show-bubble');
    }, 2000);

    const messages = [
        "Oi, posso ajudar? 👋",
        "Precisa de ajuda? 🤖",
        "Estou aqui viu 👀",
        "Quer ver ofertas? 🛍️"
    ];

    let index = 0;
    setInterval(() => {
        if (aiBubble && aiAssistant.classList.contains('show-bubble')) {
            aiBubble.textContent = messages[index];
            index = (index + 1) % messages.length;
        }
    }, 3000);

    // abrir / fechar
    if (aiBtn && aiWindow) {
        aiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = aiWindow.classList.contains('active');

            if (isOpen) {
                aiWindow.classList.remove('active');
                setTimeout(() => {
                    aiAssistant.classList.add('show-bubble');
                }, 1500);
            } else {
                aiWindow.classList.add('active');
                aiAssistant.classList.remove('show-bubble');
            }
        });
    }

    if (aiClose) {
        aiClose.addEventListener('click', (e) => {
            e.stopPropagation();
            aiWindow.classList.remove('active');
            setTimeout(() => {
                aiAssistant.classList.add('show-bubble');
            }, 1500);
        });
    }

    function addMessage(text, type) {
        if (!chatBody) return;
        const msg = document.createElement('div');
        msg.classList.add('ai-message', `ai-message--${type}`);
        msg.textContent = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

   function fakeAI(message) {
    const msg = message.toLowerCase();

    const respostas = [
        {
            keywords: ["oi", "olá", "ola", "eae", "hey"],
            reply: "Oi! 😊 Como posso te ajudar hoje?"
        },
        {
            keywords: ["preço", "valor", "custa", "quanto"],
            reply: "Os preços você encontra direto na página do produto 🛍️"
        },
        {
            keywords: ["frete", "entrega", "prazo"],
            reply: "O prazo de entrega varia por região 🚚 Você pode simular no checkout."
        },
        {
            keywords: ["pagamento", "cartão", "pix", "boleto"],
            reply: "Aceitamos PIX, cartão e boleto 💳"
        },
        {
            keywords: ["troca", "devolução"],
            reply: "Você pode solicitar troca em até 7 dias após receber 📦"
        },
        {
            keywords: ["obrigado", "valeu"],
            reply: "De nada! 😄 Sempre que precisar estou aqui!"
        }
    ];

    // 🔍 procura resposta baseada em palavra-chave
    for (let item of respostas) {
        for (let key of item.keywords) {
            if (msg.includes(key)) {
                return item.reply;
            }
        }
    }

    // 🤖 fallback inteligente
    return "Hmm... não entendi muito bem 🤔 Tenta perguntar de outro jeito!";
}

    function sendMessage(message) {
        addMessage(message, 'user');

        const typing = document.createElement('div');
        typing.classList.add('ai-message', 'ai-message--bot');
        typing.textContent = "Digitando...";
        chatBody.appendChild(typing);

        setTimeout(() => {
            typing.remove();
            const reply = fakeAI(message);
            addMessage(reply, 'bot');
        }, 800);
    }

    if (sendBtn && input) {
        sendBtn.addEventListener('click', () => {
            const message = input.value.trim();
            if (message !== '') {
                sendMessage(message);
                input.value = '';
            }
        });
    }

    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }
}

// ===============================
// 🚀 INIT
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq__category-link').forEach(link => {
        link.addEventListener('click', function () {

            const id = this.getAttribute('href');
            const section = document.querySelector(id);

            if (!section) return;

            const title = section.querySelector('.faq__section-title');

            if (!title) return;

            title.classList.remove('flash');
            void title.offsetWidth;
            title.classList.add('flash');
        });
    });
});



document.querySelectorAll('.faq__category-link').forEach(link => {
    link.addEventListener('click', function () {

        const id = this.getAttribute('href');
        const section = document.querySelector(id);
        const title = section.querySelector('.faq__section-title');

        // 💥 força reset
        title.classList.remove('flash');
        void title.offsetWidth;
        title.classList.add('flash');

        console.log("CLICOU E DISPAROU"); // 👈 teste
    });
});