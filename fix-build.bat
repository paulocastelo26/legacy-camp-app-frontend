@echo off
echo ========================================
echo    🔧 Fix Build - Legacy Camp
echo ========================================
echo.

echo 📋 Verificando dependências...
npm install

echo.
echo 🧹 Limpando cache...
npm run clean
if exist dist rmdir /s /q dist
if exist .angular rmdir /s /q .angular

echo.
echo 🔧 Verificando configuração...
echo - Angular CLI: 
ng version

echo.
echo 📦 Testando build local...
npm run build

echo.
echo ✅ Build concluído!
echo.
echo 📁 Verificando arquivos gerados...
if exist dist\acampamento-frontend\browser (
    echo ✅ Diretório dist criado com sucesso
    echo 📂 Estrutura Angular 19:
    dir dist\acampamento-frontend
    echo.
    echo 📂 Conteúdo browser:
    dir dist\acampamento-frontend\browser
) else (
    echo ❌ Erro: Diretório dist não foi criado
)

echo.
echo 🚀 Próximos passos:
echo 1. git add .
echo 2. git commit -m "🔧 Fix: Build configuration"
echo 3. git push
echo.
echo 📊 Verificar deploy em: https://vercel.com/dashboard
echo.

pause 