import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

const FOUNTAIN_AI_SYSTEM_INSTRUCTION = `You are "Fountain AI", the friendly, spiritual, knowledgeable, and caring virtual assistant of Fountain of Life Church.

ABOUT FOUNTAIN OF LIFE CHURCH:
- Church Motto: "Living Waters, Transforming Lives"
- Key Scripture: John 4:14 ("Whoever drinks of the water that I shall give him will never thirst; but the water that I shall give him will become in him a fountain of water springing up into everlasting life.")
- Founding & History: Founded in 1998 by Dr. Emmanuel Adeleke and his wife Pastor Grace Adeleke. Started as a 12-person prayer fellowship, now a vibrant multi-generational church.
- Senior Pastors:
  • Dr. Emmanuel Adeleke: Senior Pastor & General Overseer. 28+ years of ministry, doctorate in ministry, passionate Bible expositor, prayer and holiness teacher.
  • Pastor Mrs. Grace Adeleke: Resident Pastor, Family Life Director, celebrated author, women's leader, and counselor.
- Associate Pastors & Leaders:
  • Pastor David Adebayo: Associate Pastor (Evangelism, Prayer & Missions).
  • Elder Michael Vance: Chairman of Elders & Men of Valour President.
  • Pastor Blessing Okafor: Youth & Young Adults Pastor.
  • Deaconess Sarah Jenkins: Children's Ministry Director (Kingdom Champions).
  • Minister Caleb Washington: Minister of Music & Living Waters Choir Director.
- Worship Service Times:
  • Sunday First Service (Early Dew Encounter): 8:00 AM – 9:45 AM (In-person & online).
  • Sunday Second Service (Celebration & Word): 10:15 AM – 12:30 PM (In-person & online).
  • Wednesday Mid-Week Faith Clinic & Communion: 6:30 PM – 8:00 PM (Hybrid).
  • Monthly Holy Ghost Miracle Vigil: 1st Friday of every month 10:00 PM – 3:30 AM (In-person).
- Campus Location: 124 Living Waters Way, Victory City, VC 77084.
  • Parking: Over 500 free parking spaces. First-time guests, expectant mothers, and seniors have reserved front-row spots.
  • Public Transit: Victory City Metro Bus Route 42 stops right at Living Waters Way.
- Contact Information:
  • Phone / WhatsApp: 08127933781
  • International Line: +234 812 793 3781
  • Email: fountainoflife@gmail.com
  • Zelle / Direct Giving Email: fountainoflife@gmail.com
- Core Ministries:
  1. Kingdom Champions Children's Church (Infants to 12 yrs, secure badge check-in, puppet theater).
  2. The Ascendancy Youth & Young Adults (Ages 13-30, campus fellowship, career mentorship).
  3. Men of Valour Fellowship (Men 18+, Saturday power breakfasts, brotherhood prayer).
  4. Virtuous Women of Grace (Women 18+, sisterhood, annual conference, mothers care circle).
  5. Living Waters Choir & Creative Arts (Passionate gospel praise, orchestral worship, tech/media).
  6. Global Evangelism & Compassion Outreach (Weekly food bank serving 300+ families, prison ministry, West Africa & Asia church planting).
- Online Giving:
  • Accepts Tithe (10%), General Offering, Kingdom Builders (Building fund), Missions, and Welfare.
  • Channels: Card payments online, Direct Bank Wire (First Dominion Covenant Bank, Acct: 1029384756, Routing: 021000021), Zelle (fountainoflife@gmail.com), CashApp ($FOLCGiving).
  • All donations are 501(c)(3) tax-deductible with official instant receipts.
- Core Beliefs: Infallibility of the Holy Scriptures, The Holy Trinity, Salvation by grace through faith in Jesus Christ, Believer's water baptism by immersion, Baptism of the Holy Spirit with speaking in tongues, Divine healing in the atonement, and the Second Coming of Jesus.
- Visitor Experience: Visitors can click "Plan Your Sunday Visit" to receive a reserved seat, parking spot, and VIP gift bag. Casual or dressy attire are both welcome ("Come as you are").

YOUR ROLE & TONE:
1. Greet visitors warmly and address them with Christian grace, love, and encouragement.
2. Provide concise, clear, accurate answers to any questions about church schedules, pastors, location, ministries, sermons, events, giving, or salvation.
3. If someone asks for prayer or is going through a hardship, pray a short, faith-filled prayer for them and quote an encouraging scripture (e.g., Philippians 4:6-7, Jeremiah 29:11, Isaiah 41:10).
4. Guide users to relevant sections on the website (e.g., "You can visit our Sermons page to listen to Pastor Emmanuel's latest message", or "You can submit a confidential prayer request on our Prayer Request page").
5. Keep your responses warm, focused, and conversational (usually 2-4 paragraphs). Use respectful formatting.`;

// Intelligent fallback response generator if Gemini key is missing or unavailable
function getChurchFallbackResponse(userPrompt: string): string {
  const q = userPrompt.toLowerCase();

  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('number') || q.includes('call') || q.includes('reach') || q.includes('whatsapp')) {
    return `Grace and peace to you! You can reach **Fountain of Life Church** through any of our official contact channels:\n\n• **Phone / WhatsApp**: 08127933781 (+234 812 793 3781)\n• **Official Email**: fountainoflife@gmail.com\n• **Campus Sanctuary**: 124 Living Waters Way, Victory City, VC 77084\n\nOur administrative office is open Tuesday through Saturday, and our pastoral care ministers are always glad to connect, pray with you, or welcome you this Sunday!`;
  }

  if (q.includes('service') || q.includes('time') || q.includes('sunday') || q.includes('when')) {
    return `Grace and peace to you! Here are our service times at Fountain of Life Church:\n\n• **Sunday Early Dew Encounter**: 8:00 AM – 9:45 AM\n• **Sunday Celebration & Word**: 10:15 AM – 12:30 PM\n• **Wednesday Mid-Week Faith Clinic**: 6:30 PM – 8:00 PM (Word & Holy Communion)\n• **Monthly Holy Ghost Miracle Vigil**: 1st Friday of every month, 10:00 PM – 3:30 AM\n\nAll Sunday services are held in-person at our Sanctuary (124 Living Waters Way, Victory City) and streamed live on our website! You can also click "Plan Your Visit" to reserve VIP parking.`;
  }

  if (q.includes('pastor') || q.includes('leader') || q.includes('emmanuel') || q.includes('grace')) {
    return `Fountain of Life Church is led by our founding Senior Pastors, **Dr. Emmanuel Adeleke** and his wife, **Pastor Mrs. Grace Adeleke**.\n\nDr. Emmanuel is an apostolic teacher with over 28 years in ministry, recognized for his deep exposition of scripture and passion for holiness and prayer. Pastor Grace is a gifted family life counselor, conference speaker, and author. They are assisted by Associate Pastor David Adebayo, Youth Pastor Blessing Okafor, and our dedicated Board of Elders.`;
  }

  if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('direction')) {
    return `Our church sanctuary is located at:\n\n📍 **124 Living Waters Way, Victory City, VC 77084**\n\nWe are right off Living Waters Expressway (Exit 14B). We offer over 500 complimentary parking spaces, with front-row reserved spots for first-time visitors! You can also click the "Contact" page for interactive driving and transit directions.`;
  }

  if (q.includes('give') || q.includes('tithe') || q.includes('offering') || q.includes('donate') || q.includes('bank')) {
    return `Thank you for your generous heart to support the work of God!\n\nYou can give safely online on our **Give** page, which generates an instant official 501(c)(3) tax receipt. We support:\n\n• **Online Debit/Credit Card**\n• **Direct Bank Wire / ACH**: First Dominion Covenant Bank, Acct: 1029384756, Routing: 021000021\n• **Zelle**: fountainoflife@gmail.com\n• **CashApp**: $FOLCGiving\n\n“Give, and it will be given to you: good measure, pressed down, shaken together, and running over.” — Luke 6:38`;
  }

  if (q.includes('pray') || q.includes('healing') || q.includes('sick') || q.includes('help') || q.includes('burden')) {
    return `Beloved, the Lord hears your cry. In Jeremiah 33:3, He declares: *“Call to Me, and I will answer you, and show you great and mighty things.”*\n\nLet us agree in prayer:\n*“Heavenly Father, in the name of Jesus, we lift up this precious soul before Your throne of grace. Pour out Your peace, divine healing, and supernatural breakthrough into their life right now. Let the rivers of living water wash away all anxiety, fear, and pain. In Jesus' mighty name, Amen.”*\n\nPlease feel free to also submit a detailed request on our **Prayer Request** page so our 24/7 intercessory altar can stand with you!`;
  }

  if (q.includes('ministr') || q.includes('youth') || q.includes('children') || q.includes('choir') || q.includes('men') || q.includes('women')) {
    return `We have active, thriving ministries for every season of life:\n\n1. **Kingdom Champions Children's Church** (Infants – 12 yrs)\n2. **The Ascendancy Youth & Young Adults** (Ages 13 – 30)\n3. **Men of Valour Fellowship** (Men's brotherhood and breakfasts)\n4. **Virtuous Women of Grace** (Sisterhood & mentorship)\n5. **Living Waters Choir & Creative Arts** (Vibrant praise and orchestra)\n6. **Global Evangelism & Compassion** (Community food bank & missions)\n\nYou can explore meeting times and sign up to volunteer on our **Ministries** page!`;
  }

  if (q.includes('salvation') || q.includes('born again') || q.includes('accept jesus') || q.includes('saved')) {
    return `This is the most important decision of your life! Romans 10:9 says: *“If you confess with your mouth the Lord Jesus and believe in your heart that God has raised Him from the dead, you will be saved.”*\n\nYou can pray this simple prayer from your heart:\n*“Lord Jesus, I come to You today. I believe You died for my sins and rose again. Forgive my past, wash me in Your blood, and write my name in the Book of Life. Today, I receive You as my Lord and personal Savior. Amen.”*\n\nIf you prayed this prayer, welcome to the family of God! Please reach out to our pastoral care team on our Contact page so we can give you a free Bible and help you grow.`;
  }

  return `Welcome to Fountain of Life Church! I am **Fountain AI**, your personal church guide.\n\nI can help you with:\n• Sunday & Midweek service times\n• Meeting our Senior Pastors Dr. Emmanuel & Pastor Grace\n• Sanctuary location & parking instructions\n• Exploring our vibrant ministries & choir\n• How to give tithes and offerings securely\n• Submitting prayer requests or praying with you right now\n\nHow may I minister to you or assist you today?`;
}

// Chat API Route
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      // Use intelligent church fallback
      const fallbackResponse = getChurchFallbackResponse(message);
      return res.json({ reply: fallbackResponse });
    }

    // Format chat history for multi-turn conversation
    const formattedContents = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) { // keep last 8 turns for context
        if (item.role === 'user') {
          formattedContents.push({ role: 'user', parts: [{ text: item.content }] });
        } else if (item.role === 'assistant' || item.role === 'model') {
          formattedContents.push({ role: 'model', parts: [{ text: item.content }] });
        }
      }
    }

    formattedContents.push({ role: 'user', parts: [{ text: message }] });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API call timed out')), 6000)
    );

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: FOUNTAIN_AI_SYSTEM_INSTRUCTION
      }
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const reply = response.text || getChurchFallbackResponse(message);
    return res.json({ reply });
  } catch (err: any) {
    console.error('Gemini Chat error:', err?.message || err);
    // Graceful fallback response
    const fallbackResponse = getChurchFallbackResponse(req.body.message || '');
    return res.json({ reply: fallbackResponse });
  }
});

// Devotional API Route
app.get('/api/devotional/today', async (req, res) => {
  try {
    const dayParam = (req.query.day as string) || '';
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = dayParam && dayNames.some(d => d.toLowerCase() === dayParam.toLowerCase())
      ? dayNames.find(d => d.toLowerCase() === dayParam.toLowerCase())!
      : dayNames[new Date().getDay()];

    const isRefreshRequested = req.query.refresh === 'true';

    // If Gemini is available and user explicitly asked for an AI-generated fresh reflection
    if (ai && isRefreshRequested) {
      try {
        const prompt = `You are writing a pastoral daily devotional for Fountain of Life Church for ${currentDay}.
Provide a short, spiritually uplifting, scripture-based reflection to encourage church members during the week.
Respond ONLY with a valid JSON object matching this exact structure:
{
  "dayOfWeek": "${currentDay}",
  "title": "Creative Inspiring Title",
  "theme": "Short Spiritual Theme",
  "scriptureRef": "Book Chapter:Verse",
  "scriptureText": "Exact scripture text",
  "translation": "NKJV",
  "reflection": "A 2-3 paragraph inspiring, Christ-centered meditation applying the scripture to daily life.",
  "actionStep": "One practical faith application step for today.",
  "prayerPoint": "A heartfelt, faith-filled prayer.",
  "propheticDeclaration": "A bold scriptural prophetic decree for the day.",
  "author": "Dr. Emmanuel Adeleke (Senior Pastor)",
  "readingDuration": "2 min read"
}`;

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Devotional generation timeout')), 5000)
        );

        const generatePromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        const response = await Promise.race([generatePromise, timeoutPromise]);
        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json({
            devotional: {
              id: `gen-${Date.now()}`,
              ...parsed
            },
            isAiGenerated: true
          });
        }
      } catch (genErr) {
        console.warn('Gemini devotional generation fallback:', genErr);
      }
    }

    // Default to curated theological devotionals
    const { getDevotionalForDay } = await import('./src/data/churchData.ts');
    const devotional = getDevotionalForDay(currentDay);
    return res.json({ devotional, isAiGenerated: false });
  } catch (err: any) {
    console.error('Error fetching devotional:', err);
    return res.status(500).json({ error: 'Failed to retrieve devotional' });
  }
});

// Newsletter Subscription In-Memory Store
const newsletterSubscribers: Array<{
  id: string;
  email: string;
  fullName: string;
  preferences: {
    weeklyBulletin: boolean;
    dailyDevotional: boolean;
    vigilAndEvents: boolean;
  };
  subscribedAt: string;
}> = [];

app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, fullName, preferences } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const subscriber = {
      id: `sub-${Date.now()}`,
      email: email.trim().toLowerCase(),
      fullName: (fullName || 'Beloved Friend').trim(),
      preferences: {
        weeklyBulletin: preferences?.weeklyBulletin ?? true,
        dailyDevotional: preferences?.dailyDevotional ?? true,
        vigilAndEvents: preferences?.vigilAndEvents ?? true
      },
      subscribedAt: new Date().toISOString()
    };

    // Avoid duplicate subscriptions
    const existingIndex = newsletterSubscribers.findIndex(s => s.email === subscriber.email);
    if (existingIndex >= 0) {
      newsletterSubscribers[existingIndex] = subscriber;
    } else {
      newsletterSubscribers.push(subscriber);
    }

    const { LATEST_BULLETIN_INFO } = await import('./src/data/churchData.ts');

    return res.json({
      success: true,
      message: `Grace and peace, ${subscriber.fullName}! You are subscribed to Fountain of Life Church updates.`,
      subscriber,
      latestBulletin: LATEST_BULLETIN_INFO
    });
  } catch (err: any) {
    console.error('Newsletter subscription error:', err);
    return res.status(500).json({ error: 'Subscription service temporarily unavailable' });
  }
});

// Worship Playlist API Endpoint
app.get('/api/worship-playlist', async (_req, res) => {
  try {
    const { WORSHIP_PLAYLIST_DATA } = await import('./src/data/churchData.ts');
    return res.json({ tracks: WORSHIP_PLAYLIST_DATA });
  } catch (err: any) {
    console.error('Worship playlist fetch error:', err);
    return res.status(500).json({ error: 'Failed to load worship playlist' });
  }
});

// Bible API Endpoints
app.get('/api/bible/books', async (_req, res) => {
  try {
    const { BIBLE_BOOKS } = await import('./src/data/bibleData.ts');
    return res.json({ books: BIBLE_BOOKS });
  } catch (err: any) {
    console.error('Error fetching Bible books:', err);
    return res.status(500).json({ error: 'Failed to retrieve Bible books' });
  }
});

app.get('/api/bible/topics', async (_req, res) => {
  try {
    const { BIBLE_TOPIC_PLANS } = await import('./src/data/bibleData.ts');
    return res.json({ topics: BIBLE_TOPIC_PLANS });
  } catch (err: any) {
    console.error('Error fetching Bible topics:', err);
    return res.status(500).json({ error: 'Failed to retrieve Bible topic plans' });
  }
});

app.get('/api/bible/passage', async (req, res) => {
  try {
    const ref = (req.query.ref as string) || 'John 3:16';
    const translation = ((req.query.translation as string) || 'NKJV').toUpperCase();

    const { parseBibleReference, getPassageLocally, BIBLE_BOOKS } = await import('./src/data/bibleData.ts');

    const parsed = parseBibleReference(ref);
    if (!parsed) {
      return res.status(400).json({ error: `Could not recognize scripture reference "${ref}". Try "John 3:16" or "Psalm 23".` });
    }

    // 1. Try local curated passages for instant, high-quality response
    const local = getPassageLocally(parsed.book, parsed.chapter, parsed.startVerse, parsed.endVerse, translation);
    if (local && local.verses.length > 0) {
      return res.json({ passage: local });
    }

    // 2. Try public Bible API (supports KJV, WEB, etc.)
    const apiTranslation = translation === 'KJV' ? 'kjv' : 'web';
    try {
      const response = await fetch(
        `https://bible-api.com/${encodeURIComponent(parsed.formattedReference)}?translation=${apiTranslation}`,
        { signal: AbortSignal.timeout(3500) }
      );
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.verses) && data.verses.length > 0) {
          const passage = {
            reference: data.reference || parsed.formattedReference,
            book: parsed.book,
            chapter: parsed.chapter,
            startVerse: parsed.startVerse,
            endVerse: parsed.endVerse,
            translation: translation,
            verses: data.verses.map((v: any) => ({
              verse: v.verse,
              text: v.text ? v.text.replace(/\s+/g, ' ').trim() : ''
            })),
            title: `${parsed.book} Chapter ${parsed.chapter}`,
            pastoralReflection: `Reflect on the sacred Word of God in ${data.reference || parsed.formattedReference}. Allow the Holy Spirit to minister peace, instruction, and faith directly to your heart today.`
          };
          return res.json({ passage });
        }
      }
    } catch (_fetchErr) {
      // Continue to Gemini or fallback
    }

    // 3. If Gemini is available, generate verified passage text with verse numbers
    if (ai) {
      try {
        const prompt = `Return the exact biblical text for the passage: "${parsed.formattedReference}" in the ${translation} translation.
Format your output strictly as valid JSON with no markdown backticks, with the following schema:
{
  "reference": "${parsed.formattedReference}",
  "book": "${parsed.book}",
  "chapter": ${parsed.chapter},
  "title": "Passage Theme Title",
  "pastoralReflection": "1-2 sentence pastoral spiritual reflection for members of Fountain of Life Church.",
  "verses": [
    { "verse": 1, "text": "Verse text here" }
  ]
}`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });
        const text = response.text?.trim() || '';
        if (text) {
          const parsedGemini = JSON.parse(text);
          if (parsedGemini.verses && parsedGemini.verses.length > 0) {
            parsedGemini.translation = translation;
            return res.json({ passage: parsedGemini });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini scripture generation warning:', geminiErr);
      }
    }

    // 4. Default graceful fallback with book info
    const foundBook = BIBLE_BOOKS.find(b => b.name.toLowerCase() === parsed.book.toLowerCase());
    return res.json({
      passage: {
        reference: parsed.formattedReference,
        book: parsed.book,
        chapter: parsed.chapter,
        startVerse: parsed.startVerse,
        endVerse: parsed.endVerse,
        translation: translation,
        title: `${parsed.book} ${parsed.chapter}`,
        pastoralReflection: `Reading from ${parsed.book} (${foundBook?.testament || 'Holy'} Testament). "Your word is a lamp to my feet and a light to my path." — Psalm 119:105`,
        verses: [
          {
            verse: parsed.startVerse || 1,
            text: `“For the Word of God is living and powerful, sharper than any two-edged sword, piercing even to the division of soul and spirit.” — Hebrews 4:12 (${parsed.formattedReference})`
          }
        ]
      }
    });
  } catch (err: any) {
    console.error('Bible passage error:', err);
    return res.status(500).json({ error: 'Failed to retrieve scripture passage' });
  }
});

app.get('/api/bible/search', async (req, res) => {
  try {
    const query = ((req.query.q as string) || '').trim().toLowerCase();
    if (!query) {
      return res.json({ results: [], total: 0 });
    }

    const { CURATED_PASSAGES, BIBLE_TOPIC_PLANS, parseBibleReference } = await import('./src/data/bibleData.ts');

    // Check if query is a direct reference like "John 3"
    const parsed = parseBibleReference(query);
    const directMatches: any[] = [];
    if (parsed) {
      directMatches.push({
        type: 'reference',
        title: parsed.formattedReference,
        subtitle: `Jump directly to ${parsed.formattedReference}`,
        reference: parsed.formattedReference
      });
    }

    // Search topics
    const matchingTopics = BIBLE_TOPIC_PLANS.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.theme.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );

    // Search verses across curated passages
    // Search verses across curated passages
    const matchingVerses: any[] = [];
    for (const p of CURATED_PASSAGES) {
      for (const v of p.verses) {
        if (v.text.toLowerCase().includes(query) || p.title.toLowerCase().includes(query)) {
          matchingVerses.push({
            reference: `${p.book} ${p.chapter}:${v.verse}`,
            book: p.book,
            chapter: p.chapter,
            verse: v.verse,
            text: v.text,
            passageTitle: p.title
          });
        }
      }
    }

    // Also search verses in topic plans
    for (const t of BIBLE_TOPIC_PLANS) {
      for (const v of t.verses) {
        if (
          v.text.toLowerCase().includes(query) ||
          v.keyMessage.toLowerCase().includes(query) ||
          v.reference.toLowerCase().includes(query) ||
          t.title.toLowerCase().includes(query)
        ) {
          const alreadyAdded = matchingVerses.some(mv => mv.reference.toLowerCase() === v.reference.toLowerCase());
          if (!alreadyAdded) {
            const parsedRef = parseBibleReference(v.reference);
            matchingVerses.push({
              reference: v.reference,
              book: parsedRef?.book || v.reference.split(' ')[0],
              chapter: parsedRef?.chapter || 1,
              verse: parsedRef?.startVerse || 1,
              text: v.text,
              passageTitle: `${t.title} (${t.theme})`
            });
          }
        }
      }
    }

    return res.json({
      query,
      directMatches,
      matchingTopics,
      matchingVerses: matchingVerses.slice(0, 25),
      total: directMatches.length + matchingTopics.length + matchingVerses.length
    });
  } catch (err: any) {
    console.error('Bible search error:', err);
    return res.status(500).json({ error: 'Failed to perform Bible search' });
  }
});

// Prayer Wall In-Memory Store
let prayerWallRequests: any[] | null = null;

async function getPrayerWallStore() {
  if (!prayerWallRequests) {
    const { INITIAL_PRAYER_WALL_REQUESTS } = await import('./src/data/churchData.ts');
    prayerWallRequests = JSON.parse(JSON.stringify(INITIAL_PRAYER_WALL_REQUESTS));
  }
  return prayerWallRequests!;
}

// GET /api/prayer-wall
app.get('/api/prayer-wall', async (_req, res) => {
  try {
    const list = await getPrayerWallStore();
    return res.json({ requests: list });
  } catch (err: any) {
    console.error('Error fetching prayer wall:', err);
    return res.status(500).json({ error: 'Failed to retrieve prayer requests' });
  }
});

// POST /api/prayer-wall
app.post('/api/prayer-wall', async (req, res) => {
  try {
    const { author, isAnonymous, city, category, title, details, scriptureAnchor, urgency } = req.body;

    if (!title || !details) {
      return res.status(400).json({ error: 'Prayer title and details are required.' });
    }

    const list = await getPrayerWallStore();
    const newRequest = {
      id: `pr-${Date.now()}`,
      author: isAnonymous ? 'Anonymous Member' : (author?.trim() || 'Church Member'),
      isAnonymous: Boolean(isAnonymous),
      city: city?.trim() || 'Victory City',
      category: category || 'Healing & Health',
      title: title.trim(),
      details: details.trim(),
      scriptureAnchor: scriptureAnchor?.trim() || '',
      prayerCount: 1, // Author prays for themselves
      encouragements: [],
      isAnswered: false,
      createdAt: 'Just now',
      urgency: urgency === 'Urgent' ? 'Urgent' : 'Normal'
    };

    list.unshift(newRequest);
    return res.status(201).json({ success: true, request: newRequest });
  } catch (err: any) {
    console.error('Error posting to prayer wall:', err);
    return res.status(500).json({ error: 'Failed to submit prayer request' });
  }
});

// POST /api/prayer-wall/:id/pray
app.post('/api/prayer-wall/:id/pray', async (req, res) => {
  try {
    const { id } = req.params;
    const list = await getPrayerWallStore();
    const item = list.find(r => r.id === id);

    if (!item) {
      return res.status(404).json({ error: 'Prayer request not found.' });
    }

    item.prayerCount = (item.prayerCount || 0) + 1;
    return res.json({ success: true, prayerCount: item.prayerCount });
  } catch (err: any) {
    console.error('Error updating prayer count:', err);
    return res.status(500).json({ error: 'Failed to record prayer' });
  }
});

// POST /api/prayer-wall/:id/encourage
app.post('/api/prayer-wall/:id/encourage', async (req, res) => {
  try {
    const { id } = req.params;
    const { author, message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Encouragement message cannot be empty.' });
    }

    const list = await getPrayerWallStore();
    const item = list.find(r => r.id === id);

    if (!item) {
      return res.status(404).json({ error: 'Prayer request not found.' });
    }

    const newEncouragement = {
      id: `enc-${Date.now()}`,
      author: (author || 'Brother/Sister in Christ').trim(),
      message: message.trim(),
      createdAt: 'Just now'
    };

    item.encouragements = item.encouragements || [];
    item.encouragements.push(newEncouragement);

    return res.json({ success: true, encouragement: newEncouragement });
  } catch (err: any) {
    console.error('Error posting encouragement:', err);
    return res.status(500).json({ error: 'Failed to post encouragement' });
  }
});

// POST /api/prayer-wall/:id/answered
app.post('/api/prayer-wall/:id/answered', async (req, res) => {
  try {
    const { id } = req.params;
    const { testimony } = req.body;

    const list = await getPrayerWallStore();
    const item = list.find(r => r.id === id);

    if (!item) {
      return res.status(404).json({ error: 'Prayer request not found.' });
    }

    item.isAnswered = true;
    item.answeredTestimony = testimony ? testimony.trim() : 'Praise the Lord! God answered this petition in His glorious power.';

    return res.json({ success: true, item });
  } catch (err: any) {
    console.error('Error marking prayer as answered:', err);
    return res.status(500).json({ error: 'Failed to update prayer request' });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fountain of Life Church server running on http://localhost:${PORT}`);
  });
}

startServer();
