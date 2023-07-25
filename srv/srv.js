const cds = require('@sap/cds');

module.exports = srv => {
    const { Book, Author, Character} = srv.entities('Library');

    srv.before('CREATE', Author,  (req, res) => {
        if(!req.data.age) {
            const dAuthorBDate = new Date(req.data.birthDate);
            const dCurrentDate = new Date();
            req.data.age = dAuthorBDate.getMonth() >= dCurrentDate.getMonth() 
            && dAuthorBDate.getDay() >= dCurrentDate.getDay() 
            ? dCurrentDate.getFullYear() - dAuthorBDate.getFullYear() - 1
            : dCurrentDate.getFullYear() - dAuthorBDate.getFullYear();
        }
    });

    srv.on("getTheOldestAuthor", async (req) => {
        let oQuery = SELECT `firstName,secondName,birthDate,age,nationality`
        .from(Author).orderBy({birthDate: 'asc'});
        let oResult = await cds.run(oQuery);
        return oResult;
    });

    srv.on("getTheYoungestAuthor", async (rec) => {
        let oQuery = SELECT`firstName,secondName,birthDate,age,nationality`
        .from(Author).orderBy({birthDate: 'desc'});
        let oResult = await cds.run(oQuery);
        return oResult;
    })
}