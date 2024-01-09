from llama_index.llms import Ollama
from llama_index import ServiceContext
from llama_index import VectorStoreIndex, SimpleDirectoryReader

print("Loading LLama2")
llm = Ollama(model="llama2")

print("Loading ServiceContext")
service_context = ServiceContext.from_defaults(embed_model="local",
                                               llm=llm)

print("Loading documents")
documents = SimpleDirectoryReader("data").load_data()
print("Loading index")
index = VectorStoreIndex.from_documents(documents, service_context=service_context)

print("Loading query engine")
query_engine = index.as_query_engine(service_context=service_context)

print("Querying")
response = query_engine.query("When exactly party happened at the author's house?")

print(response)
