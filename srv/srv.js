const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    this.on('CREATE', 'Book', function(req, res) {
        console.log("Data: ",req.data)
    })
})