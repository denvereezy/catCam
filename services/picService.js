module.exports = function(connection) {
    this.upload = function(data) {
        const result = connection.query('insert into pics set ?', data, function(err, rows) {
            if (err) {
                return err;
            }
            return rows;
        });
    };
};
