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
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const marked = tslib_1.__importStar(require("marked"));
const components_1 = require("typedoc/dist/lib/output/components");
const utils_1 = require("typedoc/dist/lib/utils");
const events_1 = require("typedoc/dist/lib/output/events");
const markdownRenderer_1 = require("./markdownRenderer");
let LinkRewriterPlugin = class LinkRewriterPlugin extends components_1.ContextAwareRendererComponent {
    initialize() {
        super.initialize();
        this.listenTo(this.owner, events_1.MarkdownEvent.PARSE, this.onParseMarkdown, 200);
    }
    onBeginRenderer(event) {
        super.onBeginRenderer(event);
        this.ensureLinks();
    }
    onBeginPage(page) {
        super.onBeginPage(page);
        this._page = page;
        this._context = this.createContext();
    }
    onParseMarkdown(event) {
        if (this._links) {
            event.parsedText = marked.parse(event.parsedText, {
                renderer: new LinkReplacer(this._links, this._context || this.createContext())
            });
        }
    }
    createContext() {
        return {
            project: this.project,
            reflection: this.reflection,
            url: this._page && this._page.url,
            file: this._page && this._page.filename
        };
    }
    ensureLinks() {
        if (!this._links) {
            this._links = this.buildLinks(typeof this.rewriteLinks === "string" ? this.loadLinks(this.rewriteLinks) : this.rewriteLinks);
        }
    }
    buildLinks(links) {
        if (!links) {
            return [];
        }
        const result = [];
        for (const [pattern, replacement] of Object.entries(links)) {
            try {
                result.push([new RegExp(pattern), replacement]);
            }
            catch (_a) {
                this.application.logger.error("Failed to parse link pattern '%s'.", pattern);
            }
        }
        return result;
    }
    loadLinks(links) {
        try {
            return require(path.resolve(links));
        }
        catch (e) {
            this.application.logger.error("Could not load links '%s'.", links);
        }
    }
};
tslib_1.__decorate([
    utils_1.BindOption('rewriteLinks')
], LinkRewriterPlugin.prototype, "rewriteLinks", void 0);
LinkRewriterPlugin = tslib_1.__decorate([
    components_1.Component({ name: "linkrewriter" })
], LinkRewriterPlugin);
exports.LinkRewriterPlugin = LinkRewriterPlugin;
class LinkReplacer extends markdownRenderer_1.MarkdownRenderer {
    constructor(links, context) {
        super();
        this._links = links;
        this._context = context;
    }
    image(href, title, text) {
        return super.image(this.rewriteLinkDestination(href), title, text);
    }
    link(href, title, text) {
        return super.link(this.rewriteLinkDestination(href), title, text);
    }
    rewriteLinkDestination(linkDestination) {
        try {
            const context = this._context;
            const isBracketedLink = /^<.*>$/.test(linkDestination);
            const url = isBracketedLink ? linkDestination.slice(1, -1) : linkDestination;
            for (const [pattern, replacement] of this._links) {
                const result = typeof replacement === "function"
                    ? url.replace(pattern, replacement.bind(context))
                    : url.replace(pattern, replacement);
                if (result !== url) {
                    return isBracketedLink ? `<${result}>` : result;
                }
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        return linkDestination;
    }
}
//# sourceMappingURL=plugin.js.map