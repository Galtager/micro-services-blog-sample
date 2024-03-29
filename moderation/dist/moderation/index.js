"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.post('/events', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, type } = req.body;
    if (type === "commentCreated") {
        const comment = data;
        const status = comment.text.includes('orange') ? 'rejected' : 'approved';
        console.log("commentModerated status to - ", comment.text, status);
        yield axios_1.default.post("http://event-bus-srv:4005/events", {
            type: "commentModerated",
            data: Object.assign(Object.assign({}, comment), { status })
        });
    }
    res.send({});
}));
app.listen(4003, () => {
    console.log("Listenning in 4003");
});
