const thumbs = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('mainImage');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');


const captions = [
    '"Наследие Великой степи" - Астана Балет',
    '"Наследие Великой степи" - Астана Балет',
    '"Козы Корпеш - Баян Сулу" - Астана Балет',
    '"Козы Корпеш - Баян Сулу" - Астана Балет',
    '"Наследие Великой степи" - Астана Балет',
    '"Ак кыз" - Астана Балет'
]

const imageCache = [];

const images = Array.from(thumbs).map(img => img.src);
images.forEach(src => {
    const img = new Image();
    img.src = src;
    imageCache.push(img);
});
let currentIndex = 0;

function updateMainImage(index) {
    const newSrc = images[index];
    if (mainImage.src === newSrc) return;

    currentIndex = index;

    mainImage.classList.add('fade-out');

    const caption = document.getElementById('imageCaption');
    caption.classList.remove('opacity-100', 'translate-x-0');
    caption.classList.add('opacity-0', 'translate-x-4');

    setTimeout(() => {
        mainImage.src = newSrc;

        mainImage.classList.remove('fade-out');
        mainImage.classList.add('fade-in');

        caption.textContent = captions[index];

        caption.classList.remove('opacity-0', 'translate-x-4');
        caption.classList.add('opacity-100', 'translate-x-0');


        setTimeout(() => {
            mainImage.classList.remove('fade-in');
        }, 300);
    }, 200);

    thumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbs[currentIndex].classList.add('active');
    document.getElementById('imageCaption').textContent = captions[index];
}

images.forEach(src => {
    const img = new Image();
    img.src = src;
});

thumbs.forEach((thumb, index) => {
    if (mainImage.src.endsWith(thumb.src.split('/').pop())) {
        currentIndex = index;
        thumb.classList.add('active');
    }
});

thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => updateMainImage(index));
});

mainImage.addEventListener('click', () => {
    modalImage.src = images[currentIndex];
    modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

modalPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentIndex];
});

modalNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex];
});

mainImage.addEventListener('click', () => {
    modalImage.src = mainImage.src;
    modal.classList.remove('hidden');
});


thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        updateMainImage(index);
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateMainImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateMainImage(currentIndex);
});

document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateMainImage(currentIndex);
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            updateMainImage(currentIndex);
        }
    }
});

window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            modalImage.src = images[currentIndex];
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            modalImage.src = images[currentIndex];
        }
        if (e.key === 'Escape') {
            modal.classList.add('hidden');
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
    }
});

