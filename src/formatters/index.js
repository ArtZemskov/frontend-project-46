import stylish from './stylish.js';

const formatter = (arr, format) => {
  switch (format) {
    case 'stylish':
      return stylish(arr);
    default:
      throw new Error('wrong format');
  }
};
export default formatter;
