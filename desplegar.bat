@echo off
setlocal
cd /d "%~dp0"
echo === Miquesito - construir y desplegar a Cloudflare Pages ===
call npm run build || goto :error
call npx wrangler pages deploy dist --project-name=miquesito --branch main || goto :error
echo.
echo Listo: https://miquesito.pages.dev
pause
exit /b 0

:error
echo.
echo Hubo un error. Revise el mensaje de arriba.
pause
exit /b 1
