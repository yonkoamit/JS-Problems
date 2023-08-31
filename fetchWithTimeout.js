const fetchWithTimeout = async (url, time) => {
  const controller = new AbortController();

  let timer = null;
  timer = setTimeout(() => {
    controller.abort();
    clearTimeout(timer);
  }, time);

  try {
    const response = await fetch(url, { signal: controller.signal });

    const a = await response.json();
    return a;
  } catch (error) {
    return new Error(error);
  } finally {
    clearTimeout(timer);
  }
};

fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1", 50)
  .then((resp) => {
    console.log(resp);
  })
  .catch((error) => {
    console.error(error);
  });
