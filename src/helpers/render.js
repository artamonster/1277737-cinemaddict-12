import AbstractComponent from '../view/abstract-component.js';

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `aftereend`
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
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {
  RenderPosition,
  createElement,
  render,
  remove,
};
