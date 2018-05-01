import Global from "../store"
import Post from "../store/post"

const gitApi = {
    defaults: {
        github: {
            base_url: "https://api.github.com",
            headers(token) {
                return {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': token ? ('Bearer ' + token) : undefined
                }
            }
        },
        gitlab: {
            base_url: "https://gitlab.com/api/v4",
            scopes: "api+read_user",
            headers(token) {
                return { 'Authorization': token ? ('Bearer ' + token) : undefined }
            }
        },
        bitbucket: {
            base_url: "https://api.bitbucket.org/2.0",
            headers(token) {
                return { 'Authorization': token ? ('Bearer ' + token) : undefined }
            }
        }
    },
    endpoints: {
      gitlab: {
        fetch(type, options) {
          return {
              type: type,
              path: "/projects/:repo/repository/tree",
              data: {
                  repo: encodeURIComponent(Global.repo),
                  path: type === "path" ? options.path : undefined
              }
          }
        },
        fetchFileRaw(blob_id) {
          return {
              path: "/projects/:repo/repository/blobs/:blob_id/raw",
              data: {
                  repo: encodeURIComponent(Global.repo),
                  blob_id: blob_id
              },
              deserialize: (value) => { return value }
          }
        },
        createFile() {
          return {
            type: "POST",
            path: "/projects/:repo/repository/files/:file",
            data: {
              branch: "",
              content: "",
              commit_message: ""
            }
          }
        },
        updateFile() {
          return {
            type: "PATCH",
            path: "/projects/:repo/repository/files/:file",
            data: {
              branch: "",
              content: "",
              commit_message: ""
            }
          }
        },
        delete(file) {
          return {
            type: "DELETE",
            path: "/projects/:repo/repository/files/:file",
            data: {
              branch: 'master',
              commit_message: 'Delete Article ' + file.name + ' by ME'
            }
          }
        },
        getCurrentUser() {
          return {
            url: `${gitApi.defaults[provider].base_url}/user`,
            headers: gitApi.defaults[provider].headers(data.token)
          }
        }
      },
      github: {
        fetch(type, options) {
          return {
              type: type,
              path: "",
              data: {}
          }
        },
        push() {
            path: "/"
        }
      }
    }
}

function gitDo (endpoint) {
  const provider = localStorage.getItem("auth_provider")
  const token = localStorage.getItem("auth_token")

  return m.request({
      method: endpoint.method ? endpoint.method : "GET",
      url: gitApi.defaults[provider].base_url + endpoint.path,
      headers: gitApi.defaults[provider].headers(token),
      data: endpoint.data,
      deserialize: endpoint.deserialize ? endpoint.deserialize : undefined
  })
}

export { gitApi, gitDo }
