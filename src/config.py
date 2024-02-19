from llama_index.core import (ServiceContext, Document, VectorStoreIndex,
                              StorageContext, SimpleDirectoryReader, load_indices_from_storage, load_index_from_storage)
from llama_index.core.settings import Settings
from llama_index.llms.ollama import Ollama


def config():
    Settings.llm = Ollama(model="llama2")
    Settings.embed_model = "local"

    print("Settings applied!")
