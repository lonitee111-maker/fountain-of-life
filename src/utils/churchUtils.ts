export interface GivingCalculationInput {
  tithe: number;
  offering: number;
  buildingFund: number;
  missions: number;
  welfare: number;
}

export interface GivingReceipt {
  receiptId: string;
  donorName: string;
  donorEmail: string;
  date: string;
  breakdown: Record<string, number>;
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  status: 'COMPLETED' | 'PENDING';
}

/**
 * Calculates total giving amount safely
 */
export function calculateTotalGiving(breakdown: Partial<GivingCalculationInput>): number {
  const values = Object.values(breakdown);
  const total = values.reduce((acc, val) => acc + (typeof val === 'number' && !isNaN(val) && val > 0 ? val : 0), 0);
  return Math.round(total * 100) / 100;
}

/**
 * Generates an official church giving receipt
 */
export function generateGivingReceipt(
  donorName: string,
  donorEmail: string,
  breakdown: Partial<GivingCalculationInput>,
  currency = 'USD',
  paymentMethod = 'Online Card'
): GivingReceipt {
  const cleanName = donorName.trim() || 'Anonymous Member';
  const cleanEmail = donorEmail.trim() || 'unspecified@fountainoflife.org';
  const total = calculateTotalGiving(breakdown);

  const cleanBreakdown: Record<string, number> = {};
  for (const [key, val] of Object.entries(breakdown)) {
    if (typeof val === 'number' && val > 0) {
      cleanBreakdown[key] = val;
    }
  }

  const timestamp = Date.now();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const receiptId = `FOLC-${new Date().getFullYear()}-${randomSuffix}`;

  return {
    receiptId,
    donorName: cleanName,
    donorEmail: cleanEmail,
    date: new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    breakdown: cleanBreakdown,
    totalAmount: total,
    currency,
    paymentMethod,
    status: 'COMPLETED'
  };
}

/**
 * Validates prayer request form submission
 */
export interface PrayerValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validatePrayerRequest(data: {
  fullName?: string;
  email?: string;
  prayerSubject?: string;
  details?: string;
}): PrayerValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please provide your full name (minimum 2 characters).';
  }

  if (data.email && data.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
  }

  if (!data.prayerSubject || data.prayerSubject.trim().length < 3) {
    errors.prayerSubject = 'Please specify the subject or category of your prayer request.';
  }

  if (!data.details || data.details.trim().length < 10) {
    errors.details = 'Please provide some details for your prayer request (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Sermon search filter
 */
export interface SermonItem {
  id: string;
  title: string;
  speaker: string;
  category: string;
  series: string;
  scripture: string;
}

export function filterSermons(
  sermons: SermonItem[],
  query: string,
  selectedCategory: string
): SermonItem[] {
  const q = query.trim().toLowerCase();
  return sermons.filter((sermon) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      sermon.category.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchesCategory) return false;

    if (!q) return true;

    return (
      sermon.title.toLowerCase().includes(q) ||
      sermon.speaker.toLowerCase().includes(q) ||
      sermon.series.toLowerCase().includes(q) ||
      sermon.scripture.toLowerCase().includes(q)
    );
  });
}

/**
 * Splits text into segments identifying occurrences of the search keyword.
 * Preserves original word casing and handles special regex characters safely.
 */
export function highlightKeywordTokens(
  text: string,
  keyword: string
): Array<{ text: string; isMatch: boolean }> {
  if (!text) return [];
  if (!keyword || !keyword.trim()) {
    return [{ text, isMatch: false }];
  }

  const escaped = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      isMatch: part.toLowerCase() === keyword.trim().toLowerCase()
    }));
}
