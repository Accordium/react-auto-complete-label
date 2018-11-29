export function toSuggestions(list, { nameKey, nameKey2, valueKey }) {
  const suggestions = [];
  for (const items of list) {
    let name = items[nameKey];
    if (nameKey2) name = items[nameKey] + ' ' + items[nameKey2];
    suggestions.push({
      name,
      value: items[valueKey],
      optionalObject: items,
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
    lastRowWidth += childrenWidth[i];
    if (lastRowWidth > containerWidth) lastRowWidth = childrenWidth[i];
  }
  return lastRowWidth;
}

function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}
