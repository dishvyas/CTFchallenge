import React, { useEffect, useState } from 'react';

const TypewriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // console.log('TypewriterEffect received text:', text); 
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        const nextChar = text[currentIndex];
        // console.log('Adding character:', nextChar);
        setDisplayedText((prev) => prev + nextChar);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <ul>
      {displayedText.split('').map((char, index) => (
        <li key={index}>{char}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const [flag, setFlag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch('https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/646973');
        const result = await response.text();
        // console.log('Fetched flag:', result); 
        setFlag(result.trim()); 
      } catch (error) {
        console.error('Error fetching the flag:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlag();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TypewriterEffect text={flag} />
      )}
    </div>
  );
};

export default App;

// Script used to to get the URL in step 2
// const codes = document.querySelectorAll('code[data-class^="23"]');

// let url = '';

// codes.forEach(code => {
//   const div = code.querySelector('div[data-tag$="93"]');
//   if (div) {
//     const span = div.querySelector('span[data-id*="21"]');
//     if (span) {
//       const charElement = span.querySelector('i.char');
//       if (charElement && charElement.getAttribute('value')) {
//         url += charElement.getAttribute('value');
//       }
//     }
//   }
// });

// console.log(url);