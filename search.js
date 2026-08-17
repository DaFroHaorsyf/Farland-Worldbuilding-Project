function toggleSearch() {

    const searchBox = document.getElementById("search-box");
    const dictionaryLinks = document.getElementById("dictionary-links");
    const input = document.getElementById("search");

    const isOpen = searchBox.classList.contains("open");

    if (isOpen) {

        searchBox.classList.remove("open");
        dictionaryLinks.style.display = "flex";

        document.getElementById("results").innerHTML = "";

        input.value = "";

    } else {

        searchBox.classList.add("open");
        dictionaryLinks.style.display = "none";

        input.focus();
    }
}


function searchWords() {

    const input = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    const resultsContainer = document.getElementById("results");

    if (input === "") {
        resultsContainer.innerHTML = "";
        return;
    }


    let results = wordlist
        .filter(entry =>
            entry.word.toLowerCase().includes(input) ||
            entry.meaning.toLowerCase().includes(input)
        )

        // Sort the results so actual word matches come first
        .sort((a, b) => {

            const aWord = a.word.toLowerCase();
            const bWord = b.word.toLowerCase();

            // 1. Exact word match
            if (aWord === input && bWord !== input) return -1;
            if (bWord === input && aWord !== input) return 1;

            // 2. Word starts with the search
            const aStarts = aWord.startsWith(input);
            const bStarts = bWord.startsWith(input);

            if (aStarts && !bStarts) return -1;
            if (bStarts && !aStarts) return 1;

            // 3. Word contains the search
            const aContains = aWord.includes(input);
            const bContains = bWord.includes(input);

            if (aContains && !bContains) return -1;
            if (bContains && !aContains) return 1;

            // 4. Otherwise keep original order
            return 0;
        });


    let output = "";


    results.forEach(entry => {

        let page = "";

        if (entry.type === "n") {
            page = "dictionary.html#" + entry.id;
        }

        if (entry.type === "v") {
            page = "verbuary.html#" + entry.id;
        }

        if (entry.type === "a") {
            page = "adjective.html#" + entry.id;
        }


        output += `
            <div class="entry">

                <h2 class="word">

                    <a href="${page}">
                        ${entry.word}
                    </a>

                    ${entry.ipa
                        ? `<span class="ipa">${entry.ipa}</span>`
                        : ""
                    }

                </h2>

                <p class="meaning">
                    • ${entry.meaning}
                </p>

            </div>
        `;
    });


    if (results.length === 0) {

        output = `
            <p class="no-results">
                No results found.
            </p>
        `;
    }


    resultsContainer.innerHTML = output;
}