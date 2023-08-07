const PDFDocument = require('pdfkit');
const fs = require('fs');
const blobStream = require('blob-stream');

function genPDF() {
    const doc = new PDFDocument();

    // pipe the document to a blob
    const writer = doc.pipe( fs.createWriteStream('out.pdf') )
    
    // add your content to the document here, as usual
    
    // get a blob when you are done
    doc.end();
    fs.open('out.pdf', 'r', function(err, f){
        console.log('GreatJob')
    })
}


module.exports = {
    genPDF
}