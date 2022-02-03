import {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [player1, setPlayer1] = useState([])
  const [player2, setPlayer2] = useState([])
  const [player3, setPlayer3] = useState([])
  const [player4, setPlayer4] = useState([])

  const [changeList, setChangeList] = useState([])

  useEffect(() => {
    if (localStorage.getItem("p1")) {
      setPlayer1(JSON.parse(localStorage.getItem("p1")))
      setPlayer2(JSON.parse(localStorage.getItem("p2")))
      setPlayer3(JSON.parse(localStorage.getItem("p3")))
      setPlayer4(JSON.parse(localStorage.getItem("p4")))
      setChangeList(JSON.parse(localStorage.getItem("changeList")))
    }

    let playerNameInputTexts = document.querySelectorAll('.player-grid > input')
    for (let i = 0; i < 4; i++) {
      if (localStorage.getItem(`p${i}Name`)) {
        playerNameInputTexts[i].value = localStorage.getItem(`p${i}Name`)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("p1", JSON.stringify(player1))
    localStorage.setItem("p2", JSON.stringify(player2))
    localStorage.setItem("p3", JSON.stringify(player3))
    localStorage.setItem("p4", JSON.stringify(player4))
    localStorage.setItem("changeList", JSON.stringify(changeList))
  }, [player1, player2, player3, player4, changeList])

  function addPoints() {
    let pointInputs = document.querySelectorAll('input[type="number"]')
    let change = [0, 0, 0, 0]
    pointInputs.forEach((element, n) => {
      let pointToAdd = element.value
      element.value = ""
      if (pointToAdd.length == 0) {
        pointToAdd = "-"
      }
      switch (n) {
        case 0:
          setPlayer1([...player1, pointToAdd])
          change[0] = 1;
          break
        case 1:
          setPlayer2([...player2, pointToAdd])
          change[1] = 1;
          break
        case 2:
          setPlayer3([...player3, pointToAdd])
          change[2] = 1;
          break
        case 3:
          setPlayer4([...player4, pointToAdd])
          change[3] = 1;
          break
      }
    })
    setChangeList([...changeList, change])
  }

  function addPenalty() {
    let pointInputs = document.querySelectorAll('input[type="number"]')
    let change = [0, 0, 0, 0]
    pointInputs.forEach((element, n) => {
      let pointToAdd = element.value
      element.value = ""
      if (pointToAdd.length != 0) {
        pointToAdd += "*"
        switch (n) {
          case 0:
            setPlayer1([...player1, pointToAdd])
            change[0] = 1;
            break
          case 1:
            setPlayer2([...player2, pointToAdd])
            change[1] = 1;
            break
          case 2:
            setPlayer3([...player3, pointToAdd])
            change[2] = 1;
            break
          case 3:
            setPlayer4([...player4, pointToAdd])
            change[3] = 1;
            break
        }
      }
    })
    setChangeList([...changeList, change])
  }

  function calculatePoints() {
    let players = [player1, player2, player3, player4]
    let playerScores = [0, 0, 0, 0]

    players.forEach((player, i) => {
      player.forEach((score) => {
        if (score != "-") {
          playerScores[i] += parseInt(score)
        }else {
          playerScores[i] -= 101
        }
      })
    })

    let playerScoreTexts = document.querySelectorAll('.player-total-score')
    playerScoreTexts.forEach((element, i) => {
      element.innerHTML = playerScores[i]
    })

    let teamScoreTexts = document.querySelectorAll('.team-total-score')
    teamScoreTexts[0].innerHTML = playerScores[0] + playerScores[1]
    teamScoreTexts[1].innerHTML = playerScores[2] + playerScores[3]

    let playerNameTexts = document.querySelectorAll('.player-name')
    let playerNameInputTexts = document.querySelectorAll('.player-grid > input')
    playerNameTexts.forEach((element, i) => {
      let name = playerNameInputTexts[i].value
      if (name == "") {
        name = "?"
      }
      element.innerHTML = name
    })

    toggleScoreTable()
  }

  function toggleScoreTable() {
    let mainScoreContainer = document.querySelector('.main-score-table-container')
    mainScoreContainer.classList.toggle("hide")
  }

  function undo() {
    if (changeList.length == 0) return
    let lastChange = changeList[changeList.length-1]
    if (lastChange[0] == 1) {
      let tempArray = [...player1]
      tempArray.pop()
      setPlayer1(tempArray)
    }
    if (lastChange[1] == 1) {
      let tempArray = [...player2]
      tempArray.pop()
      setPlayer2(tempArray)
    }
    if (lastChange[2] == 1) {
      let tempArray = [...player3]
      tempArray.pop()
      setPlayer3(tempArray)
    }
    if (lastChange[3] == 1) {
      let tempArray = [...player4]
      tempArray.pop()
      setPlayer4(tempArray)
    }
    let tempArray = [...changeList]
    tempArray.pop()
    setChangeList(tempArray)
  }

  function clearLocalStorage() {
    let confirm = window.confirm("Tüm veriler sıfırlanacaktır, devam etmek istiyor musunuz?")
    if (confirm) {
      localStorage.clear()
      window.location.reload()
    }
  }

  function savePlayerNames() {
    let playerNameInputTexts = document.querySelectorAll('.player-grid > input')
    playerNameInputTexts.forEach((element, i) => {
      localStorage.setItem(`p${i}Name`, element.value)
    })
  }

  return (
    <>
      <div className="main-container">
        <div className="team-indicator-container">
          <div>1</div>
          <div>2</div>
        </div>
        <div className="player-grid">
          <input type="text" placeholder="?" maxLength="2" onChange={savePlayerNames}/>
          {player1.map(element => {
            return <div>{element}</div>
          })}
        </div>
        <div className="player-grid">
          <input type="text" placeholder="?" maxLength="2" onChange={savePlayerNames}/>
          {player2.map(element => {
            return <div>{element}</div>
          })}
        </div>
        <div className="player-grid">
          <input type="text" placeholder="?" maxLength="2" onChange={savePlayerNames}/>
          {player3.map(element => {
            return <div>{element}</div>
          })}
        </div>
        <div className="player-grid">
          <input type="text" placeholder="?" maxLength="2" onChange={savePlayerNames}/>
          {player4.map(element => {
            return <div>{element}</div>
          })}
        </div>
      </div>
      <div className="add-point-container">
          <div className="input-container">
            <input type="number"/>
            <input type="number"/>
            <input type="number"/>
            <input type="number"/>
          </div>
          <div className="button-container">
            <button onClick={addPoints}>YAZ</button>
            <button onClick={addPenalty}>CEZA</button>
          </div>
          <div className="calculate-button-container">
            <button onClick={calculatePoints}>HESAPLA</button>
          </div>
          <i class="fas fa-sync refresh-icon" onClick={clearLocalStorage}></i>
          <i class="fas fa-undo undo-icon" onClick={undo}></i>
      </div>
      <div className="main-score-table-container hide">
        <div className="score-table-container">
          <i class="fas fa-times score-table-close-icon" onClick={toggleScoreTable}></i>
          <div className="team-container">
            <div className="team-score-container">
              <div>1</div>
              <div className="team-total-score">?</div>
            </div>
            <div className="player-score-container">
              <div className="player-name">?</div>
              <div className="player-total-score">?</div>
            </div>
            <div className="player-score-container">
              <div className="player-name">?</div>
              <div className="player-total-score">?</div>
            </div>
          </div>
          <div className="team-container">
            <div className="team-score-container">
              <div>2</div>
              <div className="team-total-score">?</div>
            </div>
            <div className="player-score-container">
              <div className="player-name">?</div>
              <div className="player-total-score">?</div>
            </div>
            <div className="player-score-container">
              <div className="player-name">?</div>
              <div className="player-total-score">?</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;