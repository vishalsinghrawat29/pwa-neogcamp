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
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const web_push_1 = __importDefault(require("web-push"));
const webpush_1 = __importDefault(require("../config/webpush"));
const LOCAL_STORAGE = {
    SUBSCRIPTIONS: [],
};
const app = (0, express_1.default)();
const port = 8080; // default port to listen
// Serve all files in client
app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
app.use(body_parser_1.default.json());
app.post('/subscription', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscription = req.body;
        LOCAL_STORAGE.SUBSCRIPTIONS.push(subscription);
        console.log('User subscribed', subscription);
        // Send 201 - resource created
        res.status(201).json({ status: 'okay' });
    }
    catch (e) {
        next(e);
    }
}));
app.get('/broadcast', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = { title: 'Hey, there is a exiciting offer for you', body: '🌇😃🍈😆🍜🍻😋⛅⛳😚' };
        const subscriptions = LOCAL_STORAGE.SUBSCRIPTIONS;
        const notifications = [];
        subscriptions.forEach((subscription) => {
            notifications.push(web_push_1.default.sendNotification(subscription, JSON.stringify(notification)));
        });
        yield Promise.all(notifications);
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
}));
(0, webpush_1.default)();
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map