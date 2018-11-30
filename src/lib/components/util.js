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
    if (
      hasClass(child, 'React_autocomplete_label__auto-complete-input-wrapper') ||
      hasClass(child, 'React_autocomplete_label__suggestions')
    )
      continue;
    childrenWidth.push(child.clientWidth);
  }
  console.log(childrenWidth);
  let lastRowWidth = 0;
  console.log('containerWidth: ', containerWidth);
  for (let i = 0; i < childrenWidth.length; i++) {
    console.log('lastRowWidth before: ', lastRowWidth);
    lastRowWidth += childrenWidth[i];
    console.log('lastRowWidth after1: ', lastRowWidth);
    console.log('childrenWidth[i]: ', childrenWidth[i]);
    if (lastRowWidth > containerWidth) lastRowWidth = childrenWidth[i];
    console.log('lastRowWidth after2: ', lastRowWidth);
  }
  return lastRowWidth;
}

function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}
