// Função para carregar perfil do GitHub
async function fetchProfile() {
    try {
      const response = await fetch('https://api.github.com/users/LucasBerão');
      if (!response.ok) {
        throw new Error('Erro ao carregar perfil do GitHub.');
      }
      const data = await response.json();
      document.getElementById('profile-image').src = data.avatar_url;
      document.getElementById('profile-name').textContent = data.name || 'Nome não disponível';
      document.getElementById('profile-description').textContent = data.bio || 'Biografia não disponível';
      document.getElementById('profile-location').textContent = data.location || 'Localização não disponível';
      document.getElementById('profile-instagram').href = data.blog || '#';
      document.getElementById('profile-github').href = data.html_url || '#';
      document.getElementById('profile-email').href = `mailto:${data.email || ''}`;
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  }
  
  // Função para carregar repositórios do GitHub
  async function fetchRepositories() {
    try {
      const response = await fetch('https://api.github.com/users/LucasBerão/repos');
      if (!response.ok) {
        throw new Error('Erro ao carregar repositórios do GitHub.');
      }
      const data = await response.json();
      const repositoriesElement = document.getElementById('repositories');
      repositoriesElement.innerHTML = ''; // Limpar conteúdo atual
      data.slice(0, 3).forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('card');
        repoCard.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${repo.name}</h5>
            <p class="card-text">${repo.description || 'Descrição não disponível'}</p>
            <a href="repo.html#${repo.name}" class="btn btn-primary">Ver detalhes</a>
          </div>
          <div class="card-footer">
            <small class="text-muted">Última atualização: ${new Date(repo.updated_at).toLocaleString()}</small>
          </div>
        `;
        repositoriesElement.appendChild(repoCard);
      });
    } catch (error) {
      console.error('Erro ao carregar repositórios:', error);
    }
  }
  
  // Função para carregar colegas de trabalho do JSON Server
  async function fetchColleagues() {
    try {
      const response = await fetch('http://localhost:3000/contatos');
      if (!response.ok) {
        throw new Error('Erro ao carregar colegas de trabalho.');
      }
      const data = await response.json();
      const colleaguesElement = document.getElementById('colleagues');
      colleaguesElement.innerHTML = ''; // Limpar conteúdo atual
      data.forEach(colleague => {
        const colleagueCard = document.createElement('div');
        colleagueCard.classList.add('col-md-4', 'col-sm-6');
        colleagueCard.innerHTML = `
          <div class="colleague">
            <img src="${colleague.foto}" class="rounded" alt="${colleague.nome}">
            <strong>${colleague.nome}</strong>
          </div>
        `;
        colleaguesElement.appendChild(colleagueCard);
      });
    } catch (error) {
      console.error('Erro ao carregar colegas de trabalho:', error);
    }
  }
  
  // Função principal para carregar dados na inicialização da página
  async function loadPage() {
    await fetchProfile();
    await fetchRepositories();
    await fetchColleagues();
  }
  
  // Chamar a função principal para carregar dados na inicialização da página
  loadPage();
  
  