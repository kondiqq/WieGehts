const cds = require('@sap/cds');

module.exports = srv => {
    const { Book, Author, Character} = srv.entities('Library');


//##################### BEFORE


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

//##################### ON

    // srv.on('READ', Author, async(req) => {
    //     const oExpand = await SELECT.from(Author).expand('books');
    //     return oExpand;
    // });

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
    });

    srv.on("timeBetweenTwoDates", async (req, res) => {
        const sFirstDate = req.data.firstDate;
        const sSecondDate = req.data.secondDate
        if(sFirstDate.at(0) === "0" && sSecondDate.at(0) === "0"){
            return 0;
        }
        const iFirstDateIndex = sFirstDate.indexOf("BBY") || sFirstDate.indexOf("ABY");
        const iSecondDateIndex = sSecondDate.indexOf("BBY") || sSecondDate.indexOf("ABY");
        const iParsedFirstDateNumber = parseInt(sFirstDate.slice(0, iFirstDateIndex));
        const iParsedSecondDateNumber = parseInt(sSecondDate.slice(0, iSecondDateIndex));
        if(sFirstDate.includes("BBY") && sSecondDate.includes("BBY") ||
            sFirstDate.includes("ABY") && sSecondDate.includes("ABY")) {
            return Math.abs(iParsedFirstDateNumber - iParsedSecondDateNumber);
        }
        return iParsedFirstDateNumber + iParsedSecondDateNumber;
    });

    srv.on('convert2ImperialCredit', async (req) => {
        if(req.data.quantity === 0){
            return JSON.stringify({amount: 0, currency:"₹"});
        }
        const Peggat2Credit = 0.025;
        const Trugut2Credit = 0.98;
        const Wupiupi2Credit = 0.625;
        let iResult = 0.00;
        if(req.data.currType === "Peggat") {
            iResult = parseFloat(req.data.quantity) * Peggat2Credit;
        }
        if(req.data.currType === "Trugut") {
            iResult = parseFloat(req.data.quantity) * Trugut2Credit;
        }
        if(req.data.currType === "Wupiupi") {
            iResult = parseFloat(req.data.quantity) * Wupiupi2Credit;
        }
        else {
            req.error(406, "Sorry wbut this currency is not supported yet, try again soon ;)")
        }
        return {amount: iResult.toFixed(2), currency:"₹"};
    });


    //##################### AFTER

}