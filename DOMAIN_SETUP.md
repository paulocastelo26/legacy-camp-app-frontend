# 🌐 Configuração de Domínio - Legacy Camp

## 🎯 **Opções de Domínio**

### **1. Domínio Principal:**
```
legacycamp.com.br
www.legacycamp.com.br
```

### **2. Subdomínio:**
```
app.legacycamp.com.br
inscricoes.legacycamp.com.br
acampamento.legacycamp.com.br
```

---

## 🚀 **Configuração no Vercel**

### **Passo 1: Adicionar Domínio**
1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. **Settings** → **Domains**
4. **Add Domain**
5. Digite seu domínio

### **Passo 2: Configurar DNS**

#### **Para domínio raiz:**
```bash
Type: A
Name: @
Value: 76.76.19.36
TTL: 3600
```

#### **Para www:**
```bash
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### **Para subdomínio:**
```bash
Type: CNAME
Name: app (ou inscricoes)
Value: cname.vercel-dns.com
TTL: 3600
```

---

## 🔧 **Provedores de DNS Comuns**

### **GoDaddy:**
1. **My Domains** → **Manage DNS**
2. **Add Record**
3. Configure conforme acima

### **Namecheap:**
1. **Domain List** → **Manage** → **Advanced DNS**
2. **Add New Record**
3. Configure conforme acima

### **Google Domains:**
1. **Manage** → **DNS**
2. **Create new record**
3. Configure conforme acima

---

## ✅ **Verificação**

### **1. Teste de Conectividade:**
```bash
# Teste se o domínio responde
curl -I https://seu-dominio.com

# Deve retornar:
# HTTP/2 200
# server: Vercel
```

### **2. Teste de SSL:**
```bash
# Verificar certificado SSL
openssl s_client -connect seu-dominio.com:443 -servername seu-dominio.com
```

### **3. Teste de Performance:**
```bash
# Teste de velocidade
curl -w "@curl-format.txt" -o /dev/null -s "https://seu-dominio.com"
```

---

## 🎨 **Personalização**

### **1. Favicon:**
```html
<!-- Adicionar no index.html -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

### **2. Meta Tags:**
```html
<!-- SEO otimizado -->
<meta name="description" content="Inscrições para o Legacy Camp - Acampamento de Jovens">
<meta name="keywords" content="acampamento, jovens, igreja, legacy camp">
<meta property="og:title" content="Legacy Camp - Inscrições">
<meta property="og:description" content="Faça sua inscrição para o Legacy Camp">
```

### **3. Analytics:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔍 **Troubleshooting**

### **Domínio não carrega:**
1. Verificar configuração DNS
2. Aguardar propagação (até 48h)
3. Verificar se o domínio está ativo no Vercel

### **SSL não funciona:**
1. Verificar se o domínio está configurado corretamente
2. Aguardar certificado SSL (até 24h)
3. Verificar se não há redirecionamentos

### **Performance lenta:**
1. Verificar CDN do Vercel
2. Otimizar imagens
3. Verificar cache do navegador

---

## 📞 **Suporte**

### **Vercel:**
- [Documentação Domínios](https://vercel.com/docs/concepts/projects/domains)
- [Suporte](https://vercel.com/support)

### **Provedores DNS:**
- **GoDaddy:** [Suporte](https://www.godaddy.com/help)
- **Namecheap:** [Suporte](https://www.namecheap.com/support/)
- **Google Domains:** [Suporte](https://domains.google/support/)

---

## 🎉 **Próximos Passos**

1. **Escolha seu domínio**
2. **Configure DNS**
3. **Adicione no Vercel**
4. **Teste a aplicação**
5. **Configure analytics**

**Seu site estará online em: https://seu-dominio.com** 🚀 