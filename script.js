const allKeys = document.querySelectorAll(".input > div")
const previous = document.querySelector(".previous")
const oprationSymbol = document.querySelector(".opration-symbol")
const current = document.querySelector(".current")
const allNumbers = document.querySelectorAll(".number")
const allOprations = document.querySelectorAll(".opration")
const AC = document.querySelector(".ac")
const del = document.querySelector(".del")
const equals = document.querySelector(".equals")

class Calculator {
  constructor(previous, current, oprationEl) {
    this.previous = previous
    this.current = current
    this.oprationEl = oprationEl
    this.clear()
  }

  clear() {
    this.previousNumber = ""
    this.opration = undefined
    this.currentNumber = ""
    this.oprationDone = false
    this.update()
  }

  delete() {
    if (this.currentNumber) this.currentNumber = this.currentNumber.toString().slice(0, -1)
    this.update()
  }

  appendNumber(number) {
    if (this.oprationDone) {
      this.currentNumber = number
      this.oprationDone = false
    } else {
      this.currentNumber += number
    }
    this.update()
  }

  chooseOpration(opration) {
    if (!this.currentNumber) return
    if (this.previousNumber) this.compute()

    this.opration = opration
    this.previousNumber = this.currentNumber
    this.currentNumber = ""
    this.update()
  }

  compute() {
    const cur = parseFloat(this.currentNumber)
    const pre = parseFloat(this.previousNumber)
    switch (this.opration) {
      case "%":
        this.currentNumber = pre % cur
        break
      case "/":
        this.currentNumber = pre / cur
        break
      case "*":
        this.currentNumber = pre * cur
        break
      case "-":
        this.currentNumber = pre - cur
        break
      case "+":
        this.currentNumber = pre + cur
        break
    }
    this.previousNumber = ""
    this.opration = undefined
    this.oprationDone = true
    this.update()
  }

  update() {
    this.oprationEl.innerHTML = this.opration || " "
    this.previous.innerHTML = this.previousNumber
    this.current.innerHTML = " " + this.currentNumber
  }
}

const calculator = new Calculator(previous, current, oprationSymbol)

allKeys.forEach((key) => {
  key.onclick = () => {
    key.classList.add("whenClick")
    setTimeout(() => key.classList.remove("whenClick"), 200)
    if (key.classList.contains("ac")) calculator.clear()
    if (key.classList.contains("del")) calculator.delete()
    if (key.classList.contains("number")) calculator.appendNumber(key.innerHTML)
    if (key.classList.contains("equals")) calculator.compute()
    if (key.classList.contains("opration")) calculator.chooseOpration(key.innerHTML)
  }
})
