// 首页专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化动画
    initAnimations();
    
    // 初始化交互效果
    initInteractions();
    
    // 初始化视差效果
    initParallax();
});

// 初始化动画
function initAnimations() {
    // 为背景元素添加随机动画延迟
    const dotPattern = document.querySelector('.dot-pattern');
    if (dotPattern) {
        dotPattern.style.animationDelay = Math.random() * 2 + 's';
    }
    
    // 为曲线添加随机动画延迟
    const curveLine = document.querySelector('.curve-line');
    if (curveLine) {
        curveLine.style.animationDelay = Math.random() * 3 + 's';
    }
}

// 初始化交互效果
function initInteractions() {
    // 按钮悬停增强效果
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 主题切换按钮
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            this.style.transform = 'rotate(180deg) scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
            }, 300);
        });
    }
}

// 初始化视差效果
function initParallax() {
    // 滚动视差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // 背景装饰滚动视差
        const backgroundDecoration = document.querySelector('.background-decoration');
        if (backgroundDecoration) {
            backgroundDecoration.style.transform = `translateY(${rate}px)`;
        }
        
        // 点状图案滚动视差
        const dotPattern = document.querySelector('.dot-pattern');
        if (dotPattern) {
            dotPattern.style.transform = `translateY(${rate * 0.3}px)`;
        }
    });
}

// 移除鼠标跟随效果，保持页面简洁

// 添加页面加载完成后的额外动画
window.addEventListener('load', function() {
    // 页面加载完成后的微调动画
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'none';
        setTimeout(() => {
            heroContent.style.animation = 'heroFadeIn 1.5s ease-out';
        }, 100);
    }
    
    // 为背景元素添加呼吸效果
    const backgroundElements = document.querySelectorAll('.curve-line, .dot-pattern');
    backgroundElements.forEach((element, index) => {
        element.style.animation = element.style.animation + `, breathe ${4 + index}s ease-in-out infinite`;
    });
});

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Tab键导航时的高亮效果
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('cta-button')) {
            focusedElement.style.transform = 'scale(1.05)';
            focusedElement.style.boxShadow = '0 8px 25px rgba(17, 24, 39, 0.3)';
        }
    }
});

// 添加触摸设备支持
if ('ontouchstart' in window) {
    // 触摸设备的特殊处理
    document.addEventListener('touchstart', function() {
        // 触摸开始时的反馈
        document.body.style.cursor = 'pointer';
    });
    
    document.addEventListener('touchend', function() {
        // 触摸结束时的反馈
        document.body.style.cursor = 'default';
    });
}

// 性能优化：使用requestAnimationFrame优化动画
function smoothAnimation(callback) {
    let ticking = false;
    
    function update() {
        callback();
        ticking = false;
    }
    
    return function() {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    };
}

// 几何背景动画增强
function enhanceGeometricShapes() {
    const shapes = document.querySelectorAll('.geometric-shape');
    
    shapes.forEach((shape, index) => {
        // 为每个形状添加随机动画延迟
        shape.style.animationDelay = (index * 2 + Math.random() * 3) + 's';
        
        // 添加鼠标悬停效果
        shape.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(15deg)';
            this.style.opacity = '0.3';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.opacity = '0.1';
        });
    });
}

// 应用平滑动画到滚动事件
const optimizedScrollHandler = smoothAnimation(function() {
    // 滚动相关的动画逻辑
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    const backgroundDecoration = document.querySelector('.background-decoration');
    if (backgroundDecoration) {
        backgroundDecoration.style.transform = `translateY(${rate}px)`;
    }
});

window.addEventListener('scroll', optimizedScrollHandler);

// 页面加载完成后初始化几何背景动画
window.addEventListener('load', function() {
    enhanceGeometricShapes();
}); 