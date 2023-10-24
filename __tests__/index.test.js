import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

// test('difference', () => {
//   const pathToTest = path.join(__dirname, '..', '__fixtures__', 'test1.txt');
//   const result = fs.readFileSync(pathToTest, 'utf-8');
//   const pathToFile1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
//   const pathToFile2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
//   expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
// });

// test('diffYaml', () => {
//   const pathToTest = path.join(__dirname, '..', '__fixtures__', 'test1.txt');
//   const result = fs.readFileSync(pathToTest, 'utf-8');
//   const pathToFile1 = path.join(__dirname, '..', '__fixtures__', 'file1.yaml');
//   const pathToFile2 = path.join(__dirname, '..', '__fixtures__', 'file2.yaml');
//   expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
// });

test.each([
  { file1: 'file1.json', file2: 'file2.json', expected: 'test1.txt' },
  { file1: 'file1.yaml', file2: 'file2.yaml', expected: 'test1.txt' },
])('diff', ({ file1, file2, expected }) => {
  const pathToFile1 = getFixturePath(file1);
  const pathToFile2 = getFixturePath(file2);
  const result = getFixturePath(expected);
  const readFile = fs.readFileSync(result, 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(readFile);
});
