from llama_index.core.settings import Settings
from llama_index.llms.ollama import Ollama


def config():
    Settings.llm = Ollama(model="llama2")
    Settings.embed_model = "local"
    reset_temperature()

    print("Settings applied!")


def update_temperature(temperature):
    Settings.llm.temperature = temperature
    print("Temperature updated!")


def reset_temperature():
    Settings.llm.temperature = 0.75
    print("Temperature reset!")
