
var Fruta = require('../models/fruta');
var debug = require('debug')('blog:post_controller');

module.exports.getOne = (req, res, next) => {
    debug("Search Fruit", req.params.id);

    Fruta.findById(req.params.id)
        .then((fruta) => {
            debug("Found Fruta", fruta);
            if (fruta)
                return res.status(200).json(fruta);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

module.exports.create = (req, res, next) => {
    debug("Create Fruta");
    Fruta.findOne({
            nombre: req.body.nombre
        })
        .then(fruta => {
            if (fruta) {
                throw new Error("La fruta no existe");
            } else {

                let fruta = new Fruta({
                    nombre: req.body.nombre,
                    peso: req.body.peso,
                    color:req.body.nombre ,
                    crece_en_arbol:req.body.crece_en_arbol,
                    calorias: req.body.calorias
                });

                return fruta.save()
            }
        })
        .then(fruta => {
            debug(fruta);
            return res
                .status(201)
                .json({
                    _id: fruta._id,
                    nombre: fruta.nombre,
                    peso: fruta.peso,
                    color: fruta.color,
                    crece_en_arbol: fruta.crece_en_arbol,
                    calorias: fruta.calorias

                });
        })
        .catch(err => {
            next(err)
        });
}

module.exports.find = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    debug(" Fruits List", {
        size: perPage,
        page,
        search: req.params.search
    });

    var filter = {
        state: {
            "$ne": "draft"
        }
    }

    if (!req.listFruta) {

        filter = {
            ...filter,
            "$or": [{
                    $text: {
                        $search: req.params.search
                    }
                },
                {
                    "tags": {
                        "$regex": `${req.params.search}`
                    }
                }
            ]
        }
    }

    debug("Filter With", filter);


    Fruta.find()
        .where(filter)
        .limit(perPage)
        .skip(perPage * page)
        .then((frutas) => {
            debug("Count fruits", frutas.length);
            return res.status(200).json(frutas)
        }).catch(err => {
            next(err);
        });
}

module.exports.update = (req, res, next) => {
    debug("Post Fruit", req.params.id);

    let update = {
        ...req.body
    };


    Fruta.findByIdAndUpdate(req.params.id, update)
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });

}

module.exports.delete = (req, res, next) => {

    debug("Delete Fruit", req.params.id);

    Fruta.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (data) res.status(200).json(data);
            else res.status(404).send();
        }).catch(err => {
            next(err);
        })
}