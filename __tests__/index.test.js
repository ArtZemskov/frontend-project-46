import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  { file1: 'file1.json', file2: 'file2.json', expected: 'stylish.txt' },
  { file1: 'file1.yaml', file2: 'file2.yaml', expected: 'stylish.txt' },
])('diff', ({ file1, file2, expected }) => {
  const pathToFile1 = getFixturePath(file1);
  const pathToFile2 = getFixturePath(file2);
  const result = getFixturePath(expected);
  const readFile = fs.readFileSync(result, 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(readFile);
});
