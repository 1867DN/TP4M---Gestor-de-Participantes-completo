# Guía Técnica - Gestor de Participantes

## 🏗 Arquitectura General

```
Frontend (React + TypeScript)
    ↓ (HTTP JSON)
Backend API (FastAPI)
    ↓ (SQL)
MySQL Database
```

---

## 🎯 Backend (Python + FastAPI)

### Estructura

```
backend/
├── main.py          # Endpoints API
├── models.py        # Modelos SQLAlchemy (BD)
├── schemas.py       # Esquemas Pydantic (validación)
├── database.py      # Conexión MySQL
└── requirements.txt # Dependencias
```

### Endpoints

| Método | Ruta | Función |
|--------|------|---------|
| `GET` | `/participantes` | Obtiene todos los participantes |
| `POST` | `/participantes` | Crea un nuevo participante |
| `DELETE` | `/participantes/{id}` | Elimina un participante |

### Ejemplo de Datos

**GET /participantes:**
```json
[
  {
    "id": 1,
    "nombre": "Leandro Nuñez",
    "email": "leandro@example.com",
    "edad": 24,
    "ciudad": "Los Corralitos"
  }
]
```

**POST /participantes:**
```json
{
  "nombre": "Juan",
  "email": "juan@example.com",
  "edad": 25,
  "ciudad": "Buenos Aires"
}
```

### Configuración de Base de Datos

Archivo: `database.py`

```python
DATABASE_URL = "mysql+mysqlconnector://root:root@localhost:3306/tp4m_db"
```

- **Usuario:** root
- **Contraseña:** root
- **Host:** localhost:3306
- **Base de datos:** tp4m_db

### Tabla Participantes

```sql
CREATE TABLE participantes (
    id INTEGER NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    edad INTEGER,
    ciudad VARCHAR(100),
    PRIMARY KEY (id)
)
```

---

## ⚛️ Frontend (React + TypeScript + Vite)

### Estructura

```
frontend/src/
├── context/
│   └── ParticipantesContext.tsx    # Context API global
├── components/
│   ├── Formulario.tsx              # Form para agregar
│   ├── ParticipanteCard.tsx        # Tarjeta de participante
│   └── Filtros.tsx                 # Búsqueda (no usado actualmente)
├── models/
│   └── Participante.ts             # Interfaz TypeScript
├── Home.tsx                        # Página principal
└── main.tsx                        # Entry point
```

### Context API (ParticipantesContext)

Maneja el estado global de participantes:

```typescript
interface ContextType {
  participantes: Participante[];
  agregar: (p: Participante) => Promise<void>;
  eliminar: (id: number) => Promise<void>;
  resetear: () => void;
  loading: boolean;
}
```

**Funcionalidades:**
- ✅ Carga inicial de participantes (GET)
- ✅ Agregar nuevo participante (POST)
- ✅ Eliminar participante (DELETE)
- ✅ Estado de carga

### Componentes

#### Formulario.tsx
- Formulario con validación
- Campos: nombre, email, edad, ciudad
- Llama al método `agregar` del Context

#### ParticipanteCard.tsx
- Muestra info del participante
- Botón para eliminar
- Tarjetas en grid 3x3

#### Home.tsx
- Página principal
- Integra todos los componentes
- Implementa filtro en tiempo real

### Consumo de API

**Con axios:**
```typescript
const response = await axios.get('http://localhost:8000/participantes');
const response = await axios.post('http://localhost:8000/participantes', data);
await axios.delete(`http://localhost:8000/participantes/${id}`);
```

---

## 🔄 Flujo de Datos

### Agregar Participante

```
Usuario llena formulario
    ↓
Click "Agregar"
    ↓
Context.agregar() → axios.post()
    ↓
Backend recibe POST /participantes
    ↓
SQLAlchemy inserta en MySQL
    ↓
Retorna objeto con ID
    ↓
Context actualiza participantes[]
    ↓
React re-renderiza Home
    ↓
Nueva tarjeta aparece en pantalla
```

### Eliminar Participante

```
Usuario clickea "Eliminar"
    ↓
Context.eliminar(id) → axios.delete()
    ↓
Backend recibe DELETE /participantes/2
    ↓
SQLAlchemy elimina de MySQL
    ↓
Context actualiza participantes[]
    ↓
React re-renderiza Home
    ↓
Tarjeta desaparece de pantalla
```

### Filtrar Participantes

```
Usuario escribe en buscador
    ↓
setFiltro(texto)
    ↓
participantesFiltrados = participantes.filter()
    ↓
React re-renderiza con resultados filtrados
```

---

## 📦 Dependencias

### Backend

```
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
mysql-connector-python==8.2.0
pydantic==2.5.0
python-dotenv==1.0.0
```

### Frontend

```
react@^18.2.0
react-dom@^18.2.0
axios@^1.6.0
vite@^5.0.0
typescript@^5.3.0
```

---

## 🔐 CORS

Configurado en `main.py` para permitir:
- `http://localhost:5173` (desarrollo)
- `http://localhost:3000` (alternativo)

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🎨 Estilos

### Home
- Fondo: #f5f5f5
- Header: #2196F3 (azul)

### Formulario
- Fondo: blanco (#ffffff)
- Botón: verde (#4CAF50)

### Tarjetas
- Grid: 3 columnas
- Bordes: verde (#4CAF50)
- Botón eliminar: rojo (#f44336)

---

## 🚀 Optimizaciones Futuras

1. Agregar paginación si hay muchos participantes
2. Agregar edición de participantes
3. Exportar datos a CSV/PDF
4. Validación más robusta en el backend
5. Autenticación de usuarios
6. Tests automatizados
7. Despliegue en la nube (Heroku, Vercel)

---

## 📚 Referencias

- **FastAPI:** https://fastapi.tiangolo.com/
- **React Hooks:** https://react.dev/reference/react
- **Axios:** https://axios-http.com/
- **SQLAlchemy:** https://docs.sqlalchemy.org/
- **TypeScript:** https://www.typescriptlang.org/
