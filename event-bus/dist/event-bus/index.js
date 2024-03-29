"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const events = [];
app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);
    axios_1.default.post('http://posts-clusterip-srv:4000/events', event);
    axios_1.default.post('http://comments-srv:4001/events', event);
    axios_1.default.post('http://query-srv:4002/events', event);
    axios_1.default.post('http://moderation-srv:4003/events', event);
    res.send({ status: 'OK' });
});
app.get('/events', (req, res) => {
    res.send(events);
});
app.listen(4005, () => {
    console.log("Listenning in 4005");
});
