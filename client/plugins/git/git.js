import * as defaults from "./api/defaults";
import github from "./api/github";
import gitlab from "./api/gitlab";

const gitApi = {
    defaults,
    endpoints: {
      gitlab,
      github
    }
}

function gitDo (endpoint) {
  const provider = localStorage.getItem("auth_provider")
  const token = localStorage.getItem("auth_token")

  return m.request({
      method: endpoint.method ? endpoint.method : "GET",
      url: endpoint.prefixed ? endpoint.url : gitApi.defaults[provider].base_url + endpoint.path,
      headers: gitApi.defaults[provider].headers(token),
      data: endpoint.data,
      deserialize: endpoint.deserialize ? endpoint.deserialize : undefined
  })
}
export { gitApi, gitDo };

