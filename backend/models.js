"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackLearn = exports.PackageLike = exports.Follower = exports.LearningEvent = exports.LearningFact = exports.LearningPackage = exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize = require('./sequelize-config.ts');
//User
const User = sequelize.define('userfit', {
    username: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    mail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mdp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: '', // Set the default value to an empty string
    },
}, { timestamps: false });
exports.User = User;
const LearningFact = sequelize.define('learning_fact', {
    id_fact: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: '',
    }
}, { timestamps: false });
exports.LearningFact = LearningFact;
const LearningPackage = sequelize.define('learning_package', {
    id_package: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: sequelize_1.DataTypes.TEXT,
    category: sequelize_1.DataTypes.STRING,
    targetAudience: sequelize_1.DataTypes.TEXT,
    difficultyLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 1,
            max: 20, // Maximum value
        },
    },
    isPublic: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, { timestamps: false });
exports.LearningPackage = LearningPackage;
//Learning Event
const LearningEvent = sequelize.define('event', {
    id_event: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    start: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    end: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    primary: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isLearn: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    secondary: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    secondaryText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: false });
exports.LearningEvent = LearningEvent;
//Following systems
const Follower = sequelize.define('followers', {
    id_follower: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: 'userfits', key: 'username' }
    },
    id_following: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: 'userfits', key: 'username' }
    }
}, { timestamps: false });
exports.Follower = Follower;
//System of likes
const PackageLike = sequelize.define('packageLikes', {
    liker: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: 'userfits', key: 'username' }
    },
    like_package: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'learning_packages', key: 'id_package' }
    }
}, { timestamps: false });
exports.PackageLike = PackageLike;
const PackLearn = sequelize.define('pack_learn', {
    id_learn: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    learner: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pack_learned: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });
exports.PackLearn = PackLearn;
//Relations
User.hasMany(LearningPackage, { as: 'user_package', foreignKey: 'username', onDelete: 'CASCADE' });
LearningPackage.belongsTo(User, { foreignKey: 'username' });
LearningPackage.hasMany(LearningFact, { as: 'package_fact', foreignKey: 'id_package', onDelete: 'CASCADE' });
LearningFact.belongsTo(LearningPackage, { foreignKey: 'id_package' });
User.hasMany(LearningEvent, { as: 'user_event', foreignKey: 'username', onDelete: 'CASCADE' });
LearningEvent.belongsTo(User, { foreignKey: 'username' });
User.belongsToMany(User, { as: 'Followings', through: Follower, foreignKey: 'id_follower', otherKey: 'id_following' });
User.belongsToMany(User, { as: 'Followers', through: Follower, foreignKey: 'id_following', otherKey: 'id_follower' });
User.belongsToMany(LearningPackage, { as: 'LikedPackages', through: PackageLike, foreignKey: 'liker', otherKey: 'like_package' });
LearningPackage.belongsToMany(User, { as: 'LikedBy', through: PackageLike, foreignKey: 'like_package', otherKey: 'liker' });
User.belongsToMany(LearningPackage, { as: 'learnPacks', through: PackLearn, foreignKey: 'learner', otherKey: 'pack_learned' });
LearningPackage.belongsToMany(User, { as: 'LearnedBy', through: PackLearn, foreignKey: 'pack_learned', otherKey: 'learner' });
//# sourceMappingURL=models.js.map