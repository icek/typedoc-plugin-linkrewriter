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
import { MarkedOptions } from 'marked';
export declare class MarkdownRenderer implements marked.Renderer {
    options: MarkedOptions;
    private _tableHeader;
    heading(_text: string, level: number, raw: string): string;
    hr(): string;
    blockquote(quote: string): string;
    code(code: string, language: string, isEscaped: boolean): string;
    br(): string;
    list(body: string, ordered: boolean, start: number): string;
    listitem(text: string): string;
    paragraph(text: string): string;
    table(header: string, body: string): string;
    tablecell(content: string, flags: {
        header: boolean;
        align: "center" | "left" | "right" | null;
    }): string;
    tablerow(content: string): string;
    checkbox(checked: boolean): string;
    codespan(code: string): string;
    del(text: string): string;
    em(text: string): string;
    strong(text: string): string;
    html(html: string): string;
    image(href: string, title: string | null, text: string): string;
    link(href: string, title: string, text: string): string;
    text(text: string): string;
}
