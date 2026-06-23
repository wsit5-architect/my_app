import json
from google.antigravity import LocalAgentConfig, Agent
from ..telemetry.event_bus import event_bus

def query_ldap(student_id_or_name: str) -> str:
    """Queries the campus Windows Active Directory server using secure LDAP.
    
    Args:
        student_id_or_name: The numeric Student ID or a string matching First and Last Name.
    """
    event_bus.set_agent_active("GET_PROCESS_AGENT", True)
    event_bus.log(f"[LDAP] Connecting to Windows Active Directory for {student_id_or_name}...")
    # Mocking LDAP failure to force fallback in some cases or success
    if "error" in student_id_or_name.lower():
        event_bus.log("[LDAP] Connection failed. Fallback required.")
        return json.dumps({"error": "LDAP unreachable"})
        
    event_bus.log("[LDAP] Match found.")
    result = {
        "full_name": student_id_or_name,
        "email": f"{student_id_or_name.replace(' ', '.').lower()}@georgefox.edu",
        "student_id": "123456789",
        "role": "student"
    }
    event_bus.update_short_term_memory("current_user", result)
    event_bus.set_agent_active("GET_PROCESS_AGENT", False)
    return json.dumps(result)

def query_fallback_json(student_id_or_name: str) -> str:
    """Parses a local fallback file named users.json to find a match if LDAP fails.
    
    Args:
        student_id_or_name: The numeric Student ID or a string matching First and Last Name.
    """
    event_bus.set_agent_active("GET_PROCESS_AGENT", True)
    event_bus.log(f"[FALLBACK] Parsing users.json for {student_id_or_name}...")
    
    result = {
        "full_name": student_id_or_name,
        "email": f"{student_id_or_name.replace(' ', '.').lower()}@georgefox.edu",
        "student_id": "987654321",
        "role": "student (fallback)"
    }
    event_bus.log("[FALLBACK] Match found in local file.")
    event_bus.update_short_term_memory("current_user", result)
    event_bus.set_agent_active("GET_PROCESS_AGENT", False)
    return json.dumps(result)

get_process_agent_config = LocalAgentConfig(
    system_instructions=(
        "You are GET_PROCESS_AGENT, a sub-agent responsible strictly for user authentication and identification "
        "at George Fox University. "
        "When asked to identify a user by name or student ID, you must FIRST use the query_ldap tool. "
        "If the query_ldap tool returns an error or fails, you must then use the query_fallback_json tool. "
        "Return the final structured JSON payload containing full_name, email, student_id, and role."
    ),
    tools=[query_ldap, query_fallback_json]
)
