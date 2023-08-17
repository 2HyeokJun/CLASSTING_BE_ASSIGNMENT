
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('student_receives_newsfeed', {
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      news_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'school_news',
          key: 'news_id',
        },
      },
    }, {
      sequelize,
      tableName: 'student_receives_newsfeed',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "student_id" },
            { name: "news_id" },
          ]
        },
      ],
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  };
  