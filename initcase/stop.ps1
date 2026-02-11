# ============================================
# SORTEANDO WEAS - Script de Detención
# ============================================

Write-Host ""
Write-Host "🛑 Deteniendo servidores..." -ForegroundColor Yellow

Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "✅ Servidores detenidos" -ForegroundColor Green
Write-Host ""
