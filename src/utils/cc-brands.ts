export const CC_BRANDS_IMAGES = {
  visa: require('../assets/images/cards/Visa.png'),
  master: require('../assets/images/cards/Master.png'),
  mastercard: require('../assets/images/cards/Master.png'),
  amex: require('../assets/images/cards/Amex.png'),
  elo: require('../assets/images/cards/Elo.png'),
  aura: require('../assets/images/cards/Aura.png'),
  jcb: require('../assets/images/cards/JCB.png'),
  diners: require('../assets/images/cards/Diners.png'),
  discover: require('../assets/images/cards/Discovery.png'),
  hipercard: require('../assets/images/cards/Hipercard.png'),
  hiper: require('../assets/images/cards/Hiper.png'),
};

export const typeBrand = (brand: string) => {
  switch (brand) {
    case 'visa':
      return 'Visa';
    case 'mastercard':
      return 'Master';
    case 'master':
      return 'Master';
    case 'amex':
      return 'Amex';
    case 'elo':
      return 'Elo';
    case 'aura':
      return 'Aura';
    case 'jcb':
      return 'Jcb';
    case 'diners':
      return 'Diners';
    case 'discover':
      return 'Discover';
    case 'hipercard':
      return 'Hipercard';
    case 'hiper':
      return 'Hiper';
  }
};
