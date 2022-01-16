const router = require("express").Router();
const multer = require("multer");
const productControllers = require('./controllers')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.get("/",productControllers.index);
router.get("/product/:id",productControllers.view);
router.post("/product", upload.single("image"),productControllers.store);
router.put("/product/:id",upload.single("image"), productControllers.update);
router.delete("/product/:id",productControllers.destroy);



module.exports = router;