// Constants for image extensions and their corresponding selectors
const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.avif'];
const selectors = extensions.map(ext => `a[href$="${ext}"]`).join(', ');

// Helper function to remove an element from the DOM
const removeElement = (element) => {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};

// Helper function to close the lightbox
const closeLightbox = (mliteOpen) => {
    if (mliteOpen) {
        mliteOpen.className = " ";
        mliteOpen.addEventListener("transitionend", () => removeElement(mliteOpen));
    }
};

// Function to handle the 'Esc' key event
function mliteEventHandler(e) {
    const mliteOpen = document.getElementById('ml');
    if (mliteOpen && e.keyCode === 27) {
        closeLightbox(mliteOpen);
        window.removeEventListener('keydown', mliteEventHandler);
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
        style.innerHTML = `#ml {cursor:zoom-out;position:fixed;top:0;left:0;width:100%;height:100%;overflow:hidden;}.mlbg {position:fixed;width:100%;height:100%;background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23000000" stroke="%23000000" stroke-width="4" r="30" cx="80" cy="200"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="%23000000" stroke="%23000000" stroke-width="4" r="30" cx="200" cy="200"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="%23000000" stroke="%23000000" stroke-width="4" r="30" cx="320" cy="200"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>') center / 110px no-repeat, #2c3e50;opacity:0;will-change:opacity;transition:opacity .3s}.s .mlbg {opacity:.8}.mli img {max-width: 100%; max-height: 100%; display: block; margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0; transition: transform 0.3s;touch-action: none;}#ml-close {position: absolute;top: 10px;right: 10px;width: 24px;height: 24px;cursor: pointer;z-index: 10;display: flex;align-items: center;justify-content: center;}`;
        document.head.appendChild(style);

        // Create the lightbox with preloader immediately
        var childNode = target.querySelector('img'),
            mlite = document.createElement('div');

        mlite.setAttribute('id', 'ml');
        mlite.setAttribute('onclick', 'this.className = " "; addEventListener("transitionend", function() { if (this.parentNode) { this.parentNode.removeChild(this); } });');
        mlite.innerHTML = `<div class="mlbg"></div> <div class="mli"></div><div id="ml-close" onclick="event.stopPropagation(); closeLightbox(document.getElementById('ml'));"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
        document.body.appendChild(mlite);
        setTimeout(function() {
            mlite.className = 's';
        }, 20);

        // Now load the image
        var img = new Image();
        img.src = target.href;

        img.onload = function() {

            // Set the HTML for the lightbox
            mlite.querySelector('.mli').innerHTML = '<img src="' + img.src + '">';

            // Zmienne do obsługi zoomowania
            let isZooming = false;
            let initialDistance = 0;
            let initialScale = 1;

            // Funkcja do obliczania odległości między dwoma punktami dotknięcia
            function getDistance(touches) {
                const [touch1, touch2] = touches;
                const dx = touch1.clientX - touch2.clientX;
                const dy = touch1.clientY - touch2.clientY;
                return Math.sqrt(dx * dx + dy * dy);
            }

            // Obsługa zdarzenia rozpoczęcia dotknięcia
            document.body.addEventListener('touchstart', (e) => {
                const img = e.target.closest('.mli img');
                if (img && e.touches.length === 2) {
                    isZooming = true;
                    initialDistance = getDistance(e.touches);
                    initialScale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1;
                }
            }, { passive: true });

            // Obsługa zdarzenia przesunięcia dotknięcia
            document.body.addEventListener('touchmove', (e) => {
                if (isZooming && e.touches.length === 2) {
                    const currentDistance = getDistance(e.touches);
                    const scale = initialScale * (currentDistance / initialDistance);
                    e.target.style.transform = `scale(${scale})`;
                    e.preventDefault();
                }
            }, { passive: false });

            // Obsługa zdarzenia zakończenia dotknięcia
            document.body.addEventListener('touchend', (e) => {
                if (isZooming) {
                    isZooming = false;
                }
            }, { passive: true });

            // Add an event listener to close the lightbox with the 'Esc' key
            window.addEventListener('keydown', mliteEventHandler);
        };
    }
});
