using { sap.starwars as sw } from '../db/scheme';
@path: 'browse'

service FootballManager {
    entity Book as projection on sw.Book;
    annotate Book with @odata.draft.enabled;
    entity Author as projection on sw.Author;
    annotate Author with @odata.draft.enabled;
    // entity Coach as projection on sw.Coach;
    // annotate Coach with @odata.draft.enabled;
    // entity Ligue as projection on sw.Ligue;
    // annotate Ligue with @odata.draft.enabled;
    
}