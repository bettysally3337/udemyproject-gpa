//backtick ` 跟雙引號單引號同理

let name = "Lexi";
let longString = `<form>
<div class="grader">
  <input
    type="text"
    placeholder="class category"
    class="class"
    list="opt"
    value=${name}
  /><!-- 
  --><input
    type="text"
    placeholder="class number"
    class="class-number"
  /><!-- 
  --><input
    type="number"
    placeholder="credits"
    min="0"
    max="6"
    class="class-credit"
  /><!-- 
  --><select name="select" class="select">
    <option value=""></option>
    <option value="A">A</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B">B</option>
    <option value="B-">B-</option>
    <option value="C+">C+</option>
    <option value="C">C</option>
    <option value="C-">C-</option>
    <option value="D+">D+</option>
    <option value="D">D</option>
    <option value="D-">D-</option>
    <option value="F">F</option></select
  ><!-- 
  --><button class="trash-button">
    <i class="fas fa-trash"></i>
  </button>
</div>
</form>`;
