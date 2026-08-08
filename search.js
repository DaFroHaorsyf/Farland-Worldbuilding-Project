

function searchWords() {

    let input = document
        .getElementById("search")
        .value
        .toLowerCase();


    let results = wordlist.filter(entry =>
        entry.word.toLowerCase().includes(input) ||
        entry.meaning.toLowerCase().includes(input)
    );


    results = results.slice(0,5);


    let output = "";


    results.forEach(entry => {

        let page = "";

        if(entry.type === "n") {
            page = "dictionary.html#" + entry.id;
        }

        if(entry.type === "v") {
            page = "verbuary.html#" + entry.id;
        }


        output += `
        <div class="entry">

            <h2>
            <a href="${page}">
            ${entry.word}
            </a>

            <span class="ipa">
            ${entry.ipa}
            </span>

            </h2>

            <p>
            • ${entry.meaning}
            </p>

        </div>
        `;

    });


    document.getElementById("results").innerHTML = output;

}
