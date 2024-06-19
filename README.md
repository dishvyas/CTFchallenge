---
# Ramp Challenge Solution

This project is a solution to the Ramp coding challenge. It fetches a flag from a given URL and displays it with a typewriter effect using React.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js)

### Installation

1\. Clone the repository:\
   ```
   git clone <repository-url>
   cd ramp-challenge
   ```

2\. Install the dependencies:\
   ```
   npm install
   ```

### Running the Application

1\. Start the development server:\
   ```
   npm start
   ```

2\. Open your browser and navigate to `http://localhost:3000`.

### Project Structure

- `src/App.js`: Main component that fetches the flag and passes it to `TypewriterEffect`.
- `TypewriterEffect`: Component that displays the flag with a typewriter effect.

### Components

#### `App`

- Fetches the flag from the provided URL.
- Manages loading state.
- Passes the flag to `TypewriterEffect` for display.

#### `TypewriterEffect`

- Receives the flag as a prop.
- Displays the flag one character at a time with a half-second delay.
- Uses `setInterval` to update the displayed text.

### Example Code

Here is the main code used in this project:

```jsx\
import React, { useEffect, useState } from 'react';

const TypewriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    console.log('TypewriterEffect received text:', text); // Debugging: Log the received text\
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        const nextChar = text[currentIndex];
        console.log('Adding character:', nextChar); // Debugging: Log the next character\
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
        console.log('Fetched flag:', result); // Debugging: Log the fetched flag
        setFlag(result.trim()); // Trim any extra whitespaces
      } catch (error) {
        console.error('Error fetching the flag:', error);
      } finally {
        setLoading(false);
      }\
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
```

### License

This project is licensed under the MIT License.

---
