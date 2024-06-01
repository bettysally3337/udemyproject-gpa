let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

//gsap套件
const time_line = new TimelineMax();

//parameter1 是要控制的對象
//parameter2 是duration
//parameter3 是控制對象的原始狀態
//parameter4 是控制對象的動畫結束後的狀態
//parameter5 可以設定動畫提早開始跑
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    //一開始放在畫面最左邊(往左移100%)，然後從左邊滑進來
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    //slider提早1.2秒開始跑，跟開始變寬的圖片同時開始
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

//某個時間到了就執行某個function
window.setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

//因為按enter整個表單都會被交出去，所以讓整個網站的Enter都無法使用，取消這個default
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

//防止form內部的btn交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//選擇select內的option後，可以改變相對應的顏色
let allSelects = document.querySelectorAll("select"); // 靜態nodelist
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target); //e.target是<select>
  });
});

//改變credit之後，gpa也要更新
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B+" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C+" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D" ||
    target.value == "D+" ||
    target.value == "D-"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "grey";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
  }
}

function setGPA() {
  let formLength = document.querySelectorAll("form").length; //因為是formlist所以可以直接用.length
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0; //gpa計算分子
  let creditSum = 0; //gpa計算分母

  for (let i = 0; i < credits.length; i++) {
    //沒有輸入的值是nan，這裡設定如果credit不為nan，就增加creditSum
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  let result;
  if (creditSum == 0) {
    //若學分均為0，則gpa為0
    result = (0.0).toFixed(2);
  } else {
    //取結果到小數點第二位
    result = (sum / creditSum).toFixed(2);
  }
  document.getElementById("result-gpa").innerText = result;
}
function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

//新增新的表單
let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");
  //製作五個小元素
  let newInput1 = document.createElement("input");
  //setAttribute設定一個屬性
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.classList.add("class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("max", 6);
  newInput3.setAttribute("min", 0);
  newInput3.classList.add("class-credit");
  newInput3.addEventListener("change", () => {
    setGPA();
  });

  // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  //要加這個因為前面allselects回傳的是靜態的nodelist
  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  //不能一次加兩個class，會回傳錯誤訊息中間不能有空格
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);

  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  newForm.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newForm);
  //新增form的放大特效
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    //縮小動畫，但會留下空格，所以後面remove()將他從dom tree刪除
    e.target.parentElement.parentElement.classList.add("remove");
  });
});
//設定transition結束之後再remove
allTrash.forEach((trash) => {
  let form = trash.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
  });
});

let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSorting("descending"); //大到小
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); //小到大
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];
  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value; //class category
    let class_number = graders[i].children[1].value; // class number
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;
    console.log(class_name, class_number, class_credit, class_grade);
    //form裡面有東西時，才做排序，value抓到的都是string，所以這裡判斷式為空字串""
    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      //設定上面的值為物件屬性，可以設為class_name:class_name,但下面這個方式更快
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      objectArray.push(class_object);
    }
  }

  //取得object array後，可以把成績換成數字
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }

  objectArray = mergeSort(objectArray);
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }
  //根據object array的內容來更新網頁
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";

  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
      <input
        type="text"
        placeholder="class category"
        class="class"
        list="opt"
        value=${objectArray[i].class_name}
      /><!-- 
      --><input
        type="text"
        placeholder="class number"
        class="class-number"
        value=${objectArray[i].class_number}
      /><!-- 
      --><input
        type="number"
        placeholder="credits"
        min="0"
        max="6"
        class="class-credit"
        value=${objectArray[i].class_credit}
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
  }
  //因為select無法用上面的string更改，所以直接用js更改
  graders = document.querySelectorAll("div.grader"); //因為是靜態nodelist，上面更新了要讓他更新
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  //因為前面都沒有事件監聽器，所以改變順序後，改變redit gpa不變，或是select不會改變顏色
  //select事件監聽-顏色轉變
  allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    changeColor(select); //因為改變順序後select會沒有顏色
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  //credit事件監聽
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  //垃圾桶
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}

//排序處理
function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }
  //j超過a2的array長度值的時候，把i剩下的值放進去
  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  //i超過a1的array長度值的時候，把i剩下的值放進去
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }
  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }
  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right)); //遞迴
  }
}
