/* ==========================================================================
   HAN WONG INTERNATIONAL · WEBSITE CONTENT
   --------------------------------------------------------------------------
   This is the one file you edit for everyday updates. Every page reads it.

   HOW TO EDIT SAFELY
   • Only change the text inside the quotes "like this". Keep the quotes.
   • Every item in a list ends with a comma.
   • To add something, copy an existing item (from { to },), paste it
     underneath and change the text.
   • If your text needs quote marks, use “curly quotes” or ‘single’ ones.
   • Country codes are two letters: in = India, us = United States,
     gb = United Kingdom, au = Australia. Full list: https://flagicons.lipis.dev
   • After saving, open  check.html  on your website. It shows a green tick
     when everything is fine, or tells you exactly what to fix.
   ========================================================================== */

window.HWI = {

  /* ------------------------------------------------------------------------
     1. LINKS · every button on every page uses these
     ------------------------------------------------------------------------ */
  links: {
    register:      "https://forms.gle/heDtq8czy6ZpUTfZ8",   // registration form
    partnership:   "https://wa.me/916294278034?text=Hi%2C%20I%20run%20a%20dojang%20and%20would%20like%20to%20know%20about%20the%20Dojang%20Partnership%20Programme.%20I%20came%20from%20the%20website.",   // dojang partnership enquiries (WhatsApp +91 62942 78034)
    whatsappGroup: "https://wa.me/918637356998?text=Hi%20Dr.%20Pinaki%2C%20can%20you%20please%20add%20me%20to%20the%20WhatsApp%20group%3F%20I%20came%20from%20the%20website.",  // opens a chat with this message
    whatsappChat:  "https://wa.me/918637356998",
    phone:         "+91 86373 56998",
    email:         "director@hanwonginternational.org",
    facebook:      "https://www.facebook.com/profile.php?id=100063790375715",
    facebookPhotos:"https://www.facebook.com/profile.php?id=100063790375715&sk=photos",
    youtube:       "https://www.youtube.com/@hanwongintl",
  },


  /* ------------------------------------------------------------------------
     2. THE CHAMPIONSHIP YOU ARE PROMOTING RIGHT NOW
        Shown at the top of the page, in the big event section, and on
        every “Register” button.
     ------------------------------------------------------------------------ */
  event: {
    name:      "4th Edinburgh Open Online",   // short name, used on buttons and the top of the page
    fullName:  "4th Edinburgh Open Online Poomsae, Kyukpa & Speed Kicking Championship 2026",   // shown in the event section
    shortName: "Edinburgh Open",
    status:    "Registration open",    // e.g. "Registration open" or "Last week to enter"

    registrationOpen: true,   // false = Register buttons change to “Get notified” and open WhatsApp
    registerLink: "",         // a special form just for this event? Paste it here. Empty = the form in LINKS

    closes: "2026-11-30",     // registration deadline for the countdown, written "2026-11-15". Empty = no countdown

    summary: "Our year-closing championship, broadcast from our home city. Film at your dojang, compete against athletes from around the world, and help families in need with your entry fee.",

    details: [
      ["Registration closes", "30 November 2026"],
      ["Results announced",   "7 December 2026"],
      ["Categories",          "8 categories, all belts"],
      ["Judged by",           "WT-certified referees"],
    ],

    // Downloads. Put the file in the  assets/downloads  folder and write its
    // name here, e.g. "assets/downloads/edinburgh-open-poster.jpg".
    // A Google Drive link works too. Empty = the button shows “coming soon”.
    // A poster saved as .jpg or .png is also shown as a picture on the page.
    poster:     "assets/downloads/4th-edinburgh-open-poster.jpg",
    guidelines: "assets/downloads/4th-edinburgh-open-guidelines.pdf",
  },


  /* ------------------------------------------------------------------------
     3. THE NUMBERS under the top section (they count up on screen)
     ------------------------------------------------------------------------ */
  stats: [
    { number: 6,    after: "",  label: "Years running, without a break, since spring 2020" },
    { number: 50,   after: "+", label: "Countries have competed with us" },
    { number: 2000, after: "+", label: "Athletes and coaches taken part" },
    { number: 1000, after: "+", label: "Families helped by the fees" },
    { number: 100,  after: "%", label: "Of every entry fee goes to charity" },
  ],


  /* ------------------------------------------------------------------------
     4. COUNTRIES · the moving flag strip. Two-letter codes, with spaces.
     ------------------------------------------------------------------------ */
  flags: "in id my ph kr eg it us au ae hr ng br mx kz gb et vn sn jp ca sg za ar co cl pe tr sa qa pk bd lk np th mm kh ke gh de fr es pt nl se ie ma tn dz il by ky mu no",


  /* ------------------------------------------------------------------------
     5. THE YEARLY CALENDAR  (tag = the little label on the right)
     ------------------------------------------------------------------------ */
  calendar: [
    { month: "November", name: "4th Edinburgh Open Online",    note: "Entries close 30 Nov 2026 · results 7 Dec 2026", tag: "Open now", highlight: true },
    { month: "March",    name: "Scotland International Open",  note: "Returns early 2027 · all categories, all belts", tag: "2027" },
    { month: "July",     name: "Han Wong Worldwide Open",      note: "6th edition finished · results announced 7 August 2026", tag: "Finished", faded: true },
  ],

  categories: ["Individual Poomsae", "Freestyle Poomsae", "Pair Poomsae", "Family Poomsae", "Para Poomsae", "Beach Poomsae", "Kyukpa Team", "Speed Kicking"],


  /* ------------------------------------------------------------------------
     6. TEAM STANDINGS FROM THE LAST CHAMPIONSHIP
        Keep them in finishing order. The top three appear on the podium.
     ------------------------------------------------------------------------ */
  results: {
    championship: "6th Han Wong Worldwide Open 2026",
    note: "Every individual medal counts, including each athlete in pair and team events.",
    teams: [
      { dojang: "Olympic Minsk Belarus",                coach: "Hamid Nouri",                   country: "by", athletes: 15, medals: 25 },
      { dojang: "HCT Martial Arts Academy",             coach: "Master Carlo G Fernandez",      country: "ph", athletes: 25, medals: 25 },
      { dojang: "Kalgoorlie Martial Arts",              coach: "James Kolatowicz",              country: "au", athletes: 11, medals: 16 },
      { dojang: "Qatar Team",                           coach: "GM Wissam Elsharkawi",          country: "qa", athletes: 6,  medals: 12 },
      { dojang: "Golden Kick Taekwondo Cayman Islands", coach: "Raga Krishtyan",                country: "ky", athletes: 10, medals: 12 },
      { dojang: "Golden Eagle Taekwondo",               coach: "Kanawat Sukcharoen",            country: "th", athletes: 9,  medals: 11 },
      { dojang: "Raptor Taekwondo",                     coach: "Troy Henson",                   country: "au", athletes: 2,  medals: 9 },
      { dojang: "Lions Den Taekwondo",                  coach: "Grand Master Miles Varichak",   country: "us", athletes: 5,  medals: 5 },
      { dojang: "Master Kang’s Miracles Taekwondo",     coach: "Master Yoonhyun Nam",           country: "us", athletes: 1,  medals: 3 },
      { dojang: "Koryo Dragons",                        coach: "Russell Wood",                  country: "au", athletes: 2,  medals: 2 },
      { dojang: "Mystic Taekwondo Club",                coach: "Shenilen Kartikeye Chengadoo",  country: "mu", athletes: 2,  medals: 2 },
      { dojang: "Toyen Taekwondo Club",                 coach: "Harald Berg",                   country: "no", athletes: 1,  medals: 2 },
    ],
  },

  // Team photos from the last championship (shown on the Partnership page)
  winningTeams: [
    { photo: "assets/img/i1.jpg", name: "Tirak Taekwondo",                 country: "th" },
    { photo: "assets/img/i2.jpg", name: "A.S.D. Taekwondo Pennetta Rosa",  country: "it" },
    { photo: "assets/img/i3.jpg", name: "Central Iowa Taekwondo Poomsae",  country: "us" },
    { photo: "assets/img/i4.jpg", name: "Kalgoorlie Martial Arts",         country: "au" },
    { photo: "assets/img/i5.jpg", name: "CMK Bangladesh",                  country: "bd" },
    { photo: "assets/img/i6.jpg", name: "CMK Qatar",                       country: "qa" },
  ],


  /* ------------------------------------------------------------------------
     7. VIDEOS · paste any YouTube link. The first one is shown large.
        A video with an empty link shows as “coming soon”.
     ------------------------------------------------------------------------ */
  videos: [
    { link: "https://www.youtube.com/watch?v=_Grchkhfsrw", title: "6th Han Wong Worldwide Open · Full stream",            date: "2026" },
    { link: "https://www.youtube.com/watch?v=KEr1-pXY8js", title: "6th Scotland Open · Day 2, Individual Poomsae",        date: "2026" },
    { link: "https://www.youtube.com/watch?v=xxij4VUK95Q", title: "6th Scotland Open · Day 1, Poomsae and Kyukpa",        date: "2026" },
    { link: "https://www.youtube.com/watch?v=2SvoOtjXDHA", title: "5th Han Wong Worldwide Open · Colour Belt Poomsae",    date: "2025" },
    { link: "https://www.youtube.com/watch?v=GitfKjUCGxk", title: "4th Han Wong Open · Poomsae and Speed Kicking",        date: "2024" },
    { link: "https://www.youtube.com/watch?v=SKTjuGkluJk", title: "2nd Edinburgh Open · Speed Kicking",                   date: "Edinburgh Open" },
    { link: "https://www.youtube.com/watch?v=lsHiU87v_Vc", title: "5th Scotland Open · Day 5, Correction videos",         date: "Scotland Open" },
    // { link: "", title: "4th Edinburgh Open Online · Results", date: "Coming soon" },
  ],


  /* ------------------------------------------------------------------------
     8. TESTIMONIALS · what masters and athletes say
     ------------------------------------------------------------------------ */
  testimonials: [
    { quote: "It was a great experience and what a noble cause. In today’s lifestyle where egocentrism and selfishness are the rule, the work of charity is priceless.",
      name: "Teresa Semmunegus", role: "Competitor", country: "us", photo: "assets/img/14.jpg" },
    { quote: "These competitions are incredible events. The funds raised provide food for those less fortunate. Competitors gain international experience without traveling overseas.",
      name: "GM Russ Wood", role: "9th Dan Grand Master", country: "au", photo: "assets/img/7.jpg" },
    { quote: "An excellent opportunity to measure yourselves against international competition and contribute to charitable causes.",
      name: "GM Jim Harp", role: "Senior Grand Master", country: "us", photo: "assets/img/5.jpg" },
    { quote: "After many online competitions over two years, HWI has proven to be the best and easiest we have dealt with.",
      name: "GM Russ Wood", role: "9th Dan Grand Master", country: "au", photo: "assets/img/7.jpg" },
  ],


  /* ------------------------------------------------------------------------
     9. CHARITY PHOTOS · the first five appear on the home page
     ------------------------------------------------------------------------ */
  charity: {
    morePhotos: "",   // e.g. "200+" makes the button say “View 200+ more photos”. Empty = “View more photos”
    photos: [
      { src: "assets/img/c1.jpg", caption: "Food distribution", alt: "Families queue for food parcels funded by tournament fees" },
      { src: "assets/img/c7.jpg", caption: "",                  alt: "A young man smiles over a plate of food" },
      { src: "assets/img/c4.jpg", caption: "",                  alt: "Food parcels packed and ready to hand out" },
      { src: "assets/img/c9.jpg", caption: "",                  alt: "Charity distribution in progress" },
      { src: "assets/img/c5.jpg", caption: "",                  alt: "Volunteers delivering essentials" },
    ],
  },


  /* ------------------------------------------------------------------------
     10. BRAND AMBASSADORS  (featured: true = also shown on the home page)
     ------------------------------------------------------------------------ */
  ambassadors: [
    { name: "GM Russ Wood",             country: "au", role: "9th Dan",                         photo: "assets/img/7.jpg",  featured: true, line: "At 84, with more than 510 medals, still competing and still teaching." },
    { name: "GM Jim Harp",              country: "us", role: "Senior Grand Master",             photo: "assets/img/5.jpg",  featured: true, line: "US Nationals and US Open gold medallist with 45+ years on the mat." },
    { name: "GM Cosimo Spinelli",       country: "it", role: "9th Dan",                         photo: "assets/img/3.jpg",  featured: true, line: "51 years on the mat and 100 podium finishes. One of our strongest supporters in Europe." },
    { name: "GM Mohamed Riad",          country: "eg", role: "International Poomsae Referee",   photo: "assets/img/15.jpg", featured: true, line: "One of Africa’s most respected Taekwondo figures, with us since the very first edition." },
    { name: "GM Erica Linthorst",       country: "us", role: "Senior Grand Master · Poomsae",   photo: "assets/img/a3.jpg", line: "Champions international competition that any athlete can reach, wherever they live." },
    { name: "GM Julie Tregeagle",       country: "us", role: "Senior Coach",                    photo: "assets/img/6.jpg",  line: "Poomsae World Champion who drives outreach and education in underserved communities." },
    { name: "GM Sabree Salleh",         country: "my", role: "9th Dan",                         photo: "assets/img/a2.jpg", line: "A pillar of Malaysian Taekwondo and a bridge between Asia and Europe." },
    { name: "GM Na Zih",                country: "ae", role: "Senior Grand Master",             photo: "assets/img/a4.jpg", line: "The leading Taekwondo authority across the Middle East, growing HWI across the Gulf." },
    { name: "GM Svetlana Kana Gvozdić", country: "hr", role: "Senior Judge",                    photo: "assets/img/a1.jpg", line: "One of Europe’s most respected international judges." },
  ],


  /* ------------------------------------------------------------------------
     11. HALL OF FAME and ACHIEVERS AWARD  (Hall of Fame page)
     ------------------------------------------------------------------------ */
  hallOfFame: [
    { name: "Grand Master Cosimo Spinelli",     country: "it", meta: "9th Dan · 51 years", photo: "assets/img/3.jpg",
      bio: "Based in Brindisi, GM Spinelli has 100 podium finishes, including 75 golds and two World Master Championship silvers, plus 45 international online wins. As a coach he guided a deaf athlete to a World Poomsae title." },
    { name: "Grand Master Russell Wood",        country: "au", meta: "9th Dan Kukkiwon · 50+ years", photo: "assets/img/7.jpg",
      bio: "From Melbourne’s Koryo Dragons, with more than 510 medals. At 84, and despite the loss of two children, he still teaches, mentors and prepares for world championships. His motto: never finish." },
    { name: "Grand Master Jim Harp",            country: "us", meta: "45+ years", photo: "assets/img/5.jpg",
      bio: "Trained under GM Yong Chin Pak and GM Russell Wood, and won gold at the US Nationals and the US Open. Founder of Ankeny Martial Arts and recipient of the Han Wong Martial Arts Heritage Award." },
    { name: "Master Ronald Laffin",             country: "ca", meta: "4th Dan · Educator", photo: "assets/img/13.jpg",
      bio: "Decades of Taekwondo across Atlantic Canada and Quebec. A Master of Education who now works in addiction counselling and mental health research, and author of Perseverance: The Best of the Best." },
    { name: "Master Patrick Perras",            country: "ca", meta: "6th Dan · Para-Taekwondo", photo: "assets/img/12.jpg",
      bio: "30+ years with L’Equipe Taekwondo Plus. He adapts his teaching for students with autism and coordination disorders, and has taught and refereed since 1989 despite a serious back injury." },
    { name: "Master Harald Berg",               country: "no", meta: "6th Dan Kukkiwon · 25+ years", photo: "assets/img/9.jpg",
      bio: "Based at Toyen, with 16 gold medals, the Norwegian Cup Overall Championship and the 2025 Golden Spirit Award. He has led demo teams since 2005 and promotes Taekwondo on national TV and film." },
    { name: "Master Carlo G Fernandez",         country: "ph", meta: "6th Dan Jidokwan · 23+ years", photo: "assets/img/8.jpg",
      bio: "Gold medallist at the 2003 UV Olympics, now a respected coach in Region 7. His recent international online golds in poomsae and speed kicking show his skills are as sharp as ever." },
    { name: "Master Miles Varichak",            country: "us", meta: "7th Dan Chang Moo Kwan", photo: "assets/img/11.jpg",
      bio: "Founder of Lion’s Den Taekwondo, mentored by GM Han Wong and Master Simon Rhee. A 2005 Chang Moo Kwan champion who hosts free community events and brings Taekwondo into local schools." },
    { name: "Grand Master Andreas Brinkmann",   country: "de", meta: "8th Dan · since 1980", photo: "assets/img/1.jpg",
      bio: "Training out of ETG Recklinghausen and a global Changmookwan ambassador. 2023 World Champion in Hard Style Forms with 12 international medals. His aim: to be better than yesterday." },
    { name: "Grand Master Andreas Knippenborg", country: "de", meta: "7th Dan · 40+ years", photo: "assets/img/2.jpg",
      bio: "Founder of Tao-Wulfen e.V. and a coach across Hapkido and Kali concepts, with second place at the 2010 Trexgames in Busan. Today he focuses on youth development and self-defence." },
    { name: "Grand Master Hamid Nouri",         country: "by", meta: "9th Dan WT and ITF · 40+ years", photo: "assets/img/4.jpg",
      bio: "9th Dan in both WT and ITF, Vice President of World Chang Moo Kwan and National Director of the Taekwondo Hall of Fame. Holds an MSc in Physical Culture and Sports." },
    { name: "Master MD. Naim Ali",              country: "bd", meta: "Kukkiwon · 18+ years", photo: "assets/img/10.jpg",
      bio: "A gold medallist in Thailand and Bangladesh turned national referee and judge. He helped shape the curriculum at the Bangladesh Police Academy and now teaches PE across Rajshahi." },
    { name: "Grand Master Julie Ann Tregeagle", country: "us", meta: "Poomsae World Champion", photo: "assets/img/6.jpg",
      bio: "A cornerstone of the global Taekwondo community who uses her platform for outreach, education and empowerment in underserved communities." },
  ],

  achievers: [
    { name: "Master Miles Varichak",     country: "us", meta: "Lion’s Den Taekwondo", photo: "assets/img/11.jpg",
      bio: "33 years on the mats. When surgery and COVID-19 struck, he moved his classes online and kept his students together. He sees Taekwondo as a tool for service." },
    { name: "Master Teresa Semmunegus",  country: "us", meta: "Grassroots Taekwondo", photo: "assets/img/14.jpg",
      bio: "Recognised for bringing Taekwondo to beginners, young people and communities who might never have stepped onto a mat." },
  ],

};
