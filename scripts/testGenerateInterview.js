const fetch = require('node-fetch');

async function testGenerateInterview() {
  const url = 'http://localhost:3000/api/vapi/generate';
  const data = {
    type: "mixed",
    role: "frontend",
    level: "senior",
    techstack: "next.js",
    amount: "7",
    userid: "bKU1dLyq5XPjjl8Hp83BDJ29lN22"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Response from generate API:', result);
  } catch (error) {
    console.error('Error calling generate API:', error);
  }
}

testGenerateInterview();
