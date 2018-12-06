import { github } from "./defaults"
import Global from "../../../store/index"

export default {
  fetch(tree_sha) {
    return {
      path: `/repos/:repo/git/trees/${tree_sha}?recursive=1`,
      data: {
        repo: Global.repo
      }
    }
  },
  fetchFileRaw(raw_url) {
    return {
      prefixed: true,
      path: raw_url,
      deserialize: (blob) => { return atob(JSON.parse(blob).content) },
      async: false
    }
  },
  createFile(file_path, commit) {
    return {
      type: "PUT",
      path: "/repos/:repo/contents/:path",
      data: {
        path: file_path,
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
        path: file_path,
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
        path: file_path,
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
