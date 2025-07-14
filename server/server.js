import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";
import http from 'http'; 
import { Server } from 'socket.io'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = jsonServer.create(); 
const router = jsonServer.router(path.join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*", 
    }
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(middlewares);

router.render = (req, res) => {
    // Se a requisição for de modificação (POST, PUT, PATCH, DELETE)
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        io.emit('data-updated');
        console.log('Data updated, emitting event to clients.');
    }
    res.jsonp(res.locals.data);
};

app.use(router);

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`JSON Server com WebSocket está rodando em http://localhost:${PORT}`);
});
