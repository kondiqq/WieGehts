namespace sap.starwars;

using { managed, cuid } from '@sap/cds/common';


entity Book  {
    key ID      : UUID;
    title       : localized String(30);
    publishDate : localized Date;
    author      : Association to Author;
    description : localized String(2137);
    publisher   : localized String;
    characters  : Association to many Character on characters.books = $self;
}

entity Author {
    key ID      : UUID;
    firstName   : localized String;
    secondName  : localized String;
    birthDate   : localized Date;
    placeBirth  : localized String;
    age         : localized Integer;
    nationality : localized String;
    books       : Association to many Book on books.author = $self;
}

entity Character {
    key ID :    UUID;
    name   : localized String;
    planet : localized String;
    race   : localized String;
    weight : localized Integer;
    height : localized Integer;
    books  : Association to many Book;
}