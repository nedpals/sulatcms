import { github } from "./defaults"

export default {
  fetch(type, options) {
    return {
      type: type,
      path: "/repos/:repo/contents/:path",
      data: {
        repo: Global.repo,
        path: type === "path" ? options.path : ""
      }
    }
  },
  fetchFileRaw(raw_url) {
    return {
      prefixed: true,
      path: "raw_url",
      deserialize: (value) => { return value },
      async: false
    }
  },
  createFile(commit) {
    return {
      type: "PUT",
      path: "/repos/:repo/contents/:path",
      data: {
        branch: commit.branch,
        content: btoa(commit.content),
        message: commit.message
      }
    }
  },
  updateFile(commit) {
    return {
      type: "PUT",
      path: "/repos/:repo/contents/:path",
      data: {
        branch: commit.branch,
        content: btoa(commit.content),
        message: commit.message,
        sha: commit.sha
      }
    }
  },
  deleteFile(commit) {
    return {
      type: "DELETE",
      path: "/repos/:repo/contents/:path",
      data: {
        branch: commit.branch,
        content: btoa(commit.content),
        message: 'Delete Article ' + file.name + ' by ME',
        sha: commit.sha
      }
    }
  },
  getCurrentUser() {
    return {
      prefixed: true,
      url: `${github.base_url}/user`
    }
  }
}
