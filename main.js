document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-custom");
  const categories = document.querySelectorAll(".category");
  const previewImages = {
      capuz: document.getElementById("preview-hoodie"),
      vestido: document.getElementById("preview-dress"),
      bolsas: document.getElementById("preview-bag"),
      fantasias: document.getElementById("preview-costumes"),
      laços: document.getElementById("preview-bow"),
      headphones: document.getElementById("preview-fones"),
      detalhes: document.getElementById("preview-extras")
  };

  let lastClickedImg = null; // Variável para rastrear a última imagem clicada.

  // categorias
  tabs.forEach(tab => {
      tab.addEventListener("click", () => {
          const tabName = tab.getAttribute("data-tab");
          const targetCategory = document.getElementById(`${tabName}-category`);

          // remover e ativar 'active' de todas as abas e categorias
          tabs.forEach(t => t.classList.remove("active"));
          categories.forEach(c => c.classList.remove("active"));

          tab.classList.add("active");
          if (targetCategory) {
              targetCategory.classList.add("active");
          }
      });
  });

  // Atualizar as camadas
  categories.forEach(category => {
      category.addEventListener("click", (event) => {
          if (event.target.tagName === "IMG") {
              const clickedImgSrc = event.target.getAttribute("src");
              const categoryId = category.getAttribute("id").replace("-category", "");

              if (lastClickedImg === clickedImgSrc) {
                  // Se o usuário clicar duas vezes na mesma imagem, removemos a preview
                  if (previewImages[categoryId]) {
                      previewImages[categoryId].setAttribute("src", "");
                  }
                  lastClickedImg = null; // Resetamos a última imagem clicada.
              } else {
                  // Caso contrário, mostramos a nova imagem na preview
                  if (previewImages[categoryId]) {
                      previewImages[categoryId].setAttribute("src", clickedImgSrc);
                  }
                  lastClickedImg = clickedImgSrc; // Atualizamos a última imagem clicada.
              }

              // Se o usuário escolher uma fantasia, esconderemos vestidos e capuzes da preview.
              if (categoryId === "fantasias") {
                  previewImages["capuz"].setAttribute("src", "");
                  previewImages["vestido"].setAttribute("src", "");
              }
          }
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tab-button");

  buttons.forEach(button => {
      button.addEventListener("click", function () {
          const tabId = this.getAttribute("data-tab");

          // remover e ativar 'active' de todas as abas e categorias
          buttons.forEach(btn => btn.classList.remove("active"));            
          this.classList.add("active");
          document.querySelectorAll(".tab-content").forEach(tab => {
              tab.classList.remove("active");
          });
          document.getElementById(tabId).classList.add("active");
      });
  });
});

// envios

document.addEventListener("DOMContentLoaded", function () {
  const cepInput = document.getElementById("cep");
  const calcularFreteBtn = document.getElementById("calcularFrete");

  if (cepInput) {
      cepInput.addEventListener("input", function () {
          const cep = this.value;
          if (cep.length === 8) {
              buscarEndereco(cep);
          }
      });
  }

  if (calcularFreteBtn) {
      calcularFreteBtn.addEventListener("click", calcularFrete);
  }
});

async function buscarEndereco(cep) {
  if (cep.length !== 8 || isNaN(Number(cep))) {
      alert("CEP inválido!");
      return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.erro) {
          alert("CEP não encontrado!");
      } else {
          document.getElementById("endereco").value = data.logradouro || "";
          document.getElementById("bairro").value = data.bairro || "";
          document.getElementById("cidade").value = data.localidade || "";
          document.getElementById("uf").value = data.uf || "";
      }
  } catch (error) {
      console.error("Erro ao buscar endereço:", error);
  }
}

async function calcularFrete() {
  const cepDestino = document.getElementById("cep").value;
  const peso = document.getElementById("peso") ? document.getElementById("peso").value : "1"; 
  const origemCep = "70000000"; // Brasília-DF

  if (!cepDestino || cepDestino.length !== 8 || isNaN(Number(cepDestino))) {
      alert("Digite um CEP válido!");
      return;
  }

  const url = `https://api.linkcorreios.com/v1/calculo-frete?origem=${origemCep}&destino=${cepDestino}&peso=${peso}&formato=1&comprimento=20&altura=5&largura=15&servico=04014,04510`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.erro) {
          document.getElementById("resultado-frete").innerHTML = "Erro ao calcular o frete.";
      } else {
          let resultadoHTML = `<h3>Opções de Frete:</h3>`;
          data.forEach(servico => {
              resultadoHTML += `<p>${servico.nome}: R$ ${servico.valor} (Prazo: ${servico.prazo} dias)</p>`;
          });
          document.getElementById("resultado-frete").innerHTML = resultadoHTML;
      }
  } catch (error) {
      console.error("Erro ao calcular o frete:", error);
      document.getElementById("resultado-frete").innerHTML = "Erro ao calcular o frete.";
  }
}

document.querySelectorAll('.question-a').forEach(item => {
    item.addEventListener('click', function() {
      const parent = item.parentElement;
  
      // Se o item clicado já estiver ativo, podemos simplesmente fechar
      if (parent.classList.contains('active')) {
        parent.classList.remove('active');
      } else {
        // Fechar todas as perguntas abertas
        document.querySelectorAll('.question.active').forEach(activeQuestion => {
          activeQuestion.classList.remove('active');
        });
  
        // Abrir a pergunta clicada
        parent.classList.add('active');
      }
    });
  });