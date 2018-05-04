import Global from "../store"
import Post from "../store/post"

import gitlab from "./git-api/gitlab"
import github from "./git-api/github"
import * as defaults from "./git-api/defaults"

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
      url: endpoint.prefixed ? endpoint.path : gitApi.defaults[provider].base_url + endpoint.path,
      headers: gitApi.defaults[provider].headers(token),
      data: endpoint.data,
      deserialize: endpoint.deserialize ? endpoint.deserialize : undefined
  })
}
export { gitApi, gitDo }
