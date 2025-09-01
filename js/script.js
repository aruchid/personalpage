// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // Back to Top 按钮功能
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 过滤器功能（已由 projects-list.js 实现核心逻辑，这里保留占位）
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log('Filter changed:', this.parentElement.textContent.trim());
        });
    });

    // 页面进入过场：淡入
    const root = document.documentElement;
    const body = document.body;
    body.classList.add('page-enter');
    requestAnimationFrame(() => {
        body.classList.add('page-enter-active');
        // 清理进入类
        setTimeout(() => {
            body.classList.remove('page-enter');
            body.classList.remove('page-enter-active');
        }, 260);
    });

    function isInternalLink(a){
        if (!a || !a.href) return false;
        const url = new URL(a.href, window.location.href);
        return url.origin === window.location.origin;
    }

    function handleNavigate(href){
        if (!href) return;
        body.classList.add('page-leave');
        // 触发淡出
        requestAnimationFrame(() => {
            body.classList.add('page-leave-active');
            root.classList.add('is-transitioning');
            body.classList.add('is-transitioning');
            setTimeout(() => {
                window.location.href = href;
            }, 210);
        });
    }

    // 拦截项目卡片点击与站内链接
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const link = this.closest('a') || this;
            const href = link.getAttribute('href');
            if (href) {
                e.preventDefault();
                handleNavigate(href);
            }
        });
    });

    document.body.addEventListener('click', function(e){
        const a = e.target.closest && e.target.closest('a');
        if (!a) return;
        if (!isInternalLink(a)) return;
        const href = a.getAttribute('href');
        if (!href || href.startsWith('#') || a.target === '_blank') return;
        // 避免重复处理项目卡片上的点击
        if (a.classList && a.classList.contains('project-card')) {
            return;
        }
        e.preventDefault();
        handleNavigate(href);
    }, true);
}); 