import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useKeyDown from "../hooks/useKeyDown";
import useDocumentTitle from "../hooks/useDocumentTitle";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
  { id: "megaCursor", name: "Mega Cursor", cost: 200, value: 20}
];

const Game = () => {
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megaCursor: 0,
  })

  let megaCursorMultiplicator = purchasedItems.megaCursor * 20; 

  const handleButtonClick = () => {
    console.log("handleButtonClick")
    setNumCookies(numCookies + 1 + megaCursorMultiplicator);
  }

  const handleClick = (item) => {
    if (numCookies < item.cost) {
      window.alert("Not enough cookies");
    } else {
      setNumCookies(numCookies - item.cost);
      setPurchasedItems({ ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 });
    }
    }
  
    const calculateCookiesPerTick = (purchasedItems) => {
      let autoCookies = purchasedItems.cursor * 1 + purchasedItems.grandma * 10 + purchasedItems.farm * 80;
      return autoCookies;
    }
  
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  useDocumentTitle(`${numCookies} Cookies - Idle cookie`)

  useKeyDown("Space", handleButtonClick);
  
  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second <br />
          <strong>{1 + purchasedItems.megaCursor * 20}</strong> cookies per click
        </Indicator>
        <Button onClick={handleButtonClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          return <Item item={item} purchasedItems={purchasedItems} handleClick={handleClick} index={index}/>
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
