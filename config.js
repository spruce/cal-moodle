// naming convention like JS
// plural when array

// FIELDNUMBERS
// UID: 1
// DTSTART: 2
// DTEND: 3
// SUMMARY: 4
// LOCATION: 5
// DESCRIPTION: 6

// TYPE filters  1x
// Remove: 11

// TYPE replacements 2x
// replace: 21
// Add at end: 22
// Add at beginning: 23

module.exports = {
  cal: {
    domain: '<EnterYourInfoHere>',
    name: '<EnterYourInfoHere>',
    prodID: {
      company: '<EnterYourInfoHere>',
      product: 'iCal-Converter',
      language: '<EnterYourInfoHere>'
    }
  },
  user: {
    spruce: {
      cals: [{
        url: '<EnterYourInfoHere>',
        name: '<EnterYourInfoHere>',
        filters: [{
          type: 11,
          field: 4,
          value: 'SU\;WI-204 E-Business\, Gr.2\;Prof. Dr. Resch'
        }, {
          type: 11,
          field: 4,
          value: 'SU\;WI-204 E-Business\, Gr.3\;Prof. Dr. Resch'
        }, {
          type: 11,
          field: 4,
          value: 'SU\;WI-204 E-Business\, Gr.4\;Prof. Dr. Schmietendorf'
        }, {
          type: 11,
          field: 4,
          value: 'SU\;402 Wpff. Multiv. Statistische Verf.\;Prof. Dr. Ueckerdt'
        }, {
          type: 11,
          field: 4,
          value: 'SU\;WI-402-12 Wpff. IT-DLM\;Prof. Dr. Lemke'
        }, {
          type: 11,
          field: 4,
          value: 'SU\;WI-403-11Mmt. d. Inf.sicherh.\;Prof. Dr. Rumpel'
        }, {
          type: 11,
          field: 4,
          value: 'SU\;ZF  W.englisch\;business weg 1'
        }, {
          type: 11,
          field: 4,
          value: 'SU\;Zusatzfach AdA\;Lorenz'
        }, {
          type: 11,
          field: 4,
          value: 'Klausur\;LCCI-Prüfung\;'
        }, {
          type: 11,
          field: 4,
          value: 'SU\;402-Wpff. Ethik (Gr. 2)\;Prof. Dr. Nagel'
        }, {
          type: 11,
          field: 4,
          value: 'SU\;402-Wpff. Ethik (Gr. 2)\;Prof. Dr. Bustamante'
        }, {
          type: 11,
          field: 4,
          value: 'SU\;402-Wpff. Ethik (Gr. 2)\;Arkan'
        }],


        replacements: [{
          type: 21,
          field: 4,
          fromValue: 'SU\;WI-204 E-Business\, Gr.1\;Prof. Dr. Schmietendorf',
          toValue: 'E-Bus'
        }, {
          type: 21,
          field: 4,
          fromValue: 'SU\;WI-403-12 Progr. v. Webanwendungen\;Prof. Dr. Faustmann',
          toValue: 'Web'
        }, {
          type: 21,
          field: 4,
          fromValue: 'SU\;WI-205 Vert.- Anwend.systeme\;Prof. Dr. Kirchner',
          toValue: 'VAS'
        }, {
          type: 21,
          field: 4,
          fromValue: 'SU\;WI-201Vert.BI-Data Warehouse\;Prof. Dr. Linz',
          toValue: 'BI-DW'
        }, {
          type: 21,
          field: 4,
          fromValue: 'SU\;WI-201Vert.BI-Inform.Retrieval\;Dr. Humer',
          toValue: 'BI-IR'
        }]
      }]
    }
  }

};
