const {Sequelize , DataTypes } = require( 'sequelize')

const sequelizeConnect = new Sequelize("movie_res" , "root" , "ammar12345678" ,
    {
        host: "localhost",
        dialect: "mysql",
    })

sequelizeConnect.sync()
    .then(() => {
        console.log("Sequelize connected successfully.");


    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });



const user = sequelizeConnect.define("user", {

    user_id:
        {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
    username:
        {
            type: DataTypes.STRING,

        },
    email:
        {
            type: DataTypes.STRING,
        },
    password:
        {
            type: DataTypes.STRING,
        },
    role:
        {
            type: DataTypes.STRING,
            defaultValue: "user"
        }

})

const movies = sequelizeConnect.define("movies", {

    id:
        {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
    name:
        {
            type: DataTypes.STRING,
        },
    genre:
        {
            type: DataTypes.STRING,
        },
    user_id:
        {
            type: DataTypes.INTEGER,
        },

})


const ShowTime = sequelizeConnect.define("ShowTime", {
    showTimeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.STRING,
    },
    startTime: {
        type: DataTypes.DATE,
    },
    endTime: {
        type: DataTypes.DATE,
    },
    seats: {
        type: DataTypes.INTEGER,
    },

    moviesId: {
        type: DataTypes.INTEGER
        }
});

const Booking = sequelizeConnect.define("Booking", {
    bookingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    showTimeId: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING",
    },
    moviesId: {
        type: DataTypes.INTEGER,
    },
});


// async function seedAdmin() {
//     const hashPassword = await bcrypt.hash("admin098098", 10)
//     await user.create({
//         username: "admin",
//         email: "admin@gmail.com",
//         password: hashPassword,
//         role: "admin",
//     })
// }
// const admin = seedAdmin()
// console.log(admin)

// movies  and ShowTime (One-to-Many)

user.hasOne(movies , {foreignKey: "user_id"})
movies.belongsTo(user , {foreignKey: "user_id"})


movies.hasMany(ShowTime, { foreignKey: "moviesId" });
ShowTime.belongsTo(movies, { foreignKey: "moviesId" });

movies.hasMany(ShowTime, {
    foreignKey: 'moviesId',
    onDelete: 'CASCADE',
});
ShowTime.belongsTo(movies, {
    foreignKey: 'moviesId',
});


// ShowTime and Booking (Many-to-Many)
ShowTime.belongsToMany(Booking, { through: "ShowTimeBookings", foreignKey: "showTimeId" });
Booking.belongsToMany(ShowTime, { through: "ShowTimeBookings", foreignKey: "bookingId" });


// Exporting Models
module.exports = {user , movies ,  ShowTime , Booking};

