// ============================================================
// BOARD RESOLUTION — DIRECTOR APPOINTMENT / RESIGNATION / REMOVAL
// Drop into: /lib/templates/board-resolution-director.ts
// Use case: Board resolution for (a) appointment of a new
//           director / additional director / independent director
//           or (b) acceptance of director resignation or
//           (c) removal of director under s.169.
// Statute refs: Companies Act 2013 s.152 (appointment of
//   directors); s.161 (additional director); s.164 (disqualification);
//   s.166 (duties of directors); s.168 (resignation); s.169 (removal);
//   s.170 (register of directors); s.184 (interest disclosure);
//   Rule 8 Companies (Appointment and Qualification of Directors)
//   Rules 2014; MCA Form DIR-12
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const boardResolutionDirector: TemplateModule = {
  meta: {
    id: "board-resolution-director",
    name: "Board Resolution — Director Appointment / Resignation",
    categoryId: "companies",
    category: "Companies & MCA",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Board resolution for appointment of a new director (including additional director or independent director), acceptance of resignation, or removal under s.169. Covers DIR-2 consent, s.184 interest disclosure, DIR-12 filing authority, and DIN requirement.",
    aliases: [
      "board resolution director appointment",
      "director appointment resolution",
      "director resignation resolution",
      "additional director resolution",
      "independent director resolution",
      "director removal resolution",
      "DIR-12 board resolution",
    ],
    pages: 5,
    minutes: 7,
    status: "live",
  },

  groups: [
    {
      title: "Company details",
      fields: [
        { id: "brd_co_name", label: "Company legal name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "brd_cin", label: "CIN", type: "text", required: true, placeholder: "U72900KA2024PTC123456" },
        { id: "brd_co_addr", label: "Registered office", type: "textarea", rows: 2, required: true },
        { id: "brd_meeting_date", label: "Board meeting date", type: "date", required: true },
        { id: "brd_meeting_city", label: "Meeting city", type: "text", required: true },
        { id: "brd_state", label: "State / UT", type: "select", required: true, options: [
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
        { id: "brd_chair", label: "Chairperson of meeting", type: "text", required: true },
        { id: "brd_directors_present", label: "Directors present (names, comma-separated)", type: "textarea", rows: 2, required: true, placeholder: "Priya Sharma, Rahul Verma" },
      ],
    },
    {
      title: "Resolution type",
      fields: [
        {
          id: "brd_resolution_type",
          label: "Resolution type",
          type: "select",
          required: true,
          default: "appoint",
          options: [
            { value: "appoint", label: "Appointment — Additional Director (s.161)" },
            { value: "appoint_id", label: "Appointment — Independent Director (s.149)" },
            { value: "appoint_md", label: "Appointment — Managing Director / WTD (s.196)" },
            { value: "resign", label: "Resignation — Acceptance of Director Resignation (s.168)" },
            { value: "remove", label: "Removal — Removal of Director (s.169)" },
          ],
        },
      ],
    },
    {
      title: "Director details",
      fields: [
        { id: "brd_dir_name", label: "Director full name", type: "text", required: true, placeholder: "Arjun Mehta" },
        { id: "brd_dir_din", label: "DIN of director", type: "text", required: true, placeholder: "01234567" },
        { id: "brd_dir_pan", label: "PAN of director", type: "text", required: true, placeholder: "AABCM1234D" },
        { id: "brd_dir_addr", label: "Director's residential address", type: "textarea", rows: 2, required: true },
        { id: "brd_dir_email", label: "Director's email address", type: "email", required: true },
        { id: "brd_dir_mobile", label: "Director's mobile number", type: "tel" },
        {
          id: "brd_dir_nationality",
          label: "Nationality",
          type: "select",
          default: "indian",
          options: [
            { value: "indian", label: "Indian" },
            { value: "nri", label: "NRI / OCI / PIO" },
            { value: "foreign", label: "Foreign National" },
          ],
        },
        { id: "brd_appt_date", label: "Date of appointment / resignation / removal", type: "date", required: true },
        { id: "brd_resign_date_letter", label: "Date of resignation letter (if resignation)", type: "date" },
        { id: "brd_id_tenure_years", label: "Independent Director tenure (years)", type: "select", default: "5", options: [{ value: "3", label: "3 years" }, { value: "5", label: "5 years" }] },
      ],
    },
    {
      title: "Remuneration (if applicable)",
      fields: [
        {
          id: "brd_remuneration",
          label: "Remuneration / sitting fee",
          type: "select",
          default: "nil",
          options: [
            { value: "nil", label: "Nil — no remuneration" },
            { value: "sitting_fee", label: "Sitting fee only (per meeting)" },
            { value: "salary", label: "Fixed monthly salary (MD/WTD)" },
          ],
        },
        { id: "brd_sitting_fee", label: "Sitting fee amount (₹ per meeting)", type: "number", placeholder: "50000" },
        { id: "brd_monthly_salary", label: "Monthly salary (₹) — for MD/WTD", type: "number", placeholder: "200000" },
      ],
    },
  ],

  render(e) {
    const co = e.brd_co_name || "[Company]";
    const cin = e.brd_cin || "[CIN]";
    const chair = e.brd_chair || "[Chairperson]";
    const directors = (e.brd_directors_present || "").split(",").map((d) => d.trim()).filter(Boolean);
    const dirName = e.brd_dir_name || "[Director]";
    const dirDin = e.brd_dir_din || "[DIN]";
    const rType = e.brd_resolution_type || "appoint";

    const resTypeLabel = {
      appoint: "Appointment of Additional Director",
      appoint_id: "Appointment of Independent Director",
      appoint_md: "Appointment of Managing Director",
      resign: "Acceptance of Resignation",
      remove: "Removal of Director (s.169 — Preliminary)",
    }[rType] || "Director Change";

    const blocks: DocSection[] = [];

    blocks.push({
      kind: "cover",
      title: "Board Resolution — " + resTypeLabel,
      subtitle: co + " · Board Meeting dated [MEETING_DATE]",
      summary: [
        { label: "Company", value: co + " (CIN: " + cin + ")" },
        { label: "Meeting date", value: "[MEETING_DATE]" },
        { label: "Resolution type", value: resTypeLabel },
        { label: "Director", value: dirName + " (DIN: " + dirDin + ")" },
        { label: "PAN", value: e.brd_dir_pan || "[PAN]" },
        { label: "Effective date", value: "[APPT_DATE]" },
        { label: "Remuneration", value: e.brd_remuneration === "nil" ? "Nil" : e.brd_remuneration === "sitting_fee" ? "₹" + Number(e.brd_sitting_fee || 0).toLocaleString("en-IN") + " per meeting" : "₹" + Number(e.brd_monthly_salary || 0).toLocaleString("en-IN") + " per month" },
      ],
    });

    blocks.push({ kind: "title", text: "Certified Extract of Board Meeting Minutes" });
    blocks.push({
      kind: "subtitle",
      text: "Board Meeting of " + co + " held on [MEETING_DATE] at " + (e.brd_meeting_city || "[City]") + ", [STATE_NAME]",
    });

    blocks.push({
      kind: "para",
      text:
        "A duly convened meeting of the Board of Directors of " + co + " (CIN: " + cin + "), having its registered office at " + (e.brd_co_addr || "[Address]") + ", was held on [MEETING_DATE]. " + chair + " acted as Chairperson. The following Directors were present: " + directors.join(", ") + ". Quorum being present, the following resolutions were unanimously passed:",
    });

    blocks.push({ kind: "divider" });

    if (rType === "appoint" || rType === "appoint_id") {
      blocks.push({
        kind: "clause",
        number: 1,
        title: "Resolution: Noting of Consent and Declaration",
        text:
          '"RESOLVED THAT the Board hereby takes on record the consent to act as Director in Form DIR-2, and the declaration in Form DIR-8 (non-disqualification under s.164), received from ' +
          dirName +
          " (DIN: " +
          dirDin +
          ", PAN: " +
          (e.brd_dir_pan || "[PAN]") +
          "), residing at " +
          (e.brd_dir_addr || "[Address]") +
          "." +
          '"',
      });

      blocks.push({
        kind: "clause",
        number: 2,
        title: rType === "appoint_id" ? "Resolution: Appointment as Independent Director" : "Resolution: Appointment as Additional Director",
        text:
          rType === "appoint_id"
            ? '"RESOLVED THAT pursuant to Section 149, 150, 152, and other applicable provisions of the Companies Act, 2013, read with the Companies (Appointment and Qualification of Directors) Rules 2014, and the Articles of Association of the Company, ' +
              dirName +
              " (DIN: " +
              dirDin +
              ") be and is hereby appointed as an Independent Director of the Company, not liable to retire by rotation, for a term of " +
              (e.brd_id_tenure_years || "5") +
              " years commencing from [APPT_DATE], subject to approval of the shareholders at the next General Meeting of the Company." +
              '"'
            : '"RESOLVED THAT pursuant to Section 161(1) and other applicable provisions of the Companies Act, 2013, read with the Articles of Association of the Company, ' +
              dirName +
              " (DIN: " +
              dirDin +
              ") be and is hereby appointed as an Additional Director of the Company with effect from [APPT_DATE], to hold office until the conclusion of the next Annual General Meeting of the Company, subject to the appointment being regularised / confirmed by the shareholders at such meeting." +
              '"',
      });

      blocks.push({
        kind: "clause",
        number: 3,
        title: "Resolution: Interest Disclosure under s.184",
        text:
          '"RESOLVED FURTHER THAT the Board hereby takes on record the disclosure of interest / non-interest made by ' +
          dirName +
          " in Form MBP-1 under Section 184 of the Companies Act, 2013." +
          '"',
      });

      if (e.brd_remuneration === "sitting_fee") {
        blocks.push({
          kind: "clause",
          number: 4,
          title: "Resolution: Sitting Fee",
          text:
            '"RESOLVED FURTHER THAT ' +
            dirName +
            " be paid a sitting fee of ₹" +
            Number(e.brd_sitting_fee || 0).toLocaleString("en-IN") +
            " per Board meeting attended, in accordance with Section 197 read with Rule 4 of the Companies (Appointment and Remuneration of Managerial Personnel) Rules 2014." +
            '"',
        });
      }

      blocks.push({
        kind: "clause",
        number: e.brd_remuneration === "sitting_fee" ? 5 : 4,
        title: "Resolution: DIR-12 Filing",
        text:
          '"RESOLVED FURTHER THAT the Company Secretary / authorised Director be and is hereby directed to file Form DIR-12 with the Registrar of Companies within 30 days of the date of appointment, together with all required attachments, and to update the Register of Directors and Key Managerial Personnel (MGT-7 / Register maintained under s.170) accordingly."',
      });
    }

    if (rType === "appoint_md") {
      blocks.push({
        kind: "clause",
        number: 1,
        title: "Resolution: Noting of Consent and Declaration",
        text:
          '"RESOLVED THAT the Board hereby takes on record the consent and declaration received from ' +
          dirName +
          " (DIN: " +
          dirDin +
          ") in the prescribed forms, confirming eligibility and willingness to act as Managing Director." +
          '"',
      });

      blocks.push({
        kind: "clause",
        number: 2,
        title: "Resolution: Appointment as Managing Director",
        text:
          '"RESOLVED THAT pursuant to Sections 196, 197, 198, and 203 of the Companies Act, 2013, read with Schedule V and the Articles of Association of the Company, the Board hereby approves the appointment of ' +
          dirName +
          " (DIN: " +
          dirDin +
          ") as the Managing Director of the Company for a period of 5 years with effect from [APPT_DATE], on the terms and conditions (including remuneration) as set out in the draft service agreement / letter of appointment tabled at the meeting and approved herewith, subject to approval by the shareholders of the Company at the next General Meeting." +
          '"',
      });

      if (e.brd_monthly_salary) {
        blocks.push({
          kind: "clause",
          number: 3,
          title: "Resolution: Remuneration",
          text:
            '"RESOLVED FURTHER THAT the monthly remuneration payable to ' +
            dirName +
            " as Managing Director shall be ₹" +
            Number(e.brd_monthly_salary).toLocaleString("en-IN") +
            " per month, subject to applicable TDS and compliant with the limits prescribed under Schedule V of the Companies Act, 2013. The Board shall seek shareholder approval and, if required, Central Government approval for remuneration exceeding permissible limits." +
            '"',
        });
      }

      blocks.push({
        kind: "clause",
        number: e.brd_monthly_salary ? 4 : 3,
        title: "Resolution: MR-1 / DIR-12 Filing",
        text:
          '"RESOLVED FURTHER THAT the Company Secretary / authorised Director be and is hereby directed to file Form MR-1 (Return of Appointment of Managing Director) and Form DIR-12 with the Registrar of Companies within 60 days and 30 days respectively from the date of appointment."',
      });
    }

    if (rType === "resign") {
      blocks.push({
        kind: "clause",
        number: 1,
        title: "Resolution: Noting of Resignation",
        text:
          '"RESOLVED THAT the Board of Directors hereby notes the resignation of ' +
          dirName +
          " (DIN: " +
          dirDin +
          ") from the Board of Directors of the Company, as communicated by way of letter / email dated " +
          (e.brd_resign_date_letter ? "[RESIGN_LETTER_DATE]" : "[date of resignation letter]") +
          ", and hereby accepts the resignation with effect from [APPT_DATE]." +
          '"',
      });

      blocks.push({
        kind: "clause",
        number: 2,
        title: "Resolution: DIR-12 Filing and Register Update",
        text:
          '"RESOLVED FURTHER THAT the Company Secretary / authorised Director be and is hereby directed to file Form DIR-12 with the Registrar of Companies within 30 days of the date of resignation, and to update the Register of Directors accordingly. The Board also records that ' +
          dirName +
          " has been separately advised to file Form DIR-11 (intimation of resignation) personally with the ROC." +
          '"',
      });

      blocks.push({
        kind: "clause",
        number: 3,
        title: "Resolution: Appreciation",
        text:
          '"RESOLVED FURTHER THAT the Board places on record its appreciation for the valuable contributions made by ' +
          dirName +
          " during his/her tenure as Director of the Company and wishes him/her well in future endeavours." +
          '"',
      });
    }

    if (rType === "remove") {
      blocks.push({
        kind: "clause",
        number: 1,
        title: "Resolution: Special Notice for Removal",
        text:
          '"RESOLVED THAT the Board of Directors hereby notes the receipt of a special notice under Section 169 of the Companies Act, 2013, for an ordinary resolution to remove ' +
          dirName +
          " (DIN: " +
          dirDin +
          ") as Director of the Company, and hereby directs the Company Secretary to: (a) send a copy of the special notice to " +
          dirName +
          "; (b) give him/her an opportunity to make a representation in writing, not exceeding a reasonable length, before the relevant General Meeting; (c) read out or circulate such representation at the General Meeting (unless a court directs otherwise); and (d) convene an extraordinary general meeting for passing the resolution for removal." +
          '"',
      });

      blocks.push({
        kind: "clause",
        number: 2,
        title: "Resolution: EGM Convening",
        text:
          '"RESOLVED FURTHER THAT an Extraordinary General Meeting of the shareholders of the Company be convened on a date not less than 14 days from the date of sending the special notice, for the purpose of passing an ordinary resolution for removal of ' +
          dirName +
          " as Director, and that the Notice of EGM be sent to all members accordingly." +
          '"',
      });
    }

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text: "Certified to be a true extract of the Minutes of the Board Meeting of " + co + " held on [MEETING_DATE].",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Chairperson of the Meeting", name: chair },
        { role: "Director / Company Secretary", name: "[Name]" },
      ],
    });

    return blocks;
  },
};
