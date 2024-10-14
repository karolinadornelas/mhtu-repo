
const btnMiffy = document.querySelector('.ch-base:nth-child(1) button');
const btnBunny = document.querySelector('.ch-base:nth-child(2) button');
const btnCatinho = document.querySelector('.ch-base:nth-child(3) button');


const vitrineMiffy = document.getElementById('vitrine-miffy');
const vitrineBunny = document.getElementById('vitrine-bunny');
const vitrineCatinho = document.getElementById('vitrine-catinho');

function esconderVitrines() {
  vitrineMiffy.style.display = 'none';
  vitrineBunny.style.display = 'none';
  vitrineCatinho.style.display = 'none';
}

btnMiffy.addEventListener('click', () => {
  esconderVitrines();
  vitrineMiffy.style.display = 'block';
});

btnBunny.addEventListener('click', () => {
  esconderVitrines();
  vitrineBunny.style.display = 'block';
});

btnCatinho.addEventListener('click', () => {
  esconderVitrines();
  vitrineCatinho.style.display = 'block';
});
const vitrineImages = document.querySelectorAll('.vitrine img');

const preview = document.getElementById('preview');
const previewImage = document.getElementById('preview-image');

function updatePreview(src) {
    previewImage.src = src;  
    preview.style.display = 'block';
}


vitrineImages.forEach((img) => {
    img.addEventListener('click', () => {
        const imgSrc = img.src;
        updatePreview(imgSrc);
    });
});
