// ============================================================
// LAST WILL AND TESTAMENT
// Drop into: /lib/templates/will-testament.ts
// Use case: Last will and testament of a testator (person making
//           the will) distributing their assets after death.
//           Covers movable and immovable property, bank accounts,
//           investments, jewellery, and personal effects.
//           Also appoints executor(s) and guardian for minors.
// Statute refs: Indian Succession Act 1925 Part VI ss.57–191
//   (applies to Hindus, Buddhists, Sikhs, Jains for wills);
//   Hindu Succession Act 1956 (intestate succession if no will);
//   Registration Act 1908 s.18 (registration of will — optional
//   but recommended); Indian Stamp Act (no stamp duty on wills);
//   Probate and Administration — CPC 1908 / High Court rules;
//   Muslim Personal Law (for Muslims — separate template)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const willTestament: TemplateModule = {
  meta: {
    id: "will-testament",
    name: "Last Will and Testament",
    categoryId: "personal",
    category: "Personal & Family",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Last will and testament for a Hindu / non-Muslim Indian testator distributing immovable property, bank accounts, investments, jewellery, and personal effects. Appoints executor(s) and guardian for minor children. Registration optional but recommended.",
    aliases: [
      "will",
      "testament",
      "last will and testament",
      "will India",
      "property will",
      "testamentary document",
      "will deed",
      "legal will India",
    ],
    pages: 6,
    minutes: 12,
    status: "live",
  },

  groups: [
    {
      title: "Testator (person making the will)",
      fields: [
        { id: "wt_testator_name", label: "Testator full name", type: "text", required: true, placeholder: "Ramesh Kumar Sharma" },
        { id: "wt_testator_age", label: "Age (must be 18 or above)", type: "number", required: true, placeholder: "55" },
        { id: "wt_testator_addr", label: "Testator address", type: "textarea", rows: 2, required: true },
        { id: "wt_testator_religion", label: "Religion", type: "select", default: "hindu", options: [{ value: "hindu", label: "Hindu" }, { value: "sikh", label: "Sikh" }, { value: "buddhist", label: "Buddhist" }, { value: "jain", label: "Jain" }, { value: "christian", label: "Christian" }, { value: "parsi", label: "Parsi" }] },
        { id: "wt_state", label: "State / UT", type: "select", required: true, options: [
            { value: "Andhra Pradesh", label: "Andhra Pradesh" },
            { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
            { value: "Assam", label: "Assam" },
            { value: "Bihar", label: "Bihar" },
            { value: "Chhattisgarh", label: "Chhattisgarh" },
            { value: "Goa", label: "Goa" },
            { value: "Gujarat", label: "Gujarat" },
            { value: "Haryana", label: "Haryana" },
            { value: "Himachal Pradesh", label: "Himachal Pradesh" },
            { value: "Jharkhand", label: "Jharkhand" },
            { value: "Karnataka", label: "Karnataka" },
            { value: "Kerala", label: "Kerala" },
            { value: "Madhya Pradesh", label: "Madhya Pradesh" },
            { value: "Maharashtra", label: "Maharashtra" },
            { value: "Manipur", label: "Manipur" },
            { value: "Meghalaya", label: "Meghalaya" },
            { value: "Mizoram", label: "Mizoram" },
            { value: "Nagaland", label: "Nagaland" },
            { value: "Odisha", label: "Odisha" },
            { value: "Punjab", label: "Punjab" },
            { value: "Rajasthan", label: "Rajasthan" },
            { value: "Sikkim", label: "Sikkim" },
            { value: "Tamil Nadu", label: "Tamil Nadu" },
            { value: "Telangana", label: "Telangana" },
            { value: "Tripura", label: "Tripura" },
            { value: "Uttar Pradesh", label: "Uttar Pradesh" },
            { value: "Uttarakhand", label: "Uttarakhand" },
            { value: "West Bengal", label: "West Bengal" },
            { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
            { value: "Chandigarh", label: "Chandigarh" },
            { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
            { value: "Delhi", label: "Delhi" },
            { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
            { value: "Ladakh", label: "Ladakh" },
            { value: "Lakshadweep", label: "Lakshadweep" },
            { value: "Puducherry", label: "Puducherry" },
          ] },
        { id: "wt_will_date", label: "Date of will", type: "date", required: true },
        { id: "wt_place", label: "Place of execution", type: "text", required: true, placeholder: "Bengaluru" },
      ],
    },
    {
      title: "Executor(s)",
      fields: [
        { id: "wt_executor_1_name", label: "Executor 1 full name", type: "text", required: true, placeholder: "Priya Sharma (daughter)" },
        { id: "wt_executor_1_rel", label: "Relationship to testator", type: "text", required: true, placeholder: "Daughter" },
        { id: "wt_executor_1_addr", label: "Executor 1 address", type: "textarea", rows: 2, required: true },
        { id: "wt_executor_2_name", label: "Alternate executor name (if executor 1 predeceases testator)", type: "text", placeholder: "Rahul Sharma (son)" },
        { id: "wt_executor_2_rel", label: "Alternate executor relationship", type: "text", placeholder: "Son" },
      ],
    },
    {
      title: "Family / heirs",
      fields: [
        { id: "wt_spouse_name", label: "Spouse name (if living)", type: "text", placeholder: "Sunita Sharma" },
        { id: "wt_children", label: "Children names and ages (comma-separated)", type: "textarea", rows: 2, placeholder: "Priya Sharma (30), Rahul Sharma (27), Ananya Sharma (minor, age 12)" },
        {
          id: "wt_minor_children",
          label: "Are there minor children (under 18)?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No minor children" },
            { value: "yes", label: "Yes — guardian appointment needed" },
          ],
        },
        { id: "wt_guardian_name", label: "Guardian for minor children (if applicable)", type: "text", placeholder: "Sunita Sharma (mother) / Priya Sharma (elder sister)" },
      ],
    },
    {
      title: "Assets and bequests",
      fields: [
        {
          id: "wt_immovable_bequests",
          label: "Immovable property bequests (describe each property and beneficiary)",
          type: "textarea",
          rows: 5,
          placeholder:
            "1. Flat No. 302, Prestige Tower, Bengaluru — to my daughter Priya Sharma absolutely.\n2. Ancestral house at [Village/Town] — to my son Rahul Sharma absolutely.\n3. Plot No. 45, [Layout], Bengaluru — to be sold and proceeds divided equally between Priya Sharma and Rahul Sharma.",
        },
        {
          id: "wt_bank_bequests",
          label: "Bank accounts / FDs / NSC / PPF (describe and beneficiary)",
          type: "textarea",
          rows: 3,
          placeholder:
            "1. SBI Savings Account No. XXXXXXXXXX, SBI Koramangala Branch — to my wife Sunita Sharma.\n2. HDFC FD maturing in [year] — to be divided equally between Priya Sharma and Rahul Sharma.\n3. PPF Account with SBI — to my wife Sunita Sharma.",
        },
        {
          id: "wt_investments_bequests",
          label: "Shares / mutual funds / demat (describe and beneficiary)",
          type: "textarea",
          rows: 3,
          placeholder:
            "1. All shares held in demat account with Zerodha (DP ID: XXXXXXXXXX) — to my daughter Priya Sharma.\n2. Mutual fund units in HDFC AMC folio [no.] — to my son Rahul Sharma.",
        },
        {
          id: "wt_jewellery_bequests",
          label: "Jewellery / valuables (describe and beneficiary)",
          type: "textarea",
          rows: 2,
          placeholder:
            "All gold jewellery in my possession / locker at SBI Koramangala — to my wife Sunita Sharma. Specific gold chain (50g) and ring (10g) — to my daughter Priya Sharma.",
        },
        {
          id: "wt_residuary",
          label: "Residuary bequest (any asset not specifically mentioned)",
          type: "textarea",
          rows: 2,
          required: true,
          placeholder: "All remaining assets, movable and immovable, not specifically bequeathed herein, to be divided equally between my children Priya Sharma and Rahul Sharma.",
        },
      ],
    },
    {
      title: "Additional provisions",
      fields: [
        {
          id: "wt_debts",
          label: "Provision for debts / liabilities",
          type: "radio",
          required: true,
          default: "executor",
          options: [
            { value: "executor", label: "All debts to be paid by executor from estate before distribution" },
            { value: "specific_heir", label: "Specific heir to assume debts (describe in residuary)" },
          ],
        },
        {
          id: "wt_funeral",
          label: "Funeral / last rites wishes",
          type: "text",
          placeholder: "As per Hindu customs and rites.",
        },
        {
          id: "wt_prior_wills",
          label: "Revocation of prior wills",
          type: "radio",
          required: true,
          default: "yes",
          options: [
            { value: "yes", label: "Yes — this will revokes all prior wills and codicils" },
            { value: "no", label: "No prior wills" },
          ],
        },
      ],
    },
  ],

  render(e) {
    const testator = e.wt_testator_name || "[Testator]";
    const executor1 = e.wt_executor_1_name || "[Executor]";
    const executor2 = e.wt_executor_2_name || "";

    const blocks: DocSection[] = [];

    blocks.push({ kind: "title", text: "LAST WILL AND TESTAMENT" });

    blocks.push({
      kind: "para",
      text:
        "I, " + testator + ", aged " + (e.wt_testator_age || "[Age]") + " years, residing at " + (e.wt_testator_addr || "[Address]") + ", being of sound mind, sound memory, and good understanding, and not acting under any force, compulsion, undue influence, or coercion, do hereby revoke all former wills and testamentary documents made by me" +
        (e.wt_prior_wills === "yes" ? ", if any" : "") +
        ", and make, publish, and declare this to be my LAST WILL AND TESTAMENT on [WILL_DATE] at " + (e.wt_place || "[Place]") + ", [STATE_NAME], as follows:",
    });

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Appointment of Executor",
        text:
          "I hereby appoint " + executor1 + ", " + (e.wt_executor_1_rel || "my relative") + ", residing at " + (e.wt_executor_1_addr || "[Address]") + ", as the Executor of this Will.\n\n" +
          (executor2
            ? "In the event that " + executor1 + " is unable or unwilling to act as Executor (whether by reason of death, incapacity, or otherwise), I appoint " + executor2 + ", my " + (e.wt_executor_2_rel || "relative") + ", as alternate Executor."
            : "The Executor shall have all powers necessary and convenient for administering my estate as herein provided.") +
          "\n\nThe Executor shall not be required to furnish any security or surety for the due performance of their duties. The Executor shall be entitled to reimbursement of all reasonable expenses incurred in the administration of my estate.",
      },
    ];

    if (e.wt_minor_children === "yes" && e.wt_guardian_name) {
      clauses.push({
        kind: "clause",
        number: 2,
        title: "Appointment of Guardian",
        text:
          "In the event of the death of my spouse" + (e.wt_spouse_name ? " " + e.wt_spouse_name : "") + " or in any other event where a guardian is required for my minor children, I hereby appoint " + e.wt_guardian_name + " as guardian of the person and property of my minor children until they attain the age of 18 years. I request all authorities and courts to give effect to this appointment.",
      });
    }

    const nextClause = e.wt_minor_children === "yes" && e.wt_guardian_name ? 3 : 2;

    clauses.push({
      kind: "clause",
      number: nextClause,
      title: "Payment of Debts and Liabilities",
      text:
        e.wt_debts === "executor"
          ? "I direct my Executor to pay all my just and lawful debts, funeral expenses, and the costs and expenses of administering this Will and my estate, out of my estate, as soon as practicable after my death and before distributing my estate to the beneficiaries."
          : "My just and lawful debts and liabilities shall be paid from my estate before distribution. [Specify any specific heir assuming specific debts, if applicable.]",
    });

    if (e.wt_immovable_bequests) {
      clauses.push({
        kind: "clause",
        number: nextClause + 1,
        title: "Bequest of Immovable Property",
        text:
          "I hereby bequeath my immovable property / properties as follows:\n\n" + e.wt_immovable_bequests,
      });
    }

    let clauseCounter = nextClause + (e.wt_immovable_bequests ? 2 : 1);

    if (e.wt_bank_bequests) {
      clauses.push({
        kind: "clause",
        number: clauseCounter,
        title: "Bequest of Bank Accounts, Fixed Deposits, and Savings",
        text: "I hereby bequeath my bank accounts, fixed deposits, and savings instruments as follows:\n\n" + e.wt_bank_bequests,
      });
      clauseCounter++;
    }

    if (e.wt_investments_bequests) {
      clauses.push({
        kind: "clause",
        number: clauseCounter,
        title: "Bequest of Shares, Mutual Funds, and Investments",
        text: "I hereby bequeath my shares, mutual fund units, demat holdings, and other investments as follows:\n\n" + e.wt_investments_bequests,
      });
      clauseCounter++;
    }

    if (e.wt_jewellery_bequests) {
      clauses.push({
        kind: "clause",
        number: clauseCounter,
        title: "Bequest of Jewellery and Personal Effects",
        text: "I hereby bequeath my jewellery, valuables, and personal effects as follows:\n\n" + e.wt_jewellery_bequests,
      });
      clauseCounter++;
    }

    clauses.push({
      kind: "clause",
      number: clauseCounter,
      title: "Residuary Estate",
      text:
        "Subject to the foregoing bequests, all the rest, residue, and remainder of my estate (whether movable or immovable, herein specifically bequeathed or not) shall be dealt with as follows:\n\n" +
        (e.wt_residuary || "[Residuary bequest]"),
    });

    clauseCounter++;

    if (e.wt_funeral) {
      clauses.push({
        kind: "clause",
        number: clauseCounter,
        title: "Funeral Wishes",
        text: "I express the wish that my funeral and last rites be performed as follows: " + e.wt_funeral,
      });
      clauseCounter++;
    }

    clauses.push({
      kind: "clause",
      number: clauseCounter,
      title: "General Provisions",
      text:
        "If any beneficiary named herein shall predecease me, their bequest shall lapse and form part of the residuary estate, unless I have elsewhere provided for such contingency.\n\n" +
        "No beneficiary shall be required to bring into account any gift, advancement, or payment received from me during my lifetime as a condition of taking under this Will.\n\n" +
        "This Will shall be governed by and construed in accordance with the Indian Succession Act 1925 and the laws of India. Any dispute in respect of this Will shall be referred to the appropriate civil court having jurisdiction.",
    });

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text:
        "IN WITNESS WHEREOF, I, " + testator + ", have set my hand to this my Last Will and Testament on [WILL_DATE] at " + (e.wt_place || "[Place]") + ", [STATE_NAME], in the presence of the witnesses below, who have attested this Will in my presence and in the presence of each other.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "TESTATOR\n" + testator, name: "[Signature / Left thumb impression]" },
      ],
    });

    blocks.push({
      kind: "para",
      text:
        "ATTESTING WITNESSES:\n\nWe the undersigned witnesses declare that the above-named Testator signed / acknowledged this Will in our presence, and that we then signed as witnesses in the Testator's presence and in the presence of each other. We are not beneficiaries under this Will.\n\n" +
        "Witness 1: Name: ___________________ Signature: _______________ Address: _______________ Date: _______________\n\n" +
        "Witness 2: Name: ___________________ Signature: _______________ Address: _______________ Date: _______________",
    });

    blocks.push({
      kind: "para",
      text:
        "Note: This Will should preferably be registered with the Sub-Registrar under s.18 of the Registration Act 1908 (no stamp duty payable). Keep the original in a safe location and inform the Executor of its whereabouts. Consider depositing a sealed copy with the Sub-Registrar under s.42.",
    });

    return blocks;
  },
};
