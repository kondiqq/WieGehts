using { sap.starwars as sw } from '../db/scheme';

service Library @(path: '/browse') {
    
    entity Book as projection on sw.Book;
    entity Author as projection on sw.Author;
    entity Character as projection on sw.Character;


    type convertedImperialCurrency {
        amount   : Double;
        currency : String;
    }

    function getTheOldestAuthor() returns String;
    function getTheYoungestAuthor() returns String;
    function timeBetweenTwoDates(firstDate: String, secondDate: String) returns Integer;
    function convert2ImperialCredit(currType: String, quantity: Double) returns convertedImperialCurrency;
    function getNoBook() returns Integer;
    function getNoAuthor() returns Integer;
    function getPDFFile() returns Boolean;
}