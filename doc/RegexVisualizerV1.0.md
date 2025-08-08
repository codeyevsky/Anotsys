# 🚀 Regex Visualizer & Tester v1.0

This page is an interactive tool designed to help developers and students understand and build regular expressions. By providing a live, token-based visualization and a real-time testing environment, it demystifies complex regex patterns and allows you to see exactly how they work against your text.

---

## 🔑 Key Features

- **Live Visualization:**  
  As you type a regex pattern, the tool breaks it down into individual components (tokens) and color-codes them. Hover over each token to see a detailed explanation of its function. This visual feedback makes it easy to understand the structure of your pattern.

- **Real-Time Testing:**  
  The "Live Tester" section provides a dynamic environment where you can enter a text string. The tool instantly highlights all matches found by your regex, showing you exactly what your pattern is capturing.

- **Group and Match Details:**  
  For each match, the tool displays not only the full match but also all of the captured groups. This is invaluable for complex patterns where you need to extract specific parts of a string.

- **Interactive Flags:**  
  Easily toggle common regex flags like Global (g), Case-Insensitive (i), and Multi-line (m) to see how they affect your matches in real-time.

- **Replacement Functionality:**  
  A dedicated section allows you to test the replace function of your regex. Enter a replacement string to see the final output after all matches have been substituted.

- **Quick-Access Buttons:**  
  Convenient buttons are available to quickly insert common regex symbols like `\d`, `\w`, `\s`, `*`, `+`, and `?`, speeding up your pattern creation process.

---

## ⚙️ How It Works

This tool is a single-page React application. It uses React hooks like `useState` and `useMemo` to manage the state of the regex pattern, test text, and flags. The core logic resides in a function called `visualizeRegex`, which parses the input pattern and transforms it into a structured array of `TokenItem` objects.

When the pattern or test text changes, `useMemo` efficiently recalculates the visualization and live matches. The `getHighlightedText` function processes the test text and the matches to create the visually highlighted output. This approach ensures a fast and responsive user experience without unnecessary re-renders.

---

## 🧪 Usage

You can use this tool to:

- **Learn and Debug:**  
  Get a deeper understanding of how regular expressions are constructed and debug your own patterns by seeing their components visually.

- **Validate Patterns:**  
  Test if your regex correctly identifies all desired matches in a given text.

- **Develop Extraction Logic:**  
  Pinpoint specific data within a string by observing how your capturing groups are populated.

- **Practice Replacements:**  
  Experiment with different replacement strings and flags to see the final output, which is especially useful for data manipulation tasks.
