
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('student_subscription_school', {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    school_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    is_subscribed: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    tableName: 'student_subscription_school',
    timestamps: true,
    createdAt: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "student_id" },
          { name: "school_id" },
        ]
      },
    ],
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
};
