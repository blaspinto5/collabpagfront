# ============================================
# SORTEANDO WEAS - Script de Ejecución
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SORTEANDO WEAS - INICIANDO" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = Split-Path $PSScriptRoot -Parent
$backendPath = Join-Path $projectRoot "backend"
$frontendPath = Join-Path $projectRoot "frontend"

# Verificar que existan node_modules
if (-not (Test-Path (Join-Path $backendPath "node_modules"))) {
    Write-Host "❌ Dependencias no instaladas." -ForegroundColor Red
    Write-Host "   Ejecuta primero: .\INSTALAR.bat" -ForegroundColor Yellow
    exit 1
}

# Detener procesos Node existentes
Write-Host "🧹 Limpiando puertos..." -ForegroundColor Gray
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Iniciar Backend
Write-Host "🚀 Iniciando Backend (puerto 3001)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 2

# Iniciar Frontend
Write-Host "🚀 Iniciando Frontend (puerto 5173)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ✅ SERVIDORES INICIADOS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "🔌 Backend:  http://localhost:3001" -ForegroundColor Yellow
Write-Host ""
Write-Host "Abriendo navegador..." -ForegroundColor Gray

Start-Sleep -Seconds 2
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "💡 Para detener: cierra las ventanas de PowerShell" -ForegroundColor Gray
Write-Host "   o ejecuta: .\stop.ps1" -ForegroundColor Gray
Write-Host ""
