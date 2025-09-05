document.addEventListener('DOMContentLoaded', function() {
    console.log('SEZフォーラムサイトが読み込まれました');
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 簡単なインタラクション例
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// 現在時刻を表示する例
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString('ja-JP');
    console.log('現在時刻:', timeString);
}

// 5秒ごとに時刻を更新
setInterval(updateCurrentTime, 5000);
updateCurrentTime();