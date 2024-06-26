from llama_index.core import (Document, VectorStoreIndex,
                              StorageContext, SimpleDirectoryReader, load_indices_from_storage, load_index_from_storage)
from llama_index.core.indices.base import BaseIndex
from llama_index.core.base.response.schema import Response
import os

storage_dir = os.getenv('LOCAL_STORAGE', './local_storage')

# TODO: Implement better global state handling
try:
    storage_context = StorageContext.from_defaults(persist_dir=storage_dir)
except FileNotFoundError:
    storage_context = StorageContext.from_defaults()


def create_index(index_id: str) -> BaseIndex:
    """
    Creates a new index with the given index_id.

    Args:
        index_id (str): The ID of the index to be created.

    Returns:
        Index: The created index.
    """
    # TODO: Support more index types
    # TODO: Check if index_id exists, notify otherwise
    index = VectorStoreIndex([], storage_context=storage_context)
    if index_id:
        index.set_index_id(index_id)
    index.storage_context.persist(persist_dir=storage_dir)

    return index


def list_indices() -> list[str]:
    """
    Lists all indices in the storage context.

    Returns:
        list: A list of index IDs.
    """
    indices = load_indices_from_storage(storage_context=storage_context)

    return list(map(lambda index: index.index_id, indices))


def delete_index(index_id: str) -> None:
    """
    Deletes an index with the given index_id and all of its documents.

    Args:
        index_id (str): The ID of the index to be deleted.
    """
    delete_all_documents_from_index(index_id)

    storage_context.index_store.delete_index_struct(index_id)

    storage_context.persist(persist_dir=storage_dir)


def get_index(index_id: str) -> BaseIndex | None:
    """
    Retrieves an index with the given index_id.

    Args:
        index_id (str): The ID of the index to be retrieved.

    Returns:
        BaseIndex | None: The retrieved index, or None if an error occurs.
    """
    try:
        return load_index_from_storage(storage_context=storage_context, index_id=index_id)
    except ValueError:
        return None


def add_file_to_index(index_id: str, path: str) -> None:
    """
    Adds a file to an index with the given index_id.

    Args:
        index_id (str): The ID of the index where the file will be added.
        path (str): The path of the file to be added.
    """
    index = load_index_from_storage(storage_context=storage_context,
                                    index_id=index_id)
    documents = SimpleDirectoryReader(input_files=[path]).load_data()

    for document in documents:
        index.insert(document)
    index.storage_context.persist(persist_dir=storage_dir)


def _list_documents_in_index(index: BaseIndex) -> dict[str, dict]:
    """
    Lists all documents in a given index.

    Args:
        index (Index): The index from which to list documents.

    Returns:
        dict: A dictionary mapping file names to document references.
    """
    index_info = index.ref_doc_info
    result = {}
    for key, value in index_info.items():
        if 'file_name' in value.metadata:
            file_name = value.metadata.get('file_name')
            if file_name in result:
                result[file_name]['file_size'] += value.metadata.get('file_size', 0)
                result[file_name]['ref_doc_ids'].append(key)
            else:
                result[file_name] = {
                    'file_path': value.metadata.get('file_path'),
                    'file_type': value.metadata.get('file_type'),
                    'file_size': value.metadata.get('file_size', 0),
                    'creation_date': value.metadata.get('creation_date'),
                    'ref_doc_ids': [key]
                }
    return result


def list_documents_in_index(index_id: str) -> dict[str, dict]:
    """
    Lists all documents in an index with the given index_id.

    Args:
        index_id (str): The ID of the index from which to list documents.

    Returns:
        dict: A dictionary mapping file names to document references.
    """
    # TODO: Notify if no index found
    index = get_index(index_id)
    if index is None:
        return {}
    return _list_documents_in_index(index)


def _remove_doc_ref_from_index(index: BaseIndex, doc_ref: str) -> None:
    """
    Removes a document from a given index.

    Args:
        index (Index): The index from which to remove the document.
        doc_ref (str): The reference of the document to be removed.
    """
    index.delete_ref_doc(doc_ref, delete_from_docstore=True)
    index.storage_context.persist(persist_dir=storage_dir)


def _remove_doc_refs_from_index(index: BaseIndex, doc_refs: list[str]) -> None:
    """
    Removes a document from a given index.

    Args:
        index (Index): The index from which to remove the document.
        doc_refs (list): The references of the documents to be removed.
    """
    for doc_ref in doc_refs:
        index.delete_ref_doc(doc_ref, delete_from_docstore=True)
    index.storage_context.persist(persist_dir=storage_dir)


def remove_doc_ref_from_index(index_id: str, doc_ref: str) -> None:
    """
    Removes a document from an index with the given index_id.

    Args:
        index_id (str): The ID of the index from which to remove the document.
        doc_ref (str): The reference of the document to be removed.
    """
    # TODO: Check if exists, notify otherwise
    _remove_doc_ref_from_index(get_index(index_id), doc_ref)


def remove_doc_file_from_index(index_id: str, doc_file: str) -> None:
    """
    Removes a document from an index with the given index_id.

    Args:
        index_id (str): The ID of the index from which to remove the document.
        doc_file (str): The file name of the document to be removed.
    """
    index = get_index(index_id)
    doc = _list_documents_in_index(index).get(doc_file)
    if doc:
        _remove_doc_refs_from_index(index, doc.get('ref_doc_ids', []))
    else:
        print(f"Document {doc_file} not found in index {index_id}")


def delete_all_documents_from_index(index_id: str) -> None:
    """
    Deletes all documents from an index with the given index_id.

    Args:
        index_id (str): The ID of the index from which to delete all documents.
    """
    index = get_index(index_id)
    if index is None:
        return

    documents = list(map(lambda doc: doc.get('ref_doc_ids', []), _list_documents_in_index(index).values()))
    flattened = [doc_ref_id for document in documents for doc_ref_id in document]
    _remove_doc_refs_from_index(index, flattened)


def query_index(index_id: str, question: str, similarity_top_k: int) -> Response | None:
    """
    Queries an index with the given index_id.

    Args:
        index_id (str): The ID of the index to be queried.
        question (str): The question to be queried.
        similarity_top_k (int): The number of top k results to return.

    Returns:
        Response: The response to the query.
    """
    index = get_index(index_id)
    if index is None:
        return

    if not similarity_top_k:
        similarity_top_k = 2
    query_engine = index.as_query_engine(similarity_top_k=similarity_top_k)

    return query_engine.query(question)

