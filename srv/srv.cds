using { sap.starwars as sw } from '../db/scheme';
@path: 'browse'

service Library {
    entity Book as SELECT from sw.Book;
    entity Author as SELECT from sw.Author;
    entity Character as SELECT from sw.Character;
    // function getTheOldestAuthor(authorID: UUID) returns Integer;
    // function getTheOldestBook(bookID: UUID) returns Integer;
}