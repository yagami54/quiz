// مُولّد تلقائيًا — منتخبات بتشكيلة 4-3-3 (نادي + مركز) · شعارات TheSportsDB المجاني
export type FieldPos = "GK" | "DEF" | "MID" | "FWD";
export interface NationalTeamClub { name: string; badge: string; pos: FieldPos; }
export interface NationalTeam { name: string; aliases: string[]; clubs: NationalTeamClub[]; }

export const NATIONAL_TEAMS: NationalTeam[] = [
  {
    "name": "البرازيل",
    "aliases": [
      "البرازيل",
      "brazil",
      "brasil"
    ],
    "clubs": [
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "GK"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "DEF"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png",
        "pos": "DEF"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png",
        "pos": "DEF"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "DEF"
      },
      {
        "name": "Newcastle",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5jevk91653487832.png",
        "pos": "MID"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
        "pos": "MID"
      },
      {
        "name": "West Ham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/hfum4l1599931799.png",
        "pos": "MID"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png",
        "pos": "FWD"
      },
      {
        "name": "Al Hilal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5trzvq1660439102.png",
        "pos": "FWD"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "الأرجنتين",
    "aliases": [
      "الأرجنتين",
      "الارجنتين",
      "argentina"
    ],
    "clubs": [
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png",
        "pos": "GK"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png",
        "pos": "DEF"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
        "pos": "DEF"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png",
        "pos": "DEF"
      },
      {
        "name": "Benfica",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0pywy21662316682.png",
        "pos": "DEF"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "MID"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png",
        "pos": "MID"
      },
      {
        "name": "AS Roma",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jwro2s1760820674.png",
        "pos": "MID"
      },
      {
        "name": "Inter Miami",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/m4it3e1602103647.png",
        "pos": "FWD"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png",
        "pos": "FWD"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "فرنسا",
    "aliases": [
      "فرنسا",
      "france"
    ],
    "clubs": [
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png",
        "pos": "GK"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "DEF"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "DEF"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "DEF"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png",
        "pos": "DEF"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "MID"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "MID"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "MID"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "FWD"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png",
        "pos": "FWD"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "إنجلترا",
    "aliases": [
      "إنجلترا",
      "انجلترا",
      "england"
    ],
    "clubs": [
      {
        "name": "Newcastle",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5jevk91653487832.png",
        "pos": "GK"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "DEF"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "DEF"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "DEF"
      },
      {
        "name": "Chelsea",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png",
        "pos": "DEF"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png",
        "pos": "MID"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "MID"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "MID"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png",
        "pos": "FWD"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "FWD"
      },
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "إسبانيا",
    "aliases": [
      "إسبانيا",
      "اسبانيا",
      "spain",
      "espana"
    ],
    "clubs": [
      {
        "name": "Athletic Bilbao",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/68w7fe1639408210.png",
        "pos": "GK"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png",
        "pos": "DEF"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png",
        "pos": "DEF"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "DEF"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png",
        "pos": "DEF"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "MID"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png",
        "pos": "MID"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png",
        "pos": "MID"
      },
      {
        "name": "Athletic Bilbao",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/68w7fe1639408210.png",
        "pos": "FWD"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png",
        "pos": "FWD"
      },
      {
        "name": "Real Sociedad",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vptvpr1473502986.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "ألمانيا",
    "aliases": [
      "ألمانيا",
      "المانيا",
      "germany"
    ],
    "clubs": [
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png",
        "pos": "GK"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "DEF"
      },
      {
        "name": "Bayer Leverkusen",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3x9k851726760113.png",
        "pos": "DEF"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "DEF"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png",
        "pos": "DEF"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "MID"
      },
      {
        "name": "Bayer Leverkusen",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3x9k851726760113.png",
        "pos": "MID"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "MID"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "FWD"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png",
        "pos": "FWD"
      },
      {
        "name": "Borussia Dortmund",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/tqo8ge1716960353.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "البرتغال",
    "aliases": [
      "البرتغال",
      "portugal"
    ],
    "clubs": [
      {
        "name": "Al Nassr",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/84yvqi1748524565.png",
        "pos": "GK"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "DEF"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png",
        "pos": "DEF"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "DEF"
      },
      {
        "name": "Al Nassr",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/84yvqi1748524565.png",
        "pos": "DEF"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
        "pos": "MID"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png",
        "pos": "MID"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "MID"
      },
      {
        "name": "Al Nassr",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/84yvqi1748524565.png",
        "pos": "FWD"
      },
      {
        "name": "Sporting Lisbon",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ohj6ih1628855978.png",
        "pos": "FWD"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "إيطاليا",
    "aliases": [
      "إيطاليا",
      "ايطاليا",
      "italy",
      "italia"
    ],
    "clubs": [
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png",
        "pos": "GK"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png",
        "pos": "DEF"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "DEF"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png",
        "pos": "DEF"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png",
        "pos": "DEF"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png",
        "pos": "MID"
      },
      {
        "name": "Atalanta",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/qix5ku1780561327.png",
        "pos": "MID"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png",
        "pos": "MID"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png",
        "pos": "FWD"
      },
      {
        "name": "Atalanta",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/qix5ku1780561327.png",
        "pos": "FWD"
      },
      {
        "name": "AS Roma",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jwro2s1760820674.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "هولندا",
    "aliases": [
      "هولندا",
      "netherlands",
      "holland"
    ],
    "clubs": [
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "GK"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "DEF"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png",
        "pos": "DEF"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "DEF"
      },
      {
        "name": "Ajax",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zg9tii1755495289.png",
        "pos": "DEF"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "MID"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png",
        "pos": "MID"
      },
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png",
        "pos": "MID"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "FWD"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png",
        "pos": "FWD"
      },
      {
        "name": "PSV Eindhoven",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xfsz6i1721297428.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "بلجيكا",
    "aliases": [
      "بلجيكا",
      "belgium"
    ],
    "clubs": [
      {
        "name": "Bournemouth",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/y08nak1534071116.png",
        "pos": "GK"
      },
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png",
        "pos": "DEF"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png",
        "pos": "DEF"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png",
        "pos": "DEF"
      },
      {
        "name": "Atalanta",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/qix5ku1780561327.png",
        "pos": "DEF"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png",
        "pos": "MID"
      },
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png",
        "pos": "MID"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "MID"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png",
        "pos": "FWD"
      },
      {
        "name": "Atalanta",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/qix5ku1780561327.png",
        "pos": "FWD"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "كرواتيا",
    "aliases": [
      "كرواتيا",
      "croatia"
    ],
    "clubs": [
      {
        "name": "Dinamo Zagreb",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/araidi1579955395.png",
        "pos": "GK"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "DEF"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png",
        "pos": "DEF"
      },
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png",
        "pos": "DEF"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png",
        "pos": "DEF"
      },
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png",
        "pos": "MID"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "MID"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "MID"
      },
      {
        "name": "Wolverhampton Wanderers",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/u9qr031621593327.png",
        "pos": "FWD"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png",
        "pos": "FWD"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "المغرب",
    "aliases": [
      "المغرب",
      "morocco",
      "maroc"
    ],
    "clubs": [
      {
        "name": "Al Hilal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5trzvq1660439102.png",
        "pos": "GK"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png",
        "pos": "DEF"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "DEF"
      },
      {
        "name": "Real Betis",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2oqulv1663245386.png",
        "pos": "DEF"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
        "pos": "DEF"
      },
      {
        "name": "Fenerbahce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/twxxvs1448199691.png",
        "pos": "MID"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "MID"
      },
      {
        "name": "West Ham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/hfum4l1599931799.png",
        "pos": "MID"
      },
      {
        "name": "Al Nassr",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/84yvqi1748524565.png",
        "pos": "FWD"
      },
      {
        "name": "Sevilla",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vpsqqx1473502977.png",
        "pos": "FWD"
      },
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "أوروغواي",
    "aliases": [
      "أوروغواي",
      "اوروغواي",
      "uruguay"
    ],
    "clubs": [
      {
        "name": "Inter Miami",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/m4it3e1602103647.png",
        "pos": "GK"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "DEF"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png",
        "pos": "DEF"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png",
        "pos": "DEF"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "DEF"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "MID"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "MID"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
        "pos": "MID"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "FWD"
      },
      {
        "name": "Bologna",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2qi1u31655592366.png",
        "pos": "FWD"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "اليابان",
    "aliases": [
      "اليابان",
      "japan"
    ],
    "clubs": [
      {
        "name": "Celtic",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3uv1641758780002.png",
        "pos": "GK"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "DEF"
      },
      {
        "name": "AS Monaco",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/exjf5l1678808044.png",
        "pos": "DEF"
      },
      {
        "name": "Feyenoord",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uturtx1473534803.png",
        "pos": "DEF"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png",
        "pos": "DEF"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "MID"
      },
      {
        "name": "Real Sociedad",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vptvpr1473502986.png",
        "pos": "MID"
      },
      {
        "name": "Sporting Lisbon",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ohj6ih1628855978.png",
        "pos": "MID"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png",
        "pos": "FWD"
      },
      {
        "name": "Stuttgart",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yppyux1473454085.png",
        "pos": "FWD"
      },
      {
        "name": "Mainz 05",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/fhm9v51552134916.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "كوريا الجنوبية",
    "aliases": [
      "كوريا الجنوبية",
      "كوريا",
      "korea",
      "south korea"
    ],
    "clubs": [
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "GK"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "DEF"
      },
      {
        "name": "Mainz 05",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/fhm9v51552134916.png",
        "pos": "DEF"
      },
      {
        "name": "Genoa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/52s8dn1655553600.png",
        "pos": "DEF"
      },
      {
        "name": "Newcastle",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5jevk91653487832.png",
        "pos": "DEF"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png",
        "pos": "MID"
      },
      {
        "name": "Wolverhampton Wanderers",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/u9qr031621593327.png",
        "pos": "MID"
      },
      {
        "name": "Brentford",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/grv1aw1546453779.png",
        "pos": "MID"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png",
        "pos": "FWD"
      },
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png",
        "pos": "FWD"
      },
      {
        "name": "Stuttgart",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yppyux1473454085.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "السنغال",
    "aliases": [
      "السنغال",
      "senegal"
    ],
    "clubs": [
      {
        "name": "Chelsea",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png",
        "pos": "GK"
      },
      {
        "name": "Al Hilal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5trzvq1660439102.png",
        "pos": "DEF"
      },
      {
        "name": "Crystal Palace",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ia6i3m1656014992.png",
        "pos": "DEF"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png",
        "pos": "DEF"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png",
        "pos": "DEF"
      },
      {
        "name": "Everton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/eqayrf1523184794.png",
        "pos": "MID"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png",
        "pos": "MID"
      },
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png",
        "pos": "MID"
      },
      {
        "name": "Al Nassr",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/84yvqi1748524565.png",
        "pos": "FWD"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "FWD"
      },
      {
        "name": "Sevilla",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vpsqqx1473502977.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "أمريكا",
    "aliases": [
      "أمريكا",
      "امريكا",
      "usa",
      "united states"
    ],
    "clubs": [
      {
        "name": "Borussia Dortmund",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/tqo8ge1716960353.png",
        "pos": "GK"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "DEF"
      },
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png",
        "pos": "DEF"
      },
      {
        "name": "Fulham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xwwvyt1448811086.png",
        "pos": "DEF"
      },
      {
        "name": "Bournemouth",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/y08nak1534071116.png",
        "pos": "DEF"
      },
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png",
        "pos": "MID"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "MID"
      },
      {
        "name": "Leeds United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jcgrml1756649030.png",
        "pos": "MID"
      },
      {
        "name": "Crystal Palace",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ia6i3m1656014992.png",
        "pos": "FWD"
      },
      {
        "name": "Lille",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2giize1534005340.png",
        "pos": "FWD"
      },
      {
        "name": "Nottingham Forest",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/bk4qjs1546440351.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "النرويج",
    "aliases": [
      "النرويج",
      "norway"
    ],
    "clubs": [
      {
        "name": "Nottingham Forest",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/bk4qjs1546440351.png",
        "pos": "GK"
      },
      {
        "name": "Lecce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/j4vznr1567365249.png",
        "pos": "DEF"
      },
      {
        "name": "Real Betis",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2oqulv1663245386.png",
        "pos": "DEF"
      },
      {
        "name": "Bayer Leverkusen",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3x9k851726760113.png",
        "pos": "DEF"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png",
        "pos": "DEF"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png",
        "pos": "MID"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "MID"
      },
      {
        "name": "Lazio",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/rwqyvs1448806608.png",
        "pos": "MID"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "FWD"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png",
        "pos": "FWD"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "المكسيك",
    "aliases": [
      "المكسيك",
      "mexico"
    ],
    "clubs": [
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png",
        "pos": "GK"
      },
      {
        "name": "Fulham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xwwvyt1448811086.png",
        "pos": "DEF"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "DEF"
      },
      {
        "name": "Feyenoord",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uturtx1473534803.png",
        "pos": "DEF"
      },
      {
        "name": "AEK Athens",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/4nogst1602773624.png",
        "pos": "DEF"
      },
      {
        "name": "Sevilla",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vpsqqx1473502977.png",
        "pos": "MID"
      },
      {
        "name": "Real Betis",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2oqulv1663245386.png",
        "pos": "MID"
      },
      {
        "name": "Ajax",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zg9tii1755495289.png",
        "pos": "MID"
      },
      {
        "name": "PSV Eindhoven",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xfsz6i1721297428.png",
        "pos": "FWD"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "FWD"
      },
      {
        "name": "West Ham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/hfum4l1599931799.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "كولومبيا",
    "aliases": [
      "كولومبيا",
      "colombia"
    ],
    "clubs": [
      {
        "name": "Crystal Palace",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ia6i3m1656014992.png",
        "pos": "GK"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "DEF"
      },
      {
        "name": "Crystal Palace",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ia6i3m1656014992.png",
        "pos": "DEF"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png",
        "pos": "DEF"
      },
      {
        "name": "River Plate",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/03dmi31645539717.png",
        "pos": "DEF"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "MID"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png",
        "pos": "MID"
      },
      {
        "name": "Atalanta",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/qix5ku1780561327.png",
        "pos": "MID"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "FWD"
      },
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png",
        "pos": "FWD"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "سويسرا",
    "aliases": [
      "سويسرا",
      "switzerland"
    ],
    "clubs": [
      {
        "name": "AS Monaco",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/exjf5l1678808044.png",
        "pos": "GK"
      },
      {
        "name": "Newcastle",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5jevk91653487832.png",
        "pos": "DEF"
      },
      {
        "name": "Bayer Leverkusen",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3x9k851726760113.png",
        "pos": "DEF"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "DEF"
      },
      {
        "name": "Bologna",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2qi1u31655592366.png",
        "pos": "DEF"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png",
        "pos": "MID"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "MID"
      },
      {
        "name": "Real Betis",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2oqulv1663245386.png",
        "pos": "MID"
      },
      {
        "name": "Stuttgart",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yppyux1473454085.png",
        "pos": "FWD"
      },
      {
        "name": "Bologna",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2qi1u31655592366.png",
        "pos": "FWD"
      },
      {
        "name": "AS Monaco",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/exjf5l1678808044.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "الدنمارك",
    "aliases": [
      "الدنمارك",
      "الدانمارك",
      "denmark"
    ],
    "clubs": [
      {
        "name": "AS Roma",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jwro2s1760820674.png",
        "pos": "GK"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png",
        "pos": "DEF"
      },
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png",
        "pos": "DEF"
      },
      {
        "name": "Sporting Lisbon",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ohj6ih1628855978.png",
        "pos": "DEF"
      },
      {
        "name": "Crystal Palace",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ia6i3m1656014992.png",
        "pos": "DEF"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
        "pos": "MID"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "MID"
      },
      {
        "name": "Atalanta",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/qix5ku1780561327.png",
        "pos": "MID"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
        "pos": "FWD"
      },
      {
        "name": "Brentford",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/grv1aw1546453779.png",
        "pos": "FWD"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "بولندا",
    "aliases": [
      "بولندا",
      "بولونيا",
      "poland"
    ],
    "clubs": [
      {
        "name": "Bournemouth",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/y08nak1534071116.png",
        "pos": "GK"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "DEF"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png",
        "pos": "DEF"
      },
      {
        "name": "FC Porto",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xu47rb1628855600.png",
        "pos": "DEF"
      },
      {
        "name": "Como",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/02x81t1627405841.png",
        "pos": "DEF"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
        "pos": "MID"
      },
      {
        "name": "AS Roma",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jwro2s1760820674.png",
        "pos": "MID"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png",
        "pos": "MID"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png",
        "pos": "FWD"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png",
        "pos": "FWD"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "السويد",
    "aliases": [
      "السويد",
      "sweden"
    ],
    "clubs": [
      {
        "name": "Lens",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3pxoum1598797195.png",
        "pos": "GK"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "DEF"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png",
        "pos": "DEF"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
        "pos": "DEF"
      },
      {
        "name": "Feyenoord",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uturtx1473534803.png",
        "pos": "DEF"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png",
        "pos": "MID"
      },
      {
        "name": "Ajax",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zg9tii1755495289.png",
        "pos": "MID"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "MID"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png",
        "pos": "FWD"
      },
      {
        "name": "Inter Miami",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/m4it3e1602103647.png",
        "pos": "FWD"
      },
      {
        "name": "Sporting Lisbon",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ohj6ih1628855978.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "صربيا",
    "aliases": [
      "صربيا",
      "serbia"
    ],
    "clubs": [
      {
        "name": "Eintracht Frankfurt",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/rurwpy1473453269.png",
        "pos": "GK"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png",
        "pos": "DEF"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "DEF"
      },
      {
        "name": "Fenerbahce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/twxxvs1448199691.png",
        "pos": "DEF"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "DEF"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png",
        "pos": "MID"
      },
      {
        "name": "Lazio",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/rwqyvs1448806608.png",
        "pos": "MID"
      },
      {
        "name": "Fulham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xwwvyt1448811086.png",
        "pos": "MID"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "FWD"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "FWD"
      },
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "النمسا",
    "aliases": [
      "النمسا",
      "austria"
    ],
    "clubs": [
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "GK"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png",
        "pos": "DEF"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png",
        "pos": "DEF"
      },
      {
        "name": "Stuttgart",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yppyux1473454085.png",
        "pos": "DEF"
      },
      {
        "name": "Bologna",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2qi1u31655592366.png",
        "pos": "DEF"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png",
        "pos": "MID"
      },
      {
        "name": "Borussia Dortmund",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/tqo8ge1716960353.png",
        "pos": "MID"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png",
        "pos": "MID"
      },
      {
        "name": "Bournemouth",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/y08nak1534071116.png",
        "pos": "FWD"
      },
      {
        "name": "West Ham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/hfum4l1599931799.png",
        "pos": "FWD"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "تركيا",
    "aliases": [
      "تركيا",
      "turkey",
      "turkiye"
    ],
    "clubs": [
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "GK"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png",
        "pos": "DEF"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png",
        "pos": "DEF"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "DEF"
      },
      {
        "name": "Fenerbahce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/twxxvs1448199691.png",
        "pos": "DEF"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
        "pos": "MID"
      },
      {
        "name": "Fenerbahce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/twxxvs1448199691.png",
        "pos": "MID"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "MID"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png",
        "pos": "FWD"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "FWD"
      },
      {
        "name": "Fenerbahce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/twxxvs1448199691.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "نيجيريا",
    "aliases": [
      "نيجيريا",
      "nigeria"
    ],
    "clubs": [
      {
        "name": "Lille",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2giize1534005340.png",
        "pos": "GK"
      },
      {
        "name": "Fenerbahce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/twxxvs1448199691.png",
        "pos": "DEF"
      },
      {
        "name": "Leicester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xtxwtu1448813356.png",
        "pos": "DEF"
      },
      {
        "name": "AS Monaco",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/exjf5l1678808044.png",
        "pos": "DEF"
      },
      {
        "name": "Lens",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3pxoum1598797195.png",
        "pos": "DEF"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "MID"
      },
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png",
        "pos": "MID"
      },
      {
        "name": "Fenerbahce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/twxxvs1448199691.png",
        "pos": "MID"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "FWD"
      },
      {
        "name": "Atalanta",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/qix5ku1780561327.png",
        "pos": "FWD"
      },
      {
        "name": "Fenerbahce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/twxxvs1448199691.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "مصر",
    "aliases": [
      "مصر",
      "egypt"
    ],
    "clubs": [
      {
        "name": "Al Ahly",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/x8753q1751421890.png",
        "pos": "GK"
      },
      {
        "name": "Al Ahly",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/x8753q1751421890.png",
        "pos": "DEF"
      },
      {
        "name": "Wolverhampton Wanderers",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/u9qr031621593327.png",
        "pos": "DEF"
      },
      {
        "name": "Al Ahly",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/x8753q1751421890.png",
        "pos": "DEF"
      },
      {
        "name": "Zamalek",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/tgekj81580930027.png",
        "pos": "DEF"
      },
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png",
        "pos": "MID"
      },
      {
        "name": "Al Ahly",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/x8753q1751421890.png",
        "pos": "MID"
      },
      {
        "name": "Besiktas",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/svo05k1776827439.png",
        "pos": "MID"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png",
        "pos": "FWD"
      },
      {
        "name": "Al Ahly",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/x8753q1751421890.png",
        "pos": "FWD"
      },
      {
        "name": "Zamalek",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/tgekj81580930027.png",
        "pos": "FWD"
      }
    ]
  },
  {
    "name": "كوت ديفوار",
    "aliases": [
      "كوت ديفوار",
      "ساحل العاج",
      "ivory coast"
    ],
    "clubs": [
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png",
        "pos": "GK"
      },
      {
        "name": "Crystal Palace",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ia6i3m1656014992.png",
        "pos": "DEF"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png",
        "pos": "DEF"
      },
      {
        "name": "Chelsea",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png",
        "pos": "DEF"
      },
      {
        "name": "Lens",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3pxoum1598797195.png",
        "pos": "DEF"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png",
        "pos": "MID"
      },
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png",
        "pos": "MID"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png",
        "pos": "MID"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png",
        "pos": "FWD"
      },
      {
        "name": "Atalanta",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/qix5ku1780561327.png",
        "pos": "FWD"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png",
        "pos": "FWD"
      }
    ]
  }
];
