import _ from 'lodash';

const spacesCount = 2;
const space = ' ';

const srtingify = (tree, depth) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return `${currentValue}`;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = space.repeat(indentSize);
    const bracketIndent = space.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue);
    const result = lines.map(([key, value]) => {
      if (_.isPlainObject(value)) {
        return `${currentIndent}${key}: ${iter(value, depth + 1)}`;
      }
      return `${currentIndent}${key}: ${value}`;
    });
    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };
  return iter(tree, depth + 1);
};

const stylish = (tree, depth = 1) => {
  const indentSize = depth * spacesCount;
  const currentIndent = space.repeat(indentSize);
  const result = tree.reduce((acc, item) => {
    if (item.status === 'nested') {
      acc.push(`${currentIndent}  ${item.key}: ${stylish(item.children, depth + 1)}`);
    }
    if (item.status === 'added') {
      acc.push(`${currentIndent}+ ${item.key}: ${srtingify(item.value, depth)}`);
    } else if (item.status === 'deleted') {
      acc.push(`${currentIndent}- ${item.key}: ${srtingify(item.value, depth)}`);
    } else if (item.status === 'changed') {
      acc.push(`${currentIndent}- ${item.key}: ${srtingify(item.value1, depth)}\n${currentIndent}+ ${item.key}: ${srtingify(item.value2, depth)}`);
    } else if (item.status === 'unchanged') {
      acc.push(`${currentIndent}  ${item.key}: ${srtingify(item.value, depth)}`);
    }
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
};
export default stylish;
