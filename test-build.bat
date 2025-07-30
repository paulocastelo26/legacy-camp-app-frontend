@echo off
echo ========================================
echo    🧪 Test Build - Angular 19
echo ========================================
echo.

echo 📦 Fazendo build...
npm run build

echo.
echo 📁 Verificando estrutura Angular 19...
if exist dist\acampamento-frontend\browser\index.html (
    echo ✅ SUCCESS: index.html encontrado!
    echo 📂 Estrutura correta:
    dir dist\acampamento-frontend\browser
    echo.
    echo 🎯 Vercel configurado para: dist/acampamento-frontend/browser
    echo ✅ Deploy deve funcionar agora!
) else (
    echo ❌ ERRO: index.html não encontrado
    echo 📂 Estrutura atual:
    dir dist\acampamento-frontend
)

echo.
pause 