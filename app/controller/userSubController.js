const User = require("../models/user");

class UserController {
  async getUsers(req, res) {
    try {

      const users = await User.find({
        isDeleted: false,
      });

      return res.status(200).json({
        success: true,
        users,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }

  async getUser(req, res) {
     try {

      const user = await User.findOne({
        _id: req.params.id,
        isDeleted: false,
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        user,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }

  async updateUser(req, res) {
     try {

      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
          isDeleted: false,
        },
        req.body,
        {
          new: true,
        }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }

  async deleteUser(req, res) {
   try {

      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
          isDeleted: false,
        },
        {
          isDeleted: true,
        },
        {
          new: true,
        }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
}

module.exports = new UserController();
