namespace sap.starwars;

using { managed, cuid } from '@sap/cds/common';


entity Book : managed {
    key ID      :    UUID;
    title       :    String(30);
    publishdata : Date;
    author      : Association to one Author;
    description : String(1000);
    
}

entity Author: managed {
    key ID      :    UUID;
    firstName   : String;
    secondName  : String;
    birthDate   : Date;
    placeBirth  : String;
    age         : Integer;

}