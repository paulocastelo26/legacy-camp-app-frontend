# 🔧 Configuração de Variáveis de Ambiente - Vercel

## 🚨 **Erro Resolvido**

### **Problema:**
```
Environment Variable "API_URL" references Secret "api_url", which does not exist.
```

### **Solução:**
Atualizamos o `vercel.json` para usar a URL diretamente ou configurar via dashboard.

---

## 🎯 **Opção 1: Configuração via Dashboard (Recomendado)**

### **1. Acessar Vercel Dashboard**
- Vá para [vercel.com/dashboard](https://vercel.com/dashboard)
- Selecione seu projeto `legacy-camp-inscricoes`

### **2. Configurar Variáveis de Ambiente**
1. **Settings** → **Environment Variables**
2. **Add New**
3. Configure:
   ```bash
   Name: API_URL
   Value: https://seu-backend.railway.app
   Environment: Production, Preview, Development
   ```

### **3. Atualizar vercel.json**
```json
{
  "version": 2,
  "name": "legacy-camp-inscricoes",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/acampamento-frontend"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## 🔧 **Opção 2: Configuração Direta no vercel.json**

### **Para Desenvolvimento:**
```json
{
  "version": 2,
  "name": "legacy-camp-inscricoes",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/acampamento-frontend"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "API_URL": "http://localhost:3000"
  }
}
```

### **Para Produção:**
```json
{
  "version": 2,
  "name": "legacy-camp-inscricoes",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/acampamento-frontend"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "API_URL": "https://seu-backend.railway.app"
  }
}
```

---

## 🌐 **URLs do Backend**

### **Railway:**
```env
API_URL=https://seu-backend.railway.app
```

### **Render:**
```env
API_URL=https://seu-backend.onrender.com
```

### **Local (Desenvolvimento):**
```env
API_URL=http://localhost:3000
```

---

## 🔄 **Deploy com Nova Configuração**

### **1. Fazer Commit das Mudanças**
```bash
git add vercel.json
git commit -m "🔧 Fix: Configuração de variáveis de ambiente"
git push
```

### **2. Verificar no Vercel**
- O deploy automático será iniciado
- Verificar logs para confirmar sucesso

### **3. Testar Aplicação**
- Acessar: https://legacy-camp-inscricoes.vercel.app
- Testar formulário de inscrição
- Verificar se conecta com o backend

---

## 🔍 **Verificação**

### **1. No Frontend (Angular)**
```typescript
// src/app/services/inscricao.service.ts
private apiUrl = environment.apiUrl || 'https://seu-backend.railway.app';
```

### **2. No Backend (CORS)**
```typescript
// src/main.ts
app.enableCors({
  origin: [
    'https://legacy-camp-inscricoes.vercel.app',
    'http://localhost:4200'
  ],
  credentials: true,
});
```

---

## 🚨 **Troubleshooting**

### **Erro de CORS:**
```typescript
// Adicionar origem do Vercel no backend
origin: ['https://legacy-camp-inscricoes.vercel.app']
```

### **API não responde:**
```bash
# Verificar se o backend está online
curl https://seu-backend.railway.app/inscricoes

# Deve retornar dados ou erro 404 (não 500)
```

### **Variável não carrega:**
```bash
# Verificar no Vercel Dashboard
# Settings → Environment Variables
# Confirmar que está configurada para Production
```

---

## 📱 **Teste Completo**

### **1. Frontend:**
- ✅ Carrega sem erros
- ✅ Formulário funciona
- ✅ Validações ativas

### **2. Backend:**
- ✅ API responde
- ✅ CORS configurado
- ✅ Banco conectado

### **3. Integração:**
- ✅ Formulário envia dados
- ✅ Dados salvos no banco
- ✅ Confirmação recebida

---

## 🎉 **Próximos Passos**

1. **✅ Configurar variável de ambiente**
2. **✅ Fazer novo deploy**
3. **✅ Testar aplicação**
4. **✅ Configurar domínio personalizado**
5. **✅ Monitorar logs**

**Sua aplicação estará funcionando em: https://legacy-camp-inscricoes.vercel.app** 🚀 