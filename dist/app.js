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
const bookController_1 = require("./app/controler/bookController");
const borrowControler_1 = require("./app/controler/borrowControler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/books', bookController_1.booksRoute);
app.use('/api/borrow', borrowControler_1.borrowRoute);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Ecommerce Backend ");
}));
exports.default = app;
