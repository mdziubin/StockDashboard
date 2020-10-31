import light from './light';
import dark from './dark';

const themes = {
  light,
  dark
};

const getTheme = theme => {
  return themes[theme];
};

export default getTheme;
