const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let messages = []

app.get('/files', (req, res) => {
	const filePath = path.join(__dirname, 'files.json')
	res.sendFile(filePath)
})

app.get('/messages', (req, res) => {
	res.send(messages)
})

app.post('/message', (req, res) => {
	const { text, isMine, username = 'Гость' } = req.body

	const newMessage = {
		id: Date.now(),
		username: username,
		text,
		isMine: isMine !== undefined ? isMine : true,
		time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
		createdAt: new Date(),
	}

	messages.push(newMessage)
	res.status(201).json(newMessage)
})

app.get('/messages', (req, res) => {
	res.json(messages)
})

app.listen(4200, () => {
	console.log('server start')
})
