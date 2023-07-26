using { sap.starwars as sw } from '../db/scheme';

service Library @(path: '/browse') {
    
    entity Book as projection on sw.Book;
    entity Author as projection on sw.Author;
    entity Character as projection on sw.Character;

    function getTheOldestAuthor() returns String;
    function getTheYoungestAuthor() returns String;
    function timeBetweenTwoDates(firstDate: String, secondDate: String) returns String;
}