export interface SolutionExemplar { name: string; place: string; note: string; href: string }
export interface Solution { slug: string; verb: string; title: string; promise: string; principle: string; fix: string[]; keywords: string[]; exemplars: SolutionExemplar[] }

export const SOLUTIONS: Solution[] = [
  {
    "slug": "mass-times-first",
    "verb": "Worship",
    "title": "Put Mass times where eyes land first",
    "promise": "A visitor should answer \"when is Mass?\" in the first 30 seconds — on a phone, on Sunday morning, without a download or a hunt.",
    "principle": "The essentials come first: where the parish is, when Mass is, how to get there, how to reach someone. Mass, confession, and adoration times deserve special prominence and accuracy, printed as text on the homepage itself.",
    "fix": [
      "Print the weekend and weekday schedules on the homepage — not in a PDF, not only inside a calendar widget.",
      "Set confession and adoration beside the Mass times, weekday and weekend patterns shown separately.",
      "Carry holy-day and holiday changes on the homepage while they apply, with the languages each Mass is offered in.",
      "Keep one schedule that feeds the homepage, the events page, and the bulletin — never three copies to drift apart."
    ],
    "keywords": [
      "mass times",
      "schedule",
      "confession times"
    ],
    "exemplars": [
      {
        "name": "St. Nicholas",
        "place": "O'Fallon, IL",
        "note": "Weekend Mass and reconciliation times printed at the top of the homepage and repeated in the footer — zero clicks.",
        "href": "/parish/st-nicholas-ofallon-il"
      },
      {
        "name": "Cathedral of Saint Paul, St. Paul MN",
        "place": "Saint Paul, MN",
        "note": "The full Sunday and daily schedule lives in the footer of every page on the site.",
        "href": "/cathedral/cathedral-of-saint-paul-st-paul-mn-saint-paul"
      },
      {
        "name": "St. Columbanus Parish",
        "place": "Cortlandt Manor, NY",
        "note": "The homepage prints the complete schedule for both of its churches, side by side.",
        "href": "/parish/st-columbanus-parish-cortlandt-manor-ny"
      },
      {
        "name": "Christ the Redeemer",
        "place": "Dawsonville, GA",
        "note": "Mass times sit on the homepage itself, with a dedicated page adding confession and adoration detail.",
        "href": "/parish/christ-the-redeemer-dawsonville-ga"
      },
      {
        "name": "St. Theresa of Lisieux",
        "place": "North Reading, MA",
        "note": "The full Sunday and daily schedule rides on the homepage, special Masses included.",
        "href": "/parish/st-theresa-of-lisieux-north-reading-ma"
      },
      {
        "name": "Saint Clare of Assisi",
        "place": "Acworth, GA",
        "note": "The whole schedule on the homepage, with the Spanish Mass clearly flagged.",
        "href": "/parish/saint-clare-of-assisi-acworth-ga"
      },
      {
        "name": "Holy Name Cathedral",
        "place": "Chicago, IL",
        "note": "A complete schedule — weekday, vigil, Sunday, and livestream markings — presented as a model of clarity.",
        "href": "/cathedral/holy-name-cathedral-chicago"
      }
    ]
  },
  {
    "slug": "newcomer-faq",
    "verb": "Connect",
    "title": "Answer the questions newcomers are embarrassed to ask",
    "promise": "Bathrooms, what to wear, who to ask for help, whether they can receive Communion — the anxious questions decide whether a nervous visitor ever walks in.",
    "principle": "A \"New Here?\" page lowers the anxiety of visiting an unfamiliar church. The strongest versions are written for visitors, not insiders, in the words visitors actually use — including the questions they are almost embarrassed to ask. We score them against seven: bathrooms/changing tables, what to wear, who to ask for help, how to become Catholic, cry room/children, what if I don't know what I'm doing at Mass, and Communion eligibility.",
    "fix": [
      "Gather the seven newcomer questions on one page a first-timer can find in one click.",
      "Write answers in the visitor's own words — \"Can I bring my luggage?\" beats a policy paragraph.",
      "Say whom to ask for help on arrival, and what they look like.",
      "Cover children honestly: cry room, nursing space, and the welcome for noise.",
      "Name the next step for the person who wants more — becoming Catholic starts here."
    ],
    "keywords": [
      "faq",
      "new here",
      "newcomer",
      "first-time",
      "first time visitor"
    ],
    "exemplars": [
      {
        "name": "St. Hilary",
        "place": "Tiburon, CA",
        "note": "Its \"I'm New\" page answers more of the seven questions in one place than any parish in the audit (4 of 7).",
        "href": "/parish/st-hilary-tiburon-ca"
      },
      {
        "name": "St. Matthew Cathedral, South Bend",
        "place": "South Bend, IN",
        "note": "A dedicated \"Mass FAQs\" page — one of the best newcomer documents among the cathedrals (4 of 7).",
        "href": "/cathedral/st-matthew-cathedral-south-bend-south-bend"
      },
      {
        "name": "Saint Francis de Sales Cathedral, Baker City",
        "place": "Baker City, OR",
        "note": "The FAQ is embedded in an \"I'm New Here\" page, meeting the visitor at the door (4 of 7).",
        "href": "/cathedral/saint-francis-de-sales-cathedral-baker-city-baker-city"
      },
      {
        "name": "Our Lady of Consolation",
        "place": "Alexander, ND",
        "note": "No page labeled FAQ — its New Parishioners & Visitors page functions as one, and a warm one (3 of 7).",
        "href": "/parish/our-lady-of-consolation-alexander-nd"
      },
      {
        "name": "St. Patrick's Cathedral, New York",
        "place": "New York, NY",
        "note": "A genuine visitor FAQ covering luggage, dogs, holy water, and tickets with grace — hospitality in writing.",
        "href": "/cathedral/st-patricks-cathedral-new-york-new-york"
      },
      {
        "name": "Guardian Angel Cathedral, Las Vegas",
        "place": "Las Vegas, NV",
        "note": "Its FAQ answers how to get holy water and arrange anniversary blessings — the real questions people bring.",
        "href": "/cathedral/guardian-angel-cathedral-las-vegas-las-vegas"
      }
    ]
  },
  {
    "slug": "becoming-catholic-doorway",
    "verb": "Grow",
    "title": "Make becoming Catholic a doorway, not a footnote",
    "promise": "The person wondering \"could I become Catholic?\" is the most important visitor a parish site gets — give them a door as visible as the church's own.",
    "principle": "The welcome extends to people at every stage of faith. Becoming Catholic deserves its own page with clear first steps — what the journey looks like, when it starts, and a named-role contact — not a line buried among seven sacrament pages.",
    "fix": [
      "One page, titled in the seeker's words: \"Becoming Catholic.\"",
      "Speak to distinct audiences separately — the unbaptized, baptized Christians, returning Catholics.",
      "Describe the journey's stages plainly, with the next starting date.",
      "Give a first step that takes two minutes: a short form or a named-role contact (the OCIA director).",
      "Let participants' voices carry it — belonging first, logistics second."
    ],
    "keywords": [
      "ocia",
      "rcia",
      "becoming catholic",
      "become catholic"
    ],
    "exemplars": [
      {
        "name": "Saint Albert (Church of St. Albert)",
        "place": "Albertville, MN",
        "note": "A dedicated page welcoming four distinct audiences by name — the strongest doorway in its audit round.",
        "href": "/parish/saint-albert-church-of-st-albert-albertville-mn"
      },
      {
        "name": "St. Ann",
        "place": "Lexington, NE",
        "note": "The page walks the whole journey stage by stage, with online registration and stated closing dates.",
        "href": "/parish/st-ann-lexington-ne"
      },
      {
        "name": "St. Mary",
        "place": "Alexandria, NE",
        "note": "A homepage post titled \"Considering Becoming Catholic?\" written in the inquirer's own questions.",
        "href": "/parish/st-mary-alexandria-ne"
      },
      {
        "name": "St. Joseph",
        "place": "Zell, MO",
        "note": "A small cluster's page opens \"Interested in Becoming Catholic? Welcome!\" — speaking to the curious and the returning alike.",
        "href": "/parish/st-joseph-zell-mo"
      },
      {
        "name": "Sacred Heart",
        "place": "Sutherland, NE",
        "note": "A page under the plain title \"Becoming a Catholic\" explaining inquiry, faith-sharing, and study.",
        "href": "/parish/sacred-heart-sutherland-ne"
      },
      {
        "name": "Saint Timothy",
        "place": "Chantilly, VA",
        "note": "A front-door parish: one-click paths from the homepage, with a strong becoming-Catholic route among them.",
        "href": "/parish/saint-timothy-chantilly-va"
      },
      {
        "name": "Christ the King at LSU",
        "place": "Baton Rouge, LA",
        "note": "A university parish whose becoming-Catholic page leads with belonging and participant testimonials.",
        "href": "/parish/christ-the-king-at-lsu-baton-rouge-la"
      }
    ]
  },
  {
    "slug": "urgent-priest-path",
    "verb": "Connect",
    "title": "Let a frightened person find a priest in under a minute",
    "promise": "Anointing, a hospital room, a death in the family at 2 a.m. — the highest-stakes visit a parish website ever gets deserves a path built for it.",
    "principle": "Some matters cannot wait for office hours or a contact form. The urgent path — how to reach a priest for the sick and dying — should be stated plainly on the homepage and the contact page, with words that give permission to call.",
    "fix": [
      "Publish the urgent path where a panicked visitor looks first: homepage and contact page.",
      "Say it in permission-giving words — \"urgent calls accepted at any time, day or night.\"",
      "Cover the real cases by name: anointing of the sick, hospital visits, Communion to the homebound.",
      "If the route is an after-hours line, say so plainly and keep it current.",
      "Test it as a stranger: can a frightened person find it in under a minute, on a phone, at night?"
    ],
    "keywords": [
      "priest",
      "anointing",
      "emergency",
      "urgent",
      "hospital"
    ],
    "exemplars": [
      {
        "name": "St. Alice",
        "place": "Mountainair, NM",
        "note": "A mountain cluster that publishes a dedicated emergency priest line for its six missions.",
        "href": "/parish/st-alice-mountainair-nm"
      },
      {
        "name": "St. Mary Parish",
        "place": "Wimberley, TX",
        "note": "The homepage publishes an after-hours emergency line for urgent calls, alongside office hours.",
        "href": "/parish/st-mary-parish-wimberley-tx"
      },
      {
        "name": "Our Lady of Unity Parish",
        "place": "Kansas City, KS",
        "note": "Its bulletin publishes a dedicated after-hours emergency line for urgent priest needs.",
        "href": "/parish/our-lady-of-unity-parish-kansas-city-ks"
      },
      {
        "name": "Immaculate Conception",
        "place": "Marydel, DE",
        "note": "Urgent-need wording done right: urgent calls accepted at any time, day or night.",
        "href": "/parish/immaculate-conception-marydel-de"
      },
      {
        "name": "Mary Queen of Peace",
        "place": "Mandeville, LA",
        "note": "Its \"Are You Okay?\" page reframes urgent need pastorally — a door for a struggling person, not just a phone tree.",
        "href": "/parish/mary-queen-of-peace-mandeville-la"
      },
      {
        "name": "St. Leo the Great Parish",
        "place": "Omaha, NE",
        "note": "The sacraments page states plainly that its priests anoint at home or at the hospital upon request.",
        "href": "/parish/st-leo-the-great-parish-omaha-ne"
      },
      {
        "name": "St. Cornelius Mission",
        "place": "Homer, NE",
        "note": "The homepage tells anyone needing Communion for a shut-in or a hospital visit exactly whom to contact.",
        "href": "/parish/st-cornelius-mission-homer-ne"
      }
    ]
  },
  {
    "slug": "bulletin-as-web-content",
    "verb": "Hear",
    "title": "Let the bulletin become web content, not just a PDF",
    "promise": "The bulletin is the parish's best raw material. Broken out as web pages, its stories get found, shared, and searched; trapped in a PDF, they disappear on Monday.",
    "principle": "Post the bulletin digitally — and go one step further. The announcements, stories, and registrations inside it should live as individual web items with headlines and dates, so the week's life is readable by people who never download a file. The PDF becomes one copy, not the only one.",
    "fix": [
      "Break the bulletin's major items out as standalone, dated web posts with headlines.",
      "Give events and registrations their own pages, so a link can be shared directly.",
      "Keep the full PDF for those who want it — one door among several.",
      "Retire expired items on schedule; an old headline quietly teaches visitors not to trust the page.",
      "Let the homepage news feed be the bulletin, atomized — not a separate chore."
    ],
    "keywords": [
      "bulletin",
      "pdf"
    ],
    "exemplars": [
      {
        "name": "Our Lady of Lourdes",
        "place": "Raleigh, NC",
        "note": "The pattern fully realized: parish news lives as individual, titled, shareable stories — no bulletin required.",
        "href": "/parish/our-lady-of-lourdes-raleigh-nc"
      },
      {
        "name": "Sts. Joachim and Ann",
        "place": "St. Charles, MO",
        "note": "The homepage news feed is the bulletin broken out into standalone, dated, illustrated items.",
        "href": "/parish/sts-joachim-and-ann-st-charles-mo"
      },
      {
        "name": "Mary Queen of Peace",
        "place": "Mandeville, LA",
        "note": "Bulletin content substantially atomized — the pastor's messages run as individual titled posts.",
        "href": "/parish/mary-queen-of-peace-mandeville-la"
      },
      {
        "name": "Assumption",
        "place": "Richfield, MN",
        "note": "Bulletin-type content broken out into standalone website posts, events included.",
        "href": "/parish/assumption-richfield-mn"
      },
      {
        "name": "Immaculate Conception",
        "place": "Marydel, DE",
        "note": "Atomizes by instinct: announcements live as individual web posts with headlines and read-more pages.",
        "href": "/parish/immaculate-conception-marydel-de"
      },
      {
        "name": "Cathedral of the Immaculate Conception, Portland",
        "place": "Portland, ME",
        "note": "The cathedral-audit outlier for bulletin atomization — the weekly email built from web content, not attachments.",
        "href": "/cathedral/cathedral-of-the-immaculate-conception-portland-portland"
      }
    ]
  },
  {
    "slug": "events-that-invite",
    "verb": "Serve",
    "title": "Turn event listings into invitations",
    "promise": "A listing tells; an invitation moves. Every event should say who it is for, what it is for, and what to do next.",
    "principle": "Events are evangelization funnels. Beyond the calendar mechanics — one calendar, clear dates, a contact — each event earns its place by naming its purpose and closing with a next step a real person can take.",
    "fix": [
      "Name who each event is for, in the listing itself.",
      "State the purpose where money or mission is involved — what the proceeds fund, what the night is for.",
      "Close with the next step: register, reserve, sign up, or simply \"just show up — bring a friend.\"",
      "Give flagship moments their own pages with images and a real description.",
      "Keep daily listings plain; spend the words on the moments that carry the mission."
    ],
    "keywords": [
      "event",
      "calendar",
      "registration",
      "rsvp"
    ],
    "exemplars": [
      {
        "name": "St. Ann",
        "place": "Lexington, NE",
        "note": "Next steps are the site's habit: online registration for inquiry, confirmation, and baptism preparation, dates stated.",
        "href": "/parish/st-ann-lexington-ne"
      },
      {
        "name": "St. Columban",
        "place": "Yelm, WA",
        "note": "Unusually concrete steps — reserve the blood-drive appointment, sign up for the baptism class, each linked.",
        "href": "/parish/st-columban-yelm-wa"
      },
      {
        "name": "St. Frances Cabrini Parish",
        "place": "Allen Park, MI",
        "note": "Its Advent by Candlelight tells guests exactly how to take part — host a table, come solo, bring a gift card.",
        "href": "/parish/st-frances-cabrini-parish-allen-park-mi"
      },
      {
        "name": "SS. Faith, Hope and Charity",
        "place": "Winnetka, IL",
        "note": "Signup links give events a clear immediate step — reserve, volunteer, sign up.",
        "href": "/parish/ss-faith-hope-and-charity-winnetka-il"
      },
      {
        "name": "Saint Clare of Assisi",
        "place": "Acworth, GA",
        "note": "Its best events build the step in: a mothers' gathering that begins at Mass and continues over coffee.",
        "href": "/parish/saint-clare-of-assisi-acworth-ga"
      },
      {
        "name": "St. Patrick's Cathedral, New York",
        "place": "New York, NY",
        "note": "Friends of Music names exactly what gifts fund; flagship moments like the procession get full run-of-show pages.",
        "href": "/cathedral/st-patricks-cathedral-new-york-new-york"
      }
    ]
  },
  {
    "slug": "giving-one-door",
    "verb": "Serve",
    "title": "Give generosity one door — and say what it funds",
    "promise": "Scattered links and unexplained funds teach hesitation. One door, with purposes named, teaches trust.",
    "principle": "Online giving is an invitation to stewardship, presented transparently. The parishes that do it well gather giving into one place, say plainly what each fund does, and make the first gift take minutes — no account maze, no silent form limits.",
    "fix": [
      "One \"Give\" page gathering every door — offertory, campaigns, special funds.",
      "For each fund, one line: what the money does.",
      "Offer recurring giving as the default invitation, one-time as the easy alternative.",
      "Test your own forms end-to-end; a form that silently caps or drops submissions betrays the trust the page just built.",
      "Place a giving link where affection already flows — beside the livestream, inside the event story."
    ],
    "keywords": [
      "giving",
      "donate",
      "donation",
      "offertory",
      "stewardship"
    ],
    "exemplars": [
      {
        "name": "Holy Name Cathedral",
        "place": "Chicago, IL",
        "note": "A Giving Methods page covering online, recurring, check, donor-advised, IRA, and stock gifts — complete and calm.",
        "href": "/cathedral/holy-name-cathedral-chicago"
      },
      {
        "name": "Most Sorrowful Mother of God",
        "place": "Vevay, IN",
        "note": "A dedicated Give page that itemizes what each fund does — unusually well explained.",
        "href": "/parish/most-sorrowful-mother-of-god-vevay-in"
      },
      {
        "name": "St. Gregory the Great Family of Parishes",
        "place": "Cincinnati, OH",
        "note": "One giving door for a whole family of parishes — the cluster-correct structure, and kept current.",
        "href": "/parish/st-gregory-the-great-family-of-parishes-cincinnati-oh"
      },
      {
        "name": "Our Lady of Lourdes",
        "place": "Raleigh, NC",
        "note": "The giving copy itself is the find: gifts \"support ministries such as OCIA, men's & women's groups…\" — purposes named.",
        "href": "/parish/our-lady-of-lourdes-raleigh-nc"
      },
      {
        "name": "St. Ignatius",
        "place": "San Francisco, CA",
        "note": "A full Support page carrying a capital campaign with named purposes, livestream ministry among them.",
        "href": "/parish/st-ignatius-san-francisco-ca"
      },
      {
        "name": "St. Patrick's Cathedral, New York",
        "place": "New York, NY",
        "note": "A Mass Collection link placed on the livestream page, meeting the online congregation where it gathers.",
        "href": "/cathedral/st-patricks-cathedral-new-york-new-york"
      }
    ]
  },
  {
    "slug": "email-gently",
    "verb": "Connect",
    "title": "Grow an email list without a single popup",
    "promise": "Email is the channel a parish actually owns. Ask for it honestly, offer something worth receiving, and never ambush a visitor to get it.",
    "principle": "Email and text updates supplement the website — timely notices that point back to it. Capture works when the offer is real (the weekly bulletin, a reflection series, premium content) and the ask is respectful: no aggressive popups, no modals on load.",
    "fix": [
      "Offer one thing worth receiving — the weekly bulletin by email is the honest classic.",
      "Put the signup where commitment already exists: the homepage footer, the bulletin page, after the livestream.",
      "Say what arrives and how often; reassure about privacy in one plain line.",
      "Never gate the essentials — Mass times stay free for the asking, no email required.",
      "Treat the list as the primary channel it is: two good emails a week beat a dormant social account."
    ],
    "keywords": [
      "email",
      "newsletter",
      "signup",
      "sign-up",
      "popup",
      "flocknote"
    ],
    "exemplars": [
      {
        "name": "Saint Cecilia Cathedral, Omaha",
        "place": "Omaha, NE",
        "note": "Email treated as the primary digital channel: two weekly emails and a signup call-to-action on the homepage.",
        "href": "/cathedral/saint-cecilia-cathedral-omaha-omaha"
      },
      {
        "name": "Co-Cathedral of St. John the Evangelist, Rochester",
        "place": "Rochester, MN",
        "note": "A signup with a reassuring privacy note — it does not sell or distribute contact information. Trust, stated.",
        "href": "/cathedral/co-cathedral-of-st-john-the-evangelist-rochester-rochester"
      },
      {
        "name": "All Saints",
        "place": "Holdrege, NE",
        "note": "A two-layer path: a premium-content signup (a genuine lead magnet) plus a plain news signup.",
        "href": "/parish/all-saints-holdrege-ne"
      },
      {
        "name": "Cathedral of St. Patrick, Norwich",
        "place": "Norwich, CT",
        "note": "The ask, on the homepage, with simple fields: \"Signup to Receive Our Weekly Newsletter.\"",
        "href": "/cathedral/cathedral-of-st-patrick-norwich-norwich"
      },
      {
        "name": "Cathedral of St. Joseph, Wheeling",
        "place": "Wheeling, WV",
        "note": "Signup framed by what it is not: \"No apps, no passwords — just your name, email, or phone.\"",
        "href": "/cathedral/cathedral-of-st-joseph-wheeling-wheeling"
      },
      {
        "name": "Holy Name Cathedral",
        "place": "Chicago, IL",
        "note": "Named newsletters with a rhythm — a weekly rector's update and a biweekly young-adult letter.",
        "href": "/cathedral/holy-name-cathedral-chicago"
      }
    ]
  },
  {
    "slug": "livestream-as-hospitality",
    "verb": "Worship",
    "title": "Treat the livestream as hospitality, not broadcast",
    "promise": "For the sick, the homebound, and the traveling, the stream is the parish. Welcome them like it — and say honestly that it accompanies, never replaces, being there.",
    "principle": "Livestreaming helps people who cannot attend, and it should be described honestly: a digital gateway into the parish's life, not a substitute for physical presence at Mass. The best pages name who the stream is for and organize it like a ministry — schedules, archives, readings, and a way to give.",
    "fix": [
      "State which Masses are streamed, in the schedule itself — not on a page nobody finds.",
      "Keep an archive organized by liturgical day, so last Sunday is findable this Friday.",
      "Pair the stream with the day's readings, so watching becomes praying along.",
      "Offer a low-bandwidth door (an audio or phone option) for the digitally disconnected.",
      "Place the collection link with the stream — stewardship where the congregation gathers."
    ],
    "keywords": [
      "livestream",
      "stream",
      "watch",
      "video",
      "youtube"
    ],
    "exemplars": [
      {
        "name": "St. Patrick's Cathedral, New York",
        "place": "New York, NY",
        "note": "Daily streamed Masses, archives by liturgical title, daily readings alongside — and a dial-in phone Mass for those without internet.",
        "href": "/cathedral/st-patricks-cathedral-new-york-new-york"
      },
      {
        "name": "St. Cecilia Parish",
        "place": "Beaverton, OR",
        "note": "A Broadcasts page and a Livestream Archives page stand in the site's main structure — streaming as architecture, not an afterthought.",
        "href": "/parish/st-cecilia-parish-beaverton-or"
      },
      {
        "name": "St. Hilary",
        "place": "Tiburon, CA",
        "note": "Streamed Masses are marked right in the published schedule — a visitor knows before they arrive, or log on.",
        "href": "/parish/st-hilary-tiburon-ca"
      },
      {
        "name": "St. Ignatius",
        "place": "San Francisco, CA",
        "note": "Every Sunday and daily Mass marked livestreamed in the schedule module; the campaign names streaming a funded ministry.",
        "href": "/parish/st-ignatius-san-francisco-ca"
      },
      {
        "name": "St. Ann",
        "place": "Lexington, NE",
        "note": "The homepage embeds the stream window itself — the welcome is the first thing seen.",
        "href": "/parish/st-ann-lexington-ne"
      },
      {
        "name": "Our Lady of Prompt Succor Catholic Church",
        "place": "Westwego, LA",
        "note": "Says it plainly — Masses are open to the public and also recorded and posted — honesty as hospitality.",
        "href": "/parish/our-lady-of-prompt-succor-catholic-church-westwego-la"
      }
    ]
  },
  {
    "slug": "welcome-in-every-language",
    "verb": "Connect",
    "title": "Welcome people in the languages they pray in",
    "promise": "If a parish celebrates Mass in a language, it should welcome in that language too — a translated Mass time is not a welcome.",
    "principle": "The parish is the presence of the Church in a given territory — and the territory's languages are part of the presence. Genuine bilingual practice goes beyond schedule labels: the welcome, the notices, and the doorways exist in the languages of the people who actually come.",
    "fix": [
      "Publish the welcome and the essential schedules in every language of a regularly offered Mass.",
      "Double the bulletin's headings and notices, so no one reads a partial parish.",
      "Label every schedule line by language — honesty about what is offered, where.",
      "Translate the doorways first: New Here, becoming Catholic, contact, urgent need.",
      "Let bilingual parishioners review the copy; machine translation alone reads as an afterthought."
    ],
    "keywords": [
      "spanish",
      "bilingual",
      "language",
      "multilingual",
      "translation"
    ],
    "exemplars": [
      {
        "name": "Christ Cathedral, Garden Grove",
        "place": "Garden Grove, CA",
        "note": "Sunday Masses in English, Spanish, Chinese, and Vietnamese, plus a monthly Filipino Mass — breadth with structure.",
        "href": "/cathedral/christ-cathedral-garden-grove-garden-grove"
      },
      {
        "name": "Cathedral of St. John the Evangelist, Milwaukee",
        "place": "Milwaukee, WI",
        "note": "Every homepage announcement fully bilingual, English and Spanish — parity as a habit.",
        "href": "/cathedral/cathedral-of-st-john-the-evangelist-milwaukee-milwaukee"
      },
      {
        "name": "Cathedral of the Immaculate Conception, Camden",
        "place": "Camden, NJ",
        "note": "Genuinely trilingual in practice: English, Spanish, and Polish, with fully bilingual bulletins.",
        "href": "/cathedral/cathedral-of-the-immaculate-conception-camden-camden"
      },
      {
        "name": "Cathedral of the Most Sacred Heart of Jesus, Knoxville",
        "place": "Knoxville, TN",
        "note": "Beyond a Sunday Spanish Mass: monthly Korean, Polish, and Tagalog Masses join the parish's life.",
        "href": "/cathedral/cathedral-of-the-most-sacred-heart-of-jesus-knoxville-knoxville"
      },
      {
        "name": "St. Teresa",
        "place": "Woodside, NY",
        "note": "The mission statement and full welcome published in parallel English and Spanish.",
        "href": "/parish/st-teresa-woodside-ny"
      },
      {
        "name": "Blessed Sacrament Chapel",
        "place": "Aberdeen, ID",
        "note": "Structurally bilingual: the shared bulletin doubles every heading, schedule, and notice in Spanish.",
        "href": "/parish/blessed-sacrament-chapel-aberdeen-id"
      },
      {
        "name": "Our Lady of Angels",
        "place": "Hermiston, OR",
        "note": "A genuinely bilingual model parish — the welcome and the work both happen in two languages.",
        "href": "/parish/our-lady-of-angels-hermiston-or"
      }
    ]
  },
  {
    "slug": "owner-and-backup",
    "verb": "Serve",
    "title": "Keep the site current: one owner and one back-up",
    "promise": "Sites do not go stale from bad design; they go stale when updates belong to everyone and no one. Freshness is a roster, not a hope.",
    "principle": "Outdated content is the biggest credibility killer — an old schedule can leave a newcomer unsure whether the church is even open. The fix is a structure: one owner and one back-up responsible for checking the schedule, staff contacts, and news every week, with expired notices retired on rhythm.",
    "fix": [
      "Name one owner and one back-up for the website — by role, in writing, with a weekly check.",
      "Work a short weekly list: schedule, contacts, homepage notices, this week's events.",
      "Add a \"This Week\" block that is expected to change — its staleness becomes visible immediately.",
      "Retire expired notices the week they expire; separate permanent pages from news that rotates off.",
      "Refresh for the liturgical seasons — Advent, Lent, Easter — before they arrive, not during."
    ],
    "keywords": [
      "stale",
      "outdated",
      "current",
      "freshness",
      "expired",
      "update"
    ],
    "exemplars": [
      {
        "name": "Holy Archangels",
        "place": "Hoffman Estates, IL",
        "note": "This week's events dated this week, next month's schedules already posted — a site on a rhythm.",
        "href": "/parish/holy-archangels-hoffman-estates-il"
      },
      {
        "name": "Our Lady of Consolation",
        "place": "Alexander, ND",
        "note": "A small rural parish current throughout: weekly posts, seasonal announcements placed ahead of their feasts.",
        "href": "/parish/our-lady-of-consolation-alexander-nd"
      },
      {
        "name": "Assumption of the Blessed Virgin Mary",
        "place": "Ansonia, CT",
        "note": "Its events list runs from today through the season, and the in-season schedule is the one shown.",
        "href": "/parish/assumption-of-the-blessed-virgin-mary-ansonia-ct"
      },
      {
        "name": "Our Lady of Lourdes",
        "place": "Raleigh, NC",
        "note": "Current to the week: dated stories, an in-progress campaign, nothing left over from last season.",
        "href": "/parish/our-lady-of-lourdes-raleigh-nc"
      },
      {
        "name": "St. John the Evangelist Parish",
        "place": "Gulfport, MS",
        "note": "An unbroken weekly bulletin sequence and a calendar dated from the present month forward.",
        "href": "/parish/st-john-the-evangelist-parish-gulfport-ms"
      },
      {
        "name": "Holy Trinity",
        "place": "Louisville, KY",
        "note": "The homepage promotes this week's bulletin and the formation offerings are already next year's — maintained ahead of need.",
        "href": "/parish/holy-trinity-louisville-ky"
      }
    ]
  },
  {
    "slug": "faces-not-facades",
    "verb": "Hear",
    "title": "Show faces, not facades",
    "promise": "A visitor decides whether people like them belong at a parish by looking at its pictures. Real faces of real parishioners beat a beautiful empty building, every time.",
    "principle": "Use real photos and short video of parish life rather than stock images — told truthfully, respectfully, and with permission, especially for children and sensitive moments. The homepage hero especially: a person before a building, a story before a spire.",
    "fix": [
      "Lead the homepage with people — one person's story, told with permission, outranks an architecture shot.",
      "Photograph the actual events: the procession, the food pantry, the choir rehearsal — and publish them while they are recent.",
      "Keep a gallery that lives: albums from this season, not a single year's picnic.",
      "Put faces in the directory and ministry pages, where trust is decided.",
      "Retire stock imagery wherever a real photo exists; visitors can tell."
    ],
    "keywords": [
      "photo",
      "image",
      "stock",
      "visual",
      "picture"
    ],
    "exemplars": [
      {
        "name": "Holy Name Cathedral",
        "place": "Chicago, IL",
        "note": "The homepage hero is a custom video of the cathedral community — people forward, not a facade.",
        "href": "/cathedral/holy-name-cathedral-chicago"
      },
      {
        "name": "Assumption",
        "place": "Richfield, MN",
        "note": "Its volunteering page carries a rich album of real photographs of parishioners at work.",
        "href": "/parish/assumption-richfield-mn"
      },
      {
        "name": "St. Cecilia Parish",
        "place": "Beaverton, OR",
        "note": "A gallery page and photo albums of actual celebrations — a relic Mass and veneration, documented as it happened.",
        "href": "/parish/st-cecilia-parish-beaverton-or"
      },
      {
        "name": "St. Francis Xavier Parish",
        "place": "Winooski, VT",
        "note": "The homepage carries the parish's own photography in its header — its people and place, not a library image.",
        "href": "/parish/st-francis-xavier-parish-winooski-vt"
      },
      {
        "name": "St. John Parish",
        "place": "Yamhill, OR",
        "note": "Real faces in the staff directory, the pastor included — a small thing that changes a first impression.",
        "href": "/parish/st-john-parish-yamhill-or"
      },
      {
        "name": "St. Patrick's Cathedral, New York",
        "place": "New York, NY",
        "note": "The homepage opens with a video interview — a mother telling a saint's story — before any architecture.",
        "href": "/cathedral/st-patricks-cathedral-new-york-new-york"
      }
    ]
  }
];

export function solutionForText(text: string): Solution | undefined {
  const t = text.toLowerCase();
  let best: Solution | undefined;
  let bestScore = 0;
  for (const s of SOLUTIONS) {
    const score = s.keywords.reduce((n, k) => n + (t.includes(k) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = s; }
  }
  return bestScore > 0 ? best : undefined;
}
