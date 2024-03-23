const host = (...queries) => `http://127.0.0.1:5000/${queries.join('/')}`

const url = {
  indices: () => host('indices', 'list'),
  createIndex: (indexId) => host('indices', 'create', indexId),
  deleteIndex: (indexId) => host('index', indexId, 'delete'),
  documents: (indexId) => host('index', indexId, 'documents', 'list'),
  addDocument: (indexId) => host('index', indexId, 'documents', 'add'),
}

export default url;
