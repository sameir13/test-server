import dbConnect from "@/config/dbConnect";
import userModel from "../../../models/user";

export default async function handler(req, res) {
  dbConnect();

  try {
    var id = JSON.parse(atob(req.cookies.AccessToken.split(".")[1])).id;
    const foundUser = await userModel.findById(id, { password: false });

    if (!foundUser) {
      res.status(404).json({
        success: false,
        message: "Profile not found!!",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: foundUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
}
