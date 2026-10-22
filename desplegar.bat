@echo off
setlocal
cd /d "%~dp0"
echo === Miquesito - construir y desplegar (Cloudflare Worker + D1) ===
call npm run build || goto :error
call npx wrangler deploy || goto :error
echo.
echo Listo: https://miquesito.eduerking.workers.dev
pause
exit /b 0

:error
echo.
echo Hubo un error. Revise el mensaje de arriba.
pause
exit /b 1
