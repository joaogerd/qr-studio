import React from "react";
import { cx } from "../utils/canvas.js";

export function Section({ icon, title, subtitle, children }) {
  return (
    <section className="section">
      <div className="section-header">
        {icon}
        <h2 className="section-title">{title}</h2>
      </div>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      {children}
    </section>
  );
}

export function Field({ label, hint, children, style }) {
  return (
    <div className="field" style={style}>
      <label>{label}</label>
      {children}
      {hint ? <small>{hint}</small> : null}
    </div>
  );
}

export function RangeField({ label, valueLabel, value, min, max, step, onChange }) {
  return (
    <div className="range-wrap">
      <div className="range-head">
        <span>{label}</span>
        <span>{valueLabel}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function ToggleButton({ active, onClick, activeLabel, inactiveLabel }) {
  return (
    <button className={cx("toggle", active && "is-active")} onClick={onClick}>
      {active ? activeLabel : inactiveLabel}
    </button>
  );
}
