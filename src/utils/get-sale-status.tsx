const STATUS: Record<string, string> = {
  delivery: 'Entregue',
  delivered: 'Entregue',
  unknown: 'Desconhecido',
  finished: 'Venda concluída',
  error: 'Erro ao concluir venda',
  separating_order: 'Separando pedido',
  waiting_payment: 'Aguardando pagamento',
  delivery_transit: 'Em trânsito para entrega',
  waiting_pickup: 'Aguardando retirada na loja',
};

const COLOR: Record<
  string,
  { backgroundColor: string; color: string; borderColor: string }
> = {
  finished: {
    backgroundColor: '#f6ffed',
    borderColor: '#b7eb8f',
    color: '#52c41a',
  },
  error: {
    backgroundColor: '#fff2f0',
    borderColor: '#ffccc7',
    color: '#ff4d4f',
  },
  delivery: {
    backgroundColor: '#e6f4ff',
    borderColor: '#91caff',
    color: '#1677ff',
  },
  delivered: {
    backgroundColor: '#e6f4ff',
    borderColor: '#91caff',
    color: '#1677ff',
  },
  delivery_transit: {
    backgroundColor: '#e6f4ff',
    borderColor: '#91caff',
    color: '#1677ff',
  },
  separating_order: {
    backgroundColor: '#e6f4ff',
    borderColor: '#91caff',
    color: '#1677ff',
  },
  waiting_pickup: {
    backgroundColor: '#e6f4ff',
    borderColor: '#91caff',
    color: '#1677ff',
  },
  waiting_payment: {
    backgroundColor: '#e6f4ff',
    borderColor: '#91caff',
    color: '#1677ff',
  },
  unknown: {
    backgroundColor: 'rgba(0,0,0,.02)',
    borderColor: 'd9d9d9',
    color: 'rgba(0,0,0,.88)',
  },
};

export const getSaleStatusLabel = (status?: string): string => {
  return (status ? STATUS[status] : '') || (STATUS.unknown as string);
};

export const getSaleStatusColor = (status?: string) => {
  return (status ? COLOR[status] : '') || COLOR.unknown;
};

export const getSaleStatus = (status?: string) => ({
  label: getSaleStatusLabel(status),
  color: getSaleStatusColor(status),
});
