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

  //user method for association
  User.associate = (models) => {
    //User has a 1 to N relationship with Messages model
    //on user deletion, cascade delete all messages
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };

  //user method to find user by 'login' term which would be username or email
  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }
  };
  return User;
};

export default getUserModel;
