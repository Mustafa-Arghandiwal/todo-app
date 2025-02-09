const dropdownBtn = document.getElementById("dropdown-btn");
const dropdown = document.getElementById("dropdown");
const chevron = document.getElementById("chevron");
const addNoteForm = document.getElementById("add-note-form");
const addNoteModalApply = document.getElementById("add-modal-apply");
const addNoteBtn = document.getElementById("add-todo");
const addNoteModal = document.getElementById("add-note-modal");
const updateNoteModal = document.querySelector(".update-note-modal-class");
const addModalCancelBtn = document.getElementById("add-modal-cancel");
const updateModalCancelBtn = document.getElementById("update-modal-cancel-btn");
const updateModalUpdateBtn = document.getElementById("update-modal-update-btn");
const modalOverlay = document.getElementById("modal-overlay");
const modalOverlayForUpdateNote = document.getElementById("modal-overlay-for-update-note");
const themeToggleBtn = document.getElementById("theme-toggle");
const modalInputField = document.getElementById("modal-input-field");
const UpdateModalInputField = document.getElementById("modal-input-field-update");
const mainSection = document.getElementById("main-section");
const notesContainer = document.querySelector(".notes-container");

const moonSvg = document.getElementById("moon-svg");
const sunSvg = document.getElementById("sun-svg");






let storedFilter = JSON.parse(localStorage.getItem("storedFilter"));
if(!storedFilter) {
  localStorage.setItem("storedFilter", JSON.stringify({filter: "ALL"}))
  storedFilter = JSON.parse(localStorage.getItem("storedFilter"));
} else {
  storedFilter = JSON.parse(localStorage.getItem("storedFilter"));
}
document.getElementById("dropdown-btn-text").textContent = storedFilter.filter;

// Search Notes_________________________________________________________

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchWord = document.getElementById("search-input").value.trim();
  let filter = document
    .getElementById("dropdown-btn-text")
    .textContent.toLowerCase();
    

  fetch("pages/search_notes.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchWord: searchWord, filter: filter }),
  })
    .then((res) => res.json())
    .then((notes) => {
      if (notes.length > 0) {
        notesContainer.innerHTML = "";
        for (const note of notes) {
          renderNote(note);
        }
      } else if(notes.length === 0 && searchWord === "") {
        
// _______________________________________________________
        if (filter == "all") {
          notesContainer.innerHTML = "";
          notesContainer.insertAdjacentHTML(
            "beforeend",
            `
          <div class="detective-div flex flex-col items-center">
                  <dotlottie-player src="https://lottie.host/8abf7eed-e47b-4a77-b0c6-a72f644dadd1/7039jwRhLQ.lottie" background="transparent" speed="1" style="width: 300px; height: 400px" loop autoplay></dotlottie-player>
                  <p class="text-xl text-customBlack dark:text-customWwhite">No todos for now...</p>
                  </div>
                  `
          );
        } else if (filter == "completed") {
          notesContainer.innerHTML = "";
          notesContainer.insertAdjacentHTML(
            "beforeend",
            `
                <div class="detective-div flex flex-col items-center">
                  <dotlottie-player src="https://lottie.host/8abf7eed-e47b-4a77-b0c6-a72f644dadd1/7039jwRhLQ.lottie" background="transparent" speed="1" style="width: 300px; height: 400px" loop autoplay></dotlottie-player>
                  <p class="text-xl text-customBlack dark:text-customWwhite">No completed tasks...</p>
                </div>
          `
          );
        } else {
          notesContainer.innerHTML = "";
          notesContainer.insertAdjacentHTML(
            "beforeend",
            `
                <div class="detective-div flex flex-col items-center">
                  <dotlottie-player src="https://lottie.host/8abf7eed-e47b-4a77-b0c6-a72f644dadd1/7039jwRhLQ.lottie" background="transparent" speed="1" style="width: 300px; height: 400px" loop autoplay></dotlottie-player>
                  <p class="text-xl text-customBlack dark:text-customWwhite">No pending tasks...</p>
                </div>
          `
          );
        }
// _______________________________________________________

      } else {
        
        notesContainer.innerHTML = `<div class="loader border-4 border-customPurple"></div>`;
        notesContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="search-lottie">
          <dotlottie-player id="no-res-lottie" src="https://lottie.host/a83ec77b-7e22-4080-b522-7d57888fd4e2/6ixmWZ7Gv2.lottie" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>
          </div>
          `
        )

        const lottiePlayer = document.getElementById("no-res-lottie")
        const loader = document.querySelector(".loader")

        const checkLottieLoaded = setInterval(() => {
          if(lottiePlayer && lottiePlayer.getBoundingClientRect().width > 0) {
            loader.classList.add("hidden")
            clearInterval(checkLottieLoaded)
          }
        }, 50);
      }
    });
});

//______________________________________________________________________

let isOpen = false;
const closeDropdown = () => {
  isOpen = false;
  dropdown.classList.add("opacity-0", "scale-95", "pointer-events-none");
  chevron.classList.remove("rotate-180");
  dropdown.classList.remove("opacity-100", "scale-100", "z-50");
};

dropdownBtn.addEventListener("click", () => {
  isOpen = !isOpen;
  if (isOpen) {
    dropdown.classList.remove("hidden", "opacity-0", "scale-95", "pointer-events-none");
    dropdown.classList.add("opacity-100", "scale-100", "z-50");
    chevron.classList.add("rotate-180");
  } else {
    closeDropdown();
  }
});

dropdown.addEventListener("click", (e) => {
  const option = e.target.innerText.trim();
  if (["ALL", "COMPLETED", "PENDING"].includes(option)) {
    const dropdownBtnText = document.getElementById("dropdown-btn-text");
    dropdownBtnText.innerText = option;
    localStorage.setItem("storedFilter", JSON.stringify({ filter: option }));
    closeDropdown();
    fetchFilteredNotes(option);
  }
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && !dropdownBtn.contains(e.target)) {
    if (isOpen) {
      closeDropdown();
    }
  }
});

// Filter Notes______________________________________________________________________

const fetchFilteredNotes = (filterVal) => {
  filterVal = filterVal.toLowerCase();

  fetch("pages/get_filtered_notes.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `filter=${filterVal}`,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        notesContainer.innerHTML = "";
        for (const row of data) {
          renderNote(row);
        }
      } else {
        if (filterVal == "all") {
          notesContainer.innerHTML = "";
          notesContainer.insertAdjacentHTML(
            "beforeend",
            `
          <div class="detective-div flex flex-col items-center">
                  <dotlottie-player src="https://lottie.host/8abf7eed-e47b-4a77-b0c6-a72f644dadd1/7039jwRhLQ.lottie" background="transparent" speed="1" style="width: 300px; height: 400px" loop autoplay></dotlottie-player>
                  <p class="text-xl text-customBlack dark:text-customWwhite">No todos for now...</p>
                  </div>
                  `
          );
        } else if (filterVal == "completed") {
          notesContainer.innerHTML = "";
          notesContainer.insertAdjacentHTML(
            "beforeend",
            `
                <div class="detective-div flex flex-col items-center">
                  <dotlottie-player src="https://lottie.host/8abf7eed-e47b-4a77-b0c6-a72f644dadd1/7039jwRhLQ.lottie" background="transparent" speed="1" style="width: 300px; height: 400px" loop autoplay></dotlottie-player>
                  <p class="text-xl text-customBlack dark:text-customWwhite">No completed tasks...</p>
                </div>
          `
          );
        } else {
          notesContainer.innerHTML = "";
          notesContainer.insertAdjacentHTML(
            "beforeend",
            `
                <div class="detective-div flex flex-col items-center">
                  <dotlottie-player src="https://lottie.host/8abf7eed-e47b-4a77-b0c6-a72f644dadd1/7039jwRhLQ.lottie" background="transparent" speed="1" style="width: 300px; height: 400px" loop autoplay></dotlottie-player>
                  <p class="text-xl text-customBlack dark:text-customWwhite">No pending tasks...</p>
                </div>
          `
          );
        }
      }
    });
};

//___________________________________________________________________________________

const renderNote = (noteRow) => {
  const createdAt = noteRow.created_at; 
  const date = new Date(createdAt);
  const options = { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" };
  const formattedDate = date.toLocaleString("en-US", options);

  notesContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div id="note_${
      noteRow.id
    }" class="note-div text-xl h-max w-full mt-10 gap-5 flex flex-col justify-center min-w-fit px-4 transform transition-all duration-500">
                <div class=" min-h-8 flex justify-between items-center gap-6">
                    <form action="" method="post" class="flex items-center">
                        <label for="${
                          noteRow.id
                        }" class="checkbox-label flex items-center">
                            
                            <input type="checkbox" id="${
                              noteRow.id
                            }" class="the-checkbox hidden peer" ${
      noteRow.status == "completed" ? "checked" : ""
    }   />
                            <div class="min-h-6 min-w-6 border border-customPurple rounded-sm peer-checked:bg-customPurple transition-all
                                          grid place-items-center cursor-pointer relative">
                            <div class="absolute top-px left-2 w-2 h-4 border-t-0 border-r-2 border-b-2 border-l-0 border-customWwhite dark:border-customBlack
                                        transform rotate-45  transition-transform"></div>
                            </div>
                            <span class="note-title-span ml-5 cursor-pointer max-w-96 text-customBlack dark:text-customWwhite peer-checked:line-through 
                                    peer-checked:text-customGray2 dark:peer-checked:text-customWhite2 ">${
                                      noteRow.title
                                    }</span>
                        </label>
                    </form>
                    <form action="" method="post" class=" edit-delete-form flex items-center justify-between gap-3 ">
                        <input type="hidden" class="hidden-input-note-card" name="note-id-delete"  value="${
                          noteRow.id
                        }" />
                        <input type="hidden" name="delete-note-hidden-input" value = "${
                          noteRow.id
                        }" />
                        <button type="button" name="edit-note"  class="update-todo" id="${
                          noteRow.id
                        }">
                            <svg class="w-5 h-5 text-svgColor hover:text-customPurple2 duration-75 "
                                width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.67272 3.49106L1 10.1637V13.5H4.33636L11.0091 6.82736M7.67272 3.49106L10.0654 1.09837L10.0669 1.09695C10.3962 0.767585 10.5612 0.602613 10.7514 0.540824C10.9189 0.486392 11.0993 0.486392 11.2669 0.540824C11.4569 0.602571 11.6217 0.767352 11.9506 1.09625L13.4018 2.54738C13.7321 2.87769 13.8973 3.04292 13.9592 3.23337C14.0136 3.40088 14.0136 3.58133 13.9592 3.74885C13.8974 3.93916 13.7324 4.10414 13.4025 4.43398L13.4018 4.43468L11.0091 6.82736M7.67272 3.49106L11.0091 6.82736" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button  id="${noteRow.id}" class="delete-note-btn ">
                            <svg class="trash-svg w-5 h-5 text-svgColor hover:text-customRed duration-75"
                              width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.87426 7.61505C3.80724 6.74386 4.49607 6 5.36983 6H12.6302C13.504 6 14.1928 6.74385 14.1258 7.61505L13.6065 14.365C13.5464 15.1465 12.8948 15.75 12.1109 15.75H5.88907C5.10526 15.75 4.4536 15.1465 4.39348 14.365L3.87426 7.61505Z" stroke="currentColor" />
                                <path d="M14.625 3.75H3.375" stroke="currentColor" stroke-linecap="round" />
                                <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="currentColor" />
                                <path d="M10.5 9V12.75" stroke="currentColor" stroke-linecap="round" />
                                <path d="M7.5 9V12.75" stroke="currentColor" stroke-linecap="round" />
                            </svg>
                        </button>
                       
                    </form>
                
                </div>
        
                <div class="border-0.5 border-customPurple relative">
                    <span id="" class="note-updated-at text-xs text-customPurple absolute right-0 -top-4">${
                      formattedDate
                    }</span>
                </div>
                    

            </div>
  `
  );
};

// initital page load
const dropdownBtnText = document.getElementById("dropdown-btn-text");
fetchFilteredNotes(dropdownBtnText.textContent);

//Theme Toggle_______________________________________________________________________

const body = document.body;
let localStorageStoredTheme = JSON.parse(localStorage.getItem("themeObj"));
if (!localStorageStoredTheme) {
  let defaultThemeIsDark;
  defaultThemeIsDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (defaultThemeIsDark) {
    body.classList.add("dark");
    localStorage.setItem("themeObj", JSON.stringify({ isDark: true }));
    sunSvg.classList.remove("hidden");
  } else {
    localStorage.setItem("themeObj", JSON.stringify({ isDark: false }));
    moonSvg.classList.remove("hidden");
  }
} else {
  if (localStorageStoredTheme.isDark) {
    body.classList.add("dark");
    sunSvg.classList.remove("hidden");
  } else {
    body.classList.remove("dark");
    moonSvg.classList.remove("hidden");
  }
}

themeToggleBtn.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    localStorage.setItem("themeObj", JSON.stringify({ isDark: false }));
  } else {
    localStorage.setItem("themeObj", JSON.stringify({ isDark: true }));
  }
  body.classList.toggle("dark");
  sunSvg.classList.toggle("hidden");
  moonSvg.classList.toggle("hidden");
});

//___________________________________________________________________________________

//Add Note______________________________________________________________________________

addNoteModalApply.addEventListener("click", (e) => {
  e.preventDefault();

  if (!addNoteForm.checkValidity()) {
    addNoteForm.reportValidity();
    return;
  }

  const formData = new FormData(addNoteForm);
  const formDataObj = Object.fromEntries(formData.entries());

  const searchLottie = document.querySelector(".search-lottie")
  if(searchLottie) {
    searchLottie.remove()
    document.getElementById("opt-all").click()
  }

  fetch("pages/add_note.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObj),
  })
    .then((res) => res.json())
    .then((data) => {
      addNoteModal.classList.remove("opacity-100", "pointer-events-auto");
      addNoteModal.classList.add("opacity-0", "pointer-events-none");
      modalInputField.value = "";
      const detectiveDiv = document.querySelector(".detective-div");
      
      if (detectiveDiv) {
        detectiveDiv.remove();
      }
      
      setTimeout(() => {
        renderNote(data);
        
      }, 250);
    })
    .catch((error) => {
      console.log("error occured");
      console.log(error);
    });
});

addNoteBtn.addEventListener("click", () => {
  addNoteModal.classList.remove("opacity-0", "pointer-events-none");
  addNoteModal.classList.add("opacity-100", "pointer-events-auto");
  modalInputField.focus();
});

addModalCancelBtn.addEventListener("click", () => {
  addNoteModal.classList.remove("opacity-100", "pointer-events-auto");
  addNoteModal.classList.add("opacity-0", "pointer-events-none");
});

modalOverlay.addEventListener("click", () => {
  addNoteModal.classList.remove("opacity-100", "pointer-events-auto");
  addNoteModal.classList.add("opacity-0", "pointer-events-none");
});

//___________________________________________________________________________________

// Delete note ______________________________________________________________________
document.addEventListener("click", (e) => {
  if (e.target.closest(".delete-note-btn")) {
    e.preventDefault();

    const deleteNoteBtn = e.target.closest(".delete-note-btn");
    //disabling all delete buttons and the filter button until the note is deleted
    document.querySelectorAll(".delete-note-btn").forEach((btn) => {
      btn.disabled = true;
      btn.querySelector(".trash-svg").classList.remove("hover:text-customRed");
      if (btn != deleteNoteBtn) {
        btn.classList.add("cursor-not-allowed");
      }
    });
    dropdownBtn.disabled = true;
    dropdownBtn.classList.add("cursor-not-allowed");

    const noteId = deleteNoteBtn.id;
    const form = deleteNoteBtn.parentElement;
    const noteCard = form.parentElement.parentElement;
    const undoBtn = document.querySelector(".undo-btn");
    const countdownNumberDiv = undoBtn.querySelector(".countdown-number");

    noteCard.classList.add("opacity-10");
    undoBtn.classList.remove("-top-16");
    undoBtn.classList.add("top-4");

    let duration = 3;
    countdownNumberDiv.textContent = duration;
    const interval = setInterval(() => {
      duration--;
      if (duration > 0) {
        countdownNumberDiv.textContent = duration;
      }
    }, 1000);

    let isUndoClicked = false;
    undoBtn.addEventListener("click", () => {
      clearInterval(interval);
      isUndoClicked = true;
      noteCard.classList.remove("opacity-10");
      undoBtn.classList.remove("top-4");
      undoBtn.classList.add("-top-16");
      document.querySelectorAll(".delete-note-btn").forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("cursor-not-allowed");
        btn.querySelector(".trash-svg").classList.add("hover:text-customRed");
        dropdownBtn.disabled = false;
        dropdownBtn.classList.remove("cursor-not-allowed");
      });
    });

    setTimeout(() => {
      if (!isUndoClicked) {
        undoBtn.classList.remove("top-4");
        undoBtn.classList.add("-top-16");
        document.querySelectorAll(".delete-note-btn").forEach((btn) => {
          btn.disabled = false;
          btn.classList.remove("cursor-not-allowed");
          btn.querySelector(".trash-svg").classList.add("hover:text-customRed");
          dropdownBtn.disabled = false;
          dropdownBtn.classList.remove("cursor-not-allowed");
        });

        fetch("pages/delete_note.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: noteId }),
        })
          .then((res) => res.json())
          .then((data) => {
            noteCard.remove();
            const dropdownBtnText = document.getElementById("dropdown-btn-text").textContent;
           
            if (dropdownBtnText == "ALL" && data.noNotes) {
              notesContainer.insertAdjacentHTML(
                "beforeend",
                `
              <div class="detective-div flex flex-col items-center">
                <dotlottie-player src="https://lottie.host/8abf7eed-e47b-4a77-b0c6-a72f644dadd1/7039jwRhLQ.lottie" background="transparent" speed="1" style="width: 300px; height: 400px" loop autoplay></dotlottie-player>
              <p class="text-xl text-customBlack dark:text-customWwhite">No notes for now...</p>
              </div>
              
              `
              );
            } else if (dropdownBtnText == "PENDING" && data.noPending) {
              notesContainer.insertAdjacentHTML(
                "beforeend",
                `
              <div class="detective-div flex flex-col items-center">
                <dotlottie-player src="https://lottie.host/8abf7eed-e47b-4a77-b0c6-a72f644dadd1/7039jwRhLQ.lottie" background="transparent" speed="1" style="width: 300px; height: 400px" loop autoplay></dotlottie-player>
              <p class="text-xl text-customBlack dark:text-customWwhite">No pending tasks...</p>
              </div>
              
              `
              );
            } else if (dropdownBtnText == "COMPLETED" && data.noCompleted) {
              notesContainer.insertAdjacentHTML(
                "beforeend",
                `
              <div class="detective-div flex flex-col items-center">
                <dotlottie-player src="https://lottie.host/8abf7eed-e47b-4a77-b0c6-a72f644dadd1/7039jwRhLQ.lottie" background="transparent" speed="1" style="width: 300px; height: 400px" loop autoplay></dotlottie-player>
              <p class="text-xl text-customBlack dark:text-customWwhite">No completed tasks...</p>
              </div>
              
              `
              );
            }
          });
      }
    }, 3000);
  }
});

//___________________________________________________________________________________

//Edit Note__________________________________________________________________________

document.addEventListener("click", (e) => {
  if (e.target.closest(".update-todo")) {
    const updateTodoBtn = e.target.closest(".update-todo");
    const noteId = updateTodoBtn.id;
    const noteTitle =
      updateTodoBtn.parentElement.parentElement.querySelector(
        ".note-title-span"
      ).innerHTML;
    updateNoteModal.classList.remove("opacity-0", "pointer-events-none");
    updateNoteModal.classList.add("pointer-events-auto");
    UpdateModalInputField.value = noteTitle;
    UpdateModalInputField.focus();
    updateNoteModal.querySelector(".update-modal-hidden-input").value = noteId;
  }
});

updateModalUpdateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const noteId = document.querySelector(".update-modal-hidden-input").value;
  const newTitle = document.getElementById("modal-input-field-update").value;

  fetch("pages/edit_note.php", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: noteId, newTitle: newTitle }),
  })
    .then((res) => res.json())
    .then((data) => {
      updateNoteModal.classList.add("opacity-0", "pointer-events-none");
      updateNoteModal.classList.remove("pointer-events-auto");

      const noteCard = document.getElementById(`note_${noteId}`);
      const noteTitle = noteCard.querySelector(".note-title-span");
      noteTitle.textContent = data.title;
    });
});

updateModalCancelBtn.addEventListener("click", (e) => {
  updateNoteModal.classList.add("opacity-0", "pointer-events-none");
  updateNoteModal.classList.remove("pointer-events-auto");
});

modalOverlayForUpdateNote.addEventListener("click", (e) => {
  updateNoteModal.classList.add("opacity-0", "pointer-events-none");
  updateNoteModal.classList.remove("pointer-events-auto");
});

//___________________________________________________________________________________

//Update Note Status_________________________________________________________________

document.addEventListener("click", (e) => {
  if (e.target.closest(".checkbox-label")) {
    e.preventDefault();
    
    

    const checkbox = e.target
      .closest(".checkbox-label")
      .querySelector(".the-checkbox");
    const noteCard =
      checkbox.parentElement.parentElement.parentElement.parentElement;
    const dropdownBtnText =
      document.getElementById("dropdown-btn-text").textContent;

    fetch("pages/update_note_status.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteId: checkbox.id,
        changeTo: !checkbox.checked,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const currStatus = data.currStatus;
        
        if (currStatus == "completed") {
          checkbox.checked = true;

          if (dropdownBtnText == "PENDING") {
            noteCard.classList.add("opacity-10");
            setTimeout(() => {
              document.getElementById("opt-pending").click();
            }, 420);
          }
        } else {
          checkbox.checked = false;

          if (dropdownBtnText == "COMPLETED") {
            noteCard.classList.add("opacity-10");
            setTimeout(() => {
              document.getElementById("opt-completed").click();
            }, 420);
          }
        }
      });
  }
});

//___________________________________________________________________________________





setTimeout(() => {
  const noNotesAnimation = notesContainer.querySelector(".detective-div")
  if(noNotesAnimation) {
    body.insertAdjacentHTML("beforeend", 
      `
      <div class="arrow pointer-events-none fixed p-0 bottom-14 md:bottom-28 lg:bottom-28 -right-3 md:right-3 lg:right-9  flex flex-col items-center justify-center 
      text-customBlack dark:text-customWwhite font-medium text-sm">
      <span>add a note</span>
      <dotlottie-player class="rotate-90" src="https://lottie.host/6a771ffa-6b60-4dbf-84ad-cff8ec969abd/uA8G5Tyos7.lottie" background="transparent" speed="1" style="width: 100px; height: 100px" loop autoplay></dotlottie-player>
      </div>
      `
    )
    const arrow = document.querySelector(".arrow")
    setTimeout(() => {
      arrow.classList.add("hidden");
    }, 5800);

    addNoteBtn.addEventListener("mouseover", () => {
      arrow.classList.add("hidden")
    })
  }
}, 2300);


// DELETE ALL ______________________________________________

const deleteAllBtn = document.getElementById("delete-all")
const deleteAllCancelBtn = document.getElementById("delete-all-cancel")
const deleteAllDeleteBtn = document.getElementById("delete-all-delete")
const deleteAllModal = document.getElementById("delete-all-modal")
const deleteAllOverlay = document.getElementById("delete-all-overlay")
const youSureFilterSpan = document.getElementById("you-sure-filter-span")

deleteAllBtn.addEventListener("click", () => {
  deleteAllModal.classList.remove("opacity-0", "pointer-events-none")
  youSureFilterSpan.textContent = ""
  const filter = document.getElementById("dropdown-btn-text").textContent
  youSureFilterSpan.textContent = ""
  if(filter !== "ALL") {
    youSureFilterSpan.textContent = filter

  }

  const trashSvg = document.querySelector(".big-trash-svg")
  setTimeout(() => {
    trashSvg.classList.add("shake")
    setTimeout(() => {
      trashSvg.classList.remove("shake")
    }, 500);
    
  }, 200);

})

deleteAllCancelBtn.addEventListener("click", () => {
  deleteAllModal.classList.add("opacity-0", "pointer-events-none")
})

deleteAllOverlay.addEventListener("click", () => {
  deleteAllModal.classList.add("opacity-0", "pointer-events-none")
  
})


const observer = new MutationObserver(mutationsList => {
  const hasNotes = Array.from(notesContainer.children).some(
    (child) => child.classList.contains('note-div')
  )
  deleteAllBtn.disabled = !hasNotes

})

observer.observe(notesContainer, {
  childList: true,
});

deleteAllDeleteBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const filter = dropdownBtnText.textContent.toLowerCase()
  fetch("pages/delete_all_notes.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded" 
    },
    body: `filter=${filter}`
  })
  .then(res => res.json())
  .then(data => {
    if(data.success) {
      const notesOnScreen = document.querySelectorAll(".note-div")
      notesOnScreen.forEach(note => {
        note.classList.add("opacity-10")
      })
      setTimeout(() => {
        
        fetchFilteredNotes(filter)
      }, 420);
      
    }
  })

  deleteAllModal.classList.add("opacity-0", "pointer-events-none")

})





// __________________________________________________________