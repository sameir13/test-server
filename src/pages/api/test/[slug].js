import dbConnect from "@/config/dbConnect";
import test from "@/models/test";

export default async function handler(req, res) {
  dbConnect();

  try {
    const findTest = await test.findOne({slug:req.query.slug});
    if (!findTest) {
      res.status(404).json({
        success: false,
        message: "Test not found",
      });

      return;
    }

    switch (req.method) {

/*finding single test-------------------------------*/
      case "GET":
        const findOneTest = await test.findOne({ slug: req.query.slug });
        res.status(200).json({
          success: true,
          message: findOneTest,
        });

        break;
/*deleting a test----------------------------*/
      case "DELETE":
        const removeOneTest = await test.findByIdAndDelete(findTest?._id);
        res.status(200).json({
          success: true,
          message: "Deleted Successfully",
        });

        break;
/*updating a test-----------------------------*/
      case "PUT":
        const updateOneTest = await test.findByIdAndUpdate(
          findTest?._id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json({
          success: true,
          message: "Updated Successfully",
        });

        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })

  }
}
