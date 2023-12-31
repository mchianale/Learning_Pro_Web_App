import * as express from "express";
import {Request, Response} from "express";
const bodyParser = require('body-parser');
const cors = require('cors');
//Pg Admin 4
const sequelize = require('./sequelize-config.ts');
const { Op } = require('sequelize');
import {User, LearningEvent, LearningPackage, LearningFact, Follower, PackageLike, PackLearn} from './models';
//Other fun
import {isValidPassword,isValidEmail, NotNull, isValidString} from "./other_comp";


(async function Main() {
    //Load Data
    await sequelize.sync();

    //Load app
    const app = express();
    const port = 3000;
    app.use(bodyParser.json());
    app.use(cors());

    //API Open
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    //GET LIVENESS
    app.get('/api/liveness', (req: Request, res: Response) => {
        return res.status(200).send('API LIVE');
    });

    //LOGIN
    app.put('/api/login/:mail/:mdp', async (req, res) => {
        const mail =  req.params.mail
        const mdp = req.params.mdp
        const users = await User.findAll();
        const current_user = users.find((U) => U.mail === mail);
        if (!NotNull(current_user)) {return res.status(400).send({message: `User mail doesn't exists ${mail}`});}
        if (current_user.mdp === mdp){
            const token = Math.random().toString(36).substring(2) + Date.now().toString(36); //Token
            //Update token
            current_user.token = token
            await current_user.save()
            return res.status(201).send({ token });
        }
        else {
            return res.status(400).send({message:'Invalid Password'});
        }

    });
    //DISCONNECT
    app.put('/api/disconnect/:token', async (req, res) => {
        const token =  req.params.token
        const users = await User.findAll();
        const current_user = users.find((U) => U.token === token);
        if (!NotNull(current_user)) {return res.status(401).send({message: `Error Session doesn't exist`});}
        current_user.token = '';
        await current_user.save();
        return res.status(200).send({});
    });

    //REGISTER
    app.post('/api/register', async (req, res) => {
        const {username, mail, firstname, lastname, mdp} = req.body
        const users = await User.findAll();
        const already_user = users.find((U) => U.mail === mail);
        if (NotNull(already_user)) {return res.status(400).send({message: `User already exists with mail: ${mail}`});}
        const already_user_2 = users.find((U) => U.username === username);
        if (NotNull(already_user_2)) {return res.status(400).send({message: `Username already exists: ${username}`});}
        //Check input data are valid
        if(!isValidEmail(mail)){ return res.status(400).send({message:'Please provide a valid email'});}
        if(!isValidPassword(mdp)) { return res.status(400).send({message: 'please input a valid password, with at least 6 characters and at least one special character'});}

        if(!isValidString(firstname)){return res.status(400).send({message:'please input a valid firstname'});}
        if(!isValidString(lastname)){ return res.status(400).send({message:'please input a valid lastname'});}

        try {
            const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
            await User.bulkCreate([
                {username: username,  mail: mail, firstname: firstname, lastname: lastname , mdp: mdp, token: token},
            ])
            return res.status(201).json({token});
        } catch (error) {
            console.log('Failed to post a new package: ', error);
            return res.status(500).send({message: `Failed to create your account: ${error}`});
        }
    });
    //Get General User Information
    app.get('/api/informations/:token', async (req: Request, res: Response) => {
        const token =  req.params.token
        const users = await User.findAll();
        const current_user = users.find((U) => U.token === token);
        if (!NotNull(current_user)) {return res.status(401).send({message: `Error Session doesn't exist`});}
        //Following & Followers
        const followers = await Follower.findAll()
        const its_followers = followers.filter((F) : boolean => F.id_follower === current_user.username);
        const followings = await Follower.findAll()
        const its_followings = followings.filter((F) : boolean => F.id_following === current_user.username);
        return res.status(201).send({
            usernmae: current_user.username,
            mail: current_user.mail,
            firstname: current_user.firstname,
            lastname: current_user.lastname,
            follower: followers,
            following: followings
        });
    });

    //Get all public packages
    app.get('/api/packages', async (req, res) => {
        const packages = LearningPackage.findAll({where : {isPublic:true}});
        return res.status(201).send({packages})
    });


    //Get packages by filtering

    app.post('/api/packages/search_by_filters/:token', async (req, res) => {
        const filter = req.body;
        const token =  req.params.token
        const users = await User.findAll();
        const current_user = users.find((U) => U.token === token);
        let packages = []
        if (filter.isLike && !filter.created) {
            const liked_packages = await PackageLike.findAll({where : {liker: current_user.username}});
            const liked_package_ids = liked_packages.map(p => p.id_package);
            packages = await LearningPackage.findAll({where : {
                id_package :{
                        [Op.in]: liked_package_ids
                }
                }
            })
        }
        else if(filter.created && !filter.isLike) {
            packages = await LearningPackage.findAll({where : {username: current_user.username}});
        }
        else if(filter.isLike && filter.created) {
            const liked_packages = await PackageLike.findAll({where : {liker: current_user.username}});
            const liked_package_ids = liked_packages.map(p => p.id_package);
            packages = await LearningPackage.findAll({where : {
                    id_package :{
                        [Op.in]: liked_package_ids
                    },
                    username: current_user.username
                }
            })
        }
        else {
            packages = await LearningPackage.findAll({where : { isPublic: true }});
        }

        const PackFiltered = [];
        for (const lp of packages) {
            //title
            const lowerCaseSearchTitle = filter.title.toLowerCase();
            if (filter.title !== "" &&  !lp.title.toLowerCase().includes(lowerCaseSearchTitle)){
                continue;
            }
            if (filter.title !== "" &&  lp.title.toLowerCase().includes(lowerCaseSearchTitle)){
                PackFiltered.push(lp);
                continue;
            }
            //category
            if (filter.category !== "" &&  lp.category !== filter.category ){
                continue;
            }
            //targetAudience
            const lowerCasetargetAudience = filter.targetAudience.toLowerCase();
            if (filter.targetAudience !== "" &&  lp.targetAudience.toLowerCase().includes(lowerCasetargetAudience)){
                PackFiltered.push(lp);
                continue;
            }
            //difficultyLevel
            if(filter.difficultyLevel !== 0 && lp.difficultyLevel > filter.difficultyLevel) {
                continue;
            }

            PackFiltered.push(lp);
        }
        return res.status(201).send({PackFiltered});
    });
    //Package by ID
    app.get('/api/package_by_id/:id_package', async (req, res) => {
        const id_package =  +req.params.id_package;
        const pack = await  LearningPackage.findAll({where : {id_package: id_package}});
        if(pack) {
            return res.status(201).send({pack})
        }

    });
    //User Package ?
    app.get('/api/:token/:id_package', async (req, res) => {
        const id_package =  +req.params.id_package;
        const token =  req.params.token;
        const current_user = await User.findOne({where : {token: token}});
        let isUser = false;
        if (!NotNull(current_user)) {return res.status(201).send({isUser});}
        const pack = await LearningPackage.findOne({where : {id_package: id_package}});
        if(pack.username === current_user.username) {
            isUser = true;

            return res.status(201).send({isUser});
        }
        else {
            return res.status(201).send({isUser});
        }
    });
    //fact of a packages
    app.get('/api/:id_package', async (req, res) => {
        const id_package =  +req.params.id_package;
        const facts = await LearningFact.findAll({where: {id_package: id_package}})
        return res.status(201).send({facts});
    });
    //Learn a new package
    app.post('/api/learned/:token/:id_package/:check', async (req, res) => {
        const id_package =  +req.params.id_package;
        const check = +req.params.check;
        const token =  req.params.token;
        const users = await User.findAll();
        const current_user = users.find((U) => U.token === token);
        const pactLearn = await PackLearn.findOne({where : {learner: current_user.username, pack_learned: id_package}})
        if (pactLearn) {return res.status(201).send({isLearned:true});}
        if(check===1) { return res.status(201).send({isLearned:false});}
        const learns =  await PackLearn.bulkCreate([
            {learner: current_user.username, pack_learned: id_package}
        ])
        return res.status(201).send({isLearned:true})
    });

    //Create a new package ${token}/new_package
    app.post('/api/:token/new_package', async (req, res) => {
        const token =  req.params.token;
        const users = await User.findAll();
        const current_user = users.find((U) => U.token === token);
        const parameters = req.body;
        if(!NotNull(parameters.title) || !isValidString(parameters.title)) {return res.status(400).send({message: `Please provide a valid title`});}
        if(!NotNull(parameters.category)) {return res.status(400).send({message: `Please provide a category`});}
        if(!NotNull(parameters.targetAudience) || !isValidString(parameters.targetAudience)) {return res.status(400).send({message: `Please provide a valid targetAudience`});}
        if(parameters.difficultyLevel === 0) {return res.status(400).send({message: `Please provide a difficulty level`});}

        const new_package =  await LearningPackage.create(
            {
                title: parameters.title,
                description: parameters.description,
                category: parameters.category,
                targetAudience: parameters.targetAudience,
                difficultyLevel: parameters.difficultyLevel,
                username: current_user.username,
                isPublic: parameters.isPublic
            },
        )
        return res.status(201).send({id_package: new_package.id_package})
    });

    //Update package
    app.put('/api/update/:token/:id_package', async (req, res) => {
        const token =  req.params.token;
        const id_package = +req.params.id_package;
        const users = await User.findAll();
        const current_user = users.find((U) => U.token === token);
        const parameters = req.body;
        if(!NotNull(parameters.title) || !isValidString(parameters.title)) {return res.status(400).send({message: `Please provide a valid title`});}
        if(!NotNull(parameters.category)) {return res.status(400).send({message: `Please provide a category`});}
        if(!NotNull(parameters.targetAudience) || !isValidString(parameters.targetAudience)) {return res.status(400).send({message: `Please provide a valid targetAudience`});}
        if(parameters.difficultyLevel === 0) {return res.status(400).send({message: `Please provide a difficulty level`});}

        const existing_package = await LearningPackage.findOne({ where: { id_package: id_package } });

        if (!existing_package) {
            return res.status(404).send({ message: "Package not found" });
        }

        // Ensure that the current user is authorized to update the package
        if (existing_package.username !== current_user.username) {
            return res.status(403).send({ message: "Unauthorized to update this package" });
        }

        // Update the package
        await LearningPackage.update(
            {
                title: parameters.title,
                description: parameters.description,
                category: parameters.category,
                targetAudience: parameters.targetAudience,
                difficultyLevel: parameters.difficultyLevel,
                isPublic: parameters.isPublic
            },
            { where: { id_package: id_package} }
        );

        return res.status(200).send({ message: "Package updated successfully" });
    });

    //Create a new fact
    app.post('/api/:id_package/new_fact', async (req, res) => {
        const id_package =  +req.params.id_package;
        const parameters = req.body;
        if(!NotNull(parameters.name) || !isValidString(parameters.name)) {return res.status(400).send({message: `Please provide a valid name`});}
        const new_fact =  await LearningFact.create(
            {
                name: parameters.name,
                description: parameters.description,
                content: parameters.content,
                id_package: id_package
            },
        )
        return res.status(201).send({id_fact: new_fact.id_fact})
    });
    //getCurrentUser
    app.get('/api/user/:token/get_username', async (req, res) => {
        const token = req.params.token;
        const users = await User.findAll();
        const current_user = users.find((U) => U.token === token);
        if (!NotNull(current_user)) {return res.status(401).send({message: `User doesn't exist`});}
        return res.status(201).send({username:current_user.username});
    });
    //getUserInformation
    app.get('/api/user/get_information/:username', async (req, res) => {
        const username =  req.params.username;
        const users = await User.findAll();
        const current_user = users.find((U) => U.username === username);
        if (!NotNull(current_user)) {return res.status(401).send({message: `User doesn't exist`});}
        const pactLearns = await PackLearn.findAll({where : {learner: current_user.username}});
        const packCreated = await LearningPackage.findAll({where: {username: current_user.username}});
        const uniqueCategories = [...new Set(packCreated.map(pack => pack.category))];
        const learned_packs_id= pactLearns.map(p => p.pack_learned);
        const learned_packages = await LearningPackage.findAll({where : {
                id_package :{
                    [Op.in]: learned_packs_id
                }
            }
        })
        let totalDifficulty = 0;

        learned_packages.forEach(pack => {
            totalDifficulty += pack.difficultyLevel;
        });

        const meanDifficulty = totalDifficulty / learned_packages.length;
        return res.status(201).send({total_learned: pactLearns.length,
        total_created: packCreated.length,meanDifficulty: meanDifficulty, categories: uniqueCategories })

    });

})
()
