(function() {
    // Constants for image extensions and their corresponding selectors
    const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.avif'];
    const selectors = extensions.map(ext => `a[href$="${ext}"]:not([download])`).join(', ');

    // Function to close the lightbox
    const closeLightbox = (mliteOpen) => {
        if (mliteOpen && mliteOpen.parentNode) {
            mliteOpen.parentNode.removeChild(mliteOpen);
        }
        window.removeEventListener('keydown', mliteEventHandler);
    };

    // Function to handle the 'Esc' key event
    function mliteEventHandler(e) {
        const mliteOpen = document.getElementById('ml');
        if (mliteOpen && e.keyCode === 27) {
            closeLightbox(mliteOpen);
        }
    }

    // Main function to handle click events on the document body
    document.body.addEventListener('click', (e) => {
        // Check if the clicked element or its ancestor matches the selectors
        const target = e.target.closest(selectors);
        if (!target) return;

        e.preventDefault();
        const mliteOpen = document.getElementById('ml');
        if (mliteOpen) {
            closeLightbox(mliteOpen);
        } else {
            // Add styles for the preloader
            var style = document.createElement('style');
            style.innerHTML = `#ml{cursor:zoom-out;position:fixed;top:0;left:0;width:100%;height:100%;overflow:hidden}.mlbg{position:fixed;width:100%;height:100%;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="80" cy="200" r="30" fill="%23000000" stroke="%23000000" stroke-width="4"><animate attributeName="opacity" begin="-.4" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" values="1;0;1;"/></circle><circle cx="200" cy="200" r="30" fill="%23000000" stroke="%23000000" stroke-width="4"><animate attributeName="opacity" begin="-.2" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" values="1;0;1;"/></circle><circle cx="320" cy="200" r="30" fill="%23000000" stroke="%23000000" stroke-width="4"><animate attributeName="opacity" begin="0" calcMode="spline" dur="2" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" values="1;0;1;"/></circle></svg>') center / 110px no-repeat,#2c3e50;opacity:0}.s .mlbg{opacity:.8}.mli img{max-width:100%;max-height:100%;display:block;margin:auto;position:absolute;top:0;left:0;bottom:0;right:0}#ml-close{position:absolute;top:10px;right:10px;width:24px;height:24px;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center}`;
            document.head.appendChild(style);

            // Create the lightbox with preloader immediately
            var childNode = target.querySelector('img'),
                mlite = document.createElement('div');

            mlite.id = 'ml';
            mlite.innerHTML = `<div class="mlbg"></div> <div class="mli"></div><div id="ml-close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6 6 18M6 6l12 12"/></svg></div>`;
            
            document.body.appendChild(mlite);
            mlite.className = 's';

            mlite.addEventListener('click', function() {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            });
            
            const closeBtn = mlite.querySelector('#ml-close');
            closeBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                closeLightbox(document.getElementById('ml'));
            });

            // Now load the image
            var img = new Image();
            img.src = target.href;

            img.onload = function() {
                // Set the HTML for the lightbox
                mlite.querySelector('.mli').innerHTML = '<img src="' + img.src + '">';
                // Add an event listener to close the lightbox with the 'Esc' key
                window.addEventListener('keydown', mliteEventHandler);
            };
        }
    });
})();
