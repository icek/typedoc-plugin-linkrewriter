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
require("source-map-support/register");
const utils_1 = require("typedoc/dist/lib/utils");
const plugin_1 = require("./plugin");
function load(host) {
    const app = host.owner;
    if (app.renderer.hasComponent("linkrewriter")) {
        return;
    }
    app.options.addDeclaration({
        name: 'rewriteLinks',
        help: 'Map of links to rewrite',
        type: utils_1.ParameterType.Mixed,
    });
    app.renderer.addComponent("linkrewriter", new plugin_1.LinkRewriterPlugin(app.renderer));
}
module.exports = load;
//# sourceMappingURL=index.js.map