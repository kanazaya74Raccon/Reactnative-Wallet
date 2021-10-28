import Web3 from 'web3';

function toWei(amount) {
  return Web3.utils.toWei(amount);
}

function fromWei(amount) {
  return Web3.utils.fromWei(amount);
}

function toBN(amount) {
  return Web3.utils.toBN(amount);
}

function formatAmount(amount) {
  if (amount) {
    const split = amount.split('.');

    if (split.length === 1) {
      return split[0];
    }

    if (split[0].length >= 3) {
      return split[0];
    }

    return `${split[0]}.${split[1].substring(0, 3)}`;
  }

  return '0';
}

export {
  toWei,
  fromWei,
  toBN,
  formatAmount,
};
