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
import { ContextAwareRendererComponent } from "typedoc/dist/lib/output/components";
import { MarkdownEvent, RendererEvent, PageEvent } from 'typedoc/dist/lib/output/events';
import { ProjectReflection, DeclarationReflection } from 'typedoc/dist/lib/models';
export interface LinkRewriterContext {
    project?: ProjectReflection;
    reflection?: DeclarationReflection;
    url?: string;
    file?: string;
}
export declare type LinkRewriter = (this: LinkRewriterContext, matched: string, ...args: any[]) => string;
export interface Links {
    /**
     * `pattern` is a regular expression pattern. The value is a regexp replacement string or `LinkRewriter` function.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
     */
    [pattern: string]: string | LinkRewriter;
}
export declare class LinkRewriterPlugin extends ContextAwareRendererComponent {
    rewriteLinks: string | Links;
    private _links;
    private _page;
    private _context;
    initialize(): void;
    onBeginRenderer(event: RendererEvent): void;
    onBeginPage(page: PageEvent): void;
    onParseMarkdown(event: MarkdownEvent): void;
    private createContext;
    private ensureLinks;
    private buildLinks;
    private loadLinks;
}
