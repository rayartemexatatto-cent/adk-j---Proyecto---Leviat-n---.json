#!/usr/bin/env python3
"""
📦 AGENTE DE DEPENDENCIAS — Gestión del ADK y paquetes
"""

import json
import os

# ─── CONFIGURACIÓN DEL ADK ───────────────────
ADK_CONFIG = {
    "name": "adk",
    "version": "1.4.0",
    "license": "Apache-2.0",
    "workspaces": ["core", "dev", "integrations"],
    "ecosistema": "LeviataNΨI0.0"
}

# ─── MAPEO DE WORKSPACES ─────────────────────
WORKSPACES = {
    "core": {
        "descripcion": "Núcleo del ADK",
        "dependencias": ["python3", "flask", "watchdog"],
        "agentes": ["agente_autonomo.py", "agente_mapeador_reactivo.py"]
    },
    "dev": {
        "descripcion": "Herramientas de desarrollo",
        "dependencias": ["git", "gradle", "kotlin"],
        "agentes": ["agente_dev_google.py", "forja_griega.py"]
    },
    "integrations": {
        "descripcion": "Integraciones externas",
        "dependencias": ["google-genai", "msal", "requests"],
        "agentes": ["puente_react_drive.py", "agente_schema_org.py"]
    }
}

# ─── GENERAR package.json ────────────────────
def generar_package_lock():
    """Genera el archivo de bloqueo de paquetes"""
    
    package_lock = {
        "name": ADK_CONFIG["name"],
        "version": ADK_CONFIG["version"],
        "lockfileVersion": 3,
        "requires": True,
        "ecosistema": ADK_CONFIG["ecosistema"],
        "packages": {
            "": {
                "name": ADK_CONFIG["name"],
                "version": ADK_CONFIG["version"],
                "license": ADK_CONFIG["license"],
                "workspaces": ADK_CONFIG["workspaces"]
            }
        },
        "workspaces_detail": WORKSPACES
    }
    
    ruta = os.path.expanduser("~/Leviatan-Nexus/package-lock.json")
    with open(ruta, 'w') as f:
        json.dump(package_lock, f, indent=2)
    
    print(f"📦 package-lock.json generado: {ruta}")
    return package_lock

if __name__ == "__main__":
    generar_package_lock()
