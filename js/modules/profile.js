
    /**
     * LÓGICA DE NAVEGAÇÃO ENTRE ABAS
     */
    const menuButtons = document.querySelectorAll('.menu-item[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // 1. Remove a classe 'active' de todos os botões e abas
            menuButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 2. Adiciona a classe 'active' apenas no botão clicado e na aba correspondente
            button.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });

    /**
     * LÓGICA DE UPLOAD E PRÉ-VISUALIZAÇÃO DA FOTO
     */
    const inputPhoto = document.getElementById('profile-pic-input');
    const containerPhoto = document.getElementById('avatar-container');
    const previewWrapper = document.getElementById('avatar-preview');

    inputPhoto.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                // Remove a aparência de "vazio" e limpa o ícone de +
                containerPhoto.classList.remove('empty');
                previewWrapper.innerHTML = ''; 

                // Cria o elemento da imagem e insere o conteúdo carregado
                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = 'Foto de Perfil';
                img.className = 'user-avatar-image'; 

                previewWrapper.appendChild(img);
            };
            
            reader.readAsDataURL(file);
        }
    });

    /**
     * FEEDBACK DE SALVAMENTO (UX)
     */
    const profileForm = document.getElementById('form-profile-data');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulação de salvamento
            const btnSave = profileForm.querySelector('.btn-save');
            const originalText = btnSave.innerText;
            
            btnSave.innerText = "Salvando...";
            btnSave.disabled = true;

            setTimeout(() => {
                alert("Dados atualizados com sucesso!");
                btnSave.innerText = originalText;
                btnSave.disabled = false;
            }, 1000);
        });
    }

    /**
     * CONFIRMAÇÃO DE EXCLUSÃO
     */
    function setupDeleteButtons() {
        const deleteLinks = document.querySelectorAll('.delete-link');
        deleteLinks.forEach(link => {
            link.onclick = (e) => {
                e.preventDefault();
                if (confirm("Tem certeza que deseja excluir este item?")) {
                    alert("Item removido.");
                    // Aqui você removeria o elemento do DOM ou chamaria sua API/Firebase
                }
            };
        });
    }

    setupDeleteButtons();
