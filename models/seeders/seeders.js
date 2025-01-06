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

    id:
        {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
    username:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
    email:
        {
            type: DataTypes.STRING,
            allowNull: false,
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
    showTiming:
        {
            type: DataTypes.DATE
        }

})

user.belongsTo(movies)
movies.belongsTo(user)
module.exports = {user , movies}
