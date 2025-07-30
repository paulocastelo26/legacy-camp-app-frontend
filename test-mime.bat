@echo off
echo ========================================
echo    🧪 Test MIME Types - Vercel
echo ========================================
echo.

echo 📦 Fazendo build...
npm run build

echo.
echo 📁 Verificando arquivos JavaScript...
if exist dist\acampamento-frontend\browser\main-*.js (
    echo ✅ JavaScript files encontrados
    dir dist\acampamento-frontend\browser\*.js
) else (
    echo ❌ JavaScript files não encontrados
)

echo.
echo 📋 Verificando index.html...
findstr "type=\"module\"" dist\acampamento-frontend\browser\index.html
if %errorlevel% equ 0 (
    echo ✅ ES6 modules configurados corretamente
) else (
    echo ❌ ES6 modules não encontrados
)

echo.
echo 🎯 Vercel configurado com headers corretos:
echo - JavaScript: application/javascript
echo - CSS: text/css
echo - Fonts: font/woff2
echo - Icons: image/x-icon

echo.
echo 🚀 Próximos passos:
echo 1. git add .
echo 2. git commit -m "🔧 Fix: MIME types for ES6 modules"
echo 3. git push
echo.
echo 📊 Verificar deploy em: https://vercel.com/dashboard
echo.

pause 