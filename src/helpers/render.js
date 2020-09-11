import AbstractComponent from '../view/abstract-component.js';

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `aftereend`,
  BEFORE: `before`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, child, place) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }

  if (child instanceof AbstractComponent) {
    child = child.getElement();
  }
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTEREND:
      container.parentNode.insertBefore(child, container.nextSibling);
      break;
    case RenderPosition.BEFORE:
      container.parentNode.insertBefore(child, container);
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replaceElement = (newChild, prevChild) => {
  if (prevChild instanceof AbstractComponent) {
    prevChild = prevChild.getElement();
  }

  if (newChild instanceof AbstractComponent) {
    newChild = newChild.getElement();
  }

  const parent = prevChild.parentElement;

  if (parent === null || prevChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, prevChild);
};

export {
  RenderPosition,
  createElement,
  render,
  remove,
  replaceElement
};
