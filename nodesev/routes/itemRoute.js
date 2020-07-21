import express from "express";
import Item from "../models/itemModel";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

router.get("/categories", async (req, res) => {
  const categories = await Item.find().distinct("category");
  res.send(categories);
});
router.get("/", async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: "i",
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === "lowest"
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const items = await Item.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(items);
});

router.get("/:id", async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id });
  if (item) {
    res.send(item);
  } else {
    res.status(404).send({ message: "Item Not Found." });
  }
});

router.post("/:id/reviews", isAuth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (item) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    item.reviews.push(review);
    item.numReviews = item.reviews.length;
    item.rating =
      item.reviews.reduce((a, c) => c.rating + a, 0) / item.reviews.length;
    const updatedItem = await item.save();
    res.status(201).send({
      data: updatedItem.reviews[updatedItem.reviews.length - 1],
      message: "Review saved successfully.",
    });
  } else {
    res.status(404).send({ message: "Item Not Found" });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const itemId = req.params.id;
  const item = await Item.findById(itemId);
  if (item) {
    item.name = req.body.name;
    item.price = req.body.price;
    item.image = req.body.image;
    item.brand = req.body.brand;
    item.category = req.body.category;
    item.countInStock = req.body.countInStock;
    item.specification = req.body.specification;
    const updatedItem = await item.save();
    if (updatedItem) {
      return res
        .status(200)
        .send({ message: "Item Updated", data: updatedItem });
    }
  }

  return res.status(500).send({ message: " Error in Updating Item." });
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedItem = await Item.findById(req.params.id);
  if (deletedItem) {
    await deletedItem.remove();
    res.send({ message: "Item Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    specification: req.body.specification,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newItem = await item.save();
  if (newItem) {
    return res.status(201).send({ message: "New Item Created", data: newItem });
  }
  return res.status(500).send({ message: " Error in Creating Item." });
});

export default router;
