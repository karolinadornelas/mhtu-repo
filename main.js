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
const previewCollar = document.getElementById('preview-collar');

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
    bag: previewBag,
    collar: previewCollar
  };

  const layer = layerMap[category];

  if (layer) {
    if (layer.src === src) {
      layer.src = '';
      layer.style.display = 'none';
    } else {
      layer.src = src;
      layer.style.display = 'block';
    }
  }
}

function resetPreview() {
  [previewSkin, previewBlush, previewFace, previewHoodie, previewTrinket, previewSuit, previewHeadset, previewDeco, previewAcc, previewBag, previewCollar].forEach(
    (layer) => {
      layer.src = '';
      layer.style.display = 'none';
    }
  );
}

function handleBaseSelection(baseName, imgSrc) {
  if (currentBase !== baseName) {
    currentBase = baseName;
    previewBase.src = imgSrc;
    previewBase.style.display = 'block';
    resetPreview();
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

document.addEventListener("DOMContentLoaded", function() {
  const baseOptions = document.querySelectorAll(".base-option");
  const bxCustom = document.getElementById("bx-custom");

  //as customizações ficam visíveis apenas ao clicar em uma base
  baseOptions.forEach(option => {
      option.addEventListener("click", () => {
          bxCustom.style.display = "flex";
      });
  });
});


/*cep config*/

document.getElementById('cep').addEventListener('blur', async () => {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');

  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado.');
        return;
      }

      document.getElementById('street').value = data.logradouro || '';
      document.getElementById('neighborhood').value = data.bairro || '';
      document.getElementById('city').value = data.localidade || '';
      document.getElementById('state').value = data.uf || '';
    } catch (error) {
      alert('Erro ao buscar o endereço. Tente novamente.');
    }
  } else {
    alert('Digite um CEP válido.');
  }
});

/*solicitar encomenda*/
document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
});


document.getElementById('custom-ready').addEventListener('click', function () {
  document.getElementById('canvas').style.display = 'none';
  document.getElementById('custom-ready').style.display = 'none';

  document.getElementById('order-check').style.display = 'flex';

  const finalOrderContainer = document.getElementById('final-order');
  const previewImage = document.getElementById('preview-container').cloneNode(true);

  finalOrderContainer.innerHTML = '';
  finalOrderContainer.appendChild(previewImage);
});

/*pdf config*/

document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  generatePdf();
  alert('Entraremos em contato em breve, obrigada!');
});

function generatePdf() {
  const orderCheckDiv = document.getElementById('final-order');
  const orderFormDiv = document.getElementById('checkout-form');
  const tempOrderCheck = orderCheckDiv.cloneNode(true);

  const now = new Date();
  const dateString = now.toLocaleDateString('pt-BR');
  const timeString = now.toLocaleTimeString('pt-BR');
  const dateTime = `Data do pedido: ${dateString} - Horário: ${timeString}`;

  const dateElement = document.createElement('p');
  dateElement.textContent = dateTime;
  dateElement.style.textAlign = 'right';
  dateElement.style.fontWeight = 'bold';
  const formData = new FormData(orderFormDiv);
  let formContent = '<h3>Dados de Envio</h3><ul>';

  formData.forEach((value, key) => {
    formContent += `<li><strong>${key}:</strong> ${value}</li>`;
  });
  formContent += '</ul>';

  const content = `
        <style>
          header {
            background-image: url(custom/checkred-bg-gg.jpg);
            color: #b34a12;
            padding: 2px;
            text-align: center;
            position: sticky-top;
          }
          #order-report {
            padding: 10px;
            display: flex;
            flex-direction: column;
            font-family: "Quicksand", sans-serif;

          }
          .st-order{
          display:flex;
          }
          .form-field {
            margin-top: 105px;
          }
          .form-field-date{
            margin-top: 75px;
            position: absolute;
          }
        </style>

        <div>
          <header>
            <img src="/logo/mhtu-zip-logo.png" alt="mhtu logo" style="width: 185px;" />
          </header>
          
          <div id="order-report">
            <h3>Resumo do Pedido ୭˚.🎀</h3>
            <div class="st-order">
              <span>${tempOrderCheck.innerHTML}</span>
              <div class="form-field">${formContent}</div>
            </div>
          <div class="form-field-date">${dateElement.outerHTML}</div>

          </div>

        </div>
    `;

  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = content;
  document.body.appendChild(tempContainer);

  const options = {
    margin: 0,
    filename: 'mhtu-pedido.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: 'pt', format: 'a5', orientation: 'portrait' }
  };

  html2pdf()
    .set(options)
    .from(tempContainer)
    .save()
    .then(() => {
      document.body.removeChild(tempContainer);
    })
    .catch((error) => {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar o PDF. Tente novamente.");
    });

}

function showCategory(category) {
  const categories = document.querySelectorAll('.category');
  categories.forEach(cat => cat.classList.remove('active'));

  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => btn.classList.remove('active'));

  
  document.getElementById(category).classList.add('active');
  event.target.classList.add('active');
}

// //emailjs

// (function(){
//   emailjs.init("mhtuzip"); // Substitua YOUR_USER_ID pelo seu User ID

//   document.getElementById("contact-form").addEventListener("submit", function(event) {
//       event.preventDefault();

//       // Envia o e-mail
//       emailjs.send("mhtuzip", "template_rqro3wf", {
//           name: document.getElementById("name").value,
//           email: document.getElementById("email").value,
//           notas: document.getElementById("comment").value,
//           cep: document.getElementById("cep").value,
//           telefone: document.getElementById("phone").value,
//           rua: document.getElementById("street").value,
//           bairro: document.getElementById("neighborhood").value,
//           cidade: document.getElementById("city").value,
//           estado: document.getElementById("state").value,
//           numero: document.getElementById("number").value,
//           complemento: document.getElementById("complement"),
//           preview: document.getElementById("final-order")

//       })
//       .then(function(response) {
//           console.log("SUCCESS!", response.status, response.text);
//           alert("Mensagem enviada com sucesso!");
//       }, function(error) {
//           console.log("FAILED...", error);
//           alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
//       });
//   });
// })();
