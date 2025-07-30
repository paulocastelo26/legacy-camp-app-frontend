# 🚀 Deploy no Vercel - Legacy Camp

## 📋 **Configuração Atualizada**

### **Nome do Projeto:** `legacy-camp-inscricoes`

---

## 🎯 **Passo a Passo**

### **1. Acessar Vercel**
- Vá para [vercel.com](https://vercel.com)
- Faça login com sua conta GitHub

### **2. Importar Repositório**
1. Clique em **"New Project"**
2. Selecione seu repositório `legacy-camp-app`
3. Clique em **"Import"**

### **3. Configurar Projeto**
```bash
# Nome do Projeto (será sugerido automaticamente)
Project Name: legacy-camp-inscricoes

# Framework Preset
Framework Preset: Angular

# Build Settings
Build Command: npm run build
Output Directory: dist/acampamento-frontend
Install Command: npm install
```

### **4. Variáveis de Ambiente**
```env
# Adicionar no Vercel Dashboard → Settings → Environment Variables
API_URL=https://seu-backend.railway.app
```

### **5. Deploy**
- Clique em **"Deploy"**
- Aguarde o build (2-3 minutos)

---

## 🔧 **Configurações Avançadas**

### **1. Domínio Personalizado**
```bash
# No Vercel Dashboard → Settings → Domains
# Adicionar seu domínio:
legacycamp.com.br
www.legacycamp.com.br
```

### **2. Configuração de CORS**
```typescript
// No backend (src/main.ts)
app.enableCors({
  origin: [
    'https://legacy-camp-inscricoes.vercel.app',
    'https://legacycamp.com.br',
    'https://www.legacycamp.com.br'
  ],
  credentials: true,
});
```

### **3. Cache e Performance**
```json
// vercel.json (opcional)
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 📊 **Monitoramento**

### **1. Analytics**
- Vercel Analytics (gratuito)
- Google Analytics (opcional)

### **2. Performance**
- Core Web Vitals
- Lighthouse Score
- Build Performance

### **3. Logs**
- Function Logs
- Build Logs
- Error Tracking

---

## 🔍 **Troubleshooting**

### **Build Falhando:**
```bash
# Verificar logs no Vercel Dashboard
# Problemas comuns:
1. Node.js version incompatível
2. Dependências faltando
3. Erro no build command
```

### **Erro de CORS:**
```typescript
// Verificar se o backend está configurado corretamente
// Adicionar origem do Vercel no CORS
```

### **Página não carrega:**
```bash
# Verificar:
1. Build foi bem-sucedido
2. Routes configuradas corretamente
3. API_URL configurada
```

---

## 🎨 **Personalização**

### **1. Favicon**
```html
<!-- Adicionar no src/index.html -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

### **2. Meta Tags**
```html
<!-- SEO otimizado -->
<meta name="description" content="Inscrições para o Legacy Camp - Acampamento de Jovens">
<meta property="og:title" content="Legacy Camp - Inscrições">
<meta property="og:description" content="Faça sua inscrição para o Legacy Camp">
```

### **3. PWA (Opcional)**
```bash
# Instalar PWA
npm install @angular/pwa

# Configurar no angular.json
ng add @angular/pwa
```

---

## 📱 **URLs do Projeto**

### **Desenvolvimento:**
- **Local:** http://localhost:4200
- **Vercel Preview:** https://legacy-camp-inscricoes-git-main-seu-usuario.vercel.app

### **Produção:**
- **Vercel:** https://legacy-camp-inscricoes.vercel.app
- **Domínio Personalizado:** https://legacycamp.com.br

---

## 🔄 **Deploy Automático**

### **1. GitHub Integration**
- Deploy automático a cada push
- Preview deployments para PRs
- Branch deployments

### **2. Manual Deploy**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy manual
vercel --prod
```

---

## 📞 **Suporte**

### **Vercel:**
- [Documentação](https://vercel.com/docs)
- [Comunidade](https://github.com/vercel/vercel/discussions)
- [Status](https://vercel-status.com)

### **Angular:**
- [Documentação](https://angular.io/docs)
- [CLI](https://angular.io/cli)

---

## 🎉 **Próximos Passos**

1. **✅ Configurar Vercel**
2. **✅ Fazer primeiro deploy**
3. **✅ Configurar domínio personalizado**
4. **✅ Configurar backend (Railway/Render)**
5. **✅ Testar aplicação completa**

**Seu frontend estará online em: https://legacy-camp-inscricoes.vercel.app** 🚀 