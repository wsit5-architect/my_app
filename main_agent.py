import asyncio
import json
from google.antigravity import LocalAgentConfig, Agent
from ..telemetry.event_bus import event_bus
from ..hardware.reachy_mock import reachy
async def authenticate_user(student_id_or_name: str) -> str:
    """Authenticates and identifies a user using the GET_PROCESS_AGENT.
    
    Args:
        student_id_or_name: The numeric Student ID or a string matching First and Last Name.
    """
    event_bus.log(f"[MAIN_AGENT] Delegating authentication to GET_PROCESS_AGENT for {student_id_or_name}...")
    from .get_process_agent import get_process_agent_config
    async with Agent(get_process_agent_config) as agent:
        response = await agent.chat(f"Identify user: {student_id_or_name}")
        return await response.text()
async def file_it_ticket(issue_details: str, user_profile: str) -> str:
    """Compiles transcribed issue details and user profile to send an SMTP support email.
    
    Args:
        issue_details: A description of the problem.
        user_profile: The JSON string of the user's validated profile.
    """
    event_bus.set_agent_active("SMTP_TICKET_AGENT", True)
    event_bus.log("[SMTP] Compiling ticket data...")
    await asyncio.sleep(1) # simulate work
    event_bus.log(f"[SMTP] Sending email to servicedesk@georgefox.edu: {issue_details[:20]}...")
    event_bus.set_agent_active("SMTP_TICKET_AGENT", False)
    return "Ticket successfully submitted."
async def search_internal_wiki(query: str) -> str:
    """Formats a query and searches against the internal knowledge base at data_wiki.georgefox.edu.
    
    Args:
        query: The technical or institutional data question to look up.
    """
    event_bus.set_agent_active("WIKI_LOOKUP_AGENT", True)
    event_bus.log(f"[WIKI] Searching data_wiki.georgefox.edu for: {query}")
    await asyncio.sleep(1)
    event_bus.log("[WIKI] Search complete.")
    event_bus.set_agent_active("WIKI_LOOKUP_AGENT", False)
    return f"Found wiki article answering '{query}'. The solution is to reboot your machine."
async def search_george_fox(query: str) -> str:
    """Scrapes the public georgefox.edu domain to locate real-time verified answers.
    
    Args:
        query: A generic question about George Fox University.
    """
    event_bus.set_agent_active("WEB_SCRAPER_AGENT", True)
    event_bus.log(f"[WEB] Scraping georgefox.edu for: {query}")
    await asyncio.sleep(1)
    event_bus.log("[WEB] Scrape complete.")
    event_bus.set_agent_active("WEB_SCRAPER_AGENT", False)
    return f"According to georgefox.edu, the answer to '{query}' is available at the main campus."
async def capture_id_photo(user_profile: str) -> str:
    """Wakes the camera and captures a high-resolution snapshot for a new ID card.
    
    Args:
        user_profile: The JSON string of the user's profile.
    """
    event_bus.set_agent_active("CAMERA_AGENT", True)
    image_data = await reachy.capture_photo()
    event_bus.update_short_term_memory("last_photo", "captured")
    event_bus.set_agent_active("CAMERA_AGENT", False)
    return f"Photo captured successfully for user profile: {user_profile}. Image bound to AD string."
main_agent_config = LocalAgentConfig(
    system_instructions=(
        "You are Maggie, the George Fox University IT Service Desk Kiosk. "
        "You interface with students via voice and assist them with their IT needs. "
        "When the user interacts with you, determine their intent and execute the appropriate action: "
        "1. If they want to file a problem/ticket: Use authenticate_user to get their profile, then use file_it_ticket. "
        "2. If they ask a specific technical or institutional data question: Use search_internal_wiki. "
        "3. If they ask a general campus question: Use search_george_fox. "
        "4. If they need a new student/staff ID: Use authenticate_user, then use capture_id_photo. "
        "Always respond kindly, as you are a friendly robot."
    ),
    tools=[authenticate_user, file_it_ticket, search_internal_wiki, search_george_fox, capture_id_photo]
)
async def handle_user_interaction(user_input: str):
    """Main entrypoint for an interaction triggered by a Wake-Word event."""
    event_bus.set_agent_active("MAGGIE_LISTEN_AGENT", True)
    event_bus.update_short_term_memory("transcribed_string", user_input)
    event_bus.update_short_term_memory("wake_word_status", "ACTIVE")
    
    # Animate antennas via Reachy Mock
    await reachy.animate_antennas(True)
    
    try:
        async with Agent(main_agent_config) as agent:
            response = await agent.chat(user_input)
            final_text = await response.text()
            event_bus.log(f"[MAGGIE] Response generated: {final_text}")
            # Stream the answer back via TTS (mocked as updating memory here)
            event_bus.update_short_term_memory("last_response", final_text)
    except Exception as e:
        event_bus.log(f"[MAGGIE] Error during interaction: {e}")
    finally:
        await reachy.animate_antennas(False)
        event_bus.set_agent_active("MAGGIE_LISTEN_AGENT", False)
        event_bus.update_short_term_memory("wake_word_status", "IDLE")
