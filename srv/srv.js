const cds = require('@sap/cds');

module.exports = srv => {

    srv.before('CREATE', 'Author',  (req, res) => {
        if(!req.data.age) {
            const dAuthorDate = new Date(req.data.birthDate);
            const dCurrentDate = new Date();
            req.data.age = dAuthorDate.getMonth() >= dCurrentDate.getMonth() 
            && dAuthorDate.getDay() >= dCurrentDate.getDay() ? 
            dCurrentDate.getFullYear() - dAuthorDate.getFullYear() - 1
            : dCurrentDate.getFullYear() - dAuthorDate.getFullYear() ;
        }
    });

}