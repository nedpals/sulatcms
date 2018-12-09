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
      url: raw_url,
      deserialize: (blob) => { return atob(JSON.parse(blob).content) },
      async: false
    }
  },
  createFile(file_path, commit) {
    return {
      method: "PUT",
      path: `/repos/${Global.repo}/contents/${encodeURIComponent(file_path)}`,
      data: {
        branch: commit.branch || Global.branch,
        content: btoa(commit.content),
        message: commit.message
      }
    }
  },
  updateFile(file_path, commit) {
    return {
      method: "PUT",
      path: `/repos/${Global.repo}/contents/${encodeURIComponent(file_path)}`,
      data: {
        branch: commit.branch || Global.branch,
        content: btoa(commit.content),
        message: commit.message,
        sha: commit.sha
      }
    }
  },
  deleteFile(commit) {
    return {
      method: "DELETE",
      path: `/repos/${Global.repo}/contents/${encodeURIComponent(file_path)}`,
      data: {
        branch: commit.branch,
        message: commit.message,
        sha: commit.sha
      }
    }
  },
  getCurrentUser() {
    return {
      path: `/user`
    }
  }
}
