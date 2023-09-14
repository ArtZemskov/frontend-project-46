import { cwd } from 'node:process';
import path from 'path';
import fs from 'fs';

const genDiff = (path1, path2) => {
  const resolvedPath1 = path.resolve(cwd(), path1);
  const resolvedPath2 = path.resolve(cwd(), path2);
  const data1 = fs.readFileSync(resolvedPath1, 'utf-8');
  const data2 = fs.readFileSync(resolvedPath2, 'utf-8');

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqueSortedKeys = Array.from(new Set([...keys1, ...keys2])).sort();

  const newObject = uniqueSortedKeys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc[`  + ${key}`] = obj2[key];
    } else if (!Object.hasOwn(obj2, key)) {
      acc[`  - ${key}`] = obj1[key];
    } else if (obj1[key] !== obj2[key]) {
      acc[`  - ${key}`] = obj1[key];
      acc[`  + ${key}`] = obj2[key];
    } else {
      acc[`    ${key}`] = obj1[key];
    }
    return acc;
  }, {});
  const result = Object.keys(newObject)
    .map((key) => `${key}: ${newObject[key]}`)
    .join('\n');
  return `{\n${result}\n}`;
};
// console.log(genDiff('file1.json', 'file2.json'));
export default genDiff;
