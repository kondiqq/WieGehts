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
    });

    srv.on("timeBetweenTwoDates", async (req, res) => {
        const sFirstDate = req.data.firstDate;
        const sSecondDate = req.data.secondDate
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
        const Peggat2Credit = 0.025;
        const Trugut2Credit = 0.98;
        const Wupiupi2Credit = 0.625;
        if(req.data.currType === "Peggat") {
            return JSON.stringify(req.data.quantity * Peggat2Credit + "₹");
        }
        if(req.data.currType === "Trugut") {
            return JSON.stringify(req.data.quantity * Trugut2Credit + "₹");
        }
        if(req.data.currType === "Wupiupi") {
            return JSON.stringify(req.data.quantity * Wupiupi2Credit + "₹");
        }
    });
}