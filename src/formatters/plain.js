import _ from 'lodash';

const srtingify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (tree, prevKeys = []) => {
  const result = tree.filter((node) => node.status !== 'unchanged')
    .map((node) => {
      const {
        key, children, value, value1, value2, status,
      } = node;
      const keys = [...prevKeys, key];
      const path = keys.join('.');
      switch (status) {
        case 'nested':
          return plain(children, keys);
        case 'added':
          return `Property '${path}' was added with value: ${srtingify(value)}`;
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'changed':
          return `Property '${path}' was updated. From ${srtingify(value1)} to ${srtingify(value2)}`;
        default:
          throw new Error(`Unknown status ${status}`);
      }
    });
  return `${result.join('\n')}`;
};
export default plain;
