// script.js

document.addEventListener('DOMContentLoaded', function () {
    // URL da API de exemplo (substitua pela sua URL real)
    var apiUrl = 'https://api.github.com/users/LucasBerão/repos';
  
    // Elemento onde os cards de repositórios serão inseridos
    var repoSection = document.querySelector('.repo-section .card-group');
  
    // Requisição GET para a API do GitHub
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Iterar sobre os dados dos repositórios recebidos
        data.forEach(repo => {
          // Criar elementos HTML para cada repositório
          var card = document.createElement('div');
          card.classList.add('card');
  
          var image = document.createElement('img');
          image.src = 'caminho_para_imagem'; // Adicione a imagem relevante do repositório
          image.classList.add('card-img-top');
          image.alt = repo.name; // Altura da imagem
  
          var cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
  
          var title = document.createElement('a');
          title.href = repo.html_url;
          title.textContent = repo.name;
          title.classList.add('card-title');
  
          var description = document.createElement('p');
          description.textContent = repo.description;
          description.classList.add('card-text');
  
          var footer = document.createElement('div');
          footer.classList.add('card-footer');
  
          var lastUpdated = document.createElement('small');
          lastUpdated.classList.add('text-muted');
          lastUpdated.textContent = 'Atualizado há ' + formatDistanceToNow(new Date(repo.updated_at)) + ' minutos'; // Adicione lógica para mostrar o tempo desde a última atualização
  
          // Adicionar elementos ao card
          cardBody.appendChild(title);
          cardBody.appendChild(description);
          footer.appendChild(lastUpdated);
          card.appendChild(image);
          card.appendChild(cardBody);
          card.appendChild(footer);
  
          // Adicionar card ao grupo de cards de repositórios
          repoSection.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Erro ao buscar repositórios:', error);
        // Lógica para lidar com erros, se necessário
      });
  });
  fetch('http://localhost:3000/contatos')
  .then(response => response.json())
  .then(data => {
    // Manipule os dados recebidos aqui
  })
  .catch(error => {
    console.error('Erro ao buscar dados:', error);
  });

  