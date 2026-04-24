import urllib.request
import json

API_URL = "http://localhost:8000/participantes"

participantes = [
    {"nombre": "Carlos Mendez",     "email": "carlos.mendez@email.com",     "edad": 25, "ciudad": "Buenos Aires"},
    {"nombre": "Sofia Rodriguez",   "email": "sofia.rodriguez@email.com",   "edad": 22, "ciudad": "Cordoba"},
    {"nombre": "Lucas Martini",     "email": "lucas.martini@email.com",     "edad": 30, "ciudad": "Milano"},
    {"nombre": "Emma Johnson",      "email": "emma.johnson@email.com",      "edad": 27, "ciudad": "New York"},
    {"nombre": "Alejandro Garcia",  "email": "alejandro.garcia@email.com",  "edad": 35, "ciudad": "Madrid"},
    {"nombre": "Ana Lima",          "email": "ana.lima@email.com",          "edad": 29, "ciudad": "Sao Paulo"},
    {"nombre": "Kenji Tanaka",      "email": "kenji.tanaka@email.com",      "edad": 24, "ciudad": "Tokyo"},
    {"nombre": "Marie Dupont",      "email": "marie.dupont@email.com",      "edad": 31, "ciudad": "Paris"},
    {"nombre": "David Wilson",      "email": "david.wilson@email.com",      "edad": 28, "ciudad": "London"},
    {"nombre": "Isabella Ferrari",  "email": "isabella.ferrari@email.com",  "edad": 26, "ciudad": "Roma"},
]

print("Agregando participantes de prueba a TP4M...")
print()

ok = 0
for p in participantes:
    data = json.dumps(p).encode("utf-8")
    req = urllib.request.Request(API_URL, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as response:
            print(f"  OK  {p['nombre']} ({p['ciudad']})")
            ok += 1
    except Exception as e:
        print(f"  ERROR  {p['nombre']}: {e}")

print()
print(f"Resultado: {ok}/{len(participantes)} participantes agregados.")
