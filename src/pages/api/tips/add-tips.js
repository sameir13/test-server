import tips from "@/models/tips";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res, next) {
  dbConnect();

  try {
    var slug = req.body.title
      .trim()
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--/g, "-");

    const edifyTips = await tips.create({ ...req.body, slug });
    res.status(201).json({
      success: true,
      message: edifyTips,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      if (error.keyPattern.slug) {
        return res.status(409).json({
          success: false,
          message: "Title Already Exists!",
        });
      }
    }

    // Error Handle for Required Fields
    if (error.message?.split(":")[2]?.split(",")[0]?.trim()) {
      var errMessage = error.message.split(":")[2].split(",")[0].trim();
      return res.status(400).json({
        success: false,
        message: errMessage,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
