const co = require('co');

exports.pics = (req, res, next) => {
    co(function*() {
        try {
            const services = yield req.getServices();
            const picService = services.picService;
            const result = yield picService.show();
            res.render('index', {pics: result});
        } catch (err) {
            next(err);
        }
    });
};

exports.data = (req, res, next) => {
    co(function*() {
        try {
            const services = yield req.getServices();
            const picService = services.picService;
            const result = yield picService.show();
            res.send(result);
        } catch (err) {
            next(err);
        }
    });
};
