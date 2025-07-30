@echo off
echo ========================================
echo    🚀 Setup GitHub - Legacy Camp
echo ========================================
echo.

echo 📋 Verificando Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git não está instalado!
    echo 📥 Baixe em: https://git-scm.com/
    pause
    exit /b 1
)
echo ✅ Git encontrado!

echo.
echo 🔧 Configurando Git...
echo.

set /p USER_NAME="Digite seu nome: "
set /p USER_EMAIL="Digite seu email: "
set /p GITHUB_USER="Digite seu username do GitHub: "

echo.
echo 📝 Configurando usuário Git...
git config user.name "%USER_NAME%"
git config user.email "%USER_EMAIL%"

echo.
echo 📁 Verificando status do repositório...
git status

echo.
echo 📤 Adicionando arquivos...
git add .

echo.
echo 💾 Fazendo primeiro commit...
git commit -m "🎉 Initial commit: Legacy Camp - Sistema de Inscrições

- Frontend Angular com formulário completo
- Backend NestJS com API REST  
- Configurações de deploy (Vercel, Railway, Render)
- Documentação completa
- Guias de instalação e configuração"

echo.
echo 🔗 Configurando remote do GitHub...
git remote add origin https://github.com/%GITHUB_USER%/legacy-camp-app.git

echo.
echo 📋 Próximos passos:
echo.
echo 1. 🌐 Acesse: https://github.com/new
echo 2. 📝 Nome do repositório: legacy-camp-app
echo 3. 📄 Descrição: Sistema de inscrições para o Legacy Camp
echo 4. 🌍 Visibilidade: Public (recomendado)
echo 5. ❌ NÃO marque: Add README, .gitignore, license
echo 6. ✅ Clique em "Create repository"
echo.
echo 7. 🚀 Depois execute: git push -u origin main
echo.

echo ========================================
echo    ✅ Setup concluído!
echo ========================================
echo.
echo 📚 Consulte o arquivo GITHUB_SETUP.md para mais detalhes
echo.
pause 