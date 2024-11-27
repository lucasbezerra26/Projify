
# Use a imagem Node.js como base
FROM node:20

# Diretório de trabalho no contêiner
WORKDIR /app

# Copia apenas os arquivos necessários para instalação
COPY . .

# Instala o gerenciador de pacotes PNPM globalmente
RUN npm install -g serve
RUN npm install -g pnpm

# Instala as dependências do projeto
RUN pnpm install --frozen-lockfile

# Copia todos os arquivos do projeto para o contêiner

# Gera os arquivos estáticos do Nuxt.js
RUN pnpm generate

# Expõe a porta para o servidor Node.js
EXPOSE 3000
# Comando para iniciar o servidor Node.js
CMD ["npx", "serve", "./dist"]