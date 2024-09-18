const API_URL = process.env.REACT_APP_API_URL;

const api = {
  get: (path, config = {}) =>
    fetch(`${API_URL}${path}`, { ...config, method: "GET" }).then((res) =>
      res.json()
    ),
  post: (path, body, config = {}) =>
    fetch(`${API_URL}${path}`, {
      ...config,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json()),
  put: (path, body, config = {}) =>
    fetch(`${API_URL}${path}`, {
      ...config,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json()),
  delete: (path, config = {}) =>
    fetch(`${API_URL}${path}`, { ...config, method: "DELETE" }).then((res) =>
      res.json()
    ),
};

export default api;
