import {DataTypes} from 'sequelize';
const sequelize = require('./sequelize-config.ts');

//User
const User = sequelize.define('userfit', {
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mdp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '', // Set the default value to an empty string
    },
}, {timestamps: false});


const LearningFact = sequelize.define('learning_fact', {
    id_fact: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type:  DataTypes.TEXT,
        allowNull: false,
    },
    content: {
        type:  DataTypes.TEXT,
        defaultValue: '',
    }
}, {timestamps: false});

const LearningPackage = sequelize.define('learning_package', {
    id_package: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    targetAudience: DataTypes.TEXT,
    difficultyLevel: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true, // Ensure it's an integer
            min: 1,      // Minimum value
            max: 20,     // Maximum value
        },
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {timestamps: false});

//Learning Event
const LearningEvent = sequelize.define('event', {
    id_event:  {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start: {
        type : DataTypes.DATE,
        allowNull: false,
    },
    end: {
        type : DataTypes.DATE,
        allowNull: false,
    },
    primary: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isLearn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    secondary: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secondaryText: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {timestamps: false});

//Following systems
const Follower = sequelize.define('followers', {
    id_follower: {
        type: DataTypes.STRING,
        references: { model: 'userfits', key: 'username' }
    },
    id_following: {
        type: DataTypes.STRING,
        references: { model: 'userfits', key: 'username' }
    }
}, { timestamps: false });
//System of likes
const PackageLike = sequelize.define('packageLikes', {
    liker: {
        type: DataTypes.STRING,
        references: { model: 'userfits', key: 'username' }
    },
    like_package: {
        type: DataTypes.INTEGER,
        references: { model: 'learning_packages', key: 'id_package' }
    }
}, { timestamps: false });

const PackLearn = sequelize.define('pack_learn', {
    id_learn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    learner: {
        type: DataTypes.STRING,
        allowNull: false

    },
    pack_learned: {
        type: DataTypes.INTEGER,
        allowNull: false

    }
}, { timestamps: false });

//Relations
User.hasMany(LearningPackage, { as: 'user_package', foreignKey: 'username', onDelete: 'CASCADE'  });
LearningPackage.belongsTo(User, { foreignKey: 'username' });

LearningPackage.hasMany(LearningFact, { as: 'package_fact', foreignKey: 'id_package', onDelete: 'CASCADE'  });
LearningFact.belongsTo(LearningPackage, { foreignKey: 'id_package' });

User.hasMany(LearningEvent, { as: 'user_event', foreignKey: 'username', onDelete: 'CASCADE'  });
LearningEvent.belongsTo(User, { foreignKey: 'username' });

User.belongsToMany(User, { as: 'Followings', through: Follower, foreignKey: 'id_follower', otherKey: 'id_following' });
User.belongsToMany(User, { as: 'Followers', through: Follower, foreignKey: 'id_following', otherKey: 'id_follower' });

User.belongsToMany(LearningPackage, { as: 'LikedPackages', through: PackageLike, foreignKey: 'liker', otherKey: 'like_package' });
LearningPackage.belongsToMany(User, { as: 'LikedBy', through: PackageLike, foreignKey: 'like_package', otherKey: 'liker' });

User.belongsToMany(LearningPackage, { as: 'learnPacks', through: PackLearn, foreignKey: 'learner', otherKey: 'pack_learned' });
LearningPackage.belongsToMany(User, { as: 'LearnedBy', through: PackLearn, foreignKey: 'pack_learned', otherKey: 'learner' });

export {User, LearningPackage, LearningFact, LearningEvent, Follower, PackageLike, PackLearn}