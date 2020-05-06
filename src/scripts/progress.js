window.addEventListener("DOMContentLoaded", () => {});
const sumHours = parseInt(localStorage.getItem("sum"));
const skillLevel = document.querySelector(".skill-level");
const bar = document.querySelector(".amount-completed");

let lvl = 0;
function increaseBar() {
  if (lvl === 0) {
    lvl = 1;
    let height = 1;
    let id = setInterval(frame, 8);
    function frame() {
      const sumHours = parseInt(localStorage.getItem("sum"));
      let sum = sumHours;
      if (sum % 100 > 0) {
        sum = sum % 100;
      } else if (10000 - sum === 10000) {
        sum = 0;
      } else if (sum % 100 === 0) {
        sum = 100;
      }
      if (height >= sum) {
        clearInterval(id);
        lvl = 0;
      } else {
        height++;
        updateCompetency();
        bar.style.height = height + "%";
      }
    }
  }
}

function updateCompetency() {
  let competencyLevel;
  const skillLevel = document.querySelector(".skill-level");
  let hoursRemaining = 10000 - sumHours;
  if (hoursRemaining > 8000) {
    competencyLevel = "Novice";
    bar.style.backgroundColor = "#ffffff";
  } else if (hoursRemaining > 6000 && hoursRemaining <= 8000) {
    competencyLevel = "Advanced Beginner";
    bar.style.backgroundColor = "#fde400";
  } else if (hoursRemaining > 4000 && hoursRemaining <= 6000) {
    competencyLevel = "Intermediate";
    bar.style.backgroundColor = "#fdad00";
  } else if (hoursRemaining > 2000 && hoursRemaining <= 4000) {
    competencyLevel = "Expert";
    bar.style.backgroundColor = "#009400";
  } else if (hoursRemaining > 0 && hoursRemaining < 2000) {
    competencyLevel = "Pro";
    bar.style.backgroundColor = "#003ada";
  } else {
    competencyLevel = "Master";
    bar.style.backgroundColor = "#2a2a2a";
  }
  skillLevel.innerText = competencyLevel;
}

updateCompetency();
increaseBar();

export { updateCompetency, increaseBar };
