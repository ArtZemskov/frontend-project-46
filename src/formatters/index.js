import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (arr, format) => {
  switch (format) {
    case 'stylish':
      return stylish(arr);
    case 'plain':
      return plain(arr);
    default:
      throw new Error('wrong format');
  }
};
export default formatter;
