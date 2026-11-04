import { BibleBook, BiblePassage, BibleTopicPlan, BibleVerseItem } from '../types';

export const BIBLE_BOOKS: BibleBook[] = [
  // OLD TESTAMENT (39 Books)
  // Law (Pentateuch)
  { id: 'genesis', name: 'Genesis', testament: 'Old', category: 'Law', chapters: 50, abbreviation: 'Gen' },
  { id: 'exodus', name: 'Exodus', testament: 'Old', category: 'Law', chapters: 40, abbreviation: 'Exod' },
  { id: 'leviticus', name: 'Leviticus', testament: 'Old', category: 'Law', chapters: 27, abbreviation: 'Lev' },
  { id: 'numbers', name: 'Numbers', testament: 'Old', category: 'Law', chapters: 36, abbreviation: 'Num' },
  { id: 'deuteronomy', name: 'Deuteronomy', testament: 'Old', category: 'Law', chapters: 34, abbreviation: 'Deut' },

  // History
  { id: 'joshua', name: 'Joshua', testament: 'Old', category: 'History', chapters: 24, abbreviation: 'Josh' },
  { id: 'judges', name: 'Judges', testament: 'Old', category: 'History', chapters: 21, abbreviation: 'Judg' },
  { id: 'ruth', name: 'Ruth', testament: 'Old', category: 'History', chapters: 4, abbreviation: 'Ruth' },
  { id: '1samuel', name: '1 Samuel', testament: 'Old', category: 'History', chapters: 31, abbreviation: '1Sam' },
  { id: '2samuel', name: '2 Samuel', testament: 'Old', category: 'History', chapters: 24, abbreviation: '2Sam' },
  { id: '1kings', name: '1 Kings', testament: 'Old', category: 'History', chapters: 22, abbreviation: '1Kgs' },
  { id: '2kings', name: '2 Kings', testament: 'Old', category: 'History', chapters: 25, abbreviation: '2Kgs' },
  { id: '1chronicles', name: '1 Chronicles', testament: 'Old', category: 'History', chapters: 29, abbreviation: '1Chr' },
  { id: '2chronicles', name: '2 Chronicles', testament: 'Old', category: 'History', chapters: 36, abbreviation: '2Chr' },
  { id: 'ezra', name: 'Ezra', testament: 'Old', category: 'History', chapters: 10, abbreviation: 'Ezra' },
  { id: 'nehemiah', name: 'Nehemiah', testament: 'Old', category: 'History', chapters: 13, abbreviation: 'Neh' },
  { id: 'esther', name: 'Esther', testament: 'Old', category: 'History', chapters: 10, abbreviation: 'Esth' },

  // Poetry & Wisdom
  { id: 'job', name: 'Job', testament: 'Old', category: 'Poetry & Wisdom', chapters: 42, abbreviation: 'Job' },
  { id: 'psalms', name: 'Psalms', testament: 'Old', category: 'Poetry & Wisdom', chapters: 150, abbreviation: 'Ps' },
  { id: 'proverbs', name: 'Proverbs', testament: 'Old', category: 'Poetry & Wisdom', chapters: 31, abbreviation: 'Prov' },
  { id: 'ecclesiastes', name: 'Ecclesiastes', testament: 'Old', category: 'Poetry & Wisdom', chapters: 12, abbreviation: 'Eccl' },
  { id: 'songofsolomon', name: 'Song of Solomon', testament: 'Old', category: 'Poetry & Wisdom', chapters: 8, abbreviation: 'Song' },

  // Major Prophets
  { id: 'isaiah', name: 'Isaiah', testament: 'Old', category: 'Major Prophets', chapters: 66, abbreviation: 'Isa' },
  { id: 'jeremiah', name: 'Jeremiah', testament: 'Old', category: 'Major Prophets', chapters: 52, abbreviation: 'Jer' },
  { id: 'lamentations', name: 'Lamentations', testament: 'Old', category: 'Major Prophets', chapters: 5, abbreviation: 'Lam' },
  { id: 'ezekiel', name: 'Ezekiel', testament: 'Old', category: 'Major Prophets', chapters: 48, abbreviation: 'Ezek' },
  { id: 'daniel', name: 'Daniel', testament: 'Old', category: 'Major Prophets', chapters: 12, abbreviation: 'Dan' },

  // Minor Prophets
  { id: 'hosea', name: 'Hosea', testament: 'Old', category: 'Minor Prophets', chapters: 14, abbreviation: 'Hos' },
  { id: 'joel', name: 'Joel', testament: 'Old', category: 'Minor Prophets', chapters: 3, abbreviation: 'Joel' },
  { id: 'amos', name: 'Amos', testament: 'Old', category: 'Minor Prophets', chapters: 9, abbreviation: 'Amos' },
  { id: 'obadiah', name: 'Obadiah', testament: 'Old', category: 'Minor Prophets', chapters: 1, abbreviation: 'Obad' },
  { id: 'jonah', name: 'Jonah', testament: 'Old', category: 'Minor Prophets', chapters: 4, abbreviation: 'Jonah' },
  { id: 'micah', name: 'Micah', testament: 'Old', category: 'Minor Prophets', chapters: 7, abbreviation: 'Mic' },
  { id: 'nahum', name: 'Nahum', testament: 'Old', category: 'Minor Prophets', chapters: 3, abbreviation: 'Nah' },
  { id: 'habakkuk', name: 'Habakkuk', testament: 'Old', category: 'Minor Prophets', chapters: 3, abbreviation: 'Hab' },
  { id: 'zephaniah', name: 'Zephaniah', testament: 'Old', category: 'Minor Prophets', chapters: 3, abbreviation: 'Zeph' },
  { id: 'haggai', name: 'Haggai', testament: 'Old', category: 'Minor Prophets', chapters: 2, abbreviation: 'Hag' },
  { id: 'zechariah', name: 'Zechariah', testament: 'Old', category: 'Minor Prophets', chapters: 14, abbreviation: 'Zech' },
  { id: 'malachi', name: 'Malachi', testament: 'Old', category: 'Minor Prophets', chapters: 4, abbreviation: 'Mal' },

  // NEW TESTAMENT (27 Books)
  // Gospels
  { id: 'matthew', name: 'Matthew', testament: 'New', category: 'Gospels', chapters: 28, abbreviation: 'Matt' },
  { id: 'mark', name: 'Mark', testament: 'New', category: 'Gospels', chapters: 16, abbreviation: 'Mark' },
  { id: 'luke', name: 'Luke', testament: 'New', category: 'Gospels', chapters: 24, abbreviation: 'Luke' },
  { id: 'john', name: 'John', testament: 'New', category: 'Gospels', chapters: 21, abbreviation: 'John' },

  // Acts
  { id: 'acts', name: 'Acts', testament: 'New', category: 'Acts', chapters: 28, abbreviation: 'Acts' },

  // Pauline Epistles
  { id: 'romans', name: 'Romans', testament: 'New', category: 'Pauline Epistles', chapters: 16, abbreviation: 'Rom' },
  { id: '1corinthians', name: '1 Corinthians', testament: 'New', category: 'Pauline Epistles', chapters: 16, abbreviation: '1Cor' },
  { id: '2corinthians', name: '2 Corinthians', testament: 'New', category: 'Pauline Epistles', chapters: 13, abbreviation: '2Cor' },
  { id: 'galatians', name: 'Galatians', testament: 'New', category: 'Pauline Epistles', chapters: 6, abbreviation: 'Gal' },
  { id: 'ephesians', name: 'Ephesians', testament: 'New', category: 'Pauline Epistles', chapters: 6, abbreviation: 'Eph' },
  { id: 'philippians', name: 'Philippians', testament: 'New', category: 'Pauline Epistles', chapters: 4, abbreviation: 'Phil' },
  { id: 'colossians', name: 'Colossians', testament: 'New', category: 'Pauline Epistles', chapters: 4, abbreviation: 'Col' },
  { id: '1thessalonians', name: '1 Thessalonians', testament: 'New', category: 'Pauline Epistles', chapters: 5, abbreviation: '1Thess' },
  { id: '2thessalonians', name: '2 Thessalonians', testament: 'New', category: 'Pauline Epistles', chapters: 3, abbreviation: '2Thess' },
  { id: '1timothy', name: '1 Timothy', testament: 'New', category: 'Pauline Epistles', chapters: 6, abbreviation: '1Tim' },
  { id: '2timothy', name: '2 Timothy', testament: 'New', category: 'Pauline Epistles', chapters: 4, abbreviation: '2Tim' },
  { id: 'titus', name: 'Titus', testament: 'New', category: 'Pauline Epistles', chapters: 3, abbreviation: 'Titus' },
  { id: 'philemon', name: 'Philemon', testament: 'New', category: 'Pauline Epistles', chapters: 1, abbreviation: 'Phlm' },

  // General Epistles
  { id: 'hebrews', name: 'Hebrews', testament: 'New', category: 'General Epistles', chapters: 13, abbreviation: 'Heb' },
  { id: 'james', name: 'James', testament: 'New', category: 'General Epistles', chapters: 5, abbreviation: 'Jas' },
  { id: '1peter', name: '1 Peter', testament: 'New', category: 'General Epistles', chapters: 5, abbreviation: '1Pet' },
  { id: '2peter', name: '2 Peter', testament: 'New', category: 'General Epistles', chapters: 3, abbreviation: '2Pet' },
  { id: '1john', name: '1 John', testament: 'New', category: 'General Epistles', chapters: 5, abbreviation: '1John' },
  { id: '2john', name: '2 John', testament: 'New', category: 'General Epistles', chapters: 1, abbreviation: '2John' },
  { id: '3john', name: '3 John', testament: 'New', category: 'General Epistles', chapters: 1, abbreviation: '3John' },
  { id: 'jude', name: 'Jude', testament: 'New', category: 'General Epistles', chapters: 1, abbreviation: 'Jude' },

  // Prophecy
  { id: 'revelation', name: 'Revelation', testament: 'New', category: 'Prophecy', chapters: 22, abbreviation: 'Rev' }
];

export interface CuratedPassageRecord {
  book: string;
  chapter: number;
  title: string;
  pastoralReflection: string;
  verses: BibleVerseItem[];
}

export const CURATED_PASSAGES: CuratedPassageRecord[] = [
  {
    book: 'John',
    chapter: 3,
    title: 'The New Birth and God’s Unfailing Love',
    pastoralReflection: 'Jesus teaches Nicodemus that salvation is not attained by religious pedigree, but received through spiritual rebirth. The living water of the Holy Spirit breathes new life into every heart that believes.',
    verses: [
      { verse: 1, text: 'There was a man of the Pharisees named Nicodemus, a ruler of the Jews.' },
      { verse: 2, text: 'This man came to Jesus by night and said to Him, "Rabbi, we know that You are a teacher come from God; for no one can do these signs that You do unless God is with him."' },
      { verse: 3, text: 'Jesus answered and said to him, "Most assuredly, I say to you, unless one is born again, he cannot see the kingdom of God."' },
      { verse: 4, text: 'Nicodemus said to Him, "How can a man be born when he is old? Can he enter a second time into his mother’s womb and be born?"' },
      { verse: 5, text: 'Jesus answered, "Most assuredly, I say to you, unless one is born of water and the Spirit, he cannot enter the kingdom of God."' },
      { verse: 6, text: 'That which is born of the flesh is flesh, and that which is born of the Spirit is spirit.' },
      { verse: 7, text: 'Do not marvel that I said to you, ‘You must be born again.’' },
      { verse: 8, text: 'The wind blows where it wishes, and you hear the sound of it, but cannot tell where it comes from and where it goes. So is everyone who is born of the Spirit.' },
      { verse: 14, text: 'And as Moses lifted up the serpent in the wilderness, even so must the Son of Man be lifted up,' },
      { verse: 15, text: 'that whoever believes in Him should not perish but have eternal life.' },
      { verse: 16, text: 'For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.' },
      { verse: 17, text: 'For God did not send His Son into the world to condemn the world, but that the world through Him might be saved.' },
      { verse: 18, text: 'He who believes in Him is not condemned; but he who does not believe is condemned already, because he has not believed in the name of the only begotten Son of God.' },
      { verse: 19, text: 'And this is the condemnation, that the light has come into the world, and men loved darkness rather than light, because their deeds were evil.' },
      { verse: 20, text: 'For everyone practicing evil hates the light and does not come to the light, lest his deeds should be exposed.' },
      { verse: 21, text: 'But he who does the truth comes to the light, that his deeds may be clearly seen, that they have been done in God.' }
    ]
  },
  {
    book: 'John',
    chapter: 4,
    title: 'The Woman at the Well & The Fountain of Living Waters',
    pastoralReflection: 'Our foundational church scripture! In verse 14, Christ promises that whoever drinks of His water will never thirst again. In Him, we become a springing well of everlasting joy and divine transformation.',
    verses: [
      { verse: 7, text: 'A woman of Samaria came to draw water. Jesus said to her, "Give Me a drink."' },
      { verse: 9, text: 'Then the woman of Samaria said to Him, "How is it that You, being a Jew, ask a drink from me, a Samaritan woman?" For Jews have no dealings with Samaritans.' },
      { verse: 10, text: 'Jesus answered and said to her, "If you knew the gift of God, and who it is who says to you, ‘Give Me a drink,’ you would have asked Him, and He would have given you living water."' },
      { verse: 11, text: 'The woman said to Him, "Sir, You have nothing to draw with, and the well is deep. Where then do You get that living water?"' },
      { verse: 13, text: 'Jesus answered and said to her, "Whoever drinks of this water will thirst again,' },
      { verse: 14, text: 'but whoever drinks of the water that I shall give him will never thirst. But the water that I shall give him will become in him a fountain of water springing up into everlasting life."' },
      { verse: 23, text: 'But the hour is coming, and now is, when the true worshipers will worship the Father in spirit and truth; for the Father is seeking such to worship Him.' },
      { verse: 24, text: 'God is Spirit, and those who worship Him must worship in spirit and truth."' }
    ]
  },
  {
    book: 'Psalms',
    chapter: 23,
    title: 'The Divine Shepherd and Abundant Provision',
    pastoralReflection: 'David’s anthem of unshakeable trust. Because the Lord is our Shepherd, lack is eliminated, soul-rest is assured, guidance in righteousness is guaranteed, and overflowing goodness pursues us all our days.',
    verses: [
      { verse: 1, text: 'The Lord is my shepherd; I shall not want.' },
      { verse: 2, text: 'He makes me to lie down in green pastures; He leads me beside the still waters.' },
      { verse: 3, text: 'He restores my soul; He leads me in the paths of righteousness for His name’s sake.' },
      { verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil; For You are with me; Your rod and Your staff, they comfort me.' },
      { verse: 5, text: 'You prepare a table before me in the presence of my enemies; You anoint my head with oil; My cup runs over.' },
      { verse: 6, text: 'Surely goodness and mercy shall follow me all the days of my life; And I will dwell in the house of the Lord forever.' }
    ]
  },
  {
    book: 'Psalms',
    chapter: 91,
    title: 'The Secret Place of Supernatural Protection',
    pastoralReflection: 'The covenant canopy of the Almighty. When you abide under the shadow of the Most High, no arrow by day nor pestilence in darkness can overtake you. His angels hold charge over every step.',
    verses: [
      { verse: 1, text: 'He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty.' },
      { verse: 2, text: 'I will say of the Lord, "He is my refuge and my fortress; My God, in Him I will trust."' },
      { verse: 3, text: 'Surely He shall deliver you from the snare of the fowler and from the perilous pestilence.' },
      { verse: 4, text: 'He shall cover you with His feathers, and under His wings you shall take refuge; His truth shall be your shield and buckler.' },
      { verse: 5, text: 'You shall not be afraid of the terror by night, nor of the arrow that flies by day,' },
      { verse: 7, text: 'A thousand may fall at your side, and ten thousand at your right hand; But it shall not come near you.' },
      { verse: 10, text: 'No evil shall befall you, nor shall any plague come near your dwelling;' },
      { verse: 11, text: 'For He shall give His angels charge over you, to keep you in all your ways.' },
      { verse: 14, text: '"Because he has set his love upon Me, therefore I will deliver him; I will set him on high, because he has known My name.' },
      { verse: 15, text: 'He shall call upon Me, and I will answer him; I will be with him in trouble; I will deliver him and honor him.' },
      { verse: 16, text: 'With long life I will satisfy him, and show him My salvation."' }
    ]
  },
  {
    book: 'Romans',
    chapter: 8,
    title: 'Life in the Spirit and Unbreakable Victory',
    pastoralReflection: 'A peak chapter of the New Testament. No condemnation for those in Christ Jesus; the Holy Spirit makes intercession for us; God causes all things to work together for our good; and nothing can separate us from His love.',
    verses: [
      { verse: 1, text: 'There is therefore now no condemnation to those who are in Christ Jesus, who do not walk according to the flesh, but according to the Spirit.' },
      { verse: 2, text: 'For the law of the Spirit of life in Christ Jesus has made me free from the law of sin and death.' },
      { verse: 11, text: 'But if the Spirit of Him who raised Jesus from the dead dwells in you, He who raised Christ from the dead will also give life to your mortal bodies through His Spirit who dwells in you.' },
      { verse: 14, text: 'For as many as are led by the Spirit of God, these are sons of God.' },
      { verse: 16, text: 'The Spirit Himself bears witness with our spirit that we are children of God,' },
      { verse: 17, text: 'and if children, then heirs—heirs of God and joint heirs with Christ, if indeed we suffer with Him, that we may also be glorified together.' },
      { verse: 18, text: 'For I consider that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us.' },
      { verse: 26, text: 'Likewise the Spirit also helps in our weaknesses. For we do not know what we should pray for as we ought, but the Spirit Himself makes intercession for us with groanings which cannot be uttered.' },
      { verse: 28, text: 'And we know that all things work together for good to those who love God, to those who are the called according to His purpose.' },
      { verse: 31, text: 'What then shall we say to these things? If God is for us, who can be against us?' },
      { verse: 32, text: 'He who did not spare His own Son, but delivered Him up for us all, how shall He not with Him also freely give us all things?' },
      { verse: 37, text: 'Yet in all these things we are more than conquerors through Him who loved us.' },
      { verse: 38, text: 'For I am persuaded that neither death nor life, nor angels nor principalities nor powers, nor things present nor things to come,' },
      { verse: 39, text: 'nor height nor depth, nor any other created thing, shall be able to separate us from the love of God which is in Christ Jesus our Lord.' }
    ]
  },
  {
    book: 'Isaiah',
    chapter: 40,
    title: 'The Greatness of God and Renewal of the Weary',
    pastoralReflection: 'When human strength falters, God’s everlasting power stands undefeated. Waiting upon the Lord is an active posture of faith that exchanges human weakness for divine soaring.',
    verses: [
      { verse: 28, text: 'Have you not known? Have you not heard? The everlasting God, the Lord, the Creator of the ends of the earth, neither faints nor is weary. His understanding is unsearchable.' },
      { verse: 29, text: 'He gives power to the weak, and to those who have no might He increases strength.' },
      { verse: 30, text: 'Even the youths shall faint and be weary, and the young men shall utterly fall,' },
      { verse: 31, text: 'but those who wait on the Lord shall renew their strength; they shall mount up with wings like eagles, they shall run and not be weary, they shall walk and not faint.' }
    ]
  },
  {
    book: '1 Corinthians',
    chapter: 13,
    title: 'The Supremacy of Divine Love (Agape)',
    pastoralReflection: 'Spiritual gifts, eloquent words, and sacrifices mean nothing without genuine Christian love. Love is patient, kind, never fails, and stands as the greatest eternal virtue in the believer’s walk.',
    verses: [
      { verse: 1, text: 'Though I speak with the tongues of men and of angels, but have not love, I have become sounding brass or a clanging cymbal.' },
      { verse: 2, text: 'And though I have the gift of prophecy, and understand all mysteries and all knowledge, and though I have all faith, so that I could remove mountains, but have not love, I am nothing.' },
      { verse: 4, text: 'Love suffers long and is kind; love does not envy; love does not parade itself, is not puffed up;' },
      { verse: 5, text: 'does not behave rudely, does not seek its own, is not provoked, thinks no evil;' },
      { verse: 6, text: 'does not rejoice in iniquity, but rejoices in the truth;' },
      { verse: 7, text: 'bears all things, believes all things, hopes all things, endures all things.' },
      { verse: 8, text: 'Love never fails. But whether there are prophecies, they will fail; whether there are tongues, they will cease; whether there is knowledge, it will vanish away.' },
      { verse: 13, text: 'And now abide faith, hope, love, these three; but the greatest of these is love.' }
    ]
  },
  {
    book: 'Hebrews',
    chapter: 11,
    title: 'The Hall of Faith and Supernatural Substance',
    pastoralReflection: 'Faith is not a wishful thought; it is the tangible evidence of unseen realities. Without faith it is impossible to please God, but with faith, ordinary people see kingdoms subdued and promises received.',
    verses: [
      { verse: 1, text: 'Now faith is the substance of things hoped for, the evidence of things not seen.' },
      { verse: 2, text: 'For by it the elders obtained a good testimony.' },
      { verse: 3, text: 'By faith we understand that the worlds were framed by the word of God, so that the things which are seen were not made of things which are visible.' },
      { verse: 6, text: 'But without faith it is impossible to please Him, for he who comes to God must believe that He is, and that He is a rewarder of those who diligently seek Him.' }
    ]
  },
  {
    book: 'Ephesians',
    chapter: 6,
    title: 'The Whole Armor of God and Spiritual Dominion',
    pastoralReflection: 'We wrestle not against flesh and blood, but against spiritual wickedness. Paul equips every believer with the belt of truth, breastplate of righteousness, shield of faith, helmet of salvation, and the sword of the Spirit.',
    verses: [
      { verse: 10, text: 'Finally, my brethren, be strong in the Lord and in the power of His might.' },
      { verse: 11, text: 'Put on the whole armor of God, that you may be able to stand against the wiles of the devil.' },
      { verse: 12, text: 'For we do not wrestle against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this age, against spiritual hosts of wickedness in the heavenly places.' },
      { verse: 13, text: 'Therefore take up the whole armor of God, that you may be able to withstand in the evil day, and having done all, to stand.' },
      { verse: 14, text: 'Stand therefore, having girded your waist with truth, having put on the breastplate of righteousness,' },
      { verse: 15, text: 'and having shod your feet with the preparation of the gospel of peace;' },
      { verse: 16, text: 'above all, taking the shield of faith with which you will be able to quench all the fiery darts of the wicked one.' },
      { verse: 17, text: 'And take the helmet of salvation, and the sword of the Spirit, which is the word of God;' },
      { verse: 18, text: 'praying always with all prayer and supplication in the Spirit, being watchful to this end with all perseverance and supplication for all the saints.' }
    ]
  },
  {
    book: 'Philippians',
    chapter: 4,
    title: 'Peace That Surpasses Understanding & Kingdom Supply',
    pastoralReflection: 'Anxiety is arrested through thankful prayer. When we set our minds on virtue, God’s peace garrisons our hearts, and He supplies all our needs according to His riches in glory by Christ Jesus.',
    verses: [
      { verse: 4, text: 'Rejoice in the Lord always. Again I will say, rejoice!' },
      { verse: 6, text: 'Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God;' },
      { verse: 7, text: 'and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus.' },
      { verse: 8, text: 'Finally, brethren, whatever things are true, whatever things are noble, whatever things are just, whatever things are pure, whatever things are lovely, whatever things are of good report, if there is any virtue and if there is anything praiseworthy—meditate on these things.' },
      { verse: 13, text: 'I can do all things through Christ who strengthens me.' },
      { verse: 19, text: 'And my God shall supply all your need according to His riches in glory by Christ Jesus.' }
    ]
  },
  {
    book: 'Isaiah',
    chapter: 53,
    title: 'The Suffering Servant and Divine Healing',
    pastoralReflection: 'Prophesied 700 years before Calvary, Isaiah reveals Christ bearing our griefs, carrying our sorrows, and taking the chastisement for our peace. By His stripes, we are completely healed.',
    verses: [
      { verse: 3, text: 'He is despised and rejected by men, A Man of sorrows and acquainted with grief. And we hid, as it were, our faces from Him; He was despised, and we did not esteem Him.' },
      { verse: 4, text: 'Surely He has borne our griefs and carried our sorrows; yet we esteemed Him stricken, smitten by God, and afflicted.' },
      { verse: 5, text: 'But He was wounded for our transgressions, He was bruised for our iniquities; The chastisement for our peace was upon Him, and by His stripes we are healed.' },
      { verse: 6, text: 'All we like sheep have gone astray; We have turned, every one, to his own way; And the Lord has laid on Him the iniquity of us all.' }
    ]
  },
  {
    book: 'Matthew',
    chapter: 5,
    title: 'The Sermon on the Mount: The Beatitudes & Salt of the Earth',
    pastoralReflection: 'The manifesto of the Kingdom of Heaven spoken by Christ upon the mountain. Here Jesus defines true blessedness, humility of spirit, hunger for righteousness, and the calling of believers to illuminate the dark world.',
    verses: [
      { verse: 1, text: 'And seeing the multitudes, He went up on a mountain, and when He was seated His disciples came to Him.' },
      { verse: 2, text: 'Then He opened His mouth and taught them, saying:' },
      { verse: 3, text: '"Blessed are the poor in spirit, for theirs is the kingdom of heaven.' },
      { verse: 4, text: 'Blessed are those who mourn, for they shall be comforted.' },
      { verse: 5, text: 'Blessed are the meek, for they shall inherit the earth.' },
      { verse: 6, text: 'Blessed are those who hunger and thirst for righteousness, for they shall be filled.' },
      { verse: 7, text: 'Blessed are the merciful, for they shall obtain mercy.' },
      { verse: 8, text: 'Blessed are the pure in heart, for they shall see God.' },
      { verse: 9, text: 'Blessed are the peacemakers, for they shall be called sons of God.' },
      { verse: 13, text: '"You are the salt of the earth; but if the salt loses its flavor, how shall it be seasoned? It is then good for nothing but to be thrown out and trampled underfoot by men.' },
      { verse: 14, text: '"You are the light of the world. A city that is set on a hill cannot be hidden.' },
      { verse: 16, text: 'Let your light so shine before men, that they may see your good works and glorify your Father in heaven."' }
    ]
  },
  {
    book: 'Genesis',
    chapter: 1,
    title: 'The Beginning of Creation and the Spirit Hovering',
    pastoralReflection: 'God speaks light and order into formless chaos. When the Spirit of God hovers, the spoken Word brings beauty, dominion, and life. Whatever looks chaotic in your life today will obey God’s Word.',
    verses: [
      { verse: 1, text: 'In the beginning God created the heavens and the earth.' },
      { verse: 2, text: 'The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.' },
      { verse: 3, text: 'Then God said, "Let there be light"; and there was light.' },
      { verse: 4, text: 'And God saw the light, that it was good; and God divided the light from the darkness.' },
      { verse: 26, text: 'Then God said, "Let Us make man in Our image, according to Our likeness; let them have dominion over the fish of the sea, over the birds of the air, and over the cattle, over all the earth."' },
      { verse: 27, text: 'So God created man in His own image; in the image of God He created him; male and female He created them.' }
    ]
  },
  {
    book: 'Revelation',
    chapter: 22,
    title: 'The River of Life and the Blessed Hope',
    pastoralReflection: 'The culmination of all redemptive history! John sees the crystal river of water of life proceeding from the throne of God. The Spirit and the Bride say, "Come! And let him who thirsts come and drink freely."',
    verses: [
      { verse: 1, text: 'And he showed me a pure river of water of life, clear as crystal, proceeding from the throne of God and of the Lamb.' },
      { verse: 2, text: 'In the middle of its street, and on either side of the river, was the tree of life, which bore twelve fruits, each tree yielding its fruit every month. The leaves of the tree were for the healing of the nations.' },
      { verse: 3, text: 'And there shall be no more curse, but the throne of God and of the Lamb shall be in it, and His servants shall serve Him.' },
      { verse: 4, text: 'They shall see His face, and His name shall be on their foreheads.' },
      { verse: 7, text: '"Behold, I am coming quickly! Blessed is he who keeps the words of the prophecy of this book."' },
      { verse: 17, text: 'And the Spirit and the bride say, "Come!" And let him who hears say, "Come!" And let him who thirsts come. Whoever desires, let him take the water of life freely.' }
    ]
  }
];

export const BIBLE_TOPIC_PLANS: BibleTopicPlan[] = [
  {
    id: 'living-waters',
    title: 'Living Waters & Holy Spirit',
    theme: 'Fountain of Life Foundation',
    description: 'Encounter the refreshing, transformative springs of God’s Spirit flowing in and through your life.',
    iconName: 'Droplets',
    verses: [
      { reference: 'John 4:14', text: 'Whoever drinks of the water that I shall give him will never thirst; but the water that I shall give him will become in him a fountain of water springing up into everlasting life.', keyMessage: 'Christ is your eternal well of life and spiritual vitality.' },
      { reference: 'John 7:37-38', text: 'On the last day, that great day of the feast, Jesus stood and cried out, saying, "If anyone thirsts, let him come to Me and drink. He who believes in Me, out of his heart will flow rivers of living water."', keyMessage: 'Rivers of power and peace flow from a believer filled with the Spirit.' },
      { reference: 'Isaiah 12:3', text: 'Therefore with joy you will draw water from the wells of salvation.', keyMessage: 'Joy is the bucket with which we draw divine virtue.' },
      { reference: 'Ezekiel 47:9', text: 'And it shall be that every living thing that moves, wherever the rivers go, will live. There will be a very great multitude of fish, because these waters go there; for they will be healed.', keyMessage: 'Wherever God’s river touches, healing and supernatural fertility blossom.' }
    ]
  },
  {
    id: 'divine-healing',
    title: 'Divine Healing & Wholeness',
    theme: 'The Covenant of Health',
    description: 'Stand upon God’s unchanging promise of physical healing, emotional restoration, and vital longevity.',
    iconName: 'HeartPulse',
    verses: [
      { reference: 'Isaiah 53:5', text: 'He was wounded for our transgressions, He was bruised for our iniquities; the chastisement for our peace was upon Him, and by His stripes we are healed.', keyMessage: 'Healing is paid in full at the Cross.' },
      { reference: '1 Peter 2:24', text: 'Who Himself bore our sins in His own body on the tree, that we, having died to sins, might live for righteousness—by whose stripes you were healed.', keyMessage: 'Your healing is already accomplished in the realm of the Spirit.' },
      { reference: 'Psalm 103:2-3', text: 'Bless the Lord, O my soul, and forget not all His benefits: Who forgives all your iniquities, who heals all your diseases.', keyMessage: 'God’s covenant benefits include total forgiveness and total healing.' },
      { reference: 'Jeremiah 30:17', text: 'For I will restore health to you and heal you of your wounds, says the Lord.', keyMessage: 'God specializes in restoring what doctors consider impossible.' }
    ]
  },
  {
    id: 'faith-breakthrough',
    title: 'Supernatural Faith & Mountains Moving',
    theme: 'Walking by Faith',
    description: 'Ignite mountain-moving faith through the hearing of God’s Word and bold covenant declarations.',
    iconName: 'Zap',
    verses: [
      { reference: 'Hebrews 11:1', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.', keyMessage: 'Faith is legal title deed in the spiritual world.' },
      { reference: 'Mark 11:23-24', text: 'For assuredly, I say to you, whoever says to this mountain, ‘Be removed and be cast into the sea,’ and does not doubt in his heart, but believes that those things he says will be done, he will have whatever he says.', keyMessage: 'Speak the Word of God boldly to obstacles in your pathway.' },
      { reference: 'Romans 10:17', text: 'So then faith comes by hearing, and hearing by the word of God.', keyMessage: 'Feed your faith continuously with scripture and sermons.' },
      { reference: '2 Corinthians 5:7', text: 'For we walk by faith, not by sight.', keyMessage: 'Spiritual reality always outlasts physical circumstances.' }
    ]
  },
  {
    id: 'peace-comfort',
    title: 'Peace in Life’s Storms',
    theme: 'Divine Calm & Protection',
    description: 'Quiet anxiety, overcome fear, and rest in the supernatural peace of Jesus Christ.',
    iconName: 'Shield',
    verses: [
      { reference: 'Philippians 4:6-7', text: 'Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts.', keyMessage: 'Hand every care to God and receive His protective peace.' },
      { reference: 'John 14:27', text: 'Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled, neither let it be afraid.', keyMessage: 'Christ’s peace is an anchor unshakeable by worldly trouble.' },
      { reference: 'Psalm 46:1-2', text: 'God is our refuge and strength, a very present help in trouble. Therefore we will not fear, even though the earth be removed.', keyMessage: 'God is closer than any crisis you will ever encounter.' },
      { reference: 'Isaiah 26:3', text: 'You will keep him in perfect peace, whose mind is stayed on You, because he trusts in You.', keyMessage: 'Fix your meditation upon God’s faithfulness, not the problem.' }
    ]
  },
  {
    id: 'covenant-provision',
    title: 'Covenant Provision & Prosperity',
    theme: 'Kingdom Abundance',
    description: 'Discover the biblical laws of seedtime, harvest, faithful stewardship, and divine overflow.',
    iconName: 'Sparkles',
    verses: [
      { reference: 'Philippians 4:19', text: 'And my God shall supply all your need according to His riches in glory by Christ Jesus.', keyMessage: 'Your supply comes from heaven’s treasury, not earthly economies.' },
      { reference: 'Malachi 3:10', text: 'Bring all the tithes into the storehouse... and try Me now in this, says the Lord of hosts, if I will not open for you the windows of heaven and pour out for you such blessing that there will not be room enough to receive it.', keyMessage: 'Tithing unlocks open-heaven favor and rebukes the devourer.' },
      { reference: '2 Corinthians 9:8', text: 'And God is able to make all grace abound toward you, that you, always having all sufficiency in all things, may have an abundance for every good work.', keyMessage: 'God blesses you so you can become a channel of kingdom impact.' },
      { reference: 'Deuteronomy 8:18', text: 'And you shall remember the Lord your God, for it is He who gives you power to get wealth, that He may establish His covenant.', keyMessage: 'God grants divine ideas, favor, and power to build godly prosperity.' }
    ]
  }
];

/**
 * Normalizes book names and abbreviations
 */
export function normalizeBookName(input: string): string {
  const clean = input.trim().toLowerCase().replace(/\s+/g, '');

  const bookMap: Record<string, string> = {
    // OT
    gen: 'Genesis', genesis: 'Genesis',
    ex: 'Exodus', exod: 'Exodus', exodus: 'Exodus',
    lev: 'Leviticus', leviticus: 'Leviticus',
    num: 'Numbers', numbers: 'Numbers',
    deut: 'Deuteronomy', dt: 'Deuteronomy', deuteronomy: 'Deuteronomy',
    josh: 'Joshua', joshua: 'Joshua',
    judg: 'Judges', jdgs: 'Judges', judges: 'Judges',
    ruth: 'Ruth',
    '1sam': '1 Samuel', '1samuel': '1 Samuel', '1s': '1 Samuel',
    '2sam': '2 Samuel', '2samuel': '2 Samuel', '2s': '2 Samuel',
    '1kgs': '1 Kings', '1kings': '1 Kings', '1k': '1 Kings',
    '2kgs': '2 Kings', '2kings': '2 Kings', '2k': '2 Kings',
    '1chr': '1 Chronicles', '1chronicles': '1 Chronicles',
    '2chr': '2 Chronicles', '2chronicles': '2 Chronicles',
    ezra: 'Ezra',
    neh: 'Nehemiah', nehemiah: 'Nehemiah',
    esth: 'Esther', esther: 'Esther',
    job: 'Job',
    ps: 'Psalms', psalm: 'Psalms', psalms: 'Psalms',
    prov: 'Proverbs', proverbs: 'Proverbs',
    eccl: 'Ecclesiastes', ecclesiastes: 'Ecclesiastes',
    song: 'Song of Solomon', songofsolomon: 'Song of Solomon', canticles: 'Song of Solomon',
    isa: 'Isaiah', isaiah: 'Isaiah',
    jer: 'Jeremiah', jeremiah: 'Jeremiah',
    lam: 'Lamentations', lamentations: 'Lamentations',
    ezek: 'Ezekiel', ezekiel: 'Ezekiel',
    dan: 'Daniel', daniel: 'Daniel',
    hos: 'Hosea', hosea: 'Hosea',
    joel: 'Joel',
    amos: 'Amos',
    obad: 'Obadiah', obadiah: 'Obadiah',
    jonah: 'Jonah',
    mic: 'Micah', micah: 'Micah',
    nah: 'Nahum', nahum: 'Nahum',
    hab: 'Habakkuk', habakkuk: 'Habakkuk',
    zeph: 'Zephaniah', zephaniah: 'Zephaniah',
    hag: 'Haggai', haggai: 'Haggai',
    zech: 'Zechariah', zechariah: 'Zechariah',
    mal: 'Malachi', malachi: 'Malachi',

    // NT
    matt: 'Matthew', matthew: 'Matthew', mt: 'Matthew',
    mark: 'Mark', mk: 'Mark',
    luke: 'Luke', lk: 'Luke',
    john: 'John', jn: 'John',
    acts: 'Acts',
    rom: 'Romans', romans: 'Romans',
    '1cor': '1 Corinthians', '1corinthians': '1 Corinthians',
    '2cor': '2 Corinthians', '2corinthians': '2 Corinthians',
    gal: 'Galatians', galatians: 'Galatians',
    eph: 'Ephesians', ephesians: 'Ephesians',
    phil: 'Philippians', philippians: 'Philippians',
    col: 'Colossians', colossians: 'Colossians',
    '1thess': '1 Thessalonians', '1thessalonians': '1 Thessalonians',
    '2thess': '2 Thessalonians', '2thessalonians': '2 Thessalonians',
    '1tim': '1 Timothy', '1timothy': '1 Timothy',
    '2tim': '2 Timothy', '2timothy': '2 Timothy',
    titus: 'Titus',
    phlm: 'Philemon', philemon: 'Philemon',
    heb: 'Hebrews', hebrews: 'Hebrews',
    jas: 'James', james: 'James',
    '1pet': '1 Peter', '1peter': '1 Peter',
    '2pet': '2 Peter', '2peter': '2 Peter',
    '1jn': '1 John', '1john': '1 John',
    '2jn': '2 John', '2john': '2 John',
    '3jn': '3 John', '3john': '3 John',
    jude: 'Jude',
    rev: 'Revelation', revelation: 'Revelation', apocalypse: 'Revelation'
  };

  return bookMap[clean] || input;
}

export interface ParsedReference {
  book: string;
  chapter: number;
  startVerse?: number;
  endVerse?: number;
  formattedReference: string;
}

/**
 * Parses user scripture queries like "John 3:16", "Psalm 23", "Romans 8:28-39"
 */
export function parseBibleReference(rawInput: string): ParsedReference | null {
  if (!rawInput || typeof rawInput !== 'string') return null;

  const trimmed = rawInput.trim();
  // Regex handles e.g.: "1 Corinthians 13:4-8", "John 3:16", "Psalm 23", "Gen 1:1"
  const regex = /^(\d?\s*[a-zA-Z\s]+?)\s*(\d+)(?::(\d+)(?:-(\d+))?)?$/;
  const match = trimmed.match(regex);

  if (!match) {
    // If user just typed book name (e.g. "Romans"), default to chapter 1
    const normalized = normalizeBookName(trimmed);
    const foundBook = BIBLE_BOOKS.find(b => b.name.toLowerCase() === normalized.toLowerCase());
    if (foundBook) {
      return {
        book: foundBook.name,
        chapter: 1,
        formattedReference: `${foundBook.name} 1`
      };
    }
    return null;
  }

  const rawBook = match[1].trim();
  const chapter = parseInt(match[2], 10);
  const startVerse = match[3] ? parseInt(match[3], 10) : undefined;
  const endVerse = match[4] ? parseInt(match[4], 10) : undefined;

  const normalizedBook = normalizeBookName(rawBook);

  let formatted = `${normalizedBook} ${chapter}`;
  if (startVerse !== undefined) {
    formatted += `:${startVerse}`;
    if (endVerse !== undefined) {
      formatted += `-${endVerse}`;
    }
  }

  return {
    book: normalizedBook,
    chapter,
    startVerse,
    endVerse,
    formattedReference: formatted
  };
}

/**
 * Searches local curated passages and returns filtered verses
 */
export function getPassageLocally(
  bookName: string,
  chapter: number,
  startVerse?: number,
  endVerse?: number,
  translation = 'NKJV'
): BiblePassage | null {
  const normBook = normalizeBookName(bookName);
  const record = CURATED_PASSAGES.find(
    p => p.book.toLowerCase() === normBook.toLowerCase() && p.chapter === chapter
  );

  if (!record) return null;

  let filteredVerses = record.verses;
  if (startVerse !== undefined) {
    if (endVerse !== undefined) {
      filteredVerses = filteredVerses.filter(v => v.verse >= startVerse && v.verse <= endVerse);
    } else {
      filteredVerses = filteredVerses.filter(v => v.verse === startVerse);
    }
  }

  let ref = `${record.book} ${chapter}`;
  if (startVerse !== undefined) {
    ref += `:${startVerse}`;
    if (endVerse !== undefined) ref += `-${endVerse}`;
  }

  return {
    reference: ref,
    book: record.book,
    chapter,
    startVerse,
    endVerse,
    translation,
    verses: filteredVerses,
    title: record.title,
    pastoralReflection: record.pastoralReflection
  };
}
