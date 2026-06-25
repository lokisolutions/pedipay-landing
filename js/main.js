document.addEventListener('DOMContentLoaded', () => {
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
});
