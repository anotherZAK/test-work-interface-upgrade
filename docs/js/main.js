'use strict'

const MAX_Y_OFFSET = 500;
const Tags = {
  a: `A`,
  h2: `H2`
};
const treeBlockList = document.querySelectorAll(`.tree__block`);
const treeNav = document.querySelector(`.tree-navigation`);



/**
 * переключает класс для переданного селектора
 * @param {Object} container - селектор, у которого переключается класс
 * @return {Object} - функция, переключающая класс
 */
const treeHeadHandler = function (container) {
  return function (evt) {
    evt.preventDefault();
    try {
      if (Object.values(Tags).includes(evt.target.tagName)) {
        const tree = container.querySelector(`.tree__list`);
        tree.classList.toggle(`tree__list--open`);
      }
    } catch { }
  };
};

/**
 * переключает класс для меню дополнительной навигации
 */
const treeNavigationHandler = function() {
  if (pageYOffset > MAX_Y_OFFSET) {
    console.log(pageYOffset);
    treeNav.classList.add(`tree-navigation--visible`);
  } else {
    treeNav.classList.remove(`tree-navigation--visible`);
  }
}

for (const treeBlock of treeBlockList) {
  treeBlock.addEventListener(`click`, treeHeadHandler(treeBlock));
}
window.addEventListener(`scroll`, treeNavigationHandler);
