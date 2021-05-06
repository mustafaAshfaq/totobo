export enum SportsEnum{
    SOCCER=1,
    CRICKET=3,
    RUGBY=8,
    BOXING=9,
    AMERICAN_FOOTBALL=12,
    TENNIS=13,
    SNOOKER=14,
    DARTS=15,
    BASEBALL=16,
    ICEHOCKEY=17,
    BASKETBALL=18,
    RUGBY_LEAGUE=19,
    AUSTRALIAN_RULES=36,
    BOWLS=66,
    GAELIC_SPORTS=75,
    HANDBALL=78,
    FUTSAL=83,
    FLOORBALL=90,
    VOLLEYBALL=91,
    TABLE_TENNIS=92,
    BADMINTON=94,
    BEACH_VOLLEYBALL=95,
    SQUASH=107,
    WATER_POLO=110,
    E_SPORTS=151

}

export enum TimeStatusEnum{
    NOT_STARTED="0",
    INPLAY="1",
    TOBEFIXED="2",
    ENDED="3",
    POSTPONED="4",
    CANCELLED="5",
    WALKOVER="6",
    INTERRUPTED="7",
    ABANDONED="8",
    RETIRED="9",
    REMOVED="99"
}
/*
0	Not Started
1	InPlay
2	TO BE FIXED
3	Ended
4	Postponed
5	Cancelled
6	Walkover
7	Interrupted
8	Abandoned
9	Retired
99	Removed
*/
export const  getSportEnumByValue=function(value){
  if(value===undefined || value===null)
    return undefined;
    switch(SportsEnum[value]){
      case <keyof typeof SportsEnum> "SOCCER":
        return SportsEnum.SOCCER;
      case <keyof typeof SportsEnum> "CRICKET":
        return SportsEnum.CRICKET;
      case <keyof typeof SportsEnum> "RUGBY":
        return SportsEnum.RUGBY;
      case <keyof typeof SportsEnum> "BOXING":
        return SportsEnum.BOXING;
      case <keyof typeof SportsEnum> "AMERICAN_FOOTBALL":
        return SportsEnum.AMERICAN_FOOTBALL;
      case <keyof typeof SportsEnum> "TENNIS":
        return SportsEnum.TENNIS;
      case <keyof typeof SportsEnum> "SNOOKER":
        return SportsEnum.SNOOKER;
      case <keyof typeof SportsEnum> "BASEBALL":
        return SportsEnum.BASEBALL;
      case <keyof typeof SportsEnum> "ICEHOCKEY":
        return SportsEnum.ICEHOCKEY;
      case <keyof typeof SportsEnum> "BASKETBALL":
        return SportsEnum.BASKETBALL;
      case <keyof typeof SportsEnum> "BADMINTON":
        return SportsEnum.BADMINTON;
      case <keyof typeof SportsEnum> "TABLE_TENNIS":
        return SportsEnum.TABLE_TENNIS;
      case <keyof typeof SportsEnum> "VOLLEYBALL":
        return SportsEnum.VOLLEYBALL;
      case <keyof typeof SportsEnum> "FLOORBALL":
        return SportsEnum.FLOORBALL;
      case <keyof typeof SportsEnum> "FUTSAL":
        return SportsEnum.FUTSAL;
      case <keyof typeof SportsEnum> "HANDBALL":
        return SportsEnum.HANDBALL;
      case <keyof typeof SportsEnum> "GAELIC_SPORTS":
        return SportsEnum.GAELIC_SPORTS;
      case <keyof typeof SportsEnum> "BOWLS":
        return SportsEnum.BOWLS;
      case <keyof typeof SportsEnum> "AUSTRALIAN_RULES":
        return SportsEnum.AUSTRALIAN_RULES;
      case <keyof typeof SportsEnum> "RUGBY_LEAGUE":
        return SportsEnum.RUGBY_LEAGUE;
      case <keyof typeof SportsEnum> "BEACH_VOLLEYBALL":
        return SportsEnum.BEACH_VOLLEYBALL;
      case <keyof typeof SportsEnum> "SQUASH":
        return SportsEnum.SQUASH;
      case <keyof typeof SportsEnum> "WATER_POLO":
        return SportsEnum.WATER_POLO;
      case <keyof typeof SportsEnum> "WATER_POLO":
    }
}
