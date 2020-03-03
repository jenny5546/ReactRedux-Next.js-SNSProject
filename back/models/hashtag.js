module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
    Hashtag.associate = (db) => {
      db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    };//다대다 관계, m:n 관계 는 belongsToMany **라는 애를 쓴다. 
    return Hashtag;
};