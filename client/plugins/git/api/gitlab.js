import Global from "../../../store"
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
  createFile(file_path, commit) {
    return {
      method: "POST",
      path: `/projects/${encodeURIComponent(Global.repo)}/repository/files/:file_path`,
      data: {
        file_path: encodeURIComponent(file_path),
        branch: commit.branch,
        content: commit.content,
        commit_message: commit.message
      }
    }
  },
  updateFile(file_path, commit) {
    return {
      method: "PUT",
      path: `/projects/${encodeURIComponent(Global.repo)}/repository/files/:file_path`,
      data: {
        file_path: encodeURIComponent(file_path),
        branch: commit.branch,
        content: commit.content,
        commit_message: commit.message
      }
    }
  },
  deleteFile(file_path, commit) {
    return {
      method: "DELETE",
      path: `/projects/${encodeURIComponent(Global.repo)}/repository/files/:file_path`,
      data: {
        file_path: encodeURIComponent(file_path),
        branch: commit.branch || Global.branch,
        commit_message: commit.message || 'Delete Article ' + file.name + ' by ME'
      }
    }
  },
  getCurrentUser() {
    return {
      path: `/user`
    }
  }
}
