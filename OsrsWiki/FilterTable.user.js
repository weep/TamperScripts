// ==UserScript==
// @name         OsrsWiki - FilterTable
// @namespace    http://tampermonkey.net/
// @version      2026-04-22T11:04:00Z
// @description  try to take over the world!
// @author       Weep
// @updateURL    https://github.com/weep/TamperScripts/raw/master/OsrsWiki/FilterTable.meta.js
// @downloadURL  https://github.com/weep/TamperScripts/raw/master/OsrsWiki/FilterTable.user.js
// @match        https://oldschool.runescape.wiki/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=runescape.wiki
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Select all tables with class "wikitable" and add search functionality
    const tables = document.querySelectorAll('.wikitable.league-tasks');
    let hideCompletedChecked = false;
    tables.forEach(addSearchToTable);

    /**
     * Adds a search input to the table and filters rows based on input value
     * @param {HTMLTableElement} table - The table to add search functionality to
     */
    function addSearchToTable(table) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        const searchContainer = document.createElement('div');
        const searchInput = document.createElement('input');
        const clearButton = document.createElement('button');

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(clearButton);

        clearButton.className = 'mw-headline-lockbutton';
        clearButton.innerHTML = '<span class="mw-headline-lockbutton-icon">×</span>';

        searchInput.addEventListener('input', (event) => {
            hideCompletedChecked = document.querySelector(".rs-wikisync-hide-completed input").checked;
            rows.forEach((row) => filterRow(row, event.target.value));
        });

        clearButton.addEventListener('click', () => {
            hideCompletedChecked = document.querySelector(".rs-wikisync-hide-completed input").checked;
            searchInput.value = '';
            rows.forEach((row) => filterRow(row, ''));
        });

        table.parentElement.insertBefore(searchContainer, table);
    }

    /**
     * Filters a table row based on the search input value
     * @param {HTMLTableRowElement} row - The row to filter
     * @param {string} text - The search input value
     */
    function filterRow(row, text) {
        if (row.id === '') return;

        const regex = new RegExp(text, 'gi');
        const match = row.textContent.match(regex);

        const outcome = match !== null || text === '' || text === undefined;

        if (outcome && !(row.classList.contains('wikisync-completed') && hideCompletedChecked)) {
            row.style.visibility = 'visible';
        } else {
            row.style.visibility = 'collapse';
        }
    }
})();
