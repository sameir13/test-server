import tips from "@/models/tips";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  const findTrick = await tips.findOne({
    slug: req.query.slug,
  });

  if (!findTrick) {
    return res.status(404).json({
      success: false,
      message: "Not Found!!",
    });
  }

  try {
    switch (req.method) {
      case "GET":
        const findSingle = await tips.findById(findTrick._id).populate("author", "fullName email")
        res.status(200).json({
          success: true,
          message: findSingle,
        });
        break;

      case "DELETE":
        const remove = await tips.findByIdAndDelete(findTrick._id);
        res.status(200).json({
          success: true,
          message: "Deleted!!",
        });
        break;

      case "PUT":
        const edit = await tips.findByIdAndUpdate(findTrick._id, {$set:req.body},{new:true});
        res.status(200).json({
          success: true,
          message: "Updated!!",
        });
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
}
