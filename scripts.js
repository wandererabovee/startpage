/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "ecosia"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"2fvB1hYUH3nIc7R0","label":"reddit","bookmarks":[{"id":"V36bgIXjxpKwn2Oe","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"DXOc5RWmJY8XJ36k","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"zU4j45QYhpST92sP","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"nbnn5UYKp9O0pqw0","label":"design tools","bookmarks":[{"id":"CIPGCSB9E5TcipyO","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"LGxd00kUzwjlUHkg","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"mcrElDaML8NgD3D1","label":"haikei","url":"https://app.haikei.app/"},{"id":"OVcDOhMggdXKDlBN","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"a3yplzCbMAyfpeI8","label":"worth reading","bookmarks":[{"id":"hFuMjOBf14muVwM2","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"Wx5QwGlqrtReYyCX","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"4ijYFMggy8WaDDwx","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"SJNCaZWXI1CEUA1B","label":"sources","bookmarks":[{"id":"mWjSCAmsKGyHV9Mi","label":"icons","url":"https://feathericons.com/"},{"id":"TpWX7FazjjZHdaCj","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"STTE8Qk8KTl67qbz","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"KvsxXy7wh5Nxc7PD","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
