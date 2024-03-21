const host = (...queries) => `http://127.0.0.1:5000/${queries.join('/')}`

const url = {
  indices: () => host('indices', 'list'),
}

export default url;
