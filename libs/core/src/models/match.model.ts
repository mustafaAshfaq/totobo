export class Match{
    MatchID:number;
    OptionCount:number;
    Odds1ID:number;
    Odds0ID:number;
    Odds2ID:number;
    //Odds1:[old:number,new:number];
    Odds1:Number;
    Odds0:Number;
    Odds2:Number;
    Odds1Old:Number;
    Odds0Old:Number;
    Odds2Old:Number;
    BetStatus:string;
    MarketID:number;
    SportID:number;
    CategoryID:number;
    Sport:string;
    TournamentID:number;
    Category:string;
    Tournament:string;
    Competitor1:string;
    Competitor2:string;
    MatchDate:Date;
    MatchTime:string;
    MatchScore:string;
    SportOrder:number;
    CategoryOrder:number;
    TournamentOrder: number;
    PeriodLength:number;
    Status:string;
}