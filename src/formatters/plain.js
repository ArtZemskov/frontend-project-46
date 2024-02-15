import _ from 'lodash';

const srtingify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (tree, prevKeys = []) => {
  const list = tree.map((node) => {
    const {
      key, children, value, value1, value2, status,
    } = node;
    const keys = [...prevKeys, key];
    const path = keys.join('.');
    if (status === 'nested') {
      return plain(children, keys);
    }
    if (status === 'added') {
      return `Property '${path}' was added with value: ${srtingify(value)}`;
    }
    if (status === 'deleted') {
      return `Property '${path}' was removed`;
    }
    if (status === 'changed') {
      return `Property '${path}' was updated. From ${srtingify(value1)} to ${srtingify(value2)}`;
    }
  });

  const result = list.filter((item) => item !== undefined);

  return `${result.join('\n')}`;
};
export default plain;