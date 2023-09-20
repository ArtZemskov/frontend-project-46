import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('difference', () => {
  const pathToTest = path.join(__dirname, '..', '__fixtures__', 'test1.txt');
  const result = fs.readFileSync(pathToTest, 'utf-8');
  const pathToFile1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const pathToFile2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
});
