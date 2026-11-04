import React, { useState } from 'react';
import { PageId } from '../types';
import { CHURCH_INFO } from '../data/churchData';
import { 
  calculateTotalGiving, 
  generateGivingReceipt, 
  GivingReceipt, 
  GivingCalculationInput 
} from '../utils/churchUtils';
import { 
  Heart, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Lock,
  Printer
} from 'lucide-react';

interface GivePageProps {
  onNavigate: (page: PageId) => void;
}

export const GivePage: React.FC<GivePageProps> = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState<'card' | 'bank' | 'mobile'>('card');
  const [frequency, setFrequency] = useState<'one-time' | 'recurring'>('one-time');

  // Amounts
  const [breakdown, setBreakdown] = useState<GivingCalculationInput>({
    tithe: 0,
    offering: 100,
    buildingFund: 0,
    missions: 0,
    welfare: 0
  });

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState<GivingReceipt | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState('');

  const totalAmount = calculateTotalGiving(breakdown);

  const handlePresetOffering = (amount: number) => {
    setBreakdown((prev) => ({
      ...prev,
      offering: amount
    }));
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleProcessGiving = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalAmount <= 0) {
      setError('Please specify an amount greater than $0 in at least one category.');
      return;
    }
    if (!donorName.trim() || !donorEmail.trim()) {
      setError('Please provide your name and email address for your official tax receipt.');
      return;
    }
    setError('');
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      const generated = generateGivingReceipt(
        donorName,
        donorEmail,
        breakdown,
        'USD',
        activePaymentMethod === 'card' ? 'Online Card (Visa/Mastercard)' : 'Bank / Mobile Transfer'
      );
      setReceipt(generated);
    }, 1200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDownloadReceiptText = () => {
    if (!receipt) return;
    const content = `FOUNTAIN OF LIFE CHURCH\nOFFICIAL DONATION RECEIPT\n----------------------------------------\nReceipt ID: ${receipt.receiptId}\nDate: ${receipt.date}\nDonor Name: ${receipt.donorName}\nDonor Email: ${receipt.donorEmail}\nPayment Method: ${receipt.paymentMethod}\nStatus: ${receipt.status}\n\nCONTRIBUTION BREAKDOWN:\n${Object.entries(receipt.breakdown)
      .map(([k, v]) => `• ${k.toUpperCase()}: $${v.toFixed(2)}`)
      .join('\n')}\n\nTOTAL DONATION: $${receipt.totalAmount.toFixed(2)} USD\n----------------------------------------\nThank you for honoring the Lord with your substance (Proverbs 3:9).\nFountain of Life Church is an exempt 501(c)(3) religious charity.\n124 Living Waters Way, Victory City\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Donation_Receipt_${receipt.receiptId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider inline-block">
            Covenant Partnership & Stewardship
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-prose font-bold text-white tracking-tight">
            Safe & Secure Online Giving
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            “Honor the Lord with your wealth and with the firstfruits of all your produce; then your barns will be filled with plenty.” — Proverbs 3:9-10
          </p>
        </div>
      </section>

      {/* Main Giving Card or Completed Receipt */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {receipt ? (
          /* Receipt Screen */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3 pb-6 border-b border-slate-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <Check className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Transaction Successful
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-prose font-bold text-slate-900">
                Thank You for Sowing into the Kingdom, {receipt.donorName}!
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Your generosity empowers global missions, local food pantries, and youth discipleship. An official receipt has been sent to <strong>{receipt.donorEmail}</strong>.
              </p>
            </div>

            {/* Formal Receipt Box */}
            <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 text-xs space-y-3">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Official Receipt #:</span>
                <span className="font-mono font-bold text-slate-900">{receipt.receiptId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Date:</span>
                <span className="font-medium text-slate-800">{receipt.date}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Payment Channel:</span>
                <span className="font-medium text-slate-800">{receipt.paymentMethod}</span>
              </div>

              <div className="pt-2">
                <span className="font-bold text-slate-700 block mb-1">Fund Allocation:</span>
                <div className="space-y-1 text-slate-600">
                  {Object.entries(receipt.breakdown).map(([fund, amt]) => (
                    <div key={fund} className="flex justify-between">
                      <span className="capitalize">{fund.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium text-slate-900">${amt.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-3 border-t-2 border-slate-300 font-bold text-sm text-blue-900">
                <span>Total Contribution:</span>
                <span>${receipt.totalAmount.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Receipt Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={handleDownloadReceiptText}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Tax Receipt (.txt)</span>
              </button>
              <button
                onClick={handlePrintReceipt}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => setReceipt(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors"
              >
                Make Another Gift
              </button>
            </div>
          </div>
        ) : (
          /* Giving Form */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
            
            {/* Payment Method Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto">
              <button
                onClick={() => setActivePaymentMethod('card')}
                className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  activePaymentMethod === 'card'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Debit / Credit Card</span>
              </button>

              <button
                onClick={() => setActivePaymentMethod('bank')}
                className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  activePaymentMethod === 'bank'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Bank Wire / ACH</span>
              </button>

              <button
                onClick={() => setActivePaymentMethod('mobile')}
                className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  activePaymentMethod === 'mobile'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Zelle & CashApp</span>
              </button>
            </div>

            {/* Bank Wire Details View */}
            {activePaymentMethod === 'bank' && (
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 max-w-xl mx-auto space-y-4 text-xs text-slate-800 animate-in fade-in">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Direct Bank Wire / ACH Details</span>
                </div>
                <p className="text-slate-600">
                  You can set up automatic bill pay or send wires directly through your online banking using these official credentials:
                </p>

                <div className="space-y-2.5 bg-white p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Bank Name:</span>
                    <span className="font-semibold">{CHURCH_INFO.bankingDetails.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Account Name:</span>
                    <span className="font-semibold">{CHURCH_INFO.bankingDetails.accountName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold">{CHURCH_INFO.bankingDetails.accountNumber}</span>
                      <button
                        onClick={() => handleCopy(CHURCH_INFO.bankingDetails.accountNumber, 'acct')}
                        className="text-blue-900 hover:text-amber-600"
                        title="Copy Account Number"
                      >
                        {copiedField === 'acct' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Routing Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold">{CHURCH_INFO.bankingDetails.routingNumber}</span>
                      <button
                        onClick={() => handleCopy(CHURCH_INFO.bankingDetails.routingNumber, 'routing')}
                        className="text-blue-900 hover:text-amber-600"
                        title="Copy Routing Number"
                      >
                        {copiedField === 'routing' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Swift Code:</span>
                    <span className="font-mono">{CHURCH_INFO.bankingDetails.swiftCode}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile / Zelle View */}
            {activePaymentMethod === 'mobile' && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 max-w-xl mx-auto space-y-4 text-xs text-slate-800 animate-in fade-in">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  <span>Instant Mobile Giving</span>
                </div>
                <p className="text-slate-600">
                  Give in seconds with zero transaction fees using your mobile banking apps:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 bg-white rounded-xl border border-amber-100 space-y-2">
                    <span className="font-bold text-purple-900 block">Zelle Giving</span>
                    <div className="font-mono text-xs text-slate-800 truncate">
                      {CHURCH_INFO.bankingDetails.zelle}
                    </div>
                    <button
                      onClick={() => handleCopy(CHURCH_INFO.bankingDetails.zelle, 'zelle')}
                      className="px-3 py-1 bg-purple-50 text-purple-900 hover:bg-purple-100 rounded-lg text-[11px] font-semibold flex items-center gap-1"
                    >
                      {copiedField === 'zelle' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Zelle ID</span>
                    </button>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-amber-100 space-y-2">
                    <span className="font-bold text-emerald-900 block">CashApp Giving</span>
                    <div className="font-mono text-xs text-slate-800">
                      {CHURCH_INFO.bankingDetails.cashApp}
                    </div>
                    <button
                      onClick={() => handleCopy(CHURCH_INFO.bankingDetails.cashApp, 'cashapp')}
                      className="px-3 py-1 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 rounded-lg text-[11px] font-semibold flex items-center gap-1"
                    >
                      {copiedField === 'cashapp' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>Copy CashApp Cashtag</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Giving Calculator */}
            <form onSubmit={handleProcessGiving} className="space-y-6 max-w-2xl mx-auto">
              
              {/* Frequency Toggle */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-700">Giving Frequency:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      frequency === 'one-time'
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    One-Time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('recurring')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      frequency === 'recurring'
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Monthly Covenant Partner
                  </button>
                </div>
              </div>

              {/* Quick Amount Presets for General Offering */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Quick Amount Presets (General Offering)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[25, 50, 100, 250, 500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handlePresetOffering(amt)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        breakdown.offering === amt
                          ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Category Breakdown Inputs */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Custom Category Allocation
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      1. Tithe (10% of Income)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-slate-400 font-mono text-sm">$</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={breakdown.tithe || ''}
                        onChange={(e) => setBreakdown({ ...breakdown, tithe: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="w-full pl-7 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      2. General Offering
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-slate-400 font-mono text-sm">$</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={breakdown.offering || ''}
                        onChange={(e) => setBreakdown({ ...breakdown, offering: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="w-full pl-7 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      3. Kingdom Builders (Building Fund)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-slate-400 font-mono text-sm">$</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={breakdown.buildingFund || ''}
                        onChange={(e) => setBreakdown({ ...breakdown, buildingFund: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="w-full pl-7 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      4. World Missions & Outreach
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-slate-400 font-mono text-sm">$</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={breakdown.missions || ''}
                        onChange={(e) => setBreakdown({ ...breakdown, missions: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="w-full pl-7 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-sans">Total Giving Amount</span>
                  <span className="text-xs text-amber-400">
                    {frequency === 'recurring' ? 'Recurring Monthly Covenant' : 'One-Time Contribution'}
                  </span>
                </div>
                <div className="text-2xl font-bold font-mono text-amber-300">
                  ${totalAmount.toFixed(2)}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {error}
                </div>
              )}

              {/* Donor Information */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Donor Information (For Official Tax Receipt)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="e.g. Deaconess Mary Edwards"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="mary@example.org"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>
                </div>

                {activePaymentMethod === 'card' && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 mt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4111 2222 3333 4444"
                        maxLength={19}
                        className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          CVV / Security Code
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Securing Transaction & Generating Tax Receipt...</span>
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-slate-950" />
                    <span>Give ${totalAmount.toFixed(2)} Securely</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-bit Bank Grade SSL Encryption · 501(c)(3) Tax Deductible</span>
              </div>

            </form>
          </div>
        )}
      </section>

      {/* Biblical Promises on Giving */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-blue-900 text-xs font-bold uppercase tracking-widest font-sans">
              Kingdom Economics
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-prose font-bold text-slate-900">
              Covenant Scriptures on Giving
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <span className="font-bold text-blue-900 text-sm block">Luke 6:38</span>
              <p className="italic leading-relaxed">
                “Give, and it will be given to you: good measure, pressed down, shaken together, and running over will be put into your bosom.”
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <span className="font-bold text-blue-900 text-sm block">Malachi 3:10</span>
              <p className="italic leading-relaxed">
                “Bring all the tithes into the storehouse... and try Me now in this,” says the Lord of hosts, “if I will not open for you the windows of heaven.”
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <span className="font-bold text-blue-900 text-sm block">2 Corinthians 9:7</span>
              <p className="italic leading-relaxed">
                “Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.”
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
