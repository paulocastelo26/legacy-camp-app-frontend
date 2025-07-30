# 🚀 Guia de Deploy - Legacy Camp

## 📋 Opções de Hospedagem

### **🥇 RECOMENDADO: Vercel + Railway**
- **Custo:** $5/mês
- **Performance:** Excelente
- **Facilidade:** ⭐⭐⭐⭐⭐

### **🥈 ALTERNATIVA: Render**
- **Custo:** Gratuito
- **Performance:** Boa
- **Facilidade:** ⭐⭐⭐⭐

---

## 🎯 Deploy no Vercel + Railway

### **1. Frontend (Vercel)**

#### **Preparação:**
```bash
# No diretório raiz (frontend)
npm run build
```

#### **Deploy:**
1. Acesse [vercel.com](https://vercel.com)
2. Conecte sua conta GitHub
3. Importe o repositório
4. Configure:
   - **Framework Preset:** Angular
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/acampamento-frontend`
   - **Install Command:** `npm install`

#### **Configuração de Ambiente:**
```env
API_URL=https://seu-backend.railway.app
```

### **2. Backend (Railway)**

#### **Preparação:**
1. Acesse [railway.app](https://railway.app)
2. Conecte sua conta GitHub
3. Crie novo projeto
4. Adicione serviço do GitHub

#### **Configuração do Banco:**
1. Adicione serviço MySQL
2. Configure variáveis de ambiente:
```env
DB_HOST=seu-mysql-host
DB_PORT=3306
DB_USERNAME=seu-usuario
DB_PASSWORD=sua-senha
DB_DATABASE=legacy_camp
NODE_ENV=production
```

#### **Deploy:**
- Railway detecta automaticamente o NestJS
- Deploy automático a cada push

---

## 🌐 Deploy no Render

### **1. Criar Conta**
- Acesse [render.com](https://render.com)
- Conecte sua conta GitHub

### **2. Deploy do Backend**
1. **New Web Service**
2. **Connect Repository**
3. **Configure:**
   - **Name:** `legacy-camp-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`

### **3. Configurar Banco**
1. **New PostgreSQL**
2. **Configure variáveis:**
```env
DB_HOST=seu-postgres-host
DB_PORT=5432
DB_USERNAME=seu-usuario
DB_PASSWORD=sua-senha
DB_DATABASE=legacy_camp
NODE_ENV=production
```

### **4. Deploy do Frontend**
1. **New Static Site**
2. **Configure:**
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist/acampamento-frontend`

---

## 🔧 Configurações Necessárias

### **1. Atualizar CORS no Backend**
```typescript
// src/main.ts
app.enableCors({
  origin: [
    'https://seu-frontend.vercel.app',
    'https://seu-frontend.onrender.com'
  ],
  credentials: true,
});
```

### **2. Atualizar URL da API no Frontend**
```typescript
// src/app/services/inscricao.service.ts
private apiUrl = 'https://seu-backend.railway.app/inscricoes';
```

### **3. Configurar Domínio Personalizado (Opcional)**
- **Vercel:** Settings → Domains
- **Railway:** Settings → Domains

---

## 📊 Comparação de Custos

| Plataforma | Frontend | Backend | Database | Total/Mês |
|------------|----------|---------|----------|-----------|
| **Vercel + Railway** | Gratuito | $5 | Incluído | **$5** |
| **Render** | Gratuito | Gratuito | Gratuito | **$0** |
| **Heroku** | $7 | $7 | $5 | **$19** |
| **DigitalOcean** | $5 | $5 | $15 | **$25** |

---

## 🚨 Checklist de Deploy

### **Antes do Deploy:**
- [ ] Testar localmente
- [ ] Configurar variáveis de ambiente
- [ ] Atualizar URLs da API
- [ ] Configurar CORS
- [ ] Testar build de produção

### **Após o Deploy:**
- [ ] Testar endpoints da API
- [ ] Verificar conexão com banco
- [ ] Testar formulário de inscrição
- [ ] Configurar domínio personalizado
- [ ] Configurar SSL

---

## 🔍 Troubleshooting

### **Erro de CORS:**
```typescript
// Adicionar origem do frontend
origin: ['https://seu-frontend.vercel.app']
```

### **Erro de Conexão com Banco:**
- Verificar variáveis de ambiente
- Verificar se o banco está ativo
- Testar conexão local

### **Build Falhando:**
- Verificar versões do Node.js
- Verificar dependências
- Verificar scripts no package.json

---

## 📞 Suporte

### **Vercel:**
- [Documentação](https://vercel.com/docs)
- [Comunidade](https://github.com/vercel/vercel/discussions)

### **Railway:**
- [Documentação](https://docs.railway.app)
- [Discord](https://discord.gg/railway)

### **Render:**
- [Documentação](https://render.com/docs)
- [Suporte](https://render.com/support)

---

## 🎉 Próximos Passos

1. **Escolha uma plataforma**
2. **Configure o repositório**
3. **Faça o deploy**
4. **Teste a aplicação**
5. **Configure domínio personalizado**

**Boa sorte com o deploy! 🚀** 