"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_push_1 = __importDefault(require("web-push"));
const publicVapidKey = 'BJZasrx93lvmYKsqCfYuiXfCU_KyNI2PJM1xkvBIvp_SXsvBQ2H1pwmSbBpxoOWIVqpgRpS5fLTWnDoRX2cvBNQ';
const privateVapidKey = 'e1I69lwZVyAfXrJ-Oiog5jGQtvaUCFtkc0P9Ox8NfRk';
exports.default = () => {
    web_push_1.default.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);
};
//# sourceMappingURL=webpush.js.map