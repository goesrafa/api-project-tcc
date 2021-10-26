module.exports = (sequelize, DataTypes) => {
    const Hospital = sequelize.define(
      "Hospital",
      {
        Hospital_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
      },
      {
        tableName: "hospital",
      }
    );
  
    Hospital.associate = (models) => {
      Hospital.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          field: "hospital_id",
          name: "hospital_id",
        },
      });
    };
  
    return Hospital;
  };
  