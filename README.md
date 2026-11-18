# AI Model Training Lab – Finance & Audit
**Supervised & Unsupervised Machine Learning with Google Gemini & Microsoft 365 Copilot**

A standalone, hands-on educational laboratory designed for corporate finance, accounting, and internal audit professionals to master **in-context learning**, **supervised grounding with labeled datasets**, and **unsupervised pattern discovery via intuitive K-Means clustering ($K=3$)** using Generative AI. Zero programming or mathematics required.

---

## 🌐 Live Interactive Portal & PDF Manual

* 🔗 **Live Web Application (GitHub Pages):** [https://archita14singh.github.io/genai-model-training-lab/](https://archita14singh.github.io/genai-model-training-lab/)
* 📑 **Official 18-Page PDF Manual:** [`AI_Model_Training_Lab.pdf`](AI_Model_Training_Lab.pdf)
* 📄 **Markdown Lab Manual:** [`LAB_INSTRUCTIONS_FINANCE_AUDIT_AI_TRAINING.md`](LAB_INSTRUCTIONS_FINANCE_AUDIT_AI_TRAINING.md)
* 📊 **Supervised Ground Truth Dataset:** [`data/supervised_finance_audit_training_dataset.csv`](data/supervised_finance_audit_training_dataset.csv)
* 🔍 **Unsupervised Raw Dataset:** [`data/unsupervised_finance_audit_raw_dataset.csv`](data/unsupervised_finance_audit_raw_dataset.csv)

---

## 🎯 Architecture: Two Distinct Interactive Tracks

### Track 1: Supervised Learning (Training with Labeled Data)
* **Concept:** Teaching the AI with an "Answer Key". Human auditors reviewed 25 historical claims and added three ground truth columns: `Audit_Classification`, `Risk_Rating`, and `Audit_Reasoning`.
* **Dataset:** [`data/supervised_finance_audit_training_dataset.csv`](data/supervised_finance_audit_training_dataset.csv) (25 rows, 14 columns).
* **Sequential Workflow (4 Guided Steps):**
  1. **Data Ingestion & Understanding the Labels:** Read the labeled data, verify schema, and count records across the 6 audit labels.
  2. **Training the Decision Rules (In-Context Training):** Memorize the Six-Factor Corporate Compliance Rules.
  3. **Operational Inference (Testing on 4 New Unseen Transactions):** Predict classifications and risk ratings on live claims without human intervention.
  4. **Supervisory Verification & Audit for False Positives:** Challenge the AI, evaluate attendee lists for client dinners, mask PII, and apply human-in-the-loop sign-off.

### Track 2: Unsupervised Learning (Discovery & K-Means Clustering)
* **Concept:** Pattern discovery in raw, unclassified data. No answer keys and no teacher.
* **What is K-Means?** Intuitive partitioning into $K=3$ groups based on spend amount, receipts, weekend timing, and approval levels—executed purely through natural language prompts.
* **Dataset:** [`data/unsupervised_finance_audit_raw_dataset.csv`](data/unsupervised_finance_audit_raw_dataset.csv) (25 rows, 11 raw transaction columns).
* **Sequential Workflow (4 Guided Steps):**
  1. **Data Ingestion & Hygiene Check (Exploratory Data Analysis):** Verify data completeness and calculate departmental spend averages.
  2. **Performing Intuitive K-Means Clustering ($K=3$) via Generative AI:** Cluster into Cluster 1 (Routine Spend), Cluster 2 (High-Dollar Overruns), and Cluster 3 (Governance Red Flags).
  3. **What to Do Once Clusters are Defined (Post-Cluster Investigation):** Action plan allocating 60% of audit resources to Cluster 3 with subpoenas and interviews, freeing up 80% of routine audit hours.
  4. **Converting Unsupervised Discoveries into Supervised Policy Rules:** Write new internal controls to permanently prevent future exceptions, closing the machine learning loop.

---

## 📋 The 5 Required Elements for Every Step

For every step in both tracks, the application and manual provide:
1. **What This Prompt Will Do:** Clear non-technical explanation of the objective.
2. **The Prompt to Copy:** 1-click copy button to paste directly into Gemini or Copilot.
3. **Expected Benchmark Output:** Formatted reference output to compare what Gemini/Copilot generates.
4. **Explanation of the Output:** Deconstructs what the AI did and why it matters to finance/audit.
5. **How to Verify and Evaluate (Audit Check):** Fieldwork steps to cross-check figures against ERP registers.

---

## 📂 Folder Structure

```
model-training-lab/
├── index.html                   # Standalone interactive laboratory web application
├── README.md                    # Lab overview & setup guide
├── LAB_INSTRUCTIONS_FINANCE_AUDIT_AI_TRAINING.md # Printable comprehensive manual
├── css/
│   └── training-lab.css         # Modern corporate dashboard styling (Navy, Sky, Slate)
├── js/
│   ├── training-data.js         # Curricula, prompts, benchmark outputs, and dataset data
│   └── training-app.js          # Controller with track switcher, 1-click copy, and table modals
├── data/
│   ├── unsupervised_finance_audit_raw_dataset.csv     # 25 raw expense records without audit tags
│   └── supervised_finance_audit_training_dataset.csv  # 25 records with human-verified audit labels
└── generate_training_datasets.py # Python script used to synthesize fictional datasets
```

---

## 🛠️ Technology Stack

* **Front-End:** Vanilla HTML5, CSS3 (Corporate Design System with Print Styles), Modern ES6 JavaScript (zero external CDN or runtime dependencies required).
* **AI Tool Integration:** Compatible with Google Gemini (Web / Advanced) and Microsoft 365 Copilot (Enterprise Work Mode).
* **Hosting:** Static GitHub Pages CDN deployment.
