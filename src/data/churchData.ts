import { Sermon, ChurchEvent, Ministry, Leader, Testimony, DailyVerse, DailyDevotional, WorshipTrack } from '../types';

export const CHURCH_INFO = {
  name: 'Fountain of Life Church',
  tagline: 'Living Waters, Transforming Lives',
  scriptureMotto: '“Whoever drinks of the water that I shall give him will never thirst. But the water that I shall give him will become in him a fountain of water springing up into everlasting life.” — John 4:14',
  address: '124 Living Waters Way, Victory City, VC 77084',
  phone: '08127933781',
  altPhone: '+234 812 793 3781',
  email: 'fountainoflife@gmail.com',
  pastoralCareEmail: 'fountainoflife@gmail.com',
  prayerEmail: 'fountainoflife@gmail.com',
  givingEmail: 'fountainoflife@gmail.com',
  liveStreamUrl: 'https://www.youtube.com/@fountainoflifechurch/live',
  whatsappNumber: '+2348127933781',
  serviceTimes: [
    { name: 'First Sunday Service (Early Dew)', time: '8:00 AM – 9:45 AM', type: 'In-Person & Online' },
    { name: 'Second Sunday Service (Celebration & Word)', time: '10:15 AM – 12:30 PM', type: 'In-Person & Online' },
    { name: 'Mid-Week Faith Clinic & Communion', time: 'Wednesdays 6:30 PM – 8:00 PM', type: 'Hybrid' },
    { name: 'Monthly Holy Ghost Miracle Vigil', time: '1st Friday 10:00 PM – 3:30 AM', type: 'In-Person' }
  ],
  bankingDetails: {
    bankName: 'First Dominion Covenant Bank',
    accountName: 'Fountain of Life Church General Account',
    accountNumber: '1029384756',
    routingNumber: '021000021',
    swiftCode: 'FDCBUS33',
    zelle: 'fountainoflife@gmail.com',
    cashApp: '$FOLCGiving'
  },
  images: {
    hero: '/src/assets/images/hero_church_worship_1793357475960.jpg',
    pastors: '/src/assets/images/senior_pastors_portrait_1793357477384.jpg',
    community: '/src/assets/images/church_community_fellowship_1793357478541.jpg',
    choir: '/src/assets/images/choir_worship_ministry_1793357477724.jpg'
  }
};

export const SERMONS_DATA: Sermon[] = [
  {
    id: 'sermon-1',
    title: 'The Rivers of Uncontainable Favor',
    speaker: 'Dr. Emmanuel Adeleke',
    speakerRole: 'Senior Pastor',
    date: 'October 25, 2026',
    scripture: 'Psalm 102:13; Genesis 39:2-5',
    series: 'Dimensions of Glory',
    category: 'Grace',
    duration: '52 mins',
    description: 'Divine favor does not depend on human connections or worldly algorithms. When God’s favor locates you, doors that were previously sealed shut swing wide open by covenant authority.',
    notes: [
      'Favor is the divine unction that produces supernatural speed and effortless victory.',
      'God’s timing does not follow human calendars: "The set time to favor Zion is come."',
      'Stewardship of grace: Favor is given not just for comfort, but to establish God’s covenant on earth.'
    ],
    keyTakeaway: 'When God’s favor wraps around you as a shield, you become an unstoppable testimony in your generation.'
  },
  {
    id: 'sermon-2',
    title: 'Drinking from the Living Spring',
    speaker: 'Pastor Mrs. Grace Adeleke',
    speakerRole: 'Resident Pastor & Co-Founder',
    date: 'October 18, 2026',
    scripture: 'John 4:10-14; Isaiah 12:3',
    series: 'Living Waters',
    category: 'Spiritual Growth',
    duration: '48 mins',
    description: 'The world offers temporary sips that leave the soul empty and parched. Christ Jesus invites us to drink continually from the subterranean wells of salvation, where joy and strength never run dry.',
    notes: [
      'Recognizing the gift of God: Who is asking you for a drink?',
      'From stagnant cisterns to overflowing rivers: breaking reliance on toxic worldly substitutes.',
      'Daily devotional hydration: soaking in the Word and secret place communion.'
    ],
    keyTakeaway: 'Your soul was created for deep communion with the Holy Spirit; nothing in this world can satisfy your spiritual thirst except the Living Fountain.'
  },
  {
    id: 'sermon-3',
    title: 'The Warfare of Persistent Thanksgiving',
    speaker: 'Dr. Emmanuel Adeleke',
    speakerRole: 'Senior Pastor',
    date: 'October 11, 2026',
    scripture: '2 Chronicles 20:21-23; Philippians 4:6-7',
    series: 'Dimensions of Glory',
    category: 'Faith',
    duration: '56 mins',
    description: 'When King Jehoshaphat placed the singers at the forefront of the battle array, the enemies destroyed one another. Discover the offensive weapon of high praise and deliberate thanksgiving in difficult seasons.',
    notes: [
      'Praise before the breakthrough confuses the adversary.',
      'Murmuring prolongs the wilderness; gratitude unlocks the Promised Land.',
      'Sacrifice of thanksgiving: Praising God when circumstances seem contradictory.'
    ],
    keyTakeaway: 'The moment you lift your praise above your pain, the Lord sets an ambush against the obstacles standing before your destiny.'
  },
  {
    id: 'sermon-4',
    title: 'Commanding Your Morning by Prevailing Prayer',
    speaker: 'Pastor David Adebayo',
    speakerRole: 'Associate Pastor (Evangelism & Prayer)',
    date: 'October 4, 2026',
    scripture: 'Job 38:12-13; Psalm 63:1-2',
    series: 'The Anointed Altar',
    category: 'Prayer',
    duration: '45 mins',
    description: 'Spiritual authority must be declared over your day before the day begins. Learn how to take charge of your atmosphere, dismantle satanic ordinances, and release angelic assistance through early morning intercession.',
    notes: [
      'The morning hours hold the gateway of destiny.',
      'Praying with biblical scripture: giving voice to the Word of God.',
      'Spiritual consistency beats sporadic intensity in the secret place.'
    ],
    keyTakeaway: 'You cannot walk in victory in public if you have not first prevailed on your knees in private.'
  },
  {
    id: 'sermon-5',
    title: 'Covenant Family: Restoring the Sacred Altar',
    speaker: 'Pastor Mrs. Grace Adeleke',
    speakerRole: 'Resident Pastor & Family Counselor',
    date: 'September 27, 2026',
    scripture: 'Joshua 24:14-15; Colossians 3:18-21',
    series: 'Healthy Homes, Mighty Nations',
    category: 'Family',
    duration: '50 mins',
    description: 'Strong families make strong churches and enduring societies. Explore practical, Christ-centered wisdom on marriage, parenting, unconditional love, and erecting a family prayer altar in a distracting culture.',
    notes: [
      'The home is God’s primary institution on earth.',
      'Parenting with prophetic intention: speaking life over your sons and daughters.',
      'Forgiveness as the air that keeps marital intimacy breathing.'
    ],
    keyTakeaway: 'As for me and my house, we will serve the Lord with gladness, honor, and unwavering faith.'
  },
  {
    id: 'sermon-6',
    title: 'Supernatural Wealth & Kingdom Assignment',
    speaker: 'Dr. Emmanuel Adeleke',
    speakerRole: 'Senior Pastor',
    date: 'September 20, 2026',
    scripture: 'Deuteronomy 8:18; Luke 6:38; 2 Corinthians 9:6-11',
    series: 'Covenant Blessings',
    category: 'Finances',
    duration: '54 mins',
    description: 'God gives power to get wealth not for selfish accumulation, but to confirm His covenant and fund the global proclamation of the Gospel. Discover covenant stewardship and supernatural multiplication.',
    notes: [
      'Tithe as the foundational acknowledgment of God’s ownership.',
      'The law of seedtime and harvest is eternal and unchanging.',
      'Becoming God’s distribution pipeline: when God knows money will pass through you to bless the needy and advance the Kingdom, He keeps the supply flowing.'
    ],
    keyTakeaway: 'You are blessed to be a blessing; your prosperity is tied to your sensitivity to God’s global heartbeat.'
  }
];

export const EVENTS_DATA: ChurchEvent[] = [
  {
    id: 'evt-1',
    title: 'Supernatural Overflow Sunday Encounter',
    subtitle: 'A specialized service of prophetic worship, word, and impartation',
    date: 'Sunday, November 8, 2026',
    time: '8:00 AM & 10:15 AM Services',
    location: 'Main Sanctuary & Live Broadcast',
    category: 'Sunday Service',
    description: 'Join us for an extraordinary Sunday service dedicated to the fresh infilling of the Holy Spirit and prophetic declarations for the new month.',
    featured: true,
    speaker: 'Dr. Emmanuel Adeleke',
    registrationRequired: false,
    coordinator: 'Protocol & Hospitality Guild'
  },
  {
    id: 'evt-2',
    title: 'All-Night Holy Ghost Miracle Vigil',
    subtitle: 'Night of signs, wonders, healing, and fervent intercession',
    date: 'Friday, November 13, 2026',
    time: '10:00 PM – 4:00 AM',
    location: 'Main Sanctuary (Overnight Session)',
    category: 'Revival',
    description: 'An anointed atmosphere of non-stop praise, fervent apostolic prayer, personal deliverance, and prophetic ministrations.',
    featured: true,
    speaker: 'Pastoral Team & Guest Apostles',
    registrationRequired: false,
    coordinator: 'Prayer Warriors & Intercessory Directorate'
  },
  {
    id: 'evt-3',
    title: 'Living Waters Kingdom Youth Summit',
    subtitle: 'Igniting purpose, digital leadership, and fiery passion for Christ',
    date: 'Saturday, November 21, 2026',
    time: '10:00 AM – 3:30 PM',
    location: 'Grace Youth Auditorium & Courtyard',
    category: 'Youth',
    description: 'High-energy worship, thought-provoking panel discussions on careers, relationships, mental health, and spiritual resilience in a modern world. Lunch provided.',
    featured: false,
    speaker: 'Pastor Blessing Okafor & Youth Panelists',
    registrationRequired: true,
    coordinator: 'The Ascendancy Youth Ministry'
  },
  {
    id: 'evt-4',
    title: 'Virtuous Women of Grace Annual Breakfast',
    subtitle: 'Clothed in strength and dignity: walking in divine purpose',
    date: 'Saturday, December 5, 2026',
    time: '9:00 AM – 1:00 PM',
    location: 'Banquet Hall & Rose Terrace',
    category: 'Women',
    description: 'An elegant morning of worship, inspirational keynote teachings, fellowship, and sisterhood celebrating the grace of God upon women across every generation.',
    featured: false,
    speaker: 'Pastor Mrs. Grace Adeleke',
    registrationRequired: true,
    coordinator: 'Virtuous Women Fellowship'
  },
  {
    id: 'evt-5',
    title: 'Victory City Thanksgiving & Carol of Nine Lessons',
    subtitle: 'An orchestral celebration of the Nativity with classical choir and contemporary praise',
    date: 'Sunday, December 20, 2026',
    time: '5:30 PM – 8:30 PM',
    location: 'Main Auditorium & Festival Grounds',
    category: 'Community',
    description: 'A spectacular evening bringing our entire community together with candlelight carols, dramatic musical presentation, and complimentary festive reception.',
    featured: true,
    speaker: 'Dr. Emmanuel Adeleke & The Living Waters Mass Choir',
    registrationRequired: false,
    coordinator: 'Music & Creative Arts Department'
  }
];

export const MINISTRIES_DATA: Ministry[] = [
  {
    id: 'min-1',
    name: 'Kingdom Champions Children Church',
    targetAudience: 'Infants to 12 Years Old',
    tagline: 'Training up children in the way of the Lord with love and joy',
    description: 'A safe, secure, vibrant, and fun environment where children discover the stories of scripture, experience God’s love, and build enduring foundations of faith.',
    meetingSchedule: 'Sundays at 8:00 AM & 10:15 AM (Concurrent with Main Services)',
    leaderName: 'Deaconess Sarah Jenkins',
    leaderTitle: 'Director of Children Ministries',
    scriptureReference: 'Proverbs 22:6',
    scriptureText: 'Train up a child in the way he should go, and when he is old he will not depart from it.',
    highlights: [
      'Age-graded classrooms (Nursery, Toddlers, Juniors, Pre-teens)',
      'Fingerprint & badge secure child check-in system',
      'Interactive Bible puppet theatre and memory verse games',
      'Annual Vacation Bible School (VBS) & Christmas Pageant'
    ],
    contactEmail: 'children@fountainoflifechurch.org'
  },
  {
    id: 'min-2',
    name: 'The Ascendancy Youth & Young Adults',
    targetAudience: 'Ages 13 to 30 (Students & Young Professionals)',
    tagline: 'Bold in Faith, Radiant in Purpose, Transforming Culture',
    description: 'A dynamic community of students, creatives, and young career professionals passionate about radical discipleship, authentic friendships, and societal impact.',
    meetingSchedule: 'Fridays at 7:00 PM & Bi-Weekly Sunday Afternoons',
    leaderName: 'Pastor Blessing Okafor',
    leaderTitle: 'Youth Pastor & Campus Chaplain',
    scriptureReference: '1 Timothy 4:12',
    scriptureText: 'Let no one despise your youth, but be an example to the believers in word, in conduct, in love, in spirit, in faith, in purity.',
    highlights: [
      'Weekly unplugged acoustic worship & candid talk nights',
      'Mentorship tracks with established Christian marketplace leaders',
      'University campus Bible study fellowships',
      'Summer mission trips and tech-for-good community hackathons'
    ],
    contactEmail: 'youth@fountainoflifechurch.org'
  },
  {
    id: 'min-3',
    name: 'Men of Valour Fellowship',
    targetAudience: 'Men Ages 18+',
    tagline: 'Priests, Providers, and Protectors Standing on Covenant Ground',
    description: 'Empowering men to step boldly into God-ordained spiritual leadership within their homes, workplaces, and the church through brotherhood, accountability, and prayer.',
    meetingSchedule: '2nd & 4th Saturdays at 7:30 AM (Men’s Power Breakfast)',
    leaderName: 'Elder Michael Vance',
    leaderTitle: 'President, Men of Valour',
    scriptureReference: 'Micah 6:8; 1 Corinthians 16:13',
    scriptureText: 'Watch, stand fast in the faith, be brave, be strong. Let all that you do be done with love.',
    highlights: [
      'Men’s monthly leadership breakfasts with practical business & family insights',
      'Brotherhood prayer huddles and iron-sharpens-iron accountability groups',
      'Father-child outdoor adventure retreats and sports tournaments',
      'Community practical service projects (home repairs for widows and single mothers)'
    ],
    contactEmail: 'men@fountainoflifechurch.org'
  },
  {
    id: 'min-4',
    name: 'Virtuous Women of Grace',
    targetAudience: 'Women Ages 18+',
    tagline: 'Rooted in Grace, Flourishing in Strength and Honor',
    description: 'A supportive and uplifting sisterhood nurturing women spiritually, emotionally, and socially to walk in dignity, balance divine priorities, and mentor the next generation.',
    meetingSchedule: '1st & 3rd Saturdays at 9:00 AM (Monthly Prayer & Flourish Gatherings)',
    leaderName: 'Pastor Mrs. Grace Adeleke',
    leaderTitle: 'Matron & President',
    scriptureReference: 'Proverbs 31:25-26',
    scriptureText: 'Strength and dignity are her clothing; she smiles at the future. She opens her mouth with wisdom, and loving instruction is on her tongue.',
    highlights: [
      'Annual National Women’s Conference with international guest ministers',
      'New mothers care circles and meal delivery ministry',
      'Professional mentorship and women entrepreneurship mastermind',
      'Daughters of Destiny teen girls mentoring academy'
    ],
    contactEmail: 'women@fountainoflifechurch.org'
  },
  {
    id: 'min-5',
    name: 'Living Waters Choir & Creative Arts',
    targetAudience: 'Singers, Musicians, Audio/Visual Engineers & Actors',
    tagline: 'Ministering in the presence of God with skill and anointing',
    description: 'Creating an atmosphere of heavenly worship where the glory of God descends, yokes are shattered, hearts are mended, and believers are ushered into divine intimacy.',
    meetingSchedule: 'Thursdays at 6:30 PM & Saturdays at 4:00 PM (Rehearsals)',
    leaderName: 'Minister Caleb Washington',
    leaderTitle: 'Minister of Music & Worship',
    scriptureReference: 'Psalm 33:3; John 4:23-24',
    scriptureText: 'Sing to Him a new song; play skillfully with a shout of joy.',
    highlights: [
      'Blended worship: Majestic anthems, energetic African praise, and intimate contemporary worship',
      'Professional vocal and instrumental coaching workshops',
      'Live album recordings and original praise compositions',
      'Production, streaming broadcast, and acoustic engineering team'
    ],
    contactEmail: 'choir@fountainoflifechurch.org'
  },
  {
    id: 'min-6',
    name: 'Global Evangelism & Compassion Outreach',
    targetAudience: 'All Believers Passionate about the Great Commission',
    tagline: 'Taking Christ’s love beyond the church walls into the world',
    description: 'Mobilizing the church to feed the hungry, clothe the needy, visit hospitals and correctional centers, and share the good news of Jesus Christ locally and globally.',
    meetingSchedule: 'Tuesdays Outreach Prep & Alternate Saturday Field Operations',
    leaderName: 'Pastor David Adebayo',
    leaderTitle: 'Director of Evangelism & Missions',
    scriptureReference: 'Matthew 28:19-20; Matthew 25:40',
    scriptureText: 'Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.',
    highlights: [
      'Weekly food pantry distribution serving over 300 neighborhood families',
      'Prison ministry visitation and rehabilitation mentorship',
      'Medical mission clinics offering free health screenings and medications',
      'Rural church planting and missionary sponsorship in West Africa & East Asia'
    ],
    contactEmail: 'outreach@fountainoflifechurch.org'
  }
];

export const LEADERSHIP_DATA: Leader[] = [
  {
    id: 'lead-1',
    name: 'Dr. Emmanuel Adeleke',
    role: 'Senior Pastor & General Overseer',
    bio: 'Dr. Emmanuel Adeleke has served in pastoral ministry for over 28 years with an apostolic mandate to proclaim salvation, holiness, and the supernatural power of God. Renowned for his deep, uncompromising exposition of scripture, prophetic insight, and compassionate pastoral heart, he has guided thousands into spiritual maturity and purposeful kingdom leadership.',
    favoriteScripture: 'Philippians 3:10 — "That I may know Him and the power of His resurrection, and the fellowship of His sufferings."',
    email: 'pastor.emmanuel@fountainoflifechurch.org',
    imageUrl: '/src/assets/images/senior_pastors_portrait_1793357477384.jpg',
    isSeniorPastor: true
  },
  {
    id: 'lead-2',
    name: 'Pastor Mrs. Grace Adeleke',
    role: 'Co-Pastor, Family Life Director & Author',
    bio: 'Pastor Grace Adeleke is an anointed teacher, gifted counselor, and ardent prayer intercessor. Her ministry is marked by a deep passion for marital harmony, parenting with biblical wisdom, and elevating women to realize their divine calling in Christ. She co-founded Fountain of Life Church alongside her husband and actively oversees the pastoral counseling board.',
    favoriteScripture: 'Isaiah 40:31 — "Those who wait on the Lord shall renew their strength; they shall mount up with wings like eagles."',
    email: 'pastor.grace@fountainoflifechurch.org',
    imageUrl: '/src/assets/images/senior_pastors_portrait_1793357477384.jpg',
    isSeniorPastor: true
  },
  {
    id: 'lead-3',
    name: 'Pastor David Adebayo',
    role: 'Associate Pastor (Evangelism, Prayer & Missions)',
    bio: 'Pastor David is a zealous evangelist whose heartbeat is the salvation of souls and the training of intercessors. He leads the 24/7 prayer chain and supervises the church’s local and international mission partners.',
    favoriteScripture: 'Romans 1:16 — "For I am not ashamed of the gospel of Christ, for it is the power of God to salvation for everyone who believes."',
    email: 'david.adebayo@fountainoflifechurch.org'
  },
  {
    id: 'lead-4',
    name: 'Elder Michael Vance',
    role: 'Chairman of the Board of Elders & Men’s Leader',
    bio: 'A retired civil engineer and longtime community pillar, Elder Vance has faithfully served Fountain of Life Church for 22 years, bringing structural wisdom, integrity, and pastoral care to our governance and men’s brotherhood.',
    favoriteScripture: 'Proverbs 3:5-6 — "Trust in the Lord with all your heart, and lean not on your own understanding."',
    email: 'elders@fountainoflifechurch.org'
  },
  {
    id: 'lead-5',
    name: 'Pastor Blessing Okafor',
    role: 'Youth & Emerging Generations Pastor',
    bio: 'Pastor Blessing connects relevantly with Gen Z and millennial professionals, bridging timeless biblical truth with modern cultural challenges through authentic discipleship, creative media, and energetic faith.',
    favoriteScripture: 'Jeremiah 29:11 — "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you a future and a hope."',
    email: 'blessing.okafor@fountainoflifechurch.org'
  }
];

export const TESTIMONIES_DATA: Testimony[] = [
  {
    id: 'test-1',
    author: 'Sister Victoria N.',
    city: 'Victory City',
    title: 'Supernatural Healing from Stage 3 Illness',
    category: 'Healing',
    story: 'During the August Holy Ghost Miracle Vigil, Pastor Emmanuel called out a condition related to my lungs. I laid my hand on my chest and felt a sudden wave of heat. When I went for my scan two weeks later, the oncology team was astonished — the scans were completely clear! Jesus healed me completely!',
    date: 'September 2026',
    verified: true
  },
  {
    id: 'test-2',
    author: 'Brother Samuel & Clara O.',
    city: 'Houston Metro',
    title: 'Blessed with Miracle Twins After 9 Years of Waiting',
    category: 'Breakthrough',
    story: 'For nine long years, doctors told us biological parenthood was clinically impossible. We stood steadfast on God’s Word at Fountain of Life Church, supported by the Virtuous Women and Pastors’ prayers. In July, God blessed us with healthy twin boys! Truly, what God cannot do does not exist!',
    date: 'August 2026',
    verified: true
  },
  {
    id: 'test-3',
    author: 'Deacon Marcus B.',
    city: 'Victory City',
    title: 'Debt Free and Multiplied Business Contracts',
    category: 'Provision',
    story: 'My logistics company was on the brink of bankruptcy in 2025. After the series on Kingdom Stewardship, my wife and I made a covenant vow and prioritized our tithes and Kingdom building pledges. Within 90 days, we received two major government logistics tenders that cleared all debts and created 15 new jobs.',
    date: 'October 2026',
    verified: true
  },
  {
    id: 'test-4',
    author: 'David K. (University Graduate)',
    city: 'College Station',
    title: 'Delivered from Addiction and Anointed to Serve',
    category: 'Salvation',
    story: 'I stepped into Fountain of Life Church during the Youth Summit depressed and trapped in substance addiction. The love of the greeters and the tangible presence of God during worship broke my chains on the spot. Today, I am 18 months sober, a graduate, and serving joyfully in the choir!',
    date: 'June 2026',
    verified: true
  }
];

export const DAILY_VERSES: DailyVerse[] = [
  {
    reference: 'John 4:14',
    text: 'Whoever drinks of the water that I will give him will never be thirsty again. The water that I will give him will become in him a spring of water welling up to eternal life.',
    translation: 'ESV',
    reflection: 'Earthly pleasures leave an ache that only the Holy Spirit can satisfy. Today, come thirsty to Jesus; His living water produces ceaseless joy, peace, and spiritual vitality from within.',
    prayer: 'Lord Jesus, I drink anew from Your unfailing fountain today. Wash away my weariness and let Your living waters flow out of my life to refresh everyone I encounter. Amen.'
  },
  {
    reference: 'Psalm 36:9',
    text: 'For with You is the fountain of life; in Your light we see light.',
    translation: 'NKJV',
    reflection: 'God is not merely a provider of life; He is the very source and fountain of existence. When we position ourselves in His presence, confusion dissipates and divine clarity guides our footsteps.',
    prayer: 'Heavenly Father, be my light today in every decision and conversation. Where there is darkness or ambiguity, shine the illumination of Your Holy Spirit upon my path. Amen.'
  },
  {
    reference: 'Jeremiah 17:7-8',
    text: 'Blessed is the man who trusts in the Lord, whose trust is the Lord. He is like a tree planted by water, that sends out its roots by the stream, and does not fear when heat comes.',
    translation: 'ESV',
    reflection: 'Even when the dry seasons of life arrive, the believer whose roots are anchored in the Living Word remains evergreen and fruitful. Your faith in Christ guarantees survival and prosperity in all climates.',
    prayer: 'Father, deepen my spiritual roots in Your Word. Teach me to trust You when circumstances are challenging, knowing that in You, my leaves will never wither. Amen.'
  },
  {
    reference: 'Revelation 21:6',
    text: 'I am the Alpha and the Omega, the Beginning and the End. To the thirsty I will give from the spring of the water of life without payment.',
    translation: 'ESV',
    reflection: 'Salvation and grace cannot be bought by silver or human merit; they are the generous, free gift of God to those who recognize their need for a Savior. Drink deeply of His grace today.',
    prayer: 'Jesus, Alpha and Omega, thank You for paying the ultimate price on the cross. I receive Your forgiveness and righteousness freely, and I dedicate my day to Your praise. Amen.'
  }
];

export const BELIEFS = [
  {
    title: 'The Infallible Word of God',
    scripture: '2 Timothy 3:16-17; Psalm 119:105',
    summary: 'We believe the Holy Bible is the divinely inspired, infallible, and authoritative Word of God, serving as the supreme manual for all Christian faith, doctrine, and conduct.'
  },
  {
    title: 'The Eternal Trinity',
    scripture: 'Matthew 28:19; 2 Corinthians 13:14',
    summary: 'We worship one true God, eternally existent in three co-equal persons: the Father, the Son Jesus Christ, and the Holy Spirit, identical in nature and purpose.'
  },
  {
    title: 'Salvation by Grace Through Faith',
    scripture: 'Ephesians 2:8-9; John 3:16',
    summary: 'Salvation is a supernatural gift received exclusively through repentance and personal faith in the atoning blood and resurrection of our Lord Jesus Christ, not by works.'
  },
  {
    title: 'Water Baptism & Holy Communion',
    scripture: 'Romans 6:4; 1 Corinthians 11:23-26',
    summary: 'We practice baptism by full immersion in water as an outward public testimony of inward death to sin, and partake reverently in the Lord’s Supper celebrating Christ’s covenant.'
  },
  {
    title: 'The Baptism of the Holy Spirit',
    scripture: 'Acts 1:8; Acts 2:4; 1 Corinthians 12',
    summary: 'We believe in the enduement of spiritual power for witnessing and holy living through the Holy Spirit baptism, with the initial evidence of speaking in other tongues.'
  },
  {
    title: 'Divine Healing & Miracles',
    scripture: 'Isaiah 53:5; 1 Peter 2:24; Mark 16:17-18',
    summary: 'Divine healing is provided in the atonement of Jesus Christ and is the covenant privilege of every believer through fervent prayer and the prayer of faith.'
  },
  {
    title: 'The Blessed Hope & Second Coming',
    scripture: '1 Thessalonians 4:16-17; Titus 2:13',
    summary: 'We joyfully anticipate the imminent, literal return of Jesus Christ to catch away His saints (the Rapture) and to reign in majesty and righteousness forever.'
  }
];

export const DEVOTIONALS_DATA: DailyDevotional[] = [
  {
    id: 'dev-sun',
    dayOfWeek: 'Sunday',
    title: 'The Abundant River in the Holy Sanctuary',
    theme: 'Corporate Worship & Holy Encounter',
    scriptureRef: 'John 7:37-38',
    scriptureText: 'On the last and greatest day of the festival, Jesus stood and said in a loud voice, "Let anyone who is thirsty come to me and drink. Whoever believes in me, as Scripture has said, rivers of living water will flow from within them."',
    translation: 'NIV',
    reflection: 'Today is the Lord’s Day—a consecrated appointed time where Heaven touches earth. Notice that Jesus did not whisper; He cried out with urgency to every dry, exhausted heart. When we gather in corporate unity at the altar, our thirst is not met with a mere trickle or stagnant pond, but with torrents of living water. God never intended you to live on yesterday’s manna. Today, lay down the burdens of the previous week at His feet. Lift your hands in genuine surrender, sing with all your heart, and open your spirit to drink deeply from the presence of Christ.',
    actionStep: 'Come to church today expecting a supernatural encounter. Arrive early, pray for the ministry of the Word, and deliberately encourage someone sitting beside you with a warm smile.',
    prayerPoint: 'Heavenly Father, as I step into Your courts with thanksgiving today, let Your rivers of living water wash over my weary soul. Saturate every dry place in my heart and let revival start in me.',
    propheticDeclaration: 'I declare that this Sunday marks the beginning of unusual favor in my life. Out of my belly shall flow rivers of joy, power, and answered prayers in Jesus’ name!',
    author: 'Dr. Emmanuel Adeleke (Senior Pastor)',
    readingDuration: '2 min read'
  },
  {
    id: 'dev-mon',
    dayOfWeek: 'Monday',
    title: 'New Mercies for a Victorious Week',
    theme: 'Divine Strength & Fresh Beginnings',
    scriptureRef: 'Lamentations 3:22-23',
    scriptureText: 'Through the Lord’s mercies we are not consumed, because His compassions fail not. They are new every morning; great is Your faithfulness.',
    translation: 'NKJV',
    reflection: 'Mondays often bring a surge of deadlines, work anxieties, and the pressures of the secular world. Yet the Prophet Jeremiah reminds us of an unfailing spiritual reality: God’s mercies are not recycled from last week. Every sunrise brings a customized, fresh consignment of grace tailored precisely for the challenges ahead of you. No matter what mistakes were made last week or what unfinished tasks loom before you, you are covered by an eternal covenant. Step into your workplace, school, or home knowing you do not walk alone—His compassions are your daily shield.',
    actionStep: 'Before opening your work emails or to-do lists this morning, spend five quiet minutes dedicating every meeting, conversation, and project into the hands of the Holy Spirit.',
    prayerPoint: 'Lord God of all faithfulness, thank You for waking me up to fresh mercies today. Crown my labor with wisdom, grant me favor with supervisors and clients, and guide my decisions by Your Spirit.',
    propheticDeclaration: 'I decree that this week will not drain me; instead, I shall wax stronger every single day. The wisdom of God goes ahead of me to make crooked paths straight!',
    author: 'Pastor Mrs. Grace Adeleke (Co-Pastor)',
    readingDuration: '2 min read'
  },
  {
    id: 'dev-tue',
    dayOfWeek: 'Tuesday',
    title: 'Deep Roots by the Living Stream',
    theme: 'Steadfast Faith & Unwavering Trust',
    scriptureRef: 'Jeremiah 17:7-8',
    scriptureText: 'Blessed is the man who trusts in the Lord, and whose hope is the Lord. For he shall be like a tree planted by the waters, which spreads out its roots by the river, and will not fear when heat comes; but its leaf will be green, and will not be anxious in the year of drought, nor will cease from yielding fruit.',
    translation: 'NKJV',
    reflection: 'The difference between a tree that withers during a scorching drought and one that continues bearing lush fruit is not the weather outside—it is the depth of the root system beneath. When external circumstances become heated, chaotic, or economically uncertain, believers whose trust is rooted in Jesus are sustained by invisible undercurrents of divine grace. You do not have to panic when reports seem unfavorable. Your source is not the world’s economy or human opinions; your source is the Fountain of Life.',
    actionStep: 'Identify one worry that has been consuming your thoughts. Write it down on a piece of paper, write "The Lord is my Shepherd and Provider" over it, and commit it to God in prayer.',
    prayerPoint: 'Father, anchor my soul in the bedrock of Your promises. Grant me spiritual stamina so that even in turbulent seasons, my testimony remains vibrant and my fruitfulness does not cease.',
    propheticDeclaration: 'In the time of famine and drought, I shall be satisfied! My leaves shall remain green, my finances protected, and my household will be a beacon of God’s abundance.',
    author: 'Dr. Emmanuel Adeleke (Senior Pastor)',
    readingDuration: '3 min read'
  },
  {
    id: 'dev-wed',
    dayOfWeek: 'Wednesday',
    title: 'Mid-Week Refreshing in the Secret Place',
    theme: 'Spiritual Recharging & Divine Protection',
    scriptureRef: 'Psalm 91:1-2',
    scriptureText: 'He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty. I will say of the Lord, "He is my refuge and my fortress; my God, in Him I will trust."',
    translation: 'NKJV',
    reflection: 'Mid-week is often the moment when physical and mental stamina begin to lag. The pressures of the week threaten to wear down our resolve. That is why God invites us into the "secret place." Notice the active verb: "dwells." It implies an intentional residence, not a hurried drive-by prayer. Today, in the middle of your busy schedule, make time to abide under His shadow. When you join our Mid-Week Faith Clinic & Communion service or retreat into personal quiet time, God replenishes your spiritual batteries with supernatural vigor.',
    actionStep: 'Plan your schedule to attend our Wednesday Mid-Week service at 6:30 PM (or join online via the Live page). Come hungry for communion and corporate intercession.',
    prayerPoint: 'Lord Most High, hide me and my family under the shadow of Your wings today. Shield us from the arrows of darkness, and refill my spirit with holy fire and divine clarity.',
    propheticDeclaration: 'No weapon formed against me or my loved ones shall prosper. I abide in the fortress of the Almighty, and divine security is my continuous portion!',
    author: 'Pastor David Adebayo (Associate Pastor)',
    readingDuration: '2 min read'
  },
  {
    id: 'dev-thu',
    dayOfWeek: 'Thursday',
    title: 'The Peace That Transcends Understanding',
    theme: 'Victory Over Anxiety & Joyful Thanksgiving',
    scriptureRef: 'Philippians 4:6-7',
    scriptureText: 'Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus.',
    translation: 'NKJV',
    reflection: 'Anxiety is a thief of joy and a poison to spiritual discernment. The Apostle Paul writes this powerful instruction while imprisoned—proving that supernatural peace is never dependent on ideal external conditions. God’s prescription for worry is specific: prayer coupled with thanksgiving. When you recount the prayers God answered in your past, fear loses its grip over your present. The peace of God is not just a quiet emotion; it acts like a garrison of heavenly soldiers standing guard around your mind and heart.',
    actionStep: 'Take a "Thanksgiving Walk" or write down five specific prayers God has answered for you over the last 12 months. Thank Him out loud for each one.',
    prayerPoint: 'Father, I release every anxious thought, sleepless worry, and fear of the future into Your loving hands. Infuse my mind with the transcendent peace of Christ right now.',
    propheticDeclaration: 'Anxiety has no legal right in my mind! The peace of God guards my heart, and my sleep will be sweet and undisturbed in Jesus’ name.',
    author: 'Pastor Mrs. Grace Adeleke (Co-Pastor)',
    readingDuration: '2 min read'
  },
  {
    id: 'dev-fri',
    dayOfWeek: 'Friday',
    title: 'The Triumphant Victory of the Cross',
    theme: 'Deliverance, Healing & Covenant Dominion',
    scriptureRef: 'Colossians 2:14-15',
    scriptureText: 'Having wiped out the handwriting of requirements that was against us, which was contrary to us. And He has taken it out of the way, having nailed it to the cross. Having disarmed principalities and powers, He made a public spectacle of them, triumphing over them in it.',
    translation: 'NKJV',
    reflection: 'As we approach the weekend, remember that as a child of the Living God, you never fight FOR victory—you fight FROM victory! On the rugged cross of Calvary, Jesus canceled every handwriting of debt, curse, sickness, and generational limitation that was contrary to your destiny. The enemy has been stripped of his authority over your life. When negative reports, accusations, or ancestral patterns try to raise their head, point them to the empty tomb and the finished work of Jesus Christ.',
    actionStep: 'Take authority in your home today. Anoint your doorways or pray over your rooms, declaring that only the light, peace, and angels of God are welcome.',
    prayerPoint: 'Lord Jesus, I celebrate Your total triumph on the cross. Thank You for disarming every force of darkness assigned against my destiny. Let the power of Your resurrection manifest in my body, family, and career.',
    propheticDeclaration: 'I am more than a conqueror through Christ! Sickness, failure, and stagnation have no hold over me. I step into my weekend with shouts of victory!',
    author: 'Dr. Emmanuel Adeleke (Senior Pastor)',
    readingDuration: '3 min read'
  },
  {
    id: 'dev-sat',
    dayOfWeek: 'Saturday',
    title: 'Holy Rest and Preparation for the Altar',
    theme: 'Sabbath Rest, Family Harmony & Consecration',
    scriptureRef: 'Matthew 11:28-30',
    scriptureText: 'Come to Me, all you who labor and are heavy laden, and I will give you rest. Take My yoke upon you and learn from Me, for I am gentle and lowly in heart, and you will find rest for your souls. For My yoke is easy and My burden is light.',
    translation: 'NKJV',
    reflection: 'True rest is not merely inactivity or bingeing entertainment; true rest is coming into alignment with Jesus. Saturday provides a sacred pause to reflect on God’s preservation throughout the week, nurture relationships with family and loved ones, and prepare our hearts for corporate worship tomorrow. Do not rush into Sunday morning stressed and disordered. Consecrate your heart tonight, prepare your tithe and offerings in advance, and come with eager expectation to meet the King of Glory.',
    actionStep: 'Spend quality, undistracted time with your family or friends today. Set out your Sunday clothes early, lay aside late-night distractions, and sleep with a heart full of praise.',
    prayerPoint: 'Lord, teach me how to rest in Your sufficiency. Restore my body, mind, and spirit. Prepare my heart for tomorrow’s worship service, that I will not leave the same way I came.',
    propheticDeclaration: 'My soul finds rest in God alone. My strength is renewed like the eagle’s. Tomorrow, my feet shall stand within the gates of Zion in exuberant praise!',
    author: 'Pastor Mrs. Grace Adeleke (Co-Pastor)',
    readingDuration: '2 min read'
  }
];

export function getDevotionalForDay(dayName?: string): DailyDevotional {
  const dayNames: Array<DailyDevotional['dayOfWeek']> = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  let targetDay = dayName;
  if (!targetDay) {
    const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
    targetDay = dayNames[todayIndex];
  }

  const found = DEVOTIONALS_DATA.find(
    (d) => d.dayOfWeek.toLowerCase() === targetDay?.toLowerCase()
  );

  return found || DEVOTIONALS_DATA[0];
}

export const WORSHIP_PLAYLIST_DATA: WorshipTrack[] = [
  {
    id: 'track-1',
    title: 'Goodness of God',
    artist: 'CeCe Winans / Bethel Music',
    originalArtist: 'CeCe Winans',
    category: 'Intimate Worship',
    duration: '4:58',
    sundayServiceTheme: 'Celebration of God’s Unbroken Faithfulness',
    scriptureReference: 'Psalm 145:7 — "They shall utter the memory of Your great goodness."',
    spotifyTrackId: '0mflMxspL6vQvo9759pQdZ',
    spotifyUrl: 'https://open.spotify.com/track/0mflMxspL6vQvo9759pQdZ',
    youtubeUrl: 'https://www.youtube.com/watch?v=-08YZF87OBQ',
    keyLyrics: 'All my life You have been faithful, All my life You have been so, so good! With every breath that I am able, I will sing of the goodness of God.',
    coverImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'track-2',
    title: 'Way Maker',
    artist: 'Sinach ft. Living Waters Choir',
    originalArtist: 'Sinach',
    category: 'Intimate Worship',
    duration: '5:05',
    sundayServiceTheme: 'Divine Deliverance & Miraculous Intervention',
    scriptureReference: 'Isaiah 43:19 — "I will even make a road in the wilderness and rivers in the desert."',
    spotifyTrackId: '3ZwuAHDbJb4Yx5xRfZ8D59',
    spotifyUrl: 'https://open.spotify.com/track/3ZwuAHDbJb4Yx5xRfZ8D59',
    youtubeUrl: 'https://www.youtube.com/watch?v=n4XWfwLHeLM',
    keyLyrics: 'Way maker, miracle worker, promise keeper, light in the darkness, my God, that is who You are!',
    coverImage: 'https://images.unsplash.com/photo-1519744485501-1e967a5b3ee0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'track-3',
    title: 'Olorun Agbaye (You Are Mighty)',
    artist: 'Nathaniel Bassey ft. Chandler Moore & Oba',
    originalArtist: 'Nathaniel Bassey',
    category: 'High Praise & Dance',
    duration: '7:12',
    sundayServiceTheme: 'Omnipotence & African High Praise',
    scriptureReference: 'Jeremiah 32:17 — "Ah, Lord God! There is nothing too hard for You."',
    spotifyTrackId: '4rT0l72304Z32L41S4oQ1n',
    spotifyUrl: 'https://open.spotify.com/track/4rT0l72304Z32L41S4oQ1n',
    youtubeUrl: 'https://www.youtube.com/watch?v=uC06Y3Cg2tQ',
    keyLyrics: 'Olorun Agbaye, You are mighty! What You say You will do, that is what You do. What You cannot do does not exist!',
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'track-4',
    title: 'Great Is Thy Faithfulness',
    artist: 'Living Waters Choir & Orchestra',
    originalArtist: 'Thomas Chisholm / Traditional Hymn',
    category: 'Hymns of Faith',
    duration: '4:15',
    sundayServiceTheme: 'Generations of Grace & Ancient Covenant',
    scriptureReference: 'Lamentations 3:23 — "They are new every morning; great is Your faithfulness."',
    spotifyTrackId: '1sXn70Vz5jX13eUv6qFqB7',
    spotifyUrl: 'https://open.spotify.com/track/1sXn70Vz5jX13eUv6qFqB7',
    youtubeUrl: 'https://www.youtube.com/watch?v=ErwhfZxh_jA',
    keyLyrics: 'Great is Thy faithfulness! Great is Thy faithfulness! Morning by morning new mercies I see; all I have needed Thy hand hath provided.',
    coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'track-5',
    title: 'Firm Foundation (He Won’t)',
    artist: 'Maverick City Music ft. Chandler Moore',
    originalArtist: 'Cody Carnes & Maverick City',
    category: 'Intimate Worship',
    duration: '6:18',
    sundayServiceTheme: 'Unshakable Faith in the Storm',
    scriptureReference: 'Matthew 7:24 — "He built his house on the rock."',
    spotifyTrackId: '5rVvPZ4k8rTf99Y7wP9x3z',
    spotifyUrl: 'https://open.spotify.com/track/5rVvPZ4k8rTf99Y7wP9x3z',
    youtubeUrl: 'https://www.youtube.com/watch?v=x1vL3p0Vv1A',
    keyLyrics: 'Christ is my firm foundation, the rock on which I stand! When everything around me is shaking, I’ve never been more glad that I put my faith in Jesus.',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'track-6',
    title: 'Eze Ebube (Glorious King)',
    artist: 'Neon Adejo ft. Living Waters Praise Team',
    originalArtist: 'Neon Adejo',
    category: 'High Praise & Dance',
    duration: '5:42',
    sundayServiceTheme: 'Testimonies of Exceeding Grace & Jubilation',
    scriptureReference: 'Psalm 103:2 — "Bless the Lord, O my soul, and forget not all His benefits."',
    spotifyTrackId: '2m6oFmE5b8vX7sZ3wQ9t1y',
    spotifyUrl: 'https://open.spotify.com/track/2m6oFmE5b8vX7sZ3wQ9t1y',
    youtubeUrl: 'https://www.youtube.com/watch?v=pD4JjY4K3qA',
    keyLyrics: 'Eze Ebube, see how far You’ve brought me! I am so glad You found me worthy. I can never thank You enough!',
    coverImage: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80'
  }
];

export const LATEST_BULLETIN_INFO = {
  volume: 'Vol. 28, Issue 44',
  date: 'Sunday, November 2026',
  title: 'Living Waters & Supernatural Multiplication',
  pastorMessageSnippet: 'Beloved congregation, welcome to another glorious encounter with the Living God. This Sunday, we are reminded that no matter how arid the desert appears, the Lord has dug wells of living water for your advancement. Rejoice and receive your harvest!',
  scriptureOfTheWeek: 'Isaiah 44:3 — "For I will pour water on him who is thirsty, and floods on the dry ground; I will pour My Spirit on your descendants, and My blessing on your offspring."',
  orderOfService: [
    { time: '8:00 AM / 10:15 AM', item: 'Opening Prayers & High Praise Encounter' },
    { time: '8:25 AM / 10:40 AM', item: 'Worship & Choral Ministry: Living Waters Choir' },
    { time: '8:45 AM / 11:00 AM', item: 'Pastoral Announcements & Welcoming First-Timers' },
    { time: '9:00 AM / 11:15 AM', item: 'Tithes, Offerings & Covenant Seed Sowing' },
    { time: '9:15 AM / 11:30 AM', item: 'The Ministry of the Word: Dr. Emmanuel Adeleke' },
    { time: '9:40 AM / 12:15 PM', item: 'Altar Call, Miracle Prayers & Benediction' }
  ],
  announcements: [
    'Monthly Holy Ghost Miracle Vigil takes place this coming Friday at 10:00 PM.',
    'Kingdom Champions Children’s Bible Quiz Registration is open at the reception desk.',
    'Community Food Pantry distribution continues every Tuesday at 10:00 AM.',
    'Workers in Training Class begins next Sunday at 7:15 AM.'
  ]
};

export const INITIAL_PRAYER_WALL_REQUESTS: import('../types').PublicPrayerRequest[] = [
  {
    id: 'pr-1',
    author: 'Sister Chioma A.',
    isAnonymous: false,
    city: 'Victory City',
    category: 'Healing & Health',
    title: 'Complete recovery & healing for my mother after surgery',
    details: 'Please join my family in praying for Mama as she undergoes post-operative physical therapy. We are standing on Jeremiah 30:17 for speedy tissue recovery, strength in her limbs, and zero complications.',
    scriptureAnchor: 'Jeremiah 30:17 — "For I will restore health to you and heal you of your wounds, says the Lord."',
    prayerCount: 47,
    encouragements: [
      { id: 'enc-1', author: 'Deaconess Sarah', message: 'Standing in agreement with you, Sister! By His stripes Mama is healed.', createdAt: '3h ago' },
      { id: 'enc-2', author: 'Brother Caleb', message: 'Lifting Mama up in our morning devotions. Total restoration in Jesus’ name!', createdAt: '1h ago' }
    ],
    isAnswered: false,
    createdAt: 'Today, 8:30 AM',
    urgency: 'Normal'
  },
  {
    id: 'pr-2',
    author: 'Brother David O.',
    isAnonymous: false,
    city: 'Houston, TX',
    category: 'Financial Breakthrough',
    title: 'Divine favor in final executive interview & visa clearance',
    details: 'I have my third and final interview with an international organization tomorrow morning. Also believing God for prompt work permit approval. Praying for supernatural wisdom and open doors.',
    scriptureAnchor: 'Deuteronomy 28:12 — "The Lord will open to you His good treasure, the heavens, to give the rain to your land in its season, and to bless all the work of your hand."',
    prayerCount: 62,
    encouragements: [
      { id: 'enc-3', author: 'Pastor David Adebayo', message: 'You have entered your season of open doors, Brother David. Speak with boldness!', createdAt: '2h ago' }
    ],
    isAnswered: false,
    createdAt: 'Today, 10:15 AM',
    urgency: 'Urgent'
  },
  {
    id: 'pr-3',
    author: 'Anonymous Member',
    isAnonymous: true,
    city: 'Lagos',
    category: 'Deliverance & Protection',
    title: 'Victory over chronic anxiety and sleeplessness',
    details: 'For months I have struggled with panic attacks and fearful thoughts regarding my family’s future. I crave the stillness and peace of God that surpasses all human understanding.',
    scriptureAnchor: 'Philippians 4:6-7 — "Be anxious for nothing... and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus."',
    prayerCount: 54,
    encouragements: [
      { id: 'enc-4', author: 'Sister Grace O.', message: 'You are safe under the shadow of the Almighty. The Lord is your shield and very present help.', createdAt: '4h ago' }
    ],
    isAnswered: false,
    createdAt: 'Yesterday',
    urgency: 'Normal'
  },
  {
    id: 'pr-4',
    author: 'The Adeleke Family',
    isAnonymous: false,
    city: 'Victory City',
    category: 'Family & Marriage',
    title: 'Salvation and restoration of our younger brother',
    details: 'Believing the Lord for the salvation and deliverance of our 22-year-old brother Michael who has strayed away from the faith and gotten into negative peer influences. God is drawing him home.',
    scriptureAnchor: 'Acts 16:31 — "Believe on the Lord Jesus Christ, and you will be saved, you and your household."',
    prayerCount: 78,
    encouragements: [
      { id: 'enc-5', author: 'Elder Michael Vance', message: 'No child of the covenant will be lost. Michael is coming back rejoicing!', createdAt: 'Yesterday' }
    ],
    isAnswered: false,
    createdAt: '2 days ago',
    urgency: 'Normal'
  },
  {
    id: 'pr-5',
    author: 'Sister Blessing & Brother John',
    isAnonymous: false,
    city: 'Victory City',
    category: 'Thanksgiving & Praise',
    title: 'Praise Report! Miracle Baby Samuel safely arrived after 7 years of waiting',
    details: 'After 7 long years of doctors telling us conception was medically impossible, our miracle son Samuel was born yesterday weighing 8.2 lbs! Both mother and baby are full of health and joy.',
    scriptureAnchor: '1 Samuel 1:27 — "For this child I prayed, and the Lord has granted me my petition which I asked of Him."',
    prayerCount: 112,
    encouragements: [
      { id: 'enc-6', author: 'Pastor Mrs. Grace Adeleke', message: 'Praise the Lord! What a mighty God we serve. Baby Samuel is blessed of the Lord!', createdAt: '1 day ago' },
      { id: 'enc-7', author: 'Sister Victoria K.', message: 'Hallelujah! God has wiped away tears of reproach. Big congratulations!', createdAt: '1 day ago' }
    ],
    isAnswered: true,
    answeredTestimony: 'Glory to God! The specialist was astonished during the final scan. Jesus is still in the business of performing miracles!',
    createdAt: '3 days ago',
    urgency: 'Normal'
  },
  {
    id: 'pr-6',
    author: 'Brother Emmanuel T.',
    isAnonymous: false,
    city: 'London / UK',
    category: 'Academic & Career',
    title: 'Wisdom & divine recall for Medical Board licensing exam',
    details: 'Taking my final medical licensing examination on Thursday. Praying for supernatural recall, sharpness of mind, and calm nerves during the clinical assessment.',
    scriptureAnchor: 'James 1:5 — "If any of you lacks wisdom, let him ask of God, who gives to all liberally and without reproach."',
    prayerCount: 39,
    encouragements: [],
    isAnswered: false,
    createdAt: '4 days ago',
    urgency: 'Normal'
  }
];
