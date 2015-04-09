var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function(req, res) {
    var request = require('request');
    request(
    {
        method: 'POST',
        uri: 'http://52.1.147.106:4567/ner',
        headers: {
            'content-type': 'application/json'
        },
        body: req.body
    },
    function(error, response, body) {
        if (error) {
            console.log('Fail to retrieve deptree');
        }
    });
};