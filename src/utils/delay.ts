export const delay = (time = 300, reject = false) =>
  new Promise((_resolve, _reject) =>
    setTimeout(reject ? _reject : _reject, time),
  );
