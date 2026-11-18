/**
 * training-app.js
 * Two-Track Controller for AI Model Training Lab – Finance & Audit
 * Handles Supervised Track, Unsupervised Track (K-Means), Prompt Copying, and Dataset Previews
 */

let activeTrackId = "supervised"; // 'supervised' | 'unsupervised'

document.addEventListener("DOMContentLoaded", () => {
  initTrackSwitcher();
  renderFoundations();
  renderBothTracks();
  initModalListeners();
});

/* ==========================================================================
   1. TRACK SWITCHER
   ========================================================================== */
function initTrackSwitcher() {
  const btnSupervised = document.getElementById("btn-track-supervised");
  const btnUnsupervised = document.getElementById("btn-track-unsupervised");

  if (btnSupervised) {
    btnSupervised.addEventListener("click", () => {
      switchTrack("supervised");
    });
  }

  if (btnUnsupervised) {
    btnUnsupervised.addEventListener("click", () => {
      switchTrack("unsupervised");
    });
  }
}

function switchTrack(trackId) {
  activeTrackId = trackId;

  const btnSup = document.getElementById("btn-track-supervised");
  const btnUnsup = document.getElementById("btn-track-unsupervised");

  if (btnSup) btnSup.classList.toggle("active", trackId === "supervised");
  if (btnUnsup) btnUnsup.classList.toggle("active", trackId === "unsupervised");

  updateTrackVisibility();
  window.scrollTo({ top: 380, behavior: "smooth" });
}

function updateTrackVisibility() {
  const supContainer = document.getElementById("supervised-track-container");
  const unsupContainer = document.getElementById("unsupervised-track-container");
  if (supContainer) supContainer.style.display = (activeTrackId === "supervised") ? "block" : "none";
  if (unsupContainer) unsupContainer.style.display = (activeTrackId === "unsupervised") ? "block" : "none";
}

function renderBothTracks() {
  const supContainer = document.getElementById("supervised-track-container");
  const unsupContainer = document.getElementById("unsupervised-track-container");
  if (supContainer) renderSupervisedTrack(supContainer);
  if (unsupContainer) renderUnsupervisedTrack(unsupContainer);
  updateTrackVisibility();
}
function renderFoundations() {
  const container = document.getElementById("foundations-container");
  if (!container) return;

  const data = TRAINING_LAB_DATA.generalFoundations;

  container.innerHTML = `
    <!-- What is a Dataset? -->
    <div class="card-corporate" style="margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: var(--blue-soft); color: var(--navy-primary); width: 42px; height: 42px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
          📊
        </div>
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-primary);">${data.whatIsDataset.title}</h3>
          <span style="font-size: 0.74rem; color: var(--slate-500); text-transform: uppercase; font-weight: 700;">Data Literacy for Finance & Audit Professionals</span>
        </div>
      </div>
      <p style="font-size: 0.92rem; color: var(--slate-700); line-height: 1.6; margin-bottom: 16px;">
        ${data.whatIsDataset.explanation}
      </p>

      <div class="grid-2" style="margin-bottom: 14px;">
        ${data.whatIsDataset.anatomy.map(a => `
          <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 14px;">
            <div style="font-size: 0.82rem; font-weight: 800; color: var(--navy-primary); margin-bottom: 4px;">
              ${a.name}
            </div>
            <div style="font-size: 0.8rem; color: var(--slate-600); line-height: 1.45;">
              ${a.desc}
            </div>
          </div>
        `).join("")}
      </div>

      <div style="background: #f0f9ff; border-left: 3px solid var(--blue-sky); padding: 10px 14px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.82rem; color: var(--slate-700); line-height: 1.5;">
        <strong>Why Generative AI Needs Datasets:</strong> ${data.whatIsDataset.whyAiNeedsIt}
      </div>
    </div>

    <!-- Platform Setup Guides: Gemini vs M365 Copilot -->
    <div class="card-corporate" style="margin-bottom: 28px; background: linear-gradient(135deg, #071326 0%, #0f172a 100%); color: var(--white); border-color: rgba(56, 189, 248, 0.3);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--white); display: flex; align-items: center; gap: 8px;">
            <span>🚀 Setup Your AI Environment: Google Gemini or Microsoft 365 Copilot</span>
          </h4>
          <p style="font-size: 0.82rem; color: var(--slate-300);">
            Open either tool in a separate browser tab. Keep this lab window side-by-side to copy prompts.
          </p>
        </div>
        <span class="badge-corp" style="background: rgba(56, 189, 248, 0.2); color: var(--blue-ice); border-color: rgba(56, 189, 248, 0.4);">
          Zero-Code AI Training
        </span>
      </div>

      <div class="grid-2">
        ${data.toolsGuide.map(t => `
          <div class="platform-card">
            <div>
              <div class="platform-header">
                <div class="platform-title">
                  <span style="font-size: 1.3rem;">${t.icon}</span>
                  <span>${t.tool}</span>
                </div>
                <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="btn-action btn-download" style="background: var(--blue-sky); text-decoration: none; font-size: 0.74rem;">
                  Launch ${t.tool} ↗
                </a>
              </div>
              <div style="font-size: 0.72rem; color: var(--blue-ice); font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">
                ${t.badge} Workflow:
              </div>
              <ul class="platform-steps">
                ${t.steps.map((s, idx) => `
                  <li>
                    <span>${idx + 1}.</span>
                    <span>${s}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
            <div style="background: rgba(0,0,0,0.25); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.72rem; color: var(--slate-300); display: flex; align-items: center; gap: 6px;">
              <span>💡</span>
              <span><strong>Pro Tip:</strong> Always start a fresh chat session for each lab track!</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

/* ==========================================================================
   3. ACTIVE TRACK RENDERING (SUPERVISED vs UNSUPERVISED)
   ========================================================================== */
function renderActiveTrack() {
  const container = document.getElementById("active-track-container");
  if (!container) return;

  if (activeTrackId === "supervised") {
    renderSupervisedTrack(container);
  } else {
    renderUnsupervisedTrack(container);
  }
}

/* --------------------------------------------------------------------------
   SUPERVISED TRACK
   -------------------------------------------------------------------------- */
function renderSupervisedTrack(container) {
  const track = TRAINING_LAB_DATA.supervisedTrack;
  const ds = track.intro.datasetInfo;

  container.innerHTML = `
    <!-- Track Title Banner -->
    <div style="margin-bottom: 24px;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 6px;">
        <span class="badge-corp badge-supervised" style="font-size: 0.8rem; padding: 4px 12px;">${track.badge}</span>
        <span style="font-size: 0.82rem; color: var(--slate-500); font-weight: 600;">Track 1 of 2</span>
      </div>
      <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--navy-primary); letter-spacing: -0.02em;">
        ${track.title}
      </h2>
      <p style="font-size: 0.95rem; color: var(--slate-600); max-width: 950px; line-height: 1.6;">
        ${track.intro.headline}: ${track.intro.conceptExplanation}
      </p>
    </div>

    <!-- Explanations for Beginners -->
    <div class="grid-2" style="margin-bottom: 24px;">
      <!-- Analogy Card -->
      <div class="card-corporate" style="border-left: 4px solid var(--emerald-600);">
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--emerald-600); margin-bottom: 8px;">
          👨‍🏫 Simple Analogy: Teaching with an "Answer Key"
        </h4>
        <p style="font-size: 0.88rem; color: var(--slate-700); line-height: 1.55; margin-bottom: 12px;">
          ${track.intro.analogy}
        </p>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-sm); padding: 10px 12px; font-size: 0.78rem; color: #166534;">
          <strong>Why is this called "Supervised"?</strong> Because human intelligence <em>supervises</em> the learning process by providing the ground truth answers.
        </div>
      </div>

      <!-- Why is it labeled? -->
      <div class="card-corporate" style="border-left: 4px solid var(--navy-primary);">
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--navy-primary); margin-bottom: 8px;">
          🏷️ Why is this Dataset Labeled?
        </h4>
        <p style="font-size: 0.86rem; color: var(--slate-700); line-height: 1.55; margin-bottom: 12px;">
          ${track.intro.whyIsItLabeled}
        </p>
        <div style="font-size: 0.76rem; color: var(--slate-600);">
          <strong>Target Columns Added by Auditor:</strong>
          <span style="font-family: var(--font-mono); color: var(--navy-primary);">Audit_Classification, Risk_Rating, Audit_Reasoning</span>
        </div>
      </div>
    </div>

    <!-- Dataset Download & Label Breakdown Box -->
    <div class="card-corporate" style="margin-bottom: 28px; background: #fafafa; border: 1.5px solid #cbd5e1;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: #dcfce7; color: #15803d; width: 44px; height: 44px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.95rem;">
            CSV
          </div>
          <div>
            <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--slate-900);">${ds.filename}</h4>
            <span style="font-size: 0.74rem; color: var(--slate-500);">${ds.records} rows • ${ds.columns} columns • Ground Truth Dataset</span>
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <a href="${ds.downloadPath}" download="${ds.filename}" class="btn-action btn-download" style="text-decoration: none;">
            ⬇ Download Supervised CSV
          </a>
          <button class="btn-action btn-preview" onclick="openDatasetModal('supervised-ds')">
            👁 In-App Table Preview
          </button>
        </div>
      </div>

      <!-- 6 Audit Labels Explained -->
      <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 14px;">
        <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--navy-primary); margin-bottom: 10px;">
          The 6 Ground Truth Audit Labels in This Dataset:
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
          ${ds.keyLabels.map(l => `
            <div style="background: var(--slate-50); border-left: 3px solid var(--navy-primary); padding: 8px 10px; font-size: 0.78rem;">
              <strong style="color: var(--slate-900); font-family: var(--font-mono); font-size: 0.74rem;">${l.label}:</strong>
              <span style="color: var(--slate-600); margin-left: 4px;">${l.desc}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    <!-- Guided Steps -->
    <div>
      <div style="margin-bottom: 16px;">
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--slate-900);">
          ⚡ Step-by-Step Supervised Training Workflow
        </h3>
        <p style="font-size: 0.85rem; color: var(--slate-600);">
          Execute these prompts sequentially in Gemini or Copilot. No coding or algorithms required!
        </p>
      </div>

      <div>
        ${track.steps.map(s => renderStepCard(s, "supervised")).join("")}
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   UNSUPERVISED TRACK (K-MEANS)
   -------------------------------------------------------------------------- */
function renderUnsupervisedTrack(container) {
  const track = TRAINING_LAB_DATA.unsupervisedTrack;
  const ds = track.intro.datasetInfo;
  const km = track.intro.whatIsKMeans;

  container.innerHTML = `
    <!-- Track Title Banner -->
    <div style="margin-bottom: 24px;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 6px;">
        <span class="badge-corp badge-unsupervised" style="font-size: 0.8rem; padding: 4px 12px;">${track.badge}</span>
        <span style="font-size: 0.82rem; color: var(--slate-500); font-weight: 600;">Track 2 of 2</span>
      </div>
      <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--navy-primary); letter-spacing: -0.02em;">
        ${track.title}
      </h2>
      <p style="font-size: 0.95rem; color: var(--slate-600); max-width: 950px; line-height: 1.6;">
        ${track.intro.headline}: ${track.intro.conceptExplanation}
      </p>
    </div>

    <!-- Explanations for Beginners -->
    <div class="grid-2" style="margin-bottom: 24px;">
      <!-- Analogy Card -->
      <div class="card-corporate" style="border-left: 4px solid var(--purple-600);">
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--purple-600); margin-bottom: 8px;">
          🔍 Simple Analogy: The Detective Sorting Mixed Keys
        </h4>
        <p style="font-size: 0.88rem; color: var(--slate-700); line-height: 1.55; margin-bottom: 12px;">
          ${track.intro.analogy}
        </p>
        <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: var(--radius-sm); padding: 10px 12px; font-size: 0.78rem; color: #5b21b6;">
          <strong>Why is this called "Unsupervised"?</strong> Because there is no teacher and no answer key. The algorithm finds natural patterns solely from data relationships.
        </div>
      </div>

      <!-- Why is it unlabeled? -->
      <div class="card-corporate" style="border-left: 4px solid var(--slate-600);">
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--slate-900); margin-bottom: 8px;">
          📄 Why is this Dataset Unlabeled?
        </h4>
        <p style="font-size: 0.86rem; color: var(--slate-700); line-height: 1.55; margin-bottom: 12px;">
          ${track.intro.whyIsItUnlabeled}
        </p>
        <div style="font-size: 0.76rem; color: var(--slate-600);">
          <strong>What We Have:</strong> Raw transaction facts (Employee, Merchant, Amount, Limit, Approver, Weekend).
        </div>
      </div>
    </div>

    <!-- What is K-Means Clustering? (Beginner Friendly) -->
    <div class="card-corporate" style="margin-bottom: 24px; background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%); border: 1.5px solid #bfdbfe;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <span style="font-size: 1.3rem;">🎯</span>
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--navy-primary);">${km.title}</h4>
      </div>
      <p style="font-size: 0.88rem; color: var(--slate-700); line-height: 1.6; margin-bottom: 14px;">
        ${km.simpleDefinition}
      </p>

      <div class="grid-2" style="margin-bottom: 12px;">
        ${km.breakingDownTheName.map(b => `
          <div style="background: var(--white); border: 1px solid #bfdbfe; border-radius: var(--radius-sm); padding: 12px;">
            <div style="font-size: 0.82rem; font-weight: 800; color: var(--navy-primary); margin-bottom: 4px;">
              ${b.term}
            </div>
            <div style="font-size: 0.78rem; color: var(--slate-600); line-height: 1.45;">
              ${b.desc}
            </div>
          </div>
        `).join("")}
      </div>

      <div style="background: var(--white); border-left: 3px solid var(--emerald-600); padding: 10px 14px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.8rem; color: var(--slate-700); line-height: 1.5;">
        <strong>No Programming or Python Math Needed:</strong> ${km.noCodingNeeded}
      </div>
    </div>

    <!-- Dataset Download Box -->
    <div class="card-corporate" style="margin-bottom: 28px; background: #fafafa; border: 1.5px solid #cbd5e1;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: var(--blue-soft); color: var(--navy-primary); width: 44px; height: 44px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.95rem;">
            CSV
          </div>
          <div>
            <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--slate-900);">${ds.filename}</h4>
            <span style="font-size: 0.74rem; color: var(--slate-500);">${ds.records} rows • ${ds.columns} columns • Raw Unlabeled Transaction Extract</span>
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <a href="${ds.downloadPath}" download="${ds.filename}" class="btn-action btn-download" style="text-decoration: none;">
            ⬇ Download Unsupervised CSV
          </a>
          <button class="btn-action btn-preview" onclick="openDatasetModal('unsupervised-ds')">
            👁 In-App Table Preview
          </button>
        </div>
      </div>
      <p style="font-size: 0.8rem; color: var(--slate-600);">
        This dataset has zero audit labels. In the steps below, you will ask Gemini/Copilot to partition these 25 transactions into 3 K-Means clusters and create an audit investigation plan.
      </p>
    </div>

    <!-- Guided Steps -->
    <div>
      <div style="margin-bottom: 16px;">
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--slate-900);">
          ⚡ Step-by-Step Unsupervised K-Means Workflow
        </h3>
        <p style="font-size: 0.85rem; color: var(--slate-600);">
          Follow the 4 steps: Hygiene Check → K-Means Clustering ($K=3$) → Post-Cluster Investigation → Writing New Policies.
        </p>
      </div>

      <div>
        ${track.steps.map(s => renderStepCard(s, "unsupervised")).join("")}
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   STEP CARD COMPONENT (Used in both Supervised and Unsupervised Tracks)
   -------------------------------------------------------------------------- */
function renderStepCard(step, trackKey) {
  const stepId = `${trackKey}-step-${step.stepNum}`;

  return `
    <div class="phase-card">
      <!-- Step Header -->
      <div class="phase-header">
        <div class="phase-title-group">
          <span class="phase-number-badge" style="background: ${trackKey === 'supervised' ? 'var(--emerald-600)' : 'var(--purple-600)'};">
            Step ${step.stepNum}
          </span>
          <h4 class="phase-heading">${step.name}</h4>
        </div>
        <span class="badge-corp">${step.badge}</span>
      </div>

      <!-- 1. What This Prompt Will Do -->
      <div style="background: #f8fafc; border: 1px solid var(--slate-200); border-radius: var(--radius-sm); padding: 12px 14px; margin-bottom: 14px;">
        <strong style="color: var(--navy-primary); font-size: 0.8rem; text-transform: uppercase;">
          🎯 What This Prompt Will Do:
        </strong>
        <p style="font-size: 0.85rem; color: var(--slate-700); margin-top: 4px; line-height: 1.5;">
          ${step.whatPromptDoes}
        </p>
      </div>

      <!-- 2. The Prompt Box with One-Click Copy -->
      <div class="prompt-container">
        <div class="prompt-bar">
          <span class="prompt-bar-label">Prompt to Copy into Gemini or Copilot:</span>
          <button class="btn-copy" onclick="copyStepPrompt(this, '${stepId}')">
            📋 Copy Prompt
          </button>
        </div>
        <pre class="prompt-code" id="code-${stepId}">${escapeHtml(step.prompt)}</pre>
      </div>

      <!-- 3. Expected Output (Collapsible) -->
      <div class="simulated-output-box" style="margin-bottom: 14px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h5 style="font-size: 0.82rem; font-weight: 800; text-transform: uppercase; color: var(--slate-900);">
              💡 Expected AI Benchmark Output:
            </h5>
            <span style="font-size: 0.74rem; color: var(--slate-500);">Compare what Gemini or Copilot generates against this standard</span>
          </div>
          <button class="btn-action btn-preview" style="font-size: 0.72rem; padding: 4px 12px;" onclick="toggleStepOutput('${stepId}')">
            <span id="btn-toggle-${stepId}">Show Expected Output</span>
          </button>
        </div>
        <div class="simulated-output-content" id="output-${stepId}" style="display: none;">
          ${renderMarkdownTable(step.expectedOutput)}
        </div>
      </div>

      <!-- 4. Output Explanation & 5. Verification Guide Dual Grid -->
      <div class="dual-inspection-grid">
        <!-- Explanation of the Output -->
        <div class="inspection-card" style="border-left: 3px solid var(--blue-sky);">
          <h5 style="color: var(--navy-primary);">
            <span>📖</span>
            <span>Explanation of the Output:</span>
          </h5>
          <p style="font-size: 0.82rem; color: var(--slate-700); line-height: 1.55;">
            ${step.outputExplanation}
          </p>
        </div>

        <!-- How to Verify and Evaluate -->
        <div class="inspection-card" style="border-left: 3px solid var(--emerald-600); background: #f0fdf4;">
          <h5 style="color: #166534;">
            <span>🛡️</span>
            <span>How to Verify & Evaluate (Audit Check):</span>
          </h5>
          <p style="font-size: 0.82rem; color: #14532d; line-height: 1.55;">
            ${step.verificationGuide}
          </p>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   4. COPY PROMPT & TOGGLE HELPERS
   ========================================================================== */
function copyStepPrompt(btn, stepId) {
  const codeEl = document.getElementById(`code-${stepId}`);
  if (!codeEl) return;

  const textToCopy = codeEl.textContent;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const origText = btn.innerHTML;
    btn.innerHTML = "✔ Copied to Clipboard!";
    btn.style.background = "var(--emerald-600)";
    setTimeout(() => {
      btn.innerHTML = origText;
      btn.style.background = "";
    }, 2000);
  }).catch(() => {
    alert("Prompt copied to clipboard!");
  });
}

function toggleStepOutput(stepId) {
  const outputBox = document.getElementById(`output-${stepId}`);
  const toggleBtnText = document.getElementById(`btn-toggle-${stepId}`);
  if (!outputBox || !toggleBtnText) return;

  if (outputBox.style.display === "none") {
    outputBox.style.display = "block";
    toggleBtnText.textContent = "Hide Expected Output";
  } else {
    outputBox.style.display = "none";
    toggleBtnText.textContent = "Show Expected Output";
  }
}

/* ==========================================================================
   5. DATASET PREVIEW MODAL
   ========================================================================== */
function openDatasetModal(dsId) {
  let dataset = null;
  if (dsId === "supervised-ds") {
    dataset = {
      name: "Supervised Training Dataset (Labeled)",
      filename: "supervised_finance_audit_training_dataset.csv",
      content: TRAINING_LAB_DATA.supervisedTrack.intro.datasetInfo.previewContent
    };
  } else {
    dataset = {
      name: "Unsupervised Raw Dataset (Unlabeled)",
      filename: "unsupervised_finance_audit_raw_dataset.csv",
      content: TRAINING_LAB_DATA.unsupervisedTrack.intro.datasetInfo.previewContent
    };
  }

  const modal = document.getElementById("dataset-preview-modal");
  const title = document.getElementById("modal-dataset-title");
  const body = document.getElementById("modal-dataset-body");
  if (!modal || !title || !body) return;

  title.textContent = `In-App Preview: ${dataset.name}`;
  body.innerHTML = `
    <div style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 0.8rem; color: var(--slate-600);">25 Total Rows • Direct Spreadsheet View</span>
      <input type="text" id="modal-table-filter" placeholder="Filter by Employee, Merchant or Category..." onkeyup="filterModalTable()" style="padding: 6px 12px; font-size: 0.78rem; border: 1px solid var(--slate-300); border-radius: var(--radius-sm); width: 300px;">
    </div>
    <div id="modal-table-wrapper">
      ${renderCsvAsTable(dataset.content)}
    </div>
  `;

  modal.classList.remove("is-hidden");
}

function filterModalTable() {
  const input = document.getElementById("modal-table-filter");
  if (!input) return;
  const filter = input.value.toLowerCase();
  const table = document.querySelector(".modal-table tbody");
  if (!table) return;

  const rows = table.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    const text = rows[i].textContent || rows[i].innerText;
    if (text.toLowerCase().indexOf(filter) > -1) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

function initModalListeners() {
  document.querySelectorAll(".modal-close-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal-overlay").forEach(m => m.classList.add("is-hidden"));
    });
  });

  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.add("is-hidden");
      }
    });
  });
}

function renderCsvAsTable(csvText) {
  const lines = csvText.trim().split("\n").filter(l => l.trim().length > 0);
  if (lines.length === 0) return "<p>Empty CSV</p>";

  const parseLine = (line) => {
    const result = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const headerCols = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);

  return `
    <div style="overflow-x: auto; max-height: 60vh;">
      <table class="modal-table">
        <thead>
          <tr>
            ${headerCols.map(c => `<th>${escapeHtml(c)}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr>
              ${r.map(val => `<td>${escapeHtml(val)}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMarkdownTable(mdText) {
  if (!mdText) return "";
  const lines = mdText.split("\n");
  let inTable = false;
  let html = "";
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(line);
    } else {
      if (inTable) {
        html += formatMarkdownTableRows(tableRows);
        inTable = false;
        tableRows = [];
      }
      if (line.startsWith("### ")) {
        html += `<h4 style="font-size: 0.95rem; font-weight: 800; color: var(--navy-primary); margin: 10px 0 6px;">${escapeHtml(line.replace("### ", ""))}</h4>`;
      } else if (line.startsWith("#### ")) {
        html += `<h5 style="font-size: 0.85rem; font-weight: 700; color: var(--slate-800); margin: 8px 0 4px;">${escapeHtml(line.replace("#### ", ""))}</h5>`;
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        html += `<ul style="margin: 4px 0 4px 18px;"><li>${formatBoldText(line.substring(2))}</li></ul>`;
      } else if (line.length > 0) {
        html += `<p style="margin-bottom: 6px;">${formatBoldText(line)}</p>`;
      }
    }
  }

  if (inTable) {
    html += formatMarkdownTableRows(tableRows);
  }

  return html;
}

function formatMarkdownTableRows(rows) {
  if (rows.length < 2) return "";
  const headerCols = rows[0].split("|").slice(1, -1).map(c => c.trim());
  const bodyRows = rows.slice(2);

  return `
    <table>
      <thead>
        <tr>
          ${headerCols.map(c => `<th>${formatBoldText(c)}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${bodyRows.map(r => {
          const cols = r.split("|").slice(1, -1).map(c => c.trim());
          return `<tr>${cols.map(c => `<td>${formatBoldText(c)}</td>`).join("")}</tr>`;
        }).join("")}
      </tbody>
    </table>
  `;
}

function formatBoldText(str) {
  return escapeHtml(str)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
}
