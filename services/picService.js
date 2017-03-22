const QueryService = require('./queryService');

module.exports = function(connection) {
    const queryService = new QueryService(connection);

    this.upload = (data) => {
        return queryService.executeQuery('insert into pics set ?', data);
    };

    this.show = () => {
        return queryService.executeQuery('select * from pics');
    };
};
