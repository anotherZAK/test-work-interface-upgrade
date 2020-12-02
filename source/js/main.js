'use strict'

const MAX_Y_OFFSET = 500;
const TAG_H2 = `H2`;

const treeHeadLinkList = document.querySelectorAll(`.tree__link-accordion`);
const treeNav = document.querySelector(`.tree-navigation`);

/**
 * переключает класс для переданного селектора
 * @param {Object} container - селектор, у которого переключается класс
 * @return {Object} - функция, переключающая класс
 */
const treeHeadTitleHandler = function (container) {
  return function (evt) {
    evt.preventDefault();
    if (evt.target.parentNode.tagName === TAG_H2) {
      const treeHead = container.closest(`.tree__block`).querySelector(`.tree__list`);
      treeHead.classList.toggle(`tree__list--open`);
    }
  };
};

/**
 * переключает класс для меню дополнительной навигации
 */
const treeNavigationHandler = function () {
  if (pageYOffset > MAX_Y_OFFSET) {
    treeNav.classList.add(`tree-navigation--visible`);
  } else {
    treeNav.classList.remove(`tree-navigation--visible`);
  }
}

for (const headLink of treeHeadLinkList) {
  headLink.addEventListener(`click`, treeHeadTitleHandler(headLink));
}
window.addEventListener(`scroll`, treeNavigationHandler);
