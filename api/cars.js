const express = require('express');
const router = express.Router();
const cars = require('../Cars');
const uuid = require('uuid');

//get all cars
router.get('/', (req, res) => {
    res.json(cars);
});

//get specifir car
router.get('/:id', (req, res) => {
    const found = cars.some(car => car.id === parseInt(req.params.id));

    if (found) {
        res.json(cars.filter(car => car.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `car not found with ${req.params.id}` });
    }

});

//create new record 
router.post('/', (req, res) => {
    const newCar = {
        id: uuid.v4(),
        model: req.body.model,
        version: req.body.version,
        hp: req.body.hp
    };

    if (!newCar.model || !newCar.version || !newCar.hp) {
        return res.status(400).json({ msg: 'please include model,version and hp' });
    }

    cars.push(newCar);
    res.json(cars);
});

//update car
router.put('/:id', (req, res) => {
    const found = cars.some(car => car.id === parseInt(req.params.id));

    if (found) {
        const updCar = req.body;
        cars.forEach(car => {
            if (car.id === parseInt(req.params.id)) {
                car.model = updCar.model ? updCar.model : car.model;
                car.version = updCar.version ? updCar.version : car.version;
                car.hp = updCar.hp ? updCar.hp : car.hp;

                res.json({ msg: "Car updated", car });
            }
        });
    } else {
        res.status(400).json({ msg: `car not found with ${req.params.id}` });
    }
});

//delete car
router.delete('/:id', (req, res) => {
    const found = cars.some(car => car.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: "car deleted",
            cars: cars.filter(car => car.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `car not found with ${req.params.id}` });
    }
});

module.exports = router;