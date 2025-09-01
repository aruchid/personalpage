(function() {
    // Inject category and overview metadata into each project card based on title
    var grid = document.querySelector('.projects-grid');
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.project-card'));
    var metaByTitle = {
        'M2 Beam Quality Analysis': { category: 'Industrial AI', overview: 'M2 factor computation and beam quality analytics tooling.' },
        'Langchain BMP DB Extraction': { category: 'NLP / Data Engineering', overview: 'Automated literature parsing pipeline with structured BMP database output.' },
        'IMU Mujoco Motion Tracking': { category: 'Sensor Fusion', overview: 'IMU-driven pose estimation with MuJoCo visualization and control.' },
        'Game Theory Control Optimization': { category: 'Optimization', overview: 'Game-theoretic controller tuning under multi-agent objectives and constraints.' },
        'Game Player Survival Analysis': { category: 'Statistics / ML', overview: 'Survival modeling of player churn and retention dynamics.' },
        'Electromagnetic Radiation Detection': { category: 'Signal Processing', overview: 'Kalman-filter based smoothing for radiation detection circuitry.' },
        'Dual Camera Real Time Stitching': { category: 'Computer Vision', overview: 'Real-time dual-camera panorama with robust feature matching and blending.' },
        'Dental Segmentation': { category: 'Medical Imaging', overview: 'Tooth and oral structure segmentation using deep neural networks.' },
        'Depression Audio Classifier': { category: 'Audio ML', overview: 'Acoustic biomarkers for depression classification using speech features.' },
        'Deepfake Face Detection': { category: 'Computer Vision / Security', overview: 'CNN-based deepfake detection for facial media integrity.' },
        'Box Palletizing System': { category: 'Robotics', overview: 'Automated box palletizing planner with vision-guided stacking.' },
        'SAM Road Segmentation': { category: 'Computer Vision', overview: 'Road layout extraction via SAM-Road with graph-based refinement.' },
        'SegTransformer Neutrino Event': { category: 'Deep Learning / HEP', overview: 'SegTransformer-based event vertex/direction reconstruction for JUNO.' },
        'Parallel Computing Correlation Analysis': { category: 'Parallel Computing', overview: 'Correlation analysis with parallel acceleration for performance studies.' },
        'MADDPG': { category: 'Reinforcement Learning', overview: 'PER-MADDPG framework with performance improvements and analysis.' },
        'Deep Learning Super Resolution': { category: 'Computer Vision', overview: 'Fourier single-pixel imaging acceleration and super-resolution reconstruction.' },
        'Vision Language Path Optimization': { category: 'VLM / Planning', overview: 'Vision-language assisted path planning and optimization.' },
        'Brushless Motor Drive System': { category: 'Embedded / Control', overview: 'BLDC drive system with dual-loop PID control on STM32.' },
        'RK3588 Algorithm Deployment Platform': { category: 'Edge AI / Deployment', overview: 'Algorithm deployment on RK3588 with optimized runtime pipelines.' },
        'Shelf Image Stitching System': { category: 'Computer Vision', overview: 'Retail shelf panorama stitching and SKU counting in real-time.' },
        '货架统计 · 货架全景拼接算法': { category: 'Computer Vision / Retail', overview: '货架全景拼接，SKU 计数与统计，实时稳定，适配门店场景。' },
        'Acupuncture Point Location': { category: 'Medical Imaging', overview: 'Localization of acupuncture points from medical images.' },
        'Xray Detection': { category: 'Industrial AI', overview: 'Industrial X-ray detection with OpenVINO-optimized inference.' },
        'Laser Line Scan Camera': { category: 'Imaging Systems', overview: 'Line-scan camera system integration and processing.' },
        'Battery Management System': { category: 'Embedded Systems', overview: 'Battery health monitoring and charge management algorithms.' },
        'Hyperspectral Seed Sorting Device': { category: 'Hyperspectral Imaging', overview: 'Seed sorting with hyperspectral analysis and real-time inference.' },
        'Laser Beam Analyzer': { category: 'Optics / CV', overview: 'Laser beam profiling and analysis tools.' },
        'Stereo Vision Ranging': { category: 'Computer Vision', overview: 'DEFOM-stereo based ranging with subpixel disparity accuracy.' },
        'Multi Agent Charging System': { category: 'Multi-Agent Systems', overview: 'Charging coordination across agents with scheduling optimization.' },
        'Madgwick Attitude Algorithm': { category: 'Sensor Fusion', overview: 'Madgwick AHRS implementation with WebSocket-driven 3D demo.' },
        'PET Reconstruction': { category: 'Medical Imaging', overview: 'Deep-learning PET reconstruction with physics-informed training.' },
        'AFDM Waveform Analysis': { category: 'Signal Processing', overview: 'AFDM waveform simulation and analysis toolkit.' },
        'RTKinertion': { category: 'Robotics / IMU', overview: 'Real-time inertial tracking and kinematics.' },
        'SPECIM Hyperspectral Segmentation': { category: 'Hyperspectral Imaging', overview: 'SPECIM FX series real-time segmentation with CUDA acceleration.' },
        'Stereo Line Matching': { category: 'Computer Vision', overview: 'Stereo line feature matching and 3D reconstruction.' },
        'TrainSphere': { category: 'Distributed Systems', overview: 'Distributed deep learning training platform with task orchestration.' },
        'NEGNn Model Improvement': { category: 'Deep Learning', overview: 'Model improvements and ablations on NEGNN architectures.' },
        'Multi Modal Image Stitching': { category: 'Computer Vision', overview: 'Cross-modal image stitching and fusion.' }
    };

    function normalizeTags(metaCategory, titleText){
        var chips = [
            'Computer Vision','Deep Learning','Industrial AI','Medical Imaging',
            'Embedded Systems','Algorithm Deployment','Training Platform','Signal Processing'
        ];
        var hay = ((metaCategory || '') + ' ' + (titleText || '')).toLowerCase();
        var tags = [];
        function add(tag){ if (tags.indexOf(tag) === -1) tags.push(tag); }
        if (hay.includes('computer vision') || hay.includes('cv') || hay.includes('stereo') || hay.includes('segmentation') || hay.includes('detection') || hay.includes('stitching')) add('Computer Vision');
        if (hay.includes('deep learning') || hay.includes('neural') || hay.includes('cnn') || hay.includes('transformer') || hay.includes('distributed')) add('Deep Learning');
        if (hay.includes('industrial') || hay.includes('xray') || hay.includes('factory')) add('Industrial AI');
        if (hay.includes('medical') || hay.includes('dental') || hay.includes('pet')) add('Medical Imaging');
        if (hay.includes('embedded') || hay.includes('stm32') || hay.includes('bms') || hay.includes('bldc')) add('Embedded Systems');
        if (hay.includes('deploy') || hay.includes('edge ai') || hay.includes('rk3588')) add('Algorithm Deployment');
        if (hay.includes('training') || hay.includes('platform') || hay.includes('distributed')) add('Training Platform');
        if (hay.includes('signal') || hay.includes('waveform') || hay.includes('afdm') || hay.includes('radiation')) add('Signal Processing');
        return tags;
    }

    cards.forEach(function(card) {
        var titleEl = card.querySelector('.project-title');
        if (!titleEl) return;
        var title = titleEl.textContent.trim();
        var meta = metaByTitle[title];
        if (meta && !card.querySelector('.project-meta')){
            var metaWrap = document.createElement('div');
            metaWrap.className = 'project-meta';
            var catEl = document.createElement('div');
            catEl.className = 'project-category';
            catEl.textContent = meta.category;
            var overviewEl = document.createElement('div');
            overviewEl.className = 'project-overview';
            overviewEl.textContent = meta.overview;
            metaWrap.appendChild(catEl);
            metaWrap.appendChild(overviewEl);
            titleEl.insertAdjacentElement('afterend', metaWrap);
        }
        var tags = normalizeTags(meta ? meta.category : '', title);
        card.dataset.tags = tags.join(',');
    });
})();

(function(){
    // Enhance right-side list with thumbnails
    var grid = document.querySelector('.projects-grid');
    if (!grid || !window.__resolveProjectCover) return;
    var links = Array.prototype.slice.call(grid.querySelectorAll('a.project-card'));
    links.forEach(function(link){
        if (link.querySelector('.project-thumb')) return;
        var thumb = document.createElement('div');
        thumb.className = 'project-thumb';
        link.insertBefore(thumb, link.firstChild);
        var result = window.__resolveProjectCover(link);
        if (typeof result === 'string' && result) {
            thumb.style.backgroundImage = 'url("' + result + '")';
        } else if (result && typeof result.then === 'function') {
            result.then(function(url){ if (url) thumb.style.backgroundImage = 'url("' + url + '")'; });
        }
    });
})();

(function() {
    // Filtering + Pagination for right-side list
    var grid = document.querySelector('.projects-grid');
    if (!grid) return;
    var allCards = Array.prototype.slice.call(grid.querySelectorAll('.project-card'));
    var pageSize = 5;
    var params = new URLSearchParams(window.location.search);
    var current = parseInt(params.get('page') || '1', 10);
    if (isNaN(current) || current < 1) current = 1;

    var chipsRoot = document.querySelector('.filter-chips');
    var chipInputs = chipsRoot ? Array.prototype.slice.call(chipsRoot.querySelectorAll('input[type="checkbox"]')) : [];

    function selectedTags(){
        var tags = [];
        chipInputs.forEach(function(input){
            var label = input.parentElement && input.parentElement.querySelector('span');
            var name = label ? label.textContent.trim() : '';
            if (name === 'All Projects') return;
            if (input.checked) tags.push(name);
        });
        return tags;
    }

    function isAllSelected(){
        var allInput = chipInputs.find(function(input){
            var label = input.parentElement && input.parentElement.querySelector('span');
            return label && label.textContent.trim() === 'All Projects';
        });
        return allInput ? allInput.checked : true;
    }

    function computeFiltered(){
        var sel = selectedTags();
        if (isAllSelected() || sel.length === 0) return allCards;
        return allCards.filter(function(card){
            var tags = (card.dataset.tags || '').split(',').filter(Boolean);
            return sel.some(function(t){ return tags.indexOf(t) !== -1; });
        });
    }

    function syncAllCheckboxBehavior(){
        var allInput = chipInputs.find(function(input){
            var label = input.parentElement && input.parentElement.querySelector('span');
            return label && label.textContent.trim() === 'All Projects';
        });
        if (!allInput) return;
        // When any specific tag checked, uncheck All; when none checked, check All
        var sel = selectedTags();
        allInput.checked = sel.length === 0;
    }

    function totalPages(filtered){
        return Math.max(1, Math.ceil(filtered.length / pageSize));
    }

    function renderPage(page){
        var filtered = computeFiltered();
        var total = filtered.length;
        var pages = totalPages(filtered);
        if (page > pages) page = pages;
        if (page < 1) page = 1;
        current = page;
        var start = (page - 1) * pageSize;
        var end = start + pageSize;
        // Hide all, then show slice of filtered
        allCards.forEach(function(card){ card.style.display = 'none'; });
        filtered.forEach(function(card, idx){
            if (idx >= start && idx < end) card.style.display = '';
        });
        var countEl = document.querySelector('.projects-count');
        if (countEl) {
            var showing = Math.min(end, total) - start;
            if (showing < 0) showing = 0;
            countEl.textContent = 'SHOWING ' + showing + ' OF ' + total + ' PROJECTS';
        }
        buildPagination(pages);
        var newParams = new URLSearchParams(window.location.search);
        newParams.set('page', String(page));
        var newUrl = window.location.pathname + '?' + newParams.toString();
        window.history.replaceState(null, '', newUrl);
    }

    function buildPagination(pages){
        var containers = [
            document.getElementById('paginationTop'),
            document.getElementById('paginationBottom')
        ].filter(Boolean);
        if (!containers.length) return;

        function createBtn(label, page, disabled, active) {
            var a = document.createElement('a');
            a.href = '#';
            a.textContent = label;
            a.className = 'page-link' + (active ? ' active' : '') + (disabled ? ' disabled' : '');
            if (!disabled) {
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                    renderPage(page);
                });
            }
            return a;
        }

        containers.forEach(function(container) {
            container.innerHTML = '';
            var prevDisabled = current <= 1;
            var nextDisabled = current >= pages;
            container.appendChild(createBtn('Prev', Math.max(1, current - 1), prevDisabled, false));
            for (var i = 1; i <= pages; i++) {
                container.appendChild(createBtn(String(i), i, false, i === current));
            }
            container.appendChild(createBtn('Next', Math.min(pages, current + 1), nextDisabled, false));
        });
    }

    // Attach listeners
    chipInputs.forEach(function(input){
        input.addEventListener('change', function(){
            // Manage All Projects behavior: if All toggled on, clear others
            var label = input.parentElement && input.parentElement.querySelector('span');
            var name = label ? label.textContent.trim() : '';
            if (name === 'All Projects' && input.checked){
                chipInputs.forEach(function(other){
                    var ol = other.parentElement && other.parentElement.querySelector('span');
                    var oname = ol ? ol.textContent.trim() : '';
                    if (oname !== 'All Projects') other.checked = false;
                });
            } else if (name !== 'All Projects' && input.checked) {
                var allInput = chipInputs.find(function(i){ var l = i.parentElement && i.parentElement.querySelector('span'); return l && l.textContent.trim()==='All Projects'; });
                if (allInput) allInput.checked = false;
            } else {
                syncAllCheckboxBehavior();
            }
            renderPage(1);
        });
    });

    // Initial render
    syncAllCheckboxBehavior();
    renderPage(current);
})(); 