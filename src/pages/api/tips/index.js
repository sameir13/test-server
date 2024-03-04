import tips from "@/models/tips";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    var match = {};
    var tricks = {};
    var limit = req.query.limit || 6;
    var page = req.query.page || 1;
    var skip = limit * (page - 1);

    if (req.query.title) {
      match.title = new RegExp(req.query.title, "i");
    }

    if (req.query.slug) {
      tricks.data = await tips.find(match, { slug: 1, updatedAt: 1 });
      tricks.count = await tips.find().count();
    } else {
      tricks.data = await tips
        .find(match, { Metadesc: 0, metaTitle: 0 })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .populate("author", "fullName email")
      tricks.count = await tips.find(match).sort({ createdAt: -1 }).count()
    }

    tricks.starting = skip + 1;
    tricks.ending =
      tricks.starting + limit - 1 > tricks.count
        ? tricks.count
        : tricks.starting + limit - 1;
    res.status(201).json({
      success: true,
      tricks,
      limit,
    });
  } catch (error) {
    console.log(error);
  }
}
