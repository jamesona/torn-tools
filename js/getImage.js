"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getImage() {
    const style = document.createElement('style');
    style.innerHTML = `.item-hover, .image-wrap {cursor: crosshair !important;}`;
    return new Promise(resolve => {
        const onClick = e => {
            let img;
            switch (e.target.className) {
                case 'view-h':
                case 'buy-h':
                case 'item-hover': {
                    img = e.target.parentElement.previousElementSibling;
                    break;
                }
                case 'image-wrap': {
                    img = e.target.children[0].children[0];
                    break;
                }
                default: {
                    if (e.target.tagName === 'IMG')
                        img = e.target;
                }
            }
            if (!img || !img.src)
                return;
            window.removeEventListener('click', onClick);
            document.body.removeChild(style);
            resolve(img.src.replace('https://www.torn.com', ''));
        };
        document.body.appendChild(style);
        window.addEventListener('click', onClick);
    });
}
exports.getImage = getImage;
//# sourceMappingURL=getImage.js.map