/**
 * Wrap around controllers export object to autocatch errors
 * @param {Object} funcs
 * @returns new object that wraps a promise around all controllers
 */
export function autoCatch(funcs) {
  return Object.entries(funcs).reduce((res, [key, func]) => {
    let innerRes = { ...res };
    innerRes[key] = (req, res, next) =>
      Promise.resolve(func(req, res, next)).catch((err) => next(err));
    return innerRes;
  }, {});
}
