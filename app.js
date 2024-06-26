// Função para obter dados do perfil do GitHub
async function fetchProfile() {
    try {
        const response = await fetch('https://api.github.com/users/LucasBerão');
        if (!response.ok) {
            throw new Error('Erro ao carregar perfil do GitHub.');
        }
        const data = await response.json();
        // Atualizar elementos na página index.html
        document.getElementById('profile-image').src = data.avatar_url;
        document.getElementById('profile-name').textContent = data.name;
        document.getElementById('profile-description').textContent = data.bio;
        document.getElementById('profile-location').textContent = data.location;
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
    }
}

// Função para obter repositórios do GitHub
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
                    <p class="card-text">${repo.description}</p>
                    <a href="repo.html#${repo.name}" class="btn btn-primary">Ver detalhes</a>
                </div>
            `;
            repositoriesElement.appendChild(repoCard);
        });
    } catch (error) {
        console.error('Erro ao carregar repositórios:', error);
    }
}

// Função para obter detalhes de um repositório específico
async function fetchRepositoryDetails(repoName) {
    try {
        const response = await fetch(`https://api.github.com/repos/seu_usuario/${repoName}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar detalhes do repositório.');
        }
        const data = await response.json();
        const repoDetailsElement = document.getElementById('repo-details');
        repoDetailsElement.innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>Descrição:</strong> ${data.description}</p>
            <p><strong>Linguagem principal:</strong> ${data.language}</p>
            <p><strong>Última atualização:</strong> ${new Date(data.updated_at).toLocaleString()}</p>
            <p><strong>Número de estrelas:</strong> ${data.stargazers_count}</p>
            <p><strong>Forks:</strong> ${data.forks}</p>
            <p><strong>Link:</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
        `;
    } catch (error) {
        console.error('Erro ao carregar detalhes do repositório:', error);
    }
}

// Função principal para carregar dados iniciais da página
async function loadPage() {
    await fetchProfile();
    await fetchRepositories();

    // Verificar se estamos na página repo.html e carregar detalhes do repositório, se necessário
    if (window.location.pathname.includes('repo.html')) {
        const repoName = window.location.hash.substring(1); // Obter nome do repositório da URL
        if (repoName) {
            await fetchRepositoryDetails(repoName);
        }
    }
}

// Chamar a função principal para carregar dados na inicialização da página
loadPage();
