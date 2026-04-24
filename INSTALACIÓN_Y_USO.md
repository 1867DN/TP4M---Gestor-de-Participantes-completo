# Gestor de Participantes - Instalación y Uso

## 🚀 Inicio Rápido (Recomendado)

### Opción 1: Script Automático (Windows)

1. **Descarga el proyecto en tu PC**
2. **Abre una terminal en la carpeta `tp4M`**
3. **Ejecuta:**
```bash
autom\run.bat
```

Esto hará todo automáticamente:
- ✅ Crea la base de datos
- ✅ Instala dependencias (si es necesario)
- ✅ Inicia el Backend (FastAPI)
- ✅ Inicia el Frontend (React)
- ✅ Abre el navegador en `http://localhost:5173`

---

## 📋 Instalación Manual Paso a Paso

Si prefieres hacerlo manualmente o en otra plataforma:

### Paso 1: Crear la Base de Datos

**En MySQL Workbench:**
```sql
CREATE DATABASE tp4m_db;
```

### Paso 2: Instalar Dependencias

#### Backend (Python)
```bash
cd backend
pip install -r requirements.txt
```

#### Frontend (Node.js)
```bash
cd frontend
npm install
```

### Paso 3: Ejecutar en Terminales Separadas

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn main:app --reload
```
Se ejecutará en: `http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Se ejecutará en: `http://localhost:5173`

---

## 🎯 Uso de la Aplicación

### Agregar Participante
1. Llena el formulario con:
   - Nombre
   - Email
   - Edad
   - Ciudad
2. Clickea **"Agregar"**
3. Aparecerá en la lista automáticamente

### Buscar Participante
- Usa la barra de búsqueda para filtrar por:
  - Nombre
  - Email
  - Ciudad
  - Edad

### Eliminar Participante
1. Encuentra la tarjeta del participante
2. Clickea **"Eliminar"**
3. Se eliminará inmediatamente de la BD

### Verificar en MySQL

**Abre MySQL Workbench y ejecuta:**

```sql
SELECT * FROM tp4m_db.participantes;
```

Deberías ver todos los participantes registrados.

---

## 🔧 Requisitos Previos

- **Python 3.10+**
- **Node.js 16+**
- **MySQL 5.7+**
- **MySQL Workbench** (para visualizar la BD)

---

## 📁 Estructura del Proyecto

```
tp4M/
├── autom/
│   ├── run.bat                   # Arranca backend, frontend y navegador
│   ├── seed_participantes.bat    # Agrega 10 participantes de prueba
│   └── seed_participantes.py     # Script Python del seed
├── backend/
│   ├── main.py           # API FastAPI
│   ├── models.py         # Modelos SQLAlchemy
│   ├── schemas.py        # Esquemas Pydantic
│   ├── database.py       # Configuración MySQL (lee desde .env)
│   ├── requirements.txt
│   ├── create_db.sql     # Script SQL para crear BD
│   └── .env              # Credenciales de base de datos
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── ParticipantesContext.tsx
│   │   ├── components/
│   │   │   ├── Formulario.tsx
│   │   │   ├── ParticipanteCard.tsx
│   │   │   └── Filtros.tsx
│   │   ├── models/
│   │   │   └── Participante.ts
│   │   ├── Home.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
└── README.md
```

---

## 🌐 Puertos

- **Backend:** `http://127.0.0.1:8000`
- **Frontend:** `http://localhost:5173`
- **MySQL:** `localhost:3306`

---

## 🐛 Solución de Problemas

### "Puerto 8000 en uso"
```bash
lsof -i :8000  # en Linux/Mac
netstat -ano | findstr :8000  # en Windows
```

### "Base de datos no existe"
Ejecuta en MySQL Workbench:
```sql
CREATE DATABASE tp4m_db;
```

### "npm: comando no encontrado"
Instala Node.js desde: https://nodejs.org/

### "python: comando no encontrado"
Instala Python desde: https://www.python.org/

---

## 🔍 Comandos útiles de MySQL

### Ver todos los participantes
```sql
SELECT * FROM tp4m_db.participantes;
```

### Contar participantes
```sql
SELECT COUNT(*) FROM tp4m_db.participantes;
```

### Ver estructura de la tabla
```sql
DESCRIBE tp4m_db.participantes;
```

### Eliminar todos los datos (reiniciar)
```sql
DELETE FROM tp4m_db.participantes;
```

### Resetear ID a 1
```sql
ALTER TABLE tp4m_db.participantes AUTO_INCREMENT = 1;
```

---

Para verificar que todo funciona:

1. ✅ Agrega 3 participantes
2. ✅ Busca por nombre
3. ✅ Busca por edad
4. ✅ Elimina uno
5. ✅ Verifica en MySQL que se eliminó
6. ✅ Agrega otro nuevo
7. ✅ Verifica que el ID es secuencial

---

## 📝 Notas Importantes

- Los datos se guardan en MySQL automáticamente
- No es necesario recargar la página para ver cambios
- El filtro es en tiempo real
- El CORS está configurado para el localhost
