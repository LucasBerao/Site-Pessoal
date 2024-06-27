// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo implementa uma API RESTful baseada no JSONServer
// O servidor JSONServer fica hospedado na seguinte URL
// https://jsonserver.rommelpuc.repl.co/contatos
//
// Para montar um servidor para o seu projeto, acesse o projeto 
// do JSONServer no Replit, faça o FORK do projeto e altere o 
// arquivo db.json para incluir os dados do seu projeto.
//
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
//
// Autor: Rommel Vieira Carneiro
// Data: 03/10/2023

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db/db.json')

// Para permitir que os dados sejam alterados, altere a linha abaixo
// colocando o atributo readOnly como false.
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server está em execução!')
})
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/images')
      .then(response => response.json())
      .then(images => {
        // Carregar imagem de perfil
        const profileImg = images.find(img => img.alt === "Foto de Perfil");
        document.getElementById('profile-img').src = profileImg.src;
  
        // Carregar ícones de contato
        const instagramImg = images.find(img => img.alt === "Instagram");
        document.getElementById('instagram-img').src = instagramImg.src;
  
        const githubImg = images.find(img => img.alt === "GitHub");
        document.getElementById('github-img').src = githubImg.src;
  
        const gmailImg = images.find(img => img.alt === "Gmail");
        document.getElementById('gmail-img').src = gmailImg.src;
  
        // Carregar repositórios
        const repoCardsContainer = document.getElementById('repo-cards');
        const repoImages = images.filter(img => img.alt.startsWith("Imagem de Banner"));
        repoImages.forEach(img => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <img src="${img.src}" class="card-img-top" alt="${img.alt}">
            <div class="card-body">
              <a href="repo.html" class="card-title">Scratch</a>
              <p class="card-text">Labirinto</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Atualizado há 3 minutos</small>
            </div>
          `;
          repoCardsContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Erro ao buscar imagens:', error));
  });
  