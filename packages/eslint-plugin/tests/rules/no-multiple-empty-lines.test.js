const createRuleTester = require("../rule-tester");
const rule = require("../../lib/rules/no-multiple-empty-lines");

const ruleTester = createRuleTester();
const templateRuleTester = createRuleTester("espree");

ruleTester.run("no-multiple-empty-lines", rule, {
  valid: [
    {
      code: `
<html>
<body>
<div></div>
</body>
</html>
`,
    },
    {
      code: `<html>\n<body>\n\n<div></div>\n\n</body></html>`,
      options: [{ max: 1 }],
    },
    {
      code: `<html>\r\n<body>\r\n<div></div>\r\n</body></html>`,
      options: [{ max: 1 }],
    },
    {
      code: `<html></html>`,
      options: [{ max: 1 }],
    },
    {
      code: `<div id="foo"></div>\n\n\n<div id="bar"></div>`,
    },
  ],
  invalid: [
    {
      code: `<div id="foo"></div>\n\n\n\n<div id="bar"></div>`,
      output: `<div id="foo"></div>\n\n\n<div id="bar"></div>`,
      errors: [
        {
          message: "More than 2 blank lines not allowed.",
        },
      ],
    },
    {
      code: `<div id="foo"></div>\r\n\r\n\r\n\r\n<div id="bar"></div>`,
      output: `<div id="foo"></div>\r\n\r\n\r\n<div id="bar"></div>`,
      errors: [
        {
          message: "More than 2 blank lines not allowed.",
        },
      ],
    },
    {
      code: `<html><body>\n\n\n\n\n<div></div></body></html>`,
      output: `<html><body>\n\n\n<div></div></body></html>`,
      errors: [
        {
          message: "More than 2 blank lines not allowed.",
        },
      ],
    },
    {
      code: `<html><body>\n\n\n\n\n<div></div></body></html>`,
      output: `<html><body>\n<div></div></body></html>`,
      options: [{ max: 0 }],
      errors: [
        {
          message: "More than 0 blank lines not allowed.",
        },
      ],
    },
    {
      code: `<html><body>\n\n<div></div></body></html>`,
      output: `<html><body>\n<div></div></body></html>`,
      options: [{ max: 0 }],
      errors: [
        {
          message: "More than 0 blank lines not allowed.",
        },
      ],
    },
    {
      code: `<html><body>\n\n\n<div></div>\n\n\n</body></html>`,
      output: `<html><body>\n\n<div></div>\n\n</body></html>`,
      options: [{ max: 1 }],
      errors: [
        {
          message: "More than 1 blank lines not allowed.",
        },
        {
          message: "More than 1 blank lines not allowed.",
        },
      ],
    },
  ],
});

templateRuleTester.run("[template] no-multiple-empty-lines", rule, {
  valid: [
    {
      code: `
html\`<html>
<body>
<div></div>
</body>
</html>\`
`,
    },
    {
      code: `
const html = \`



\`
`,
    },
    {
      code: `
html\`
<body>
\${(() => {
  
  


  return "<div></div>"
})()}
</body>
\`
`,
    },
  ],
  invalid: [
    {
      code: `
html\`<html>
<body>
<div>



</div>
</body>
</html>\`
`,
      output: `
html\`<html>
<body>
<div>


</div>
</body>
</html>\`
`,
      errors: [
        {
          message: "More than 2 blank lines not allowed.",
        },
      ],
    },
    {
      code: `
const html = /* html */\`
<div style=\${"aa"}>
    <div></div>




</div>\`
`,
      output: `
const html = /* html */\`
<div style=\${"aa"}>
    <div></div>


</div>\`
`,
      errors: [
        {
          message: "More than 2 blank lines not allowed.",
        },
      ],
    },
  ],
});
