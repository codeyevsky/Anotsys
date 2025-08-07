export const regexLibraryData = [
  // Web Category
  {
    id: 1,
    category: "Web",
    name: "Email Address",
    pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    description: "Matches a valid email address.",
    example: "test@example.com",
    flags: ""
  },
  {
    id: 2,
    category: "Web",
    name: "URL",
    pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
    description: "Matches a URL. Can start with http or https.",
    example: "https://www.google.com",
    flags: ""
  },
  {
    id: 3,
    category: "Web",
    name: "IP Address (v4)",
    pattern: "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
    description: "Matches a valid IPv4 address.",
    example: "192.168.1.1",
    flags: ""
  },
  {
    id: 4,
    category: "Web",
    name: "Subdomain",
    pattern: "^([a-z0-9]+\\.)+[a-z0-9]+$",
    description: "Matches a subdomain. e.g. blog.example.com",
    example: "api.sub.example.co.uk",
    flags: "i"
  },
  {
    id: 19,
    category: "Web",
    name: "HTTP/HTTPS Protocol",
    pattern: "https?:\/\/",
    description: "Matches the 'http://' or 'https://' part of a URL.",
    example: "https://",
    flags: ""
  },
  {
    id: 20,
    category: "Web",
    name: "Anchor Tag href Attribute",
    pattern: "<a\\s+(?:[^>]*?\\s+)?href=([\"'])(.*?)\\1",
    description: "Extracts the 'href' attribute value from an HTML anchor tag.",
    example: "<a href='https://example.com'>Link</a>",
    flags: "i"
  },
  {
    id: 29,
    category: "Web",
    name: "HTML Image Tag",
    pattern: "<img(?:\\s[^>]*)src=[\"'](.*?)\"'.*?>",
    description: "Matches an HTML img tag and captures the src attribute.",
    example: "<img src='path/to/image.jpg' alt='My image'>",
    flags: "i"
  },
  {
    id: 30,
    category: "Web",
    name: "Username (Alphanumeric)",
    pattern: "^[a-zA-Z0-9_]{3,16}$",
    description: "Matches an alphanumeric username between 3 and 16 characters long.",
    example: "user_name123",
    flags: ""
  },
  {
    id: 31,
    category: "Web",
    name: "Password (Strong)",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    description: "Matches a strong password with at least one uppercase, lowercase, number, special character, and a minimum length of 8.",
    example: "P@ssw0rd123!",
    flags: ""
  },
  {
    id: 42,
    category: "Web",
    name: "HTML Comment",
    pattern: "",
    description: "Matches an HTML comment, including multi-line comments.",
    example: "",
    flags: ""
  },
  {
    id: 43,
    category: "Web",
    name: "CSS Hex Color",
    pattern: "^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
    description: "Matches a 3 or 6 digit hexadecimal CSS color code.",
    example: "#F5F5F5",
    flags: ""
  },
  {
    id: 44,
    category: "Web",
    name: "Domain Name",
    pattern: "^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$",
    description: "Matches a valid domain name (e.g., example.com).",
    example: "google.com",
    flags: "i"
  },
  {
    id: 45,
    category: "Web",
    name: "URL Query Parameters",
    pattern: "[?&]([^=]+)=([^&#]*)",
    description: "Extracts key-value pairs from a URL's query string.",
    example: "url?q=test&page=1",
    flags: "g"
  },
  {
    id: 46,
    category: "Web",
    name: "IPv6 Address",
    pattern: "(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))",
    description: "Matches a valid IPv6 address.",
    example: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    flags: ""
  },
  {
    id: 73,
    category: "Web",
    name: "Social Media Handle",
    pattern: "@([a-zA-Z0-9_]{1,15})",
    description: "Matches common social media handles (e.g., Twitter, Instagram).",
    example: "@elonmusk",
    flags: "g"
  },
  {
    id: 74,
    category: "Web",
    name: "Session ID / Cookie",
    pattern: "JSESSIONID=\\w+|PHPSESSID=\\w+",
    description: "Matches common session IDs in URLs or headers.",
    example: "PHPSESSID=abcdef12345",
    flags: ""
  },
  {
    id: 75,
    category: "Web",
    name: "Robots.txt Disallow",
    pattern: "Disallow: (.*)",
    description: "Matches and extracts the path from a Disallow directive in a robots.txt file.",
    example: "Disallow: /admin/",
    flags: ""
  },
  {
    id: 76,
    category: "Web",
    name: "HTTP Status Code",
    pattern: "\\b(100|101|102|200|201|202|203|204|205|206|207|208|226|300|301|302|303|304|305|307|308|400|401|402|403|404|405|406|407|408|409|410|411|412|413|414|415|416|417|418|421|422|423|424|425|426|428|429|431|451|500|501|502|503|504|505|506|507|508|510|511)\\b",
    description: "Matches a valid HTTP status code.",
    example: "404",
    flags: ""
  },
  {
    id: 77,
    category: "Web",
    name: "YouTube Video ID",
    pattern: "(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([^&\\n?#]+)",
    description: "Extracts the video ID from a YouTube URL.",
    example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    flags: ""
  },
  {
    id: 104,
    category: "Web",
    name: "Google Analytics Tracking ID",
    pattern: "^UA-\\d{4,9}-\\d{1,4}$",
    description: "Matches a Google Analytics Universal Analytics tracking ID.",
    example: "UA-12345678-1",
    flags: ""
  },
  {
    id: 105,
    category: "Web",
    name: "HTML Character Entity",
    pattern: "&[a-z]+;|&#[0-9]+;",
    description: "Matches an HTML character entity (e.g., &amp; or &#169;).",
    example: "Copyright &copy;",
    flags: "g"
  },
  {
    id: 106,
    category: "Web",
    name: "XML Tag",
    pattern: "<([a-z]+)>(.*?)<\\/\\1>",
    description: "Matches a simple XML tag.",
    example: "<book>Title</book>",
    flags: "i"
  },
  {
    id: 107,
    category: "Web",
    name: "WebP Image Extension",
    pattern: "\\.webp$",
    description: "Matches the file extension for a WebP image.",
    example: "image.webp",
    flags: "i"
  },
  {
    id: 108,
    category: "Web",
    name: "URL Path",
    pattern: "(?<=https?:\\/\\/.*?)\\/.*",
    description: "Extracts the path from a URL, including query parameters.",
    example: "/products/item?id=123",
    flags: ""
  },
  {
    id: 109,
    category: "Web",
    name: "CSS Variable",
    pattern: "var\\(--[a-zA-Z0-9\\-]+?\\)",
    description: "Matches a CSS custom property (variable).",
    example: "color: var(--main-color);",
    flags: "g"
  },
  {
    id: 178,
    category: "Web",
    name: "HTML Attribute Name",
    pattern: "\\b([a-zA-Z_][a-zA-Z0-9_-]*)=['\"]",
    description: "Finds the name of an attribute in an HTML tag.",
    example: "<div data-id='123'>",
    flags: "g"
  },
  {
    id: 179,
    category: "Web",
    name: "HTML Tag (Generic)",
    pattern: "<\\/?([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>",
    description: "Matches any HTML tag, open or close.",
    example: "<body><p>Text</p></body>",
    flags: "g"
  },
  {
    id: 180,
    category: "Web",
    name: "Full Email (User and Domain)",
    pattern: "([^@]+)@([^@]+)",
    description: "Separates an email address into username and domain parts.",
    example: "user@domain.com",
    flags: ""
  },
  {
    id: 181,
    category: "Web",
    name: "Facebook Profile URL",
    pattern: "facebook.com\\/(?:profile\\.php\\?id=|(?![A-z]+\\/)([^\\/]+))",
    description: "Matches a Facebook profile URL.",
    example: "facebook.com/john.doe.123",
    flags: "i"
  },
  {
    id: 182,
    category: "Web",
    name: "LinkedIn Profile URL",
    pattern: "linkedin.com\\/in\\/([a-zA-Z0-9_-]+)",
    description: "Matches a LinkedIn profile URL.",
    example: "linkedin.com/in/john-doe-12345",
    flags: "i"
  },
  {
    id: 183,
    category: "Web",
    name: "Twitter Handle URL",
    pattern: "twitter.com\\/([a-zA-Z0-9_]{1,15})",
    description: "Matches a Twitter profile URL.",
    example: "twitter.com/elonmusk",
    flags: "i"
  },
  {
    id: 184,
    category: "Web",
    name: "HTML/CSS Color (RGB)",
    pattern: "rgb\\s*\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*\\)",
    description: "Matches an RGB color value in CSS.",
    example: "rgb(255, 0, 128)",
    flags: ""
  },

  // Numbers Category
  {
    id: 5,
    category: "Numbers",
    name: "Phone Number (US)",
    pattern: "^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$",
    description: "Matches a 10-digit US phone number format.",
    example: "(123) 456-7890",
    flags: ""
  },
  {
    id: 6,
    category: "Numbers",
    name: "Credit Card Number",
    pattern: "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$",
    description: "Matches common credit card numbers.",
    example: "4567-8901-2345-6789",
    flags: ""
  },
  {
    id: 7,
    category: "Numbers",
    name: "Positive or Negative Numbers",
    pattern: "^-?\\d+(\\.\\d+)?$",
    description: "Matches positive, negative integers, and decimals.",
    example: "-123.45",
    flags: ""
  },
  {
    id: 8,
    category: "Numbers",
    name: "Currency ($)",
    pattern: "^\\$?(\\d{1,3}(,\\d{3})*|\\d+)(\\.\\d{2})?$",
    description: "Matches valid currency values with an optional dollar sign ($).",
    example: "$1,234.56",
    flags: ""
  },
  {
    id: 21,
    category: "Numbers",
    name: "Hexadecimal Value",
    pattern: "^#?([0-9a-fA-F]{3}){1,2}$",
    description: "Matches 3 or 6 digit hexadecimal values with an optional '#'.",
    example: "#FF5733",
    flags: ""
  },
  {
    id: 22,
    category: "Numbers",
    name: "ZIP Code (US)",
    pattern: "^\\d{5}(?:[-\\s]\\d{4})?$",
    description: "Matches a 5-digit US ZIP code with an optional 4-digit extension.",
    example: "12345-6789",
    flags: ""
  },
  {
    id: 32,
    category: "Numbers",
    name: "Social Security Number",
    pattern: "^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$",
    description: "Matches a valid US Social Security Number format.",
    example: "123-45-6789",
    flags: ""
  },
  {
    id: 33,
    category: "Numbers",
    name: "Canadian Postal Code",
    pattern: "^[A-Z]\\d[A-Z]\\s\\d[A-Z]\\d$",
    description: "Matches a valid Canadian Postal Code format (e.g., M5V 1J7).",
    example: "M5V 1J7",
    flags: ""
  },
  {
    id: 47,
    category: "Numbers",
    name: "Floating Point Number",
    pattern: "^[-+]?[0-9]*\\.?[0-9]+$",
    description: "Matches positive, negative, and decimal floating point numbers.",
    example: "3.14159",
    flags: ""
  },
  {
    id: 48,
    category: "Numbers",
    name: "Comma Separated Numbers",
    pattern: "^(\\d+(,\\d+)*)$",
    description: "Matches a list of numbers separated by commas.",
    example: "1,2,3,4,5",
    flags: ""
  },
  {
    id: 49,
    category: "Numbers",
    name: "ISBN (10 or 13)",
    pattern: "(?:ISBN(?:-13)?:\\s?|ISBN(?:-10)?:\\s?)(?=[0-9X]{10}|(?=(?:[0-9]+[-\\s]){3})[-\\s0-9X]{13})(?:97[89][-\\s]?)?[0-9]{1,5}[-\\s]?[0-9]+[-\\s]?[0-9]+[-\\s]?[0-9X]$",
    description: "Matches a valid 10 or 13 digit ISBN number.",
    example: "978-3-16-148410-0",
    flags: "i"
  },
  {
    id: 50,
    category: "Numbers",
    name: "Credit Card Expiry",
    pattern: "^(0[1-9]|1[0-2])\\/?([0-9]{2})$",
    description: "Matches a credit card expiry date in MM/YY format.",
    example: "12/25",
    flags: ""
  },
  {
    id: 78,
    category: "Numbers",
    name: "Roman Numerals",
    pattern: "^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$",
    description: "Matches a Roman numeral from 1 to 3999.",
    example: "MCMXCIX",
    flags: ""
  },
  {
    id: 79,
    category: "Numbers",
    name: "Currency (Euro)",
    pattern: "^(€|EUR)?\\s*\\d{1,3}(?:[\\s\\.,]\\d{3})*(?:[\\.,]\\d{2})?$",
    description: "Matches valid Euro currency values.",
    example: "€1.234.567,89",
    flags: "i"
  },
  {
    id: 80,
    category: "Numbers",
    name: "Binary Number",
    pattern: "^[01]+$",
    description: "Matches a binary number (composed of only 0s and 1s).",
    example: "101101",
    flags: ""
  },
  {
    id: 81,
    category: "Numbers",
    name: "Hexadecimal Number",
    pattern: "^[0-9a-fA-F]+$",
    description: "Matches a hexadecimal number.",
    example: "A3F0C5",
    flags: ""
  },
  {
    id: 110,
    category: "Numbers",
    name: "Percentage",
    pattern: "^\\d{1,3}(?:\\.\\d+)?%?$",
    description: "Matches a percentage value with an optional '%' symbol.",
    example: "95.5%",
    flags: ""
  },
  {
    id: 111,
    category: "Numbers",
    name: "Phone Number (UK)",
    pattern: "^(?:0|\\+?44)\\s?\\d{4}\\s?\\d{6}$",
    description: "Matches a standard 11-digit UK phone number.",
    example: "+44 1234 567890",
    flags: ""
  },
  {
    id: 112,
    category: "Numbers",
    name: "Latitude/Longitude",
    pattern: "^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$",
    description: "Matches a pair of valid latitude and longitude coordinates.",
    example: "40.7128, -74.0060",
    flags: ""
  },
  {
    id: 113,
    category: "Numbers",
    name: "Exponential Notation",
    pattern: "^[-+]?[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?$",
    description: "Matches a number in scientific notation (e.g., 1.23e-4).",
    example: "1.23e-4",
    flags: ""
  },
  {
    id: 185,
    category: "Numbers",
    name: "Phone Number (Japan)",
    pattern: "^0\\d{1,4}[ -]?\\d{1,4}[ -]?\\d{4}$",
    description: "Matches a Japanese phone number format.",
    example: "03-1234-5678",
    flags: ""
  },
  {
    id: 186,
    category: "Numbers",
    name: "Phone Number (Germany)",
    pattern: "^\\+49\\s?(\\d{2,5}\\s?)\\d{4,9}$",
    description: "Matches a German phone number format.",
    example: "+49 30 12345678",
    flags: ""
  },
  {
    id: 187,
    category: "Numbers",
    name: "Positive Integer",
    pattern: "^[1-9]\\d*$",
    description: "Matches a positive integer (greater than 0).",
    example: "123",
    flags: ""
  },
  {
    id: 188,
    category: "Numbers",
    name: "Negative Integer",
    pattern: "^-\\d+$",
    description: "Matches a negative integer.",
    example: "-456",
    flags: ""
  },
  {
    id: 189,
    category: "Numbers",
    name: "Integer Range",
    pattern: "\\b(10[0-5]|10[0-4]|\\d{1,2}|9[0-9]|100)\\b",
    description: "Matches a number between 0 and 105.",
    example: "The value is 50",
    flags: "g"
  },
  {
    id: 190,
    category: "Numbers",
    name: "Indian Postal Index Number (PIN)",
    pattern: "^[1-9][0-9]{5}$",
    description: "Matches a 6-digit Indian Postal Index Number.",
    example: "110001",
    flags: ""
  },
  {
    id: 191,
    category: "Numbers",
    name: "Australian Postcode",
    pattern: "^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-89][0-9]{2})|(7[0-4][0-9]{2})|(8[0-9]{3})$",
    description: "Matches a 4-digit Australian postcode.",
    example: "2000",
    flags: ""
  },

  // Text Category
  {
    id: 9,
    category: "Text",
    name: "Remove HTML Tags",
    pattern: "<[^>]*>",
    description: "Matches and removes HTML tags from text.",
    example: "<h1>Title</h1>",
    flags: "g"
  },
  {
    id: 10,
    category: "Text",
    name: "Trim Whitespace",
    pattern: "\\s+",
    description: "Replaces multiple consecutive spaces with a single space.",
    example: "too much    whitespace",
    flags: "g"
  },
  {
    id: 11,
    category: "Text",
    name: "Markdown Headings",
    pattern: "^#{1,6}(?!#)(.*)",
    description: "Matches Markdown headings (e.g., # Heading, ## Subheading).",
    example: "### This is a heading",
    flags: "gm"
  },
  {
    id: 23,
    category: "Text",
    name: "Extract Hashtags",
    pattern: "#(\\w+)",
    description: "Matches and extracts hashtags from a string.",
    example: "This is a great day! #sunny #beach",
    flags: "g"
  },
  {
    id: 24,
    category: "Text",
    name: "Uppercase Words",
    pattern: "\\b[A-Z]{2,}\\b",
    description: "Matches words that are entirely in uppercase.",
    example: "This is IMPORTANT and URGENT!",
    flags: "g"
  },
  {
    id: 34,
    category: "Text",
    name: "Extract UUID",
    pattern: "[0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12}",
    description: "Matches a valid UUID (Universally Unique Identifier).",
    example: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
    flags: ""
  },
  {
    id: 35,
    category: "Text",
    name: "Alphanumeric String",
    pattern: "^[a-zA-Z0-9]+$",
    description: "Matches a string containing only letters and numbers.",
    example: "helloWorld123",
    flags: ""
  },
  {
    id: 51,
    category: "Text",
    name: "Sentence End",
    pattern: "[.?!]\\s",
    description: "Matches the end of a sentence (period, question mark, or exclamation point followed by a space).",
    example: "Hello world.",
    flags: "g"
  },
  {
    id: 52,
    category: "Text",
    name: "Capitalized Words",
    pattern: "\\b[A-Z][a-z]*\\b",
    description: "Matches words that begin with a capital letter.",
    example: "Hello World",
    flags: "g"
  },
  {
    id: 53,
    category: "Text",
    name: "Any Word",
    pattern: "\\b\\w+\\b",
    description: "Matches any single word.",
    example: "A word here",
    flags: "g"
  },
  {
    id: 54,
    category: "Text",
    name: "JSON Key",
    pattern: '"([^"]*)":',
    description: "Extracts keys from a JSON object.",
    example: '{"key": "value"}',
    flags: "g"
  },
  {
    id: 82,
    category: "Text",
    name: "Remove Trailing Whitespace",
    pattern: "\\s+$",
    description: "Removes whitespace from the end of a line.",
    example: "some text   ",
    flags: "m"
  },
  {
    id: 83,
    category: "Text",
    name: "Starts with Letter, Ends with Number",
    pattern: "^[a-zA-Z].*[0-9]$",
    description: "Matches a string that begins with a letter and ends with a number.",
    example: "TestString123",
    flags: ""
  },
  {
    id: 84,
    category: "Text",
    name: "Quoted String",
    pattern: '"([^"]*)"',
    description: "Matches a string enclosed in double quotes.",
    example: 'This is a "quoted string".',
    flags: "g"
  },
  {
    id: 85,
    category: "Text",
    name: "Hyphenated Words",
    pattern: "\\b[a-zA-Z]+-[a-zA-Z]+\\b",
    description: "Matches words connected by a hyphen.",
    example: "This is a well-known fact.",
    flags: "g"
  },
  {
    id: 86,
    category: "Text",
    name: "Find All Emojis",
    pattern: "[\\u00A9\\u00AE\\u2000-\\u3300\\uD83C-\\uDBFF\\uDC00-\\uDFFF]",
    description: "Matches common emoji characters.",
    example: "This is a smiley face 😊",
    flags: "g"
  },
  {
    id: 114,
    category: "Text",
    name: "Find and Replace Accented Characters",
    pattern: "[À-ÿ]",
    description: "Finds accented characters to replace them with their unaccented counterparts.",
    example: "Café",
    flags: "g"
  },
  {
    id: 115,
    category: "Text",
    name: "Find all Vowels",
    pattern: "[aeiouy]",
    description: "Finds all vowels in a string.",
    example: "Hello World",
    flags: "gi"
  },
  {
    id: 116,
    category: "Text",
    name: "Extract all Numbers",
    pattern: "\\d+",
    description: "Extracts all numbers from a string.",
    example: "The price is $100 for 2 items.",
    flags: "g"
  },
  {
    id: 117,
    category: "Text",
    name: "Remove non-alphanumeric characters",
    pattern: "[^a-zA-Z0-9 ]",
    description: "Removes any character that is not a letter, number, or space.",
    example: "Hello, World! 123",
    flags: "g"
  },
  {
    id: 118,
    category: "Text",
    name: "Find all words of a specific length",
    pattern: "\\b\\w{5}\\b",
    description: "Finds all words that are exactly 5 characters long.",
    example: "Hello, world!",
    flags: "g"
  },
  {
    id: 119,
    category: "Text",
    name: "Find all special characters",
    pattern: "[^a-zA-Z0-9\\s]",
    description: "Finds any character that is not a letter, number, or space.",
    example: "Hello, World! 123",
    flags: "g"
  },
  {
    id: 192,
    category: "Text",
    name: "Remove Punctuation",
    pattern: "[.,!?;:]",
    description: "Removes common punctuation marks.",
    example: "Hello, world!",
    flags: "g"
  },
  {
    id: 193,
    category: "Text",
    name: "Match Blank Lines",
    pattern: "^\\s*$",
    description: "Matches lines that are completely empty or contain only whitespace.",
    example: "Hello\n\nWorld",
    flags: "gm"
  },
  {
    id: 194,
    category: "Text",
    name: "Remove Line Breaks",
    pattern: "(\\r\\n|\\r|\\n)",
    description: "Removes all line break characters.",
    example: "Line 1\nLine 2",
    flags: "g"
  },
  {
    id: 195,
    category: "Text",
    name: "Find All Uppercase Letters",
    pattern: "[A-Z]",
    description: "Finds all uppercase letters.",
    example: "Hello WORLD",
    flags: "g"
  },
  {
    id: 196,
    category: "Text",
    name: "Find All Lowercase Letters",
    pattern: "[a-z]",
    description: "Finds all lowercase letters.",
    example: "Hello WORLD",
    flags: "g"
  },
  {
    id: 197,
    category: "Text",
    name: "Extract All Sentences",
    pattern: "([^.!?]+[.!?])",
    description: "Extracts individual sentences from a paragraph.",
    example: "First sentence. Second sentence!",
    flags: "g"
  },
  {
    id: 198,
    category: "Text",
    name: "Extract All Words",
    pattern: "\\b[a-zA-Z]+\\b",
    description: "Extracts all words from a string.",
    example: "Hello, world!",
    flags: "g"
  },

  // Date & Time Category
  {
    id: 12,
    category: "Date & Time",
    name: "Date (DD/MM/YYYY)",
    pattern: "^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\\d{4}$",
    description: "Matches dates in DD/MM/YYYY format.",
    example: "31/12/2023",
    flags: ""
  },
  {
    id: 13,
    category: "Date & Time",
    name: "Date (YYYY-MM-DD)",
    pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
    description: "Matches dates in YYYY-MM-DD format.",
    example: "2023-12-31",
    flags: ""
  },
  {
    id: 14,
    category: "Date & Time",
    name: "24-Hour Time Format",
    pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
    description: "Matches 24-hour time format (e.g., 15:30).",
    example: "23:59",
    flags: ""
  },
  {
    id: 25,
    category: "Date & Time",
    name: "Time with Seconds",
    pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$",
    description: "Matches time in HH:MM:SS format.",
    example: "12:30:45",
    flags: ""
  },
  {
    id: 36,
    category: "Date & Time",
    name: "12-Hour Time Format (AM/PM)",
    pattern: "^(1[0-2]|0?[1-9]):([0-5][0-9])\\s?(AM|PM)$",
    description: "Matches 12-hour time with AM or PM (e.g., 03:05 PM).",
    example: "03:05 PM",
    flags: "i"
  },
  {
    id: 37,
    category: "Date & Time",
    name: "ISO 8601 Date",
    pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z$",
    description: "Matches a date in the ISO 8601 format.",
    example: "2023-08-07T14:30:00.000Z",
    flags: ""
  },
  {
    id: 55,
    category: "Date & Time",
    name: "Date (MM/DD/YYYY)",
    pattern: "^(0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/]\\d{4}$",
    description: "Matches dates in MM/DD/YYYY format.",
    example: "12/31/2023",
    flags: ""
  },
  {
    id: 56,
    category: "Date & Time",
    name: "Year",
    pattern: "^(19|20)\\d{2}$",
    description: "Matches a 4-digit year from 1900 to 2099.",
    example: "2023",
    flags: ""
  },
  {
    id: 57,
    category: "Date & Time",
    name: "Unix Timestamp",
    pattern: "^\\d{10}$",
    description: "Matches a 10-digit Unix timestamp.",
    example: "1672531200",
    flags: ""
  },
  {
    id: 87,
    category: "Date & Time",
    name: "Time Zone Abbreviation",
    pattern: "\\b[A-Z]{3,5}\\b",
    description: "Matches a 3 to 5 letter time zone abbreviation (e.g., GMT, PST).",
    example: "This is PST",
    flags: "g"
  },
  {
    id: 88,
    category: "Date & Time",
    name: "Month Name",
    pattern: "(January|February|March|April|May|June|July|August|September|October|November|December)",
    description: "Matches the full name of a month.",
    example: "January 1st, 2024",
    flags: "i"
  },
  {
    id: 89,
    category: "Date & Time",
    name: "Time Offset",
    pattern: "GMT[+-][0-9]{1,2}:[0-9]{2}",
    description: "Matches a time offset in the GMT format (e.g., GMT+02:00).",
    example: "GMT+03:00",
    flags: ""
  },
  {
    id: 120,
    category: "Date & Time",
    name: "Day of the Week",
    pattern: "(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)",
    description: "Matches the full name of a day of the week.",
    example: "Monday",
    flags: "i"
  },
  {
    id: 121,
    category: "Date & Time",
    name: "Date (DD-MM-YYYY)",
    pattern: "^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-\\d{4}$",
    description: "Matches dates in DD-MM-YYYY format.",
    example: "31-12-2023",
    flags: ""
  },
  {
    id: 122,
    category: "Date & Time",
    name: "Time with Milliseconds",
    pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}$",
    description: "Matches time in HH:MM:SS.sss format.",
    example: "12:30:45.123",
    flags: ""
  },
  {
    id: 199,
    category: "Date & Time",
    name: "Relative Time (e.g., 3 days ago)",
    pattern: "\\d+\\s+(seconds?|minutes?|hours?|days?|weeks?|months?|years?)\\s+ago",
    description: "Matches common relative time expressions.",
    example: "3 days ago",
    flags: "i"
  },
  {
    id: 200,
    category: "Date & Time",
    name: "Date (Day Month Year)",
    pattern: "^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \\d{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \\d{4}$",
    description: "Matches dates in a specific format like 'Mon, 07 Aug 2023'.",
    example: "Mon, 07 Aug 2023",
    flags: ""
  },
  {
    id: 201,
    category: "Date & Time",
    name: "Time Range",
    pattern: "(\\d{1,2}:\\d{2})\\s*-\\s*(\\d{1,2}:\\d{2})",
    description: "Matches a time range (e.g., 9:00-17:00).",
    example: "9:00 - 17:00",
    flags: ""
  },
  {
    id: 202,
    category: "Date & Time",
    name: "Date (German)",
    pattern: "^(0?[1-9]|[12][0-9]|3[01])\\.(0?[1-9]|1[012])\\.\\d{4}$",
    description: "Matches dates in DD.MM.YYYY format.",
    example: "31.12.2023",
    flags: ""
  },
  
  // Programming Category
  {
    id: 15,
    category: "Programming",
    name: "JavaScript Function Names",
    pattern: "function\\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*\\(",
    description: "Matches function names defined in JavaScript.",
    example: "function myFunc() { ... }",
    flags: "g"
  },
  {
    id: 16,
    category: "Programming",
    name: "Python Imports",
    pattern: "^(from\\s+[a-zA-Z_\\.]+\\s+)?import\\s+([a-zA-Z_\\.\\s,]+)$",
    description: "Matches `import` statements in Python.",
    example: "from os import path",
    flags: "gm"
  },
  {
    id: 26,
    category: "Programming",
    name: "Variable Assignment",
    pattern: "(\\w+)\\s*=\\s*(.+)",
    description: "Matches simple variable assignments in various languages.",
    example: "let myVar = 'value';",
    flags: "g"
  },
  {
    id: 27,
    category: "Programming",
    name: "Single-line Comment",
    pattern: "\\/\\/.*",
    description: "Matches single-line comments starting with '//'.",
    example: "// This is a comment",
    flags: "g"
  },
  {
    id: 38,
    category: "Programming",
    name: "C++ Include Directive",
    pattern: "#include\\s*<(.+)>",
    description: "Matches and extracts the header file name from a C++ include directive.",
    example: "#include <iostream>",
    flags: ""
  },
  {
    id: 39,
    category: "Programming",
    name: "CSS Selector",
    pattern: "([.#]?[-_a-zA-Z0-9\\*]+)",
    description: "Matches common CSS selectors like classes, IDs, and element names.",
    example: "#my-id, .my-class, div",
    flags: "g"
  },
  {
    id: 58,
    category: "Programming",
    name: "C-style Multi-line Comment",
    pattern: "\\/\\*([^*]|\\*[^/])*\\*\\/",
    description: "Matches C-style multi-line comments.",
    example: "/* This is a multi-line comment */",
    flags: "g"
  },
  {
    id: 59,
    category: "Programming",
    name: "Function Call",
    pattern: "\\b([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*\\((.*)\\)",
    description: "Matches a function call and captures the name and arguments.",
    example: "console.log('hello');",
    flags: "g"
  },
  {
    id: 60,
    category: "Programming",
    name: "HTML Tag with Attributes",
    pattern: "<([a-z]+)([^>]*?)>([\\s\\S]*?)<\\/\\1>",
    description: "Matches an HTML tag and captures its name, attributes, and content.",
    example: "<div class='test'>Content</div>",
    flags: "i"
  },
  {
    id: 61,
    category: "Programming",
    name: "Python Class Definition",
    pattern: "class\\s+([a-zA-Z_]\\w*)\\s*:",
    description: "Matches and extracts the class name from a Python class definition.",
    example: "class MyClass:",
    flags: ""
  },
  {
    id: 62,
    category: "Programming",
    name: "JSON Object",
    pattern: "\\{.*?\\}",
    description: "Matches a JSON object.",
    example: '{"key": "value"}',
    flags: "g"
  },
  {
    id: 90,
    category: "Programming",
    name: "XML Tag",
    pattern: "<([a-z]+)>(.*?)<\\/\\1>",
    description: "Matches a simple XML tag.",
    example: "<book>Title</book>",
    flags: "i"
  },
  {
    id: 91,
    category: "Programming",
    name: "Java Package",
    pattern: "package\\s+([a-z_][a-z0-9_]*(\\.[a-z_][a-z0-9_]*)*);",
    description: "Matches a Java package declaration.",
    example: "package com.example.app;",
    flags: ""
  },
  {
    id: 92,
    category: "Programming",
    name: "C# Class Definition",
    pattern: "public\\s+class\\s+([a-zA-Z_]\\w*)",
    description: "Matches and extracts the class name from a C# class definition.",
    example: "public class MyClass",
    flags: ""
  },
  {
    id: 93,
    category: "Programming",
    name: "SQL SELECT Statement",
    pattern: "SELECT\\s+(.*)\\s+FROM\\s+([a-zA-Z_]\\w*)",
    description: "Matches a basic SQL SELECT statement.",
    example: "SELECT id, name FROM users",
    flags: "i"
  },
  {
    id: 94,
    category: "Programming",
    name: "JS Console Log",
    pattern: "console\\.log\\((.*)\\);",
    description: "Finds and extracts the content of a `console.log()` statement.",
    example: "console.log('Hello World');",
    flags: "g"
  },
  {
    id: 123,
    category: "Programming",
    name: "Python Function Definition",
    pattern: "def\\s+([a-zA-Z_]\\w*)\\s*\\(.*\\):",
    description: "Matches a Python function definition.",
    example: "def my_function(arg1):",
    flags: ""
  },
  {
    id: 124,
    category: "Programming",
    name: "JSON String",
    pattern: '"[a-zA-Z0-9_]+":\\s*"[^"]*"',
    description: "Matches a key-value pair where the value is a string in JSON.",
    example: '"name": "John Doe"',
    flags: ""
  },
  {
    id: 125,
    category: "Programming",
    name: "Python F-String",
    pattern: 'f".*?"',
    description: "Matches a Python formatted string literal.",
    example: 'f"Hello {name}"',
    flags: ""
  },
  {
    id: 126,
    category: "Programming",
    name: "Ruby Method Definition",
    pattern: "def\\s+([a-z_]\\w*)",
    description: "Matches a Ruby method definition.",
    example: "def my_method",
    flags: ""
  },
  {
    id: 127,
    category: "Programming",
    name: "Java Annotation",
    pattern: "@[A-Z][a-zA-Z]*",
    description: "Matches a Java annotation (e.g., @Override).",
    example: "@Override",
    flags: ""
  },
  {
    id: 128,
    category: "Programming",
    name: "HTML Tag (Self-Closing)",
    pattern: "<([a-z]+)[^>]*\\/>",
    description: "Matches a self-closing HTML tag like <img> or <br>.",
    example: "<img src='image.jpg' />",
    flags: "i"
  },
  {
    id: 129,
    category: "Programming",
    name: "JavaScript `import` statement",
    pattern: "import\\s+.*\\s+from\\s+['\"].*['\"]",
    description: "Matches a JavaScript `import` statement.",
    example: "import { useState } from 'react';",
    flags: ""
  },
  {
    id: 203,
    category: "Programming",
    name: "Find All `//` Comments",
    pattern: "//.*",
    description: "Finds all C-style single-line comments.",
    example: "// This is a comment",
    flags: "g"
  },
  {
    id: 204,
    category: "Programming",
    name: "Find all `/* ... */` Comments",
    pattern: "\\/\\*.*?\\*\\/",
    description: "Finds all multi-line comments in languages like C, Java, and JavaScript.",
    example: "/* this is\na multi-line comment */",
    flags: "gs"
  },
  {
    id: 205,
    category: "Programming",
    name: "Rust `let` statement",
    pattern: "let\\s+([a-z_]\\w*)",
    description: "Matches a `let` statement in Rust.",
    example: "let my_variable = 1;",
    flags: "g"
  },
  {
    id: 206,
    category: "Programming",
    name: "Go `func` statement",
    pattern: "func\\s+([a-z_]\\w*)\\s*\\(",
    description: "Matches a function definition in Go.",
    example: "func myFunc() { ... }",
    flags: "g"
  },
  {
    id: 207,
    category: "Programming",
    name: "Kotlin `fun` statement",
    pattern: "fun\\s+([a-z_]\\w*)\\s*\\(",
    description: "Matches a function definition in Kotlin.",
    example: "fun myFunction() { ... }",
    flags: "g"
  },
  {
    id: 208,
    category: "Programming",
    name: "JavaScript `const` and `let`",
    pattern: "(const|let)\\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*=",
    description: "Finds variable declarations with `const` or `let` in JavaScript.",
    example: "const myConst = 'value';",
    flags: "g"
  },
  {
    id: 209,
    category: "Programming",
    name: "SQL `CREATE TABLE`",
    pattern: "CREATE\\s+TABLE\\s+([a-zA-Z_]\\w*)",
    description: "Matches the `CREATE TABLE` statement and extracts the table name.",
    example: "CREATE TABLE users (",
    flags: "i"
  },
  {
    id: 210,
    category: "Programming",
    name: "C# `using` statement",
    pattern: "using\\s+([a-zA-Z_]\\w*(\\.[a-zA-Z_]\\w*)*);",
    description: "Matches a C# using directive.",
    example: "using System.Text;",
    flags: ""
  },
  {
    id: 211,
    category: "Programming",
    name: "HTML Data Attributes",
    pattern: "data-([a-zA-Z0-9_-]+)=\"(.*?)\"",
    description: "Extracts HTML5 data attribute names and values.",
    example: "<div data-user-id=\"123\"></div>",
    flags: "g"
  },
  {
    id: 212,
    category: "Programming",
    name: "YAML Array",
    pattern: "^\\s*-\\s*(.*)$",
    description: "Matches a single item in a YAML list/array.",
    example: "- item 1",
    flags: "gm"
  },

  // File Category
  {
    id: 17,
    category: "File",
    name: "File Extension",
    pattern: "\\.([a-zA-Z0-9]+)$",
    description: "Matches the extension at the end of a file name.",
    example: "document.pdf",
    flags: ""
  },
  {
    id: 18,
    category: "File",
    name: "Match All Paths",
    pattern: "([\\w\\/\\.\\-]+)",
    description: "Matches file paths and file names.",
    example: "C:\\Users\\user\\Desktop\\file.txt",
    flags: "g"
  },
  {
    id: 28,
    category: "File",
    name: "File Name without Extension",
    pattern: "^([^\\/\\\\]+)\\.([^\\.]+)$",
    description: "Extracts the filename and extension separately from a path.",
    example: "my_document.txt",
    flags: ""
  },
  {
    id: 40,
    category: "File",
    name: "Windows File Path",
    pattern: "([A-Z]:\\\\([a-zA-Z0-9\\s_\\-\\\\.])+)",
    description: "Matches a typical Windows file path starting with a drive letter.",
    example: "C:\\Users\\Guest\\Documents\\file.doc",
    flags: "i"
  },
  {
    id: 41,
    category: "File",
    name: "Unix File Path",
    pattern: "(\\/[\\w.-]+)+",
    description: "Matches a typical Unix/Linux file path.",
    example: "/home/user/documents/file.txt",
    flags: ""
  },
  {
    id: 63,
    category: "File",
    name: "File Size Unit",
    pattern: "\\b\\d+(\\.\\d+)?\\s*(B|KB|MB|GB|TB)\\b",
    description: "Matches a file size with a common unit.",
    example: "10.5 MB",
    flags: "i"
  },
  {
    id: 64,
    category: "File",
    name: "File Name with Extension",
    pattern: "[^\\/\\\\]+\\.[^\\/\\\\]+$",
    description: "Matches a filename with an extension from a path.",
    example: "/home/user/document.pdf",
    flags: ""
  },
  {
    id: 95,
    category: "File",
    name: "CSV Line",
    pattern: "^(?:\"[^\"]*\"|[^,]*)(?:,(?:\"[^\"]*\"|[^,]*))*$",
    description: "Matches a single line of a comma-separated values (CSV) file.",
    example: "value1,\"value, 2\",value3",
    flags: ""
  },
  {
    id: 96,
    category: "File",
    name: "INI Section",
    pattern: "\\[([a-zA-Z0-9_]+)\\]",
    description: "Matches a section heading in an INI file (e.g., [SectionName]).",
    example: "[Database]",
    flags: ""
  },
  {
    id: 97,
    category: "File",
    name: "File Path (General)",
    pattern: "([a-zA-Z]:)?([\\/\\\\]{1,2}[a-zA-Z0-9_.-]+)+[\\/\\\\]{1,2}?",
    description: "Matches a general file path for both Windows and Unix systems.",
    example: "C:\\Users\\file.txt or /home/user/file.txt",
    flags: ""
  },
  {
    id: 130,
    category: "File",
    name: "YAML Key-Value Pair",
    pattern: "^\\s*([a-zA-Z0-9_]+):\\s*(.*)$",
    description: "Matches a simple key-value pair in a YAML file.",
    example: "key: value",
    flags: "m"
  },
  {
    id: 131,
    category: "File",
    name: "JSON Array",
    pattern: "\\[(.*?)\\]",
    description: "Matches a JSON array.",
    example: '[1, 2, 3]',
    flags: "g"
  },
  {
    id: 132,
    category: "File",
    name: "Log File Timestamp",
    pattern: "\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\]",
    description: "Matches a common timestamp format in log files.",
    example: "[2023-08-07 14:30:00]",
    flags: "g"
  },
  {
    id: 133,
    category: "File",
    name: "Find all filenames",
    pattern: "[\\w-]+\\.\\w+",
    description: "Finds filenames with extensions in a string.",
    example: "file.txt, image.jpg, and doc-1.pdf",
    flags: "g"
  },
  {
    id: 134,
    category: "File",
    name: "Git Commit Hash",
    pattern: "\\b[0-9a-f]{40}\\b",
    description: "Matches a 40-character Git commit hash.",
    example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    flags: ""
  },
  {
    id: 213,
    category: "File",
    name: "URL from Log File",
    pattern: "https?:\\/\\/[^\\s]+\\b",
    description: "Extracts URLs from a log file line.",
    example: "GET https://example.com/api/data HTTP/1.1",
    flags: "g"
  },
  {
    id: 214,
    category: "File",
    name: "dotenv Key-Value Pair",
    pattern: "^([A-Z0-9_]+)=(.+)$",
    description: "Matches a key-value pair in a `.env` file.",
    example: "DB_USER=root",
    flags: "m"
  },
  {
    id: 215,
    category: "File",
    name: "TOML Key-Value Pair",
    pattern: "^([a-zA-Z0-9_]+)\\s*=\\s*(.*)$",
    description: "Matches a key-value pair in a `.toml` file.",
    example: "title = \"TOML Example\"",
    flags: "m"
  },
  {
    id: 216,
    category: "File",
    name: "Log Level",
    pattern: "\\[(INFO|WARN|ERROR|DEBUG)\\]",
    description: "Extracts the log level from a log entry.",
    example: "[INFO] Server started.",
    flags: ""
  },
  {
    id: 217,
    category: "File",
    name: "IP Address in Log",
    pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b",
    description: "Extracts an IPv4 address from a log entry.",
    example: "Request from 192.168.1.1",
    flags: "g"
  },

  // Other Category
  {
    id: 65,
    category: "Other",
    name: "Base64 String",
    pattern: "^[A-Za-z0-9+/=]+$",
    description: "Matches a standard Base64 encoded string.",
    example: "SGVsbG8gV29ybGQ=",
    flags: ""
  },
  {
    id: 66,
    category: "Other",
    name: "UUID with Hyphens",
    pattern: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
    description: "Matches a standard UUID format.",
    example: "123e4567-e89b-12d3-a456-426614174000",
    flags: ""
  },
  {
    id: 67,
    category: "Other",
    name: "GUID",
    pattern: "^\\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\\}{0,1}$",
    description: "Matches a GUID with or without braces.",
    example: "{123e4567-e89b-12d3-a456-426614174000}",
    flags: ""
  },
  {
    id: 68,
    category: "Other",
    name: "MD5 Hash",
    pattern: "^[a-f0-9]{32}$",
    description: "Matches a 32-character MD5 hash.",
    example: "5a8e0f6c7c0b0a8f8e0d9b4b9b4f2c5e",
    flags: ""
  },
  {
    id: 69,
    category: "Other",
    name: "SHA-1 Hash",
    pattern: "^[a-f0-9]{40}$",
    description: "Matches a 40-character SHA-1 hash.",
    example: "a9993e364706816aba3e25717850c26c9cd0d89d",
    flags: ""
  },
  {
    id: 70,
    category: "Other",
    name: "SHA-256 Hash",
    pattern: "^[a-f0-9]{64}$",
    description: "Matches a 64-character SHA-256 hash.",
    example: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    flags: ""
  },
  {
    id: 71,
    category: "Other",
    name: "License Plate (US)",
    pattern: "^[A-Z0-9]{3,7}$",
    description: "Matches a generic US license plate (3 to 7 alphanumeric characters).",
    example: "ABC1234",
    flags: ""
  },
  {
    id: 72,
    category: "Other",
    name: "Any Number with Commas",
    pattern: "^\\d{1,3}(,\\d{3})*(\\.\\d+)?$",
    description: "Matches a number with optional decimal places and commas.",
    example: "1,234,567.89",
    flags: ""
  },
  {
    id: 98,
    category: "Other",
    name: "Color RGB Value",
    pattern: "rgb\\((\\d{1,3}),\\s*(\\d{1,3}),\\s*(\\d{1,3})\\)",
    description: "Matches and extracts R, G, and B values from a color string.",
    example: "rgb(255, 0, 128)",
    flags: ""
  },
  {
    id: 99,
    category: "Other",
    name: "Color RGBA Value",
    pattern: "rgba\\((\\d{1,3}),\\s*(\\d{1,3}),\\s*(\\d{1,3}),\\s*(0|1|0?\\.\\d+)\\)",
    description: "Matches and extracts R, G, B, and Alpha values from a color string.",
    example: "rgba(255, 0, 128, 0.5)",
    flags: ""
  },
  {
    id: 100,
    category: "Other",
    name: "MAC Address",
    pattern: "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
    description: "Matches a MAC address in colon or hyphen format.",
    example: "00:1A:2B:3C:4D:5E",
    flags: ""
  },
  {
    id: 101,
    category: "Other",
    name: "Credit Card PIN",
    pattern: "^\\d{4}$",
    description: "Matches a 4-digit credit card PIN.",
    example: "1234",
    flags: ""
  },
  {
    id: 102,
    category: "Other",
    name: "Passport Number",
    pattern: "^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$",
    description: "Matches a common passport number format.",
    example: "A1234567",
    flags: "i"
  },
  {
    id: 103,
    category: "Other",
    name: "VIN (Vehicle Identification Number)",
    pattern: "^[A-HJ-NPR-Z0-9]{17}$",
    description: "Matches a 17-character VIN.",
    example: "1g1cd2c77d4134101",
    flags: "i"
  },
  {
    id: 135,
    category: "Other",
    name: "IP Address with Port",
    pattern: "((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$",
    description: "Matches an IPv4 address with an optional port number.",
    example: "192.168.1.1:8080",
    flags: ""
  },
  {
    id: 136,
    category: "Other",
    name: "Currency Symbol",
    pattern: "[^\\s\\w]",
    description: "Finds any character that is not a word character or whitespace.",
    example: "$100, €50",
    flags: "g"
  },
  {
    id: 137,
    category: "Other",
    name: "US State Abbreviation",
    pattern: "\\b(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\\b",
    description: "Matches a 2-letter US state abbreviation.",
    example: "I live in CA.",
    flags: "g"
  },
  {
    id: 138,
    category: "Other",
    name: "SSN (Social Security Number) with Optional Hyphens",
    pattern: "^\\d{3}-?\\d{2}-?\\d{4}$",
    description: "Matches a US Social Security Number with or without hyphens.",
    example: "123-45-6789 or 123456789",
    flags: ""
  },
  {
    id: 139,
    category: "Other",
    name: "Credit Card (Visa)",
    pattern: "^4[0-9]{12}(?:[0-9]{3})?$",
    description: "Matches a Visa credit card number.",
    example: "4111111111111111",
    flags: ""
  },
  {
    id: 140,
    category: "Other",
    name: "Credit Card (Mastercard)",
    pattern: "^5[1-5][0-9]{14}$",
    description: "Matches a Mastercard number.",
    example: "5111111111111111",
    flags: ""
  },
  {
    id: 141,
    category: "Other",
    name: "Credit Card (American Express)",
    pattern: "^3[47][0-9]{13}$",
    description: "Matches an American Express card number.",
    example: "341111111111111",
    flags: ""
  },
  {
    id: 142,
    category: "Other",
    name: "IP Address with CIDR",
    pattern: "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\/([0-9]|[1-2][0-9]|3[0-2])$",
    description: "Matches an IPv4 address with a CIDR suffix (e.g., /24).",
    example: "192.168.1.1/24",
    flags: ""
  },
  {
    id: 143,
    category: "Other",
    name: "Data URI Scheme",
    pattern: "^data:[\\w\\/\\-]+;base64,([a-zA-Z0-9+/]+={0,2})$",
    description: "Matches a data URI with base64 encoded data.",
    example: "data:image/png;base64,iVBORw0KGgo...",
    flags: ""
  },
  {
    id: 144,
    category: "Other",
    name: "XML Processing Instruction",
    pattern: "<\\?[^?]*\\?>",
    description: "Matches an XML processing instruction.",
    example: "<?xml-stylesheet type='text/css' href='style.css'?>",
    flags: ""
  },
  {
    id: 145,
    category: "Other",
    name: "RSS Feed URL",
    pattern: "(https?|ftp):\\/\\/\\S*\\.(rss|xml|atom)",
    description: "Matches a common RSS, XML or Atom feed URL.",
    example: "https://www.example.com/feed.xml",
    flags: "i"
  },
  {
    id: 146,
    category: "Other",
    name: "Time with AM/PM and Seconds",
    pattern: "^(1[0-2]|0?[1-9]):[0-5][0-9]:[0-5][0-9]\\s?(AM|PM)$",
    description: "Matches 12-hour time with seconds and AM/PM.",
    example: "03:05:30 PM",
    flags: "i"
  },
  {
    id: 147,
    category: "Other",
    name: "ISO 8601 Duration",
    pattern: "P(?:\\d+Y)?(?:\\d+M)?(?:\\d+W)?(?:\\d+D)?(?:T(?:\\d+H)?(?:\\d+M)?(?:\\d+S)?)?",
    description: "Matches an ISO 8601 time duration.",
    example: "P3Y6M4DT12H30M5S",
    flags: ""
  },
  {
    id: 148,
    category: "Other",
    name: "Price with Currency Symbol",
    pattern: "(\\$|£|€|¥)(\\d+[,\\.]?\\d{0,2})",
    description: "Matches a price with a common currency symbol.",
    example: "$12.99",
    flags: "g"
  },
  {
    id: 149,
    category: "Other",
    name: "Single-line `if` statement",
    pattern: "if\\s*\\((.*?)\\)\\s*(.*);",
    description: "Matches a basic single-line `if` statement in languages like C/C++/Java.",
    example: "if (x > 5) return true;",
    flags: "i"
  },
  {
    id: 150,
    category: "Other",
    name: "Boolean Value",
    pattern: "\\b(true|false)\\b",
    description: "Matches the boolean values `true` or `false`.",
    example: "The value is true",
    flags: "i"
  },
  {
    id: 151,
    category: "Other",
    name: "HTML Class Attribute",
    pattern: "class\\s*=\\s*['\"]([^'\"]*)['\"]",
    description: "Extracts the value of an HTML class attribute.",
    example: "class='container box'",
    flags: "g"
  },
  {
    id: 152,
    category: "Other",
    name: "HTML ID Attribute",
    pattern: "id\\s*=\\s*['\"]([^'\"]*)['\"]",
    description: "Extracts the value of an HTML id attribute.",
    example: "id='main-content'",
    flags: "g"
  },
  {
    id: 153,
    category: "Other",
    name: "CSS ID Selector",
    pattern: "#([a-zA-Z0-9_-]+)",
    description: "Matches a CSS ID selector.",
    example: "#header { color: red; }",
    flags: "g"
  },
  {
    id: 154,
    category: "Other",
    name: "CSS Class Selector",
    pattern: "\\.([a-zA-Z0-9_-]+)",
    description: "Matches a CSS class selector.",
    example: ".button { background: blue; }",
    flags: "g"
  },
  {
    id: 155,
    category: "Other",
    name: "MAC Address (no delimiters)",
    pattern: "^([0-9A-Fa-f]{12})$",
    description: "Matches a 12-character MAC address without delimiters.",
    example: "001A2B3C4D5E",
    flags: ""
  },
  {
    id: 156,
    category: "Other",
    name: "Credit Card (Discover)",
    pattern: "^6(?:011|5[0-9]{2})[0-9]{12}$",
    description: "Matches a Discover card number.",
    example: "6011111111111111",
    flags: ""
  },
  {
    id: 157,
    category: "Other",
    name: "Credit Card (JCB)",
    pattern: "^(?:2131|1800|35\\d{3})\\d{11}$",
    description: "Matches a JCB card number.",
    example: "3528111111111111",
    flags: ""
  },
  {
    id: 158,
    category: "Other",
    name: "Credit Card (Diners Club)",
    pattern: "^3(?:0[0-5]|[68][0-9])[0-9]{11}$",
    description: "Matches a Diners Club card number.",
    example: "30111111111111",
    flags: ""
  },
  {
    id: 159,
    category: "Other",
    name: "Password (Simple)",
    pattern: "^[a-zA-Z0-9_]{6,18}$",
    description: "Matches a simple password, 6 to 18 characters long, alphanumeric with underscores.",
    example: "SimplePassword123",
    flags: ""
  },
  {
    id: 160,
    category: "Other",
    name: "HTML Entity",
    pattern: "&[a-zA-Z]+;",
    description: "Matches named HTML entities like &amp;.",
    example: "This is &copy;",
    flags: "g"
  },
  {
    id: 161,
    category: "Other",
    name: "US Driver's License",
    pattern: "[A-Z]\\d{7}",
    description: "Matches a common US driver's license format (1 letter, 7 digits).",
    example: "A1234567",
    flags: ""
  },
  {
    id: 162,
    category: "Other",
    name: "JSON Number",
    pattern: "[-+]?[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?",
    description: "Matches a valid JSON number.",
    example: "123.45e-6",
    flags: "g"
  },
  {
    id: 163,
    category: "Other",
    name: "UUID without Hyphens",
    pattern: "[0-9a-fA-F]{32}",
    description: "Matches a UUID without hyphens.",
    example: "f81d4fae7dec11d0a76500a0c91e6bf6",
    flags: ""
  },
  {
    id: 164,
    category: "Other",
    name: "ISBN-10",
    pattern: "^(?:ISBN(?:-10)?:\\s?)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\\s]){3})[-\\s0-9X]{13}$)97[89][-\\s]?\\d{1,5}[-\\s]?\\d+[-\\s]?\\d+[-\\s]?\\d$",
    description: "Matches a valid ISBN-10 number.",
    example: "ISBN 0-7432-7356-7",
    flags: "i"
  },
  {
    id: 165,
    category: "Other",
    name: "ISBN-13",
    pattern: "^(?:ISBN(?:-13)?:\\s?)?(?=[0-9]{13}$|(?=(?:[0-9]+[-\\s]){4})[-\\s0-9]{17}$)(978|979)[-\\s]?(?:\\d[-\\s]?){9}\\d$",
    description: "Matches a valid ISBN-13 number.",
    example: "978-0-306-40615-7",
    flags: "i"
  },
  {
    id: 166,
    category: "Other",
    name: "UK Postcode",
    pattern: "^[A-Z]{1,2}\\d[A-Z\\d]?\\s*\\d[A-Z]{2}$",
    description: "Matches a valid UK postcode.",
    example: "SW1A 0AA",
    flags: "i"
  },
  {
    id: 167,
    category: "Other",
    name: "US Currency with Cents",
    pattern: "^\\$[0-9]{1,3}(?:,?[0-9]{3})*\\.[0-9]{2}$",
    description: "Matches a US currency format with a dollar sign, commas, and two decimal places.",
    example: "$1,234.56",
    flags: ""
  },
  {
    id: 168,
    category: "Other",
    name: "UUID v4",
    pattern: "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$",
    description: "Matches a specific UUID v4 format.",
    example: "f81d4fae-7dec-41d0-a765-00a0c91e6bf6",
    flags: ""
  },
  {
    id: 169,
    category: "Other",
    name: "PascalCase",
    pattern: "([A-Z][a-z0-9]+)+",
    description: "Matches words in PascalCase format.",
    example: "ThisIsPascalCase",
    flags: "g"
  },
  {
    id: 170,
    category: "Other",
    name: "camelCase",
    pattern: "[a-z]+([A-Z][a-z0-9]+)+",
    description: "Matches words in camelCase format.",
    example: "thisIsCamelCase",
    flags: "g"
  },
  {
    id: 171,
    category: "Other",
    name: "snake_case",
    pattern: "([a-z0-9]+_)*[a-z0-9]+",
    description: "Matches words in snake_case format.",
    example: "this_is_snake_case",
    flags: "g"
  },
  {
    id: 172,
    category: "Other",
    name: "kebab-case",
    pattern: "([a-z0-9]+-)*[a-z0-9]+",
    description: "Matches words in kebab-case format.",
    example: "this-is-kebab-case",
    flags: "g"
  },
  {
    id: 173,
    category: "Other",
    name: "Space-separated Words",
    pattern: "\\b[a-zA-Z]+\\b",
    description: "Matches words separated by spaces.",
    example: "This is a sentence",
    flags: "g"
  },
  {
    id: 174,
    category: "Other",
    name: "Remove All Digits",
    pattern: "\\d",
    description: "Removes all digits from a string.",
    example: "hello123world456",
    flags: "g"
  },
  {
    id: 175,
    category: "Other",
    name: "Remove All Non-letters",
    pattern: "[^a-zA-Z]",
    description: "Removes all characters that are not letters.",
    example: "hello-world123!",
    flags: "g"
  },
  {
    id: 176,
    category: "Other",
    name: "Find URLs in Text",
    pattern: "https?:\\/\\/[^\\s]+",
    description: "Finds and extracts all URLs in a block of text.",
    example: "Visit our site at https://www.example.com",
    flags: "g"
  },
  {
    id: 177,
    category: "Other",
    name: "Credit Card (UnionPay)",
    pattern: "^(62[0-9]{14,17})$",
    description: "Matches a China UnionPay card number.",
    example: "62111111111111111",
    flags: ""
  },
  {
    id: 218,
    category: "Other",
    name: "US National ID (EIN)",
    pattern: "^\\d{2}-\\d{7}$",
    description: "Matches a U.S. Employer Identification Number.",
    example: "12-3456789",
    flags: ""
  },
  {
    id: 219,
    category: "Other",
    name: "US National ID (ITIN)",
    pattern: "^9\\d{2}-\\d{2}-\\d{4}$",
    description: "Matches a U.S. Individual Taxpayer Identification Number.",
    example: "900-00-1234",
    flags: ""
  },
  {
    id: 220,
    category: "Other",
    name: "Australian Business Number (ABN)",
    pattern: "\\d{2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{3}",
    description: "Matches a 11-digit Australian Business Number.",
    example: "12 345 678 901",
    flags: ""
  },
  {
    id: 221,
    category: "Other",
    name: "UK National Insurance Number (NINO)",
    pattern: "^[A-CEGHJ-PR-TW-Z]{2}[0-9]{6}[A-D]?$",
    description: "Matches a UK National Insurance Number.",
    example: "AB123456C",
    flags: ""
  },
  {
    id: 222,
    category: "Other",
    name: "Canadian Social Insurance Number (SIN)",
    pattern: "^\\d{3}-\\d{3}-\\d{3}$",
    description: "Matches a 9-digit Canadian Social Insurance Number.",
    example: "123-456-789",
    flags: ""
  },

  // Data Validation Category
  {
    id: 223,
    category: "Data Validation",
    name: "IBAN (International Bank Account Number)",
    pattern: "^[A-Z]{2}[0-9]{2}(?:[ ]?[0-9]{4}){4}(?:[ ]?[0-9]{1,2})?$",
    description: "Matches a valid IBAN format.",
    example: "DE89 3704 0044 0532 0130 00",
    flags: ""
  },
  {
    id: 224,
    category: "Data Validation",
    name: "Credit Card (Generic)",
    pattern: "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$",
    description: "Matches a wide range of credit card numbers.",
    example: "4567-8901-2345-6789",
    flags: ""
  },
  {
    id: 225,
    category: "Data Validation",
    name: "BIC/SWIFT Code",
    pattern: "^([A-Z]{6}[A-Z2-9][A-NP-Z0-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$",
    description: "Matches a valid 8 or 11 character SWIFT/BIC code.",
    example: "DEUTDEFF",
    flags: ""
  },
  {
    id: 226,
    category: "Data Validation",
    name: "Postal Code (Generic)",
    pattern: "^[A-Z0-9\\s-]{3,10}$",
    description: "Matches a generic postal code format for many countries.",
    example: "12345",
    flags: "i"
  },
  {
    id: 227,
    category: "Data Validation",
    name: "Email (RFC 5322)",
    pattern: "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
    description: "Matches a valid email address according to RFC 5322 standard.",
    example: "test@example.com",
    flags: "i"
  },

  // Scientific Category
  {
    id: 228,
    category: "Scientific",
    name: "Chemical Formula",
    pattern: "\\b([A-Z][a-z]?\\d*)+",
    description: "Matches a simple chemical formula like H2O or NaCl.",
    example: "H2O",
    flags: "g"
  },
  {
    id: 229,
    category: "Scientific",
    name: "Units of Measurement",
    pattern: "\\d+(\\.\\d+)?\\s*(m|cm|mm|km|g|kg|mg|ml|l|L|ft|in|yd|mi)",
    description: "Matches a number followed by a common unit of measurement.",
    example: "100 ml",
    flags: "gi"
  },
  {
    id: 230,
    category: "Scientific",
    name: "DNA Sequence",
    pattern: "^[ACGT]+$",
    description: "Matches a valid DNA sequence (A, C, G, T).",
    example: "GATTACA",
    flags: "i"
  },
  {
    id: 231,
    category: "Scientific",
    name: "RNA Sequence",
    pattern: "^[ACGU]+$",
    description: "Matches a valid RNA sequence (A, C, G, U).",
    example: "GAUUCGA",
    flags: "i"
  },
  {
    id: 232,
    category: "Scientific",
    name: "Molecular Weight",
    pattern: "\\b\\d+(\\.\\d+)?\\s*(g/mol|amu)\\b",
    description: "Matches a molecular weight value and its unit.",
    example: "18.015 g/mol",
    flags: "i"
  },
  {
    id: 233,
    category: "Scientific",
    name: "SI Units",
    pattern: "\\b(m|kg|s|A|K|mol|cd|N|Pa|J|W|C|V|Ω|S|F|Wb|T|H|°C|Hz|Gy|Sv|kat|Bq|rad|sr)\\b",
    description: "Matches common SI units.",
    example: "100 m",
    flags: "g"
  },

  // Typography Category
  {
    id: 234,
    category: "Typography",
    name: "Smart Quotes to Straight Quotes",
    pattern: "[“”]",
    description: "Matches smart double quotes.",
    example: "“Hello World”",
    flags: "g"
  },
  {
    id: 235,
    category: "Typography",
    name: "Ellipsis",
    pattern: "\\.{3}",
    description: "Matches an ellipsis (three dots).",
    example: "Hello...",
    flags: "g"
  },
  {
    id: 236,
    category: "Typography",
    name: "Em Dash",
    pattern: "—",
    description: "Matches an em dash.",
    example: "A long—and difficult—day.",
    flags: "g"
  },
  {
    id: 237,
    category: "Typography",
    name: "En Dash",
    pattern: "–",
    description: "Matches an en dash.",
    example: "Pages 1–10",
    flags: "g"
  },
  {
    id: 238,
    category: "Typography",
    name: "All Whitespace",
    pattern: "\\s",
    description: "Matches any whitespace character (space, tab, newline).",
    example: "Hello\n\tWorld",
    flags: "g"
  },
  {
    id: 239,
    category: "Typography",
    name: "Leading Whitespace",
    pattern: "^\\s+",
    description: "Matches whitespace at the beginning of a line.",
    example: "  Indented text",
    flags: "gm"
  },
  {
    id: 240,
    category: "Typography",
    name: "Consecutive Duplicate Words",
    pattern: "\\b(\\w+)\\s+\\1\\b",
    description: "Finds words that are repeated back-to-back.",
    example: "a a simple test",
    flags: "gi"
  },

  // Even more patterns for a grand total of 300+!
  {
    id: 241,
    category: "Other",
    name: "US Phone Number with Hyphens",
    pattern: "^\\d{3}-\\d{3}-\\d{4}$",
    description: "Matches a 10-digit US phone number in ###-###-#### format.",
    example: "123-456-7890",
    flags: ""
  },
  {
    id: 242,
    category: "Other",
    name: "Indian Aadhar Card Number",
    pattern: "^\\d{4}\\s?\\d{4}\\s?\\d{4}$",
    description: "Matches a 12-digit Indian Aadhar card number.",
    example: "1234 5678 9012",
    flags: ""
  },
  {
    id: 243,
    category: "Other",
    name: "UK National Health Service (NHS) Number",
    pattern: "^\\d{3}\\s?\\d{3}\\s?\\d{4}$",
    description: "Matches a 10-digit UK NHS number.",
    example: "123 456 7890",
    flags: ""
  },
  {
    id: 244,
    category: "Other",
    name: "Currency (British Pound)",
    pattern: "^£(\\d{1,3}(,\\d{3})*|\\d+)(\\.\\d{2})?$",
    description: "Matches British Pound currency values.",
    example: "£1,234.56",
    flags: ""
  },
  {
    id: 245,
    category: "Other",
    name: "Currency (Japanese Yen)",
    pattern: "^(¥|JPY)?\\s*\\d{1,3}(?:[\\s,]\\d{3})*$",
    description: "Matches Japanese Yen currency values.",
    example: "¥1,234",
    flags: ""
  },
  {
    id: 246,
    category: "Other",
    name: "ISBN (Generic)",
    pattern: "\\b(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+-){3})[0-9X]{13}$|97[89][0-9]{10}$)(?:97[89]-)?([0-9]{1,5})-?([0-9]+)-?([0-9]+)-?([0-9X])\\b",
    description: "Matches a generic ISBN (10 or 13) format.",
    example: "978-0-321-76572-3",
    flags: "i"
  },
  {
    id: 247,
    category: "Other",
    name: "Credit Card (Dankort)",
    pattern: "^5019\\d{12}$",
    description: "Matches a Dankort card number.",
    example: "5019123456789012",
    flags: ""
  },
  {
    id: 248,
    category: "Other",
    name: "Credit Card (Maestro)",
    pattern: "^(5018|5020|5038|6304|6759|6761|6762|6763|0604|6390)\\d{8,15}$",
    description: "Matches a Maestro card number.",
    example: "6759123456789012",
    flags: ""
  },
  {
    id: 249,
    category: "Other",
    name: "Credit Card (RuPay)",
    pattern: "^6(0|5)(?:11|51)\\d{12,15}$",
    description: "Matches a RuPay card number.",
    example: "6011111111111111",
    flags: ""
  },
  {
    id: 250,
    category: "Other",
    name: "Credit Card (Elo)",
    pattern: "^(401178|401179|438935|451416|457631|457632|504175|627780|636297|636368|650031-650033|650035|650043|650050-650051|650405-650439|650485-650505|650523-650538|650541-650598|650700-650718|650720-650727|650901-650978|651652-651679|655000-655020|655021-655050|655051-655059|655060-655069|655070-655077)\\d{12,15}$",
    description: "Matches an Elo card number.",
    example: "4011781234567890",
    flags: ""
  },
  {
    id: 251,
    category: "Other",
    name: "Twitter Status URL",
    pattern: "twitter\\.com\\/\\w+\\/status\\/(\\d+)",
    description: "Extracts the status ID from a Twitter post URL.",
    example: "twitter.com/user/status/1234567890",
    flags: ""
  },
  {
    id: 252,
    category: "Other",
    name: "IP Address with Port (Optional)",
    pattern: "((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\\d{1,5})?",
    description: "Matches an IPv4 address, with an optional port number.",
    example: "192.168.1.1:8080",
    flags: ""
  },
  {
    id: 253,
    category: "Other",
    name: "Hexadecimal Color (with Alpha)",
    pattern: "^#([a-fA-F0-9]{8}|[a-fA-F0-9]{4})$",
    description: "Matches a hexadecimal color value with an alpha channel (4 or 8 digits).",
    example: "#FF573380",
    flags: ""
  },
  {
    id: 254,
    category: "Other",
    name: "HTML/CSS Font Size",
    pattern: "\\b\\d+(\\.\\d+)?(px|em|rem|%|vw|vh|vmin|vmax)\\b",
    description: "Matches a font size value with a common unit.",
    example: "16px",
    flags: "g"
  },
  {
    id: 255,
    category: "Other",
    name: "US Zip Code (5 digits only)",
    pattern: "^\\d{5}$",
    description: "Matches a 5-digit US ZIP code.",
    example: "12345",
    flags: ""
  },
  {
    id: 256,
    category: "Other",
    name: "Australian Company Number (ACN)",
    pattern: "\\d{9}",
    description: "Matches a 9-digit Australian Company Number.",
    example: "123456789",
    flags: ""
  },
  {
    id: 257,
    category: "Other",
    name: "UK Phone Number (mobile)",
    pattern: "^(07\\d{9}|\\+447\\d{9})$",
    description: "Matches a UK mobile phone number (07 prefix or +447).",
    example: "+447700900123",
    flags: ""
  },
  {
    id: 258,
    category: "Other",
    name: "Singapore NRIC/FIN",
    pattern: "^[SFTG]\\d{7}[A-Z]$",
    description: "Matches a Singapore National Registration Identity Card (NRIC) or Foreigner's Identification Number (FIN).",
    example: "S1234567A",
    flags: "i"
  },
  {
    id: 259,
    category: "Other",
    name: "Australian Mobile Number",
    pattern: "^(04)\\d{8}$",
    description: "Matches an Australian mobile phone number starting with '04'.",
    example: "0412345678",
    flags: ""
  },
  {
    id: 260,
    category: "Other",
    name: "Indian Mobile Number",
    pattern: "^[6-9]\\d{9}$",
    description: "Matches a 10-digit Indian mobile number.",
    example: "9876543210",
    flags: ""
  },
  {
    id: 261,
    category: "Other",
    name: "Singapore Postal Code",
    pattern: "^[0-9]{6}$",
    description: "Matches a 6-digit Singapore postal code.",
    example: "018906",
    flags: ""
  },
  {
    id: 262,
    category: "Other",
    name: "US Social Security Number with Separators",
    pattern: "^\\d{3}-\\d{2}-\\d{4}$",
    description: "Matches a US Social Security Number in ###-##-#### format.",
    example: "123-45-6789",
    flags: ""
  },
  {
    id: 263,
    category: "Other",
    name: "UUID v5",
    pattern: "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-5[0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$",
    description: "Matches a UUID v5 format.",
    example: "f81d4fae-7dec-51d0-a765-00a0c91e6bf6",
    flags: ""
  },
  {
    id: 264,
    category: "Other",
    name: "File Path with Wildcard",
    pattern: "([a-zA-Z_\\/\\.-]+\\/)?([a-zA-Z_\\.-]*\\*\\.[a-zA-Z0-9]+)",
    description: "Matches a file path containing a wildcard (`*`).",
    example: "path/to/my-file_*.log",
    flags: ""
  },
  {
    id: 265,
    category: "Other",
    name: "IPv4 and IPv6",
    pattern: "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}",
    description: "Matches either an IPv4 or a full IPv6 address.",
    example: "192.168.1.1",
    flags: "g"
  },
  {
    id: 266,
    category: "Other",
    name: "URL Hostname",
    pattern: "(?:https?:\\/\\/)?(?:www\\.)?([^\\/\\s]+)",
    description: "Extracts the hostname from a URL.",
    example: "www.example.com",
    flags: ""
  },
  {
    id: 267,
    category: "Other",
    name: "JSON Object (with key)",
    pattern: '"([a-zA-Z0-9_]+)":\\s*\\{(.*?)\\}',
    description: "Extracts a JSON object by a specific key.",
    example: '"data": { "value": 123 }',
    flags: "g"
  },
  {
    id: 268,
    category: "Other",
    name: "Email Domain",
    pattern: "@([a-zA-Z0-9_.-]+\\.[a-zA-Z]{2,4})",
    description: "Extracts the domain name from an email address.",
    example: "example.com",
    flags: ""
  },
  {
    id: 269,
    category: "Other",
    name: "Hexadecimal Byte Pair",
    pattern: "\\b[0-9a-fA-F]{2}\\b",
    description: "Matches a single byte represented in hexadecimal.",
    example: "FF",
    flags: "g"
  },
  {
    id: 270,
    category: "Other",
    name: "Binary Byte",
    pattern: "\\b[01]{8}\\b",
    description: "Matches a single byte represented in binary.",
    example: "01001101",
    flags: "g"
  },
  {
    id: 271,
    category: "Other",
    name: "HTML List Item",
    pattern: "<li>(.*?)<\\/li>",
    description: "Extracts the content of an HTML list item tag.",
    example: "<li>Item 1</li>",
    flags: "g"
  },
  {
    id: 272,
    category: "Other",
    name: "HTML Table Row",
    pattern: "<tr>(.*?)<\\/tr>",
    description: "Extracts the content of an HTML table row tag.",
    example: "<tr><td>Data</td></tr>",
    flags: "g"
  },
  {
    id: 273,
    category: "Other",
    name: "YAML List",
    pattern: "^\\s*-\\s*(.*)",
    description: "Matches a single list item in a YAML file.",
    example: "- item",
    flags: "gm"
  },
  {
    id: 274,
    category: "Other",
    name: "URL Subdirectory",
    pattern: "\\/([a-zA-Z0-9_\\-]+)\\/",
    description: "Extracts the subdirectory from a URL path.",
    example: "/blog/article-123/",
    flags: "g"
  },
  {
    id: 275,
    category: "Other",
    name: "Email User Name",
    pattern: "([^@]+)@",
    description: "Extracts the user name from an email address.",
    example: "john.doe",
    flags: ""
  },
  {
    id: 276,
    category: "Other",
    name: "UK National Insurance Number with Spaces",
    pattern: "^[A-CEGHJ-PR-TW-Z]{2}\\s?[0-9]{2}\\s?[0-9]{2}\\s?[0-9]{2}\\s?[A-D]?$",
    description: "Matches a UK National Insurance Number with optional spaces.",
    example: "AB 12 34 56 C",
    flags: "i"
  },
  {
    id: 277,
    category: "Other",
    name: "Canadian Postal Code with Space",
    pattern: "^[A-Z]\\d[A-Z]\\s\\d[A-Z]\\d$",
    description: "Matches a Canadian Postal Code with a single space.",
    example: "M5V 1J7",
    flags: ""
  },
  {
    id: 278,
    category: "Other",
    name: "Australian Mobile Number (with +61)",
    pattern: "^(?:\\+61|0)4\\d{8}$",
    description: "Matches an Australian mobile phone number including the international code.",
    example: "+61412345678",
    flags: ""
  },
  {
    id: 279,
    category: "Other",
    name: "Indian Aadhar Card Number (no spaces)",
    pattern: "^\\d{12}$",
    description: "Matches a 12-digit Indian Aadhar card number without spaces.",
    example: "123456789012",
    flags: ""
  },
  {
    id: 280,
    category: "Other",
    name: "Singapore NRIC/FIN (with separators)",
    pattern: "^[SFTG]-\\d{7}-[A-Z]$",
    description: "Matches a Singapore NRIC/FIN with hyphens.",
    example: "S-1234567-A",
    flags: "i"
  },
  {
    id: 281,
    category: "Other",
    name: "HTML Meta Tag",
    pattern: "<meta\\s+([^>]*)>",
    description: "Matches an HTML meta tag and captures its attributes.",
    example: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
    flags: "i"
  },
  {
    id: 282,
    category: "Other",
    name: "HTML Script Tag",
    pattern: "<script[^>]*>(.*?)<\\/script>",
    description: "Matches an HTML script tag and its content.",
    example: "<script>alert('hello');</script>",
    flags: "gs"
  },
  {
    id: 283,
    category: "Other",
    name: "HTML Style Tag",
    pattern: "<style[^>]*>(.*?)<\\/style>",
    description: "Matches an HTML style tag and its content.",
    example: "<style>body { color: red; }</style>",
    flags: "gs"
  },
  {
    id: 284,
    category: "Other",
    name: "HTML Headings (H1-H6)",
    pattern: "<h[1-6]>(.*?)<\\/h[1-6]>",
    description: "Matches any HTML heading tag and extracts its content.",
    example: "<h1>Main Title</h1>",
    flags: "gi"
  },
  {
    id: 285,
    category: "Other",
    name: "HTTP/2.0 Header",
    pattern: "^([a-z0-9\\-]+):\\s*(.*)$",
    description: "Matches a single HTTP/2.0 request or response header.",
    example: "content-type: application/json",
    flags: "gm"
  },
  {
    id: 286,
    category: "Other",
    name: "HTTP/1.1 Header",
    pattern: "^([A-Z][a-zA-Z0-9-]*):\\s*(.*)$",
    description: "Matches a single HTTP/1.1 request or response header.",
    example: "Content-Type: application/json",
    flags: "gm"
  },
  {
    id: 287,
    category: "Other",
    name: "Go Package Import",
    pattern: 'import\\s+"([^"]+)"',
    description: "Matches a Go language package import statement.",
    example: 'import "fmt"',
    flags: "g"
  },
  {
    id: 288,
    category: "Other",
    name: "Rust Module Use",
    pattern: "use\\s+(.*?);",
    description: "Matches a Rust language `use` statement.",
    example: "use std::io;",
    flags: "g"
  },
  {
    id: 289,
    category: "Other",
    name: "Kotlin Package",
    pattern: "^package\\s+([a-z_][a-z0-9_]*(\\.[a-z_][a-z0-9_]*)*)",
    description: "Matches a Kotlin package declaration.",
    example: "package com.example.app",
    flags: "m"
  },
  {
    id: 290,
    category: "Other",
    name: "Go Variable Declaration",
    pattern: "var\\s+([a-zA-Z_]\\w*)\\s+([a-zA-Z_]\\w*)",
    description: "Matches a Go language variable declaration.",
    example: "var name string",
    flags: "g"
  },
  {
    id: 291,
    category: "Other",
    name: "JSON Boolean Value",
    pattern: "\\b(true|false)\\b",
    description: "Matches boolean values in a JSON string.",
    example: '"success": true',
    flags: "g"
  },
  {
    id: 292,
    category: "Other",
    name: "JSON Null Value",
    pattern: "\\b(null)\\b",
    description: "Matches a `null` value in a JSON string.",
    example: '"data": null',
    flags: "g"
  },
  {
    id: 293,
    category: "Other",
    name: "JSON String Value",
    pattern: ':\\s*"([^"]*)"',
    description: "Extracts the string value from a JSON key-value pair.",
    example: '"name": "John Doe"',
    flags: "g"
  },
  {
    id: 294,
    category: "Other",
    name: "YAML Boolean",
    pattern: "^\\s*(true|false|yes|no)\\b",
    description: "Matches a boolean value in a YAML file.",
    example: "enabled: true",
    flags: "im"
  },
  {
    id: 295,
    category: "Other",
    name: "TOML Array",
    pattern: "\\[(.*)\\]",
    description: "Matches a TOML array definition.",
    example: "fruits = [\"apple\", \"orange\"]",
    flags: "g"
  },
  {
    id: 296,
    category: "Other",
    name: "TOML Table",
    pattern: "^\\[[a-zA-Z0-9_\\.]+\\]",
    description: "Matches a TOML table heading.",
    example: "[database.server]",
    flags: "m"
  },
  {
    id: 297,
    category: "Other",
    name: "Log4j Log Pattern",
    pattern: "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2},\\d{3}\\s+\\w+\\s+.*$",
    description: "Matches a common Log4j log entry format.",
    example: "2023-08-07 14:30:00,123 INFO SomeClass - Message",
    flags: "m"
  },
  {
    id: 298,
    category: "Other",
    name: "Logstash Timestamp",
    pattern: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z",
    description: "Matches an ISO 8601 timestamp with milliseconds and 'Z' timezone.",
    example: "2023-08-07T14:30:00.123Z",
    flags: ""
  },
  {
    id: 299,
    category: "Other",
    name: "URL Path Parameter",
    pattern: "\\/:(.*?)(?:\\/|$)",
    description: "Matches path parameters in a URL pattern (e.g., in Express.js).",
    example: "/users/:id",
    flags: "g"
  },
  {
    id: 300,
    category: "Other",
    name: "Go Struct Definition",
    pattern: "type\\s+([A-Z]\\w*)\\s+struct",
    description: "Matches a Go language struct definition.",
    example: "type User struct {",
    flags: "g"
  },
  {
    id: 301,
    category: "Other",
    name: "Rust Struct Definition",
    pattern: "struct\\s+([A-Z]\\w*)\\s*\\{",
    description: "Matches a Rust language struct definition.",
    example: "struct MyStruct {",
    flags: "g"
  },
  {
    id: 302,
    category: "Other",
    name: "Kotlin Class Definition",
    pattern: "(?:class|data class|sealed class)\\s+([A-Z]\\w*)",
    description: "Matches a Kotlin class definition.",
    example: "data class User(val name: String)",
    flags: "g"
  },
  {
    id: 303,
    category: "Other",
    name: "Kotlin Variable",
    pattern: "\\b(val|var)\\s+([a-z_]\\w*)",
    description: "Matches a Kotlin variable declaration.",
    example: "val name: String = \"John\"",
    flags: "g"
  },
  {
    id: 304,
    category: "Other",
    name: "URL Scheme",
    pattern: "^(https?|ftp|file):\\/\\/",
    description: "Extracts the scheme from a URL.",
    example: "https://",
    flags: ""
  },
  {
    id: 305,
    category: "Other",
    name: "Docker Image Tag",
    pattern: "([a-z0-9_.-]+:[a-zA-Z0-9_.-]+)",
    description: "Matches a Docker image tag.",
    example: "my-image:1.2.3",
    flags: ""
  }
];