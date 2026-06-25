document.addEventListener('DOMContentLoaded', () => {
    // -------------------------
    // COOKIE BANNER LOGIC
    // -------------------------
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (cookieBanner && acceptCookiesBtn) {
        // Verifica se os cookies já foram aceites
        if (localStorage.getItem('pedipay_cookies_accepted') === 'true') {
            cookieBanner.classList.add('hidden');
        } else {
            // Evento para o botão de aceitar cookies
            acceptCookiesBtn.addEventListener('click', () => {
                localStorage.setItem('pedipay_cookies_accepted', 'true');
                
                // Animação de ocultar
                cookieBanner.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
                setTimeout(() => {
                    cookieBanner.classList.add('hidden');
                }, 300);
            });
        }
    }

    // -------------------------
    // FORMULÁRIO DE ADESÃO (Web3Forms API)
    // -------------------------
    const adesaoForm = document.getElementById('adesao-form');
    
    if (adesaoForm) {
        adesaoForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Evita recarregamento da página
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            const originalBtnClass = submitBtn.className;
            
            // Alterar o botão para estado de envio
            submitBtn.innerHTML = 'A enviar...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');

            // Capturar os dados do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const morada = document.getElementById('morada').value;
            const notas = document.getElementById('notas').value;

            // Preparar o payload para a API do Web3Forms
            const payload = {
                access_key: 'b5bd2d99-5115-4074-89bf-67d2e6deab7e',
                subject: 'Novo Pedido de Adesão PediPay',
                Nome_do_Estabelecimento: nome,
                Email_de_Contacto: email,
                Morada: morada,
                Notas_Mensagem: notas || 'Nenhuma nota inserida'
            };

            try {
                // Fazer pedido POST para Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const json = await response.json();

                if (response.status === 200) {
                    // Sucesso: Limpa o formulário e atualiza o botão
                    adesaoForm.reset();
                    submitBtn.innerHTML = 'Mensagem Enviada com Sucesso! ✓';
                    submitBtn.className = 'w-full flex items-center justify-center px-6 py-4 text-sm font-medium bg-emerald-500 text-white rounded-xl transition-colors';
                    
                    // Reverte o botão passados 4 segundos
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.className = originalBtnClass;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                    }, 4000);
                } else {
                    // Erro devolvido pela API
                    console.error('Web3Forms Error:', json);
                    throw new Error(json.message || 'Erro ao enviar.');
                }
            } catch (error) {
                // Erro de rede ou excepção
                console.error('Erro na submissão:', error);
                submitBtn.innerHTML = 'Erro ao enviar. Tente novamente.';
                submitBtn.className = 'w-full flex items-center justify-center px-6 py-4 text-sm font-medium bg-red-500 text-white rounded-xl transition-colors';
                
                // Reverte o botão passados 3 segundos
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.className = originalBtnClass;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                }, 3000);
            }
        });
    }
});
