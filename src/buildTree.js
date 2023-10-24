import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqueSortedKeys = _.sortBy(Array.from(new Set([...keys1, ...keys2])));
  const result = uniqueSortedKeys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], status: 'deleted' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, value1: obj1[key], value2: obj2[key], status: 'changed',
      };
    }
    return { key, value: obj1[key], status: 'unchanged' };
  });
  return result;
};
export default buildTree;
