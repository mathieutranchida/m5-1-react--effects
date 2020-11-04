import React from "react";
import styled from "styled-components";



const Item = ({ item, purchasedItems, handleClick }) => {
    return (
        <Wrapper onClick={(ev) => { handleClick(item) }}>
            <ItemDescription>
                <Name>{item.name}</Name>
                <Description>Cost {item.cost} cookies. Preduces {item.value} cookie(s)/second.</Description>
            </ItemDescription>
            <PurchasedItems>{purchasedItems[item.id]}</PurchasedItems>
        </Wrapper>
    )
}

const Wrapper = styled.button`
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: white;
    margin-top: 25px;
    margin-right: 0px;
    justify-content: space-between;
`;

const ItemDescription = styled.div``;

const Name = styled.h3`
    text-align: left;
`;

const Description = styled.p`
    font-size: 8pt;
`;

const PurchasedItems = styled.h2`
    margin-left: 35px;
    text-align: right;
`;

export default Item;