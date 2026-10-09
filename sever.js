
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DB_FILE = path.join(__dirname, 'database.json');

if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], payments: [] }));
}

function readDB() {
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    
    req.on('end', () => {
        const db = readDB();
        const urlParts = req.url.split('/');
        const route = urlParts[2]; 
        const emailParam = urlParts[3]; 

        if (req.method === 'POST' && route === 'signup') {
            const { fullName, email, gamerTag, password } = JSON.parse(body);
            
            if (db.users.find(u => u.email === email)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Email already in use" }));
            }

            db.users.push({ fullName, email, gamerTag, password });
            writeDB(db);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "User created successfully" }));
        }

        if (req.method === 'GET' && route === 'profile' && emailParam) {
            const user = db.users.find(u => u.email === emailParam);
            if (!user) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "User not found" }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(user));
        }

        if (req.method === 'PUT' && route === 'profile' && urlParts[3] === 'update' && urlParts[4]) {
            const email = urlParts[4];
            const { fullName, gamerTag } = JSON.parse(body);
            const userIndex = db.users.findIndex(u => u.email === email);
            
            if (userIndex !== -1) {
                if (fullName) db.users[userIndex].fullName = fullName;
                if (gamerTag) db.users[userIndex].gamerTag = gamerTag;
                writeDB(db);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(db.users[userIndex]));
            }
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "User not found" }));
        }

        if (req.method === 'POST' && route === 'pay') {
            const { email, amount } = JSON.parse(body);
            db.payments.push({ email, amount, date: new Date(), status: 'Completed' });
            writeDB(db);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Payment successful" }));
        }

        if (req.method === 'GET') {
            let filePath = req.url === '/' ? '/index.html' : req.url;
            filePath = path.join(__dirname, filePath);
            
            const ext = path.extname(filePath);
            let contentType = 'text/html';
            if (ext === '.css') contentType = 'text/css';
            if (ext === '.js') contentType = 'text/javascript';
            if (ext === '.png') contentType = 'image/png';
            if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                }
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server is running!`);
    console.log(`👉 Open your browser and go to: http://localhost:${PORT}`);
});