namespace sap.starwars;

using { managed, cuid } from '@sap/cds/common';


entity Book  {
    key ID      :    UUID;
    title       :    String(30);
    publishDate : Date;
    author      : Association to one Author;
    description : String(2137);
    publisher   : String;
    characters  : Association to many Character on characters.books = $self;
}

entity Author {
    key ID      :    UUID;
    firstName   : String;
    secondName  : String;
    birthDate   : Date;
    placeBirth  : String;
    age         : Integer;
    nationality : String;
}

entity Character {
    key ID :    UUID;
    name   :    String;
    planet :    String;
    race   :    String;
    weight :    Integer;
    height :    Integer;
    books  : Association to many Book;
}