import React from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from 'components/shared/PageHeader/PageHeader';
import PurchasedItem from 'components/units/PurchasedItem/PurchasedItem';
import HighlightText from 'components/shared/HighlightText/HighlightText';
import PriceOverview from 'components/units/PriceOverview/PriceOverview';
import useAddCartItem from 'hooks/useAddCartItem';
import * as T from 'types';
import Styled from './OrderDetailPage.styles';

type LocationState = {
  order: T.Order;
};

const OrderDetailPage = () => {
  const location = useLocation<LocationState>();
  const { order } = location.state;

  const addCartItem = useAddCartItem();

  const handleClickCart = (product: T.Product) => {
    addCartItem(product);
  };

  const totalPrice = order.items.reduce((acc: number, curr: T.CartItem) => {
    return acc + curr.product.price * curr.quantity;
  }, 0);

  return (
    <Styled.Root>
      <PageHeader title="주문내역상세" />
      <Styled.Order key={order.id}>
        <Styled.OrderHeader>
          <Styled.OrderNumber>주문번호 : {order.id}</Styled.OrderNumber>
        </Styled.OrderHeader>
        <Styled.PurchasedList>
          {order.items.map((item) => (
            <PurchasedItem key={item.id} item={item} onClick={handleClickCart} />
          ))}
        </Styled.PurchasedList>
      </Styled.Order>
      <Styled.PriceOverViewWrapper>
        <PriceOverview headerText="결제금액 정보" border={false}>
          <Styled.HighlightTextWrapper>
            <HighlightText text="총 결제금액" />
            <HighlightText text={`${totalPrice.toLocaleString('ko-KR')}원`} />
          </Styled.HighlightTextWrapper>
        </PriceOverview>
      </Styled.PriceOverViewWrapper>
    </Styled.Root>
  );
};

export default OrderDetailPage;