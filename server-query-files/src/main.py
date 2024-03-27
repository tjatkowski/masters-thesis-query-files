from werkzeug.utils import secure_filename

'''
from src.config import config
from src.service import *
from src.settings import *
config()
'''

from config import *
from service import *
from settings import *
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def success_response(data=None):
    if data is None:
        data = {}

    return {**data, 'status': 'success'}


def error_response(message):
    return {'status': 'error', 'message': message}, 400


@app.route('/indices/create/<index_id>', methods=['POST'])
def api_create_index(index_id):
    if not index_id:
        return error_response('Invalid index_id')
    index = create_index(index_id)
    create_settings(index_id, {
        'temperature': 0.7,
        'topk': 3
    })
    return success_response({'index_id': index.index_id})


@app.route('/indices/list', methods=['GET'])
def api_list_indices():
    return success_response({'indices': list_indices()})


@app.route('/index/<index_id>/delete', methods=['DELETE'])
def api_delete_index(index_id):
    if not index_id:
        return error_response('Invalid index_id')
    delete_index(index_id)
    delete_settings(index_id)
    return success_response()


@app.route('/index/<index_id>/documents/list', methods=['GET'])
def api_list_documents(index_id):
    # TODO: Make api return more metdata (filetype, size, etc.)
    if not index_id:
        return error_response('Invalid index_id')
    return success_response({'documents': list_documents_in_index(index_id)})


@app.route('/index/<index_id>/documents/add', methods=['POST'])
def api_add_document(index_id):
    if not index_id:
        return error_response('Invalid index_id')
    if 'file' not in request.files:
        return error_response('No file part')
    file = request.files['file']
    if file.filename == '':
        return error_response('No selected file')

    filename = secure_filename(file.filename)
    path = os.path.join(os.getcwd(), 'uploads', filename)
    file.save(path)
    add_file_to_index(index_id, path)
    return success_response()


@app.route('/index/<index_id>/document/delete', methods=['DELETE'])
def api_delete_document(index_id):
    if not index_id:
        return error_response('Invalid index_id')

    file_name = request.json.get('file_name')
    if not file_name:
        return error_response('Invalid file_name')

    remove_doc_file_from_index(index_id, file_name)
    return success_response()


@app.route('/index/<index_id>/query', methods=['POST'])
def api_query_index(index_id):
    if not index_id:
        return error_response('Invalid index_id')
    query = request.json.get('query')
    if not query:
        return error_response('Invalid query')

    update_temperature(read_settings(index_id).get('temperature', 0.7))
    response = query_index(index_id, query)
    reset_temperature()
    return success_response({'response': response.response})


@app.route('/index/<index_id>/settings', methods=['POST'])
def api_update_settings(index_id):
    if not index_id:
        return error_response('Invalid index_id')
    settings = request.json.get('settings')
    if not settings:
        return error_response('Invalid settings')

    update_settings(index_id, settings)
    return success_response()


@app.route('/index/<index_id>/settings', methods=['GET'])
def api_get_settings(index_id):
    if not index_id:
        return error_response('Invalid index_id')
    return success_response({'settings': read_settings(index_id)})

# @app.route('/index/<index_id>/documents/delete_all', methods=['DELETE'])


if __name__ == '__main__':
    config()
    app.run(debug=True)
