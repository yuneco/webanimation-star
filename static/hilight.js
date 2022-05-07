/**
 * @param {string} summaryText
 * @param {HTMLElement} detailElement
 * @returns {HTMLDetailsElement}
 */
const createDisclosure = (summaryText, detailElement) => {
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  summary.textContent = summaryText;
  details.appendChild(summary);
  details.appendChild(detailElement);
  return details;
};

/**
 * @param {string} text
 */
const trimBlankLines = (text) => {
  return text.replace(/^((\s)*\n)+/, "").replace(/((\s)*\n)+\s*$/, "");
};

/**
 * @param {HTMLElement} source
 */
const createHilight = (source) => {
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  const text = document.createTextNode(trimBlankLines(source.innerHTML));
  code.className = "language-html language-javascript";
  code.appendChild(text);
  pre.appendChild(code);

  const disclosure = createDisclosure("コードを表示", pre);
  source.parentNode.insertBefore(disclosure, source.nextSibling);

  hljs.configure({
    ignoreUnescapedHTML: true,
  });
  hljs.highlightElement(code);
};

const main = () => {
  const sources = document.querySelectorAll(".code-sample");
  sources.forEach((el) => createHilight(el));
};

main();
