const stylish = (tree) => {
  const result = tree.reduce((acc, item) => {
    if (item.status === 'added') {
      acc.push(`  + ${item.key}: ${item.value}`);
    } else if (item.status === 'deleted') {
      acc.push(`  - ${item.key}: ${item.value}`);
    } else if (item.status === 'changed') {
      acc.push(`  - ${item.key}: ${item.value1}\n  + ${item.key}: ${item.value2}`);
    } else {
      acc.push(`    ${item.key}: ${item.value}`);
    }
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
};
export default stylish;
