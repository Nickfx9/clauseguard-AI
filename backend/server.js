const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware Configuration
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Matches default Vite dev port

const PORT = process.env.PORT || 5000;

// Global Scope Check for Mock Development Modality
const isMockKey = !process.env.FOUNDRY_IQ_API_KEY || 
                  process.env.FOUNDRY_IQ_API_KEY.includes('mock') || 
                  process.env.FOUNDRY_IQ_API_KEY === 'your_microsoft_foundry_api_key_here';

// Main Orchestration Routing Matrix
app.post('/api/v1/audit-contract', async (req, res) => {
    const { contractText, sourcePlatform } = req.body;

    if (!contractText || contractText.trim() === '') {
        return res.status(400).json({ error: "Missing body requirement: contractText string is empty." });
    }

    // DEVELOPMENT LOCAL MODE: Runs smoothly if live Microsoft endpoints aren't provisioned yet
    if (isMockKey) {
        console.log(`[ClauseGuard DevMode] Auditing text for platform context: ${sourcePlatform || 'Unspecified'}`);
        
        // Simulating the exact parallel extraction shape from Foundry + Web IQ
        return res.json({
            status: "Success",
            mode: "Local Dev Grounded Mock Engine",
            groundedAnalysis: `### CLAUSEGUARD RISK ASSESSMENT REPORT\n\n#### 🚨 1. INTELLECTUAL PROPERTY EXPLOITATION (SEVERITY: HIGH)\nThe submitted contract text contains language matching predatory IP transfer heuristics. Section clauses dictate that any modifications, auxiliary code strings, or digital assets authored during the agreement lifespan automatically assign ownership to the client entity. \n\n#### ⚠️ 2. BINDING ARBITRATION PIPELINE (SEVERITY: MEDIUM)\nThere is an explicit waver of judicial class action litigation rights. Any transactional or performance-based disputes are locked to private, binding arbitration tribunals located outside local contractor jurisdiction.\n\n#### 💡 3. UNILATERAL REVISION LOOPHOLES (SEVERITY: HIGH)\nThe platform reserves the explicit right to alter payment schedules, fee models, and commission tiers dynamically without formal review periods or mandatory advance notification blocks.`,
            citations: [
                "Statutory Grounding Reference: Independent Contractor Protection Act, Cap 12",
                "IP Statute: Intellectual Property Protection Directive (Section 4.b)"
            ],
            liveWebSignals: [
                {
                    title: "Class Action Filings: Gig Workers Challenge Dynamic Terms",
                    url: "https://example.com/legal-news/dynamic-terms-suit"
                },
                {
                    title: "Regulatory Warning: Arbitrary Payment Retentions Under Review",
                    url: "https://example.com/regulatory/contractor-fee-protections"
                }
            ],
            timestamp: new Date().toISOString()
        });
    }

    // PRODUCTION LIVE PASS: Connects directly to Microsoft IQ Fabric
    try {
        console.log(`[ClauseGuard Production] Firing parallel context streams for ${sourcePlatform || 'Contract File'}...`);

        const [foundryResponse, webResponse] = await Promise.all([
            // Stream A: Grounded Knowledge base validation via Foundry IQ API Endpoint
            axios.post(`${process.env.FOUNDRY_IQ_ENDPOINT}/knowledgebases/${process.env.FOUNDRY_IQ_KB_ID}/query`, {
                query: `Perform an exhaustive contractual evaluation. Identify intellectual property transfers, liability caps, mandatory arbitration pipelines, and payment processing loops within this contract context: ${contractText}`,
                options: { semantic_ranker: true, max_tokens: 1500 }
            }, {
                headers: { 
                    'Authorization': `Bearer ${process.env.FOUNDRY_IQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }),

            // Stream B: Integrated Web IQ retrieval pass
            axios.post(`${process.env.FOUNDRY_IQ_ENDPOINT}/web_iq/search`, {
                query: `recent freelance lawsuits class action contract loopholes updates platform agreements ${sourcePlatform || ''}`,
                options: { freshness: "month", count: 3 }
            }, {
                headers: { 
                    'Authorization': `Bearer ${process.env.FOUNDRY_IQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }).catch(webError => {
                console.error("Non-fatal Web IQ timeout:", webError.message);
                return { data: { results: [] } }; // Fallback gracefully if Web IQ has network lag
            })
        ]);

        return res.json({
            status: "Success",
            mode: "Production Live Gateway",
            groundedAnalysis: foundryResponse.data.answer,
            citations: foundryResponse.data.citations || [],
            liveWebSignals: webResponse.data.results || [],
            timestamp: new Date().toISOString()
        });

    } catch (apiError) {
        console.error("Foundry Infrastructure Link Exception:", apiError.response?.data || apiError.message);
        return res.status(500).json({
            error: "Failed to securely reconcile context metrics across the Microsoft IQ processing fabric.",
            details: apiError.response?.data || apiError.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 [ClauseGuard Core System Active]`);
    console.log(`Listening on http://localhost:${PORT}`);
    console.log(`Mode: ${isMockKey ? 'DEVELOPMENT MOCKING PIPELINE' : 'LIVE AZURE INFRASTRUCTURE CONNECTED'}\n`);
});