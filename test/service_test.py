from src.service import *


def test_create_index():
    index = create_index('index1')
    assert index.index_id == 'index1'
    assert list_indices() == ['index1']


def test_list_indices():
    assert list_indices() == []
    create_index('index1')
    assert list_indices() == ['index1']
    create_index('index2')
    assert list_indices() == ['index1', 'index2']
    delete_index('index1')
    assert list_indices() == ['index2']
    delete_index('index2')
    assert list_indices() == []


def test_delete_index():
    create_index('index1')
    assert list_indices() == ['index1']
    delete_index('index2')
    assert list_indices() == ['index1']
    delete_index('index1')
    assert list_indices() == []


def test_get_index():
    index = create_index('index1')
    assert index.index_id == 'index1'
    assert get_index('index1').index_id == 'index1'
    assert get_index('index2') is None


def test_add_file_to_index():
    create_index('index1')
    add_file_to_index('index1', 'test/test_data/test_document.txt')
    assert list(list_documents_in_index('index1').keys()) == ['test_document.txt']


def test_list_documents_in_index():
    create_index('index1')
    add_file_to_index('index1', 'test/test_data/test_document.txt')
    add_file_to_index('index1', 'test/test_data/test_document2.txt')
    assert list(list_documents_in_index('index1').keys()) == ['test_document.txt', 'test_document2.txt']
    remove_doc_file_from_index('index1', 'test_document.txt')
    assert list(list_documents_in_index('index1').keys()) == ['test_document2.txt']


def test_remove_doc_ref_from_index():
    create_index('index1')
    add_file_to_index('index1', 'test/test_data/test_document.txt')
    add_file_to_index('index1', 'test/test_data/test_document2.txt')
    doc_ref = list_documents_in_index('index1')['test_document.txt']
    remove_doc_ref_from_index('index1', doc_ref)
    assert list(list_documents_in_index('index1').keys()) == ['test_document2.txt']


def test_remove_doc_file_from_index():
    create_index('index1')
    add_file_to_index('index1', 'test/test_data/test_document.txt')
    add_file_to_index('index1', 'test/test_data/test_document2.txt')
    remove_doc_file_from_index('index1', 'test_document2.txt')
    assert list(list_documents_in_index('index1').keys()) == ['test_document.txt']


def test_delete_all_documents_from_index():
    create_index('index1')
    add_file_to_index('index1', 'test/test_data/test_document.txt')
    add_file_to_index('index1', 'test/test_data/test_document2.txt')
    delete_all_documents_from_index('index1')
    assert list(list_documents_in_index('index1').keys()) == []
