import React from 'react';
import View from '../types/View';

interface ViewToggleProps {
  view: View;
  setView: Function;
}

function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="btn-group">
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio1"
        autoComplete="off"
        onChange={(e) => setView(View.Calendar)}
        checked={view === View.Calendar}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio1">
        Calendar
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio2"
        autoComplete="off"
        onChange={(e) => setView(View.Manager)}
        checked={view === View.Manager}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio2">
        Manager
      </label>
    </div>
  );
}
export default ViewToggle;
