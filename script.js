const toggle = document.querySelector(".toggle")
const output = document.querySelector(".output")
const btns = document.querySelectorAll(".input > div")
const alldivs = document.querySelectorAll("div")

const oprations = ["%", "/", "*", "-", "+"]

const isTouchDevice = () => {
 try {
  document.createEvent("TouchEvent")
  return true
 } catch {
  return false
 }
}

let nan = false

document.addEventListener("keydown", (e) => compute(e.key))
for (let i = 0; i < btns.length; i++) btns[i].onclick = () => compute(btns[i].innerHTML)
if (isTouchDevice()) alldivs.forEach((div) => (div.style.cursor = "unset"))

function compute(condition) {
 if (nan) output.innerHTML = ""
 for (let i = 0; i < 10; i++) if (condition === `${i}`) output.innerHTML += i
 for (let i in oprations) {
  if (output.innerHTML !== "" && condition === oprations[i] && !oprations.some((opration) => output.innerHTML.includes(opration)))
   output.innerHTML += oprations[i]
 }
 if (condition === "C" || condition === "c") output.innerHTML = ""
 else if (condition === "00") output.innerHTML += "00"
 else if (condition === "." && !output.innerHTML.includes(".")) output.innerHTML += "."
 else if (condition === "l") document.body.classList.add("light")
 else if (condition === "d") document.body.classList.remove("light")
 else if ((condition === "=" || condition === "Enter") && output.innerHTML != "") output.innerHTML = eval(output.innerHTML)
 else if (condition === "DEL" || condition === "Backspace") output.innerHTML = output.innerHTML.toString().slice(0, -1)
 if (output.innerHTML === "NaN") {
  output.innerHTML = "Not a Number"
  output.style.justifyContent = "center"
  nan = true
 } else {
  output.style.justifyContent = "flex-end"
  nan = false
 }
}

toggle.onclick = () => document.body.classList.toggle("light")
