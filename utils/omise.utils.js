import Omise from "omise";

const omisePublicKey = process.env.OMISE_PUBLIC_KEY;
const omiseSecretKey = process.env.OMISE_SECRET_KEY;

const omise = new Omise({
  publicKey: omisePublicKey,
  secretKey: omiseSecretKey,
});

export const createCustomer = async (id, email, cardToken) => {
  const customer = await omise.customers.create({
    email,
    description: id,
    card: cardToken,
  });

  return customer.id;
};

export const chargeAccount = async (amount, omiseCustomerId, description) => {
  const charge = await omise.charges.create({
    // Replace omiseClient with omise
    amount,
    currency: "THB",
    customer: omiseCustomerId,
    description,
  });
  return {
    amount: charge.amount,
    status: charge.status,
  };
};

export const createRecipient = async (name, email, bankAccount) => {
  const recipient = await omise.recipients.create({
    name,
    email,
    type: "individual",
    bank_account: bankAccount,
  });
  return recipient.id;
};

export const createTransfer = async (recipientId, amount) => {
  const transfer = await omise.transfers.create({
    recipient: recipientId,
    amount,
  });
  return transfer;
};

export const getCharges = async (customerId, limit = 20, offset = 0) => {
  try {
    if (!customerId) {
      return [];
    }
    let charges = await omise.charges.list({
      limit: 10000,
    });
    charges = charges.data.filter((charge) => charge.customer === customerId);

    charges = charges.map((charge) => ({
      object: charge.object,
      id: charge.id,
      amount: charge.amount,
      currency: charge.currency,
      card: {
        object: charge.card.object,
        bank: charge.card.bank,
        brand: charge.card.brand,
      },
      created_at: charge.created_at,
      customer: charge.customer,
    }));

    return charges;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTransfers = async (recipientId, limit = 20, offset = 0) => {
  try {
    if (!recipientId) {
      return [];
    }
    let transfers = await omise.transfers.list({
      limit: 10000,
    });
    transfers = transfers.data.filter(
      (transfer) => transfer.recipient === recipientId
    );

    transfers = transfers.map((transfer) => {
      return {
        object: transfer.object,
        id: transfer.id,
        amount: transfer.amount,
        currency: transfer.currency,
        recipient: transfer.recipient,
        bank_account: {
          object: transfer.bank_account.object,
          brand: transfer.bank_account.brand,
          bank_code: transfer.bank_account.bank_code,
        },
        created_at: transfer.created_at,
      };
    });

    return transfers;
  } catch (error) {
    console.error(error);
    return null;
  }
};
