module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // 테이블명은 users로 바뀜
      nickname: {
        type: DataTypes.STRING(20), // 20글자 이하
        allowNull: false, // 필수
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true, // 고유한 값
      },
      password: {
        type: DataTypes.STRING(100), // 100글자 이하
        allowNull: false,
      },
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글이 저장돼요
    });
  
    User.associate = (db) => {
      db.User.hasMany(db.Post, { as: 'Posts' });
      db.User.hasMany(db.Comment);
      db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
      db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
      db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
    };
    //디비에서 foreignKey를 통해 *** as는 프론트에서 사용
    //반대로쓰는 포린키가 남의 테이블 아이디를 가리키기 위해 사용
  
    return User;
};