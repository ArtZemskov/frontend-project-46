import { cwd } from 'node:process';
import path from 'path';
import fs from 'fs';
import parser from './parsers/parser.js';
import formatter from './formatters/index.js';
import buildTree from './buildTree.js';

const genDiff = (path1, path2) => {
  const resolvedPath1 = path.resolve(cwd(), path1);
  const resolvedPath2 = path.resolve(cwd(), path2);
  const data1 = fs.readFileSync(resolvedPath1, 'utf-8');
  const data2 = fs.readFileSync(resolvedPath2, 'utf-8');

  const obj1 = parser(data1, path.extname(path1).slice(1));
  const obj2 = parser(data2, path.extname(path2).slice(1));
  const tree = buildTree(obj1, obj2);
  const result = formatter(tree, 'stylish');
  return result;
};
export default genDiff;
