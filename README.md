# AI Withholding Tax Assistant — AC317

สมาชิกกลุ่ม:
- 2410211100135 ณัฐณิชา เลิศโชติทรัพย์
- 2410211100161 ปุณฑริกา สารีผล
- 2410211100197 เสาวลักษณ์ ไกรทอง

## Run locally
1. Install Node.js 18+.
2. In this folder run `npm start`.
3. Open `http://localhost:3000`.

## Connect AI securely
Set `OPENAI_API_KEY` as a server environment variable in your hosting provider. Never place the key in `index.html`, commit it to GitHub, or share it in screenshots. Optional `OPENAI_MODEL` defaults to `gpt-4.1-mini`.

## Deploy
Deploy this repository as a Node web service (for example Render): Build command `npm install`, Start command `npm start`. Add `OPENAI_API_KEY` and `OPENAI_MODEL` in the host's Environment settings. The static frontend is served by `server.js`; `/api/ai` calls OpenAI from the server so the secret is not exposed to browsers.

## Important
This is an educational prototype. The deterministic calculation rules are simplified screening rules for the ten assignment cases, not a complete tax engine. Verify the law effective on the payment date, facts, contracts, thresholds, special rates and filing deadlines with the Revenue Department or a tax professional before real use. No tax filing or payment is submitted by this app.
