import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTotalGiving,
  generateGivingReceipt,
  validatePrayerRequest,
  filterSermons,
  highlightKeywordTokens,
  SermonItem
} from './churchUtils';

test('calculateTotalGiving correctly sums all positive categories and ignores invalid inputs', () => {
  const result = calculateTotalGiving({
    tithe: 100,
    offering: 50.5,
    buildingFund: 25.25,
    missions: 0,
    welfare: -10
  });
  assert.equal(result, 175.75);
});

test('generateGivingReceipt creates a valid receipt with ID and breakdown', () => {
  const receipt = generateGivingReceipt(
    'Brother John Doe',
    'john@example.com',
    { tithe: 200, offering: 50 },
    'USD',
    'Online Card'
  );

  assert.equal(receipt.donorName, 'Brother John Doe');
  assert.equal(receipt.totalAmount, 250);
  assert.match(receipt.receiptId, /^FOLC-\d{4}-\d{4}$/);
  assert.equal(receipt.status, 'COMPLETED');
  assert.equal(receipt.breakdown.tithe, 200);
  assert.equal(receipt.breakdown.offering, 50);
});

test('validatePrayerRequest checks required fields and email formats', () => {
  const invalid = validatePrayerRequest({
    fullName: 'J',
    email: 'bad-email',
    prayerSubject: '',
    details: 'short'
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.prayerSubject);
  assert.ok(invalid.errors.details);

  const valid = validatePrayerRequest({
    fullName: 'Sister Mary Smith',
    email: 'mary@example.org',
    prayerSubject: 'Healing & Deliverance',
    details: 'Please pray for my mother as she undergoes medical surgery tomorrow.'
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('filterSermons filters correctly by category and search keyword', () => {
  const sampleSermons: SermonItem[] = [
    {
      id: '1',
      title: 'Walking in Supernatural Grace',
      speaker: 'Pastor Emmanuel Adeleke',
      category: 'Grace',
      series: 'Rivers of Glory',
      scripture: '2 Corinthians 12:9'
    },
    {
      id: '2',
      title: 'The Power of Prevailing Prayer',
      speaker: 'Pastor Grace Adeleke',
      category: 'Prayer',
      series: 'Foundations of Victory',
      scripture: 'James 5:16'
    },
    {
      id: '3',
      title: 'Kingdom Stewardship & Blessing',
      speaker: 'Pastor Emmanuel Adeleke',
      category: 'Finances',
      series: 'Covenant Blessings',
      scripture: 'Malachi 3:10'
    }
  ];

  const all = filterSermons(sampleSermons, '', 'All');
  assert.equal(all.length, 3);

  const prayerOnly = filterSermons(sampleSermons, '', 'Prayer');
  assert.equal(prayerOnly.length, 1);
  assert.equal(prayerOnly[0].title, 'The Power of Prevailing Prayer');

  const searchKeyword = filterSermons(sampleSermons, 'grace', 'All');
  assert.equal(searchKeyword.length, 2); // 1 title with Grace, 1 speaker Pastor Grace
});

test('DEVOTIONALS_DATA contains reflections for all 7 days of the week', async () => {
  const { DEVOTIONALS_DATA, getDevotionalForDay } = await import('../data/churchData.ts');
  assert.equal(DEVOTIONALS_DATA.length, 7);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (const day of days) {
    const dev = getDevotionalForDay(day);
    assert.ok(dev);
    assert.equal(dev.dayOfWeek, day);
    assert.ok(dev.title.length > 5);
    assert.ok(dev.scriptureRef.length > 2);
    assert.ok(dev.scriptureText.length > 10);
    assert.ok(dev.reflection.length > 50);
    assert.ok(dev.actionStep.length > 10);
    assert.ok(dev.propheticDeclaration.length > 10);
  }
});

test('WORSHIP_PLAYLIST_DATA contains valid Sunday worship tracks with Spotify links', async () => {
  const { WORSHIP_PLAYLIST_DATA } = await import('../data/churchData.ts');
  assert.ok(WORSHIP_PLAYLIST_DATA.length >= 5);

  for (const track of WORSHIP_PLAYLIST_DATA) {
    assert.ok(track.id);
    assert.ok(track.title);
    assert.ok(track.artist);
    assert.ok(track.category);
    assert.ok(track.spotifyTrackId);
    assert.ok(track.spotifyUrl.includes('spotify.com'));
    assert.ok(track.keyLyrics.length > 10);
  }
});

test('LATEST_BULLETIN_INFO has order of service, scripture of the week, and announcements', async () => {
  const { LATEST_BULLETIN_INFO } = await import('../data/churchData.ts');
  assert.ok(LATEST_BULLETIN_INFO.volume);
  assert.ok(LATEST_BULLETIN_INFO.scriptureOfTheWeek);
  assert.ok(LATEST_BULLETIN_INFO.orderOfService.length >= 4);
  assert.ok(LATEST_BULLETIN_INFO.announcements.length >= 3);
});

test('BIBLE_BOOKS contains all 66 canonical books (39 OT, 27 NT)', async () => {
  const { BIBLE_BOOKS } = await import('../data/bibleData.ts');
  assert.equal(BIBLE_BOOKS.length, 66);

  const ot = BIBLE_BOOKS.filter(b => b.testament === 'Old');
  const nt = BIBLE_BOOKS.filter(b => b.testament === 'New');

  assert.equal(ot.length, 39);
  assert.equal(nt.length, 27);

  // Check first and last books
  assert.equal(BIBLE_BOOKS[0].name, 'Genesis');
  assert.equal(BIBLE_BOOKS[65].name, 'Revelation');
});

test('parseBibleReference parses diverse scripture references accurately', async () => {
  const { parseBibleReference } = await import('../data/bibleData.ts');

  // Single verse
  const ref1 = parseBibleReference('John 3:16');
  assert.ok(ref1);
  assert.equal(ref1.book, 'John');
  assert.equal(ref1.chapter, 3);
  assert.equal(ref1.startVerse, 16);
  assert.equal(ref1.formattedReference, 'John 3:16');

  // Verse range
  const ref2 = parseBibleReference('Romans 8:28-39');
  assert.ok(ref2);
  assert.equal(ref2.book, 'Romans');
  assert.equal(ref2.chapter, 8);
  assert.equal(ref2.startVerse, 28);
  assert.equal(ref2.endVerse, 39);

  // Full chapter
  const ref3 = parseBibleReference('Psalm 23');
  assert.ok(ref3);
  assert.equal(ref3.book, 'Psalms');
  assert.equal(ref3.chapter, 23);
  assert.equal(ref3.startVerse, undefined);

  // Numbered book
  const ref4 = parseBibleReference('1 Corinthians 13:4-8');
  assert.ok(ref4);
  assert.equal(ref4.book, '1 Corinthians');
  assert.equal(ref4.chapter, 13);
  assert.equal(ref4.startVerse, 4);
  assert.equal(ref4.endVerse, 8);
});

test('getPassageLocally retrieves foundational scriptures and filters verses', async () => {
  const { getPassageLocally } = await import('../data/bibleData.ts');

  // Retrieve John 4:14
  const passage = getPassageLocally('John', 4, 14, 14);
  assert.ok(passage);
  assert.equal(passage.book, 'John');
  assert.equal(passage.chapter, 4);
  assert.equal(passage.verses.length, 1);
  assert.equal(passage.verses[0].verse, 14);
  assert.ok(passage.verses[0].text.includes('fountain of water'));

  // Retrieve Psalm 23 full chapter
  const ps23 = getPassageLocally('Psalms', 23);
  assert.ok(ps23);
  assert.equal(ps23.verses.length, 6);
  assert.equal(ps23.title, 'The Divine Shepherd and Abundant Provision');
});

test('INITIAL_PRAYER_WALL_REQUESTS contains diverse prayer categories and valid counts', async () => {
  const { INITIAL_PRAYER_WALL_REQUESTS } = await import('../data/churchData.ts');
  assert.ok(INITIAL_PRAYER_WALL_REQUESTS.length >= 5);

  const categories = new Set(INITIAL_PRAYER_WALL_REQUESTS.map(r => r.category));
  assert.ok(categories.has('Healing & Health'));
  assert.ok(categories.has('Financial Breakthrough'));
  assert.ok(categories.has('Thanksgiving & Praise'));

  for (const req of INITIAL_PRAYER_WALL_REQUESTS) {
    assert.ok(req.id);
    assert.ok(req.title);
    assert.ok(req.details);
    assert.ok(typeof req.prayerCount === 'number' && req.prayerCount > 0);
  }

  const answered = INITIAL_PRAYER_WALL_REQUESTS.filter(r => r.isAnswered);
  assert.ok(answered.length >= 1);
  assert.ok(answered[0].answeredTestimony);
});

test('highlightKeywordTokens splits scripture text accurately and marks keyword matches', () => {
  const scripture = 'Whoever drinks of this water will thirst again, but whoever drinks of the water that I shall give him will never thirst.';
  
  // Single word keyword
  const tokens = highlightKeywordTokens(scripture, 'water');
  assert.ok(tokens.length > 1);
  
  const matches = tokens.filter(t => t.isMatch);
  assert.equal(matches.length, 2);
  assert.equal(matches[0].text, 'water');
  assert.equal(matches[1].text, 'water');

  // Verify full reassembly matches original string exactly
  const reassembled = tokens.map(t => t.text).join('');
  assert.equal(reassembled, scripture);
});

test('highlightKeywordTokens handles case insensitivity while preserving original casing', () => {
  const scripture = 'Jesus said to her, "Give Me a drink." For Jesus was weary.';
  const tokens = highlightKeywordTokens(scripture, 'jesus');
  
  const matches = tokens.filter(t => t.isMatch);
  assert.equal(matches.length, 2);
  assert.equal(matches[0].text, 'Jesus'); // Preserves initial capital J
  assert.equal(matches[1].text, 'Jesus');
});

test('highlightKeywordTokens handles multi-word search and special characters safely', () => {
  const scripture = 'A fountain of living water springing up into everlasting life.';
  const tokens = highlightKeywordTokens(scripture, 'living water');
  
  const matches = tokens.filter(t => t.isMatch);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].text, 'living water');

  // Special regex characters should not crash regex compilation
  const specialTokens = highlightKeywordTokens(scripture, 'water? (life)*');
  assert.equal(specialTokens.length, 1);
  assert.equal(specialTokens[0].isMatch, false);

  // Empty keyword returns whole string intact without matches
  const emptyTokens = highlightKeywordTokens(scripture, '   ');
  assert.equal(emptyTokens.length, 1);
  assert.equal(emptyTokens[0].isMatch, false);
});
