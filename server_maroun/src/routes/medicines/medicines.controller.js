const Medicine = require('../../models/medicines.model');

exports.create = (req, res) => {
    const medicine = new Medicine({
        name: req.body.name,
        dosage: req.body.dosage,
        expDate: req.body.expDate,
        openDate: req.body.openDate,
        quantity: req.body.quantity,
        number: req.body.number,
        location: req.body.location,
        description: req.body.description
    });

    medicine.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findAll = (req, res) => {
    Medicine.find()
        .then(medicines => {
            res.send(medicines);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};