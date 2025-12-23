# Camp Milestones Calculator

A tiny static web app that projects Burn Boot Camp Keep Moving Club milestone dates (50/100/150/200/250) and an end-of-year projection based on your current camp count and start date in the current year.

## What It Does

- Projects the calendar dates when you are likely to hit each milestone.
- Calculates an average camps-per-week pace based on your year-to-date attendance.
- Estimates your total camps by Dec 31 if you continue at the same pace.

## How The Math Works

Assumptions (also enforced in the UI):

- Milestones reset on Jan 1.
- Max 1 camp per day.
- Current camp count includes today if you already attended a camp today.
- Start date is your first camp of the current year.

Calculations:

- Elapsed days are counted inclusively (Jan 1 to Jan 1 = 1 day).
- Daily rate = currentCount / elapsedDays, capped at 1 camp/day.
- Average per week = dailyRate \* 7.
- Milestone date:
  - If already reached, back-calculate the date using the same daily rate.
  - If not reached, project forward from today using the daily rate.
- End-of-year projection = currentCount + (dailyRate \* remainingDaysInYear), rounded down.

All date math is done in date-only local time to avoid DST drift.

## Inputs / Outputs

Inputs:

- Current camps attended (number)
- Start date (date within the current year)

Outputs:

- Average camps per week
- Projected milestone dates for 50/100/150/200/250
- Projected end-of-year total

## Project Structure

- `index.html` — Markup and structure
- `styles.css` — Styling
- `main.js` — DOM wiring and UI updates
- `calculator.js` — Date and projection math

## Known Limitations / Disclaimers

- Not an official Burn Boot Camp tool.
- Projections assume a consistent pace; real attendance may vary.
- The calculator does not account for skipped weeks, holidays, or multiple camps in a day (max 1/day).
