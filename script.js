document.addEventListener("DOMContentLoaded", function () {
  const educationList = document.getElementById("education-list");
  const experienceList = document.getElementById("experience-list");
  const skillsList = document.getElementById("skills-list");
  const resumeForm = document.getElementById("resume-form");
  const generatedResume = document.getElementById("generated-resume");

  const addEducationButton = document.getElementById("add-education");
  const addExperienceButton = document.getElementById("add-experience");
  const addSkillButton = document.getElementById("add-skill");

  const educationTemplate = `
    <div class="entry">
      <input type="text" name="degree[]" placeholder="Degree" required>
      <input type="text" name="school[]" placeholder="School" required>
      <input type="text" name="year[]" placeholder="Year" required>
   
    </div>
  `;

  const experienceTemplate = `
    <div class="entry">
      <input type="text" name="title[]" placeholder="Title" required>
      <input type="text" name="company[]" placeholder="Company" required>
      <input type="text" name="exp-year[]" placeholder="Year" required>
      <button type="button" class="remove-entry">Remove</button>
    </div>
  `;

  addEducationButton.addEventListener("click", function () {
    educationList.insertAdjacentHTML("beforeend", educationTemplate);
  });

  addExperienceButton.addEventListener("click", function () {
    experienceList.insertAdjacentHTML("beforeend", experienceTemplate);
  });

  skillsList.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-skill")) {
      event.target.parentElement.remove();
    }
  });

  addSkillButton.addEventListener("click", function () {
    const skillInput = document.getElementById("skill");
    const skill = skillInput.value.trim();

    if (skill) {
      const skillEntry = document.createElement("li");
      skillEntry.innerHTML = `${skill} <button type="button" class="remove-skill">Remove</button>`;
      skillsList.appendChild(skillEntry);
      skillInput.value = "";
    }
  });

  resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    let educationEntries = [];
    let experienceEntries = [];
    let skills = [];

    document.querySelectorAll("#education-list .entry").forEach((entry) => {
      const degree = entry.querySelector("input[name='degree[]']").value;
      const school = entry.querySelector("input[name='school[]']").value;
      const year = entry.querySelector("input[name='year[]']").value;
      educationEntries.push({ degree, school, year });
    });

    document.querySelectorAll("#experience-list .entry").forEach((entry) => {
      const title = entry.querySelector("input[name='title[]']").value;
      const company = entry.querySelector("input[name='company[]']").value;
      const expYear = entry.querySelector("input[name='exp-year[]']").value;
      experienceEntries.push({ title, company, expYear });
    });

    document.querySelectorAll("#skills-list li").forEach((li) => {
      skills.push(li.textContent.trim());
    });

    const generatedResumeContent = `
      <h2>Generated Resume</h2>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      
      <h3>Education</h3>
      <ul>
        ${educationEntries
          .map(
            (edu) => `<li>${edu.degree} in ${edu.school}, ${edu.year}</li>`
          )
          .join("")}
      </ul>
      
      <h3>Experience</h3>
      <ul>
        ${experienceEntries
          .map(
            (exp) => `<li>${exp.title} at ${exp.company}, ${exp.expYear}</li>`
          )
          .join("")}
      </ul>
      
      <h3>Skills</h3>
      <ul>
        ${skills.map((skill) => `<li>${skill}</li>`).join("")}
      </ul>
    `;

    generatedResume.innerHTML = generatedResumeContent;
  });
});
