@echo off
chcp 65001 >nul
title 🎰 Sorteando Weas - Instalador y Ejecutor
color 0E

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║           🎰 SORTEANDO WEAS - INICIADOR COMPLETO 🎰          ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║  Este script instalará, ejecutará y abrirá la aplicación    ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

:: Verificar Node.js
echo [1/5] Verificando Node.js...
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ ERROR: Node.js no está instalado.
    echo    Descarga Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js encontrado: %NODE_VERSION%
echo.

:: Instalar dependencias del Backend
echo [2/5] Instalando dependencias del Backend...
cd /d "%~dp0backend"
if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo ❌ ERROR: Falló la instalación del backend
        pause
        exit /b 1
    )
    echo ✅ Backend instalado correctamente
) else (
    echo ✅ Backend ya tiene dependencias instaladas
)
echo.

:: Instalar dependencias del Frontend
echo [3/5] Instalando dependencias del Frontend...
cd /d "%~dp0frontend"
if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo ❌ ERROR: Falló la instalación del frontend
        pause
        exit /b 1
    )
    echo ✅ Frontend instalado correctamente
) else (
    echo ✅ Frontend ya tiene dependencias instaladas
)
echo.

:: Detener procesos Node existentes en puertos 3001 y 5173
echo [4/5] Liberando puertos...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3001" ^| findstr "LISTENING"') do (
    taskkill /PID %%a /F >nul 2>nul
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do (
    taskkill /PID %%a /F >nul 2>nul
)
echo ✅ Puertos liberados
echo.

:: Iniciar servidores
echo [5/5] Iniciando servidores...
echo.

:: Iniciar Backend en nueva ventana
cd /d "%~dp0backend"
start "Backend - Puerto 3001" cmd /k "title Backend - Puerto 3001 && color 0A && npm run dev"

:: Esperar a que el backend inicie
echo    ⏳ Esperando que el backend inicie...
timeout /t 3 /nobreak >nul

:: Iniciar Frontend en nueva ventana
cd /d "%~dp0frontend"
start "Frontend - Puerto 5173" cmd /k "title Frontend - Puerto 5173 && color 0B && npm run dev"

:: Esperar a que el frontend inicie
echo    ⏳ Esperando que el frontend inicie...
timeout /t 5 /nobreak >nul

:: Abrir navegador
echo.
echo 🌐 Abriendo navegador...
start "" "http://localhost:5173"

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    ✅ ¡TODO LISTO!                           ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║  🌐 Frontend: http://localhost:5173                         ║
echo ║  🔌 Backend:  http://localhost:3001/api                     ║
echo ║  👤 Admin:    http://localhost:5173/admin                   ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║  Para detener: Cierra las ventanas de Backend y Frontend    ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul
