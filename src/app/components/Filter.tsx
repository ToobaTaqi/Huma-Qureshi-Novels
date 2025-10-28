"use client";

import { useState, useEffect } from "react";

type DropdownProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

type ToggleProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

interface FilterProps {
  dropdowns?: DropdownProps[];
  checkboxes?: CheckboxProps[];
  toggle?: ToggleProps | null;
}

export default function Filter({
  dropdowns = [],
  checkboxes = [],
  toggle = null,
}: FilterProps) {
  return (
    <div className="w-full border border-secondary rounded-lg p-4 bg-white/5 backdrop-blur-sm space-y-6">
      {/* Dropdowns */}
      {dropdowns.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {dropdowns.map((dropdown, i) => (
            <div key={i} className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-secondary">
                {dropdown.label}
              </label>
              <select
                value={dropdown.value}
                onChange={(e) => dropdown.onChange(e.target.value)}
                className="bg-transparent border border-secondary rounded-lg px-3 py-2 text-sm text-tertiary focus:outline-none"
              >
                <option value="">Select {dropdown.label}</option>
                {dropdown.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Checkboxes */}
      {checkboxes.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {checkboxes.map((cb, i) => (
            <label
              key={i}
              className="flex items-center gap-2 text-sm text-tertiary"
            >
              <input
                type="checkbox"
                checked={cb.checked}
                onChange={(e) => cb.onChange(e.target.checked)}
                className="accent-primary"
              />
              {cb.label}
            </label>
          ))}
        </div>
      )}

      {/* Toggle */}
      {toggle && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-secondary">{toggle.label}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={toggle.value}
              onChange={(e) => toggle.onChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-checked:bg-primary rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
      )}
    </div>
  );
}
