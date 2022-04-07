import React, { useEffect, useState } from 'react';
import './App.css';
import './styles.scss';
import fon from "./logo100.png"
import { Checkbox } from 'antd';

interface IChecked {
  checked: boolean;
}
interface IAdditionalPhotos {
  compressed: string;
  original: string;
} 

interface IAvatar {
  compressed: string;
  original: string;
} 

interface IImage {
  compressed: string;
  original: string;
}
interface ICreatedBy {
  user_id: number;
  display_name: string;
  public_address: string;
  custom_url: string;
  image: IImage;
}

interface IAttributes {
  value: string;
  trait_type: string;
}
interface IJsonNftData {
  name: string;
  image: string;
  attributes: IAttributes;
  description: string;
  external_url: string;
}

interface IOtherFile {
  original: string;
}
interface IItems {
  additional_photos: IAdditionalPhotos
avatar: IAvatar;
created_at: string;
created_by: ICreatedBy;
description: string;
initial_price: number;
is_wearable: boolean;
json_nft_data: IJsonNftData;
json_nft_link: string;
latest_price: number;
name: string;
on_main_page: boolean;
other_file: IOtherFile;
product_id: number;
quantity: number;
quantity_available: number;
quantity_nfts_created: number;
tx_status: string;
type: string;
updated_at: string;
}

function App() {
  const [items, setItems] = useState<IItems[]>([]);
  const [checked, setChecked] = useState<IChecked>({ checked: false })

  useEffect(() => {
    fetch("https://artisant.io/api/products")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result.data.products);
        },
      )
  }, [])

  const quantityCheck: () => void = () => {
    if (!checked.checked) {
      const resultFilter = items.filter(item => item.quantity_available > 0)
      setItems(resultFilter)
      setChecked({ checked: !checked.checked })
    } else {
      fetch("https://artisant.io/api/products")
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result.data.products);
            setChecked({ checked: !checked.checked })
          },
        )
    }
  }

  return (
    <div className="App">
      <div className='artisant-board'>
        <div className='artisant-board__header-container'>
          <div className='artisant-board__header-container__text-main'>
            Explore
          </div>
          <div className='artisant-board__header-container__text-contain'>
            Buy and sell digital fashion NFT art
          </div>
        </div>
        <div>
          <Checkbox onChange={quantityCheck} checked={checked.checked}>
            В наличие
          </Checkbox>
        </div>
        <div className='artisant-board__card-container'>
          {items.map(item => (
            <div className='artisant-board__card-container__card' key={item.product_id}>
              <div className='artisant-board__card-container__card__created-container'>
                <div className='artisant-board__card-container__card__created-container__text'>
                  created by
                </div>
                <div className='artisant-board__card-container__card__created-container__name'>
                  {item.created_by.display_name}
                </div>
              </div>
              <div className='artisant-board__card-container__card__name-container'>
                <div className='artisant-board__card-container__card__name-container__name'>
                  {item.name}
                </div>
              </div>
              <img className='artisant-board__card-container__card__picture' src={fon} alt=''></img>
              <div className='artisant-board__card-container__card__bottom-container'>
                <div className='artisant-board__card-container__card__bottom-container__left-container'>
                  <div className='artisant-board__card-container__card__bottom-container__left-container__upper-text'>
                    available
                  </div>
                  <div className='artisant-board__card-container__card__bottom-container__left-container__bottom-text'>
                    {item.quantity_available} of 50
                  </div>
                </div>
                <div className='artisant-board__card-container__card__bottom-container__right-container'>
                  <div className='artisant-board__card-container__card__bottom-container__right-container__upper-text'>
                    price
                  </div>
                  <div className='artisant-board__card-container__card__bottom-container__right-container__bottom-text'>
                    {item.initial_price} ETH
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
