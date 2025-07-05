import http from 'http'

const url = process.argv[2] || 'http://localhost:3000/health'

http.get(url, res => {
  console.log(`Health check status: ${res.statusCode}`)
  process.exitCode = res.statusCode === 200 ? 0 : 1
}).on('error', err => {
  console.error('Health check failed:', err.message)
  process.exitCode = 1
})
