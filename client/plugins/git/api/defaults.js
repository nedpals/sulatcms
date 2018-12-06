const github = {
  base_url: "https://api.github.com",
  headers(token) {
    return {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': token ? ('token ' + token) : undefined
    }
  }
}

const gitlab = {
  base_url: "https://gitlab.com/api/v4",
  scopes: "api+read_user",
  headers(token) {
    return { 'Authorization': token ? ('Bearer ' + token) : undefined }
  }
}

const bitbucket = {
  base_url: "https://api.bitbucket.org/2.0",
  headers(token) {
    return { 'Authorization': token ? ('Bearer ' + token) : undefined }
  }
}

export {
  github,
  gitlab,
  bitbucket
}
