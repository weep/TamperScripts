// ==UserScript==
// @name         OsrsWiki - FilterTable
// @namespace    http://tampermonkey.net/
// @version      2026-04-20
// @description  try to take over the world!
// @author       Weep
// @version      0.1
// @updateURL    https://github.com/weep/TamperScripts/raw/master/OsrsWiki/FilterTable.meta.js
// @downloadURL  https://github.com/weep/TamperScripts/raw/master/OsrsWiki/FilterTable.user.js
// @match        https://oldschool.runescape.wiki/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=runescape.wiki
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    const tables = document.querySelectorAll(".wikitable");
    tables.forEach(addSearchToTable);

    function addSearchToTable(table) {
        var tbody = table.getElementsByTagName("tbody")[0];
        var rbodyrows = tbody.getElementsByTagName("tr");
        let rows = [...rbodyrows];
        console.log({table, rows});
        const div = document.createElement("div");
        const input = document.createElement("input");
        div.appendChild(input);
        input.onchange = change => {
            rows.forEach(p => filterRow(p, change.target.value));
            //[...tableBody.childNodes].forEach(console.log);
        };
        table.parentElement.insertBefore(div, table);
    }

    function filterRow(row, text) {
        if (row.id === "") return;

        let re = new RegExp(String.raw`${text}`, "ig");
        var match = row.innerText.match(re);

        let outcome = (match || text === '' || text === undefined);

        if (outcome) {
            console.log({row, outcome})
            row.style.visibility = 'visible'
        } else {
            row.style.visibility = 'collapse'
        }
        if (row.classList.contains("wikisync-completed")) {
            row.style.visibility = 'collapse'
        }
    }
})();
