@echo off
REM Script para ejecutar automaticamente Backend, Frontend y abrir navegador
REM Gestor de Participantes - TP4M

echo.
echo ====================================
echo    GESTOR DE PARTICIPANTES - TP4M
echo ====================================
echo.

REM Verificar que MySQL este ejecutandose
echo [1/5] Verificando MySQL...
mysql -u root -proot -e "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo ERROR: MySQL no esta ejecutandose o credenciales incorrectas.
    echo Asegurate de:
    echo   - MySQL este iniciado
    echo   - Usuario: root
    echo   - Contrasena: root
    pause
    exit /b 1
)
echo OK - MySQL esta ejecutandose

REM Crear base de datos
echo.
echo [2/5] Creando base de datos...
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS tp4m_db;"
if errorlevel 1 (
    echo ERROR: No se pudo crear la BD
    pause
    exit /b 1
)
echo OK - Base de datos lista

REM Instalar dependencias Backend si es necesario
echo.
echo [3/5] Verificando dependencias de Backend...
cd backend
pip install -q -r requirements.txt >nul 2>&1
echo OK - Backend listo

REM Instalar dependencias Frontend si es necesario
echo.
echo [4/5] Verificando dependencias de Frontend...
cd ..\frontend
call npm install -q >nul 2>&1
echo OK - Frontend listo

REM Iniciar Backend en nueva ventana
echo.
echo [5/5] Iniciando servidores...
cd ..\backend
start "Backend FastAPI" cmd /k "uvicorn main:app --reload"
timeout /t 3 /nobreak

REM Iniciar Frontend en nueva ventana
cd ..\frontend
start "Frontend React" cmd /k "npm run dev"
timeout /t 5 /nobreak

REM Abrir navegador
echo.
echo ====================================
echo  Abriendo navegador en 5 segundos...
echo ====================================
echo.
timeout /t 5 /nobreak
start http://localhost:5173

echo.
echo ====================================
echo  Aplicacion iniciada correctamente!
echo ====================================
echo.
echo URLS:
echo   Frontend:  http://localhost:5173
echo   Backend:   http://localhost:8000
echo   MySQL:     localhost:3306
echo.
echo Para detener la aplicacion:
echo   - Cierra las ventanas de Backend y Frontend
echo.
echo Puedes verificar los datos en MySQL Workbench:
echo   SELECT * FROM tp4m_db.participantes;
echo.
pause
