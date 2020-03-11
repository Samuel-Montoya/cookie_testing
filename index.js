const express = require('express')
const session = require('express-session')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://192.168.100.122'] }))

// app.set('trust proxy', 1)
app.use(session({
    secret: 'SECRET_KEY_HEEEE',
    resave: false,
    proxy: true,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false, maxAge: 600000 }
}))

app.get('/', (req, res) => {
    console.log(req.sessionID)
    if (req.session.views) {
        req.session.views++
        res.send(req.session.views.toString())
    } else {
        req.session.views = 1
        res.send('Started View Count!')
    }
})

app.listen(5050, _ => console.log('Getting smacked on port 5050'))