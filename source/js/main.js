'use strict'

const Tags = {
  a: `A`,
  h2: `H2`
};
const treeBlockList = document.querySelectorAll(`.tree__block`);

/**
 * переключает класс для переданного селектора
 * @param {Object} container - селектор, у которого переключается класс
 * @return {Object} - функция, переключающая класс
 */
const treeHeadHandler = function (container) {
  return (evt) => {
    evt.preventDefault();
    try {
      if (Object.values(Tags).includes(evt.target.tagName)) {
        const tree = container.querySelector(`.tree__list`);
        tree.classList.toggle(`tree__list--open`);
      }
    } catch { }
  };
};

for (const treeBlock of treeBlockList) {
  treeBlock.addEventListener(`click`, treeHeadHandler(treeBlock));
}
