# # import logging
# # import sys
# #
# # import llama_index
# # from llama_index.llms import Ollama
# # from llama_index import ServiceContext
# from llama_index import VectorStoreIndex, SimpleDirectoryReader
# #
# # print("Loading LLama2")
# # llm = Ollama(model="llama2")
# #
# # print("Loading ServiceContext")
# # service_context = ServiceContext.from_defaults(embed_model="local",
# #                                                llm=llm)
# #
# # print("Loading documents")
# documents = SimpleDirectoryReader("data").load_data()
# # print("Loading index")
# # index = VectorStoreIndex.from_documents(documents, service_context=service_context)
# #
# # print("Loading query engine")
# # query_engine = index.as_query_engine(service_context=service_context, streaming=True)
# #
# # print("Querying")
# # response = query_engine.query("Who is Captain Shannon?")
# # response.print_response_stream()
# #
# # print(response)
#
# # Captain Shannon is a mysterious figure who is believed to be the mastermind behind a series of infamous crimes in
# # England and Ireland. The police have failed to identify him, despite their efforts to uncover his true identity.
# # He is known to be a ruthless and cunning criminal who will stop at nothing to achieve his goals. His motives are
# # unknown, but he seems to take great pleasure in terrorizing and intimidating innocent civilians.
# # The government has even denounced him as a monster and a murderer, vowing to bring him to justice.
# # However, little is known about Captain Shannon's personal life or background, making him an enigmatic figure.
#
#
# from llama_index import StorageContext
#
# from llama_index.llms import Ollama
# from llama_index import ServiceContext, load_index_from_storage, load_indices_from_storage
# from llama_index import VectorStoreIndex, SimpleDirectoryReader
# from llama_index.storage.docstore import SimpleDocumentStore
# from llama_index.storage.index_store import SimpleIndexStore
# from llama_index.vector_stores import SimpleVectorStore
#
# storage_context = StorageContext.from_defaults()
#
#
# print("Loading LLama2")
# llm = Ollama(model="llama2")
#
# print("Loading ServiceContext")
# service_context = ServiceContext.from_defaults(embed_model="local",
#                                                llm=llm)
#
# index = load_indices_from_storage(storage_context=storage_context,
#                                   service_context=service_context)
#
# print(index)
# #
# # print("Loading documents")
# # documents = SimpleDirectoryReader("data").load_data()
# # print("Loading index")
# # index = VectorStoreIndex.from_documents(documents,
# #                                         service_context=service_context,
# #                                         storage_context=storage_context)
# # storage_context.persist('./local_storage/')
# #
# # print("Loading query engine")
# # query_engine = index.as_query_engine(service_context=service_context,
# #                                      streaming=True)
# #
# # print("Querying")
# # response = query_engine.query("Who is Captain Shannon?")
# # response.print_response_stream()
# #
# # print(response)
#


'''
from src.config import config
from src.service import *
config()

'''

from config import config
from service import *

# DODAJ TERAZ FOLDER test/ gdzie bedie test.py.
# Tam zaimportuj kod i zrob serie komend ktore maja przejsc. proste testy po prostu. W folderze test ma powstac local_storage
# Moze jest jakis lekki testing framework?
#
# Dodaj requirements.txt z wersjami paczek pipa dla przyszlych pokole nXD

config()

get_index('index1').docstore.get_all_ref_doc_info().keys()
get_index('index2').docstore.get_all_ref_doc_info().keys()
get_index('index3').docstore.get_all_ref_doc_info().keys()


# print(list_indices())
# query_index('index1', 'Who is Captain Shannon?')

# Based on the context provided, Captain Shannon appears to be a mysterious and elusive figure who is suspected of committing a series of crimes in England and Ireland. The police have been unable to discover his true identity, despite offering rewards for information leading to his capture. It seems that Captain Shannon is highly skilled at evading detection and has a reputation for being ruthless and cunning.
#
# From the passage, it is unclear what Captain Shannon's actual identity is, but he is described as a "monster" who is capable of committing heinous crimes with little regard for the consequences. The police believe that he is likely to be Irish, based on the location of the crimes and the informant's description of him as having a dark complexion. However, it is important to note that this is only an assumption and does not necessarily indicate Captain Shannon's true identity.
#
# In summary, Captain Shannon is a shadowy figure who is believed to be responsible for a series of crimes in England and Ireland. His true identity remains a mystery, but he is described as a dangerous and cunning individual who is likely to be Irish.
# Process finished with exit code 0

print('creating index')
create_index('index2')
# #
print(list_indices())
# #
# print('adding to index')
# add_file_to_index('index2', '/Users/knayder/Projects/masters-thesis-query-files/data/captain-shannon.txt')
# #
# print(list_indices())
# #
# print('querying index')
# query_index('index1', 'Who is Captain Shannon?')
# #
# print(list_indices())
#
# print('deleting index')
# delete_index('index1')

# print(list_indices())


# query_index('d276f92d-1797-4eb5-b1e1-080eef13005c', 'Who is Captain Shannon?')












