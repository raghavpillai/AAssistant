import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export const loggedState = atom({
    key: 'loggedState',
    default: false,
});

export const ticketNum = atom({
    key: 'ticketNum',
    default: ''
})

export const userInputs = atom({
    key: 'userInputs',
    default: ''
})

export const bagIds = atom({
    key: 'bagIds',
    default: ''
})

export const securityGate = atom({
    key: 'securityGate',
    default: ''
})

export const timeDelay = atom({
    key: 'timeDelay',
    default: 0
})