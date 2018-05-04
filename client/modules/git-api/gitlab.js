import Global from "../../store"
import { gitlab } from "./defaults"

export default {
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
      deserialize: (value) => { return value },
      async: false
    }
  },
  createFile(file, commit) {
    return {
      type: "POST",
      path: "/projects/:repo/repository/files/:file",
      data: {
        branch: commit.branch,
        content: commit.content,
        commit_message: commit.message
      }
    }
  },
  updateFile(file, commit) {
    return {
      type: "PATCH",
      path: "/projects/:repo/repository/files/:file",
      data: {
        branch: commit.branch,
        content: commit.content,
        commit_message: commit.message
      }
    }
  },
  deleteFile(file, commit) {
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
      prefixed: true,
      url: `${gitlab.base_url}/user`
    }
  }
}
