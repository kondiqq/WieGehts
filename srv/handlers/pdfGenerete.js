const PDFDocument = require('pdfkit');
const fs = require('fs');
const blobStream = require('blob-stream');

function generatePDF() {
    const doc = new PDFDocument();

    // pipe the document to a blob
    const writer = doc.pipe( fs.createWriteStream('out.pdf') )
    
    // add your content to the document here, as usual
    
    // get a blob when you are done
    doc.end();
    fs.existsSync('out.pdf') ? fs.createReadStream('out.pdf').pipe() : console.error('Error')
}


module.exports = {
    generatePDF
}