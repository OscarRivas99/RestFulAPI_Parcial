var express = require('express');
var router = express.Router();
var FrutaController = require('../controllers/FrutaController');


router.get("/search/:search", FrutaController.find);
router.get("/:id",FrutaController.getOne);
router.get("/", (req,res,next) => { req.listFruta = true; next()},FrutaController.find);

router.post("/", FrutaController.create);
router.put("/:id",FrutaController.update);

router.delete("/:id",FrutaController.delete);
module.exports = router;
