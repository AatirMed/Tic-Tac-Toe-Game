import React, { useState, useEffect } from 'react';
import './library/App.css';

function App() {
  let list = [];
  for (let i = 1; i <= 9; i++) { list.push({ id: i, choix: "" }) };

  //@desc list Game Global
  const [listGame, setListGame] = useState([...list]);

  const [myTour, setmyTour] = useState(false);

  const [user, setUser] = useState([]);
  const [pc, setPc] = useState([]);

  const [win, setWin] = useState('');


  const winPatterns = [
    [3, 5, 7], [1, 5, 9], [6, 5, 4], [2, 5, 8],
    [1, 4, 7], [1, 2, 3], [3, 6, 9], [7, 8, 9]
  ];

  // @desc check if user or pc is win  -----------------------------------------------------
  const checkIFWin = (listUP) => {
    const winningPattern = winPatterns.find(pattern => pattern.every(item => listUP.includes(item)));

    if (winningPattern) {
      return true;
    }

    return false;
  };

  // @desc PC  -----------------------------------------------------
  useEffect(() => {
    setTimeout(() => {
      if (user.length > 0 && myTour && user.length !== 5) {
        const listFilter = listGame.filter(obj => obj.choix === "").map(ele => ele.id);
        const ListUser = [...user];
        const listOfRandom = [];

        for (const pattern of winPatterns) {
          const matchingPositions = pattern.filter(pos => ListUser.includes(pos));
          const vacantPositions = pattern.filter(pos => listFilter.includes(pos));

          if (matchingPositions.length >= 2) {
            listOfRandom.push(...vacantPositions);
          }
        }

        let randomIndex, indexModifyPC, x;

        if (listOfRandom.length === 0) {
          randomIndex = Math.floor(Math.random() * listFilter.length);
          x = listFilter[randomIndex];
        } else {
          randomIndex = Math.floor(Math.random() * listOfRandom.length);
          x = listOfRandom[randomIndex];
        }

        const updatedListGame = [...listGame];
        indexModifyPC = updatedListGame.findIndex(ele => ele.id === x);
        updatedListGame[indexModifyPC].choix = "O";

        setListGame(updatedListGame);
        setPc([...pc, x]);

        let check = checkIFWin([...pc, x]);
        if (check) {
          setWin("over");
        } else {
          setmyTour(false);
        }
      } else if (user.length > 0 && win === "") {
        setWin("reset");
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // @desc User -----------------------------------------------------
  const coucher = (obj) => {
    if (!myTour) {
      const indexModify = listGame.findIndex(ele => ele.id === obj.id);

      if (indexModify !== -1 && listGame[indexModify].choix === "") {
        listGame[indexModify].choix = "X";
        setListGame([...listGame]);
        setUser([...user, obj.id]);

        if (checkIFWin([...user, obj.id])) {
          setWin("win");
        } else {
          setmyTour(true);
        }
      }
    }
  };

  const reset = () => {
    setPc([]);
    setUser([]);
    setListGame([...list]);
    setmyTour(false);
    setWin('');
  };

  return (
    <div className="App">
      <div className={win !== "" ? 'result_tic' : 'dis'}>
        <div className='result'>{win === 'win' ? "Game Win" : "Game Over"}</div>
        <button className={win === "win" ? "btn_win" : 'btn_over'} onClick={reset}>Reset</button>
      </div>
      <div className={win === "" ? 'tictac' : 'tictac dis'} >
        {
          listGame.map((ele, key) => <div
            key={key}
            className='tic'
            onClick={ele.choix === "" && win === "" ? () => coucher(ele) : null}
          >{ele.choix}</div>)
        }
      </div>
    </div>
  );
}

export default App;
