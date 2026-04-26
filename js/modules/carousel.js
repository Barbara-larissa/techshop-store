const track = document.getElementById('track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (track && nextBtn && prevBtn) {
    let index = 0;
    const cards = track.querySelectorAll('.testimonial-card');

    function getCardWidth() {
        return cards[0].offsetWidth + 30;
    }

    function updateCarousel() {
        const cardWidth = getCardWidth();
        track.style.transform = `translateX(-${index * cardWidth}px)`;

        updateActiveCard();
    }

   function updateActiveCard() {
    cards.forEach(card => card.classList.remove('active'));

    // 📱 se for mobile → todos ativos
    if (window.innerWidth <= 768) {
        cards.forEach(card => card.classList.add('active'));
        return;
    }

    // 💻 desktop → destaca o do meio
    const middleIndex = index + 1;

    if (cards[middleIndex]) {
        cards[middleIndex].classList.add('active');
    }
}

    nextBtn.onclick = () => {
        if (index < cards.length - 1) {
            index++;
        } else {
            index = 0;
        }

        updateCarousel();
    };

    prevBtn.onclick = () => {
        if (index > 0) {
            index--;
        } else {
            index = cards.length - 1;
        }

        updateCarousel();
    };

    // inicia já com o do meio ativo
    updateCarousel();
}