# 🚀 Guia para Subir no GitHub - Legacy Camp

## 📋 **Pré-requisitos**

### **1. Conta no GitHub**
- Acesse [github.com](https://github.com)
- Crie uma conta ou faça login

### **2. Git instalado**
```bash
# Verificar se o Git está instalado
git --version

# Se não estiver, baixe em: https://git-scm.com/
```

---

## 🔧 **Configuração Local**

### **1. Inicializar Git (se necessário)**
```bash
# No diretório raiz do projeto
git init
```

### **2. Configurar usuário**
```bash
git config user.name "Seu Nome"
git config user.email "seu-email@exemplo.com"
```

### **3. Verificar arquivos**
```bash
git status
```

### **4. Adicionar arquivos**
```bash
# Adicionar todos os arquivos
git add .

# Ou adicionar arquivos específicos
git add src/
git add package.json
git add README.md
git add .gitignore
```

### **5. Fazer primeiro commit**
```bash
git commit -m "🎉 Initial commit: Legacy Camp - Sistema de Inscrições

- Frontend Angular com formulário completo
- Backend NestJS com API REST
- Configurações de deploy (Vercel, Railway, Render)
- Documentação completa
- Guias de instalação e configuração"
```

---

## 🌐 **Criar Repositório no GitHub**

### **1. Acessar GitHub**
- Vá para [github.com](https://github.com)
- Clique em **"New repository"**

### **2. Configurar Repositório**
```bash
# Nome do repositório
Repository name: legacy-camp-app

# Descrição
Description: Sistema de inscrições para o Legacy Camp - Acampamento de Jovens

# Visibilidade
Public (recomendado) ou Private

# NÃO marque:
❌ Add a README file
❌ Add .gitignore
❌ Choose a license
```

### **3. Criar Repositório**
- Clique em **"Create repository"**

---

## 🔗 **Conectar Repositório Local ao GitHub**

### **1. Adicionar Remote**
```bash
# Substitua SEU_USUARIO pelo seu username do GitHub
git remote add origin https://github.com/SEU_USUARIO/legacy-camp-app.git
```

### **2. Verificar Remote**
```bash
git remote -v
```

### **3. Fazer Push**
```bash
# Primeiro push
git push -u origin main

# Ou se sua branch principal for 'master'
git push -u origin master
```

---

## 📁 **Estrutura do Repositório**

```
legacy-camp-app/
├── 📁 acampamento-frontend/     # Frontend Angular
│   ├── 📁 src/
│   ├── package.json
│   ├── angular.json
│   └── ...
├── 📁 backend/                  # Backend NestJS
│   ├── 📁 src/
│   ├── package.json
│   └── ...
├── 📄 README.md                 # Documentação principal
├── 📄 DEPLOY_GUIDE.md          # Guia de deploy
├── 📄 DOMAIN_SETUP.md          # Configuração de domínio
├── 📄 GITHUB_SETUP.md          # Este arquivo
├── 📄 vercel.json              # Configuração Vercel
└── 📄 .gitignore               # Arquivos ignorados
```

---

## 🎯 **Comandos Rápidos**

### **Configuração Inicial:**
```bash
# 1. Inicializar Git
git init

# 2. Configurar usuário
git config user.name "Seu Nome"
git config user.email "seu-email@exemplo.com"

# 3. Adicionar arquivos
git add .

# 4. Primeiro commit
git commit -m "🎉 Initial commit: Legacy Camp"

# 5. Adicionar remote (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/legacy-camp-app.git

# 6. Fazer push
git push -u origin main
```

### **Atualizações Futuras:**
```bash
# 1. Verificar mudanças
git status

# 2. Adicionar mudanças
git add .

# 3. Fazer commit
git commit -m "📝 Descrição das mudanças"

# 4. Fazer push
git push
```

---

## 🔐 **Configuração de Segurança**

### **1. Variáveis de Ambiente**
```bash
# NUNCA commitar arquivos .env
# Use .env.example como template
```

### **2. Tokens e Senhas**
```bash
# NUNCA commitar senhas ou tokens
# Use variáveis de ambiente
```

### **3. Arquivos Sensíveis**
```bash
# Verificar se estão no .gitignore:
- .env
- node_modules/
- dist/
- logs/
```

---

## 📊 **GitHub Features Úteis**

### **1. Issues**
- Criar issues para bugs
- Criar issues para melhorias
- Usar templates de issue

### **2. Pull Requests**
- Criar branches para features
- Fazer pull requests
- Code review

### **3. Actions (CI/CD)**
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### **4. Wiki**
- Documentação detalhada
- Guias de uso
- FAQ

---

## 🎨 **Personalização do Repositório**

### **1. README.md**
- Descrição do projeto
- Screenshots
- Tecnologias usadas
- Como instalar
- Como usar

### **2. Topics**
```bash
# Adicionar topics relevantes:
angular
nestjs
typescript
mysql
vercel
railway
acampamento
igreja
```

### **3. Description**
```bash
# Descrição curta:
Sistema de inscrições para acampamento de jovens com frontend Angular e backend NestJS
```

---

## 🔍 **Troubleshooting**

### **Erro de Autenticação:**
```bash
# Usar Personal Access Token
# GitHub → Settings → Developer settings → Personal access tokens
```

### **Erro de Push:**
```bash
# Verificar se o remote está correto
git remote -v

# Reconfigurar se necessário
git remote set-url origin https://github.com/SEU_USUARIO/legacy-camp-app.git
```

### **Arquivos não aparecem:**
```bash
# Verificar se estão no .gitignore
git status --ignored

# Forçar adição se necessário
git add -f arquivo
```

---

## 📞 **Suporte**

### **GitHub:**
- [Documentação](https://docs.github.com)
- [Guia de Início](https://docs.github.com/get-started)

### **Git:**
- [Documentação](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book)

---

## 🎉 **Próximos Passos**

1. **Criar conta no GitHub**
2. **Criar repositório**
3. **Configurar Git local**
4. **Fazer primeiro commit**
5. **Conectar ao GitHub**
6. **Configurar deploy automático**

**Seu projeto estará disponível em: https://github.com/SEU_USUARIO/legacy-camp-app** 🚀 