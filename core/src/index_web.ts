#!/usr/bin/env python3
"""
🐲 AGENTE DE PROYECTOS — Gestión de entidades del ecosistema Leviatán
"""

PROYECTOS = {
    "principal": {
        "nombre": "🐲-~Proyecto-Ψ-Leviatán~-🐉",
        "carpeta": "Leviatan-Nexus",
        "descripcion": "Proyecto raíz del ecosistema"
    },
    "asistente": {
        "nombre": "Alfred-Pennyworth.ArmonicO",
        "carpeta": "Alfred-Pennyworth.ArmonicO",
        "descripcion": "Agente mapeador reactivo y mayordomo digital"
    },
    "ia_nucleo": {
        "nombre": "🧠NeuronaL👁️💎←(o_O)",
        "carpeta": "NeuronaL",
        "descripcion": "Núcleo de procesamiento de IA simbólica"
    },
    "panel": {
        "nombre": "Ceηtriχ⊷BoΑrd",
        "carpeta": "CentrixBoard",
        "descripcion": "Panel de control del ecosistema"
    },
    "kernel": {
        "nombre": "LeviataNΨI0.0",
        "carpeta": "LeviataN-Kernel",
        "descripcion": "Kernel y núcleo de ejecución"
    },
    "cristal": {
        "nombre": "CrisTaLeSΨMAGICΨ",
        "carpeta": "crystalsMAGIC",
        "descripcion": "Sistema de blindaje y encriptación"
    }
}

# ─── ESTRUCTURA DE CARPETAS ──────────────────
def crear_estructura_proyectos():
    """Crea la estructura de carpetas para todos los proyectos"""
    import os
    
    base = os.path.expanduser("~/Leviatan-Nexus")
    
    for clave, proyecto in PROYECTOS.items():
        ruta = os.path.join(base, proyecto["carpeta"])
        os.makedirs(ruta, exist_ok=True)
        print(f"📁 {proyecto['nombre']} → {ruta}")
    
    print("\n✅ Estructura de proyectos creada")

if __name__ == "__main__":
    crear_estructura_proyectos()
