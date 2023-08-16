
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('school_news', {
    news_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    school_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'school_list',
        key: 'school_id',
      },
      allowNull: false
    },
    news_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'school_news',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "news_id" },
        ]
      },
    ],
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
};
