# ============================================
# SORTEANDO WEAS - Script de Instalación
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SORTEANDO WEAS - INSTALACIÓN" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
$nodeVersion = node -v 2>$null
if (-not $nodeVersion) {
    Write-Host "❌ Node.js no está instalado. Descárgalo de https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js detectado: $nodeVersion" -ForegroundColor Green

# Obtener directorio raíz del proyecto
$projectRoot = Split-Path $PSScriptRoot -Parent

Write-Host ""
Write-Host "📥 Instalando dependencias..." -ForegroundColor Cyan

# Instalar dependencias Backend
Write-Host "   → Backend..." -ForegroundColor Gray
$backendPath = Join-Path $projectRoot "backend"
Set-Location $backendPath
npm install --silent 2>$null

# Instalar dependencias Frontend
Write-Host "   → Frontend (esto puede tomar unos minutos)..." -ForegroundColor Gray
$frontendPath = Join-Path $projectRoot "frontend"
Set-Location $frontendPath
npm install --silent 2>$null

Set-Location $PSScriptRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ✅ INSTALACIÓN COMPLETADA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Para ejecutar el proyecto:" -ForegroundColor Yellow
Write-Host "   .\EJECUTAR.bat" -ForegroundColor White
Write-Host ""
