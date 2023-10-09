import * as result from "./constructors/results.js";



async function runBuildAndShowResults() {
    await buildResults();
    showResults(results);
}

const results = [];

async function buildResults() {
    //hent data først
    const originalResults = await fetchResults();

    // hver resultat skal tilføjes til results liste derfor for of
    // husk resultat objekterne skal laves derfor kald på konstruktor
    for (const personResult of originalResults) {
        const resultObject = result.construct(personResult);

        // mål byg liste. dvs push noget til results = []
        results.push(resultObject);
    }
};

async function fetchResults() {
    const response = await fetch("results.json");
    const data = await response.json();
    return data;
};



function showResults(resultList) {
    document.querySelector("#results tbody").innerHTML = "";

    const sortedList = sortTime(resultList);

    for (const result of sortedList) {
        const html = /*html */ `
<tr>
    <td>${new Date(result.date).toLocaleString('da-DK', { dateStyle: 'long' })}</td>
    <td>${result.memberId}</td>
    <td>${result.showDiscipline()}</td>
    <td>${result.showResultType()}</td>
    <td>${result.time}</td>
</tr>
`

        document.querySelector("#results tbody").insertAdjacentHTML("beforeend", html);

    };

    function sortTime(list) {
        return list.sort((a, b) => a.time.localeCompare(b.time));
    }
};

export { runBuildAndShowResults, buildResults, fetchResults, showResults, sortTime };