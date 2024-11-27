# Projify

**Projify** é um gerenciador de projetos simples, desenvolvido com foco em aplicar conceitos de desenvolvimento web modernos.

## 🌐 Deploy do Projeto

A aplicação foi implantada em um servidor utilizando **Docker** na infraestrutura da **DigitalOcean**. A configuração incluiu a utilização de um container Docker para execução da aplicação e está acessível na seguinte URL:

> **URL de acesso:** [http://162.243.161.32/](http://162.243.161.32/)

A implantação foi realizada com docker e docker-compose em um servidor, com deploy na configuração SSR (Server Side Rendering).

### 🛠 Configuração do Servidor

1. **Infraestrutura**:
   - Servidor configurado na **DigitalOcean**.
   - Sistema operacional: Ubuntu 22.04.
   - Utilização de Docker para encapsular a aplicação.

2. **Tecnologias Utilizadas**:
   - **Nuxt.js** para desenvolvimento da aplicação.
   - **TailwindCSS** para estilização.
   - **LocalStorage** para armazenamento de dados no lado do cliente.

3. **Execução da Aplicação**:
   A aplicação foi configurada para ser executada diretamente no servidor, garantindo um fluxo contínuo de integração e entrega.

## 🛠 Tecnologias Utilizadas

### **Nuxt.js 3**
Utilizei o **Nuxt.js** para aproveitar seus recursos avançados de desenvolvimento, como rotas automáticas, renderização no lado do servidor (SSG/SSR), e geração de sites estáticos. O uso do Nuxt garante um fluxo de trabalho otimizado e escalável.

### **TypeScript**
O projeto foi desenvolvido inteiramente com **TypeScript**, garantindo tipagem estática e ajudando a identificar possíveis erros durante o desenvolvimento, além de fornecer maior escalabilidade e organização ao código.

### **TailwindCSS**
Para estilização, optei pelo **TailwindCSS**, que permite criar interfaces de forma rápida utilizando classes utilitárias. Isso garantiu um design responsivo e visualmente consistente.

---

## 📦 Funcionalidades Implementadas

### **Gerenciamento de Projetos**
- Exibir, adicionar, editar, remover e favoritar projetos.
- Ordenação dos projetos por:
  - Ordem alfabética (padrão);
  - Projetos mais recentes;
  - Projetos mais próximos da data de finalização.

---

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
- **Node.js** (recomendado: versão v20.16.0 ou superior);
- **pnpm** como gerenciador de pacotes.

### **Passos**
1. Clone o repositório:
   ```bash
   git clone https://github.com/lucasbezerra26/projify.git
   cd projify


2. Instale as dependências:
   ```bash
   pnpm install
   
3. Inicie o servidor de desenvolvimento:
   ```bash
    pnpm dev

   
## 📂 Estrutura do Projeto

- **components**: Componentes reutilizáveis (e.g., modal de confirmação).
- **layouts**: Layouts globais da aplicação.
- **pages**: Páginas principais da aplicação (rotas geradas automaticamente).
- **assets**: Imagens e arquivos estáticos.
- **public**: Arquivos estáticos acessíveis diretamente.
