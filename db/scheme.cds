namespace sap.starwars;

using { managed, cuid } from '@sap/cds/common';


entity Book : managed {
    key ID      :    UUID;
    title       :    String(30);
    publishDate : Date;
    author      : Association to one Author;
    description : String(1000);
    publisher   : String;
}

entity Author: managed {
    key ID      :    UUID;
    firstName   : String;
    secondName  : String;
    birthDate   : Date;
    placeBirth  : String;
    age         : Integer;
    nationality : String;
}

entity Character: managed {
    key ID :    UUID;
    name   :    String;
    planet :    String;
    pace   :    String;
    weight :    Integer;
    height :    Integer;
}