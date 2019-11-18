// ==UserScript==
// @name         Jira auto branchname
// @namespace    https://gitea.weep.se/weep/TamperScripts/
// @version      0.1
// @description  try to take over the world!
// @author       Weep
// @updateURL    https://github.com/weep/TamperScripts/raw/master/Jira/AutoBranchName.meta.js
// @downloadURL  https://github.com/weep/TamperScripts/raw/master/Jira/AutoBranchName.user.js
// @include      /^https?://jira\..*\.com/.*$/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function formatBranchName(text) {
        var replaced = text.replace(' - ', '-');
        replaced = replaced.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
        replaced = replaced.replace(/[^\w\s]/gi, '')
        replaced = replaced.replace('/', '-')
        replaced = replaced.split(' ').join('-');
        return replaced;
    }

    if (window.location.href.indexOf("/browse/") > 0) {
        setInterval(() => {
            var header = document.querySelector("#stalker .aui-page-header-main");
            var id = document.getElementById("key-val").innerText
            var alreadyAdded = document.getElementById(id);

            if (alreadyAdded == null) {
                var text = document.getElementById("summary-val").innerText

                var child = document.createElement("ol");
                child.id = id;
                child.classList.add("aui-nav");

                var li = document.createElement("li");
                text = formatBranchName(text);
                li.innerText = `feature/${id}_${text}`;
                child.appendChild(li);

                header.insertBefore(child, header.childNodes[1]);
            }

        }, 100);
    }
    else if (window.location.href.indexOf("secure/RapidBoard.jspa")) {
        setInterval(() => {
            var header = document.getElementById("ghx-detail-head")
            var id = document.getElementById("issuekey-val").innerText
            var alreadyAdded = document.getElementById(id);

            if (alreadyAdded == null) {
                var text = document.getElementById("summary-val").innerText
                var child = document.createElement("div");
                child.id = `${id}`;
                child.classList.add("ghx-key-group");

                text = formatBranchName(text);
                child.innerText = `feature/${id}_${text}`;

                header.insertBefore(child, header.childNodes[1]);
            }
        }, 100)
    }

})();
