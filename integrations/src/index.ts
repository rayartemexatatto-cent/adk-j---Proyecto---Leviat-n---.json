#!/usr/bin/env python3
"""
🆔 AGENTE DE IDENTIDAD — Gestión de correos y dominios del ecosistema
"""

IDENTIDADES = {
    "outlook": {
        "email": "leviatan.centinel.levi@outlook.com",
        "tipo": "Microsoft",
        "usos": ["Excel Online", "Azure", "Power Automate", "Outlook"],
        "prioridad": "alta"
    },
    "hotmail": {
        "email": "leviatan.centinel.levi@hotmail.com",
        "tipo": "Microsoft (Legacy)",
        "usos": ["Respaldo", "Recuperación"],
        "prioridad": "media"
    },
    "gmail": {
        "email": "leviatan.centinel.levi@gmail.com",
        "tipo": "Google",
        "usos": ["Google Drive", "AI Studio", "NotebookLM", "Gemini", "Play Store"],
        "prioridad": "alta"
    },
    "dominio": {
        "url": "leviatan-centinel-levi.org",
        "tipo": "Dominio Propio",
        "usos": ["Google Workspace", "Email personalizado", "Azure AD"],
        "prioridad": "estratégica"
    }
}

# ─── VERIFICADOR DE IDENTIDADES ──────────────
def verificar_identidades():
    """Verifica el estado de todas las identidades"""
    print("🆔 VERIFICANDO IDENTIDADES DEL ECOSISTEMA")
    print("=" * 50)
    
    for clave, identidad in IDENTIDADES.items():
        print(f"""
  📧 {identidad['email'] if 'email' in identidad else identidad['url']}
     Tipo: {identidad['tipo']}
     Usos: {', '.join(identidad['usos'])}
     Prioridad: {identidad['prioridad']}
""")

# ─── MAPEO DE IDENTIDADES A SERVICIOS ─────────
MAPA_IDENTIDAD_SERVICIOS = {
    "gmail": ["drive", "gemini", "notebooklm", "playstore", "youtube"],
    "outlook": ["excel_online", "azure_ad", "power_automate", "outlook"],
    "dominio": ["workspace_admin", "email_propio", "super_admin"],
}

def obtener_servicios_por_identidad(identidad: str):
    """Devuelve los servicios disponibles para una identidad"""
    servicios = MAPA_IDENTIDAD_SERVICIOS.get(identidad, [])
    return servicios

if __name__ == "__main__":
    verificar_identidades()
