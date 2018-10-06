"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const analisisArticulosC_1 = __importDefault(require("../controllers/analisisArticulosC"));
const Resolvers = {
    Query: {
        articulos() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield analisisArticulosC_1.default();
            });
        },
        metadiaria(args, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("--------------------------------------------");
                console.log(args);
                console.log("--------------------------------------------");
                console.log(context);
                console.log("--------------------------------------------");
                console.log(info);
                return "hello";
            });
        },
    },
};
exports.default = Resolvers;
//# sourceMappingURL=resolvers.js.map