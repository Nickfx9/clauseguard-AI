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

ClauseGuard coordinates an advanced, parallel context-retrieval pipeline built to showcase the capabilities of the **Microsoft IQ** intelligence layer.

┌───────────────────────────────────────────────┐
│           Freelancer Workspace UI              │
│             (React / Tailwind)                 │
│                                               │
│   • User pastes contract / ToS text            │
└───────────────────────────┬───────────────────┘
                            │
                            │  Unstructured Contract Text
                            ▼
┌───────────────────────────────────────────────┐
│           Node.js Express API Server            │
│                                               │
│   • Request validation & sanitization          │
│   • Orchestrates parallel agent calls          │
│   • Normalizes and aggregates results          │
└───────────────────────────┬───────────────────┘
                            │
            ┌───────────────┴────────────────┐
            │        Parallel Intelligence     │
            │             Execution            │
            │                                  │
            ▼                                  ▼
┌───────────────────────────────┐   ┌───────────────────────────────┐
│          Foundry IQ            │   │        Foundry IQ: Web IQ      │
│   Serverless Knowledge Agent   │   │     Live Intelligence Agent    │
│                               │   │                               │
│ • Statutory labor laws         │   │ • Active lawsuits             │
│ • Freelancer protection acts  │   │ • Regulatory changes           │
│ • Grounded legal citations    │   │ • Emerging ToS disputes        │
└─────────────────────┬─────────┘   └─────────────────────┬─────────┘
                      │                                   │
                      └───────────────┬───────────────────┘
                                      │
                                      ▼
┌───────────────────────────────────────────────┐
│             Unified Safety Audit UI            │
│                                               │
│   • Clause-level red flags                     │
│   • Statutory & web citations                  │
│   • Explainable safety insights                │
└───────────────────────────────────────────────┘
### Integrated Systems Strategy

**Microsoft Foundry IQ Core Integration**  
The backend maps unstructured contract data directly to the unified `/knowledgebases/{id}/query` endpoint pattern. This connects the system to indexed labor codes and freelance protection acts (e.g., *Independent Contractor Protection Act*), ensuring zero-hallucination compliance reports.

**Microsoft Web IQ MCP Source Integration**  
Behind the endpoint layer, the platform executes parallel web-retrieval routines via Web IQ to surface active class-action lawsuits, regulatory changes, and sudden contract disputes in real time.
---
## 🤖 AI-Assisted Development (GitHub Copilot)

ClauseGuard was developed with the assistance of **GitHub Copilot** tools in **VS Code**, meeting the AI-assisted development requirement of the Microsoft Agents League Hackathon.

Copilot was used to:
- Plan and iterate on asynchronous API flows in the Node.js Express backend
- Accelerate React component scaffolding and state management patterns
- Assist with utility generation for client-side text sanitization
- Prototype and refine CLI workflows using Copilot-assisted terminal interactions

These tools supported faster iteration, safer defaults, and consistent implementation across the frontend, backend, and CLI surfaces.

Copilot suggestions were reviewed and adapted by the developer to ensure correctness and security
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