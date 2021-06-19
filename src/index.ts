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

import "source-map-support/register";
import { ParameterType } from 'typedoc/dist/lib/utils';
import { LinkRewriterPlugin } from "./plugin";
import { Application } from 'typedoc';

function load(app:Application) {
    if (app.renderer.hasComponent("linkrewriter")) {
        return;
    }

    app.options.addDeclaration({
        name: 'rewriteLinks',
        help: 'Map of links to rewrite',
        type: ParameterType.Mixed,
    });

    app.renderer.addComponent("linkrewriter", new LinkRewriterPlugin(app.renderer));
}

export { load };
