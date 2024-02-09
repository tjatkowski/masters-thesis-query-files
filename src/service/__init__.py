from llama_index import ServiceContext, Document, VectorStoreIndex, StorageContext, load_index_from_storage, load_indices_from_storage
from llama_index.llms import Ollama

storage_dir = './local_storage'

llm = Ollama(model="llama2")

service_context = ServiceContext.from_defaults(embed_model="local",
                                               llm=llm)

try:
    storage_context = StorageContext.from_defaults(persist_dir=storage_dir)
except FileNotFoundError:
    storage_context = StorageContext.from_defaults()


def create_index(index_id):
    index = VectorStoreIndex([], service_context=service_context, storage_context=storage_context)
    if index_id:
        index.set_index_id(index_id)
    index.storage_context.persist(persist_dir=storage_dir)


def list_indices():
    indices = load_indices_from_storage(storage_context=storage_context,
                                        service_context=service_context)

    return list(map(lambda index: index.index_id, indices))


def delete_index(index_id):
    storage_context.index_store.delete_index_struct(index_id)

    storage_context.persist(persist_dir=storage_dir)


def get_index(index_id):
    return load_index_from_storage(storage_context=storage_context,
                                   service_context=service_context,
                                   index_id=index_id)


def add_file_to_index(index_id, path):
    index = load_index_from_storage(storage_context=storage_context,
                                    service_context=service_context,
                                    index_id=index_id)

    with open(path, 'r') as file:
        index.insert(Document(text=file.read()))
        index.storage_context.persist(persist_dir=storage_dir)


def remove_file_from_index():
    pass


def query_index(index_id, question):
    index = load_index_from_storage(storage_context=storage_context,
                                    service_context=service_context,
                                    index_id=index_id)
    # print("Loading query engine")
    query_engine = index.as_query_engine(service_context=service_context,
                                         streaming=True)

    # print("Querying")
    response = query_engine.query(question)
    # response = query_engine.query("Who is Captain Shannon?")
    response.print_response_stream()
