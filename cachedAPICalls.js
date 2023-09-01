const cachedApiCall = (time) => {
  const cache = {};

  return async (url, config) => {
    const key = url + JSON.stringify(config);

    const entry = cache[key];

    if (!entry || Date.now() - entry.time > time) {
      try {
        const result = await fetch(url, config);
        const resp = await result.json();

        cache[key] = { value: resp, time: Date.now() };
        return resp;
      } catch (e) {
        console.error(e);
      }
    }
  };
};

const call = cachedApiCall(1500);
call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
  console.log("1", a)
);
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log("2", a)
  );
}, 800);
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log("3", a)
  );
}, 1700);
