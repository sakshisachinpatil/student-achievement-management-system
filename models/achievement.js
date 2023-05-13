'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async getAchievements(){
      return await this.findAll({
        order: [['date', 'DESC']],
      });
    }
    static async getAchievement(id) {
      return await this.findByPk(id);
    }
    static async createAchievement(contestOrCourseName, originalname, path, date) {
      return await this.create({
        contestOrCourseName,
        fileName: originalname,
        filePath: path.split('/')[1] + "/" + path.split('/')[2],
        date,
      });
    }

    static async removeAchievement(id) {
      return this.destroy({
        where: {
          id
        }
      });
    }
  }
  Achievement.init({
    contestOrCourseName: DataTypes.STRING,
    fileName: DataTypes.STRING,
    filePath: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Achievement',
  });
  return Achievement;
};