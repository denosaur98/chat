const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

app.use(cors())

app.get('/files', (req, res) => {
	const filePath = path.join(__dirname, 'files.json')
	res.sendFile(filePath)
})

app.listen(4200, () => {
	console.log('server start')
})
