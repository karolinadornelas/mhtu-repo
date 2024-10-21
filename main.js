const vitrineImages = document.querySelectorAll('.vitrine img');
const baseImages = document.querySelectorAll('.ch-base img');

const previewBase = document.getElementById('preview-base');
const previewSkin = document.getElementById('preview-skin');
const previewBlush = document.getElementById('preview-blush');
const previewFace = document.getElementById('preview-face');
const previewHoodie = document.getElementById('preview-hoodie');
const previewTrinket = document.getElementById('preview-trinket');
const previewSuit = document.getElementById('preview-suit');
const previewHeadset = document.getElementById('preview-headset');
const previewDeco = document.getElementById('preview-deco');
const previewAcc = document.getElementById('preview-acessory');
const previewBag = document.getElementById('preview-bag');

const vitrines = {
  miffy: document.getElementById('vitrine-miffy'),
  bunny: document.getElementById('vitrine-bunny'),
  catinho: document.getElementById('vitrine-catinho'),
};

let currentBase = null;

function updateLayer(category, src) {
  const layerMap = {
    base: previewBase,
    blush: previewBlush,
    skin: previewSkin,
    face: previewFace,
    hoodie: previewHoodie,
    trinket: previewTrinket,
    suit: previewSuit,
    headset: previewHeadset,
    deco: previewDeco,
    acessory: previewAcc,
    bag: previewBag
  };

  const layer = layerMap[category];

  if (layer) {
    if (layer.src === src) {
      layer.src = '';
      layer.style.display = 'none'; // Esconde a imagem se for clicada novamente
    } else {
      layer.src = src;
      layer.style.display = 'block'; // Mostra a nova imagem
    }
  }
}

function resetPreview() {
  [previewSkin, previewBlush, previewFace, previewHoodie, previewTrinket, previewSuit, previewHeadset, previewDeco, previewAcc, previewBag].forEach(
    (layer) => {
      layer.src = '';
      layer.style.display = 'none';
    }
  );
}

function handleBaseSelection(baseName, imgSrc) {
  if (currentBase !== baseName) {
    currentBase = baseName;
    previewBase.src = imgSrc; // Atualiza a imagem da base
    previewBase.style.display = 'block'; // Garante que a imagem apareça no preview
    resetPreview();

    // Esconde todas as vitrines e mostra a correspondente
    Object.values(vitrines).forEach((vitrine) => {
      vitrine.style.display = 'none';
    });

    vitrines[baseName].style.display = 'block';
  }
}

baseImages.forEach((img) => {
  img.addEventListener('click', () => {
    const baseName = img.nextElementSibling.textContent.trim().toLowerCase();
    const imgSrc = img.src;
    handleBaseSelection(baseName, imgSrc);
  });
});

vitrineImages.forEach((img) => {
  img.addEventListener('click', () => {
    const category = img.classList[0];
    const imgSrc = img.src;
    updateLayer(category, imgSrc);
  });
});
