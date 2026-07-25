#!/usr/bin/env python3
"""
🌉 PUENTE LLM — Transferencia entre agentes para NEXUS ENOCK-CENTRIX
Basado en Google ADK AgentTransferLlmRequestProcessor
Licencia: Apache 2.0
"""

import json
from typing import List, Dict, Optional
from dataclasses import dataclass, field

# ─── DEFINICIÓN DE AGENTES ───────────────────
@dataclass
class AgenteLLM:
    """Definición de un agente transferible"""
    nombre: str
    descripcion: str
    modelo: str
    capaz_de: List[str] = field(default_factory=list)
    sub_agentes: List['AgenteLLM'] = field(default_factory=list)
    agente_padre: Optional['AgenteLLM'] = None
    prohibir_transferencia_a_padre: bool = False
    prohibir_transferencia_a_pares: bool = False

# ─── DEFINICIÓN DE AGENTES DEL ECOSISTEMA ─────
CENTRIX = AgenteLLM(
    nombre="Centrix",
    descripcion="Núcleo de IA del ecosistema Enock. Especialista en análisis simbólico, "
                "valores ISB01, y orquestación de agentes. Usa DeepSeek como backend.",
    modelo="deepseek-chat",
    capaz_de=["simbolos", "etica", "orquestacion", "analisis", "documentacion"]
)

GEMINI_AGENT = AgenteLLM(
    nombre="Gemini",
    descripcion="Agente de Google AI. Especialista en búsqueda web, generación de imágenes, "
                "razonamiento complejo (Thinking HIGH), y diseño UI/UX.",
    modelo="gemini-3-pro-preview",
    capaz_de=["busqueda", "imagenes", "diseno", "razonamiento", "investigacion"]
)

ALFRED = AgenteLLM(
    nombre="Alfred",
    descripcion="Mayordomo digital. Especialista en mapeo de archivos, vigilancia de carpetas, "
                "auditoría de cambios y ejecución de scripts.",
    modelo="deepseek-chat",
    capaz_de=["archivos", "vigilancia", "auditoria", "ejecucion", "mapas"]
)

FORJA_GRIEGA = AgenteLLM(
    nombre="ForjaGriega",
    descripcion="Agente especializado en la capa de abstracción griega (Logos, Techne, Areté, Kosmos). "
                "Procesa comandos con letras griegas y ejecuta flujos de forja.",
    modelo="deepseek-chat",
    capaz_de=["griego", "abstraccion", "filosofia", "compilacion"]
)

DEV_GOOGLE = AgenteLLM(
    nombre="DevGoogle",
    descripcion="Agente desarrollador con mapa completo de Google Developers. "
                "Diagnostica errores y genera soluciones automáticas.",
    modelo="gemini-3-flash-preview",
    capaz_de=["desarrollo", "debugging", "google_apis", "soluciones"]
)

# ─── CONFIGURACIÓN DE JERARQUÍA ──────────────
CENTRIX.sub_agentes = [ALFRED, FORJA_GRIEGA, DEV_GOOGLE]
GEMINI_AGENT.sub_agentes = [DEV_GOOGLE]
ALFRED.agente_padre = CENTRIX
FORJA_GRIEGA.agente_padre = CENTRIX
DEV_GOOGLE.agente_padre = CENTRIX

# ─── PUENTE DE TRANSFERENCIA ─────────────────
class PuenteTransferenciaLLM:
    """Implementa la lógica de transferencia entre agentes LLM"""
    
    def __init__(self):
        self.agentes = [CENTRIX, GEMINI_AGENT, ALFRED, FORJA_GRIEGA, DEV_GOOGLE]
        self.historial_transferencias = []
    
    def obtener_agentes_transferibles(self, agente_actual: AgenteLLM) -> List[AgenteLLM]:
        """Obtiene los agentes a los que se puede transferir"""
        objetivos = []
        
        # Sub-agentes
        objetivos.extend(agente_actual.sub_agentes)
        
        # Agente padre
        if (agente_actual.agente_padre and 
            not agente_actual.prohibir_transferencia_a_padre):
            objetivos.append(agente_actual.agente_padre)
        
        # Agentes pares (hermanos)
        if (agente_actual.agente_padre and 
            not agente_actual.prohibir_transferencia_a_pares):
            pares = [
                a for a in agente_actual.agente_padre.sub_agentes
                if a.nombre != agente_actual.nombre
            ]
            objetivos.extend(pares)
        
        return objetivos
    
    def generar_instrucciones_transferencia(self, agente_actual: AgenteLLM) -> str:
        """Genera las instrucciones de transferencia para el prompt del LLM"""
        objetivos = self.obtener_agentes_transferibles(agente_actual)
        
        if not objetivos:
            return ""
        
        instrucciones = f"""
🔀 AGENTES DISPONIBLES PARA TRANSFERENCIA:

{chr(10).join(f'🤖 {a.nombre}: {a.descripcion} (Capaz de: {", ".join(a.capaz_de)})' for a in objetivos)}

⚡ REGLAS DE TRANSFERENCIA:
1. Si eres el mejor para resolver la tarea según tu descripción, resuélvela tú.
2. Si otro agente es más adecuado, transfiere el control usando el comando:
   🦾 TRANSFERIR → [nombre del agente]
3. Al transferir, no generes texto adicional.
"""
        
        if agente_actual.agente_padre:
            instrucciones += f"""
4. Si ningún agente (incluido tú) es el mejor, transfiere a tu agente padre: {agente_actual.agente_padre.nombre}
"""
        
        return instrucciones
    
    def transferir(self, desde: AgenteLLM, hacia_nombre: str) -> Dict:
        """Ejecuta una transferencia de un agente a otro"""
        objetivos = self.obtener_agentes_transferibles(desde)
        agente_destino = next((a for a in objetivos if a.nombre == hacia_nombre), None)
        
        if not agente_destino:
            return {
                "error": f"Agente '{hacia_nombre}' no encontrado como transferible",
                "agentes_disponibles": [a.nombre for a in objetivos]
            }
        
        transferencia = {
            "timestamp": __import__('datetime').datetime.now().isoformat(),
            "desde": desde.nombre,
            "hacia": agente_destino.nombre,
            "modelo_destino": agente_destino.modelo
        }
        
        self.historial_transferencias.append(transferencia)
        
        return {
            "status": "✅ Transferencia exitosa",
            "transferencia": transferencia,
            "instrucciones_para_destino": self.generar_instrucciones_transferencia(agente_destino)
        }
    
    def decidir_agente(self, tarea: str) -> AgenteLLM:
        """Decide qué agente es el más adecuado para una tarea (simulación)"""
        puntuaciones = {}
        
        for agente in self.agentes:
            puntuacion = 0
            for capacidad in agente.capaz_de:
                if capacidad in tarea.lower():
                    puntuacion += 1
            puntuaciones[agente.nombre] = puntuacion
        
        mejor_agente = max(puntuaciones, key=puntuaciones.get)
        
        if puntuaciones[mejor_agente] == 0:
            return CENTRIX  # Default
        
        return next(a for a in self.agentes if a.nombre == mejor_agente)

# ─── DEMOSTRACIÓN ────────────────────────────
if __name__ == "__main__":
    puente = PuenteTransferenciaLLM()
    
    print("🌉 PUENTE LLM — ECOSISTEMA ENOCK-CENTRIX")
    print("=" * 50)
    
    # Mostrar instrucciones para Centrix
    print("\n📋 Instrucciones de transferencia para Centrix:")
    print(puente.generar_instrucciones_transferencia(CENTRIX))
    
    # Simular transferencia
    resultado = puente.transferir(CENTRIX, "ForjaGriega")
    print(f"\n🔄 Transferencia: {json.dumps(resultado, indent=2, ensure_ascii=False)}")
    
    # Decidir agente para una tarea
    tarea = "Necesito compilar el código usando los principios griegos de abstracción"
    agente = puente.decidir_agente(tarea)
    print(f"\n🎯 Para la tarea: '{tarea}'")
    print(f"🤖 Agente recomendado: {agente.nombre}")
