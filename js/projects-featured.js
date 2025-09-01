(function(){
    var grid = document.querySelector('.featured-grid');
    if (!grid) return;
    var items = Array.prototype.slice.call(grid.querySelectorAll('.featured-card'));
    var prev = document.querySelector('.featured-prev');
    var next = document.querySelector('.featured-next');
    var progress = document.querySelector('.featured-progress');
    var progressBar = document.querySelector('.featured-progress-bar');

    function pageSize(){
        if (window.matchMedia('(max-width: 640px)').matches) return 1;
        if (window.matchMedia('(max-width: 1024px)').matches) return 2;
        return 3;
    }

    // Resolve thumbnail from project folder if data-cover is not set
    function resolveCoverUrl(anchor){
        var explicit = anchor.getAttribute('data-cover');
        if (explicit) return explicit;
        var href = anchor.getAttribute('href') || '';
        var m = href.match(/projects\/([^\/]+)/);
        if (!m) return '';
        var slug = m[1];
        var folder = 'projects/' + slug + '/';
        var preferredBySlug = {
            'm2-beam-quality-analysis': [
                'ChatGPT Image 2025年8月18日 13_10_28.png',
                'ChatGPT Image 2025年8月18日 12_49_11.png'
            ],
            'shelf-image-stitching-system': [
                'kUQr0Pz4mMaGlTBQKOjEeYpNK2Yv9h.png'
            ],
            'dental-segmentation': [
                'KHOlOs5mpFGSi0Y1P0EnUVn19ReOR5.png',
                'image.png'
            ],
            'xray-detection': [
                'xray-framework-diagram.png'
            ],
            'hyperspectral-seed-sorting-device': [
                'ZbTK21mkPZuKVZc9rb7IJJZ6ZSJA9o.png',
                'ulwkQH7XjATsv6Rli07AWD4ZFLwZie.png'
            ],
            'rk3588-algorithm-deployment-platform': [
                'Ic5fnkDm4gwAJMRseRc5vJOHamArUk.png'
            ],
            'stereo-vision-ranging': [
                'a3a57274-6f20-408f-bfdc-bbd051695c19.png',
            ],
            'trainsphere': [
                'framework.png',
                'ChatGPT Image 2025年8月20日 01_33_24.png'
            ],
            'vision-language-path-optimization': [
                'dfoTYM7rM5kdeRQG5PG1dVeRrhDVqc.png'
            ],
            'langchain-bmp-db-extraction': [
                'Ru0vOtLysYbI7Rf8akKErUAKDcDJFc.png'
            ]
        };
        var genericCandidates = [
            'cover.jpg','cover.png','cover.jpeg','cover.webp',
            'banner.jpg','banner.png','banner.jpeg','banner.webp',
            'thumb.jpg','thumb.png','thumb.jpeg','thumb.webp',
            'preview.jpg','preview.png','preview.jpeg','preview.webp'
        ];
        var candidates = (preferredBySlug[slug] || []).concat(genericCandidates);
        return new Promise(function(resolve){
            var resolved = false;
            function done(url){ if (!resolved){ resolved = true; resolve(url); } }
            var base = 'projects/' + slug + '/';
            var timeout = setTimeout(function(){ done('assets/featured/placeholder.jpg'); }, 5000);
            candidates.forEach(function(name){
                var img = new Image();
                var encoded = base + encodeURIComponent(name);
                img.onload = function(){ clearTimeout(timeout); done(encoded); };
                img.onerror = function(){};
                img.src = encoded;
            });
        });
    }

    (function initCovers(){
        items.forEach(function(card){
            var thumb = card.querySelector('.featured-thumb');
            if (!thumb) return;
            var anchor = card;
            var result = resolveCoverUrl(anchor);
            if (typeof result === 'string' && result) {
                thumb.style.backgroundImage = 'url("' + result + '")';
            } else if (result && typeof result.then === 'function') {
                result.then(function(url){ if (url) thumb.style.backgroundImage = 'url("' + url + '")'; });
            }
        });
        window.__resolveProjectCover = resolveCoverUrl;
    })();

    var currentPage = 0;
    var lastDirection = 0; // -1: left (prev), +1: right (next)
    function totalPages(){ return Math.max(1, items.length - pageSize() + 1); }

    function render(){
        var size = pageSize();
        var start = currentPage;
        var end = Math.min(items.length, start + size);
        grid.innerHTML = '';
        for (var i = start; i < end; i++) {
            var wrap = document.createElement('div');
            wrap.className = 'featured-grid-page';
            var animClass = lastDirection === 1 ? 'featured-slide-left' : (lastDirection === -1 ? 'featured-slide-right' : 'featured-fade-enter');
            items[i].classList.remove('featured-fade-enter','featured-slide-left','featured-slide-right');
            void items[i].offsetWidth;
            items[i].classList.add(animClass);
            wrap.appendChild(items[i]);
            grid.appendChild(wrap);
        }
        if (prev) prev.disabled = currentPage === 0;
        if (next) next.disabled = currentPage >= totalPages() - 1;
        if (progressBar) progressBar.style.width = Math.round(((currentPage + 1) / totalPages()) * 100) + '%';
    }

    function clampPage(){
        var max = totalPages() - 1;
        if (currentPage > max) currentPage = max;
        if (currentPage < 0) currentPage = 0;
    }

    if (prev) prev.addEventListener('click', function(){ lastDirection = -1; currentPage -= 1; clampPage(); render(); setTimeout(function(){ lastDirection = 0; }, 260); });
    if (next) next.addEventListener('click', function(){ lastDirection = 1; currentPage += 1; clampPage(); render(); setTimeout(function(){ lastDirection = 0; }, 260); });
    window.addEventListener('resize', function(){ clampPage(); render(); });
    render();
})(); 