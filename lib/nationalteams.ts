// مُولّد تلقائيًا — منتخبات وأنديتها (شعارات TheSportsDB المجاني)
export interface NationalTeamClub { name: string; badge: string; }
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
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png"
      },
      {
        "name": "Al Hilal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5trzvq1660439102.png"
      },
      {
        "name": "Newcastle",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5jevk91653487832.png"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png"
      },
      {
        "name": "Chelsea",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png"
      },
      {
        "name": "West Ham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/hfum4l1599931799.png"
      },
      {
        "name": "Wolverhampton Wanderers",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/u9qr031621593327.png"
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
        "name": "Inter Miami",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/m4it3e1602103647.png"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png"
      },
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png"
      },
      {
        "name": "AS Roma",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jwro2s1760820674.png"
      },
      {
        "name": "Benfica",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0pywy21662316682.png"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png"
      },
      {
        "name": "Real Betis",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2oqulv1663245386.png"
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
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png"
      },
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png"
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
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png"
      },
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png"
      },
      {
        "name": "Newcastle",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5jevk91653487832.png"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png"
      },
      {
        "name": "Chelsea",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png"
      },
      {
        "name": "Crystal Palace",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ia6i3m1656014992.png"
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
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/84yvqi1748524565.png"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png"
      },
      {
        "name": "Sporting Lisbon",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ohj6ih1628855978.png"
      },
      {
        "name": "Al Hilal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5trzvq1660439102.png"
      },
      {
        "name": "Chelsea",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png"
      },
      {
        "name": "Benfica",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0pywy21662316682.png"
      },
      {
        "name": "Wolverhampton Wanderers",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/u9qr031621593327.png"
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
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png"
      },
      {
        "name": "Athletic Bilbao",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/68w7fe1639408210.png"
      },
      {
        "name": "Real Sociedad",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vptvpr1473502986.png"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png"
      },
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png"
      },
      {
        "name": "Chelsea",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png"
      },
      {
        "name": "Al Nassr",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/84yvqi1748524565.png"
      },
      {
        "name": "Real Betis",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2oqulv1663245386.png"
      },
      {
        "name": "Girona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfu7zu1659897499.png"
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
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png"
      },
      {
        "name": "Bayer Leverkusen",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3x9k851726760113.png"
      },
      {
        "name": "Borussia Dortmund",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/tqo8ge1716960353.png"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png"
      },
      {
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png"
      },
      {
        "name": "Stuttgart",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yppyux1473454085.png"
      },
      {
        "name": "Eintracht Frankfurt",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/rurwpy1473453269.png"
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
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png"
      },
      {
        "name": "Atalanta",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/qix5ku1780561327.png"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png"
      },
      {
        "name": "AS Roma",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jwro2s1760820674.png"
      },
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png"
      },
      {
        "name": "Lazio",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/rwqyvs1448806608.png"
      },
      {
        "name": "Fiorentina",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/hc8nhu1656098030.png"
      },
      {
        "name": "Bologna",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2qi1u31655592366.png"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png"
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
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png"
      },
      {
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png"
      },
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png"
      },
      {
        "name": "Ajax",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zg9tii1755495289.png"
      },
      {
        "name": "PSV Eindhoven",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xfsz6i1721297428.png"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png"
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
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png"
      },
      {
        "name": "Aston Villa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jykrpv1717309891.png"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png"
      },
      {
        "name": "Atalanta",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/qix5ku1780561327.png"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png"
      },
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png"
      },
      {
        "name": "Bayer Leverkusen",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3x9k851726760113.png"
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
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png"
      },
      {
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png"
      },
      {
        "name": "Inter Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ryhu6d1617113103.png"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png"
      },
      {
        "name": "Wolverhampton Wanderers",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/u9qr031621593327.png"
      },
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png"
      },
      {
        "name": "Dinamo Zagreb",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/araidi1579955395.png"
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
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png"
      },
      {
        "name": "Al Hilal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5trzvq1660439102.png"
      },
      {
        "name": "Galatasaray",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/io7jk21767941298.png"
      },
      {
        "name": "Fenerbahce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/twxxvs1448199691.png"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png"
      },
      {
        "name": "West Ham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/hfum4l1599931799.png"
      },
      {
        "name": "Real Betis",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2oqulv1663245386.png"
      },
      {
        "name": "Sevilla",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vpsqqx1473502977.png"
      },
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png"
      },
      {
        "name": "Al Nassr",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/84yvqi1748524565.png"
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
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png"
      },
      {
        "name": "Barcelona",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wq9sir1639406443.png"
      },
      {
        "name": "Manchester United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png"
      },
      {
        "name": "Inter Miami",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/m4it3e1602103647.png"
      },
      {
        "name": "Bologna",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2qi1u31655592366.png"
      },
      {
        "name": "Atletico Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/0ulh3q1719984315.png"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png"
      },
      {
        "name": "Nottingham Forest",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/bk4qjs1546440351.png"
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
        "name": "Liverpool",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png"
      },
      {
        "name": "AS Monaco",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/exjf5l1678808044.png"
      },
      {
        "name": "Real Sociedad",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vptvpr1473502986.png"
      },
      {
        "name": "Feyenoord",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uturtx1473534803.png"
      },
      {
        "name": "Celtic",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3uv1641758780002.png"
      },
      {
        "name": "Stuttgart",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yppyux1473454085.png"
      },
      {
        "name": "Mainz 05",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/fhm9v51552134916.png"
      },
      {
        "name": "Sporting Lisbon",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ohj6ih1628855978.png"
      },
      {
        "name": "Lazio",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/rwqyvs1448806608.png"
      },
      {
        "name": "Brentford",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/grv1aw1546453779.png"
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
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png"
      },
      {
        "name": "Paris SG",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/has8b01763050866.png"
      },
      {
        "name": "Wolverhampton Wanderers",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/u9qr031621593327.png"
      },
      {
        "name": "Brentford",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/grv1aw1546453779.png"
      },
      {
        "name": "Mainz 05",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/fhm9v51552134916.png"
      },
      {
        "name": "Newcastle",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5jevk91653487832.png"
      },
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png"
      },
      {
        "name": "Stuttgart",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yppyux1473454085.png"
      },
      {
        "name": "Genoa",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/52s8dn1655553600.png"
      },
      {
        "name": "Celtic",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3uv1641758780002.png"
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
        "name": "Al Nassr",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/84yvqi1748524565.png"
      },
      {
        "name": "Al Hilal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/5trzvq1660439102.png"
      },
      {
        "name": "Crystal Palace",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ia6i3m1656014992.png"
      },
      {
        "name": "Chelsea",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png"
      },
      {
        "name": "Marseille",
        "badge": "https://www.thesportsdb.com/images/media/team/badge/c6bazh1779212287.png"
      },
      {
        "name": "Everton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/eqayrf1523184794.png"
      },
      {
        "name": "Bayern Munich",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/01ogkh1716960412.png"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png"
      },
      {
        "name": "Sevilla",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vpsqqx1473502977.png"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png"
      },
      {
        "name": "Brighton",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zn0x7h1605371909.png"
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
        "name": "AC Milan",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/wvspur1448806617.png"
      },
      {
        "name": "Juventus",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uxf0gr1742983727.png"
      },
      {
        "name": "Crystal Palace",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/ia6i3m1656014992.png"
      },
      {
        "name": "Borussia Dortmund",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/tqo8ge1716960353.png"
      },
      {
        "name": "Fulham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/xwwvyt1448811086.png"
      },
      {
        "name": "Nottingham Forest",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/bk4qjs1546440351.png"
      },
      {
        "name": "Leeds United",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/jcgrml1756649030.png"
      },
      {
        "name": "Bournemouth",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/y08nak1534071116.png"
      },
      {
        "name": "AS Monaco",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/exjf5l1678808044.png"
      },
      {
        "name": "Lille",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2giize1534005340.png"
      },
      {
        "name": "Brentford",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/grv1aw1546453779.png"
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
        "name": "Manchester City",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png"
      },
      {
        "name": "Arsenal",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png"
      },
      {
        "name": "Real Madrid",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png"
      },
      {
        "name": "Napoli",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/l8qyxv1742982541.png"
      },
      {
        "name": "Lazio",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/rwqyvs1448806608.png"
      },
      {
        "name": "Tottenham",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/i8s9ub1626549748.png"
      },
      {
        "name": "RB Leipzig",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/zjgapo1594244951.png"
      },
      {
        "name": "Lecce",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/j4vznr1567365249.png"
      },
      {
        "name": "Real Betis",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/2oqulv1663245386.png"
      },
      {
        "name": "Nottingham Forest",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/bk4qjs1546440351.png"
      },
      {
        "name": "Bayer Leverkusen",
        "badge": "https://r2.thesportsdb.com/images/media/team/badge/3x9k851726760113.png"
      }
    ]
  }
];
