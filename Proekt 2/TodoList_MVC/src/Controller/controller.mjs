export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }
  initForm() {
    this.view.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const newTask = data.get("inputName");
      if (newTask !== "") {
        this.view.ul.className = "main-list";
        this.model.addTask(newTask);
        this.renderItems();

        this.view.input.value = "";
      }
    });
  }
  inputSort() {
    this.view.buttonSort.addEventListener("click", (event) => {
      this.model.sortTask();
      event.target.classList.toggle("button-sort");
      if (event.target.className !== "button-sort") {
        this.model.sortTaskReverse();
        this.view.changeImage();
      } else {
        this.model.sortTask();
        this.view.changeImageDefault();
      }
      this.renderItems();
    });
  }
  renderItems() {
    this.view.ul.innerText = "";
    this.model.arr.forEach((item, index) => {
      this.inputText = this.view.createInput({
        type: "text",
        class: "input-text",
        id: "inputText",
        name: "inputName",
        value: item,
      });

      this.inputText.addEventListener("keyup", (event) => {
        this.model.changeTask(index, event.target.value);
      });

      this.buttonDelete = this.view.createButton({
        text: "x",
        class: "button-delete",
        id: "buttonDelete",
        type: "button",
      });

      this.li = this.view.createLi({
        class: "add-New-Task",
      });

      this.li.appendChild(this.inputText);
      this.li.appendChild(this.buttonDelete);
      this.view.ul.appendChild(this.li);

      this.buttonDelete.addEventListener("click", () => {
        this.model.deleteTask(index);
        this.renderItems();
        if (this.view.ul.innerHTML === "") {
          this.view.ul.className = "";
        }
      });
    });
  }

  init() {
    this.view.init();
    this.initForm();
    this.inputSort();
  }
}
