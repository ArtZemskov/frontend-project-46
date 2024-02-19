import { cwd } from 'node:process';
import path from 'path';
import fs from 'fs';
import parseData from './parsers/parser.js';
import formatDiff from './formatters/index.js';
import buildTree from './buildTree.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const resolvedPath1 = path.resolve(cwd(), path1);
  const resolvedPath2 = path.resolve(cwd(), path2);
  const data1 = fs.readFileSync(resolvedPath1, 'utf-8');
  const data2 = fs.readFileSync(resolvedPath2, 'utf-8');

  const obj1 = parseData(data1, path.extname(path1).slice(1));
  const obj2 = parseData(data2, path.extname(path2).slice(1));
  const tree = buildTree(obj1, obj2);
  const result = formatDiff(tree, format);
  return result;
};
export default genDiff;
