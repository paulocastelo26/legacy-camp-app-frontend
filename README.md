# 🏕️ Legacy Camp - Sistema de Inscrições

Sistema completo de inscrições para o Legacy Camp 2025, desenvolvido com Angular (frontend) e NestJS (backend).

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/SEU_USUARIO/legacy-camp-app)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)](https://legacy-camp-inscricoes.vercel.app)
[![Angular](https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular)](https://angular.io/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)](https://www.mysql.com/)

## 🏗️ Arquitetura

- **Frontend:** Angular 17 (Standalone Components)
- **Backend:** NestJS com TypeORM
- **Banco de Dados:** MySQL
- **Documentação:** Swagger/OpenAPI

## 📁 Estrutura do Projeto

```
acampamento-frontend/
├── src/                    # Frontend Angular
│   ├── app/
│   │   ├── components/     # Componentes da aplicação
│   │   └── services/       # Services para API
│   └── assets/            # Recursos estáticos
└── backend/               # Backend NestJS
    ├── src/
    │   ├── inscricoes/    # Módulo de inscrições
    │   └── main.ts        # Arquivo principal
    └── package.json       # Dependências do backend
```

## 🚀 Instalação e Configuração

### 📋 Pré-requisitos

- Node.js 18+
- MySQL 8.0+
- Angular CLI (opcional)
- Git (para versionamento)

### 🌐 GitHub Setup

Para começar com o repositório:

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU_USUARIO/legacy-camp-app.git
cd legacy-camp-app

# 2. Ou usar o script automatizado
setup-github.bat
```

**📚 Consulte o arquivo `GITHUB_SETUP.md` para instruções detalhadas.**

### 1. Frontend (Angular)

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
```

O frontend estará disponível em: http://localhost:4200

### 2. Backend (NestJS)

```bash
# Navegar para o diretório do backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp env.example .env
# Editar o arquivo .env com suas configurações

# Criar banco de dados MySQL
# CREATE DATABASE legacy_camp;

# Iniciar servidor de desenvolvimento
npm run start:dev
```

O backend estará disponível em: http://localhost:3000
Documentação da API: http://localhost:3000/api

## 📋 Funcionalidades

### 🎯 Formulário de Inscrição
- ✅ Informações pessoais completas
- ✅ Contato de emergência
- ✅ Informações de igreja
- ✅ Seleção de lote e pagamento
- ✅ Informações médicas e alimentares
- ✅ Teste de dom ministerial
- ✅ Termos e autorizações
- ✅ Validações em tempo real
- ✅ Design responsivo

### 🔧 Backend API
- ✅ CRUD completo de inscrições
- ✅ Validação de dados
- ✅ Documentação Swagger
- ✅ Estatísticas das inscrições
- ✅ Gerenciamento de status
- ✅ Banco de dados MySQL

### 🚀 Deploy e Hospedagem
- ✅ Configuração Vercel (Frontend)
- ✅ Configuração Railway (Backend)
- ✅ Configuração Render (Alternativa)
- ✅ Domínios personalizados
- ✅ SSL automático

## 🗄️ Banco de Dados

A aplicação cria automaticamente a tabela `inscricoes` com todos os campos necessários:

- Informações pessoais (nome, email, telefone, etc.)
- Contato de emergência
- Informações de igreja
- Detalhes da inscrição
- Informações médicas
- Termos e autorizações
- Status e timestamps

## 🔧 Configuração do Banco

1. **Instalar MySQL**
2. **Criar banco de dados:**
```sql
CREATE DATABASE legacy_camp;
```
3. **Configurar .env:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=legacy_camp
```

## 📱 Endpoints da API

### Inscrições
- `POST /inscricoes` - Criar inscrição
- `GET /inscricoes` - Listar todas
- `GET /inscricoes/:id` - Buscar por ID
- `PATCH /inscricoes/:id` - Atualizar
- `DELETE /inscricoes/:id` - Remover
- `GET /inscricoes/stats` - Estatísticas
- `PATCH /inscricoes/:id/status` - Atualizar status

## 🎨 Design

- **Tema:** Escuro com cores do Legacy Camp
- **Responsivo:** Funciona em desktop, tablet e mobile
- **UX:** Formulário intuitivo com validações
- **Acessibilidade:** Labels e navegação por teclado

## 🛠️ Scripts Úteis

### Frontend
```bash
npm start          # Desenvolvimento
npm run build      # Build para produção
npm run test       # Executar testes
```

### Backend
```bash
npm run start:dev  # Desenvolvimento
npm run build      # Build para produção
npm run test       # Executar testes
```

## 📚 Documentação

- **API:** http://localhost:3000/api (Swagger UI)
- **Frontend:** http://localhost:4200
- **Backend:** http://localhost:3000

### 📖 Guias Disponíveis
- **`GITHUB_SETUP.md`** - Configuração do GitHub
- **`VERCEL_DEPLOY.md`** - Deploy específico no Vercel
- **`VERCEL_ENV_SETUP.md`** - Configuração de variáveis de ambiente
- **`DEPLOY_GUIDE.md`** - Guia de deploy geral
- **`DOMAIN_SETUP.md`** - Configuração de domínio
- **`backend/GUIA_INSTALACAO.md`** - Instalação do backend
- **`backend/TESTE_API.md`** - Testes da API

## 🚀 Deploy

### Opções Recomendadas:
- **🥇 Vercel + Railway** ($5/mês)
- **🥈 Render** (Gratuito)

**📖 Consulte o arquivo `DEPLOY_GUIDE.md` para instruções detalhadas.**

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**🏕️ Legacy Camp 2025** - Transformando vidas através do acampamento!

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/SEU_USUARIO/legacy-camp-app)
