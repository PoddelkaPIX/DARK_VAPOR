module.exports = function(app){
    app.get('/liquids', function(req, res) {
        res.json([{
            "id": 1,
            "title": "TESTY",
            "price": 5,
            "description": "Клубничный джем с классическим кофе и ирисом",
            "count": -1, 
            "type": "Жидкости",
            "strengths": {
                "title": "Крепость",
                "values": [
                    {"title": "0", "value": 0},
                    {"title": "1.5", "value": 1.5},
                    {"title": "3", "value": 3},
                    {"title": "4.5", "value": 4.5},
                    {"title": "6", "value": 6},
                    {"title": "9", "value": 9},
                    {"title": "12", "value": 12},
                ]
            },
            "salts": [
                {"title": "10", "value": 10},
                {"title": "20", "value": 20},
            ]
        },
        {
            "id": 2,
            "title": "TOXIC",
            "price": 2,
            "description": "Яблочный джем",
            "count": -1, 
            "type": "Жидкости",
            "strengths": {
                "title": "Крепость",
                "values": [
                    {"title": "0", "value": 0},
                    {"title": "1.5", "value": 1.5},
                    {"title": "3", "value": 3},
                    {"title": "4.5", "value": 4.5},
                ]
            },
            "salts": [
                {"title": "10", "value": 10},
                {"title": "20", "value": 20},
            ]
        }])
    });

    app.get('/cottons', function(req, res) {
        res.json([
            {
                "id": 1,
                "title": "Вата мягкая",
                "price": 500,
                "count": -1, 
                "type": "Вата",
                "description": "Клубничный джем с классическим кофе и ирисом",
            },
            {
                "id": 2,
                "title": "Вата плотная",
                "price": 200,
                "count": -1, 
                "type": "Вата",
                "description": "Яблочный джем",
            }
        ])
    })
    app.get('/koils', function(req, res) {
        res.json([
            {
                "id": 3,
                "title": "Коил металлический",
                "price": 2000,
                "count": -1, 
                "type": "Коилы",
                "description": "Лёгкая тяга",
            },
        ])
    })
}