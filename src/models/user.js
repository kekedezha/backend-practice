const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING, //username must be a string
      unique: true, //username must be unique
      allowNull: false, //username must not be null
      validate: {
        notEmpty: true, //username must not be empty
      },
    },
  });

  User.associate = (models) => {
    //User has a 1 to N relationship with Messages model
    //on user deletion, cascade delete all messages
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };

  return User;
};

export default getUserModel;
