@echo off
chcp 65001 >nul
title 🌐 Sorteando Weas - Publicar en Internet
color 0D

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║        🌐 SORTEANDO WEAS - PUBLICAR EN INTERNET 🌐           ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║  Este script publicará tu sitio en Internet con ngrok       ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

:: Verificar ngrok
echo [1/5] Verificando ngrok...
where ngrok >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ ERROR: ngrok no está instalado o no está en el PATH.
    echo    Descarga ngrok desde: https://ngrok.com/download
    echo    Y agrégalo al PATH del sistema.
    pause
    exit /b 1
)
echo ✅ ngrok encontrado
echo.

:: Detener procesos existentes
echo [2/5] Liberando puertos...
taskkill /F /IM ngrok.exe >nul 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3001" ^| findstr "LISTENING"') do (
    taskkill /PID %%a /F >nul 2>nul
)
echo ✅ Puertos liberados
echo.

:: Build del frontend
echo [3/5] Construyendo frontend para producción...
cd /d "%~dp0frontend"
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ ERROR: Falló la construcción del frontend
    pause
    exit /b 1
)
echo ✅ Frontend construido
echo.

:: Copiar build al backend
echo [4/5] Configurando servidor para producción...
if exist "%~dp0backend\public" rmdir /s /q "%~dp0backend\public"
xcopy /E /I /Y "%~dp0frontend\dist" "%~dp0backend\public" >nul
echo ✅ Archivos copiados
echo.

:: Iniciar backend en modo producción
echo [5/5] Iniciando servidor y túnel ngrok...
cd /d "%~dp0backend"
start "Backend Producción" cmd /k "title Servidor Produccion && color 0A && set NODE_ENV=production && node server.js"

:: Esperar que el servidor inicie
timeout /t 3 /nobreak >nul

:: Iniciar ngrok
echo.
echo 🚀 Iniciando túnel ngrok...
echo.
start "ngrok" cmd /k "title ngrok Tunnel && color 0E && ngrok http 3001"

timeout /t 5 /nobreak >nul

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                 ✅ ¡SITIO PUBLICADO!                         ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║  📋 Revisa la ventana de ngrok para ver tu URL pública      ║
echo ║     Ejemplo: https://abc123.ngrok-free.app                  ║
echo ║                                                              ║
echo ║  🔗 Comparte esa URL para que otros accedan a tu sitio      ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║  Para detener: Cierra las ventanas de ngrok y el servidor   ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
pause
