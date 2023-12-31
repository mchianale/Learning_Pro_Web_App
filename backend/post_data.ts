const sequelize = require('./sequelize-config.ts');
import  {User, LearningEvent, LearningPackage, LearningFact ,PackLearn  } from './models';
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
sequelize.sync({ force: true }).then(async () => {
    //User
    const users =  await User.bulkCreate([
        {username: 'user0', mail: 'user0@gmail.com', firstname: 'M.', lastname: 'Toto', mdp: 'Test'},
        {username: 'mister design', mail: 'mister design@gmail.com', firstname: 'M.', lastname: 'Design', mdp: 'Test'},
        {username: 'amine', mail: 'amine@gmail.com', firstname: 'Amine', lastname: 'Sho', mdp: 'Test'},
        {username: 'mchianale', mail: 'matteo.chianale75@gmail.com', firstname: 'Matteo', lastname: 'Chianale', mdp: 'Test'},
        {username: 'mr_learning', mail: 'mr_learning@gmail.com', firstname: 'Mr', lastname: 'Learning', mdp: 'Test'},

    ])
    const jsonData = await readFileAsync('learning_packages.json', 'utf8');
    const packagesData = JSON.parse(jsonData);
    const jsonData2 = await readFileAsync('facts_data.json', 'utf8');
    const factsData = JSON.parse(jsonData2);

    await sequelize.sync();
    await LearningPackage.bulkCreate(packagesData);
    await LearningFact.bulkCreate(factsData)

    console.log('Data inserted successfully.');
});