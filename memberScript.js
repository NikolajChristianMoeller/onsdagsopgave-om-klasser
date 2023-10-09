
import * as member from "./constructors/member.js"

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
      <td>${member.name}</td>
      <td>${member.active}</td>
      <td>${member.birthday}</td>
      <td>${member.getAge()}</td>
      <td>${member.getJuniorSeniorStatus()}</td>
      <td>${member.email}</td>
    </tr>`;

        table.insertAdjacentHTML("beforeend", html);
    }
}