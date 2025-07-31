import React, { useState } from 'react';

const InterestCalculator = () => {
  const [mode, setMode] = useState('rural'); // rural or calendar
  const [principal, setPrincipal] = useState('');
  const [monthlyPer100, setMonthlyPer100] = useState('');

  // Rural mode inputs
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState('months');
  const [extraDays, setExtraDays] = useState('');

  // Calendar mode inputs
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [annualRate, setAnnualRate] = useState(null);
  const [interestAmount, setInterestAmount] = useState(null);
  const [totalPayable, setTotalPayable] = useState(null);

  const convertToDaysRural = (value, unit) => {
    if (unit === 'years') return value * 360;
    if (unit === 'months') return value * 30;
    return value;
  };

  const calculate = () => {
    const p = parseFloat(principal);
    const ratePer100 = parseFloat(monthlyPer100);
    const ratePer1 = ratePer100 / 100;

    if (isNaN(p) || isNaN(ratePer100)) {
      alert('Please enter valid numbers');
      return;
    }

    let totalDays = 0;

    if (mode === 'rural') {
      const dur = parseFloat(duration);
      const extra = parseFloat(extraDays || 0);
      if (isNaN(dur)) {
        alert('Enter valid rural duration');
        return;
      }
      totalDays = convertToDaysRural(dur, durationUnit) + extra;
    } else if (mode === 'calendar') {
      if (!startDate || !endDate) {
        alert('Select start and end date');
        return;
      }
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        alert('Start date must be before end date');
        return;
      }
      const diffTime = end.getTime() - start.getTime();
      totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const interest = p * ratePer1 * (totalDays / 30);
    const total = p + interest;
    const annualPercent = ratePer100 * 12;

    setAnnualRate(annualPercent.toFixed(2));
    setInterestAmount(interest.toFixed(2));
    setTotalPayable(total.toFixed(2));
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Interest Calculator (Rural + Calendar Mode)</h3>

      <div style={{ marginBottom: '10px' }}>
  <label>Mode: </label>
  <select value={mode} onChange={(e) => setMode(e.target.value)}>
    <option value="rural">Rural</option>
    <option value="calendar">Calendar</option>
  </select>

  <div
    style={{
      fontSize: '14px',
      marginTop: '8px',
      padding: '10px',
      backgroundColor: '#f0f0f0',
      color: '#333',
      borderRadius: '6px',
      maxWidth: '600px',
    }}
  >
    <strong>{mode === 'rural' ? 'Rural Mode:' : 'Calendar Mode:'}</strong>
    <span style={{ marginLeft: '5px' }}>
      {mode === 'rural'
        ? 'Fixed interest per ₹100/month. Assumes 30-day months and 360-day year. Common in local rural lending.'
        : 'Calculates interest using actual calendar days between selected start and end dates for accuracy.'}
    </span>
  </div>
</div>

      <input
        type="number"
        placeholder="Principal ₹"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
      />
      <input
        type="number"
        placeholder="₹ per ₹100 (Monthly)"
        value={monthlyPer100}
        onChange={(e) => setMonthlyPer100(e.target.value)}
      />

      {mode === 'rural' && (
        <>
          <input
            type="number"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <select
            onChange={(e) => setDurationUnit(e.target.value)}
            value={durationUnit}
          >
            <option value="months">Months</option>
            <option value="years">Years</option>
            <option value="days">Days</option>
          </select>
          <input
            type="number"
            placeholder="Extra Days (optional)"
            value={extraDays}
            onChange={(e) => setExtraDays(e.target.value)}
          />
        </>
      )}

      {mode === 'calendar' && (
        <>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </>
      )}

      <button onClick={calculate}>Calculate</button>

      {interestAmount && (
        <div style={{ marginTop: '10px' }}>
          <p>Annual Rate: {annualRate}%</p>
          <p>Interest Amount: ₹{interestAmount}</p>
          <p>Total Payable: ₹{totalPayable}</p>
        </div>
      )}
    </div>
  );
};

export default InterestCalculator;
