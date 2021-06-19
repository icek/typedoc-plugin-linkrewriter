"use strict";
/*!
   Copyright 2019 Ron Buckton

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownRenderer = void 0;
const fence = "```";
const tick = "`";
class MarkdownRenderer {
    constructor() {
        this.options = {};
        this._tableHeader = "";
    }
    // blocks
    heading(_text, level, raw) {
        return `${"#".repeat(level)} ${raw}\n`;
    }
    hr() {
        return `---\n`;
    }
    blockquote(quote) {
        return `${quote.split(`\n`).map(q => `> ${q}`).join("\n")}\n`;
    }
    code(code, language, isEscaped) {
        return `${fence}${language || ""}\n${isEscaped ? decode(code) : code}\n${fence}\n\n`;
    }
    br() {
        return `  \n`;
    }
    list(body, ordered, start) {
        let ordinal = start;
        return `\n${body.replace(/{markdownRendererBullet}/g, () => ordered ? `${ordinal++}. ` : "- ")}\n`;
    }
    listitem(text) {
        return `{markdownRendererBullet}${text.split(/\n/g).filter(line => !!line.trim()).join("\n ")}\n`;
    }
    paragraph(text) {
        return `${text}\n\n`;
    }
    table(header, body) {
        const tableHeader = this._tableHeader;
        this._tableHeader = "";
        return tableHeader
            ? `\n${header}|${tableHeader}\n${body}\n`
            : `\n${header}${body}\n`;
    }
    tablecell(content, flags) {
        if (flags.header) {
            if (flags.align === "center" || flags.align === "left") {
                this._tableHeader += ":";
            }
            this._tableHeader += "--";
            if (flags.align === "center" || flags.align === "right") {
                this._tableHeader += ":";
            }
            this._tableHeader += "|";
        }
        return ` ${content} |`;
    }
    tablerow(content) {
        return `|${content}\n`;
    }
    // inlines
    checkbox(checked) {
        return `[${checked ? 'x' : ' '}]`;
    }
    codespan(code) {
        return `${tick}${decode(code)}${tick}`;
    }
    del(text) {
        return `~~${text}~~`;
    }
    em(text) {
        return `*${text}*`;
    }
    strong(text) {
        return `**${text}**`;
    }
    html(html) {
        return html;
    }
    image(href, title, text) {
        // TODO: handle unescaped and unbalanced [] in text
        // TODO: handle unescaped ", ', and () in title
        return `![${decode(text)}](${href}${title !== null ? ` "${decode(title)}"` : ""})`;
    }
    link(href, title, text) {
        // TODO: handle unescaped ", ', and () in title
        return `[${text}](${href}${title !== null ? ` "${decode(title)}"` : ""})`;
    }
    text(text) {
        return decode(text);
    }
}
exports.MarkdownRenderer = MarkdownRenderer;
function decode(html) {
    return html.replace(/&(amp|lt|gt|quot|#39);/g, _ => decode.replacements[_] || _);
}
decode.replacements = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
};
//# sourceMappingURL=markdownRenderer.js.map