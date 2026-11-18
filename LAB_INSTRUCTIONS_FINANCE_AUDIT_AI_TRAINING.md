# Lab Manual: AI Model Training Lab – Finance & Audit
## A Practical, Non-Technical Guide to Supervised & Unsupervised Machine Learning Using Google Gemini & Microsoft 365 Copilot

**Target Audience:** Finance, Accounting, Risk, and Internal Audit Professionals (Beginner to Intermediate)  
**Tools Required:** Web Browser, Google Gemini (`gemini.google.com`) OR Microsoft 365 Copilot (`copilot.microsoft.com`), and Spreadsheet Viewer (Excel / CSV viewer)  
**Estimated Time:** 45 – 60 Minutes  
**Prerequisites:** None. No coding, Python programming, or advanced mathematics required. Everything is conducted using natural language prompts inside commercial Generative AI platforms.

---

## Table of Contents
1. [Foundational Concepts: What is a Dataset?](#1-foundational-concepts-what-is-a-dataset)
2. [The Core Distinction: Labeled Data vs. Unlabeled Data](#2-the-core-distinction-labeled-data-vs-unlabeled-data)
3. [Zero-Code Machine Learning: How Business Professionals "Train" Generative AI](#3-zero-code-machine-learning-how-business-professionals-train-generative-ai)
4. [Setting Up Your Lab Environment (Gemini & M365 Copilot)](#4-setting-up-your-lab-environment-gemini--m365-copilot)
5. [Track 1: Supervised Learning (Training with Labeled Data)](#5-track-1-supervised-learning-training-with-labeled-data)
   - [Why is this Dataset Labeled?](#why-is-this-dataset-labeled)
   - [The 6 Ground Truth Audit Labels](#the-6-ground-truth-audit-labels)
   - [Step 1: Data Ingestion & Understanding the Labels](#supervised-step-1-data-ingestion--understanding-the-labels)
   - [Step 2: Training the Decision Rules (In-Context Training)](#supervised-step-2-training-the-decision-rules-in-context-training)
   - [Step 3: Operational Inference (Testing on New Unseen Transactions)](#supervised-step-3-operational-inference-testing-on-new-unseen-transactions)
   - [Step 4: Challenge the Model & Audit for False Positives (Human-in-the-Loop)](#supervised-step-4-challenge-the-model--audit-for-false-positives)
6. [Track 2: Unsupervised Learning (Discovery & K-Means Clustering)](#6-track-2-unsupervised-learning-discovery--k-means-clustering)
   - [Why is this Dataset Unlabeled?](#why-is-this-dataset-unlabeled)
   - [What is K-Means Clustering (Beginner-Friendly Explanation)?](#what-is-k-means-clustering-beginner-friendly-explanation)
   - [Step 1: Data Ingestion & Hygiene Check (Exploratory Data Analysis)](#unsupervised-step-1-data-ingestion--hygiene-check-exploratory-data-analysis)
   - [Step 2: Performing Intuitive K-Means Clustering (K = 3) via Generative AI](#unsupervised-step-2-performing-intuitive-k-means-clustering-k--3-via-generative-ai)
   - [Step 3: What to Do Once Clusters are Defined (Post-Cluster Forensic Investigation)](#unsupervised-step-3-what-to-do-once-clusters-are-defined-post-cluster-forensic-investigation)
   - [Step 4: Converting Unsupervised Discoveries into Supervised Policy Rules](#unsupervised-step-4-converting-unsupervised-discoveries-into-supervised-policy-rules)
7. [Day-to-Day Practical Applications in Finance & Audit](#7-day-to-day-practical-applications-in-finance--audit)
8. [Governance, Privacy (PII) & Supervisory Checklist](#8-governance-privacy-pii--supervisory-checklist)

---

## 1. Foundational Concepts: What is a Dataset?

### In Simple Terms:
A **dataset** is simply a structured business binder or a clean spreadsheet table. It is an organized collection of related facts, figures, and historical records collected during business operations.

In finance and audit, you already interact with datasets every single day:
* Your **General Ledger (GL)** transaction export is a dataset.
* Your **Accounts Payable (AP) Invoice Register** is a dataset.
* Your **Monthly Travel & Expense (T&E) Claim Log** is a dataset.
* Your **Fixed Asset Inventory Register** is a dataset.

### The Anatomy of a Dataset:
A standard tabular dataset has two core dimensions:
1. **Rows (Observations / Records):** Each row represents a single, distinct event (e.g., one employee expense claim, one vendor payment, or one journal entry voucher).
2. **Columns (Features / Attributes):** Each column describes a specific characteristic or dimension of that event (e.g., `Transaction_ID`, `Employee_Name`, `Department`, `Date`, `Amount`, `Policy_Limit`).

```
+---------------+----------------+------------+------------+---------------+
| Transaction_ID| Employee_Name  | Department | Amount ($) | Policy_Limit  |  <-- Columns (Features)
+---------------+----------------+------------+------------+---------------+
| TXN-1001      | Sarah Jenkins  | Marketing  | $480.00    | $600.00       |  <-- Row 1 (Observation)
| TXN-1002      | Marcus Vance   | Sales      | $345.00    | $100.00       |  <-- Row 2 (Observation)
+---------------+----------------+------------+------------+---------------+
```

### Why Does Generative AI Need a Dataset?
Commercial Large Language Models like Google Gemini and Microsoft 365 Copilot are massive pattern-recognition engines. While they understand general accounting terminology and mathematics, they **do not know your specific company policies, your threshold amounts, your departmental chart of accounts, or what your team considers acceptable vs. suspicious**.

When you provide a dataset, you give the AI a factual anchor (**grounding**), transforming it from a generic conversational chatbot into a specialized analytical co-pilot.

---

## 2. The Core Distinction: Labeled Data vs. Unlabeled Data

Understanding the difference between **labeled** and **unlabeled** data is the foundation of machine learning:

```
                           DATASET SPECTRUM
    ┌─────────────────────────────────────────────────────────────┐
    │                                                             │
    ▼                                                             ▼
UNLABELED DATA (Raw Facts)                    LABELED DATA (Ground Truth)
- Transaction ID, Amount, Vendor              - Transaction ID, Amount, Vendor
- NO answers or audit tags                    - PLUS Target Label: "COMPLIANT"
- AI discovers natural clusters               - PLUS Audit Reasoning & Policy Link
  (Unsupervised Learning)                       (Supervised Learning)
```

### 1. Unlabeled Data (Raw Transactions)
* **What it is:** Raw transactional data containing numbers, names, and timestamps, but **without any answers, ratings, or tags**.
* **Audit Analogy:** A raw CSV export of 2,000 corporate credit card transactions dumped directly from the bank portal before any auditor has touched them.
* **What AI Does With It (Unsupervised Pattern Detection):**
  - Identifies natural clusters (e.g., "Sales accounts for 37% of all spending").
  - Spots mathematical outliers (e.g., "One transaction is 10x higher than departmental median").
  - Identifies timing anomalies (e.g., "Resort expenses incurred on Sunday nights").

### 2. Labeled Data (The "Answer Key")
* **What it is:** The exact same transactional data, but enriched with **target labels and expert reasoning** added by experienced human auditors.
* **Audit Analogy:** A past audit file where a Senior Internal Auditor has reviewed 25 claims and documented the verdict for each:
  - Row 1: `COMPLIANT` (Within policy, receipts attached)
  - Row 2: `POLICY_BREACH_MEAL_CAP` (Dinner for 1 exceeded $100 cap)
  - Row 3: `POTENTIAL_DUPLICATE` (Matches another claim on date, merchant, and dollar amount)
* **What AI Does With It (Supervised Learning / Grounding):**
  - Learns the exact decision rules of your company.
  - Understands the boundary between acceptable spending and policy violations.
  - Replicates human auditor skepticism on new, unseen transactions.

### Side-by-Side Comparison Matrix

| Dimension | Unlabeled Data (Unsupervised) | Labeled Data (Supervised) |
| :--- | :--- | :--- |
| **Contains Answers?** | ❌ No (Only raw transaction fields) | ✅ Yes (Includes `Audit_Classification`, `Risk_Rating`, `Reasoning`) |
| **Primary Goal** | Pattern discovery, clustering, and anomaly detection | Teaching the AI exact institutional rules & classification |
| **Business Analogy** | Looking at an unclassified pile of receipts to see what is there | Studying a textbook with practice questions **and the answer key** |
| **When to Use** | When you want AI to spot trends humans missed | When you want AI to classify new claims according to policy |
| **Risk of Error** | May flag harmless anomalies or miss subtle policy rules | Highly accurate, but requires human time to create the labels |

---

## 3. Zero-Code Machine Learning: How Business Professionals "Train" Generative AI

In traditional machine learning, "training" required computer scientists writing thousands of lines of Python code, tuning hyper-parameters across GPUs, and building neural networks.

In the modern Generative AI era with **Google Gemini** and **Microsoft 365 Copilot**, finance and audit professionals train models through a process called:
> **In-Context Learning (Few-Shot Prompt Training) & Grounding**

### How In-Context Training Works:
1. **You provide the Role & Policy Rules:** You instruct the AI who it is and the exact rules it must enforce.
2. **You provide the Supervised Dataset (Exemplars):** You feed it historical examples where human auditors have already labeled compliant vs. non-compliant transactions.
3. **The Model Forms an In-Memory Decision Tree:** The model reads the examples, extracts the rules, and aligns its internal reasoning to match the human expert's judgment.
4. **Testing on Unseen Records:** You feed it new, raw transactions and prompt it to categorize them using the logic it just learned.

You have effectively "trained" a specialized compliance auditor inside your AI session—without writing a single line of software code!

---

## 4. Setting Up Your Lab Environment (Gemini & M365 Copilot)

You can complete this lab using either **Google Gemini** or **Microsoft 365 Copilot**. Both tools are capable enterprise generative AI assistants.

### Option A: Using Google Gemini
1. Open your web browser and navigate to **[gemini.google.com](https://gemini.google.com)**.
2. Log in with your corporate Google Workspace or personal Google account.
3. Start a **New Chat** (click the `+` or `New chat` button in the left sidebar).
   > **Pro Tip:** Always start a fresh chat when training a model so previous unrelated conversations do not confuse the AI.
4. Locate the **"+" (Upload / Attach file)** button next to the prompt text box at the bottom. You will use this to upload the CSV datasets, or you can paste the text directly.

### Option B: Using Microsoft 365 Copilot
1. Open your web browser and navigate to **[copilot.microsoft.com](https://copilot.microsoft.com)** (or launch Copilot inside Microsoft Excel / Edge / Teams).
2. Ensure you are in **Work Mode** (if using enterprise M365) or standard Copilot chat.
3. Select **"More Balanced"** or **"More Precise"** mode if prompted (Precise is ideal for audit tasks).
4. Start a **New Topic / Fresh Session**.
5. Use the **Paperclip / Add Attachment** button to attach the CSV dataset, or copy and paste the tabular text directly into the chat prompt.

---

## 5. Track 1: Supervised Learning (Training with Labeled Data)

### Why is this Dataset Labeled?
This dataset is **LABELED** because an experienced human Senior Internal Auditor reviewed each transaction and explicitly added three audit columns:
1. `Audit_Classification`: The official verdict (`COMPLIANT`, `POLICY_BREACH_MEAL_CAP`, `POTENTIAL_DUPLICATE`, `STRUCTURING_THRESHOLD`, `UNAPPROVED_WEEKEND_SPEND`, `MISSING_DOCUMENTATION`).
2. `Risk_Rating`: The audit severity level (`Low`, `Medium`, `High`, `Critical`).
3. `Audit_Reasoning`: A concise sentence explaining the policy rationale applied.

Without these labels, the AI would not know our company's specific $100 meal cap, our receiptless limit of $50, or our rules regarding weekend travel. The labels are the **"Answer Key"**.

### Download the Supervised Dataset:
* **Filename:** `supervised_finance_audit_training_dataset.csv`
* **Direct File Link:** [supervised_finance_audit_training_dataset.csv](file:///c:/Users/archi/OneDrive/Desktop/ai%20for%20finance%20and%20audit/model-training-lab/data/supervised_finance_audit_training_dataset.csv)
* **Specifications:** 25 rows, 14 columns, 6 audit labels.

### The 6 Ground Truth Audit Labels:
1. **COMPLIANT:** Legitimate business expense within policy caps with itemized receipt attached and independent manager approval.
2. **POLICY_BREACH_MEAL_CAP:** Dinner/meal exceeding the corporate $100 per-head ceiling without documented client attendee justifications.
3. **POTENTIAL_DUPLICATE:** Duplicate claim submitted twice for the exact same flight, vendor, date, and dollar amount.
4. **STRUCTURING_THRESHOLD:** Repeated daily claims just under $50 (e.g. $49.50, $48.75) with no receipts to circumvent audit documentation rules.
5. **UNAPPROVED_WEEKEND_SPEND:** High-dollar weekend resort stay or luxury dining self-approved by an executive without verified client meeting agendas.
6. **MISSING_DOCUMENTATION:** High-value capital equipment or software purchases (> $1,000) lacking mandatory store receipts or purchase orders.

---

### Supervised Step 1: Data Ingestion & Understanding the Labels

#### What This Prompt Will Do:
Instructs Gemini or Copilot to read the attached labeled dataset, verify that all 25 rows and 14 columns were ingested cleanly, and summarize the audit categories human auditors created.

#### Prompt to Copy:
```text
Act as an AI Compliance Analyst. I have attached our official Supervised Training Dataset (supervised_finance_audit_training_dataset.csv).

Execute the following calibration tasks:
1. Verify that all 25 records and 14 columns were ingested successfully.
2. Identify and list all unique values in the 'Audit_Classification' and 'Risk_Rating' columns.
3. Count the number of transactions assigned to each classification category.
4. Provide a structured summary table showing each Audit Classification, its record count, and the average transaction amount for that category.

Confirm that you understand the data schema and are ready for model training.
```

#### Expected Output:
```text
### Calibration Summary: Supervised Training Dataset Ingestion

1. Ingestion Verification:
   - Total Records: 25 transactions successfully verified.
   - Columns Detected (14): Transaction_ID, Employee_Name, Department, Transaction_Date, Merchant, Expense_Category, Amount, Policy_Limit, Receipt_Attached, Weekend_Transaction, Approval_Level, Audit_Classification, Risk_Rating, Audit_Reasoning.

2. Audit Classification Distribution Table:
| Audit Classification | Risk Rating | Record Count | Average Spend (USD) | Primary Pattern / Trigger |
| :--- | :--- | :--- | :--- | :--- |
| COMPLIANT | Low | 12 | $298.89 | Routine travel, meals < $100, manager approved with receipts. |
| STRUCTURING_THRESHOLD | Medium | 4 | $49.26 | Consecutive claims under $50 with missing receipts (E. Rostova). |
| POLICY_BREACH_MEAL_CAP | Medium | 3 | $270.00 | Solo dinners exceeding $100 meal cap (Le Bernardin, Prime 112, Palm). |
| POTENTIAL_DUPLICATE | High | 2 | $1,099.25 | Matching flights (Delta $1,248.50) & seminars (KPMG $950.00). |
| MISSING_DOCUMENTATION | High | 2 | $3,549.50 | Capital hardware (Apple $2,899) & AWS ($4,200) without receipts. |
| UNAPPROVED_WEEKEND_SPEND | Critical | 2 | $1,355.00 | Saturday/Sunday resort stay & luxury dining self-approved by executive. |
| TOTAL | | 25 | $931.34 | |

Dataset verified. Ground truth labels mapped into memory. Ready for training phase.
```

#### Explanation of the Expected Output:
Notice how the AI immediately breaks down the 25 records into the 6 human-defined buckets. It calculates the average spend for each violation type (e.g., Missing Documentation averages $3,549.50 while Structuring averages $49.26). The AI now has a clear mental map of what "good" and "bad" look like.

#### How to Verify & Evaluate (Audit Check):
Check the counts! Open the CSV in Excel. Filter the `Audit_Classification` column: ensure Compliant has 12 rows, Structuring has 4 rows, etc. If the AI reports different numbers, prompt: *"Recount rows where Audit_Classification is COMPLIANT."*

---

### Supervised Step 2: Training the Decision Rules (In-Context Training)

#### What This Prompt Will Do:
Explicitly teaches the AI the Five-Factor Audit Decision Logic extracted from the labeled dataset. This locks the institutional rules into the AI's active reasoning memory.

#### Prompt to Copy:
```text
Act as an AI Audit Model Trainer and Corporate Controller. You are now going to train your internal compliance engine using our organization's Five-Factor Audit Decision Rules:

Rule 1 (Meal Ceiling): If Expense_Category is 'Meals & Entertainment' AND Amount > $100.00, classify as 'POLICY_BREACH_MEAL_CAP' (Medium Risk), unless documented business attendees are provided.
Rule 2 (Duplicate Detection): If an employee submits multiple claims matching on Amount, Merchant, or close dates, classify the duplicate as 'POTENTIAL_DUPLICATE' (High Risk).
Rule 3 (Threshold Structuring): If an employee submits consecutive claims just under $50.00 (e.g. $48-$49.99) with Receipt_Attached = 'No', classify as 'STRUCTURING_THRESHOLD' (Medium Risk).
Rule 4 (Weekend Self-Approvals): If Weekend_Transaction = 'Yes' AND Approval_Level = 'Self' AND Amount > $500.00, classify as 'UNAPPROVED_WEEKEND_SPEND' (Critical Risk).
Rule 5 (High-Dollar Missing Documentation): If Amount > $1,000.00 AND Receipt_Attached = 'No', classify as 'MISSING_DOCUMENTATION' (High Risk).
Rule 6 (Compliant Baseline): All transactions within limits, with receipts, and approved by an independent manager must be classified as 'COMPLIANT' (Low Risk).

Confirm that you have memorized these 6 rules. Acknowledge that you are now a trained compliance model ready to audit new, unseen transactions.
```

#### Expected Output:
```text
### Model Training Confirmation: In-Context Policy Calibration

I have internalized the Six Audit Decision Rules into my active reasoning engine:

1. Rule 1 (Meal Cap): Enforced ($100 threshold).
2. Rule 2 (Duplicates): Pattern matching enabled (Amount + Merchant + Employee).
3. Rule 3 (Structuring): Under-$50 receiptless clustering active.
4. Rule 4 (Weekend Self-Approvals): Governance violation trap active (> $500, Weekend, Self-approved).
5. Rule 5 (Documentation Gaps): High-dollar cutoff (> $1,000, no receipt) active.
6. Rule 6 (Compliant Baseline): Standard corporate allowance active.

Status: Model training complete. I am calibrated to replicate your internal audit standards. Send me unreviewed transactions to begin automated compliance testing.
```

#### Explanation of the Expected Output:
The AI model is now "trained" for the duration of this chat session. It does not need Python code or machine learning retraining; it has anchored its weights to your institutional policy rules.

#### How to Verify & Evaluate (Audit Check):
Test the AI's memory with a quick verbal question: Ask: *"What is the risk level for a $3,000 laptop purchase with no receipt?"* The AI should instantly respond: *"High Risk - MISSING_DOCUMENTATION (Rule 5)"*.

---

### Supervised Step 3: Operational Inference (Testing on New Unseen Transactions)

#### What This Prompt Will Do:
Feeds 4 brand-new, unseen expense claims to the trained AI model to test whether it applies the rules accurately without human coaching on each record.

#### Prompt to Copy:
```text
Now apply your trained compliance logic to evaluate the following 4 NEW, UNSEEN employee expense claims submitted in October 2024:

Test Record A:
- Transaction_ID: TXN-2001
- Employee_Name: Alexander Wright | Department: Sales
- Date: 2024-10-04 (Friday) | Merchant: Morton's The Steakhouse
- Category: Meals & Entertainment | Amount: $265.00 | Policy_Limit: $100.00
- Receipt_Attached: Yes | Weekend_Transaction: No | Approval_Level: Manager

Test Record B:
- Transaction_ID: TXN-2002
- Employee_Name: Elena Rostova | Department: Operations
- Date: 2024-10-05 (Saturday) | Merchant: Corner Cafe Express
- Category: Meals & Entertainment | Amount: $49.25 | Policy_Limit: $50.00
- Receipt_Attached: No | Weekend_Transaction: Yes | Approval_Level: Self

Test Record C:
- Transaction_ID: TXN-2003
- Employee_Name: Liam Gallagher | Department: Engineering
- Date: 2024-10-08 (Tuesday) | Merchant: Dell Direct
- Category: Office Hardware | Amount: $3,150.00 | Policy_Limit: $1,000.00
- Receipt_Attached: No | Weekend_Transaction: No | Approval_Level: Manager

Test Record D:
- Transaction_ID: TXN-2004
- Employee_Name: Marcus Vance | Department: Sales
- Date: 2024-10-09 (Wednesday) | Merchant: United Airlines
- Category: Airfare | Amount: $450.00 | Policy_Limit: $600.00
- Receipt_Attached: Yes | Weekend_Transaction: No | Approval_Level: Director

Your Task:
For each test record, provide:
1. Predicted Audit_Classification (must be one of the 6 official labels).
2. Predicted Risk_Rating (Low, Medium, High, or Critical).
3. Audit_Reasoning (explaining which specific policy rule was triggered).
4. Recommended Audit Action (e.g., Approve, Hold, Require Itemized Attendee List, Reject).

Present your results in a structured 'Trained Model Inference Table'.
```

#### Expected Output:
```text
### Trained Model Inference Table (Automated Compliance Predictions)

| Transaction ID | Employee | Amount | Predicted Audit_Classification | Predicted Risk_Rating | Audit Reasoning & Rule Applied | Recommended Audit Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TXN-2001 | Alexander Wright | $265.00 | POLICY_BREACH_MEAL_CAP | Medium Risk | Exceeds the $100.00 individual meal ceiling by $165.00 without attendee breakdown (Rule 1). | Payment Hold: Request itemized receipt and list of client attendees to calculate per-person spend. |
| TXN-2002 | Elena Rostova | $49.25 | STRUCTURING_THRESHOLD | Medium Risk | Matches pattern of repeated under-$50 claims with no receipt attached (Rule 3); exacerbated by weekend self-approval. | Audit Inquiry: Require physical receipts for all October Corner Cafe claims; interview department manager. |
| TXN-2003 | Liam Gallagher | $3,150.00 | MISSING_DOCUMENTATION | High Risk | Capital hardware purchase > $1,000 threshold submitted without itemized vendor invoice (Rule 5). | Hold Disbursement: Demand Dell tax invoice and IT asset tag confirmation before reimbursement. |
| TXN-2004 | Marcus Vance | $450.00 | COMPLIANT | Low Risk | Routine business flight within $600 policy cap, receipt attached, independent Director sign-off (Rule 6). | Approve for Payment Release. |
```

#### Explanation of the Expected Output:
Notice that the model correctly categorized all 4 test records! It did not get confused by Elena Rostova's under-$50 claim, and it correctly cleared Marcus Vance's flight because all compliance conditions were satisfied.

#### How to Verify & Evaluate (Audit Check):
Review the inference table against your human judgment:
- Did Record A trigger Rule 1? Yes ($265 > $100).
- Did Record B trigger Rule 3? Yes ($49.25 < $50 with no receipt).
- Did Record C trigger Rule 5? Yes ($3,150 with no receipt).
- Did Record D trigger Rule 6? Yes (compliant).

---

### Supervised Step 4: Challenge the Model & Audit for False Positives

#### What This Prompt Will Do:
Practices professional skepticism by challenging the model's classifications, identifying false positive possibilities, reviewing data privacy (PII), and establishing human-in-the-loop controls.

#### Prompt to Copy:
```text
Act as an Audit Quality Assurance (QA) Director conducting a model validation review. I want you to critically evaluate your own classifications from Step 3:

1. Potential False Positive in Record A (Morton's Steakhouse $265):
   - What if Alexander Wright was hosting 3 prospective enterprise clients? Under what conditions would this transaction become COMPLIANT rather than a policy breach?
2. Edge Case Analysis on Record B:
   - What additional documentation would you require from Elena Rostova before concluding that threshold structuring was intentional?
3. Data Privacy (PII) Safeguards:
   - Identify any Personally Identifiable Information present in this dataset and provide 3 corporate privacy rules for sanitizing expense registers before feeding them to commercial AI models.
4. Human-in-the-Loop Protocol:
   - Formulate a 4-step mandatory verification protocol that a human auditor must complete before executing financial adjustments or payroll deductions based on AI-flagged records.
```

#### Expected Output:
```text
### Supervisory Model Validation & Governance Report

#### 1. Potential False Positive in Record A (Morton's Steakhouse $265):
* The Commercial Nuance: If Alexander Wright was dining with 3 prospective clients (4 total attendees), the per-head expenditure is $66.25 ($265 / 4 people), which is well below the $100.00 policy limit.
* Audit Takeaway: The AI flags apparent breaches based on surface data; human auditors must provide the business context (attendee lists) before finalizing an audit observation.

#### 2. Investigating Record B (Structuring):
* Before alleging intentional policy circumvention, internal audit must examine:
  1. Did the employee host small team breakfast standups with multiple colleagues?
  2. Is $49.25 the merchant's fixed daily catering charge?
  3. Has the employee received formal training on corporate receipt retention policies?

#### 3. Data Privacy (PII) Safeguards for Commercial AI:
1. Pseudonymization: Replace employee names with synthetic codes (e.g., EMP_SALES_01) prior to uploading.
2. Banking / PAN Masking: Scrub all 16-digit credit card numbers, IBANs, and merchant bank account details.
3. Enterprise Data Protection (EDP): Only use commercial AI subscriptions that guarantee zero model training on customer corporate data (e.g. Gemini for Google Workspace or M365 Copilot with Commercial Data Protection).

#### 4. Mandatory 4-Step Human Verification Protocol:
1. Step 1 (Source Cross-Check): Corroborate AI-flagged transaction ID against the primary ERP database.
2. Step 2 (Document Inspection): Review original PDF receipt/folio in Accounts Payable archives.
3. Step 3 (Management Inquiry): Issue formal inquiry notice to claimant requesting written business justification.
4. Step 4 (Supervisor Sign-off): Obtain written supervisory concurrence before issuing formal audit findings.
```

#### Explanation of the Expected Output:
This step proves to participants that AI is an accelerator, not a replacement for human judgment. The AI correctly identified that Alexander Wright's $265 dinner might be completely compliant once attendee lists are factored in!

#### How to Verify & Evaluate (Audit Check):
Ensure participants understand: Never dock an employee's salary or reject an expense report solely because "the AI flagged it". The 4-step Human Verification Protocol must always be executed.

---

## 6. Track 2: Unsupervised Learning (Discovery & K-Means Clustering)

### Why is this Dataset Unlabeled?
This dataset is **UNLABELED** because it contains only the raw operational facts straight from the corporate credit card feed. No human auditor has reviewed it yet. There are NO `Audit_Classification`, NO `Risk_Rating`, and NO `Audit_Reasoning` columns. Our goal is to use AI to discover what is in the data *before* we write rules.

### Download the Unsupervised Dataset:
* **Filename:** `unsupervised_finance_audit_raw_dataset.csv`
* **Direct File Link:** [unsupervised_finance_audit_raw_dataset.csv](file:///c:/Users/archi/OneDrive/Desktop/ai%20for%20finance%20and%20audit/model-training-lab/data/unsupervised_finance_audit_raw_dataset.csv)
* **Specifications:** 25 rows, 11 raw transaction columns, zero audit classifications.

### What is K-Means Clustering (Beginner-Friendly Explanation)?
* **Simple Definition:** K-Means is a popular machine learning method that partitions data into "K" distinct groups (clusters) where records within the same group share similar characteristics, while records in different groups look very different.
* **Breaking Down the Name:**
  - **"K" (The Number of Groups):** You decide how many buckets you want. In our lab, we choose **$K = 3$** (Routine Spend, High-Dollar Outliers, and Governance Red Flags).
  - **"Means" (The Average Center):** The algorithm finds the center (average) of each group. Transactions closer to that center belong together.
* **No Programming or Math Needed:** Traditionally, data scientists write Python code (`from sklearn.cluster import KMeans`). In our lab, we use Generative AI (Gemini or Copilot) as our data science co-pilot to perform intuitive K-Means clustering using natural language prompts!

---

### Unsupervised Step 1: Data Ingestion & Hygiene Check (Exploratory Data Analysis)

#### What This Prompt Will Do:
Verifies that the raw unlabeled data is cleanly loaded, checks for missing data values, and calculates departmental summary statistics without making any audit accusations.

#### Prompt to Copy:
```text
Act as a Senior Financial Data Analyst. I have attached our raw, unreviewed corporate expense dataset (unsupervised_finance_audit_raw_dataset.csv).

Perform an exploratory data analysis (EDA) and hygiene review:
1. Confirm the total number of transactions and list the 11 columns detected.
2. Check for missing, null, or corrupted data fields across the records.
3. Calculate total spend, average transaction amount, and spend by Department.
4. Present findings in a clean executive summary table.

Do not attempt to audit or flag policy breaches yet. Confirm when the raw data is verified and ready for clustering.
```

#### Expected Output:
```text
### Exploratory Data Analysis & Hygiene Summary (Raw Unlabeled Dataset)

1. Dataset Integrity Check:
   - Total Records: 25 raw transaction rows successfully ingested.
   - Columns Detected (11): Transaction_ID, Employee_Name, Department, Transaction_Date, Merchant, Expense_Category, Amount, Policy_Limit, Receipt_Attached, Weekend_Transaction, Approval_Level.
   - Data Completeness: 100% of rows have valid IDs and amounts. 6 records have Receipt_Attached = 'No'.

2. Core Departmental Spend Metrics:
| Department | Transaction Count | Total Spend (USD) | % of Total Spend | Average Spend per Claim |
| :--- | :--- | :--- | :--- | :--- |
| Sales | 6 | $8,606.50 | 37.0% | $1,434.42 |
| Executive | 2 | $2,710.00 | 11.6% | $1,355.00 |
| Engineering | 4 | $5,050.00 | 21.7% | $1,262.50 |
| Finance | 4 | $4,944.20 | 21.2% | $1,236.05 |
| Marketing | 5 | $1,778.00 | 7.6% | $355.60 |
| Operations | 4 | $194.75 | 0.9% | $48.69 |
| TOTAL | 25 | $23,283.45 | 100.0% | $931.34 |

Data verified. No mathematical anomalies found. Ready for unsupervised clustering.
```

#### Explanation of the Expected Output:
This establishes the statistical baseline. Notice that Sales is responsible for 37% of total spend, and Operations has an average transaction of only $48.69 (which will become very important later!).

#### How to Verify & Evaluate (Audit Check):
Check the department sum in Excel: Sales ($8,606.50) + Exec ($2,710.00) + Eng ($5,050.00) + Fin ($4,944.20) + Mktg ($1,778.00) + Ops ($194.75) = $23,283.45.

---

### Unsupervised Step 2: Performing Intuitive K-Means Clustering (K = 3) via Generative AI

#### What This Prompt Will Do:
Commands Gemini or Copilot to act as a machine learning engine and partition the 25 unlabeled transactions into 3 natural clusters based on Amount, Receipt status, Weekend timing, and Approval authority.

#### Prompt to Copy:
```text
Act as an Audit Data Scientist. I want you to perform an intuitive K-Means Clustering analysis (with K = 3 clusters) on the 25 raw expense records in unsupervised_finance_audit_raw_dataset.csv.

Group the transactions into 3 natural clusters based on Amount, Policy Limit variance, Receipt Attached status, Weekend timing, and Approval Level:

- Cluster 1: Standard Routine Operational Spend (Normal business hours, reasonable amounts within policy, receipts attached, independent manager approval).
- Cluster 2: High-Dollar Capital & Vendor Overruns (Significant dollar amounts > $1,000, specialized software, equipment, or major airfare).
- Cluster 3: High-Risk Anomalies & Governance Exceptions (Weekend transactions, self-approved executive expenses, duplicate amounts, or consecutive under-$50 claims with missing receipts).

For each cluster:
1. Define the Cluster Centroid (average spend, typical category, key characteristics).
2. List the Transaction IDs assigned to that cluster.
3. Present the results in a 'K-Means Audit Cluster Profile Table'.
```

#### Expected Output:
```text
### K-Means Audit Cluster Profile Table (K = 3 Clusters)

| Cluster ID | Cluster Name & Profile | Record Count | Average Spend | Key Characteristics | Assigned Transaction IDs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Cluster 1 | Standard Routine Spend | 12 records | $185.40 | Low-to-moderate amounts, receipts attached (100%), weekday postings, approved by Manager or Director. Low audit risk. | TXN-1001, TXN-1002, TXN-1004, TXN-1010, TXN-1013, TXN-1015, TXN-1016, TXN-1018, TXN-1021, TXN-1023, TXN-1024, TXN-1025 |
| Cluster 2 | High-Dollar Capital & Vendor Overruns | 5 records | $2,789.20 | Material dollar amounts ($1,248 to $4,200), large hardware/software purchases or cross-country flights. High financial impact. | TXN-1005, TXN-1006, TXN-1012, TXN-1019, TXN-1022 |
| Cluster 3 | Governance Red Flags & Anomaly Spikes | 8 records | $427.60 | Weekend transactions (100%), self-approvals (100%), missing receipts (87%), duplicate billing, or structuring under $50. High governance risk. | TXN-1003, TXN-1007, TXN-1008, TXN-1009, TXN-1011, TXN-1014, TXN-1017, TXN-1020 |

### Cluster Centroids & Separation Summary:
* Cluster 1 Centroid: ~$185 spend | 100% compliant documentation.
* Cluster 2 Centroid: ~$2,789 spend | High dollar volume, vendor contract dependencies.
* Cluster 3 Centroid: ~$428 spend | 0% independent supervisory review, severe policy circumvention.
```

#### Explanation of the Expected Output:
Without writing any Python code or running complex algorithms, Generative AI separated 25 messy rows into three meaningful operational groups: Cluster 1 is safe routine spend, Cluster 2 is big money, and Cluster 3 is where the policy red flags live!

#### How to Verify & Evaluate (Audit Check):
Inspect Cluster 3: Did the AI place Robert Sterling's weekend resort stay (`TXN-1011`) and Elena Rostova's under-$50 claims (`TXN-1007-1009`) in Cluster 3? Yes! That proves the clustering logic separated high-risk behavior from routine coffee and taxis.

---

### Unsupervised Step 3: What to Do Once Clusters are Defined (Post-Cluster Forensic Investigation)

#### What This Prompt Will Do:
Translates the mathematical clusters into actionable audit fieldwork! Teaches the auditor exactly what investigative procedures to perform on each cluster.

#### Prompt to Copy:
```text
Now act as the Chief Audit Executive (CAE). The K-Means clustering analysis has successfully segmented our 25 transactions into 3 distinct operational clusters.

Develop a targeted Post-Cluster Audit Action Plan:
1. What should internal audit do with Cluster 1 (Standard Routine Spend)? How does clustering save audit resources?
2. What specific audit procedures should be performed on Cluster 2 (High-Dollar Overruns)? (e.g. 3-way matching, inventory existence).
3. What forensic investigative steps should be executed on Cluster 3 (Governance Red Flags)? Formulate 3 direct inquiry questions for the employees in Cluster 3.
4. Present your strategy in an 'Audit Action Matrix by Cluster'.
```

#### Expected Output:
```text
### Post-Cluster Audit Action Matrix & Fieldwork Plan

| Cluster ID | Risk Level | Resource Allocation | Mandatory Audit Procedures | Specific Fieldwork Actions |
| :--- | :--- | :--- | :--- | :--- |
| Cluster 1: Routine Spend | Low Risk | 10% of audit time | Automated Clearance / Batch Sample Testing | Apply automated sampling: verify receipts on a 5% sample; release remaining 95% without manual auditor review, freeing up 80% of auditor time. |
| Cluster 2: High-Dollar | Moderate / Financial Risk | 30% of audit time | Substantive 3-Way Match & Asset Tracing | 1) Reconcile $4,200 AWS invoice (TXN-1022) against cloud provisioning tickets. 2) Inspect IT asset tags for $2,899 Apple hardware (TXN-1012). 3) Verify Board sign-offs for expenditures > $1,000. |
| Cluster 3: Red Flags | High / Governance Risk | 60% of audit time | Forensic Investigation & Management Inquiries | 1) Subpoena itemized receipts for Elena Rostova's under-$50 claims. 2) Interview Robert Sterling regarding self-approved weekend resort stays. 3) Reverse duplicate payment on Delta flight (TXN-1006). |

### Priority Supervisory Inquiries for Cluster 3:
1. To Robert Sterling (Executive): "Please provide the signed client meeting agenda and board authorization supporting the $1,890.00 Ritz-Carlton South Beach charge on Saturday, September 15."
2. To Elena Rostova (Operations): "Please provide itemized store register receipts for the four consecutive under-$50 charges at Corner Cafe Express between September 10 and 26."
3. To Accounts Payable Lead: "Why was transaction TXN-1006 released when an identical $1,248.50 payment was already executed on September 8 under TXN-1005?"
```

#### Explanation of the Expected Output:
This is the most critical lesson in unsupervised learning: Clustering is not the end goal—it is the starting point for targeted investigation! Instead of wasting time auditing 100% of receipts, auditors focus 60% of their energy on Cluster 3 (the 8 high-risk items), saving hundreds of hours.

#### How to Verify & Evaluate (Audit Check):
Evaluate the investigation plan: Does it address the specific vulnerabilities discovered in Step 2? Yes—it targets duplicate payments, self-approvals, and structuring.

---

### Unsupervised Step 4: Converting Unsupervised Discoveries into Supervised Policy Rules

#### What This Prompt Will Do:
Teaches participants the full machine learning lifecycle: how unsupervised anomaly clusters get converted into permanent company policies and labeled training data for the future.

#### Prompt to Copy:
```text
Act as a Governance and Financial Policy Advisor. Based on the patterns uncovered in Cluster 3 (unsupervised discovery), formulate 3 new corporate internal control policy clauses that should be added to our Employee Expense Policy to permanently prevent these exceptions:

1. A policy rule addressing consecutive under-$50 claims without receipts (threshold structuring).
2. A policy rule governing executive self-approvals and weekend travel.
3. An automated ERP pre-payment control rule to catch duplicate airfare claims.

Explain how this unsupervised discovery exercise has now created the rules for our SUPERVISED training dataset in the future.
```

#### Expected Output:
```text
### New Governance Policies Derived from Unsupervised Anomaly Discovery

#### 1. Policy Clause 4.3: Receipt Aggregation & Threshold Structuring Rule
> "Employees are prohibited from splitting expenses or submitting multiple receiptless claims under the $50 threshold at the same merchant within a 30-day period. Any employee submitting three or more claims under $50 from the same vendor must submit itemized receipts for all transactions. Failure to provide receipts will result in rejection."

#### 2. Policy Clause 7.1: Executive Travel & Prohibition of Self-Approval
> "No employee, regardless of corporate title or executive grade, may approve their own travel, lodging, or entertainment expenses. All C-suite and executive expenditures exceeding $500, or any expenditures incurred on weekends or non-business days, must be independently approved by the Chief Financial Officer or Board Audit Committee Chair."

#### 3. Automated ERP Control 2.9: Pre-Payment Duplicate Match Rule
> "The ERP Accounts Payable module shall enforce an automated blocking hold on any expense claim or invoice where Employee ID, Merchant Name, Transaction Amount, and Posting Date match an existing claim submitted within 60 days. Payments shall not disburse until resolved by Accounts Payable supervisory review."

---
### Closing the Machine Learning Loop:
* Before Unsupervised Discovery: We had raw, messy, unlabeled transactions and didn't know where the leaks were.
* During Unsupervised Discovery: K-Means clustered the anomalies into Cluster 3.
* After Unsupervised Discovery: We created explicit policy rules. Now, those rules become the labels for future Supervised Learning!
```

#### Explanation of the Expected Output:
This connects both tracks into one complete, cohesive story for the participants: Unsupervised learning discovers the unknown risks -> Humans write policies -> Policies become labeled training data -> Supervised learning automates future compliance!

#### How to Verify & Evaluate (Audit Check):
Confirm that students grasp the full lifecycle: Unsupervised finds the unknown -> Humans create the policy -> Supervised enforces the policy.

---

## 7. Day-to-Day Practical Applications in Finance & Audit

Now that you know how to structure datasets and guide Generative AI, you can apply this exact methodology to your daily workflow:

```
               EVERYDAY FINANCE & AUDIT AI WORKFLOW
┌─────────────────────────────────────────────────────────────────┐
│ 1. Extract raw report from ERP (SAP, Oracle, NetSuite, Workday) │
│ 2. Use Unsupervised Prompts to spot unexpected clusters        │
│ 3. Create 5-10 labeled examples of past audit decisions         │
│ 4. Ground the model with your labeled examples (Supervised)     │
│ 5. Audit the remaining 500 rows in minutes                      │
└─────────────────────────────────────────────────────────────────┘
```

### 1. Accounts Payable & Vendor Invoice Matching
* **The Task:** Reviewing 200 supplier invoices before the weekly payment run.
* **The Unsupervised Discovery:** Group invoices by vendor, payment terms, and invoice date differences to spot split purchase orders.
* **The Supervised Grounding:** Feed 10 historical examples of duplicate billings, tax mismatches, and consulting retainers without purchase orders to automate pre-payment approval flags.

### 2. Manual Journal Entry (JE) SOX Testing
* **The Task:** Testing general ledger entries for management override of controls.
* **The Unsupervised Discovery:** Cluster 10,000 journal entries into 3 groups based on posting hour, dollar amount, and account code.
* **The Supervised Grounding:** Feed labeled examples of non-standard journal entries (posted on weekends, posted after 8:00 PM, round-dollar amounts like $50,000, or entries where Preparer = Approver) to extract SOX audit samples.

### 3. Financial Statement Variance Explanations (FP&A)
* **The Task:** Explaining budget vs. actual variances for monthly management reporting.
* **The Supervised Training:** Feed labeled examples showing how gross margin compression was explained by supply-chain freight surcharges rather than sales discounts.
* **The Prompt:** Ask the AI to parse raw variance spreadsheets and generate executive variance memos adhering to corporate finance terminology.

---

## 8. Governance, Privacy (PII) & Supervisory Checklist

Before using Generative AI with company financial data, ensure your team checks all four boxes:

- [ ] **Data Sanitization (PII Masking):** Ensure employee credit card numbers, bank account numbers, tax IDs, and sensitive personnel identifiers are masked or replaced with synthetic IDs (`EMP-01`) before uploading.
- [ ] **Zero Hallucination Grounding:** Always command the AI to: *"Rely strictly on the provided dataset. Do not assume or extrapolate figures not explicitly stated in the source file."*
- [ ] **Dual Audit Documentation:** Maintain the original raw dataset, the exact prompt string used, and the AI's output in your supervisory audit workpapers for regulatory review.
- [ ] **Human-in-the-Loop Sign-Off:** An AI model cannot sign off on an audit workpaper or approve a financial ledger. A qualified human professional must verify all flagged exceptions against original source documents (receipts, contracts, bank statements).

---
*Created for the Prompt Engineering & AI Training Series – Finance & Audit*
