var resultsNotFound = {
    "errorCode": "0",
    "errorMessage": "Server Error.",
    "rowCount": "0",
    "data": ""
};

module.exports = {
    checkInputDataNULL: function(req, res) {
        if (!req.body) return res.send(resultsNotFound);
    },
    checkInputDataQuality: function(req, res) {
        resultsNotFound["errorMessage"] = "There is no data submitted from Client.";
        if (req.body.inputEmail == "") return res.send(resultsNotFound);
    },
};