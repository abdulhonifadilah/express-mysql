const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('mysql-eduwork','root','root',{
    host: 'localhost',
    dialect:'mysql'
})


module.exports= sequelize;