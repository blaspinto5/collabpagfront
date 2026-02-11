# 🎰 Sorteando Weas - Scripts de Instalación

## Prerrequisitos

- **Windows 10/11**
- **Node.js 18+** → [Descargar](https://nodejs.org)

---

## 🚀 Instalación

Doble clic en **INSTALAR.bat** o:

```powershell
.\install.ps1
```

---

## ▶️ Ejecutar

Doble clic en **EJECUTAR.bat** o:

```powershell
.\run.ps1
```

---

## ⏹️ Detener

```powershell
.\stop.ps1
```

---

## 🔧 Solución de problemas

### "No se puede ejecutar scripts"
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Puerto ocupado
```powershell
.\stop.ps1
.\run.ps1
```

---

## 🌐 URLs

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3001/api |
