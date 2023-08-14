const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('school_newsfeed', {
    newsfeed_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    school_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    newsfeed_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'school_newsfeed',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "newsfeed_id" },
        ]
      },
    ],
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
};
