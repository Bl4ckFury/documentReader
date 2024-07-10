const closeModalSubmit = document.getElementById("closeModalSubmit");
const closeModalAuth = document.getElementById("closeModalAuth");
const closeCreateBtn = document.getElementById("closeCreateBtn");
const closeModalReg = document.getElementById("closeModalReg");

const regModalBtn = document.getElementById("regModalBtn");
const authButton = document.getElementById("authButton");
const createBtn = document.getElementById("createBtn");
const submitBtn = document.getElementById("submitBtn");
const deleteBtn = document.getElementById("btnDeleteDoc");
const editBtn = document.getElementById("btnEditDocument");

const docModal = document.getElementById("docModal");
const docModalHeader = document.getElementById("docModalHeader");
const submitModal = document.getElementById("submitModal");
const authModal = document.getElementById("authModal");
const regModal = document.getElementById("regModal");

const modalDocumentBtn = document.getElementById("modalDocumentBtn");
const submitEmailBtn = document.getElementById("submitEmailBtn");
const emailSubmit = document.getElementById("emailSubmit");
const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("tableBody");
const applyBtn = document.getElementById("applyBtn");
const tr = document.getElementsByTagName("tr");

regModalBtn.addEventListener("click", () => {
  regModal.classList.toggle("modal-show");
  authModal.classList.toggle("modal-show");
});

authButton.addEventListener("click", () => {
  authModal.classList.toggle("modal-show");
});

submitBtn.addEventListener("click", () => {
  submitModal.classList.toggle("modal-show");
});

closeModalSubmit.addEventListener("click", () => {
  submitModal.classList.toggle("modal-show");
  emailSubmit.value = "";
});

createBtn.addEventListener("click", () => {
  modalDocumentType = "create";
  docModalHeader.innerText = "Создание документа";
  modalDocumentBtn.value = "создать";
  docModal.classList.toggle("modal-show");
});

closeModalReg.addEventListener("click", () => {
  regModal.classList.toggle("modal-show");
});

closeModalAuth.addEventListener("click", () => {
  authModal.classList.toggle("modal-show");
});

closeCreateBtn.addEventListener("click", () => {
  docModal.classList.toggle("modal-show");
});

const searchTable = () => {
  let search = document.getElementById("searchInput").value.trim();
  let searchRegex = new RegExp(search, "i");
  let rows = document.getElementById("myTable").getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    rows[i].style.display = searchRegex.test(rows[i].textContent) ? "" : "none";
  }
};

let debounceTimer;
document.getElementById("searchInput").addEventListener("keyup", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => searchTable(), 200);
});

let DOCUMENTS = [
  {
    id: 1,
    name: "Название 1",
    author: "Автор 1",
    date: "2023-01-01",
    status: "Отклонен",
    description: "Трудно",
    download: "https://example.com/download1",
  },
  {
    id: 2,
    name: "Название 2",
    author: "Автор 2",
    date: "2023-01-02",
    status: "Ожидает подтверждения",
    description: "Не хочу",
    download: "https://example.com/download2",
  },
  {
    id: 3,
    name: "Название 3",
    author: "Автор 3",
    date: "2023-01-03",
    status: "В процессе",
    description: "Не буду",
    download: "https://example.com/download3",
  },
  {
    id: 4,
    name: "Название 4",
    author: "Автор 4",
    date: "2023-01-04",
    status: "Готов",
    description: "Ладно",
    download: "https://example.com/download3",
  },
  {
    id: 5,
    name: "Название 5",
    author: "Автор 5",
    date: "2023-01-05",
    status: "Готов",
    description: "Принято",
    download: "https://example.com/download3",
  },
];
let selectedDocument = null;
let modalDocumentType = null;

const showDocumentsRow = (documents) => {
  tableBody.innerHTML = "";

  documents.forEach((doc) => {
    const row = `
      <tr id="document-${doc.id}">
        <td class="selectDoc" data-documentid="${doc.id}"><input type="radio" name="select-doc" /></td>
        <td>${doc.name}</td>
        <td>${doc.author}</td>
        <td>${doc.date}</td>
        <td>${doc.status}</td>
        <td>${doc.description}</td>
        <td><a href="#">Скачать</a></td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });

  const radioSelects = document.querySelectorAll(".selectDoc");
  radioSelects.forEach((radio) => {
    radio.addEventListener("click", () => {
      selectedDocument = Number(radio.dataset.documentid);
    });
  });
};
showDocumentsRow(DOCUMENTS);

const filterDocuments = () => {
  const filteredDocuments = [];
  const filter = {
    name: document.getElementById("filterName").value,
    author: document.getElementById("filterAuthor").value,
    date: document.getElementById("filterDate").value,
    status: document.getElementById("filterStatus").value,
    description: document.getElementById("filterDescription").value,
  };

  DOCUMENTS.forEach((document) => {
    let isValid = true;

    for (let key in filter) {
      if (filter[key]) {
        if (document[key].indexOf(filter[key]) === -1) {
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      filteredDocuments.push(document);
    }
  });

  showDocumentsRow(filteredDocuments);
};

applyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  filterDocuments();
});

const createDocument = () => {
  const newDocument = {
    id: DOCUMENTS.length + 1,
    name: document.getElementById("docName").value,
    author: document.getElementById("docAuthor").value,
    date: document.getElementById("docDate").value,
    status: document.getElementById("docStatus").value,
    description: document.getElementById("docDescription").value,
  };

  DOCUMENTS.push(newDocument);
  showDocumentsRow(DOCUMENTS);
};

const deleteDocument = () => {
  DOCUMENTS = DOCUMENTS.filter((document) => document.id != selectedDocument);

  showDocumentsRow(DOCUMENTS);
};

editBtn.addEventListener("click", () => {
  modalDocumentType = "edit";

  if (selectedDocument === null) {
    return alert("Необходимо выбрать документ");
  }

  docModalHeader.innerText = "Редактирование документа";
  modalDocumentBtn.value = "применить";

  const selectDocument = DOCUMENTS.filter(
    (doc) => doc.id === selectedDocument
  )[0];

  document.getElementById("docName").value = selectDocument.name;
  document.getElementById("docAuthor").value = selectDocument.author;
  document.getElementById("docDate").value = selectDocument.date;
  document.getElementById("docStatus").value = selectDocument.status;
  document.getElementById("docDescription").value = selectDocument.description;

  docModal.classList.toggle("modal-show");
});

modalDocumentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  docModal.classList.toggle("modal-show");

  switch (modalDocumentType) {
    case "create":
      createDocument();
      break;
    case "edit":
      const editedDocument = {
        id: selectedDocument,
        name: document.getElementById("docName").value,
        author: document.getElementById("docAuthor").value,
        date: document.getElementById("docDate").value,
        status: document.getElementById("docStatus").value,
        description: document.getElementById("docDescription").value,
      };

      const index = DOCUMENTS.findIndex(
        (document) => document.id == selectedDocument
      );
      DOCUMENTS[index] = editedDocument;

      showDocumentsRow(DOCUMENTS);
      break;
  }

  document.getElementById("docName").value = "";
  document.getElementById("docAuthor").value = "";
  document.getElementById("docDate").value = "";
  document.getElementById("docStatus").value = "";
  document.getElementById("docDescription").value = "";
});

deleteBtn.addEventListener("click", deleteDocument);
