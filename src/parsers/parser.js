import yaml from 'js-yaml';

const parseData = (string, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(string);
    case 'yaml':
    case 'yml':
      return yaml.load(string, 'utf8');
    default:
      throw new Error('wrong format');
  }
};
export default parseData;
