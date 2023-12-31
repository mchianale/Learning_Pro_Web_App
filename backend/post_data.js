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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require('./sequelize-config.ts');
const models_1 = require("./models");
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
    //User
    const users = yield models_1.User.bulkCreate([
        { username: 'user0', mail: 'user0@gmail.com', firstname: 'M.', lastname: 'Toto', mdp: 'Test' },
        { username: 'mister design', mail: 'mister design@gmail.com', firstname: 'M.', lastname: 'Design', mdp: 'Test' },
        { username: 'amine', mail: 'amine@gmail.com', firstname: 'Amine', lastname: 'Sho', mdp: 'Test' },
        { username: 'mchianale', mail: 'matteo.chianale75@gmail.com', firstname: 'Matteo', lastname: 'Chianale', mdp: 'Test' },
        { username: 'mr_learning', mail: 'mr_learning@gmail.com', firstname: 'Mr', lastname: 'Learning', mdp: 'Test' },
    ]);
    const jsonData = yield readFileAsync('learning_packages.json', 'utf8');
    const packagesData = JSON.parse(jsonData);
    const jsonData2 = yield readFileAsync('facts_data.json', 'utf8');
    const factsData = JSON.parse(jsonData2);
    yield sequelize.sync();
    yield models_1.LearningPackage.bulkCreate(packagesData);
    yield models_1.LearningFact.bulkCreate(factsData);
    console.log('Data inserted successfully.');
}));
//# sourceMappingURL=post_data.js.map