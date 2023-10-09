import * as member from "./constructors/member.js"
import * as result from "./constructors/results.js";

window.addEventListener("load", start);



function start() {
    runBuildDisplayMembers();
    runBuildAndShowResults();
}





async function runBuildDisplayMembers() {
    await buildMembersList();
    displayMembers(members);
}

const members = [];

async function fetchMembers() {
    const resp = await fetch("members.json");
    const data = await resp.json();
    return data;
}

async function buildMembersList() {
    const originalObjects = await fetchMembers();

    for (const orgobj of originalObjects) {
        const memberObj = member.construct(orgobj);
        members.push(memberObj);
    }
}

function displayMembers(members) {
    const table = document.querySelector("table#members tbody");
    table.innerHTML = "";
    //husk getAge() køres på objektet derfor member.getAge()
    for (const member of members) {
        const html = /*html*/`
    <tr>
      <td>${member.name} </td>
      <td>${member.active}</td>
      <td>${member.birthday}</td>
      <td>${member.age}</td>
      <td>${determineAgeCategory(member.age)}</td>
      <td>${member.email}</td>
    </tr>`;

        table.insertAdjacentHTML("beforeend", html);
    }
}

function determineAgeCategory(age) {
    if (age < 18) {
        return "Junior"
    } else {
        return "Senior"
    }
}


// ----------------------------------------------------------RESULTS--------------------------------------------------
async function runBuildAndShowResults() {
    await buildResults();
    showResults(results);
}

const results = [];

async function fetchResults() {
    const response = await fetch("results.json");
    const data = await response.json()
    return data;
}
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

}


function findMember(memberId) {

    return members.find(member => member.id === memberId)


    // let foundMember = undefined;

    // for (const member of members) {
    //     if (memberId === member.id) {
    //         foundMember = member;
    //     } 
    // } return foundMember

}



function showResults(resultList) {
    document.querySelector("#results tbody").innerHTML = "";

    const sortedList = sortTime(resultList);

    for (const result of sortedList) {
        let name = "";

        if (result.member == undefined) {
            name = "ukendt"
        } else {
            name = result.member.name;
        };

        const html = /*html */ `
<tr>
    <td>${new Date(result.date).toLocaleString('da-DK', { dateStyle: 'long' })}</td>
    <td>${name}</td>
    <td>${translateDiscipline(result.discipline)}</td>
    <td>${translateResultType(result.type)}</td>
    <td>${result.displayTime}</td>
</tr>
`

        document.querySelector("#results tbody").insertAdjacentHTML("beforeend", html);

    };

    function sortTime(list) {
        return list.sort((a, b) => a.time - b.time);
    }
};

function translateDiscipline(discipline) {
    if (discipline === "breaststroke") {
        return "bryst"
    } else if (discipline === "backstroke") {
        return "ryg"
    } else {
        return discipline;
    }
}

function translateResultType(type) {
    if (type === "training") {
        return "træning"
    } else {
        return "stævne"
    }
}

export { findMember }