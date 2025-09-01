// 博客页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化过滤功能
    initFiltering();
    
    // 初始化交互效果
    initInteractions();
    
    // 初始化鼠标跟随效果
    initMouseFollow();
    
    // 初始化动画
    initAnimations();
});

// 初始化过滤功能
function initFiltering() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const postCards = document.querySelectorAll('.post-card');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 更新活跃状态
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 过滤文章
            filterPosts(category, postCards);
        });
    });
}

// 过滤文章函数
function filterPosts(category, postCards) {
    postCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            // 显示文章
            card.style.display = 'block';
            card.classList.remove('filtered-out');
            card.classList.add('filtered-in');
        } else {
            // 隐藏文章
            card.classList.add('filtered-out');
            setTimeout(() => {
                card.style.display = 'none';
            }, 500);
        }
    });
    
    // 更新文章计数
    updatePostCount(category, postCards);
}

// 更新文章计数
function updatePostCount(category, postCards) {
    const pageInfo = document.querySelector('.page-info');
    let visibleCount = 0;
    
    postCards.forEach(card => {
        if (card.style.display !== 'none') {
            visibleCount++;
        }
    });
    
    if (pageInfo) {
        pageInfo.textContent = `Showing 1-${visibleCount} of ${visibleCount} posts`;
    }
}

// 初始化交互效果
function initInteractions() {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        // 鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02) rotateX(2deg) rotateY(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
        });
        
        // 点击效果
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('read-more')) {
                // 添加点击波纹效果
                createRippleEffect(e, this);
            }
        });
        
        // 标签悬停效果
        const tags = card.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
    
    // 阅读更多链接效果
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // 这里可以添加跳转到具体文章页面的逻辑
            console.log('Navigate to article:', this.closest('.post-card').querySelector('.post-title').textContent);
        });
    });
}

// 创建波纹效果
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 初始化鼠标跟随效果
function initMouseFollow() {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x', x + '%');
            this.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// 初始化动画
function initAnimations() {
    // 为页面头部添加视差效果
    const postsHeader = document.querySelector('.posts-header');
    if (postsHeader) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            postsHeader.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // 为文章卡片添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        observer.observe(card);
    });
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Tab键导航时的高亮效果
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('filter-tag')) {
            focusedElement.style.transform = 'scale(1.05)';
            focusedElement.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
        }
    }
    
    // 方向键导航
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeFilter = document.querySelector('.filter-tag.active');
        const filterTags = Array.from(document.querySelectorAll('.filter-tag'));
        const currentIndex = filterTags.indexOf(activeFilter);
        
        if (e.key === 'ArrowRight') {
            const nextIndex = (currentIndex + 1) % filterTags.length;
            filterTags[nextIndex].click();
        } else if (e.key === 'ArrowLeft') {
            const prevIndex = currentIndex === 0 ? filterTags.length - 1 : currentIndex - 1;
            filterTags[prevIndex].click();
        }
        
        e.preventDefault();
    }
});

// 添加触摸设备支持
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {
        document.body.style.cursor = 'pointer';
    });
    
    document.addEventListener('touchend', function() {
        document.body.style.cursor = 'default';
    });
}

// 性能优化：使用requestAnimationFrame优化滚动事件
function smoothScrollHandler() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    const postsHeader = document.querySelector('.posts-header');
    if (postsHeader) {
        postsHeader.style.transform = `translateY(${rate}px)`;
    }
}

let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(smoothScrollHandler);
        ticking = true;
    }
}

window.addEventListener('scroll', function() {
    requestTick();
    setTimeout(() => {
        ticking = false;
    }, 16);
});

// 添加搜索功能（可选）
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search posts...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 20px;
        border: 2px solid #e5e7eb;
        border-radius: 25px;
        font-size: 1rem;
        margin-bottom: 30px;
        outline: none;
        transition: all 0.3s ease;
    `;
    
    const postsFilter = document.querySelector('.posts-filter');
    if (postsFilter) {
        postsFilter.appendChild(searchInput);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const postCards = document.querySelectorAll('.post-card');
            
            postCards.forEach(card => {
                const title = card.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                const matches = title.includes(searchTerm) || 
                              excerpt.includes(searchTerm) || 
                              tags.some(tag => tag.includes(searchTerm));
                
                if (matches) {
                    card.style.display = 'block';
                    card.classList.remove('filtered-out');
                    card.classList.add('filtered-in');
                } else {
                    card.classList.add('filtered-out');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500);
                }
            });
        });
    }
}

// 页面加载完成后添加搜索功能
window.addEventListener('load', function() {
    // 延迟添加搜索功能，确保页面完全加载
    setTimeout(addSearchFunctionality, 1000);
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .search-input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;
document.head.appendChild(style); 