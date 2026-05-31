const THEME_STORAGE_KEY = 'theme';
const THEME_CLASS_PREFIX = 'theme-';
const BTN_ACTIVE = 'header__theme-menu-button_active';

const readSavedTheme = () => localStorage.getItem(THEME_STORAGE_KEY);

const applyTheme = (themeName) => {
  document.documentElement.className = `${THEME_CLASS_PREFIX}${themeName}`;
  localStorage.setItem(THEME_STORAGE_KEY, themeName);
};

const extractThemeFromRoot = () => {
  const rootClass = document.documentElement.className;
  const themeMatch = rootClass.match(/theme-(\w+)/);
  return themeMatch ? themeMatch[1] : 'auto';
};

const syncThemeButtons = (buttonList, activeTheme) => {
  buttonList.forEach((btn) => {
    const isSelected = btn.dataset.theme === activeTheme;
    btn.classList.toggle(BTN_ACTIVE, isSelected);
    btn.toggleAttribute('disabled', isSelected);
  });
};

const savedTheme = readSavedTheme();
if (savedTheme) {
  applyTheme(savedTheme);
}

document.addEventListener('DOMContentLoaded', () => {
  const menuButtons = document.querySelectorAll('.header__theme-menu-button');
  const activeTheme = extractThemeFromRoot();

  syncThemeButtons(menuButtons, activeTheme);

  menuButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.theme;
      applyTheme(selected);
      syncThemeButtons(menuButtons, selected);
    });
  });
});
