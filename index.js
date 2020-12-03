const fs = require('fs').promises

const types = {
  txt: 'text/plain',
  css: 'text/css',
  html: 'text/html',
  js: 'application/javascript',
}

require('http').createServer(handleRequest)
  .listen(3000, () => console.log('server started at http://localhost:3000'))

async function handleRequest(request, response) {
  const {url, method} = request

  if (url.startsWith('/api/')) {
    handleAPI(request, response)
  } else {
    const path = 'public' + (url=='/' ? '/index.html' : url)

    try {
      const file = await fs.readFile(path)
      const ext = path.match(/\.([^./]+)$/)
      let extension
      if (ext) extension = ext[1]
      response.setHeader('content-type', types[extension || 'txt'])
      response.end(file)
    } catch (error) {
      response.statusCode = 404
      response.end('404 file not found')
    }


  }
}
