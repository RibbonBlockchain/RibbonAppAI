import React, { useState } from "react";

const SwitchButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex items-center">
      <label
        htmlFor="toggle"
        className="relative inline-block w-10 mr-2 align-middle select-none"
      >
        <input
          type="checkbox"
          id="toggle"
          name="toggle"
          checked={isDarkMode}
          onChange={toggleTheme}
          className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`}
        />
        <label
          htmlFor="toggle"
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300"
        ></label>
      </label>
    </div>
  );
};

export default SwitchButton;
