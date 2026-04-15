# Gestor de Participantes - TP4M

## Estructura del Proyecto

```
tp4M/
├── backend/
│   ├── main.py           # API FastAPI
│   ├── models.py         # Modelos SQLAlchemy
│   ├── schemas.py        # Esquemas Pydantic
│   ├── database.py       # Configuración de BD
│   └── requirements.txt   # Dependencias Python
│
└── frontend/
    ├── src/
    │   ├── context/
    │   │   └── ParticipantesContext.tsx
    │   ├── components/
    │   │   ├── Formulario.tsx
    │   │   ├── Filtros.tsx
    │   │   └── ParticipanteCard.tsx
    │   ├── models/
    │   │   └── Participante.ts
    │   ├── Home.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── index.html
```

## Instrucciones de Instalación

### Backend (Python + FastAPI)

1. **Navega a la carpeta backend:**
   ```bash
   cd backend
   ```

2. **Instala las dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Crea la base de datos en MySQL:**
   - Abre MySQL Workbench
   - Ejecuta:
   ```sql
   CREATE DATABASE tp4m_db;
   ```

4. **Inicia el servidor FastAPI:**
   ```bash
   uvicorn main:app --reload
   ```

El API estará disponible en: `http://localhost:8000`

### Frontend (React + TypeScript + Vite)

1. **Navega a la carpeta frontend:**
   ```bash
   cd frontend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

El frontend estará disponible en: `http://localhost:5173`

## API Endpoints

### GET /participantes
Obtiene la lista completa de participantes.

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "email": "juan@example.com",
    "edad": 25,
    "ciudad": "Buenos Aires"
  }
]
```

### POST /participantes
Crea un nuevo participante.

**Request:**
```json
{
  "nombre": "Juan",
  "email": "juan@example.com",
  "edad": 25,
  "ciudad": "Buenos Aires"
}
```

**Response:**
```json
{
  "id": 1,
  "nombre": "Juan",
  "email": "juan@example.com",
  "edad": 25,
  "ciudad": "Buenos Aires"
}
```

### DELETE /participantes/{id}
Elimina un participante por ID.

**Response:**
```json
{
  "message": "Participante eliminado correctamente"
}
```

## Características Principales

✅ **Backend API REST** con FastAPI y MySQL
✅ **Context API** para gestionar estado global
✅ **CRUD Completo** (Create, Read, Update, Delete)
✅ **Filtrado en tiempo real** de participantes
✅ **Validación de formularios**
✅ **CORS habilitado** para comunicación frontend-backend

## Notas Importantes

- El backend se ejecuta en el puerto 8000
- El frontend se ejecuta en el puerto 5173
- Asegúrate de tener MySQL corriendo antes de iniciar el backend
- La base de datos `tp4m_db` se crea automáticamente por las migraciones de FastAPI
