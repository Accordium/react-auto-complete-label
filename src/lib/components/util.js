export function toSuggestions(list, { nameKey, valueKey }) {
  const suggestions = [];
  for (const items of list) {
    suggestions.push({
      name: items[nameKey],
      value: items[valueKey],
    });
  }
  return suggestions;
}

export function getLastRowWidth(el) {
  const containerWidth = el.clientWidth;
  let childrenWidth = [];
  for (const child of el.childNodes) {
    // removing input and suggestions
    if (hasClass(child, 'auto-complete-input') || hasClass(child, 'suggestions')) continue;
    childrenWidth.push(child.clientWidth);
  }
  let lastRowWidth = 0;

  for (let i = 0; i < childrenWidth.length; i++) {
    console.log('childrenWidth[i]: ', childrenWidth[i]);
    lastRowWidth += childrenWidth[i];
    if (lastRowWidth > containerWidth) lastRowWidth = childrenWidth[i];
  }
  console.log('lastRowWidth: ', lastRowWidth);
  return lastRowWidth;
}

function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
