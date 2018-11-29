export function toSuggestions(list, _ref) {
  var nameKey = _ref.nameKey,
      nameKey2 = _ref.nameKey2,
      valueKey = _ref.valueKey;
  var suggestions = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var items = _step.value;
      var name = items[nameKey];
      if (nameKey2) name = items[nameKey] + ' ' + items[nameKey2];
      suggestions.push({
        name: name,
        value: items[valueKey],
        optionalObject: items
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return suggestions;
}
export function getLastRowWidth(el) {
  var containerWidth = el.clientWidth;
  var childrenWidth = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = el.childNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var child = _step2.value;
      if (hasClass(child, 'auto-complete-input') || hasClass(child, 'suggestions')) continue;
      childrenWidth.push(child.clientWidth);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var lastRowWidth = 0;

  for (var i = 0; i < childrenWidth.length; i++) {
    lastRowWidth += childrenWidth[i];
    if (lastRowWidth > containerWidth) lastRowWidth = childrenWidth[i];
  }

  return lastRowWidth;
}

function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}