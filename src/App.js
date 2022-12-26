import { Component } from "react";
import "./App.css";

function rollDie() {
  return Math.floor(Math.random() * 6) + 1
}

function combinedRoll(dice, player) {
  let max = (player === "attacker") ? 3 : 2
  let rolls = 0
  let results = []
  if (dice >= max) {
    rolls = max
  }
  else {
    rolls = dice
  }
  for (let i = 0; i < rolls; i++) {
    results.push(rollDie())
  }
  results = results.sort().reverse()
  console.log(results)
  return results
}

function rollDice(a, d) {
  console.log("ROLLING...")
  let attacker = a
  let defender = d
  let winner, troops
  let rollCount = 0
  while (attacker > 0 && defender > 0) {
    rollCount++
    console.log("Roll", rollCount)
    let attackerRoll = combinedRoll(attacker, "attacker")
    let defenderRoll = combinedRoll(defender, "defender")
    let pairs = Math.min(attackerRoll.length, defenderRoll.length)
    for (let i = 0; i < pairs; i++) {
      if (attackerRoll[i] > defenderRoll[i]) {
        defender--
      }
      else {
        attacker--
      }
    }
  }
  if (attacker === 0 && defender === 0) {
    winner = "error"
    troops = -1
  }
  else {
    winner = (attacker > defender) ? "Attacker" : "Defender"
    troops = (attacker > defender) ? attacker : defender
  }
  return { winner, troops }
}

export default class App extends Component {
  state = {
    attacker: 0,
    defender: 0,
    winner: "",
    troops: 0
  }

  onAttackerChange = e => {
    this.setState({
      attacker: e.target.value
    })
  }

  onDefenderChange = e => {
    this.setState({
      defender: e.target.value
    })
  }

  roll = e => {
    e.preventDefault()
    let results = rollDice(this.state.attacker, this.state.defender)
    console.log(results)
    this.setState({
      winner: results.winner,
      troops: results.troops
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Risk Roller</h1>
          <p>Attacker</p>
          <input type="title" onChange={this.onAttackerChange} />
          <p>Defender</p>
          <input type="title" onChange={this.onDefenderChange} />
          <br />
          <button onClick={this.roll}>Roll</button>
          <br />
          {(this.state.winner.length > 0) ? <p>Winner: {this.state.winner}  |  Troops: {this.state.troops} </p> : <p></p>}
        </header>
      </div>
    )
  }
}
