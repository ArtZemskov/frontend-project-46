import _ from 'lodash';

const spacesCount = 4;
const space = ' ';

const srtingify = (tree, depth) => {
  const iter = (currentValue, innerDepth) => {
    if (!_.isPlainObject(currentValue)) {
      return `${currentValue}`;
    }
    const indentSize = innerDepth * spacesCount;
    const currentIndent = space.repeat(indentSize);
    const bracketIndent = space.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue);
    const result = lines.map(([key, value]) => {
      if (_.isPlainObject(value)) {
        return `${currentIndent}${key}: ${iter(value, innerDepth + 1)}`;
      }
      return `${currentIndent}${key}: ${value}`;
    });
    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };
  return iter(tree, depth + 1);
};

const stylish = (tree, depth = 1) => {
  const indentSize = spacesCount * depth - 2;
  const currentIndent = space.repeat(indentSize);
  const bracketIndent = space.repeat(indentSize - 2);
  const result = tree.map((node) => {
    switch (node.status) {
      case 'nested':
        return `${currentIndent}  ${node.key}: ${stylish(node.children, depth + 1)}`;
      case 'added':
        return `${currentIndent}+ ${node.key}: ${srtingify(node.value, depth)}`;
      case 'deleted':
        return `${currentIndent}- ${node.key}: ${srtingify(node.value, depth)}`;
      case 'changed':
        return `${currentIndent}- ${node.key}: ${srtingify(node.value1, depth)}\n${currentIndent}+ ${node.key}: ${srtingify(node.value2, depth)}`;
      case 'unchanged':
        return `${currentIndent}  ${node.key}: ${srtingify(node.value, depth)}`;
      default:
        throw new Error(`Unknown node status: ${node.status}.`);
    }
  });
  return `{\n${result.join('\n')}\n${bracketIndent}}`;
};
export default stylish;
