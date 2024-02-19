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

from service import *

print(list_indices())

# print('creating index')
# create_index('dupa2')
#
# print(list_indices())
#
# print('adding to index')
# add_fidle_to_index('dupa2', '/Users/knayder/Projects/masters-thesis-query-files/data/captain-shannon.txt')
#
# print(list_indices())
#
# print('querying index')
# query_index('dupa2', 'Who is Captain Shannon?')
#
# print(list_indices())
#
# print('deleting index')
# delete_index('dupa2')
#
# print(list_indices())


# query_index('d276f92d-1797-4eb5-b1e1-080eef13005c', 'Who is Captain Shannon?')












