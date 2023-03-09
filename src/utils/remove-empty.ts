type SafeAny = any;

type Emptable = SafeAny[] | Partial<SafeAny>;

export const removeEmpty = <T = Emptable>(obj: Emptable): T =>
  Object.keys(obj)
    .filter((k) => {
      const _value = (obj as SafeAny)[k] as SafeAny;
      if (typeof _value === 'string' && !_value.length) return false;
      return _value != null;
    }) // Remove undef. and null.
    .reduce(
      (newObj, k) =>
        typeof ((obj as SafeAny)[k] as SafeAny) === `object`
          ? { ...newObj, [k]: removeEmpty((obj as SafeAny)[k] as SafeAny) } // Recurse.
          : { ...newObj, [k]: (obj as SafeAny)[k] as SafeAny }, // Copy value.
      {},
    ) as T;
