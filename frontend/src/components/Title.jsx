import { useEffect, useState } from "react";

const Title = ( {text1} ) => {

  const [storedText, setStoredText] = useState('');

  useEffect(() => {
    if (text1) {
      setStoredText(text1.toUpperCase());
    }
  }, [text1]);

  return (
    <div className="inline-flex gap-2 items-center mb-2">
      <p className="text-gray-500">
        {storedText}
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Title;