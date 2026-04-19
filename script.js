document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const typingElement = document.getElementById('typing-name');

    music.volume = 0.5;

    // 1. Hàm cố gắng phát nhạc ngay lập tức
    const startMusic = () => {
        music.play().then(() => {
            musicToggle.innerHTML = '<i class="fas fa-pause"></i> Dừng nhạc';
            musicToggle.classList.replace('btn-dark', 'btn-danger');
        }).catch(() => {
            console.log("Trình duyệt chặn phát tự động. Cần click để bật.");
        });
    };

    // Chạy nhạc ngay khi trang load xong
    window.addEventListener('load', startMusic);

    // Mẹo: Nếu trình duyệt chặn load, click bất kỳ đâu sẽ bật nhạc luôn
    document.body.addEventListener('click', () => {
        if (music.paused) startMusic();
    }, { once: true });

    // Nút gạt nhạc thủ công
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (music.paused) {
            music.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i> Dừng nhạc';
            musicToggle.classList.replace('btn-dark', 'btn-danger');
        } else {
            music.pause();
            musicToggle.innerHTML = '<i class="fas fa-play"></i> Bật nhạc';
            musicToggle.classList.replace('btn-danger', 'btn-dark');
        }
    });

    // 2. Hiệu ứng gõ chữ cho tên "xRay"
    const text = "xRay";
    let index = 0;
    function typeWriter() {
        if (index < text.length) {
            typingElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 200);
        } else {
            typingElement.innerHTML += '<span class="cursor"></span>';
        }
    }
    typeWriter();

    // 3. Hiệu ứng Ripple (Gợn sóng) cho nút bấm
    const buttons = document.querySelectorAll('.ripple-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            let ripple = document.createElement('span');
            ripple.style.cssText = `left:${x}px; top:${y}px; position:absolute; background:rgba(255,255,255,0.4); transform:translate(-50%,-50%); border-radius:50%; pointer-events:none; animation:animateRipple 0.6s linear;`;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});