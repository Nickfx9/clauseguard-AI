# ClauseGuard 🛡️
### Independent Contractor Legal Safety Workspace
*Submission for the Microsoft Agents League Hackathon @ AI Skills Fest 2026 — Creative Apps Track*

ClauseGuard is an AI-assisted creative productivity application engineered to protect independent freelance developers, gig workers, and remote creators. It acts as an automated compliance workspace, transforming opaque, jargon-heavy legal contract blocks into clear, scannable safety diagnostics backed by grounded statutory citations and live web risk signals.

---

## 🎯 The Core Problem Solved
In the modern digital economy, freelance developers routinely sign click-through platform agreements or rapidly updated Terms of Service (ToS) documents. These agreements frequently bury predatory clauses—such as aggressive intellectual property (IP) transfers, immediate non-negotiable fee revisions, and foreign mandatory arbitration loops—deep within dense legal walls. 

Hiring formal legal counsel for every micro-contract is financially impossible for individual creators. **ClauseGuard** solves this by remixing complex legal prose into an accessible, high-fidelity security report.

---

## 📊 Application Interface Workspace

### 1. Ingestion Viewport (Empty State)
A minimalist, premium dark-mode interface designed to minimize cognitive overhead and friction during ingestion.
![Workspace Empty Slate](./frontend/public/assets/empty-state.png)

### 2. Multi-Step Agentic Reasoning Loop (Active Evaluation)
When an audit is triggered, the workspace visualizes the underlying multi-step reasoning sequence, keeping the developer informed as the agent decomposes and evaluates the text.
![Active Reasoning Loader](./frontend/public/assets/loading-agent.png)

### 3. Grounded Analysis Matrix (Audit Complete)
The final report displays categorized safety severity metrics, explicit statutory citations, and live web risk profiles.
![Completed Safety Audit](./frontend/public/assets/audit-report.png)

---

## 🏗️ Technical Architecture & Multi-Source IQ Flow

ClauseGuard coordinates an advanced, parallel context-retrieval pipeline built directly to showcase the capabilities of the **Microsoft IQ** intelligence layer.

+-----------------------------+
                  |   Freelancer Workspace UI   |
                  |      (React / Tailwind)     |
                  +--------------+--------------+
                                 |
                       (Pasted Contract Text)
                                 v
                  +--------------+--------------+
                  |  Node.js Express API Server |
                  +--------------+--------------+
                                 |
                   (Parallel Agentic Requests)
              +------------------+------------------+
              |                                     |
              v                                     v
 +------------+------------+           +------------+------------+
 |        Foundry IQ       |           |   Foundry IQ: Web IQ    |
 | (Serverless Knowledge)  |           | (Live Intelligence Layer)|
 +------------+------------+           +------------+------------+
              |                                     |
   (Grounded Statutory Laws)             (Real-time Web Signals)
              |                                     |
              +------------------+------------------+
                                 |
                                 v
                  +--------------+--------------+
                  |   Unified Safety Audit UI   |
                  |    (Red Flags & Citations)  |
                  +-----------------------------+

### Integrated Systems Strategy:
* **Microsoft Foundry IQ Core Integration:** The backend server maps unstructured contract data directly to the unified `/knowledgebases/{id}/query` endpoint pattern. This connects the agent to an indexed repository of local labor codes and freelance protection acts (e.g., *Independent Contractor Protection Act*), ensuring zero-hallucination compliance reports.
* **Microsoft Web IQ MCP Source Integration:** Behind the endpoint layer, the system leverages parallel web-retrieval routines via Web IQ to flag active class-action lawsuits, regulatory changes, and sudden terms-of-service disputes live on the web.

---
## 🤖 AI-Assisted Development Profile (GitHub Copilot Integration)
 ClauseGuard was fully developed using **GitHub Copilot in VS Code** across multiple interactive modalities:

* **Plan Mode:** Utilized to map out the asynchronous execution chains of the Node.js Express server, coordinating the concurrent multi-stream calls via `Promise.all` to optimize engine latency.
* **Edit Mode / Inline Chat (`Ctrl + I`):** Used to instantly inject regular expression utilities (`sanitizeContractText`) capable of parsing text buffers and redacting emails/phone numbers locally before submission. This directly guarantees compliance with the strict **Official Hackathon Security Disclaimer** regarding confidential data.
* **Agent Mode:** Deployed to autonomously scaffold out the React state managers (`loading`, `currentStep`, `result`), configure Tailwind's dark-mode typography tokens, and implement the custom markdown split-parser that converts raw response symbols into clean UI banners.
* **Companion Copilot CLI SDK:** Implemented a terminal-native utility inside the `/cli` folder using the `@github/copilot-cli-sdk` core libraries, enabling developers to execute legal audits straight out of local project directories.

---

## ⚙️ Local Workspace Verification

### 1. Project Ingestion
```bash
git clone [https://github.com/Nickfx9/clauseguard-AI.git](https://github.com/Nickfx9/clauseguard-AI.git)
cd clauseguard-AI
2. Environment Setup
Create a .env file in your root folder:

Code snippet
PORT=5000
FOUNDRY_IQ_ENDPOINT=[https://api.foundry.microsoft.com/v1](https://api.foundry.microsoft.com/v1)
FOUNDRY_IQ_KB_ID=clauseguard-statutory-laws-2026
FOUNDRY_IQ_API_KEY=mock_key_during_initial_local_dev